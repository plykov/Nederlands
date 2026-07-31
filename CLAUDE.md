# CLAUDE.md

Context for Claude Code. Read before any task. Rules here override general best practice.

> **Phase 1 is what exists. Phase 2 is what is intended.**
> Everything down to "Definition of done" describes the code in this repo today
> and is binding. Everything under "Phase 2" is a design target with no code
> behind it — do not treat it as a description of the system. `SPEC.md` and
> `BUILD_PLAN.md` follow the same split.

## What this is

A web app that teaches **Dutch to Russian speakers already living in the Netherlands** who need spoken Dutch now. Russian UI, Dutch target language.

Phase 1 is a **client-only PWA**: no server, no accounts, no API keys. State lives in `localStorage`. A parallel Italian product, `plykov/Italiano`, shares roughly 80% of the engine by convergent design — the two are **separate repositories**, and code moves between them by deliberate porting, not by imports.

## The user

Russian-speaking adult, resident in NL 0–36 months, educated, employed or job-seeking. Usually has good English — **which is the problem, not the solution**. Currently avoids Dutch entirely because every attempt collapses into English within one sentence.

Segment by legal status; it drives content path and urgency:

| Status | Inburgering | Deadline | Hook |
|---|---|---|---|
| Russian national, family/asylum permit | Obligated | 3 years, B1 | Legal compulsion |
| Kennismigrant | Exempt while temporary | Needed for permanent residence / naturalisation | Career + future permit |
| Ukrainian, temporary protection | Not obligated | None | Work, school, daily life |
| Naturalisation track | — | A2 now (B1 proposed, not enacted) | Citizenship |

## Non-negotiable product rules

These are architecture-independent. They hold in Phase 1 and in Phase 2 alike.

1. **Anti-switch is the core feature.** Dutch speakers switch to English at the first accent or hesitation. Evidence indicates **latency and prosody trigger the switch more than grammatical error**. Therefore: score response speed and fluency ahead of accuracy. Never build a feature that rewards slow, correct output over fast, imperfect output.
2. **North-star metric is `stayed_in_dutch`** — did the real interaction stay in Dutch. Everything else is secondary.
3. **No streaks. No hearts. No XP. No "minutes studied" counter anywhere.** Frequency of production sessions predicts oral proficiency; duration does not. Track sessions, never minutes.
4. **de/het is never taught as a rule.** Nouns are always stored, displayed, and drilled with their article attached. Assignment is arbitrary and rule-teaching fails. There is deliberately no de/het lesson in the course.
5. **Russian UI uses formal вы** throughout. Never mix registers. Avoid gendered past-tense forms — write «не поняли», never «не понял(а)».
6. **Italian and Dutch content never mix.** They are separate repos; keep it that way. Port code deliberately, never share content.
7. **Never give immigration, legal, or medical advice.** Teach the language of the appointment, never the substance of the case. In Phase 1 this is a content rule — the Settings and Progress copy states the boundary explicitly. In Phase 2 it becomes a hard-coded refusal in the LLM system prompts.

## Phase 1 stack — what is actually here

- **Vite 5 + React 18 + TypeScript strict.** No framework beyond that.
- **No backend.** No database, no auth, no API keys, no network calls at runtime.
- **State**: `localStorage` under the `nv.*` namespace, via `src/lib/storage.ts`.
- **Styling**: hand-written CSS in `src/styles.css` (~280 lines). No Tailwind, no CSS framework, no dark mode.
- **Routing**: hash-based, hand-rolled in `src/App.tsx`. No router library.
- **SRS**: `ts-fsrs`. Do not implement a scheduler by hand.
- **TTS**: browser Web Speech API, `nl-NL`.
- **Recording**: browser `MediaRecorder`; audio stays in page memory and is never uploaded.
- **Onset measurement**: Web Audio `AnalyserNode` over a shared `getUserMedia` stream.
- **Noise**: Web Audio procedural synthesis. No audio files ship.
- **PWA**: manifest plus a service worker that precaches the app shell.
- **Hosting**: GitHub Pages via GitHub Actions.

Dependencies are deliberately few: `react`, `react-dom`, `ts-fsrs`. Adding one needs a reason.

## Phase 1 repo layout

```
index.html
package.json · tsconfig.json · vite.config.ts
public/                manifest.webmanifest · sw.js · icon.svg
.github/workflows/     deploy.yml — Pages, triggers on main + workflow_dispatch
src/
  App.tsx              hash router + tab bar
  main.tsx · types.ts · styles.css
  lib/                 storage.ts · srs.ts · speech.ts · noise.ts · a11y.ts
  data/                scenarios.ts · repair.ts · openers.ts · nouns.ts
                       grammar.ts · course.ts · cando.ts · survey.ts
                       wordorder.ts · inburgering.ts · loanwords.ts
  views/               19 views
gemeente-inschrijving.json   worked content example, in the _SCHEMA.md JSON shape
HANDOFF.md · SPEC.md · BUILD_PLAN.md · CONTENT_SOURCES.md · _SCHEMA.md
```

Content is TypeScript modules in `src/data/`, not JSON seeded to a database. `gemeente-inschrijving.json` is retained as the authoring reference for `_SCHEMA.md`; its content is already converted into `src/data/scenarios.ts`.

## Phase 1 commands

```bash
npm install
npm run dev        # Vite on :5173
npm run build      # tsc -b && vite build
npm run preview
npm test           # content integrity: ids resolve, _SCHEMA.md shape rules hold
```

`npm test` runs `scripts/check-content.mjs`: every cross-file id must resolve, every scenario must satisfy the `_SCHEMA.md` shape rules (including exactly one `register: "switch"` reply), every scenario must appear in the CEFR map, course exercises must be answerable, and word-order puzzles must be solvable — chunks stored lowercase, and every `accept` variant actually reachable by rearranging that puzzle's own chunks. **Run it after any change to `src/data/`** — it exists precisely because nothing else enforces those invariants. There is still no linter and no unit-test runner; type-checking is `tsc -b` inside `build`.

## Phase 1 conventions

- All user-facing Russian lives inline in the views and in `src/data/*`. Single locale — **do not install an i18n framework**.
- Dutch target text always carries a Russian gloss beside it, never a replacement.
- Three type roles, and they must not be confused:
  - `.nl` — Dutch text. The only serif in the app.
  - `.lead` — Russian card headings. Same weight, sans.
  - `.ru` — Russian explanatory text under either.
  This is how the Cyrillic-chrome / Latin-Dutch distinction is enforced without Tailwind.
- Nouns are written `de gemeente` / `het paspoort`, never `gemeente (de)`.
- Every scenario carries exactly one `register: "switch"` reply — the moment they offer English. Adding a scenario without one is a bug.
- Gate items are drawn from the scenario's own vocabulary, never generic minimal pairs.
- Onset and pronunciation results are always framed as guidance («это ориентир, а не оценка»). Nothing gates progression on them.

## Definition of done — Phase 1

A change is done when: `npm run build` passes (this runs `tsc -b`), `npm test` passes, it works on a 375px viewport with no horizontal overflow, all new Russian strings are formal and ungendered, no new personal data leaves the device, and the affected screens have been opened in a browser rather than merely compiled.

---

# Phase 2 — the server product, not yet built

Everything below is intent. No code in this repo implements it. It is kept because the reasoning is sound and the research behind it was expensive; when a backend is justified, start here rather than re-deriving it.

**Why it is deferred.** The stack below needs provisioned infrastructure and paid API keys that do not exist yet, and none of the Phase 1 code transfers to it. Shipping something real and testable first was the confirmed decision — see `HANDOFF.md`.

**Intended stack**

- **Next.js 15** App Router, TypeScript strict, React 19
- **PostgreSQL** (Neon, EU region) + **Drizzle ORM**, SQL migrations committed
- **Tailwind v4**, mobile-first
- **Auth.js v5**, magic link via Resend. No passwords.
- **Anthropic API** — `claude-sonnet-4-6` for role-play, `claude-haiku-4-5` for debrief parsing and card generation
- **STT**: OpenAI `whisper-1`. See the accuracy warning below.
- **Pronunciation**: Azure AI Speech Pronunciation Assessment, locale `nl-NL` (supported; content/prosody assessment is en-US only, so accuracy + fluency only)
- **Audio**: browser `MediaRecorder` → webm/opus → Cloudflare R2
- **Hosting**: Vercel, EU region pinned

**Intended conventions**

- Server Components by default; `"use client"` only for audio capture, the role-play view, and the review deck.
- Zod at every API boundary.
- Every mutation writes a row to `events`. That table is the analytics stack.
- Dutch target text carries a `ru_gloss` column; it is never translated in place.

**What Phase 2 buys that Phase 1 cannot have:** cross-device sync, LLM role-play with an adversarial NPC, real pronunciation scoring, server-side ASR for hesitation counts, and an aggregate corpus of what Dutch officialdom actually says — which is the long-term defensible asset.

## Known technical constraints — do not rediscover these

These bind Phase 2 work and explain several Phase 1 choices.

- **Whisper degrades badly on non-native Dutch.** Fine-tuning research on JASMIN-CGN measured ~42% WER zero-shot for non-native adult Dutch, dropping to ~14% after fine-tuning. Treat raw Whisper output on learner speech as unreliable. Use it for gist and keyword-spotting, not for scoring. Scoring goes through Azure.
- **No public Dutch learner-speech corpus contains L1-Russian speakers.** JASMIN's non-native cohorts are Turkish, Moroccan and French L1. Any accent-specific tuning needs proprietary data — log audio (with consent) from the moment there is a server to log it to.
- **Azure pronunciation assessment is untested on Russian-accented Dutch.** Do not ship a hard pass/fail gate on it. Show scores as guidance, always with an A/B self-compare against a native model. A scorer that punishes correct speech destroys trust immediately. This is why Phase 1 ships self-comparison and no automated score at all.

## Content licensing — read `CONTENT_SOURCES.md` before adding any content

Do not scrape, ingest, adapt, or hotlink third-party material. `heardutchhere.net` is **all rights reserved and explicitly prohibits rewriting, redistribution and hotlinking** — it is a sequencing reference only, never an ingestion source, unless a signed licence appears in that file.
