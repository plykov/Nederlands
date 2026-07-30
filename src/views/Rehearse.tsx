import { useRef, useState } from "react";
import { scenarioById, domainById } from "../data/scenarios";
import { repairById } from "../data/repair";
import { openerFor, RECOVERY_MOVES } from "../data/openers";
import { nounsForScenario } from "../data/nouns";
import { canSpeak, speakDutch, startRecording, type Recorder } from "../lib/speech";
import { addCards, newCard } from "../lib/srs";
import type { Reply } from "../types";

const STEPS = [
  "Что произойдёт",
  "Ваши реплики",
  "Что вам ответят",
  "Ловушки",
  "Произношение",
  "Первая фраза",
] as const;

export default function Rehearse({ scenarioId }: { scenarioId?: string }) {
  const s = scenarioId ? scenarioById(scenarioId) : undefined;
  const [step, setStep] = useState(0);

  if (!s) {
    return (
      <div>
        <h1>Сценарий не найден</h1>
        <button onClick={() => (location.hash = "#/scenarios")}>К сценариям</button>
      </div>
    );
  }
  const dom = domainById(s.domain);

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>{s.title}</h1>
      <p className="muted">
        {dom?.icon} {dom?.title} · шаг {step + 1} из {STEPS.length}: {STEPS[step]}
      </p>
      <div className="progress">
        <div style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      {step === 0 && <Brief s={s} />}
      {step === 1 && <Lines s={s} />}
      {step === 2 && <ReplyBank s={s} />}
      {step === 3 && <Traps s={s} />}
      {step === 4 && <Gate s={s} />}
      {step === 5 && <OpenerStep s={s} />}

      <div className="btnrow">
        {step > 0 && (
          <button className="secondary" onClick={() => setStep(step - 1)}>
            Назад
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep(step + 1)}>Дальше</button>
        ) : (
          <>
            <button
              className="secondary"
              onClick={() => (location.hash = `#/roleplay/${s.id}`)}
            >
              🎧 Тренировка на слух
            </button>
            <button onClick={() => (location.hash = `#/debrief/${s.id}`)}>
              После разговора — разбор
            </button>
          </>
        )}
      </div>
    </div>
  );
}

type S = NonNullable<ReturnType<typeof scenarioById>>;

function Brief({ s }: { s: S }) {
  return (
    <div>
      <div className="card">
        {s.brief.map((b, i) => (
          <p key={i}>
            <b>{i + 1}.</b> {b}
          </p>
        ))}
      </div>
      <div className="card">
        <h3>Приёмы ремонта для этого разговора</h3>
        {s.repairIds.map((id) => {
          const m = repairById(id);
          return m ? (
            <p key={id}>
              <span className="nl">{m.nl}</span>
              <br />
              <span className="ru">{m.ru}</span>
            </p>
          ) : null;
        })}
      </div>
    </div>
  );
}

function Lines({ s }: { s: S }) {
  return (
    <div>
      <p className="muted small">
        Прослушайте и повторите вслух каждую реплику. Вслух — это принципиально:
        молча подготовиться нельзя, тренируется именно скорость произнесения.
      </p>
      {s.lines.map((l, i) => (
        <div className="card" key={i}>
          <p className="nl">{l.nl}</p>
          <p className="ru">{l.ru}</p>
          {l.note && <p className="small muted">{l.note}</p>}
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(l.nl, 0.9)}>
              🔊 Прослушать
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ReplyBankCard({ reply }: { reply: Reply }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="card">
      {reply.register === "switch" && (
        <span className="pill red">переход на английский</span>
      )}
      {canSpeak() && (
        <div>
          <button className="inline secondary" onClick={() => speakDutch(reply.nl, 1.0)}>
            🔊 Реальная скорость
          </button>
          <button className="inline secondary" onClick={() => speakDutch(reply.nl, 0.75)}>
            🐢 Медленно
          </button>
        </div>
      )}
      {revealed ? (
        <>
          <p className="nl">{reply.nl}</p>
          <p className="ru">{reply.ru}</p>
          {reply.key && (
            <p className="small">
              <span className="pill amber">слово-ключ</span> <b>{reply.key}</b>
            </p>
          )}
          {reply.register === "switch" && (
            <p className="small muted">
              Вот этот момент и надо отрепетировать. Ответ есть — на шаге
              «Первая фраза».
            </p>
          )}
        </>
      ) : (
        <button className="inline" onClick={() => setRevealed(true)}>
          Показать текст
        </button>
      )}
    </div>
  );
}

function ReplyBank({ s }: { s: S }) {
  const [saved, setSaved] = useState(false);
  const saveKeys = () => {
    addCards(s.replyBank.map((r) => newCard(r.nl, r.ru, "scenario", s.id)));
    setSaved(true);
  };
  return (
    <div>
      <p className="muted small">
        Главная часть. Это то, что вам реально скажут: сначала слушайте на
        полной скорости, не глядя в текст. Язык окошка формулен — его можно
        выучить заранее.
      </p>
      {s.replyBank.map((r, i) => (
        <ReplyBankCard key={i} reply={r} />
      ))}
      <button className="secondary" onClick={saveKeys} disabled={saved}>
        {saved ? "Добавлено в повторение ✓" : "Добавить банк ответов в повторение"}
      </button>
      <button onClick={() => (location.hash = `#/roleplay/${s.id}`)}>
        🎧 Проверить себя на слух
      </button>
    </div>
  );
}

function Traps({ s }: { s: S }) {
  const nouns = nounsForScenario(s.id);
  return (
    <div>
      <p className="muted small">
        Ловушки переноса из русского. Их слышно мгновенно — уберите их, и вас
        перестанут переспрашивать.
      </p>
      {s.traps.map((t, i) => (
        <div className="card" key={i}>
          <p>
            <span className="trap-wrong">{t.wrong}</span>
            <br />
            <span className="trap-right">{t.right}</span>
          </p>
          <p className="small muted">{t.why}</p>
        </div>
      ))}
      <button className="secondary" onClick={() => (location.hash = "#/grammar")}>
        📖 Открыть «Разбор» — почему так
      </button>
      {nouns.length > 0 && (
        <button
          className="secondary"
          onClick={() => (location.hash = `#/articles/${s.id}`)}
        >
          de / het для этого сценария ({nouns.length})
        </button>
      )}
    </div>
  );
}

function GateCard({ word, focus, tip }: { word: string; focus: string; tip: string }) {
  const [state, setState] = useState<"idle" | "rec" | "playback">("idle");
  const recRef = useRef<Recorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const record = async () => {
    try {
      recRef.current = await startRecording();
      setState("rec");
    } catch {
      alert("Нет доступа к микрофону. Разрешите доступ в настройках браузера.");
    }
  };

  const stop = async () => {
    if (!recRef.current) return;
    const blob = await recRef.current.stop();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(blob));
    setState("playback");
  };

  return (
    <div className="card">
      <p className="nl">{word}</p>
      <p className="small">
        <span className="pill red">{focus}</span>
      </p>
      <p className="ru">{tip}</p>
      <div>
        {canSpeak() && (
          <button className="inline secondary" onClick={() => speakDutch(word, 0.85)}>
            🔊 Образец
          </button>
        )}
        {state !== "rec" ? (
          <button className="inline secondary" onClick={record}>
            🎙️ Записать себя
          </button>
        ) : (
          <button className="inline danger" onClick={stop}>
            ⏹ Стоп
          </button>
        )}
        {audioUrl && state === "playback" && (
          <audio controls src={audioUrl} style={{ width: "100%", marginTop: 8 }} />
        )}
      </div>
      {state === "playback" && (
        <p className="small muted">
          Сравните с образцом. Запись остаётся только на этом устройстве и никуда
          не отправляется.
        </p>
      )}
    </div>
  );
}

function Gate({ s }: { s: S }) {
  return (
    <div>
      <p className="muted small">
        Произносительный гейт: {s.gate.length}{" "}
        {s.gate.length === 1 ? "слово" : "слова"}, из-за которых собеседник
        переходит на английский. Здесь только те звуки, что мешают вас понять, —
        раскатистое r и мягкие согласные никого не смущают.
      </p>
      {s.gate.map((g) => (
        <GateCard key={g.word} {...g} />
      ))}
    </div>
  );
}

function OpenerStep({ s }: { s: S }) {
  const opener = openerFor(s.openerContext);
  return (
    <div>
      <p className="muted small">
        Последний шаг и самый важный. Разговор решается в первые полторы
        секунды: если первая фраза выучена до автоматизма, у собеседника нет
        повода переходить на английский.
      </p>

      <div className="card">
        <span className="pill">опенер</span>
        <p className="nl">{opener.nl}</p>
        <p className="ru">{opener.ru}</p>
        <p className="small muted">{opener.when}</p>
        {canSpeak() && (
          <div>
            <button
              className="inline secondary"
              onClick={() => speakDutch(opener.nl, 1.0)}
            >
              🔊 Образец
            </button>
            <button
              className="inline secondary"
              onClick={() => speakDutch(opener.nl, 0.8)}
            >
              🐢 Медленно
            </button>
          </div>
        )}
      </div>

      <button onClick={() => (location.hash = `#/opener/${s.id}`)}>
        ⏱ Проверить себя на скорость
      </button>

      <h3>Если всё-таки перешли на английский</h3>
      {RECOVERY_MOVES.map((m) => (
        <div className="card" key={m.id}>
          <p className="nl">{m.nl}</p>
          <p className="ru">{m.ru}</p>
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(m.nl, 0.95)}>
              🔊
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
