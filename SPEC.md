# SPEC — Dutch for Russian Speakers

## 1. The loop

**Rehearse → Do → Debrief.** Seven minutes before a real interaction, five minutes after.

The user's life supplies the interactions: gemeente appointment, huisarts registration, school meeting, landlord call, work standup. The product does not invent practice; it removes the reason to avoid it.

```
trigger (scheduled appointment)
  → rehearse: brief · your lines · reply bank · phoneme gate · anti-switch opener · role-play
  → [real world]
  → debrief: stayed in Dutch? · what you didn't understand · what you couldn't say
  → cards generated → FSRS queue → ledger entry
```

The debrief is the product. What the user failed to understand yesterday becomes their deck today, and across users it accumulates into a proprietary corpus of what Dutch officialdom actually says.

## 2. Dutch-specific modules

These are what make this not a generic app. Each is a first-class module, not a lesson topic.

### 2.1 Anti-switch trainer
The highest-value module. Trains the learner to hold an interaction in Dutch.

- **Opener drill**: a memorised, fluent first line — `"Sorry, ik leer Nederlands. Mag ik het in het Nederlands proberen?"` — scored on **latency and prosody, not accuracy**. Target: under 1.2s from prompt to speech onset, no mid-phrase hesitation.
- **Recovery moves**: what to say when they switch anyway (`"Mag ik het toch in het Nederlands doen? Ik moet oefenen."`).
- **Repair moves** as core A1 content, not politeness garnish: `"Kunt u dat langzamer herhalen?"` · `"Wat betekent ...?"` · `"Kunt u dat opschrijven?"` · `"Dus ik moet ..., klopt dat?"`
- **Latency scoring**: `speech_onset_ms` from prompt end to first voiced frame, plus a hesitation count from the ASR word timings. Displayed as a speed band, never as a grade.

### 2.2 de/het trainer
Nouns are stored, rendered, and drilled **only with their article**. There is no rule view. Cards are `het huurcontract` / `де huurcontract` — never `huurcontract (het)`. Errors feed a dedicated high-frequency sub-deck.

### 2.3 Word-order builder
Drag-and-drop constructor for the four structures that break Russian speakers:
1. **V2** in main clauses
2. **Inversion** after a fronted element (`Morgen ga ik...`)
3. **Verb-final** in subordinate clauses (`...omdat ik het niet begrijp`)
4. **Sentence bracket / tangconstructie** and **separable-verb particle placement** (`ik schrijf me in` / `om me in te schrijven`)

Scored on correct placement, with the Russian free-word-order contrast shown in the `Разбор` drawer.

### 2.4 "er" module
Taught in this sequence, not all at once: existential/presentative → locative → pronominal (`erover`, `ermee`) → quantitative → placeholder subject. Each stage gated on the previous.

### 2.5 Phoneme gate
Narrow by design. Only the sounds that damage **intelligibility** (and therefore trigger the English switch), not accent markers:
- `/œy/` (ui) — highest measured error rate in Dutch L2 pronunciation research
- `/øː/` (eu)
- `/y/ /ʏ/` (u, uu) — absent from Russian
- **vowel length pairs** — `loos/los`, `lees/les`, `zaal/zal`
- harde G `/x/ /ɣ/`, and the h–g contrast

**Deprioritised** (accent only, do not gate on): trilled r, palatalised consonants.

**Positive transfer — teach as free wins:** Russian final devoicing already matches Dutch (`hond` → [hont], as `кровь` → [krof']). Russian diminutive and particle systems mean the *concept* of `-je` and of `toch/maar/even/hoor` is already familiar; only the items are new.

### 2.6 Loanword hook (onboarding only)
~500 Dutch loanwords exist in Russian from Peter the Great's maritime era. Onboarding reveals 8–10: матрос/matroos, флаг/vlag, каюта/kajuit, брюки/broek, апельсин/appelsien, зонтик/zondek, гавань/haven, шкипер/schipper.

Each item in `content/nl/loanwords.json` carries a `source` field (`vasmer` | `van_der_sijs` | `disputed`). **Never ship a word marked `disputed`** — стул, галстук, рюкзак are German or Low German, not Dutch.

### 2.7 Inburgering tracker
Onboarding sets `legal_status` and, if applicable, `inburgering_deadline` (3 years from obligation start). Surfaces: route (B1 / Onderwijs / Z), KNM, MAP, PVT, and Staatsexamen NT2 Programma I (B1) / II (B2). **Displays deadlines and requirements only — never advises on a case.**

## 3. Data model

```
users
  id, email, created_at, deleted_at
  arrived_nl_at, city, province
  legal_status            enum: obligated | kennismigrant | temp_protection | naturalisation | other
  inburgering_route       enum|null: b1 | onderwijs | z
  inburgering_deadline    date|null
  cefr_self_assessed
  consent_terms_at, consent_voice_at, voice_retention_days (default 90)

scenarios                 seeded from content/nl/scenarios/*.json
  id, slug, domain, cefr_level, title_ru, brief_ru, order

scenario_lines            what the learner says
  id, scenario_id, seq, nl_text, ru_gloss, audio_url, note_ru

reply_bank_items          what comes back — the differentiator
  id, scenario_id, nl_text, ru_gloss, register, frequency_rank
  audio_url_normal, audio_url_fast

repair_moves              global, not per-scenario
  id, nl_text, ru_gloss, use_case, audio_url

opener_variants           anti-switch openers
  id, nl_text, ru_gloss, context, audio_url

traps
  id, code, title_ru, explanation_ru, examples jsonb
  code enum: de_het | v2 | verb_final | bracket | separable | er | aux_hebben_zijn
            | vowel_length | front_rounded | harde_g | diphthong | particle
            | diminutive | prep_government | false_friend

scenario_traps            join
gate_items
  id, scenario_id, nl_text, target_feature, ipa_hint, audio_url_native

encounters                one per real-world attempt — the core object
  id, user_id, scenario_id
  state                   enum: scheduled | rehearsed | attempted | debriefed | abandoned
  scheduled_for, rehearsed_at, attempted_at, debriefed_at
  stayed_in_dutch         boolean|null      -- north star
  switch_trigger          enum|null: accent | hesitation | they_offered | i_switched | unknown
  difficulty_felt         1..5
  not_understood_text, wanted_to_say_text, notes

rehearsal_turns
  id, encounter_id, seq, role (user|npc), nl_text, audio_url, asr_confidence
  speech_onset_ms, hesitation_count

gate_attempts
  id, encounter_id, gate_item_id, audio_url
  azure_accuracy, azure_fluency, phoneme_scores jsonb, self_compared boolean

review_cards
  id, user_id, front_nl, back_ru, source_type, source_ref, trap_code
  fsrs_due, fsrs_stability, fsrs_difficulty, fsrs_state, fsrs_reps, fsrs_lapses, fsrs_last_review
  suspended, created_at

review_logs
  id, card_id, rating 1..4, reviewed_at, elapsed_days, scheduled_days, state

ledger_entries            Capability Ledger
  id, user_id, encounter_id, date, summary_ru, stayed_in_dutch, unresolved_ru, can_do_code

can_do_descriptors        CEFR map, built now, surfaced in Phase 2
  code, level, domain, text_ru

events
  id, user_id, type, payload jsonb, created_at
```

## 4. Routes

```
/                       landing (ru)
/login                  magic link
/onboarding             goal · legal status · arrival · loanword hook · orthography rule
                        · first opener · mic consent + GDPR
/dashboard              next encounter · review count · ledger tail
/scenarios              browse by domain
/s/[slug]               brief
/s/[slug]/rehearse      the 7-minute loop
/e/[id]/debrief         post-interaction
/review                 FSRS queue
/ledger                 capability ledger
/settings               export · delete · voice retention
```

## 5. API

```
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

## 6. Scoring logic

**Anti-switch (primary):** `speech_onset_ms` + hesitation count from ASR word timings. Bands: fluent < 1200ms, hesitant 1200–2500ms, slow > 2500ms. Accuracy is reported but does **not** gate progression.

**Pronunciation:** Azure `nl-NL` accuracy + fluency, phoneme-level. Presented as guidance beside an A/B self-compare against the native model. Copy must state plainly, in Russian, that it is a rough indicator (`это ориентир, а не оценка`). No hard pass/fail — see the untested-accent warning in CLAUDE.md.

**Debrief → cards:** haiku parses `not_understood_text` and `wanted_to_say_text` into ≤5 candidate cards as structured JSON `{front_nl, back_ru, trap_code?}`. **User confirms or edits before anything enters the deck** — protects autonomy and card quality.

## 7. GDPR (Phase 1, not deferred)

All users are EU-resident and voice is personal data. Required at launch: explicit separate consent for voice; EU data residency (Neon EU, Vercel EU, R2 EU jurisdiction); configurable retention with a 90-day default and a cron purge; full export; hard delete cascading to R2 objects; a processor register for Anthropic, OpenAI, Azure, Resend.
