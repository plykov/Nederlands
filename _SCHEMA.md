# Scenario schema

One JSON file per scenario. `pnpm db:seed` validates against Zod and upserts by `slug`. Written by bilingual RU-NL contributors; no code knowledge needed.

## Fields

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | kebab-case, stable, never reused |
| `domain` | yes | `bureaucratie` · `gezondheid` · `school` · `wonen` · `werk` · `dagelijks` |
| `cefr_level` | yes | A1 / A2 / B1 |
| `order` | yes | sort within domain |
| `provenance` | yes | source + licence status. See `docs/CONTENT_SOURCES.md`. Seed **fails** if absent. |
| `title_ru`, `brief_ru` | yes | Russian, formal вы. The brief says what will actually happen, in order — including that the official won't slow down. |
| `opener_context` | yes | which anti-switch opener fits: `loket` · `telefoon` · `winkel` · `informeel` |
| `lines` | yes | 4–8. What the learner says. |
| `reply_bank` | yes | 6–12. **What comes back at them.** The most valuable part of the file. |
| `gate_items` | yes | 3–5 pronunciation targets drawn from this scenario's own vocabulary |
| `traps` | yes | `trap_code` values this scenario exercises |
| `can_do_code` | yes | CEFR descriptor reference |

Audio URLs are **not** authored — `pnpm audio:generate` fills them.

## Rules for authors

1. **The reply bank is the point.** Write what officials, doctors and landlords actually say — formulaic, fast, unaccommodating. Not textbook Dutch. Harvest from real encounters and from cleared government page language.
2. **Always include one `register: "switch"` entry** — the moment they offer English. The learner must rehearse that moment.
3. **Nouns always carry their article** in glosses and notes. Never `huurcontract` alone; always `het huurcontract`.
4. `note_ru` is one or two sentences, in Russian, contrastive where it helps. Explain the Dutch behaviour against the Russian expectation. No grammar lectures — the `Разбор` drawer handles depth.
5. **Gate items come from this scenario's own words.** Don't import generic minimal pairs; the learner should drill sounds they are about to need.
6. Prefer scenarios with a **scheduled trigger** (an appointment known days ahead). Those drive the reminder loop.
7. Keep learner lines short and sayable under stress. Six words beats twelve.

## Trap codes

`de_het` · `v2` · `verb_final` · `bracket` · `separable` · `er` · `aux_hebben_zijn` · `vowel_length` · `front_rounded` · `harde_g` · `diphthong` · `particle` · `diminutive` · `prep_government` · `false_friend`

## Worked example

`gemeente-inschrijving.json` is the reference implementation. Match its shape and depth.
