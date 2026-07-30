import { useEffect, useRef, useState } from "react";
import { scenarioById } from "../data/scenarios";
import { OPENERS, RECOVERY_MOVES, openerFor } from "../data/openers";
import {
  BAND_HINTS,
  BAND_LABELS,
  canMeasureOnset,
  canSpeak,
  speakDutch,
  startOnsetRecording,
  type OnsetRecorder,
  type OnsetResult,
} from "../lib/speech";
import type { Opener, OpenerContext } from "../types";

/**
 * Тренажёр опенера — главный модуль продукта (SPEC §2.1, BUILD_PLAN M3).
 *
 * Меряется ОДНА вещь: сколько времени проходит от сигнала до первого звука
 * вашего голоса. Не правильность, не акцент, не грамматика. На английский
 * переключаются из-за паузы, поэтому тренируется пауза.
 *
 * Результат показывается полосой скорости и никогда не блокирует переход
 * дальше: это ориентир, а не оценка (SPEC §6).
 */

/** Сколько секунд пишем после сигнала, если не остановить вручную. */
const AUTO_STOP_MS = 6000;

type Phase = "idle" | "countdown" | "recording" | "result";

export default function OpenerDrill({ scenarioId }: { scenarioId?: string }) {
  const scenario = scenarioId ? scenarioById(scenarioId) : undefined;
  const [context, setContext] = useState<OpenerContext>(
    scenario?.openerContext ?? "loket"
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<OnsetResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const recRef = useRef<OnsetRecorder | null>(null);
  const timers = useRef<number[]>([]);
  const urlRef = useRef<string | null>(null);

  const opener: Opener = openerFor(context);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(
    () => () => {
      clearTimers();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      // Запись обрывается вместе с уходом со страницы: микрофон не должен
      // остаться открытым, если пользователь ушёл на полуслове.
      recRef.current?.stop().catch(() => {});
    },
    []
  );

  const finish = async () => {
    clearTimers();
    const rec = recRef.current;
    recRef.current = null;
    if (!rec) return;
    const res = await rec.stop();
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(res.blob);
    urlRef.current = url;
    setAudioUrl(url);
    setResult(res);
    if (res.onsetMs !== null) setAttempts((a) => [...a, res.onsetMs as number]);
    setPhase("result");
  };

  const begin = () => {
    setError(null);
    setResult(null);
    setPhase("countdown");
    setCount(3);

    timers.current.push(window.setTimeout(() => setCount(2), 700));
    timers.current.push(window.setTimeout(() => setCount(1), 1400));
    timers.current.push(
      window.setTimeout(async () => {
        try {
          // Отсчёт времени начинается вместе с записью: это и есть «сигнал».
          recRef.current = await startOnsetRecording();
          setPhase("recording");
          timers.current.push(window.setTimeout(() => void finish(), AUTO_STOP_MS));
        } catch {
          setPhase("idle");
          setError(
            "Нет доступа к микрофону. Разрешите его в настройках браузера и попробуйте снова."
          );
        }
      }, 2100)
    );
  };

  const best = attempts.length ? Math.min(...attempts) : null;

  if (!canMeasureOnset()) return <Unsupported />;

  return (
    <div>
      <button className="ghost" onClick={() => window.history.back()}>
        ← Назад
      </button>
      <h1>Тренажёр опенера</h1>
      <p className="muted">
        {scenario
          ? `Перед разговором: ${scenario.title}`
          : "Первая фраза решает разговор."}
      </p>
      <p className="small muted">
        На английский переходят не из-за ошибок, а из-за паузы. Здесь меряется
        только одно: сколько времени проходит до первого звука вашего голоса.
        Правильность не оценивается вовсе.
      </p>

      {!scenario && (
        <div className="card">
          <h3 id="opener-context">Где вы будете говорить?</h3>
          <select
            aria-labelledby="opener-context"
            value={context}
            onChange={(e) => setContext(e.target.value as OpenerContext)}
            disabled={phase !== "idle" && phase !== "result"}
          >
            <option value="loket">Окошко: гемеенте, IND, банк, регистратура</option>
            <option value="telefoon">Телефон</option>
            <option value="winkel">Магазин, аптека, стойка</option>
            <option value="informeel">Сосед, коллега, родитель в школе</option>
          </select>
        </div>
      )}

      <div className="card">
        <span className="pill">ваша первая фраза</span>
        <p className="nl" lang="nl">{opener.nl}</p>
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

      {error && (
        <div className="card">
          <p className="ru">{error}</p>
        </div>
      )}

      {phase === "countdown" && (
        <div className="card flashcard">
          <p className="muted small">Приготовьтесь. Говорить — по сигналу.</p>
          <p className="onset-ms">{count}</p>
        </div>
      )}

      {phase === "recording" && (
        <div className="card flashcard">
          <span className="pill red">говорите</span>
          <p className="nl" lang="nl">{opener.nl}</p>
          <p className="small muted">
            Запись остановится сама через несколько секунд.
          </p>
          <button className="danger" onClick={() => void finish()}>
            ⏹ Готово
          </button>
        </div>
      )}

      {phase === "result" && result && (
        <div className="card flashcard">
          {result.onsetMs !== null ? (
            <>
              <p className="onset-ms">{result.onsetMs} мс</p>
              <p className={`band ${result.band}`}>{BAND_LABELS[result.band]}</p>
            </>
          ) : (
            <p className={`band ${result.band}`}>{BAND_LABELS[result.band]}</p>
          )}
          <p className="small muted">{BAND_HINTS[result.band]}</p>
          <p className="small muted">
            Это ориентир, а не оценка. Ничего не блокируется и никуда не
            отправляется — запись живёт только в этой вкладке.
          </p>
        </div>
      )}

      {phase === "result" && audioUrl && (
        <div className="card">
          <h3>Сравните с образцом</h3>
          <audio controls src={audioUrl} style={{ width: "100%" }} />
          {canSpeak() && (
            <button
              className="inline secondary"
              onClick={() => speakDutch(opener.nl, 1.0)}
            >
              🔊 Как это звучит у носителя
            </button>
          )}
        </div>
      )}

      {(phase === "idle" || phase === "result") && (
        <button onClick={begin}>
          {phase === "result" ? "Ещё раз" : "Начать — 3, 2, 1"}
        </button>
      )}

      {attempts.length > 0 && (
        <div className="card">
          <h3>Попытки в этой сессии</h3>
          <p className="small muted">
            {attempts.map((ms, i) => (
              <span key={i}>
                {i > 0 ? " · " : ""}
                {ms} мс
              </span>
            ))}
          </p>
          {best !== null && (
            <p className="small">
              <span className="pill">лучшая</span> {best} мс
            </p>
          )}
          <p className="small muted">
            Счётчиков дней и очков здесь нет намеренно: значение имеет частота
            реальных разговоров, а не длина серии в приложении.
          </p>
        </div>
      )}

      <h2>Если всё-таки перешли на английский</h2>
      <p className="small muted">
        Это случится, и это нормально. Важно иметь наготове ход возврата —
        произнесённый спокойно, без извинений.
      </p>
      {RECOVERY_MOVES.map((m) => (
        <div className="card" key={m.id}>
          <p className="nl" lang="nl">{m.nl}</p>
          <p className="ru">{m.ru}</p>
          <p className="small muted">{m.when}</p>
          {canSpeak() && (
            <button className="inline secondary" onClick={() => speakDutch(m.nl, 0.95)}>
              🔊 Прослушать
            </button>
          )}
        </div>
      ))}

      {scenario && (
        <button
          className="secondary"
          onClick={() => (location.hash = `#/rehearse/${scenario.id}`)}
        >
          ← К репетиции сценария
        </button>
      )}
    </div>
  );
}

function Unsupported() {
  return (
    <div>
      <button className="ghost" onClick={() => window.history.back()}>
        ← Назад
      </button>
      <h1>Тренажёр опенера</h1>
      <p className="ru">
        Этот браузер не даёт замерить задержку речи: нужен доступ к микрофону и
        Web Audio. Откройте приложение в Chrome или Safari.
      </p>
      <p className="small muted">
        Фразы ниже всё равно стоит выучить наизусть — они и есть содержание
        модуля, а секундомер только показывает, выучены ли они.
      </p>
      {OPENERS.map((o) => (
        <div className="card" key={o.id}>
          <p className="nl" lang="nl">{o.nl}</p>
          <p className="ru">{o.ru}</p>
          <p className="small muted">{o.when}</p>
        </div>
      ))}
    </div>
  );
}
