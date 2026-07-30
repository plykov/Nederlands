import { CAN_DOS, LEVEL_NOTE, type CefrLevel } from "../data/cando";
import { scenarioById, domainById } from "../data/scenarios";
import { storage } from "../lib/storage";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1"];

/**
 * Прогресс по CEFR — вторая поверхность, не главная.
 * Умение засчитывается только по реальному разговору из дневника,
 * а не по «пройденному уроку»: репетиция сама по себе ничего не доказывает.
 */
export default function Progress() {
  const ledger = storage.getLedger();
  const attemptedIds = new Set(ledger.map((e) => e.scenarioId).filter(Boolean));
  const dutchIds = new Set(
    ledger.filter((e) => e.stayedInDutch === true).map((e) => e.scenarioId)
  );

  const statusOf = (c: (typeof CAN_DOS)[number]) => {
    const done = c.scenarios.filter((id) => dutchIds.has(id)).length;
    const tried = c.scenarios.filter((id) => attemptedIds.has(id)).length;
    if (done > 0) return "done" as const;
    if (tried > 0) return "tried" as const;
    return "open" as const;
  };

  const byLevel = (lv: CefrLevel) => CAN_DOS.filter((c) => c.level === lv);
  const doneCount = (lv: CefrLevel) =>
    byLevel(lv).filter((c) => statusOf(c) === "done").length;

  const a2 = { done: doneCount("A2"), total: byLevel("A2").length };
  const b1 = { done: doneCount("B1"), total: byLevel("B1").length };

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Карта умений</h1>
      <p className="muted">
        Умение засчитывается по реальному разговору из дневника, а не по
        пройденному экрану. Отрепетировать — не значит суметь.
      </p>

      <div className="card">
        <h3>Готовность к порогам</h3>
        <p className="small">
          <span className="pill">A2</span> {a2.done} из {a2.total} умений
        </p>
        <div className="progress">
          <div style={{ width: `${(a2.done / a2.total) * 100}%` }} />
        </div>
        <p className="small muted">{LEVEL_NOTE.A2}</p>

        <p className="small">
          <span className="pill amber">B1</span> {b1.done} из {b1.total} умений
        </p>
        <div className="progress">
          <div style={{ width: `${(b1.done / b1.total) * 100}%` }} />
        </div>
        <p className="small muted">{LEVEL_NOTE.B1}</p>

        <p className="small muted">
          Это ориентир по жизненным умениям, а не оценка экзамена. Официально
          уровень подтверждает только Staatsexamen NT2 (программа I — B1,
          программа II — B2) либо экзамены inburgering. Подготовку к ним мы пока
          не ведём: сначала нужно, чтобы разговоры перестали срываться на
          английский.
        </p>
      </div>

      {LEVELS.map((lv) => (
        <div key={lv}>
          <h2>
            {lv} · {doneCount(lv)}/{byLevel(lv).length}
          </h2>
          {byLevel(lv).map((c) => {
            const st = statusOf(c);
            const dom = domainById(c.domain);
            return (
              <div className="card" key={c.id}>
                <p className="small">
                  {st === "done" && <span className="pill">умею</span>}
                  {st === "tried" && <span className="pill amber">пробовали</span>}
                  {st === "open" && <span className="pill red">ещё нет</span>}
                  <span className="pill amber">
                    {dom?.icon} {dom?.title}
                  </span>
                </p>
                <p className="lead">{c.text}</p>
                <p className="small muted">
                  {c.scenarios
                    .map((id) => scenarioById(id)?.title)
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {st !== "done" && (
                  <button
                    className="inline secondary"
                    onClick={() => (location.hash = `#/rehearse/${c.scenarios[0]}`)}
                  >
                    Подготовиться
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
