import { useEffect, useRef, useState } from "react";
import { SCENARIOS, DOMAINS, scenarioById } from "../data/scenarios";
import { canSpeak, speakDutch } from "../lib/speech";
import { NoiseBed, NOISE_LABELS, canPlayNoise, type NoiseKind } from "../lib/noise";
import { addCards, newCard } from "../lib/srs";
import { tappable } from "../lib/a11y";
import type { Reply } from "../types";

/**
 * Тренажёр слушания под давлением.
 * Реальная жизнь редко даёт чистую студийную запись: в окошке шумно,
 * по телефону хрипит, а сотрудник не замедляется. Здесь это тренируется
 * отдельно от подготовки к конкретному разговору.
 */

interface Level {
  id: number;
  title: string;
  rate: number;
  noise: NoiseKind;
  noiseLevel: number;
  /** сколько прослушиваний доступно до показа текста */
  maxListens: number;
  hint: string;
}

const LEVELS: Level[] = [
  {
    id: 1,
    title: "Тихий кабинет",
    rate: 0.85,
    noise: "none",
    noiseLevel: 0,
    maxListens: 99,
    hint: "Чистый звук, медленно. База: слышите ли вы слова вообще.",
  },
  {
    id: 2,
    title: "Обычное окошко",
    rate: 1.0,
    noise: "cafe",
    noiseLevel: 0.35,
    maxListens: 3,
    hint: "Нормальная скорость и негромкий фон — так звучит большинство приёмов.",
  },
  {
    id: 3,
    title: "Шумный зал",
    rate: 1.05,
    noise: "cafe",
    noiseLevel: 0.75,
    maxListens: 2,
    hint: "Гул голосов в полную силу: Stadskantoor, банк, приёмный покой.",
  },
  {
    id: 4,
    title: "Улица",
    rate: 1.1,
    noise: "straat",
    noiseLevel: 0.8,
    maxListens: 2,
    hint: "Разговор на ходу у подъезда, мимо едут машины и велосипеды.",
  },
  {
    id: 5,
    title: "Телефон",
    rate: 1.15,
    noise: "telefoon",
    noiseLevel: 0.6,
    maxListens: 1,
    hint: "Самое трудное: быстро, с помехами, без лица и жестов. Одно прослушивание.",
  },
];

interface Item extends Reply {
  scenarioId: string;
  scenarioTitle: string;
}

function buildPool(domain: string): Item[] {
  const pool = SCENARIOS.filter(
    (s) => domain === "all" || s.domain === domain
  ).flatMap((s) =>
    s.replyBank.map((r) => ({
      ...r,
      scenarioId: s.id,
      scenarioTitle: s.title,
    }))
  );
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

const ROUND = 8;

export default function Listening() {
  const [domain, setDomain] = useState("all");
  const [level, setLevel] = useState<Level | null>(null);
  const [pool, setPool] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const [listens, setListens] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [missed, setMissed] = useState<Item[]>([]);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const bed = useRef(new NoiseBed());
  useEffect(() => () => bed.current.stop(), []);

  const item = pool[idx];

  const begin = (lv: Level) => {
    setLevel(lv);
    setPool(buildPool(domain).slice(0, ROUND));
    setIdx(0);
    setListens(0);
    setRevealed(false);
    setMissed([]);
    setDone(false);
    setSaved(false);
  };

  const play = () => {
    if (!item || !level) return;
    bed.current.start(level.noise, level.noiseLevel);
    // Небольшая задержка: фон должен успеть подняться до начала речи.
    setTimeout(() => speakDutch(item.nl, level.rate), 350);
    setListens((n) => n + 1);
    // Останавливаем фон с запасом по длине фразы.
    const ms = 1200 + item.nl.length * 90;
    setTimeout(() => bed.current.stop(), ms);
  };

  const answer = (understood: boolean) => {
    if (!item) return;
    bed.current.stop();
    const nextMissed = understood ? missed : [...missed, item];
    setMissed(nextMissed);
    if (idx + 1 >= pool.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setListens(0);
      setRevealed(false);
    }
  };

  const saveMissed = () => {
    addCards(
      missed.map((m) =>
        newCard(m.nl, `${m.ru} — из «${m.scenarioTitle}»`, "debrief-heard", m.scenarioId)
      )
    );
    setSaved(true);
  };

  if (!canSpeak()) {
    return (
      <div>
        <button className="ghost" onClick={() => history.back()}>
          ← Назад
        </button>
        <h1>Слушание под давлением</h1>
        <p className="ru">
          В этом браузере нет синтеза речи. Откройте приложение в Chrome или
          Safari — тренажёр заработает.
        </p>
      </div>
    );
  }

  // ── Экран выбора ──
  if (!level) {
    return (
      <div>
        <button className="ghost" onClick={() => history.back()}>
          ← Назад
        </button>
        <h1>Слушание под давлением</h1>
        <p className="muted">
          Сказать вы уже можете. Ломает то, что приходит в ответ — быстро и в
          шуме. Здесь тренируется именно это, на репликах из всех{" "}
          {SCENARIOS.length} сценариев.
        </p>

        <div className="card">
          <h3 id="listening-domain">Из какой области?</h3>
          <select
            aria-labelledby="listening-domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="all">Все области вперемешку</option>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.icon} {d.title}
              </option>
            ))}
          </select>
        </div>

        <h2>Условия</h2>
        {LEVELS.map((lv) => (
          <div className="card tappable" key={lv.id} {...tappable(() => begin(lv))}>
            <span className="pill">{lv.id}</span>
            {lv.noise !== "none" && (
              <span className="pill amber">{NOISE_LABELS[lv.noise]}</span>
            )}
            <p className="lead">{lv.title}</p>
            <p className="ru">{lv.hint}</p>
          </div>
        ))}

        {!canPlayNoise() && (
          <p className="small muted">
            Браузер не поддерживает Web Audio — уровни будут без фонового шума,
            только со скоростью.
          </p>
        )}
      </div>
    );
  }

  // ── Итоги раунда ──
  if (done) {
    const got = pool.length - missed.length;
    const share = Math.round((got / pool.length) * 100);
    const next = LEVELS.find((l) => l.id === level.id + 1);
    return (
      <div className="center">
        <h1>Раунд пройден</h1>
        <p className="lead">
          Понято: {got} из {pool.length} ({share}%)
        </p>
        <p className="ru">
          {level.title}
          {level.noise !== "none" ? ` · ${NOISE_LABELS[level.noise]}` : ""}
        </p>

        {missed.length > 0 && (
          <>
            <div className="card">
              <h3>Что не разобрали</h3>
              {missed.map((m, i) => (
                <p key={i}>
                  <span className="nl" lang="nl">{m.nl}</span>
                  <br />
                  <span className="ru">{m.ru}</span>
                </p>
              ))}
            </div>
            <button className="secondary" onClick={saveMissed} disabled={saved}>
              {saved ? "Добавлено в повторение ✓" : `В повторение (${missed.length})`}
            </button>
          </>
        )}

        {share >= 75 && next ? (
          <button onClick={() => begin(next)}>Дальше: {next.title} →</button>
        ) : (
          <button onClick={() => begin(level)}>Ещё раунд на этом уровне</button>
        )}
        <button className="secondary" onClick={() => setLevel(null)}>
          Выбрать другие условия
        </button>
      </div>
    );
  }

  // ── Раунд ──
  const outOfListens = listens >= level.maxListens;
  const s = scenarioById(item.scenarioId);

  return (
    <div>
      <button
        className="ghost"
        onClick={() => {
          bed.current.stop();
          setLevel(null);
        }}
      >
        ← Условия
      </button>
      <h1>{level.title}</h1>
      <p className="muted">
        Реплика {idx + 1} из {pool.length}
        {level.noise !== "none" ? ` · ${NOISE_LABELS[level.noise]}` : ""}
      </p>
      <div className="progress">
        <div style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
      </div>

      <div className="card flashcard">
        {!revealed ? (
          <>
            <p className="small muted">
              Ловите смысл, не каждое слово. Прослушиваний осталось:{" "}
              {Math.max(0, level.maxListens - listens)}
            </p>
            <button className="inline" onClick={play} disabled={outOfListens}>
              🔊 {listens === 0 ? "Слушать" : "Ещё раз"}
            </button>
          </>
        ) : (
          <>
            <p className="nl" lang="nl">{item.nl}</p>
            <p className="ru">{item.ru}</p>
            {item.key && (
              <p className="small">
                <span className="pill amber">слово-ключ</span> <b>{item.key}</b>
              </p>
            )}
            <p className="small muted">{s?.title}</p>
          </>
        )}
      </div>

      {!revealed ? (
        <button
          className="secondary"
          disabled={listens === 0}
          onClick={() => {
            bed.current.stop();
            setRevealed(true);
          }}
        >
          {listens === 0 ? "Сначала прослушайте" : "Показать текст"}
        </button>
      ) : (
        <div className="btnrow">
          <button className="danger" onClick={() => answer(false)}>
            Не разобрал
          </button>
          <button onClick={() => answer(true)}>Понятно ✓</button>
        </div>
      )}
    </div>
  );
}
