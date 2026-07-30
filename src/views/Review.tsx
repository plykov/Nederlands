import { useState } from "react";
import { allCards, deleteCard, dueCards, rateCard, Rating } from "../lib/srs";
import { canSpeak, speakDutch } from "../lib/speech";
import type { ReviewCard } from "../types";

export default function Review() {
  const [queue, setQueue] = useState<ReviewCard[]>(dueCards());
  const [flipped, setFlipped] = useState(false);

  const total = allCards().length;
  const card = queue[0];

  const rate = (r: Rating) => {
    if (!card) return;
    rateCard(card.id, r);
    setQueue(queue.slice(1));
    setFlipped(false);
  };

  const remove = () => {
    if (!card) return;
    deleteCard(card.id);
    setQueue(queue.slice(1));
    setFlipped(false);
  };

  if (!card) {
    return (
      <div className="center">
        <h1>Повторение</h1>
        <p>На сегодня всё ✓</p>
        <p className="muted">
          Всего карточек: {total}. Новые появляются из ваших разборов — то, что
          вы не поняли в жизни, приходит сюда.
        </p>
        <button className="secondary" onClick={() => (location.hash = "#/scenarios")}>
          К сценариям
        </button>
      </div>
    );
  }

  const sourceLabel: Record<ReviewCard["source"], string> = {
    "debrief-heard": "из разбора: не расслышали",
    "debrief-say": "из разбора: не смогли сказать",
    scenario: "банк ответов",
    trap: "ловушка",
    article: "de / het",
  };

  return (
    <div>
      <h1>Повторение</h1>
      <p className="muted">Осталось сегодня: {queue.length}</p>

      <div className="card flashcard">
        <p className="small">
          <span className="pill amber">{sourceLabel[card.source]}</span>
        </p>
        <p className="nl" lang="nl">{card.front}</p>
        {canSpeak() && card.source !== "debrief-say" && (
          <button
            className="inline secondary"
            onClick={() => speakDutch(card.front, 0.95)}
          >
            🔊
          </button>
        )}
        {flipped && <p className="ru">{card.back}</p>}
      </div>

      {!flipped ? (
        <button onClick={() => setFlipped(true)}>Показать ответ</button>
      ) : (
        <>
          <div className="btnrow">
            <button className="danger" onClick={() => rate(Rating.Again)}>
              Снова
            </button>
            <button className="secondary" onClick={() => rate(Rating.Hard)}>
              Трудно
            </button>
            <button className="secondary" onClick={() => rate(Rating.Good)}>
              Норм
            </button>
            <button onClick={() => rate(Rating.Easy)}>Легко</button>
          </div>
          <button className="ghost" onClick={remove}>
            Удалить карточку
          </button>
        </>
      )}
    </div>
  );
}
