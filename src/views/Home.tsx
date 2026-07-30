import { useState } from "react";
import { DOMAINS, SCENARIOS, scenarioById, domainById } from "../data/scenarios";
import { storage, uid } from "../lib/storage";
import { dueCards } from "../lib/srs";
import type { Appointment } from "../types";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  const time = d.toTimeString().slice(0, 5);
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}, ${time}`;
}

function daysLeft(iso: string): number {
  const now = new Date();
  const d = new Date(iso);
  return Math.ceil((d.getTime() - now.getTime()) / 86400000);
}

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    storage.getAppointments()
  );
  const [adding, setAdding] = useState(false);
  const [onboarded, setOnboarded] = useState(storage.isOnboarded());
  const [newScenario, setNewScenario] = useState(SCENARIOS[0].id);
  const [newDate, setNewDate] = useState("");
  const [newNote, setNewNote] = useState("");

  const due = dueCards().length;
  const now = Date.now();
  const upcoming = appointments
    .filter((a) => !a.debriefed)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  const past = upcoming.filter((a) => new Date(a.dateISO).getTime() < now);
  const future = upcoming.filter((a) => new Date(a.dateISO).getTime() >= now);

  const addAppointment = () => {
    if (!newDate) return;
    const a: Appointment = {
      id: uid(),
      scenarioId: newScenario,
      dateISO: new Date(newDate).toISOString(),
      note: newNote.trim(),
      rehearsed: false,
      debriefed: false,
    };
    const next = [...appointments, a];
    storage.setAppointments(next);
    setAppointments(next);
    setAdding(false);
    setNewDate("");
    setNewNote("");
  };

  const remove = (id: string) => {
    const next = appointments.filter((a) => a.id !== id);
    storage.setAppointments(next);
    setAppointments(next);
  };

  return (
    <div>
      <h1>Сегодня</h1>
      <p className="muted">
        Репетиция → дело → разбор. Семь минут до, пять минут после.
      </p>

      {!onboarded && (
        <div className="card">
          <span className="pill">как это работает</span>
          <p className="ru">
            Вы уже живёте в Нидерландах — значит, язык вокруг вас бесплатно и
            круглые сутки. Проблема не в практике, а в том, что каждая попытка
            обрывается: собеседник слышит паузу и переходит на английский.
          </p>
          <p className="ru">
            <b>1.</b> Добавьте предстоящее дело: гемеенте, IND, врач, звонок
            хозяину квартиры.
            <br />
            <b>2.</b> За семь минут отрепетируйте: первую фразу на скорость,
            свои реплики, банк ответов, произношение.
            <br />
            <b>3.</b> После разговора — разбор за пять минут. Непонятое станет
            вашими карточками.
          </p>
          <p className="small muted">
            Главное, что мы считаем, — сколько ваших разговоров осталось на
            нидерландском. Не минуты занятий и не дни подряд: на устную речь
            влияет частота реальных попыток, а не время в приложении.
          </p>
          <button
            className="secondary"
            onClick={() => {
              storage.setOnboarded();
              setOnboarded(true);
            }}
          >
            Понятно, начнём
          </button>
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2>Разговор состоялся?</h2>
          {past.map((a) => {
            const s = scenarioById(a.scenarioId);
            return (
              <div className="card" key={a.id}>
                <span className="pill amber">ждёт разбора</span>
                <p className="lead">{s?.title ?? a.scenarioId}</p>
                <p className="ru">
                  {fmtDate(a.dateISO)}
                  {a.note ? ` — ${a.note}` : ""}
                </p>
                <div className="btnrow">
                  <button
                    onClick={() =>
                      (location.hash = `#/debrief/${a.scenarioId}?appt=${a.id}`)
                    }
                  >
                    Разобрать · 5 мин
                  </button>
                  <button className="secondary" onClick={() => remove(a.id)}>
                    Не состоялся
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}

      {future.length > 0 && (
        <>
          <h2>Впереди</h2>
          {future.map((a) => {
            const s = scenarioById(a.scenarioId);
            const d = daysLeft(a.dateISO);
            const dom = s ? domainById(s.domain) : undefined;
            return (
              <div className="card" key={a.id}>
                <span className="pill">
                  {d <= 0 ? "сегодня" : d === 1 ? "завтра" : `осталось ${d} дн.`}
                </span>
                {dom && (
                  <span className="pill amber">
                    {dom.icon} {dom.title}
                  </span>
                )}
                <p className="lead">{s?.title ?? a.scenarioId}</p>
                <p className="ru">
                  {fmtDate(a.dateISO)}
                  {a.note ? ` — ${a.note}` : ""}
                </p>
                <p className="small muted">
                  Сегодня {s?.minutes ?? 7} минут: первая фраза, ваши реплики и
                  то, что вам ответят.
                </p>
                <div className="btnrow">
                  <button
                    onClick={() => (location.hash = `#/rehearse/${a.scenarioId}`)}
                  >
                    Репетировать
                  </button>
                  <button className="secondary" onClick={() => remove(a.id)}>
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}

      {adding ? (
        <div className="card">
          <h3>Что вам предстоит?</h3>
          <select
            value={newScenario}
            onChange={(e) => setNewScenario(e.target.value)}
          >
            {DOMAINS.map((d) => (
              <optgroup key={d.id} label={`${d.icon} ${d.title}`}>
                {SCENARIOS.filter((s) => s.domain === d.id).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Заметка (необязательно): напр. «продление, Stadskantoor»"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <div className="btnrow">
            <button onClick={addAppointment}>Добавить</button>
            <button className="secondary" onClick={() => setAdding(false)}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}>+ Добавить предстоящее дело</button>
      )}

      {due > 0 && (
        <div className="card tappable" onClick={() => (location.hash = "#/review")}>
          <span className="pill red">повторение</span>
          <p className="lead">Карточек к повторению: {due}</p>
          <p className="ru">То, что вы не поняли вчера, — ваша колода сегодня.</p>
        </div>
      )}

      <div className="card tappable" onClick={() => (location.hash = "#/opener")}>
        <span className="pill red">главное</span>
        <p className="lead">Первая фраза — на скорость</p>
        <p className="ru">
          На английский переходят из-за паузы, а не из-за ошибок. Здесь меряется
          только время до первого звука вашего голоса.
        </p>
      </div>

      <div className="card tappable" onClick={() => (location.hash = "#/articles")}>
        <span className="pill amber">de / het</span>
        <p className="lead">Тренажёр артиклей</p>
        <p className="ru">
          Правила нет — есть слово вместе с артиклем. Выбирайте целую форму, а не
          принцип.
        </p>
      </div>

      <div className="card tappable" onClick={() => (location.hash = "#/listening")}>
        <span className="pill red">тренажёр</span>
        <p className="lead">Слушание под давлением</p>
        <p className="ru">
          Быстро, в шуме, по телефону. Сказать вы уже можете — ломает то, что
          приходит в ответ.
        </p>
      </div>

      <div className="card tappable" onClick={() => (location.hash = "#/grammar")}>
        <span className="pill amber">по требованию</span>
        <p className="lead">Разбор: почему по-нидерландски именно так</p>
        <p className="ru">
          Порядок слов, отделяемые глаголы, «er» — и то, что вы уже умеете
          благодаря русским частицам и уменьшительным.
        </p>
      </div>

      <div className="card tappable" onClick={() => (location.hash = "#/repair")}>
        <span className="pill">ядро A1</span>
        <p className="lead">Приёмы ремонта разговора</p>
        <p className="ru">
          Восемь крепких приёмов работают лучше пятисот слов. Повторяйте до
          автоматизма.
        </p>
      </div>

      {upcoming.length === 0 && (
        <p className="muted small">
          Совет: дела в Нидерландах назначаются заранее — гемеенте, IND, врач,
          школа. Добавьте ближайшее, и мы подготовим вас к нему за семь минут.
        </p>
      )}
    </div>
  );
}
