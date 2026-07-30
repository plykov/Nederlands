import { useState } from "react";
import { GRAMMAR_NOTES, type GrammarNote } from "../data/grammar";
import { SCENARIOS, domainById } from "../data/scenarios";
import { LESSONS } from "../data/course";
import { addCards, newCard } from "../lib/srs";

function NoteCard({ note }: { note: GrammarNote }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    addCards(
      note.pairs.map((p) => newCard(p.right, `Не «${p.wrong}». ${note.gist}`, "trap"))
    );
    setSaved(true);
  };

  return (
    <div className="card">
      <div className="tappable" onClick={() => setOpen(!open)}>
        {note.positive && <span className="pill">это вы уже умеете</span>}
        <p className="lead">{note.title}</p>
        <p className="ru">{note.gist}</p>
      </div>

      {open && (
        <>
          {note.pairs.map((p, i) => (
            <p key={i}>
              <span className="trap-wrong">{p.wrong}</span>
              <br />
              <span className="trap-right">{p.right}</span>
            </p>
          ))}
          <p className="small muted">{note.body}</p>
          {note.link && (
            <button
              className="inline"
              onClick={() => (location.hash = note.link!.href)}
            >
              {note.link.label}
            </button>
          )}
          <button className="inline secondary" onClick={save} disabled={saved}>
            {saved ? "В повторении ✓" : "Добавить в повторение"}
          </button>
        </>
      )}
      {!open && (
        <button className="ghost" onClick={() => setOpen(true)}>
          Разобрать →
        </button>
      )}
    </div>
  );
}

/** Все ловушки из всех сценариев в одном месте. */
function AllTraps() {
  const [open, setOpen] = useState(false);
  const rows = SCENARIOS.flatMap((s) =>
    s.traps.map((t) => ({ ...t, scenario: s.title, domain: s.domain }))
  );

  if (!open) {
    return (
      <div className="card tappable" onClick={() => setOpen(true)}>
        <span className="pill amber">{rows.length}</span>
        <p className="lead">Все ловушки из сценариев</p>
        <p className="ru">
          Сводка всех мест, где русский подставляет подножку, — из всех{" "}
          {SCENARIOS.length} сценариев сразу.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Все ловушки ({rows.length})</h2>
      <button className="ghost" onClick={() => setOpen(false)}>
        ← Свернуть
      </button>
      {rows.map((t, i) => {
        const dom = domainById(t.domain);
        return (
          <div className="card" key={i}>
            <p className="small">
              <span className="pill amber">
                {dom?.icon} {t.scenario}
              </span>
            </p>
            <p>
              <span className="trap-wrong">{t.wrong}</span>
              <br />
              <span className="trap-right">{t.right}</span>
            </p>
            <p className="small muted">{t.why}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function Grammar() {
  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Разбор</h1>
      <p className="muted">
        Не курс грамматики, а ящик с объяснениями по требованию: ровно те места,
        где русский язык подставляет подножку. Открывайте, когда споткнулись, —
        читать подряд необязательно.
      </p>

      <div className="card tappable" onClick={() => (location.hash = "#/course")}>
        <span className="pill">курс</span>
        <p className="lead">Грамматический зал</p>
        <p className="ru">
          Если нужны не разрозненные объяснения, а последовательность с
          упражнениями — {LESSONS.length} уроков от порядка слов до «er».
        </p>
      </div>

      {GRAMMAR_NOTES.map((n) => (
        <NoteCard key={n.id} note={n} />
      ))}

      <div className="spacer" />
      <AllTraps />
    </div>
  );
}
