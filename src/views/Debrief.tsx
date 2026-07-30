import { useState } from "react";
import { scenarioById } from "../data/scenarios";
import { storage, uid } from "../lib/storage";
import { addCards, newCard } from "../lib/srs";
import type { LedgerEntry } from "../types";

/** route[1] может выглядеть как "gemeente-inschrijving?appt=abc" */
function parseParam(raw?: string): { scenarioId?: string; apptId?: string } {
  if (!raw) return {};
  const [id, query] = raw.split("?");
  const apptId = query
    ?.split("&")
    .map((p) => p.split("="))
    .find(([k]) => k === "appt")?.[1];
  return { scenarioId: id || undefined, apptId };
}

function ListEditor({
  label,
  hint,
  items,
  setItems,
  placeholder,
}: {
  label: string;
  hint: string;
  items: string[];
  setItems: (v: string[]) => void;
  placeholder: string;
}) {
  const [text, setText] = useState("");
  const add = () => {
    const t = text.trim();
    if (!t) return;
    setItems([...items, t]);
    setText("");
  };
  return (
    <div className="card">
      <h3>{label}</h3>
      <p className="small muted">{hint}</p>
      {items.map((it, i) => (
        <p key={i}>
          • {it}{" "}
          <button
            className="ghost"
            onClick={() => setItems(items.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </p>
      ))}
      <textarea
        value={text}
        aria-label={label}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="secondary" onClick={add}>
        + Добавить
      </button>
    </div>
  );
}

export default function Debrief({ scenarioId: raw }: { scenarioId?: string }) {
  const { scenarioId, apptId } = parseParam(raw);
  const s = scenarioId ? scenarioById(scenarioId) : undefined;

  const [stayed, setStayed] = useState<boolean | null>(null);
  const [notUnderstood, setNotUnderstood] = useState<string[]>([]);
  const [couldNotSay, setCouldNotSay] = useState<string[]>([]);
  const [outcome, setOutcome] = useState("");
  const [done, setDone] = useState(false);

  const saveDebrief = () => {
    const entry: LedgerEntry = {
      id: uid(),
      dateISO: new Date().toISOString(),
      scenarioId,
      text: outcome.trim() || (s ? s.title : "Разговор"),
      stayedInDutch: stayed,
      notUnderstood,
      couldNotSay,
    };
    storage.setLedger([entry, ...storage.getLedger()]);

    // Провалы понимания и невысказанное — в колоду. Это и есть движок
    // персонализации: колода собирается из вашей жизни, а не из учебника.
    addCards([
      ...notUnderstood.map((t) =>
        newCard(
          t,
          `Не понято в: «${s?.title ?? "разговор"}». Разберите и вспомните смысл.`,
          "debrief-heard",
          scenarioId
        )
      ),
      ...couldNotSay.map((t) =>
        newCard(
          t,
          "Вы хотели это сказать. Как это будет по-нидерландски?",
          "debrief-say",
          scenarioId
        )
      ),
    ]);

    if (apptId) {
      storage.setAppointments(
        storage
          .getAppointments()
          .map((a) => (a.id === apptId ? { ...a, debriefed: true } : a))
      );
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="center">
        <h1>Записано ✓</h1>
        <p>
          {stayed
            ? "Разговор остался на нидерландском. Это и есть настоящий прогресс."
            : "Ничего страшного. Каждая попытка — это материал для следующей."}
        </p>
        {(notUnderstood.length > 0 || couldNotSay.length > 0) && (
          <p className="muted">
            Добавлено карточек: {notUnderstood.length + couldNotSay.length}. То,
            что вы не поняли сегодня, — ваша колода завтра.
          </p>
        )}
        <button onClick={() => (location.hash = "#/ledger")}>
          К дневнику «Что я уже умею»
        </button>
        <button className="secondary" onClick={() => (location.hash = "#/")}>
          На главную
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Разбор</h1>
      {s && <p className="muted">{s.title}</p>}
      <p className="small muted">
        Пять минут, пока разговор ещё в памяти. Это самая ценная часть: честный
        разбор кормит завтрашнюю подготовку.
      </p>

      <div className="card">
        <h3>Разговор остался на нидерландском?</h3>
        <div className="choice">
          <button
            className={stayed === true ? "selected" : "secondary"}
            onClick={() => setStayed(true)}
          >
            Да 💪
          </button>
          <button
            className={stayed === false ? "selected danger" : "secondary"}
            onClick={() => setStayed(false)}
          >
            Нет — перешли на английский
          </button>
        </div>
        <p className="small muted">
          Это главный вопрос во всём приложении. Остальное — подробности.
        </p>
      </div>

      <ListEditor
        label="Что вы не поняли?"
        hint="Запишите как расслышали — даже приблизительно. «Дат мут у зелф» уже годится."
        items={notUnderstood}
        setItems={setNotUnderstood}
        placeholder="напр.: dat moet u zelf doorgeven"
      />

      <ListEditor
        label="Что вы хотели сказать и не смогли?"
        hint="По-русски. Это станет вашими фразами на следующий раз."
        items={couldNotSay}
        setItems={setCouldNotSay}
        placeholder="напр.: спросить, можно ли перенести приём"
      />

      <div className="card">
        <h3 id="debrief-outcome">Чем закончилось? Одной строкой</h3>
        <textarea
          value={outcome}
          aria-labelledby="debrief-outcome"
          placeholder="напр.: зарегистрировался в гемеенте, на английский не перешли"
          onChange={(e) => setOutcome(e.target.value)}
        />
      </div>

      <button onClick={saveDebrief} disabled={stayed === null}>
        {stayed === null ? "Сначала ответьте на первый вопрос" : "Сохранить разбор"}
      </button>
    </div>
  );
}
