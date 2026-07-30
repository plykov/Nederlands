import { useState } from "react";
import { REPAIR_MOVES } from "../data/repair";
import { OPENERS } from "../data/openers";
import { canSpeak, speakDutch } from "../lib/speech";
import { addCards, newCard } from "../lib/srs";

export default function RepairView() {
  const [saved, setSaved] = useState(false);
  const saveAll = () => {
    addCards([
      ...REPAIR_MOVES.map((m) => newCard(m.nl, m.ru, "scenario")),
      ...OPENERS.map((o) => newCard(o.nl, o.ru, "scenario")),
    ]);
    setSaved(true);
  };

  const openers = OPENERS.filter((o) => o.kind === "opener");
  const recoveries = OPENERS.filter((o) => o.kind === "recovery");

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Приёмы ремонта разговора</h1>
      <p className="muted">
        Это не вежливость — это ядро уровня A1. Пятьдесят слов и восемь крепких
        приёмов работают лучше, чем пятьсот слов без единого. Учите до
        автоматизма: в стрессе доступно только то, что вылетает само.
      </p>

      <h2>Начало: чтобы не перешли на английский</h2>
      {openers.map((o) => (
        <div className="card" key={o.id}>
          <p className="nl">{o.nl}</p>
          <p className="ru">{o.ru}</p>
          <p className="small muted">{o.when}</p>
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(o.nl, 0.95)}>
              🔊 Прослушать
            </button>
          )}
        </div>
      ))}
      <button className="secondary" onClick={() => (location.hash = "#/opener")}>
        ⏱ Тренажёр первой фразы на скорость
      </button>

      <h2>Возврат: если уже перешли</h2>
      {recoveries.map((o) => (
        <div className="card" key={o.id}>
          <p className="nl">{o.nl}</p>
          <p className="ru">{o.ru}</p>
          <p className="small muted">{o.when}</p>
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(o.nl, 0.95)}>
              🔊 Прослушать
            </button>
          )}
        </div>
      ))}

      <h2>Ремонт: когда не поняли</h2>
      {REPAIR_MOVES.map((m) => (
        <div className="card" key={m.id}>
          <p className="nl">{m.nl}</p>
          <p className="ru">{m.ru}</p>
          <p className="small muted">{m.when}</p>
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(m.nl, 0.9)}>
              🔊 Прослушать
            </button>
          )}
        </div>
      ))}

      <button onClick={saveAll} disabled={saved}>
        {saved ? "Добавлено в повторение ✓" : "Добавить все фразы в повторение"}
      </button>
    </div>
  );
}
