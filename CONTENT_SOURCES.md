# CONTENT_SOURCES

Binding register. **Do not ingest any source not listed as CLEARED.** When adding content, record its source in the JSON `provenance` field.

---

## BLOCKED

### heardutchhere.net (Marco Schuffelen)
**Status: blocked. Reference only.**

Copyright notice: © Marco Schuffelen, all rights reserved — *"This material may not be published, broadcast, rewritten, redistributed, or hotlinked to."* That prohibits copying, **adaptation** ("rewritten"), redistribution, and **embedding his audio**.

Secondary mismatch: it is an English→Dutch course. Its scaffolding is in the wrong L1 and it contains no RU→NL contrastive layer.

**Permitted:** reading it to inform curriculum *sequencing* and topic ordering. Pedagogical structure and factual grammar rules are not copyrightable; his expression is. Any wording, example sentence, explanation or audio file must be independently authored.

**Not permitted:** scraping, ingesting, paraphrasing his explanations, reusing his example sentences, embedding or linking directly to his MP3s.

**Action open:** email the author to license the audio corpus. Single-author personal site, long-running — a licence is plausible and cheap. If granted, replace this section with the licence terms and scope, and only then may ingestion begin.

### Other blocked
Boom / Coutinho / Intertaal NT2 textbooks (Delftse methode, Nederlands in gang, Contact!, Code, TaalCompleet) — all commercial, all rights reserved. Study for sequencing; ingest nothing.

CGN and JASMIN-CGN corpora — require an INT academic licence; not cleared for commercial use. If used for ASR fine-tuning, obtain the licence first and record it here.

---

## CLEARED

| Source | Licence | Use |
|---|---|---|
| **Rijksoverheid.nl, IND, DUO, gemeente sites** | Dutch government content is generally freely reusable (verify per page) | **The bureaucratic scenario library.** Real inburgering, permit and municipal register language, straight from the source. Highest-value cleared input. |
| **Wiktionary / Wikidata** | CC BY-SA | Vocabulary, **de/het gender**, IPA. Attribution required. |
| **OpenTaal wordlist** | Open (BSD/CC) | Frequency lists, article assignment, spellcheck. |
| **Tatoeba** | CC BY 2.0 FR | Sentence pairs — **has both Dutch and Russian**, so direct RU-NL pairs exist. Attribution required. |
| **Mozilla Common Voice (nl)** | CC0 | Native audio, ASR evaluation. |
| **Dutch Wikipedia / Wikinews** | CC BY-SA | Reading material at B1+. |
| **Vasmer (Фасмер), van der Sijs *Nederlandse woorden wereldwijd*, Uitleenwoordenbank** | Reference works — cite, don't copy | Per-word etymology for the loanword hook. Record which authority backs each word. |

## Generated

**Audio is generated, never borrowed.** `pnpm audio:generate` runs commercial TTS with explicit commercial-use rights, producing normal and fast variants. This sidesteps the licensing problem entirely and gives control over speed, which the reply-bank module needs.

**Scenario text is authored**, sourced from: government page language (cleared), Phase 0 user debriefs (own data, consented), and paid bilingual RU-NL contributors under work-for-hire with IP assignment.

---

## Rule for Claude Code

Before adding any content file, confirm its source appears under CLEARED and populate `provenance`. If a source is not listed, stop and ask. Do not assume that publicly reachable means reusable.
