import { useState } from "react";
import {
  LESSONS,
  lessonById,
  matchesAnswer,
  type Exercise,
  type Lesson,
} from "../data/course";
import { canSpeak, speakDutch } from "../lib/speech";
import { storage } from "../lib/storage";
import { addCards, newCard } from "../lib/srs";

/** Жирный текст в правилах: **вот так**. */
function Rule({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <p className="small">
      {parts.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </p>
  );
}

function ExerciseCard({
  ex,
  index,
  total,
  onResult,
}: {
  ex: Exercise;
  index: number;
  total: number;
  onResult: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  // Проверка и переход разведены намеренно: объяснение после последнего
  // задания — самое ценное в уроке, его нельзя проскакивать.
  const check = () => {
    const ok =
      ex.kind === "choose" ? picked === ex.answer : matchesAnswer(typed, ex.answer);
    setCorrect(ok);
    setChecked(true);
  };

  const solution = ex.kind === "choose" ? ex.options[ex.answer] : ex.answer[0];

  return (
    <div className="card">
      <p className="small muted">
        Задание {index + 1} из {total}
      </p>
      <p className="nl">{ex.prompt}</p>
      <p className="ru">{ex.ru}</p>

      {ex.kind === "choose" ? (
        <div>
          {ex.options.map((o, i) => (
            <button
              key={i}
              className={
                checked
                  ? i === ex.answer
                    ? "inline"
                    : i === picked
                      ? "inline danger"
                      : "inline secondary"
                  : picked === i
                    ? "inline selected"
                    : "inline secondary"
              }
              disabled={checked}
              onClick={() => setPicked(i)}
            >
              {o}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={typed}
          disabled={checked}
          placeholder="впишите пропущенное"
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && typed.trim() && !checked) check();
          }}
        />
      )}

      {!checked ? (
        <button
          className="secondary"
          disabled={ex.kind === "choose" ? picked === null : !typed.trim()}
          onClick={check}
        >
          Проверить
        </button>
      ) : (
        <>
          <p className="small">
            {correct ? (
              <span className="pill">верно</span>
            ) : (
              <>
                <span className="pill red">мимо</span>{" "}
                <span className="trap-right">{solution}</span>
              </>
            )}
          </p>
          <p className="small muted">{ex.why}</p>
          {canSpeak() && (
            <button
              className="inline secondary"
              onClick={() => speakDutch(ex.prompt.replace("___", solution), 0.9)}
            >
              🔊 Как это звучит
            </button>
          )}
          <button onClick={() => onResult(correct)}>
            {index + 1 === total ? "Итоги урока" : "Дальше"}
          </button>
        </>
      )}
    </div>
  );
}

function LessonView({ lesson, onExit }: { lesson: Lesson; onExit: () => void }) {
  const [phase, setPhase] = useState<"rule" | "drill" | "done">("rule");
  const [results, setResults] = useState<boolean[]>([]);
  const [saved, setSaved] = useState(false);

  const finish = (all: boolean[]) => {
    const score = all.filter(Boolean).length / all.length;
    storage.setLessonScore(lesson.id, score);
    setPhase("done");
  };

  const record = (ok: boolean) => {
    const all = [...results, ok];
    setResults(all);
    if (all.length === lesson.exercises.length) finish(all);
  };

  const saveExamples = () => {
    addCards(lesson.examples.map((e) => newCard(e.nl, e.ru, "trap")));
    setSaved(true);
  };

  if (phase === "rule") {
    return (
      <div>
        <button className="ghost" onClick={onExit}>
          ← К урокам
        </button>
        <h1>{lesson.title}</h1>
        <p className="muted">
          {lesson.level} · {lesson.gist}
        </p>

        <div className="card">
          <h3>Чем отличается от русского</h3>
          <p className="ru">{lesson.contrast}</p>
        </div>

        <div className="card">
          <h3>Правило</h3>
          {lesson.rule.map((r, i) => (
            <Rule key={i} text={r} />
          ))}
        </div>

        <h2>Примеры</h2>
        {lesson.examples.map((e, i) => (
          <div className="card" key={i}>
            <p className="nl">{e.nl}</p>
            <p className="ru">{e.ru}</p>
            {canSpeak() && (
              <button
                className="inline secondary"
                onClick={() => speakDutch(e.nl, 0.9)}
              >
                🔊
              </button>
            )}
          </div>
        ))}

        <button onClick={() => setPhase("drill")}>
          К упражнениям ({lesson.exercises.length})
        </button>
        <button className="secondary" onClick={saveExamples} disabled={saved}>
          {saved ? "Примеры в повторении ✓" : "Примеры — в повторение"}
        </button>
      </div>
    );
  }

  if (phase === "drill") {
    const i = results.length;
    const ex = lesson.exercises[i];
    return (
      <div>
        <button className="ghost" onClick={() => setPhase("rule")}>
          ← К правилу
        </button>
        <h1>{lesson.title}</h1>
        <div className="progress">
          <div style={{ width: `${(i / lesson.exercises.length) * 100}%` }} />
        </div>
        <ExerciseCard
          key={i}
          ex={ex}
          index={i}
          total={lesson.exercises.length}
          onResult={record}
        />
      </div>
    );
  }

  const right = results.filter(Boolean).length;
  const share = Math.round((right / results.length) * 100);
  const idx = LESSONS.findIndex((l) => l.id === lesson.id);
  const next = LESSONS[idx + 1];

  return (
    <div className="center">
      <h1>{share >= 80 ? "Урок пройден" : "Ещё разок"}</h1>
      <p className="lead">
        {right} из {results.length} ({share}%)
      </p>
      <p className="ru">
        {share >= 80
          ? "Правило держится. Дальше оно будет попадаться вам в сценариях."
          : "Меньше 80% — стоит перечитать правило и пройти снова. Это не оценка, а сигнал."}
      </p>
      <button
        onClick={() => {
          setResults([]);
          setPhase("rule");
        }}
      >
        Пройти снова
      </button>
      {next && share >= 80 && (
        <button
          className="secondary"
          onClick={() => (location.hash = `#/course/${next.id}`)}
        >
          Следующий урок: {next.title}
        </button>
      )}
      <button className="secondary" onClick={onExit}>
        К списку уроков
      </button>
    </div>
  );
}

export default function Course({ lessonId }: { lessonId?: string }) {
  const lesson = lessonId ? lessonById(lessonId) : undefined;
  const progress = storage.getCourse();

  if (lesson) {
    return (
      <LessonView
        key={lesson.id}
        lesson={lesson}
        onExit={() => (location.hash = "#/course")}
      />
    );
  }

  const doneCount = LESSONS.filter((l) => (progress[l.id] ?? 0) >= 0.8).length;

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Грамматический зал</h1>
      <p className="muted">
        Необязательный путь для тех, кому нужны явные правила. «Разбор» отвечает
        на вопрос в момент, когда споткнулись; здесь — последовательность с
        упражнениями. Пройдено уроков: {doneCount} из {LESSONS.length}.
      </p>
      <div className="progress">
        <div style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} />
      </div>

      {LESSONS.map((l, i) => {
        const score = progress[l.id];
        return (
          <div
            className="card tappable"
            key={l.id}
            onClick={() => (location.hash = `#/course/${l.id}`)}
          >
            <p className="small">
              <span className="pill amber">{l.level}</span>
              {score !== undefined && (
                <span className={score >= 0.8 ? "pill" : "pill red"}>
                  {Math.round(score * 100)}%
                </span>
              )}
            </p>
            <p className="lead">
              {i + 1}. {l.title}
            </p>
            <p className="ru">{l.gist}</p>
          </div>
        );
      })}

      <p className="small muted">
        Урока про de/het здесь нет намеренно: рабочего правила не существует, и
        притворяться иначе бесполезно. Артикли живут в{" "}
        <a href="#/articles">отдельном тренажёре</a> и заучиваются вместе со
        словом.
      </p>
      <p className="small muted">
        Грамматика здесь — не цель, а обслуживание разговора. Если выбирать между
        уроком и настоящим звонком в гемеенте, выбирайте звонок.
      </p>
    </div>
  );
}
