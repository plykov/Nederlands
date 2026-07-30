import { scenarioById } from "../data/scenarios";
import { storage } from "../lib/storage";
import { tappable } from "../lib/a11y";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

export default function Ledger() {
  const entries = storage.getLedger();
  const inDutch = entries.filter((e) => e.stayedInDutch === true).length;
  const attempted = entries.filter((e) => e.stayedInDutch !== null).length;

  return (
    <div>
      <h1>Что я уже умею</h1>
      <p className="muted">
        Не трофеи — рабочий журнал. Несделанная половина становится завтрашним
        уроком.
      </p>

      {attempted > 0 && (
        <div className="card">
          <p className="lead">
            {inDutch} из {attempted} разговоров остались на нидерландском
          </p>
          <p className="ru">
            Это главная метрика продукта. Не минуты занятий и не дни подряд —
            реальные разговоры, которые не сорвались на английский.
          </p>
        </div>
      )}

      <div className="card tappable" {...tappable(() => (location.hash = "#/progress"))}>
        <span className="pill amber">карта умений</span>
        <p className="lead">Что засчитано по CEFR · A2 и B1</p>
        <p className="ru">
          Вторая, необязательная шкала: какие жизненные умения уже закрыты и как
          это соотносится с порогами для натурализации и inburgering.
        </p>
      </div>

      {entries.length === 0 && (
        <div className="card">
          <p className="ru">
            Пока пусто. Первый настоящий разговор — даже неудачный — появится
            здесь после разбора.
          </p>
        </div>
      )}

      {entries.map((e) => {
        const s = e.scenarioId ? scenarioById(e.scenarioId) : undefined;
        return (
          <div className="card" key={e.id}>
            <p className="ledger-date">{fmtDate(e.dateISO)}</p>
            <p className="lead">{e.text}</p>
            {e.stayedInDutch !== null && (
              <p className="small">
                {e.stayedInDutch ? (
                  <span className="pill">остался на нидерландском</span>
                ) : (
                  <span className="pill red">перешли на английский</span>
                )}
                {s && <span className="pill amber">{s.title}</span>}
              </p>
            )}
            {e.notUnderstood.length > 0 && (
              <p className="small muted">
                Не поняли: {e.notUnderstood.join("; ")} → добавлено в повторение
              </p>
            )}
            {e.couldNotSay.length > 0 && (
              <p className="small muted">
                Не смогли сказать: {e.couldNotSay.join("; ")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
