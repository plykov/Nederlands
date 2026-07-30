import { DOMAINS, SCENARIOS } from "../data/scenarios";

export default function Scenarios() {
  return (
    <div>
      <h1>Сценарии</h1>
      <p className="muted">
        Не туристический разговорник. То, что действительно предстоит: гемеенте,
        IND, врач, школа, хозяин квартиры.
      </p>
      {DOMAINS.map((d) => (
        <div key={d.id}>
          <h2>
            {d.icon} {d.title}
          </h2>
          {SCENARIOS.filter((s) => s.domain === d.id).map((s) => (
            <div
              key={s.id}
              className="card tappable"
              onClick={() => (location.hash = `#/rehearse/${s.id}`)}
            >
              <p className="small">
                <span className="pill amber">{s.level}</span>
              </p>
              <p className="lead">{s.title}</p>
              <p className="ru">{s.context}</p>
              <p className="small muted">
                ~{s.minutes} мин · ответов в банке: {s.replyBank.length}
              </p>
            </div>
          ))}
        </div>
      ))}
      <p className="small muted">
        Сейчас сценариев {SCENARIOS.length}, по четыре на область. Список растёт
        из того, что тестеры приносят из реальных разговоров, а не из выдуманных
        ситуаций — если вам сказали что-то, чего здесь нет, напишите нам.
      </p>
    </div>
  );
}
