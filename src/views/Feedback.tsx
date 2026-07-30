import { useMemo, useState } from "react";
import { SURVEY, buildReport } from "../data/survey";

export default function Feedback() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const set = (id: string, value: string) =>
    setAnswers((a) => ({ ...a, [id]: value }));

  const required = SURVEY.filter((q) => !q.optional);
  const answeredRequired = required.filter((q) => (answers[q.id] ?? "").trim());
  const ready = answeredRequired.length === required.length;

  const report = useMemo(() => buildReport(answers), [answers]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  if (sent) {
    return (
      <div>
        <h1>Спасибо 🙏</h1>
        <p className="ru">
          Осталось одно действие: скопируйте текст ниже и отправьте его нам в
          Telegram. Сервера у приложения нет — анкета никуда не уходит сама, и
          это сделано намеренно.
        </p>

        <div className="card">
          <textarea
            readOnly
            value={report}
            aria-label="Готовый текст анкеты для копирования"
            style={{ minHeight: 260, fontSize: "0.85rem" }}
            onFocus={(e) => e.currentTarget.select()}
          />
          <button onClick={copy}>
            {copied === "ok" ? "Скопировано ✓" : "Скопировать текст"}
          </button>
          {copied === "fail" && (
            <p className="small muted">
              Браузер не дал скопировать автоматически — нажмите на текст, он
              выделится целиком, и скопируйте вручную.
            </p>
          )}
        </div>

        <p className="small muted">
          Отдельное спасибо за пункт «что вам сказали, а вы не поняли» — именно
          из этих строк собираются банки ответов, которых нет ни в одном
          учебнике.
        </p>

        <button className="secondary" onClick={() => setSent(false)}>
          ← Вернуться и поправить ответы
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
      <h1>Отзыв тестера</h1>
      <p className="muted">
        Две-три минуты. Отвечайте коротко и честно — на этом этапе полезнее
        узнать, что не работает, чем услышать, что всё хорошо.
      </p>
      <div className="progress">
        <div
          style={{ width: `${(answeredRequired.length / required.length) * 100}%` }}
        />
      </div>

      {SURVEY.map((q) => (
        <div className="card" key={q.id}>
          <p className="lead" id={`q-${q.id}`}>
            {q.label}
            {q.optional && <span className="pill amber"> необязательно</span>}
          </p>
          {q.hint && <p className="small muted">{q.hint}</p>}

          {q.kind === "choice" ? (
            <div>
              {q.options.map((o) => (
                <button
                  key={o}
                  className={
                    answers[q.id] === o ? "inline selected" : "inline secondary"
                  }
                  onClick={() => set(q.id, o)}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[q.id] ?? ""}
              aria-labelledby={`q-${q.id}`}
              placeholder={q.placeholder}
              onChange={(e) => set(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button disabled={!ready} onClick={() => setSent(true)}>
        {ready
          ? "Готово — собрать текст для отправки"
          : `Осталось ответить: ${required.length - answeredRequired.length}`}
      </button>

      <p className="small muted">
        Анкета хранится только в этом окне и никуда не отправляется сама. На
        последнем шаге вы получите текст, который отправите нам сами — так вы
        видите ровно то, что уходит.
      </p>
    </div>
  );
}
