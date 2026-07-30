# HANDOFF — Nederlands Vivo build

Written for whoever (human or agent) picks this up next. Read this before
touching `CLAUDE.md`/`SPEC.md`/`BUILD_PLAN.md` — those describe a *different,
bigger* architecture than what is actually built (see "Architecture decision"
below). This file is the source of truth for what actually exists.

**Status: shipped and live at https://plykov.github.io/Nederlands/.** PRs #1
(the build), #2 (doc reconciliation), #3 (scenarios 13–24), #5 (`npm test`),
#6 (word-order builder) and #7 (scenarios 25–36) are merged. The sections
below record what was decided, what shipped, and what is deliberately left.

## Where this came from

User asked: check `github.com/plykov/Nederlands`, take applicable code from
`github.com/plykov/Italiano`, build an RU→NL training app in the Nederlands repo.

`Nederlands` had no app — only planning docs (`CLAUDE.md`, `SPEC.md`,
`BUILD_PLAN.md`, `_SCHEMA.md`, `CONTENT_SOURCES.md`) plus one worked-example
content file, `gemeente-inschrijving.json`. Those docs describe an ambitious
production stack: Next.js 15, Postgres/Neon + Drizzle, Auth.js magic-link,
Claude API role-play, Whisper ASR, Azure Pronunciation Assessment, Cloudflare
R2, GDPR cron jobs, 12 build milestones (M0–M12).

`Italiano` turned out to be something much simpler and, crucially, **already
real and working**: a client-only Vite + React + TypeScript PWA. No backend, no
database, no API keys. State in `localStorage`. Web Speech API and
`MediaRecorder` used directly. Spaced repetition via `ts-fsrs`. Deployed to
GitHub Pages. ~5,450 lines across `src/`.

## Architecture decision (confirmed with user)

**User chose: port Italiano's real architecture** (client-only PWA), not the
Next.js/Postgres/API-backed spec in `SPEC.md`. The heavier stack needs
infrastructure and API keys nobody has provisioned, Italiano's code does not
transfer to it at all, and it cannot be built in one sitting. The client-only
PWA is buildable now and reuses ~80% of Italiano's engine, matching
`CLAUDE.md`'s own framing that Dutch and Italian "share ~80% of the engine".

**Consequence, now resolved:** the three docs originally described only the
server architecture, so they contradicted the code. The user initially declined
reconciling them and later reversed that. They have since been **restructured
into Phase 1 (built, binding) and Phase 2 (designed, not built)**. Nothing was
deleted — the Next.js/Postgres/LLM/Azure design is preserved in full under
Phase 2, along with the research behind it. A reader now sees which half they
are in from the header of each file.

## Correction to the previous revision of this file

The earlier version of this handoff listed a "What's done" section claiming the
scaffold, `public/`, `src/lib/storage.ts`, `src/lib/srs.ts` and
`src/lib/speech.ts` already existed. **They had never been pushed** — the repo
contained only the planning docs. Whoever wrote that was describing files on a
local machine. Everything was therefore built from scratch in the session that
produced PR #1. If you find yourself trusting a "done" list here, verify it
against `git ls-tree` first.

## What exists now

```
index.html · package.json · tsconfig.json · vite.config.ts · .gitignore
public/            manifest.webmanifest · sw.js · icon.svg (Dutch tricolour)
.github/workflows/ deploy.yml  — Pages, triggers on main + workflow_dispatch
src/lib/           storage.ts · srs.ts · speech.ts · noise.ts
src/data/          scenarios.ts · repair.ts · openers.ts · nouns.ts
                   grammar.ts · course.ts · cando.ts · survey.ts · wordorder.ts
src/views/         17 views (14 ported + ArticleTrainer + Opener + WordOrder)
scripts/           check-content.mjs — what `npm test` runs
src/               App.tsx · main.tsx · types.ts · styles.css
```

Content volume: **36 scenarios** (6 per domain — A1 14, A2 12, B1 10 — each with
exactly one `register: "switch"` reply), 104 nouns, 8 repair moves, 7
openers/recovery moves, 12 grammar notes, 8 course lessons, 39 CEFR can-do
statements. The second batch of twelve landed in PR #3; the third in this PR,
bringing the total to the M12 target range of 30–40.

Three modules have no Italiano equivalent and were written from the spec:

- **Opener drill** (`src/views/Opener.tsx`, `startOnsetRecording` in
  `speech.ts`) — SPEC §2.1 and BUILD_PLAN M3. Measures time to first voiced
  frame via `MediaRecorder` + `AnalyserNode` off one shared `getUserMedia`
  stream; bands per SPEC §6 (fluent <1200ms, hesitant 1200–2500, slow >2500).
  Reported as guidance, never a gate. Reachable from Home, from RepairView and
  as step 6 of Rehearse.
- **de/het trainer** (`src/views/ArticleTrainer.tsx`) — SPEC §2.2, rule 4. No
  rule is stated anywhere. The noun is never rendered bare: the choice is
  between two whole forms, `de huurcontract` vs `het huurcontract`. Misses feed
  a dedicated `article` card source.
- **Recovery moves** (`src/data/openers.ts`) — what to say once they have
  already switched to English.
- **Word-order builder** (`src/views/WordOrder.tsx`, `src/data/wordorder.ts`) —
  SPEC §2.3. Tap-to-place, not drag-and-drop: HTML5 DnD is unreliable on touch
  and this app is phone-first. Chunks are stored lowercase so a capital letter
  cannot leak which one goes first; the view capitalises on render. Puzzles
  where two orders are both correct accept both, and `npm test` verifies each
  such variant is actually reachable by rearranging that puzzle's chunks.

### Deviations from a pure Italiano port, and why

- Domains come from this repo's `_SCHEMA.md`, not Italiano's.
- `.it` CSS class became **two** classes: `.nl` for Dutch (serif) and `.lead`
  for Russian card titles (sans). Italiano used one class for both roles, which
  would have violated the CLAUDE.md rule that Cyrillic chrome and Latin Dutch
  stay visually distinct.
- Gendered past-tense forms ("не понял(а)") removed throughout, per rule 5.
- `.btnrow` wraps; three buttons in one row broke words at 375px.
- No de/het lesson in the course, per rule 4.

## Verification performed

Driven in Chromium at 375px, not merely built: all 16 routes render, Rehearse
walks all six steps, the reply bank seeds the deck, FSRS grading advances the
queue, Debrief writes a ledger entry that Progress reads back, article and
course drills score correctly, the service worker registers, the manifest
loads. Zero console errors, zero horizontal overflow. A separate script
verifies every cross-file id resolves and every scenario satisfies the
`_SCHEMA.md` shape rules.

## What is NOT done — remaining scope

Ordered by value, and none of it is blocking:

1. **`er` in five staged steps** (SPEC §2.4) — currently one lesson and one
   note covering all functions at once, where the spec wants each stage gated
   on the previous.
2. **Inburgering tracker** (SPEC §2.7) — deadlines and requirements only.
   Nothing that advises on a case.
3. **Loanword hook** (SPEC §2.6) — onboarding reveal of 8–10 Dutch loanwords in
   Russian. Ship only items with sound etymology; стул, галстук and рюкзак are
   German or Low German and must not appear.
4. **Audio for the reply bank.** Web Speech quality varies by platform;
   pre-recorded native audio would improve the listening trainers most.
5. **Accessibility pass** to WCAG 2.2 AA. The word-order chips are `<button>`s
   and keyboard-reachable, but the whole app has not had a proper pass.

Word-order builder and scenario count are no longer on this list: the
constructor shipped (SPEC §2.3, `#/wordorder`), and thirty-six scenarios, six
per domain, land inside `BUILD_PLAN.md` M12's 30–40 target. Further scenario
growth should still come from what testers bring back from real conversations,
not invented situations.

## Operational note

**GitHub Pages needs one manual step that no code change can substitute:**
Settings → Pages → Source → **GitHub Actions**. The first workflow run failed at
`actions/configure-pages` with `Resource not accessible by integration` — the
workflow token cannot create a Pages site that has never been enabled. `npm ci`
and `npm run build` both passed in that run.

The deploy trigger is scoped to `main` (plus manual dispatch). A repository has
a single live Pages site, so deploying from a feature branch would overwrite
whatever `main` published.

## Open questions

None outstanding. The docs question that sat here was decided in favour of
reconciliation and is done — see "Architecture decision" above.

One operational item is not a question but still needs a human: the GitHub Pages
source setting, recorded under "Operational note".

## How to read the docs now

- `CLAUDE.md` — rules, stack and conventions. Phase 1 section is binding; the
  Phase 2 section is intent. Read the header note first.
- `SPEC.md` — sections tagged **§P1** are built, **§P2** are not. The Postgres
  schema and the HTTP API live under §P2 and describe nothing that exists.
- `BUILD_PLAN.md` — Part A is Phase 1, with ✅ on what shipped and an ordered
  list of what remains. Part B is the untouched server plan, with Phase 1
  equivalents cross-referenced where one exists.
- `_SCHEMA.md` and `CONTENT_SOURCES.md` are unchanged and still binding. The
  content licensing register in particular applies to every phase.

The rule of thumb: **the code is the specification of behaviour; Phase 2 is the
specification of intent.**
