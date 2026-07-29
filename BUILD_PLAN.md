# BUILD_PLAN

Execute in order. Each milestone ships to production. Do not start a milestone before the previous one's acceptance criteria pass.

---

## M0 — Scaffold
Monorepo (pnpm workspaces), Next.js 15 + TS strict, Tailwind v4, Drizzle + Neon EU, Auth.js magic link via Resend, Vercel EU deploy, GitHub Actions running lint/typecheck/test.

**Done when:** a magic-link login works on the deployed URL; `pnpm db:migrate` runs clean; CI is green.

---

## M1 — Content pipeline
JSON schema in `content/nl/scenarios/_SCHEMA.md`, Zod validator, idempotent `pnpm db:seed`, `pnpm audio:generate` (TTS → R2, skips items that already have audio, generates normal + fast variants for reply-bank items).

**Done when:** the worked example `gemeente-inschrijving.json` seeds and every line, reply and gate item has playable audio. Re-running seed changes nothing.

---

## M2 — Rehearse, static
Scenario brief in Russian → your lines → reply bank with normal/fast playback → repair moves. No AI yet.

**Done when:** a user can work through a full scenario on a 375px viewport and hear every asset.

---

## M3 — Anti-switch trainer
**The differentiating milestone. Do not defer it.**
Opener drill with `MediaRecorder` capture, `speech_onset_ms` measurement, hesitation count from Whisper word timings, speed bands, recovery moves.

**Done when:** a user records an opener and sees a latency band within 3s; `rehearsal_turns` stores onset and hesitation count; no accuracy score blocks progression.

---

## M4 — LLM role-play
Streamed turns via `claude-sonnet-4-6`. The NPC is a Dutch official who is **realistically unhelpful**: normal speed, no accommodation, and on later runs **switches to English** so the user must practise recovery. System prompt hard-refuses immigration/legal/medical advice.

**Done when:** a 6-turn exchange runs under 2s per turn; the English-switch behaviour fires on run ≥3; the refusal holds against direct and indirect probing (write tests for this).

---

## M5 — Phoneme gate
Azure `nl-NL` accuracy + fluency, phoneme breakdown, A/B self-compare against native audio, honest Russian framing copy. Never hard-fails.

**Done when:** an attempt returns phoneme scores and both audio clips play back-to-back; scores are advisory only.

---

## M6 — Encounters + debrief + card generation
Encounter lifecycle, debrief form (`stayed_in_dutch`, `switch_trigger`, free text + voice), haiku parsing to ≤5 candidate cards, user confirmation step.

**Done when:** a debrief produces candidate cards, the user edits and accepts them, and they land in `review_cards`.

---

## M7 — FSRS review
`ts-fsrs` wrapper in `packages/engine`, queue endpoint, 4-button grading, `review_logs` written.

**Done when:** grading updates stability/difficulty/due correctly; a unit test asserts scheduling against `ts-fsrs` reference behaviour.

---

## M8 — de/het trainer + word-order builder
Article-attached noun deck sourced from errors. Drag-and-drop constructor for V2, inversion, verb-final, bracket and separable particles, with the `Разбор` drawer.

**Done when:** both feed and consume `traps`; errors generate cards tagged with a `trap_code`.

---

## M9 — Dashboard, ledger, triggers
Next encounter, review count, ledger tail. Appointment scheduling with a calendar-linked reminder (`"Четверг, 10:30 — гемеенте. Осталось 2 дня."`). **No streaks, no minutes.**

**Done when:** scheduling an encounter produces a reminder and the ledger renders dated entries including the unresolved half.

---

## M10 — GDPR + analytics
Voice consent, retention cron, export, hard delete cascading to R2, processor register. `events` emitted on every mutation.

**Done when:** account deletion removes all rows and all R2 objects, verified by test.

---

## M11 — Onboarding
Loanword hook (8–10 items, `disputed` excluded) → open/closed-syllable orthography rule → first opener recorded → legal status + deadline → mic consent.

**Done when:** signup to first recorded Dutch utterance is under 20 minutes of content and instrumented end-to-end.

---

## M12 — Content scale + polish
30–40 scenarios across: **gemeente · huisarts/apotheek/ziekenhuis · school en kinderen · wonen en verhuurder · werk · winkels en buren**. PWA manifest. Accessibility pass to WCAG 2.2 AA.

**Done when:** 30 scenarios seeded with full audio; Lighthouse a11y ≥ 95.

---

## Explicitly out of scope for Phase 1
Community · tandem · Staatsexamen mock exams · CEFR dashboards · xAPI/Caliper · headless CMS · leaderboards · offline · teacher tooling · Italian content.

---

## Instrumentation from M6 onward

| Tier | Metric | Target |
|---|---|---|
| North star | `stayed_in_dutch` rate | rising |
| Activation | first real interaction within 72h | > 40% |
| Behaviour | debrief completion on attempted encounters | > 60% |
| Behaviour | days with a production session per week | ≥ 3 |
| Learning | `switch_trigger = accent \| hesitation` share, falling | −40% over 8 weeks |

Never build a minutes-studied counter.
