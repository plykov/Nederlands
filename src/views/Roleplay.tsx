import { useState } from "react";
import { scenarioById } from "../data/scenarios";
import { canSpeak, speakDutch } from "../lib/speech";
import { addCards, newCard } from "../lib/srs";
import type { Reply } from "../types";

/**
 * Ролевая тренировка на банке ответов: приложение говорит — вы понимаете.
 * Уровни повторяют реальную деградацию условий:
 *   1 — терпеливый собеседник: медленно, текст доступен
 *   2 — обычное окошко: полная скорость
 *   3 — «неудобный» собеседник: быстро, подсказка только после двух прослушиваний
 */
const LEVELS = [
  { rate: 0.8, label: "Терпеливый собеседник", minListens: 0 },
  { rate: 1.0, label: "Обычное окошко", minListens: 0 },
  { rate: 1.15, label: "Спешит и не ждёт", minListens: 2 },
] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Roleplay({ scenarioId }: { scenarioId?: string }) {
  const s = scenarioId ? scenarioById(scenarioId) : undefined;
  const [level, setLevel] = useState(0);
  const [queue, setQueue] = useState<Reply[]>(() => (s ? shuffle(s.replyBank) : []));
  const [idx, setIdx] = useState(0);
  const [listens, setListens] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [missed, setMissed] = useState<Reply[]>([]);
  const [finished, setFinished] = useState(false);
  const [savedCards, setSavedCards] = useState(false);

  const lv = LEVELS[level];
  const reply = queue[idx];

  const restart = (nextLevel: number) => {
    if (!s) return;
    setLevel(nextLevel);
    setQueue(shuffle(s.replyBank));
    setIdx(0);
    setListens(0);
    setRevealed(false);
    setMissed([]);
    setFinished(false);
    setSavedCards(false);
  };

  const listen = () => {
    if (!reply) return;
    speakDutch(reply.nl, lv.rate);
    setListens(listens + 1);
  };

  const answer = (understood: boolean) => {
    if (!reply) return;
    const nextMissed = understood ? missed : [...missed, reply];
    if (idx + 1 >= queue.length) {
      setMissed(nextMissed);
      setFinished(true);
    } else {
      setMissed(nextMissed);
      setIdx(idx + 1);
      setListens(0);
      setRevealed(false);
    }
  };

  const saveMissed = () => {
    if (!s) return;
    addCards(missed.map((r) => newCard(r.nl, r.ru, "scenario", s.id)));
    setSavedCards(true);
  };

  if (!s) {
    return (
      <div>
        <h1>Сценарий не найден</h1>
        <button onClick={() => (location.hash = "#/scenarios")}>К сценариям</button>
      </div>
    );
  }

  if (!canSpeak()) {
    return (
      <div>
        <button className="ghost" onClick={() => history.back()}>
          ← Назад
        </button>
        <h1>Ролевая тренировка</h1>
        <p className="ru">
          В этом браузере нет синтеза речи. Откройте приложение в Chrome или
          Safari — там тренировка на слух заработает.
        </p>
      </div>
    );
  }

  if (finished) {
    const got = queue.length - missed.length;
    return (
      <div className="center">
        <h1>Раунд пройден</h1>
        <p className="lead">
          Понято на слух: {got} из {queue.length}
        </p>
        <p className="ru">Уровень: {lv.label}</p>
        {missed.length > 0 && (
          <button className="secondary" onClick={saveMissed} disabled={savedCards}>
            {savedCards
              ? "Добавлено в повторение ✓"
              : `Непонятое (${missed.length}) — в повторение`}
          </button>
        )}
        {level < LEVELS.length - 1 && got === queue.length ? (
          <button onClick={() => restart(level + 1)}>
            Уровень выше: {LEVELS[level + 1].label}
          </button>
        ) : (
          <button onClick={() => restart(level)}>Ещё раз этот уровень</button>
        )}
        <button
          className="secondary"
          onClick={() => (location.hash = `#/rehearse/${s.id}`)}
        >
          К репетиции сценария
        </button>
      </div>
    );
  }

  const canReveal = listens >= lv.minListens;

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>На слух: {s.title}</h1>
      <p className="muted">
        {lv.label} · реплика {idx + 1} из {queue.length}
      </p>
      <div className="progress">
        <div style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
      </div>

      <div className="card flashcard">
        <p className="small muted">
          Слушайте, не глядя в текст. Задача — поймать смысл, а не каждое слово.
        </p>
        <button className="inline" onClick={listen}>
          🔊 {listens === 0 ? "Слушать" : "Ещё раз"}
        </button>
        {revealed && (
          <>
            <p className="nl" lang="nl">{reply.nl}</p>
            <p className="ru">{reply.ru}</p>
            {reply.key && (
              <p className="small">
                <span className="pill amber">слово-ключ</span> <b>{reply.key}</b>
              </p>
            )}
            {reply.register === "switch" && (
              <p className="small">
                <span className="pill red">переход на английский</span>
              </p>
            )}
          </>
        )}
      </div>

      {!revealed ? (
        <button
          className="secondary"
          disabled={listens === 0 || !canReveal}
          onClick={() => setRevealed(true)}
        >
          {listens === 0
            ? "Сначала прослушайте"
            : !canReveal
              ? `Подсказка после ${lv.minListens} прослушиваний (${listens}/${lv.minListens})`
              : "Показать текст"}
        </button>
      ) : (
        <div className="btnrow">
          <button className="danger" onClick={() => answer(false)}>
            Не понял
          </button>
          <button onClick={() => answer(true)}>Понятно ✓</button>
        </div>
      )}
    </div>
  );
}
