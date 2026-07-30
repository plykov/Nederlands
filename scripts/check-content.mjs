/**
 * Content integrity check — this is what `npm test` runs.
 *
 * The app has no unit-testable business logic to speak of (FSRS is a library,
 * the views are thin), but it has 1,500+ lines of hand-authored content whose
 * invariants nothing else enforces. This script enforces them:
 *
 *   - every cross-file id resolves (repairIds, opener contexts, noun and
 *     can-do scenario references);
 *   - every scenario satisfies the _SCHEMA.md shape rules, including the
 *     product rule that there is EXACTLY ONE `register: "switch"` reply;
 *   - no scenario is orphaned from the CEFR map;
 *   - no duplicate ids anywhere;
 *   - course exercises are answerable (answer index in range, fill prompts
 *     contain a blank, no duplicate options).
 *
 * Run: `npm test`. Exit code 1 with a list of violations on failure.
 *
 * Implementation note: the data lives in TypeScript modules, so we bundle a
 * tiny entry with esbuild (already present as vite's dependency — nothing new
 * is installed) into a temp file and import that.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "nv-check-"));

let data;
try {
  const entry = join(tmp, "entry.ts");
  writeFileSync(
    entry,
    `
    export { SCENARIOS, DOMAINS } from "${root}/src/data/scenarios";
    export { REPAIR_MOVES } from "${root}/src/data/repair";
    export { OPENERS } from "${root}/src/data/openers";
    export { NOUNS } from "${root}/src/data/nouns";
    export { CAN_DOS } from "${root}/src/data/cando";
    export { LESSONS } from "${root}/src/data/course";
    export { GRAMMAR_NOTES } from "${root}/src/data/grammar";
    export { PUZZLES, STRUCTURES } from "${root}/src/data/wordorder";
    `
  );
  const bundle = join(tmp, "data.mjs");
  execFileSync(
    join(root, "node_modules", ".bin", "esbuild"),
    [entry, "--bundle", "--format=esm", `--outfile=${bundle}`],
    { stdio: ["ignore", "ignore", "inherit"] }
  );
  data = await import(pathToFileURL(bundle).href);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

const {
  SCENARIOS,
  DOMAINS,
  REPAIR_MOVES,
  OPENERS,
  NOUNS,
  CAN_DOS,
  LESSONS,
  PUZZLES,
  STRUCTURES,
} = data;

const problems = [];
const dup = (arr) => [...new Set(arr.filter((x, i) => arr.indexOf(x) !== i))];

// ── ids are unique ──
for (const [name, ids] of [
  ["scenario", SCENARIOS.map((s) => s.id)],
  ["domain", DOMAINS.map((d) => d.id)],
  ["repair", REPAIR_MOVES.map((m) => m.id)],
  ["opener", OPENERS.map((o) => o.id)],
  ["can-do", CAN_DOS.map((c) => c.id)],
  ["lesson", LESSONS.map((l) => l.id)],
  ["noun", NOUNS.map((n) => n.word)],
  ["puzzle", PUZZLES.map((p) => p.id)],
  ["structure", STRUCTURES.map((s) => s.id)],
]) {
  const d = dup(ids);
  if (d.length) problems.push(`duplicate ${name} ids: ${d.join(", ")}`);
}

const scenarioIds = new Set(SCENARIOS.map((s) => s.id));
const repairIds = new Set(REPAIR_MOVES.map((m) => m.id));
const domainIds = new Set(DOMAINS.map((d) => d.id));

// ── scenario shape, per _SCHEMA.md and the product rules ──
for (const s of SCENARIOS) {
  const at = (msg) => problems.push(`scenario ${s.id}: ${msg}`);

  if (!domainIds.has(s.domain)) at(`unknown domain "${s.domain}"`);
  if (!["A1", "A2", "B1"].includes(s.level)) at(`bad level "${s.level}"`);
  for (const r of s.repairIds)
    if (!repairIds.has(r)) at(`unknown repairId "${r}"`);
  if (!OPENERS.some((o) => o.kind === "opener" && o.context === s.openerContext))
    at(`no opener exists for context "${s.openerContext}"`);

  // The core product rule: exactly one moment where they offer English.
  const switches = s.replyBank.filter((r) => r.register === "switch").length;
  if (switches !== 1) at(`${switches} switch replies — must be exactly 1`);

  if (s.lines.length < 4 || s.lines.length > 8)
    at(`${s.lines.length} lines (want 4–8)`);
  if (s.replyBank.length < 6) at(`${s.replyBank.length} replies (want 6+)`);
  if (s.traps.length < 2) at(`${s.traps.length} traps (want 2+)`);
  if (s.gate.length < 2) at(`${s.gate.length} gate items (want 2+)`);
  if (s.brief.length < 4) at(`${s.brief.length} brief lines (want 4+)`);
  if (dup(s.gate.map((g) => g.word)).length) at("duplicate gate words");
}

// ── cross-file references resolve ──
for (const n of NOUNS)
  if (n.scenarioId && !scenarioIds.has(n.scenarioId))
    problems.push(`noun "${n.word}": unknown scenario "${n.scenarioId}"`);

for (const c of CAN_DOS) {
  if (!domainIds.has(c.domain))
    problems.push(`can-do ${c.id}: unknown domain "${c.domain}"`);
  for (const id of c.scenarios)
    if (!scenarioIds.has(id))
      problems.push(`can-do ${c.id}: unknown scenario "${id}"`);
}

// Every scenario must be reachable from the CEFR map, or Progress can never
// credit it and the work is invisible.
const covered = new Set(CAN_DOS.flatMap((c) => c.scenarios));
for (const s of SCENARIOS)
  if (!covered.has(s.id)) problems.push(`scenario ${s.id}: not in any can-do`);

/**
 * Can `target` be built by placing every chunk exactly once, in some order?
 * That is precisely what the tap-to-place UI can produce, so it is the right
 * question to ask of an `accept` variant.
 */
function reachableByChunkOrder(target, chunks) {
  const used = chunks.map(() => false);
  const walk = (pos) => {
    if (pos >= target.length) return used.every(Boolean);
    for (let i = 0; i < chunks.length; i++) {
      if (used[i]) continue;
      const end = pos + chunks[i].length;
      if (target.slice(pos, end) !== chunks[i]) continue;
      if (end < target.length && target[end] !== " ") continue;
      used[i] = true;
      if (walk(end + 1)) return true;
      used[i] = false;
    }
    return false;
  };
  return walk(0);
}

// ── word-order puzzles are solvable ──
const structureIds = new Set(STRUCTURES.map((s) => s.id));
for (const p of PUZZLES) {
  const at = (msg) => problems.push(`puzzle ${p.id}: ${msg}`);

  if (!structureIds.has(p.structure)) at(`unknown structure "${p.structure}"`);
  if (!["A1", "A2", "B1"].includes(p.level)) at(`bad level "${p.level}"`);
  if (p.scenarioId && !scenarioIds.has(p.scenarioId))
    at(`unknown scenario "${p.scenarioId}"`);
  if (p.chunks.length < 3) at(`${p.chunks.length} chunks (want 3+)`);
  if (p.chunks.some((c) => c !== c.trim() || !c))
    at("a chunk is empty or has stray whitespace");

  // A capitalised first chunk would give away where the sentence starts, so
  // chunks are stored lowercase and the view capitalises on render. Proper
  // nouns are the legitimate exception.
  const PROPER = /^(nederlands|ind|anne|digid)/i;
  for (const c of p.chunks)
    if (/^[A-ZÀ-Þ]/.test(c) && !PROPER.test(c))
      at(`chunk "${c}" is capitalised — store it lowercase`);

  // An `accept` variant the UI cannot actually produce would silently mark a
  // correct answer wrong. Chunks are multi-word, so comparing word multisets
  // is not enough — the variant must be segmentable into the chunks
  // themselves, each used exactly once.
  for (const alt of p.accept ?? []) {
    if (!reachableByChunkOrder(alt, p.chunks))
      at(`accept variant "${alt}" cannot be assembled from the chunks`);
    if (alt === p.chunks.join(" ")) at("accept variant duplicates the main order");
  }
}
for (const s of STRUCTURES)
  if (!PUZZLES.some((p) => p.structure === s.id))
    problems.push(`structure ${s.id}: has no puzzles`);

// ── course exercises are answerable ──
for (const l of LESSONS)
  l.exercises.forEach((ex, i) => {
    const at = (msg) => problems.push(`lesson ${l.id} ex${i + 1}: ${msg}`);
    if (ex.kind === "choose") {
      if (ex.answer < 0 || ex.answer >= ex.options.length)
        at("answer index out of range");
      if (dup(ex.options).length) at("duplicate options");
    } else {
      if (!ex.prompt.includes("___")) at("fill prompt has no ___ blank");
      if (!ex.answer.length) at("no accepted answers");
    }
  });

// ── report ──
const summary =
  `scenarios ${SCENARIOS.length} · nouns ${NOUNS.length} · ` +
  `can-do ${CAN_DOS.length} · repair ${REPAIR_MOVES.length} · ` +
  `openers ${OPENERS.length} · lessons ${LESSONS.length} · ` +
  `puzzles ${PUZZLES.length}`;

if (problems.length) {
  console.error(`✗ content check failed — ${summary}\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`✓ content check passed — ${summary}`);
