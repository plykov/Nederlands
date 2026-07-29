# HANDOFF — Nederlands Vivo build

Written for whoever (human or agent) picks this up next. Read this before touching `CLAUDE.md`/`SPEC.md`/`BUILD_PLAN.md` — those describe a *different, bigger* architecture than what's actually being built right now (see "Architecture decision" below). This file is the source of truth for what's actually in progress.

## Where this came from

User asked: check `github.com/plykov/Nederlands`, take applicable code from `github.com/plykov/Italiano`, build an RU→NL training app in the Nederlands repo.

`Nederlands` had no app yet — only planning docs (`CLAUDE.md`, `SPEC.md`, `BUILD_PLAN.md`, `_SCHEMA.md`, `CONTENT_SOURCES.md`) plus one worked-example content file, `gemeente-inschrijving.json`. Those docs describe an ambitious production stack: Next.js 15, Postgres/Neon + Drizzle, Auth.js magic-link, Claude API role-play, Whisper ASR, Azure Pronunciation Assessment, Cloudflare R2, GDPR cron jobs, 12 build milestones (M0–M12).

`Italiano` (`plykov/Italiano`, live at Italian-language analog of this product) turned out to be something much simpler and, crucially, **already real and working**: a client-only Vite + React + TypeScript PWA. No backend, no database, no API keys. State lives in `localStorage`. TTS/ASR-adjacent features use the browser's Web Speech API and MediaRecorder directly. Spaced repetition uses the `ts-fsrs` npm package. Deployed to GitHub Pages via a simple GitHub Actions workflow. ~5,450 lines total across `src/`.

## Architecture decision (confirmed with user)

Asked the user explicitly which direction to take, given the docs/reality mismatch. **User chose: port Italiano's real architecture** (client-only PWA), not the Next.js/Postgres/API-backed spec in `SPEC.md`. Reasoning offered and accepted: the heavier stack needs infrastructure and API keys nobody has provisioned yet, Italiano's code doesn't transfer to it at all, and it can't be "gone ahead and built" in one sitting. The client-only PWA is buildable now and directly reuses ~80% of Italiano's engine, matching `CLAUDE.md`'s own framing that Dutch and Italian "share ~80% of the engine."

**Consequence:** `CLAUDE.md`/`SPEC.md`/`BUILD_PLAN.md` in this repo are now aspirational/Phase-2+ documents, not a description of what's being built today. The user explicitly declined the option to rewrite those docs to match — so they were left untouched. **Whoever continues this build should be aware the docs contradict the code.** If that becomes confusing, the fix is either (a) rewrite the docs to describe the client-only architecture as Phase 1 and move DB/Auth/LLM/ASR to an explicit Phase 2 section, or (b) leave as-is and treat the docs purely as long-term ambition. Not yet decided — flag to user.

One deliberate deviation from a pure Italiano port: `SPEC.md` §2.1 and `BUILD_PLAN.md` M3 call the **anti-switch opener trainer** (speech-onset latency measurement, not accuracy) "the differentiating milestone — do not defer it," and `CLAUDE.md` rule 1 says to score speed/fluency over correctness. Italiano's app has no equivalent (its `Roleplay.tsx` is listening-only, no recording/latency scoring). So `src/lib/speech.ts` in this repo adds a new `startOnsetRecording()` function beyond what Italiano has — captures audio via `MediaRecorder` and measures time-to-first-voiced-frame via `AnalyserNode` off a single shared `getUserMedia` stream, classified into speed bands (fluent <1200ms, hesitant 1200–2500ms, slow >2500ms, per `SPEC.md` §6). This function exists but **is not yet wired into any view** — that's remaining work (see below).

## What's done

Files created in `D:\GitHub\Nederlands`:

- `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `.gitignore` — scaffold, mechanically ported from Italiano with names/copy swapped to Dutch/`nl-NL`. Same relative-base (`base: "./"`) trick so it works both at domain root and on a GitHub Pages subpath.
- `public/manifest.webmanifest`, `public/sw.js` — PWA manifest + service worker, ported near-verbatim (cache name bumped to `nederlands-vivo-v1`).
- `public/icon.svg` — **new**, not copied from Italiano (that one was Italian-flag colored). Dutch tricolor (red/white/blue horizontal stripes) rounded square with a checkmark circle, same visual grammar as Italiano's mark.
- `src/lib/storage.ts` — direct port. `localStorage` key namespace changed from `iv.*` to `nv.*`. Same shape: ledger, review cards, appointments, onboarded flag, course progress. Same `wipeAll()` GDPR delete-everything function.
- `src/lib/srs.ts` — direct port, unchanged logic. Wraps `ts-fsrs` (`fsrs`, `generatorParameters`, `Rating`). No changes needed — this is genuinely engine-agnostic.
- `src/lib/speech.ts` — ported `speakDutch()` (was `speakItalian()`, voice lookup now targets `nl-NL`) and `startRecording()` unchanged. **Added** `speedBand()` and `startOnsetRecording()` (see "Architecture decision" above) — this is new code, not from Italiano.

Not yet started: `src/lib/noise.ts` (should be a near-verbatim port, only the Russian label strings need to stay — they're generic "cafe/street/phone" labels, not Italian-specific, so probably close to a straight copy).

## What's NOT done — remaining scope

Everything below was scoped out in a todo list before this handoff was requested; none of it has been written yet.

### 1. `src/lib/noise.ts`
Straight port from Italiano (`NoiseBed` class, Web Audio synthesis of café/street/phone background noise for the "Listening under pressure" module). Should need no real changes — kind labels are already language-neutral.

### 2. `src/types.ts`
Port Italiano's `types.ts` shape, renaming the target-language field from `it` to `nl` everywhere (`UserLine`, `Reply`, keep `Trap`, `GateItem`, `LedgerEntry.stayedInItalian` → `stayedInDutch`, etc.). `DomainId` must use the six domains from this repo's own `_SCHEMA.md`, **not** Italiano's: `"bureaucratie" | "gezondheid" | "school" | "wonen" | "werk" | "dagelijks"`.

**New addition needed here** (not in Italiano): a `Noun` type for the de/het trainer — `{ word: string; article: "de" | "het"; ru: string }`. This directly implements `CLAUDE.md` rule 4 ("de/het is never taught as a rule. Nouns are always stored, displayed, and drilled with their article attached") and `SPEC.md` §2.2.

### 3. Content files (`src/data/*.ts`)
All content needs authoring in Dutch/Russian — nothing can be mechanically copied from Italiano since the language content itself is obviously different. Planned scope (deliberately smaller than Italiano's, see note below):

- **`data/repair.ts`** — 8 repair moves. Source material already exists in `SPEC.md` §2.1: opener (`"Sorry, ik leer Nederlands. Mag ik het in het Nederlands proberen?"`), recovery (`"Mag ik het toch in het Nederlands doen? Ik moet oefenen."`), and four repair phrases (`"Kunt u dat langzamer herhalen?"`, `"Wat betekent ...?"`, `"Kunt u dat opschrijven?"`, `"Dus ik moet ..., klopt dat?"`). Pad to 8 with spelling-out-loud and "let me check a word" moves, mirroring Italiano's `repair.ts` shape exactly (id, nl, ru, when).

- **`data/scenarios.ts`** — planned 12 scenarios, 2 per domain (Italiano has 30, 5 per domain — see scope note). Draft list already chosen:
  1. `gemeente-inschrijving` (bureaucratie, A1) — **convert from the existing `gemeente-inschrijving.json`** in repo root, which is already fully authored and cleared per `CONTENT_SOURCES.md`. This is the one scenario that doesn't need fresh writing, just reshaping from the JSON schema (`_SCHEMA.md`) into the flatter TS `Scenario` shape Italiano actually uses (`lines`, `replyBank`, `traps`, `gate` — the JSON's `gate_items`/`reply_bank`/`traps` fields map over directly, traps need `wrong`/`right`/`why` prose written since the JSON only lists trap *codes*, not worked examples).
  2. `ind-verblijfsvergunning` (bureaucratie, A2) — IND loket, permit renewal/extension
  3. `huisarts-inschrijving` (gezondheid, A1) — registering with a GP, describing symptoms
  4. `apotheek-medicijn` (gezondheid, A1) — pharmacy, prescription pickup
  5. `school-aanmelding` (school, A2) — enrolling a child at school
  6. `oudergesprek-leerkracht` (school, B1) — parent-teacher conference
  7. `verhuurder-onderhoud` (wonen, A2) — phone call to landlord about a repair
  8. `energiebedrijf-aansluiting` (wonen, A2) — utility company hookup call
  9. `werkoverleg-collegas` (werk, A2) — small talk / team standup at work
  10. `loonstrook-vraag` (werk, B1) — asking HR about payslip/contract terms
  11. `buurman-geluid` (dagelijks, A1) — noisy neighbor
  12. `ov-controle` (dagelijks, A1) — public transit ticket check

  Each scenario needs: 4–8 `lines` (learner's turns), 6–12 `replyBank` items (**the valuable part** — what officials/doctors/landlords actually say back, formulaic and fast, one `register: switch` item where they offer English), 2–3 `traps` (RU→NL interference errors with `wrong`/`right`/`why`), 2–3 `gate` items (pronunciation targets: `/œy/`, `/øː/`, `/y/`/`/ʏ/`, vowel-length pairs, harde G — per `SPEC.md` §2.5), and 4–8 `brief` lines in Russian. Match `gemeente-inschrijving.json`'s tone: formal вы, contrastive `note_ru` explanations, nouns always carry articles.

- **`data/grammar.ts`** — 12 "Разбор" (grammar-on-demand) notes, mapped to the trap codes in `_SCHEMA.md` that are *morphosyntactic* (phonetic ones — `vowel_length`, `front_rounded`, `harde_g`, `diphthong` — belong in scenario `gate` items instead, matching Italiano's own split between Grammar-notes-for-syntax and Gate-items-for-phonology). Planned notes: `de_het` (explains explicitly there IS no rule — this note must redirect to the article trainer, never state a heuristic, per `CLAUDE.md` rule 4), `v2`, `verb_final`, `bracket` (tangconstructie), `separable`, `er`, `aux_hebben_zijn`, negation (`niet`/`geen` placement), `particle` (toch/maar/even/hoor — note these are *positive transfer* from Russian particle systems per `SPEC.md` §2.5), `diminutive` (-je), `prep_government` (vaste voorzetsels), `false_friend` (e.g. `eventueel` ≠ "eventually", `brand` ≠ brand, `slim` ≠ slim).

- **`data/course.ts`** — planned 8 lessons (Italiano has 12 — scope note applies) for the optional "Грамматический зал" structured path: V2 word order, verb-final subordinate clauses, separable verbs, modal+infinitive bracket construction, `er`, hebben-vs-zijn perfectum, `niet` vs `geen`, `-je` diminutives. Same `Lesson`/`Exercise` shape as Italiano (`choose` | `fill` exercises, rule text with `**bold**` markup, examples, ~4–5 exercises/lesson).

  **Do not write a "de/het rule" lesson** — contradicts `CLAUDE.md` rule 4 outright. If de/het needs a course entry at all, it should just explain *why* there's no rule and link to the article trainer.

- **`data/cando.ts`** — CEFR can-do map, same shape as Italiano's, but level notes must reflect actual Dutch thresholds from `CLAUDE.md`'s legal-status table, not Italian ones: A1 = survival; A2 = current naturalisation threshold (flag that B1 is proposed-but-not-enacted per `CLAUDE.md`); B1 = inburgering threshold for most obligated residents (3-year deadline) and the *proposed* new naturalisation bar. Tie each `CanDo` entry to real scenario ids from the list above.

- **`data/survey.ts`** — Phase-0 tester feedback form, same shape/purpose as Italiano's (no backend, builds a copy-paste report for Telegram), reworded for the Dutch/Netherlands context (swap "CPIA" references for Dutch inburgering course providers / DUO, swap "quest­ura" example situations for gemeente/IND/huisarts equivalents).

- **`data/nouns.ts` — new, not in Italiano.** ~30–40 common nouns harvested from the scenario content above, each `{ word, article: "de"|"het", ru }`, feeding the new de/het trainer view.

### 4. Views (`src/views/*.tsx`)
Mechanical-ish port of all 14 Italiano views, swapping `it`→`nl` field/CSS-class references and translating any Italy-specific copy (e.g. Home's onboarding blurb currently mentions "квестура" and CPIA courses — needs Dutch equivalents: gemeente/IND, and Dutch inburgering course providers instead of CPIA). List: `Home`, `Scenarios`, `Rehearse` (5-step: brief/lines/replyBank/traps/gate — **should gain a 6th step or a prominent link for the opener/latency drill**, see below), `Debrief`, `Roleplay` (listening-only drill on the reply bank), `Review`, `Ledger`, `RepairView`, `Grammar`, `Listening` (noise-under-pressure trainer), `Progress` (CEFR map), `Course` (Грамматический зал), `Feedback`, `Settings`.

**New view needed:** `ArticleTrainer.tsx` — de/het flashcard drill over `data/nouns.ts`, same interaction pattern as `RepairView`/`Review` (card, reveal, right/wrong, feed into SRS). Needs a nav entry point, likely a card on `Home` similar to the existing "тренажёр слушания" / "приёмы ремонта" cards.

**New view or Rehearse step needed:** wire up `startOnsetRecording()` from `speech.ts` (already written, unused) into an actual opener-latency drill, per `BUILD_PLAN.md` M3's explicit "do not defer" instruction and `CLAUDE.md` rule 1. Suggested shape: record the opener phrase, show the speed band (fluent/hesitant/slow) — never a pass/fail grade, never blocking progression (per `SPEC.md` §6, accuracy is reported but never gates). Simplest integration: add as a 6th `Rehearse` step, or a standalone `#/opener/:scenarioId` route reachable from the Rehearse flow and from Home.

### 5. `src/App.tsx`, `src/main.tsx`, `src/styles.css`
- `App.tsx`: port Italiano's hash-router almost verbatim — nav tab labels are already Russian and mostly reusable as-is (Сегодня/Сценарии/Повторение/Я умею/Ещё), since UI language doesn't change between the two products. Add routes for the new `ArticleTrainer` and opener-drill views.
- `main.tsx`: trivial, copy as-is.
- `styles.css`: port Italiano's CSS but retheme the palette from Italian flag colors to Dutch. A palette was already sketched during this session (not yet written to a file): `--blue: #1e4b7a` (primary, replaces Italiano's `--green`), `--orange: #c2660c` / `--orange-soft: #faf0e3` (replaces `--amber`, nods to Dutch national orange without failing contrast), `--bg: #f2f5f8`, keep `--red`/`--red-soft` as-is for danger/switch states, `--border: #dde3ea`. Also rename the `.it`/`.ru` text-style CSS classes to `.nl`/`.ru` (Italiano used `.it` for target-language text styling).

### 6. `.github/workflows/deploy.yml`
Near-verbatim port of Italiano's GitHub Pages Actions workflow. One change: Italiano's trigger list includes a second Italiano-specific branch name (`claude/italian-russians-italy-mvp-a84jfj`) alongside `main` — for Nederlands this should probably just trigger on `main` (repo's actual default branch, confirmed empty/fresh earlier in this session) unless a similar working branch gets created here.

### 7. `README.md`
Rewrite for Nederlands, following Italiano's README structure (organizing principle, product loop, what's inside, stack rationale for staying client-only, roadmap, tester survey pitch, responsibility boundary). Should honestly disclose the smaller initial content volume vs. Italiano (see scope note below) and point at `BUILD_PLAN.md` M12 ("30–40 scenarios") as the target for later content-scale work.

### 8. Build & ship
- `npm install`, `npm run build` (`tsc -b && vite build`), fix whatever TS errors surface.
- Manually sanity-check in `npm run dev`: at minimum, load Home, walk one scenario through Rehearse, run Roleplay, do a Review pass, check Ledger/Progress/Settings render, verify PWA manifest/service-worker registration doesn't error.
- Commit. **Do not push without asking the user first** — no prior go-ahead was given for a push to `plykov/Nederlands` in this session.

## Scope note: content volume

Italiano has 30 scenarios (5/domain) and 12 course lessons, representing real iteration over time. Matching that volume for Dutch in one sitting isn't realistic without sacrificing quality. The plan above targets 12 scenarios (2/domain) and 8 course lessons as a legitimate, fully-functional v1 — and this is **consistent with `BUILD_PLAN.md`'s own sequencing**, which already treats "30–40 scenarios" as milestone M12 (content scale + polish), a later phase, not part of initial scaffolding. Flag this explicitly to the user rather than silently shipping a thin version; they may want more scenarios authored before first deploy, or may be fine growing content over time the way Italiano evidently did.

## Open questions for the user (not yet asked)

1. Should `CLAUDE.md`/`SPEC.md`/`BUILD_PLAN.md` be reconciled with the client-only architecture now, or left as long-term ambition docs? (User previously declined this as part of the initial scope, but it'll get more confusing the longer the docs and code diverge.)
2. OK with 12 scenarios / 8 lessons for v1, or hold the first deploy for something closer to Italiano's content volume?
3. Push permission for the initial commit to `plykov/Nederlands` once the build is green.
