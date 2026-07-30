import { useState } from "react";
import {
  ADVICE_BOUNDARY,
  ROUTES,
  STATUSES,
  obligationDeadlineISO,
  routeById,
  statusById,
} from "../data/inburgering";
import { storage } from "../lib/storage";
import type { InburgeringProfile, InburgeringRoute, LegalStatus } from "../types";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function daysLeft(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

/** Разбивка формы (статус → дата → маршрут) от прочтения результата. */
function SetupForm({
  initial,
  onSave,
}: {
  initial: InburgeringProfile | null;
  onSave: (p: InburgeringProfile) => void;
}) {
  const [status, setStatus] = useState<LegalStatus | null>(initial?.status ?? null);
  const [start, setStart] = useState(
    initial?.obligationStartISO ? initial.obligationStartISO.slice(0, 10) : ""
  );
  const [route, setRoute] = useState<InburgeringRoute | null>(initial?.route ?? null);

  const obligated = status ? statusById(status)?.obligated : false;
  const canSave = status && (!obligated || start);

  return (
    <div>
      <div className="card">
        <h3>Ваш статус</h3>
        <p className="small muted">
          Нужно только для срока и списка требований — ничего из этого никуда не
          отправляется.
        </p>
        {STATUSES.map((s) => (
          <button
            key={s.id}
            className={status === s.id ? "inline selected" : "inline secondary"}
            onClick={() => setStatus(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {obligated && (
        <div className="card">
          <h3>Когда началась обязанность</h3>
          <p className="small muted">
            Обычно это дата решения о виде на жительство или регистрации в
            муниципалитете — уточните в письме от вашего gemeente, если не
            уверены.
          </p>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
      )}

      {obligated && (
        <div className="card">
          <h3>Маршрут (необязательно)</h3>
          <p className="small muted">
            Если ещё не знаете — оставьте пустым, требования покажем по всем
            трём.
          </p>
          {ROUTES.map((r) => (
            <button
              key={r.id}
              className={route === r.id ? "inline selected" : "inline secondary"}
              onClick={() => setRoute(route === r.id ? null : r.id)}
            >
              {r.title}
            </button>
          ))}
        </div>
      )}

      <button
        disabled={!canSave}
        onClick={() =>
          status &&
          onSave({
            status,
            obligationStartISO: obligated && start ? new Date(start).toISOString() : undefined,
            route: obligated && route ? route : undefined,
          })
        }
      >
        Сохранить
      </button>
    </div>
  );
}

function Summary({
  profile,
  onEdit,
}: {
  profile: InburgeringProfile;
  onEdit: () => void;
}) {
  const info = statusById(profile.status);
  if (!info) return null;

  const deadlineISO = profile.obligationStartISO
    ? obligationDeadlineISO(profile.obligationStartISO)
    : undefined;
  const d = deadlineISO ? daysLeft(deadlineISO) : undefined;
  const urgency = d === undefined ? "" : d <= 90 ? " red" : d <= 365 ? " amber" : "";

  const routes = profile.route ? [routeById(profile.route)!] : ROUTES;

  return (
    <div>
      <div className="card">
        <p className="small">
          <span className="pill amber">{info.title}</span>
        </p>
        <p className="ru">{info.hook}</p>
        {deadlineISO ? (
          <>
            <p className="small">
              <span className={`pill${urgency}`}>
                {d! <= 0 ? "срок наступил" : `осталось ${d} дн.`}
              </span>
            </p>
            <p className="ru">Срок (справочно): {fmtDate(deadlineISO)} — три года с начала обязанности.</p>
          </>
        ) : (
          <p className="ru">{info.deadline}</p>
        )}
      </div>

      {info.obligated && (
        <>
          <h2>{profile.route ? "Ваш маршрут" : "Три маршрута"}</h2>
          {routes.map((r) => (
            <div className="card" key={r.id}>
              <p className="lead">{r.title}</p>
              <p className="ru">{r.forWhom}</p>
              {r.requirements.map((req, i) => (
                <p className="ru small" key={i}>
                  <b>{i + 1}.</b> {req}
                </p>
              ))}
            </div>
          ))}
        </>
      )}

      <button className="secondary" onClick={onEdit}>
        Изменить
      </button>
    </div>
  );
}

export default function Inburgering() {
  const [profile, setProfile] = useState<InburgeringProfile | null>(
    storage.getInburgering()
  );
  const [editing, setEditing] = useState(!profile);

  const save = (p: InburgeringProfile) => {
    storage.setInburgering(p);
    setProfile(p);
    setEditing(false);
  };

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Сроки inburgering</h1>
      <p className="small muted">{ADVICE_BOUNDARY}</p>

      {editing || !profile ? (
        <SetupForm initial={profile} onSave={save} />
      ) : (
        <Summary profile={profile} onEdit={() => setEditing(true)} />
      )}
    </div>
  );
}
