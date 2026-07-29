# CLAUDE.md

Context for Claude Code. Read before any task. Rules here override general best practice.

## What this is

A web portal that teaches **Dutch to Russian speakers already living in the Netherlands** who need spoken Dutch now. Russian UI, Dutch target language.

Built as a **monorepo with language as configuration**, because a parallel Italian product (`it`) shares ~80% of the engine. Dutch (`nl`) is the first implemented locale. Never hardcode Dutch — put language-specific behaviour behind the locale config.

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

1. **Anti-switch is the core feature.** Dutch speakers switch to English at the first accent or hesitation. Evidence indicates **latency and prosody trigger the switch more than grammatical error**. Therefore: score response speed and fluency ahead of accuracy. Never build a feature that rewards slow, correct output over fast, imperfect output.
2. **North-star metric is `stayed_in_dutch`** — did the real interaction stay in Dutch. Everything else is secondary.
3. **No streaks. No hearts. No XP. No "minutes studied" counter anywhere.** Frequency of production sessions predicts oral proficiency; duration does not. Track sessions, never minutes.
4. **de/het is never taught as a rule.** Nouns are always stored, displayed, and drilled with their article attached. Assignment is arbitrary and rule-teaching fails.
5. **Russian UI uses formal вы** throughout. Never mix registers. Avoid gendered past-tense forms.
6. **Italian content and Dutch content never import each other.** Shared code lives in `packages/`.
7. **Never give immigration, legal, or medical advice.** Teach the language of the appointment, never the substance of the case. Hard-coded refusal in the LLM system prompts.

## Stack

- **Next.js 15** App Router, TypeScript strict, React 19
- **PostgreSQL** (Neon, EU region) + **Drizzle ORM**, SQL migrations committed
- **Tailwind v4**, mobile-first, PWA manifest (no offline in MVP)
- **Auth.js v5**, magic link via Resend. No passwords.
- **Anthropic API** — `claude-sonnet-4-6` for role-play, `claude-haiku-4-5` for debrief parsing and card generation
- **STT**: OpenAI `whisper-1`. See the accuracy warning below.
- **Pronunciation**: Azure AI Speech Pronunciation Assessment, locale `nl-NL` (supported; content/prosody assessment is en-US only, so accuracy + fluency only)
- **SRS**: `ts-fsrs` npm package. Do not implement a scheduler by hand.
- **Audio**: browser `MediaRecorder` → webm/opus → Cloudflare R2
- **Hosting**: Vercel, EU region pinned

## Known technical constraints — do not rediscover these

- **Whisper degrades badly on non-native Dutch.** Fine-tuning research on JASMIN-CGN measured ~42% WER zero-shot for non-native adult Dutch, dropping to ~14% after fine-tuning. Treat raw Whisper output on learner speech as unreliable. Use it for gist and keyword-spotting, not for scoring. Scoring goes through Azure.
- **No public Dutch learner-speech corpus contains L1-Russian speakers.** JASMIN's non-native cohorts are Turkish, Moroccan and French L1. Any accent-specific tuning needs proprietary data — log audio (with consent) from day one so it accumulates.
- **Azure pronunciation assessment is untested on Russian-accented Dutch.** Do not ship a hard pass/fail gate on it. Show scores as guidance, always with an A/B self-compare against a native model. A scorer that punishes correct speech destroys trust immediately.

## Content licensing — read `docs/CONTENT_SOURCES.md` before adding any content

Do not scrape, ingest, adapt, or hotlink third-party material. `heardutchhere.net` is **all rights reserved and explicitly prohibits rewriting, redistribution and hotlinking** — it is a sequencing reference only, never an ingestion source, unless a signed licence appears in that file.

## Repo layout

```
apps/web                 Next.js app
packages/engine          loop, FSRS wrapper, debrief parsing, card generation (locale-agnostic)
packages/asr             pluggable STT + pronunciation providers
packages/db              Drizzle schema, migrations, seed
content/nl/scenarios     Dutch scenario JSON (source of truth, seeded to DB)
content/nl/traps         contrastive interference items
content/it/              Italian, later
docs/                    SPEC.md, BUILD_PLAN.md, CONTENT_SOURCES.md
```

## Commands

```bash
pnpm dev              # app on :3000
pnpm db:generate      # drizzle migration from schema
pnpm db:migrate
pnpm db:seed          # content JSON -> DB, idempotent
pnpm audio:generate   # TTS over content lacking audio, uploads to R2
pnpm test
pnpm lint && pnpm typecheck
```

## Conventions

- Server Components by default; `"use client"` only for audio capture, the role-play view, and the review deck.
- All user-facing Russian strings in `apps/web/lib/strings.ru.ts`. Single locale for UI — **do not install an i18n framework**.
- Dutch target-language text is never translated in the DB; it carries a `ru_gloss` field alongside.
- Every mutation writes a row to `events`. That table is the analytics stack.
- Zod at every API boundary.
- Cyrillic UI chrome and Latin Dutch content must be visually distinct — different type treatment, enforced by two Tailwind component classes (`.ui-ru`, `.target-nl`).

## Definition of done

A milestone is done when: types pass, tests pass, it works on a 375px viewport, all new strings are Russian and formal, GDPR obligations for any new personal data are implemented (not deferred), and `events` rows are emitted.
