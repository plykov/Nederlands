# BUILD_PLAN

> **Phase 1 shipped. Phase 2 is not started.**
> Part A records what was built and what remains within the client-only
> architecture. Part B is the server product, retained as the plan for when a
> backend is justified. See `CLAUDE.md` for the split and its reasoning.

---

# Part A — Phase 1: client-only PWA

Shipped as one build rather than incremental milestones, because there was no
deployed surface to ship to until the whole loop existed. Recorded here as
milestones so the acceptance criteria stay auditable.

## A0 — Scaffold ✅
Vite 5 + React 18 + TS strict, relative `base`, PWA manifest and app-shell
service worker, GitHub Pages via Actions.

**Done when:** `npm run build` passes and the built app works both at domain
root and on a `/<repo>/` subpath. ✅

## A1 — Content ✅
137 scenarios across the six `_SCHEMA.md` domains (A1 35 / A2 62 / B1 40).
104 article-attached nouns, 8 repair moves, 7 openers and recovery moves, 12
grammar notes, 8 course lessons, 39 CEFR can-do statements, tester survey.

**Done when:** every scenario has 4–8 lines, 6+ reply-bank items, 2+ traps, 2+
gate items, and **exactly one `register: "switch"` reply**. Every cross-file id
resolves. ✅ — verified by script.

## A2 — Rehearse ✅
Six steps: brief → your lines → reply bank → traps → phoneme gate → opener.
Normal and slow TTS on every Dutch line.

**Done when:** a user can work through a full scenario on a 375px viewport. ✅

## A3 — Anti-switch trainer ✅
**The differentiating milestone. It was not deferred.**
Opener drill with `MediaRecorder` capture, onset measurement via Web Audio
`AnalyserNode`, speed bands, recovery moves. Reachable from Home, from
RepairView, and as step 6 of Rehearse.

**Done when:** a user records an opener and sees a latency band within seconds;
no score blocks progression. ✅

**Deliberately not met:** hesitation count from ASR word timings. That needs a
transcriber and is Phase 2. Onset detection is an RMS threshold, not speech
recognition — documented as such in the UI, the README and the code.

## A4 — de/het trainer ✅
Two-whole-forms drill over 104 nouns; the noun is never rendered bare. Misses
feed an `article` card source.

**Done when:** no rule is stated anywhere in the app, and no course lesson
teaches one. ✅

## A5 — Listening ✅
Roleplay on the reply bank at three speaker-patience levels. Listening under
procedurally synthesised café / street / phone noise at five levels with
listen limits.

**Done when:** missed items can be pushed into the review deck. ✅

## A6 — Debrief, cards, FSRS review ✅
Debrief captures `stayedInDutch`, what wasn't understood, what couldn't be
said. Both lists become cards. `ts-fsrs` scheduling with 4-button grading.

**Done when:** a debrief produces cards that appear in the review queue and
grading advances the schedule. ✅

## A7 — Ledger, CEFR map, appointments ✅
Ledger surfaces `stayed_in_dutch` as the headline number. Can-do statements
unlock only from logged real conversations, never from rehearsal. Appointments
with countdown on Home. **No streaks, no minutes.** ✅

## A8 — Разбор and Грамматический зал ✅
12 on-demand grammar notes including two positive-transfer notes (particles,
diminutives). 8 lessons with 5 exercises each. No de/het lesson.

## A9 — Tester survey and data control ✅
Phase 0 survey generating copy-paste text; no backend to send it to. Settings
explains the storage position and wipes everything with one button.

## A10 — Word-order builder ✅
SPEC §2.3. Tap-to-place constructor over 20 puzzles, 5 each for V2, inversion,
verb-final and the sentence bracket. Reachable from Home, from `Разбор`, and
directly at `#/wordorder/:structure`. Misses go to the review deck.

**Done when:** a puzzle can be assembled and scored on a 375px viewport; where
two orders are both correct, both pass; no chunk is stored capitalised. ✅ —
the last two are enforced by `npm test`.

## A11 — Staged `er` module ✅
SPEC §2.4. The single `er` lesson is now five (`er-1-bestaan` … `er-5-onderwerp`,
existential/presentative → locative → pronominal → quantitative → placeholder
subject), each gated on 80%+ on the previous via `Lesson.requires`. A locked
lesson renders dimmed and non-tappable in `Грамматический зал`, and a direct
deep link to one shows a redirect to the prerequisite instead of the exercises.
The `Разбор` note keeps all five as a single on-demand reference — that surface
is deliberately not sequential.

**Done when:** the five stages unlock in order and not out of order, on a
375px viewport; a locked lesson cannot be reached by direct link either. ✅ —
`npm test` also verifies every `requires` reference resolves and points to an
earlier lesson, not a later or circular one.

## A12 — Inburgering tracker ✅
SPEC §2.7. `#/inburgering`, reachable from Settings. Sets one of the four
`legal_status` values from the `CLAUDE.md` table; only `obligated` collects an
obligation start date and computes a 3-year countdown, mirroring the
appointment-countdown pattern already on Home. The other three statuses show
their hook and deadline as static text — no invented countdown where there is
no fixed date. Route requirements (KNM, MAP, PVT, plus the route-specific
exam or diploma path) are shown for B1 / Onderwijs / Z. Stored in
`nv.inburgering.v1`, cleared by the existing "delete everything" button.

**Done when:** a countdown renders only where a real date exists; the
advice-boundary sentence appears on every visit; wiping data clears the
profile too. ✅ — `npm test` verifies every status and route is present with
non-empty content.

## A13 — Loanword hook ✅
SPEC §2.6. `#/loanwords`: 10 tap-to-reveal cards of Dutch loanwords in
Russian, plus a "similar but not Dutch" myth-busting section for стул,
галстук and рюкзак. Surfaced two ways: a randomised 3-word teaser in the
first-run onboarding card on Home (the actual hook, shown before the
anti-switch explanation), and a permanent card below the other trainers for
return visits.

`Loanword.source` is typed `vasmer | van_der_sijs` only — no `disputed`
value exists on that type, so a disputed item cannot type-check into
`LOANWORDS` at all. The three CLAUDE.md names as false Dutch etymologies live
in a separate `LOANWORD_MYTHS` array instead.

**Done when:** 8–10 items ship, none disputed; стул/галстук/рюкзак appear
only as myths, never as loanwords. ✅ — `npm test` enforces both: the
`LOANWORDS` length bound and source enum, and that all three named words are
excluded from `LOANWORDS` and present in `LOANWORD_MYTHS`.

## A14 — Accessibility pass ✅
WCAG 2.2 AA. Three real defects fixed, found by auditing rather than assumed:

- **21 `.card.tappable`/`.tappable` `<div onClick>` elements were invisible to
  keyboard and screen-reader users** — no role, no tab stop, no key handler.
  `src/lib/a11y.ts` exports `tappable(onClick)`, spread onto every one of
  them, adding `role="button"`, `tabIndex={0}` and an Enter/Space
  `onKeyDown`. A locked `Грамматический зал` lesson card gets none of this —
  it isn't a control, so it isn't given one.
- **`--orange` failed 4.5:1** on both `--card` and `--orange-soft`
  (4.04 / 3.58) — affects every amber pill and the de/render `.article-het`
  colour, ~30 call sites. Darkened to `#944a09` (7.15 / 6.35), same hue and
  saturation, just lower lightness — visually still "amber", not a rebrand.
- **Locked lesson cards used `opacity: 0.5`** to look disabled, which also
  quietly failed contrast on every child (pill, heading, body text) — dimming
  a whole subtree by opacity scales all of its contrast down with it. Replaced
  with a `.card.locked` class that changes only the background, leaving text
  at full contrast; a locked card should be legible, just not tappable.

Also: every Dutch-text element (`.nl`, `trap-wrong`/`trap-right`, word-order
chips) now carries `lang="nl"` so screen readers switch pronunciation instead
of reading Dutch with Russian phonetics — about 30 call sites. Every
`<select>`/`<input>`/`<textarea>` without a visible adjacent label now has
`aria-label` or `aria-labelledby` (Home's appointment form, the inburgering
date picker, the listening-domain and opener-context selects, Course's
fill-in-the-blank input, Debrief's and Feedback's free-text fields).

**Done when:** an automated WCAG audit shows zero violations on every route,
and every interactive control is reachable and operable by keyboard alone. ✅
— verified with `axe-core` (the same rule engine Lighthouse's accessibility
category runs, invoked directly here since a full Lighthouse/Chrome DevTools
pass isn't available in this sandbox) injected via Playwright across all 20
routes, `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa`/`wcag22aa` rule sets: **0
violations**, down from 1 (the locked-card contrast bug, found and fixed in
the same pass). Keyboard-only navigation confirmed by scripted `Tab`/`Enter`
reaching and activating a Home card in the correct order.

## A15 — Scenario batch 4: 21 more A1 scenarios ✅
Explicit user request, made after deciding against native audio: skip that,
add 21 more A1-level scenarios instead. Takes the library from 36 to **57**
(A1 35 / A2 12 / B1 10), well past the original M12 target of 30–40 —
intentionally, per that request, not a drift. Four bureaucratie, three
gezondheid, four school, four wonen, three werk, three dagelijks — all
distinct "survival" errands not already covered: phone bookings, document
requests, school logistics, neighbour favours, workplace small talk, errands
around town. Same shape as every other batch: exactly one `register:
"switch"` reply each, 2 traps drawn from the scenario's own vocabulary, 2
gate items, matching `CAN_DOS` entries so none is orphaned from the CEFR map.

**Done when:** `npm test` passes with the new totals and every scenario is
reachable from `#/scenarios` and the CEFR map. ✅

## A16 — Scenario batch 5: 50 more A2 scenarios ✅
Explicit user request. Takes the library from 57 to **107** (A1 35 / A2 62 /
B1 10) — nearly triple the original M12 target of 30–40, by deliberate,
repeated request rather than drift. Seven bureaucratie, eight gezondheid,
eight school, nine wonen, nine werk, eight dagelijks — the shift from A1
"survival" errands to A2's more developed situations: negotiating contract
renewal, formal complaints, benefit applications, medical follow-ups,
mediated conflict, subsidy paperwork. Same shape as every batch: exactly one
`register: "switch"` reply, 2 traps drawn from the scenario's own vocabulary,
2 gate items, matching `CAN_DOS` entries.

**Done when:** `npm test` passes with the new totals and every scenario is
reachable from `#/scenarios` and the CEFR map. ✅

## A17 — Scenario batch 6: 30 more B1 scenarios ✅
Explicit user request. Takes the library from 107 to **137** (A1 35 / A2 62 /
B1 40) — well over four times the original M12 target of 30–40. Five per
domain. B1's register shifts again: from A2's developed-but-routine
situations to negotiation, formal dispute and consequence — objecting to a
tax assessment or a parking fine, a second medical opinion, a school-level
appeal, price negotiation on a house, salary negotiation, an immediate-
dismissal dispute, a whistleblower report, a rent-tribunal case, a
debt-collector payment plan. Same shape as every batch: exactly one
`register: "switch"` reply, 2 traps drawn from the scenario's own
vocabulary, 2 gate items, matching `CAN_DOS` entries.

**Done when:** `npm test` passes with the new totals and every scenario is
reachable from `#/scenarios` and the CEFR map. ✅

---

## Phase 1 — what remains

Ordered by value. None of it blocks the others.

Empty. **Native audio for the reply bank was the last item and the user
decided against it**, confirmed explicitly rather than dropped by default:
stick with Web Speech, skip pre-recorded audio for now. Web Speech quality
still varies by platform and remains the single biggest quality lever on the
listening trainers if this is revisited — see `CLAUDE.md`'s Phase 2 stack for
the pre-recorded-audio path (`pnpm audio:generate`, normal + fast variants to
R2) if a backend ever gets built. Nothing here blocks anything else.

Everything else that stood here — scenarios (137 now, well past the original
M12 target of 30–40 by repeated explicit request — A15, A16 and A17 above),
the word-order builder (A10), the staged `er` module (A11), the inburgering
tracker (A12), the loanword hook (A13) and the accessibility pass (A14) — is
done and no longer on this list.

The "no test setup" item that stood here is done: `npm test` runs
`scripts/check-content.mjs`. It should have been struck when that landed.

---

# Part B — Phase 2: the server product

Not started. Execute in order; each milestone ships to production. Do not start
one before the previous one's acceptance criteria pass.

Several Phase 2 milestones have a Phase 1 counterpart that already satisfies the
*user-facing* intent. Those are marked. The Phase 2 version buys sync,
aggregation and measurement — not new user value on day one.

## M0 — Scaffold
Monorepo (pnpm workspaces), Next.js 15 + TS strict, Tailwind v4, Drizzle + Neon
EU, Auth.js magic link via Resend, Vercel EU deploy, CI running lint/typecheck/test.

**Done when:** magic-link login works on the deployed URL; `pnpm db:migrate`
runs clean; CI is green.

## M1 — Content pipeline
Zod validator against `_SCHEMA.md`, idempotent `pnpm db:seed`,
`pnpm audio:generate` (TTS → R2, skips items that already have audio, generates
normal + fast variants for reply-bank items).

**Done when:** `gemeente-inschrijving.json` seeds and every line, reply and gate
item has playable audio. Re-running seed changes nothing.

**Note:** Phase 1 content lives in `src/data/*.ts`, not JSON. Migrating it back
to JSON is part of this milestone, not a separate task.

## M2 — Rehearse, static
*Phase 1 equivalent: A2, shipped.* Rebuild on the server stack with real audio
assets instead of Web Speech.

**Done when:** a user can work through a full scenario on 375px and hear every
asset.

## M3 — Anti-switch trainer, instrumented
*Phase 1 equivalent: A3, shipped without instrumentation.* Adds
`speech_onset_ms` and hesitation count persisted to `rehearsal_turns`, and
hesitation derived from Whisper word timings.

**Done when:** onset and hesitation count are stored per turn; no accuracy score
blocks progression.

## M4 — LLM role-play
Streamed turns via `claude-sonnet-4-6`. The NPC is a Dutch official who is
**realistically unhelpful**: normal speed, no accommodation, and on later runs
**switches to English** so the user must practise recovery. System prompt
hard-refuses immigration/legal/medical advice.

**Done when:** a 6-turn exchange runs under 2s per turn; the English-switch
behaviour fires on run ≥3; the refusal holds against direct and indirect
probing — write tests for this.

## M5 — Phoneme gate, scored
*Phase 1 equivalent: A2's gate step, self-comparison only.* Adds Azure `nl-NL`
accuracy + fluency and a phoneme breakdown alongside the A/B compare, with
honest Russian framing. **Never hard-fails.**

**Done when:** an attempt returns phoneme scores and both clips play
back-to-back; scores are advisory only.

## M6 — Encounters, debrief, card generation
Encounter lifecycle, debrief with `switch_trigger` and voice input, haiku
parsing to ≤5 candidate cards, **user confirmation before deck entry**.

**Done when:** a debrief produces candidate cards, the user edits and accepts
them, and they land in `review_cards`.

## M7 — FSRS review
*Phase 1 equivalent: A6, shipped.* Move the wrapper into `packages/engine`, add
a queue endpoint and `review_logs`.

**Done when:** grading updates stability/difficulty/due correctly, asserted
against `ts-fsrs` reference behaviour in a unit test.

## M8 — de/het trainer + word-order builder
*Phase 1 equivalent: A4 for de/het; the builder is unbuilt in both phases.*
Article deck sourced from actual errors. Drag-and-drop constructor with the
`Разбор` drawer.

**Done when:** both feed and consume `traps`; errors generate cards tagged with
a `trap_code`.

## M9 — Dashboard, ledger, triggers
*Phase 1 equivalent: A7, shipped.* Adds calendar-linked reminders
(`"Четверг, 10:30 — гемеенте. Осталось 2 дня."`). **No streaks, no minutes.**

## M10 — GDPR + analytics
Voice consent, retention cron, export, hard delete cascading to R2, processor
register. `events` emitted on every mutation.

**Done when:** account deletion removes all rows and all R2 objects, verified by
test.

**This is the milestone that Phase 1 avoids by having no server.** It is not
optional once one exists.

## M11 — Onboarding
Loanword hook (8–10 items, `disputed` excluded) → open/closed-syllable
orthography rule → first opener recorded → legal status + deadline → mic consent.

**Done when:** signup to first recorded Dutch utterance is under 20 minutes of
content and instrumented end-to-end.

## M12 — Content scale + polish
30–40 scenarios with full audio. Accessibility pass to WCAG 2.2 AA.

**Done when:** 30 scenarios seeded with full audio; Lighthouse a11y ≥ 95.

---

## Explicitly out of scope, both phases

Community · tandem · Staatsexamen mock exams · CEFR dashboards · xAPI/Caliper ·
headless CMS · leaderboards · teacher tooling · Italian content.

*Offline* was on this list and is now partially in: the Phase 1 service worker
precaches the app shell, so the app opens without a network. Content is bundled,
so it works offline in practice. This was a side effect of the PWA manifest
rather than a decision — treat full offline support as still out of scope.

---

## Instrumentation

| Tier | Metric | Target |
|---|---|---|
| North star | `stayed_in_dutch` rate | rising |
| Activation | first real interaction within 72h | > 40% |
| Behaviour | debrief completion on attempted encounters | > 60% |
| Behaviour | days with a production session per week | ≥ 3 |
| Learning | `switch_trigger = accent \| hesitation` share, falling | −40% over 8 weeks |

**Phase 1 cannot measure any of this in aggregate.** There is no server and no
telemetry by design. `stayed_in_dutch` is visible to the individual user in
their own ledger; everything else is collected by hand through the Phase 0
tester survey, which asks conversation count, Dutch-maintenance rate, switch
cause and unprompted-debrief rate directly. That substitution is the point of
the concierge phase — it is slower but it also returns the *content* that the
metrics alone would not.

Never build a minutes-studied counter.
