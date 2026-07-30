import { useMemo, useState } from "react";
import {
  PUZZLES,
  STRUCTURES,
  puzzlesFor,
  renderSentence,
  solutionsOf,
  structureById,
  type StructureId,
  type WordOrderPuzzle,
} from "../data/wordorder";
import { canSpeak, speakDutch } from "../lib/speech";
import { addCards, newCard } from "../lib/srs";

/**
 * Конструктор порядка слов (SPEC §2.3).
 *
 * Собирается касанием, а не перетаскиванием: HTML5 drag-and-drop на тачскринах
 * работает плохо, а приложение в первую очередь телефонное. Тап по фрагменту в
 * банке ставит его в строку, тап в строке — возвращает обратно. Тот же жест
 * работает и мышью, так что отдельной ветки для десктопа не нужно.
 */

const ROUND = 6;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Фрагменты нумеруются: одно и то же слово может встречаться дважды. */
interface Chip {
  key: number;
  word: string;
}

function Puzzle({
  puzzle,
  index,
  total,
  onResult,
}: {
  puzzle: WordOrderPuzzle;
  index: number;
  total: number;
  onResult: (correct: boolean) => void;
}) {
  const bankStart = useMemo<Chip[]>(
    () => shuffle(puzzle.chunks.map((word, key) => ({ word, key }))),
    [puzzle]
  );
  const [bank, setBank] = useState<Chip[]>(bankStart);
  const [line, setLine] = useState<Chip[]>([]);
  const [checked, setChecked] = useState(false);

  const place = (chip: Chip) => {
    if (checked) return;
    setBank(bank.filter((c) => c.key !== chip.key));
    setLine([...line, chip]);
  };

  const recall = (chip: Chip) => {
    if (checked) return;
    setLine(line.filter((c) => c.key !== chip.key));
    setBank([...bank, chip]);
  };

  const attempt = line.map((c) => c.word).join(" ");
  const correct = solutionsOf(puzzle).includes(attempt);
  const ready = bank.length === 0;

  const check = () => {
    setChecked(true);
    if (canSpeak() && correct) speakDutch(renderSentence(line.map((c) => c.word)), 0.9);
  };

  return (
    <div>
      <p className="muted small">
        Фраза {index + 1} из {total} · {structureById(puzzle.structure)?.title}
      </p>
      <div className="progress">
        <div style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <div className="card">
        <p className="ru">{puzzle.ru}</p>
        <p className="small muted">Соберите нидерландскую фразу.</p>

        <div className={`wo-line ${checked ? (correct ? "ok" : "bad") : ""}`}>
          {line.length === 0 && (
            <span className="wo-placeholder">Нажимайте на слова внизу</span>
          )}
          {line.map((chip) => (
            <button
              key={chip.key}
              className="chip placed"
              onClick={() => recall(chip)}
              disabled={checked}
            >
              {chip.word}
            </button>
          ))}
        </div>

        {bank.length > 0 && (
          <div className="wo-bank">
            {bank.map((chip) => (
              <button key={chip.key} className="chip" onClick={() => place(chip)}>
                {chip.word}
              </button>
            ))}
          </div>
        )}
      </div>

      {!checked ? (
        <>
          <button disabled={!ready} onClick={check}>
            {ready ? "Проверить" : `Осталось слов: ${bank.length}`}
          </button>
          {line.length > 0 && (
            <button
              className="ghost"
              onClick={() => {
                setBank(bankStart);
                setLine([]);
              }}
            >
              Собрать заново
            </button>
          )}
        </>
      ) : (
        <div className="card">
          <p className="small">
            {correct ? (
              <span className="pill">верно</span>
            ) : (
              <span className="pill red">не тот порядок</span>
            )}
          </p>

          {!correct && (
            <>
              <p className="small muted">Ваш вариант:</p>
              <p className="trap-wrong">{renderSentence(line.map((c) => c.word))}</p>
              <p className="small muted">Правильно:</p>
            </>
          )}
          <p className="nl">{renderSentence(puzzle.chunks)}</p>
          {puzzle.accept?.length ? (
            <p className="small muted">
              Так тоже верно: {renderSentence(puzzle.accept[0].split(" "))}
            </p>
          ) : null}

          <p className="small muted">{puzzle.why}</p>

          {canSpeak() && (
            <button
              className="inline secondary"
              onClick={() => speakDutch(renderSentence(puzzle.chunks), 0.9)}
            >
              🔊 Как это звучит
            </button>
          )}
          <button onClick={() => onResult(correct)}>
            {index + 1 === total ? "Итоги" : "Дальше"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function WordOrder({ structure }: { structure?: string }) {
  // Заход по прямой ссылке #/wordorder/v2 сразу начинает раунд; #/wordorder
  // без параметра показывает выбор структуры.
  const picked: StructureId | "all" | null = STRUCTURES.some(
    (s) => s.id === structure
  )
    ? (structure as StructureId)
    : structure === "all"
      ? "all"
      : null;

  const [chosen, setChosen] = useState<StructureId | "all" | null>(picked);
  const [deck, setDeck] = useState<WordOrderPuzzle[] | null>(() =>
    picked ? shuffle(puzzlesFor(picked)).slice(0, ROUND) : null
  );
  const [idx, setIdx] = useState(0);
  const [missed, setMissed] = useState<WordOrderPuzzle[]>([]);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const begin = (s: StructureId | "all") => {
    setChosen(s);
    setDeck(shuffle(puzzlesFor(s)).slice(0, ROUND));
    setIdx(0);
    setMissed([]);
    setDone(false);
    setSaved(false);
  };

  const backToStructures = () => {
    setChosen(null);
    setDeck(null);
    if (location.hash !== "#/wordorder") location.hash = "#/wordorder";
  };

  const record = (correct: boolean) => {
    if (!deck) return;
    const nextMissed = correct ? missed : [...missed, deck[idx]];
    setMissed(nextMissed);
    if (idx + 1 >= deck.length) setDone(true);
    else setIdx(idx + 1);
  };

  const saveMissed = () => {
    addCards(
      missed.map((p) =>
        newCard(renderSentence(p.chunks), `${p.ru} — ${p.why}`, "trap", p.scenarioId)
      )
    );
    setSaved(true);
  };

  // ── Выбор структуры ──
  if (!deck) {
    return (
      <div>
        <button className="ghost" onClick={() => history.back()}>
          ← Назад
        </button>
        <h1>Порядок слов</h1>
        <p className="muted">
          Четыре структуры, на которых ломается русскоязычный. Ломается не от
          незнания — в русском порядок слов свободный, и переставлять ничего не
          приходится. Здесь фраза собирается руками, пока перестановка не станет
          автоматической.
        </p>

        {STRUCTURES.map((s) => (
          <div className="card tappable" key={s.id} onClick={() => begin(s.id)}>
            <span className="pill amber">{puzzlesFor(s.id).length} фраз</span>
            <p className="lead">{s.title}</p>
            <p className="ru">{s.gist}</p>
          </div>
        ))}

        <div className="card tappable" onClick={() => begin("all")}>
          <span className="pill">{PUZZLES.length} фраз</span>
          <p className="lead">Всё вперемешку</p>
          <p className="ru">
            Так это и происходит в разговоре: структуры не объявляют о себе заранее.
          </p>
        </div>

        <p className="small muted">
          Это тренажёр, а не экзамен. Там, где допустимы два порядка, засчитываются
          оба — оценщик, который бракует правильный ответ, разрушает доверие.
        </p>
      </div>
    );
  }

  // ── Итоги ──
  if (done) {
    const right = deck.length - missed.length;
    return (
      <div className="center">
        <h1>{missed.length === 0 ? "Собрано всё" : "Раунд пройден"}</h1>
        <p className="lead">
          {right} из {deck.length}
        </p>
        <p className="ru">
          {missed.length === 0
            ? "Порядок слов держится. Дальше он будет попадаться вам в сценариях."
            : "Пересобрать ту же фразу через день — самый быстрый способ закрепить перестановку."}
        </p>

        {missed.length > 0 && (
          <>
            <div className="card">
              <h3>Что не собралось</h3>
              {missed.map((p) => (
                <p key={p.id}>
                  <span className="nl">{renderSentence(p.chunks)}</span>
                  <br />
                  <span className="ru">{p.ru}</span>
                </p>
              ))}
            </div>
            <button className="secondary" onClick={saveMissed} disabled={saved}>
              {saved ? "Добавлено в повторение ✓" : `В повторение (${missed.length})`}
            </button>
          </>
        )}

        <button onClick={() => begin(chosen ?? "all")}>Ещё раунд</button>
        <button className="secondary" onClick={backToStructures}>
          Выбрать другую структуру
        </button>
      </div>
    );
  }

  // ── Раунд ──
  return (
    <div>
      <button className="ghost" onClick={backToStructures}>
        ← Структуры
      </button>
      <h1>Порядок слов</h1>
      <Puzzle
        key={deck[idx].id}
        puzzle={deck[idx]}
        index={idx}
        total={deck.length}
        onResult={record}
      />
    </div>
  );
}
