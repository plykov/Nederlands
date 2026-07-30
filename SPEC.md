# SPEC — Dutch for Russian Speakers

> **Phase 1 is built. Phase 2 is designed and not built.**
> Sections marked **§P1** describe the shipped client-only PWA. Sections marked
> **§P2** describe the intended server product and have no code behind them.
> See `CLAUDE.md` for the stack split and the reason for it.

## 1. The loop — §P1, built

**Rehearse → Do → Debrief.** Seven minutes before a real interaction, five minutes after.

The user's life supplies the interactions: gemeente appointment, huisarts registration, school meeting, landlord call, work standup. The product does not invent practice; it removes the reason to avoid it.

```
trigger (scheduled appointment)
  → rehearse: brief · your lines · reply bank · traps · phoneme gate · anti-switch opener
  → [real world]
  → debrief: stayed in Dutch? · what you didn't understand · what you couldn't say
  → cards generated → FSRS queue → ledger entry
```

The debrief is the product. What the user failed to understand yesterday becomes their deck today. Across users it would accumulate into a proprietary corpus of what Dutch officialdom actually says — but that aggregation needs a server, so in Phase 1 the corpus is collected by hand through the tester survey.

## 2. Dutch-specific modules

These are what make this not a generic app. Each is a first-class module, not a lesson topic.

### 2.1 Anti-switch trainer — §P1, built
The highest-value module.

- **Opener drill**: a memorised, fluent first line — `"Sorry, ik leer Nederlands. Mag ik het in het Nederlands proberen?"` — scored on **latency, not accuracy**. Target: under 1.2s from prompt to speech onset. Four context variants: `loket`, `telefoon`, `winkel`, `informeel`.
- **Recovery moves**: what to say when they switch anyway (`"Mag ik het toch in het Nederlands doen? Ik moet oefenen."`). Three variants, always available.
- **Repair moves** as core A1 content, not politeness garnish. Eight of them, including the four from the original spec: `"Kunt u dat langzamer herhalen?"` · `"Wat betekent ...?"` · `"Kunt u dat opschrijven?"` · `"Dus ik moet ..., klopt dat?"`
- **Latency scoring**: `onsetMs` measured from recording start to first voiced frame via Web Audio `AnalyserNode`. Displayed as a speed band, never as a grade, never blocking.

**Implemented with a known limit:** onset detection is an RMS loudness threshold, not speech recognition — a cough registers as onset. The hesitation count from ASR word timings is **§P2**; it needs a transcriber. The trade bought by the simpler approach is that no audio leaves the device.

### 2.2 de/het trainer — §P1, built
Nouns are stored, rendered, and drilled **only with their article**. There is no rule view. The drill presents two whole forms — `de huurcontract` vs `het huurcontract` — so the noun never appears bare, and the answer is a phrase rather than a principle. Errors feed a dedicated `article` card source in the review deck. 104 nouns, all harvested from scenario content.

### 2.3 Word-order builder — §P1, built
Constructor for the four structures that break Russian speakers:
1. **V2** in main clauses
2. **Inversion** after a fronted element (`Morgen ga ik...`)
3. **Verb-final** in subordinate clauses (`...omdat ik het niet begrijp`)
4. **Sentence bracket / tangconstructie** and **separable-verb particle placement** (`ik schrijf me in` / `om me in te schrijven`)

Scored on correct placement, with the Russian free-word-order contrast stated per puzzle and in the `Разбор` drawer. 20 puzzles, 5 per structure, most drawn from sentences that already appear in the scenarios.

**Assembly is by tapping, not dragging.** HTML5 drag-and-drop is unreliable on touch and this app is mobile-first; a tap places a chunk, a second tap takes it back, and the same gesture works with a mouse. Chunks are multi-word, so this is a word-*order* exercise, not a word-by-word one.

**Chunks are stored lowercase** and the view capitalises on render — a capitalised chunk would give away which one starts the sentence. `npm test` enforces this.

**Where two orders are both correct, both are accepted** (`accept` on the puzzle) — e.g. `ik heb het document gisteren opgestuurd` and `ik heb gisteren het document opgestuurd`. A drill that marks a correct answer wrong destroys trust, which is the same reason §2.5 ships no automated pronunciation score. `npm test` verifies every `accept` variant is actually reachable by rearranging that puzzle's chunks, so a typo there cannot silently become an unreachable "correct" answer.

### 2.4 "er" module — §P1, built
Taught in this sequence, not all at once: existential/presentative → locative → pronominal (`erover`, `ermee`) → quantitative → placeholder subject. Each stage gated on the previous.

**Phase 1 ships five gated `Грамматический зал` lessons** (`er-1-bestaan` … `er-5-onderwerp`), each requiring 80%+ on the previous via the `Lesson.requires` field — enforced in `Course.tsx` (locked lessons render dimmed and non-tappable, and a direct deep link to a locked lesson shows a redirect to the prerequisite instead of the exercises) and validated by `npm test` (every `requires` reference must resolve and point to an earlier lesson, not a later or circular one). The `Разбор` note covers the same five functions as a single on-demand reference, since that surface is deliberately not sequential.

### 2.5 Phoneme gate — §P1, built
Narrow by design. Only the sounds that damage **intelligibility** (and therefore trigger the English switch), not accent markers:
- `/œy/` (ui) — highest measured error rate in Dutch L2 pronunciation research
- `/øː/` (eu)
- `/y/ /ʏ/` (u, uu) — absent from Russian
- **vowel length pairs** — `loos/los`, `lees/les`, `zaal/zal`
- harde G `/x/ /ɣ/`, and the h–g contrast

**Deprioritised** (accent only, do not gate on): trilled r, palatalised consonants.

**Positive transfer — taught as free wins:** Russian final devoicing already matches Dutch (`hond` → [hont], as `кровь` → [krof']). Russian diminutive and particle systems mean the *concept* of `-je` and of `toch/maar/even/hoor` is already familiar; only the items are new. Both are flagged in the `Разбор` drawer as "это вы уже умеете".

Three gate items per scenario, drawn from that scenario's own vocabulary. Record-and-self-compare against a TTS model; **no automated score** — see §6.

### 2.6 Loanword hook — §P2, not built
~500 Dutch loanwords exist in Russian from Peter the Great's maritime era. Onboarding would reveal 8–10: матрос/matroos, флаг/vlag, каюта/kajuit, брюки/broek, апельсин/appelsien, гавань/haven, шкипер/schipper.

Each item must carry a `source` field (`vasmer` | `van_der_sijs` | `disputed`). **Never ship a word marked `disputed`** — стул, галстук, рюкзак are German or Low German, not Dutch.

### 2.7 Inburgering tracker — §P1, built
Sets `legal_status` and, if applicable, an obligation start date, then surfaces the deadline (3 years from that date) and route (B1 / Onderwijs / Z) with KNM, MAP, PVT and the relevant exam. **Displays deadlines and requirements only — never advises on a case.**

**Phase 1** ships this as `#/inburgering` (`src/views/Inburgering.tsx`, `src/data/inburgering.ts`), reachable from Settings. All four `legal_status` values from the `CLAUDE.md` table are covered; only `obligated` collects a start date and computes a countdown (`nv.inburgering.v1`, wiped by the same "delete everything" button as the rest of `localStorage`). The other three statuses show their hook and deadline text as static reference, with no date arithmetic — there is nothing to count down to. `npm test` verifies every status and every route is present and non-empty. The advice-boundary sentence from rule 7 is shown on every visit to the tracker, not only in Settings and Progress as before.

## 3. Data model — §P1

Everything is `localStorage`, namespaced `nv.*`, written through `src/lib/storage.ts`. Types in `src/types.ts`.

```
nv.ledger.v1        LedgerEntry[]
  id, dateISO, scenarioId?, text
  stayedInDutch: boolean | null      -- north star
  notUnderstood: string[], couldNotSay: string[]

nv.cards.v1         ReviewCard[]
  id, front, back, createdISO, scenarioId?
  source: debrief-heard | debrief-say | scenario | trap | article
  fsrs: serialised ts-fsrs card

nv.appointments.v1  Appointment[]
  id, scenarioId, dateISO, note, rehearsed, debriefed

nv.onboarded.v1     boolean
nv.course.v1        Record<lessonId, bestScore 0..1>
```

Content is compile-time TypeScript in `src/data/`, not rows: `Scenario`, `Reply`, `UserLine`, `Trap`, `GateItem`, `RepairMove`, `Opener`, `Noun`, `CanDo`, `Lesson`, `GrammarNote`.

`storage.wipeAll()` clears every key. That is the entire deletion story, and it is complete.

## 3b. Data model — §P2

The server schema, retained for when there is a server. Unchanged from the original design.

```
users
  id, email, created_at, deleted_at
  arrived_nl_at, city, province
  legal_status            enum: obligated | kennismigrant | temp_protection | naturalisation | other
  inburgering_route       enum|null: b1 | onderwijs | z
  inburgering_deadline    date|null
  cefr_self_assessed
  consent_terms_at, consent_voice_at, voice_retention_days (default 90)

scenarios                 seeded from content JSON
  id, slug, domain, cefr_level, title_ru, brief_ru, order
scenario_lines            id, scenario_id, seq, nl_text, ru_gloss, audio_url, note_ru
reply_bank_items          id, scenario_id, nl_text, ru_gloss, register, frequency_rank,
                          audio_url_normal, audio_url_fast
repair_moves              id, nl_text, ru_gloss, use_case, audio_url
opener_variants           id, nl_text, ru_gloss, context, audio_url
traps                     id, code, title_ru, explanation_ru, examples jsonb
  code enum: de_het | v2 | verb_final | bracket | separable | er | aux_hebben_zijn
            | vowel_length | front_rounded | harde_g | diphthong | particle
            | diminutive | prep_government | false_friend
scenario_traps            join
gate_items                id, scenario_id, nl_text, target_feature, ipa_hint, audio_url_native

encounters                one per real-world attempt — the core object
  id, user_id, scenario_id
  state                   enum: scheduled | rehearsed | attempted | debriefed | abandoned
  scheduled_for, rehearsed_at, attempted_at, debriefed_at
  stayed_in_dutch         boolean|null      -- north star
  switch_trigger          enum|null: accent | hesitation | they_offered | i_switched | unknown
  difficulty_felt         1..5
  not_understood_text, wanted_to_say_text, notes

rehearsal_turns           id, encounter_id, seq, role (user|npc), nl_text, audio_url,
                          asr_confidence, speech_onset_ms, hesitation_count
gate_attempts             id, encounter_id, gate_item_id, audio_url,
                          azure_accuracy, azure_fluency, phoneme_scores jsonb, self_compared
review_cards              id, user_id, front_nl, back_ru, source_type, source_ref, trap_code,
                          fsrs_* , suspended, created_at
review_logs               id, card_id, rating 1..4, reviewed_at, elapsed_days, scheduled_days, state
ledger_entries            id, user_id, encounter_id, date, summary_ru, stayed_in_dutch,
                          unresolved_ru, can_do_code
can_do_descriptors        code, level, domain, text_ru
events                    id, user_id, type, payload jsonb, created_at
```

`switch_trigger` is worth noting as a Phase 1 gap: the debrief records *whether* the conversation stayed in Dutch but not *why* it failed. The tester survey asks it instead.

## 4. Routes — §P1

Hash routing, no router library. `src/App.tsx`.

```
#/                      today: appointments, review count, module entry points
#/scenarios             browse by domain
#/rehearse/:id          the 6-step loop
#/opener  ·  #/opener/:id      anti-switch latency drill
#/articles · #/articles/:id    de/het trainer, optionally scenario-scoped
#/roleplay/:id          listening drill on the reply bank
#/listening             listening under noise
#/debrief/:id?appt=     post-interaction
#/review                FSRS queue
#/ledger                capability ledger
#/progress              CEFR can-do map
#/grammar               Разбор drawer
#/course · #/course/:id грамматический зал
#/repair                openers, recovery and repair moves
#/feedback              Phase 0 tester survey
#/settings              about, thresholds, delete all data
```

## 4b. Routes and API — §P2

```
/                       landing (ru)
/login                  magic link
/onboarding             goal · legal status · arrival · loanword hook · orthography rule
                        · first opener · mic consent + GDPR
/dashboard · /scenarios · /s/[slug] · /s/[slug]/rehearse
/e/[id]/debrief · /review · /ledger · /settings

POST   /api/encounters                      create / schedule
PATCH  /api/encounters/:id                  state transition
POST   /api/rehearse/:id/turn               LLM role-play turn (streamed)
POST   /api/asr                             audio -> transcript + word timings
POST   /api/gate/:id/attempt                Azure nl-NL scoring
POST   /api/debrief/:id                     submit -> candidate cards
POST   /api/cards/confirm                   user accepts/edits before deck entry
GET    /api/review/queue
POST   /api/review/:cardId/grade
POST   /api/account/export
DELETE /api/account
```

## 5. Scoring logic

**Anti-switch — §P1, built.** `onsetMs` from recording start to first voiced frame. Bands: fluent < 1200ms, hesitant 1200–2500ms, slow > 2500ms. Accuracy is not measured at all and never gates progression. Hesitation count from ASR word timings is **§P2**.

**Pronunciation — §P1 is self-comparison only.** Record, play back against a TTS model, judge for yourself. There is deliberately **no automated score**, because Azure `nl-NL` assessment is untested on Russian-accented Dutch and a scorer that punishes correct speech destroys trust on first contact. When Phase 2 adds Azure accuracy + fluency, it must be presented as guidance beside the A/B compare, and the copy must state plainly in Russian that it is a rough indicator (`это ориентир, а не оценка`). No hard pass/fail, ever.

**Debrief → cards — §P1 is verbatim.** What the user types becomes the card front directly; they are already authoring it, so there is nothing to confirm. **§P2**: haiku parses `not_understood_text` and `wanted_to_say_text` into ≤5 candidate cards as structured JSON `{front_nl, back_ru, trap_code?}`, and **the user confirms or edits before anything enters the deck** — that confirmation step is not optional, it protects autonomy and card quality.

## 6. GDPR

**§P1 — satisfied by construction.** There is no server, so there is no controller-side personal data. Voice recordings live in page memory and are revoked on unmount; nothing is uploaded. `localStorage` holds only what the user typed. One button in Settings wipes everything. No analytics, no telemetry, no third-party requests at runtime.

**§P2 — required at launch, not deferrable.** All users are EU-resident and voice is personal data. Explicit separate consent for voice; EU data residency (Neon EU, Vercel EU, R2 EU jurisdiction); configurable retention with a 90-day default and a cron purge; full export; hard delete cascading to R2 objects; a processor register covering Anthropic, OpenAI, Azure and Resend.

The Phase 1 posture is not a shortcut around this — it is the reason Phase 1 could ship without it.
