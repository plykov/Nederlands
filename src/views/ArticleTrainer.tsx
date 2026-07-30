import { useState } from "react";
import { NOUNS, nounsForScenario } from "../data/nouns";
import { scenarioById } from "../data/scenarios";
import { canSpeak, speakDutch } from "../lib/speech";
import { addCards, newCard } from "../lib/srs";
import type { Noun } from "../types";

/**
 * Тренажёр de/het (SPEC §2.2, CLAUDE.md правило 4).
 *
 * Правила здесь нет и не показывается. Слово никогда не появляется голым:
 * выбирать нужно между двумя целыми формами — «de huurcontract» и
 * «het huurcontract». Тренируется словосочетание, а не принцип, потому
 * что принципа не существует.
 *
 * Ошибки уходят в отдельную подколоду повторения.
 */

const ROUND = 12;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ArticleTrainer({ scenarioId }: { scenarioId?: string }) {
  const scenario = scenarioId ? scenarioById(scenarioId) : undefined;
  const pool = scenarioId ? nounsForScenario(scenarioId) : NOUNS;

  const [deck, setDeck] = useState<Noun[]>(() => shuffle(pool).slice(0, ROUND));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<"de" | "het" | null>(null);
  const [missed, setMissed] = useState<Noun[]>([]);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const noun = deck[idx];

  const restart = () => {
    setDeck(shuffle(pool).slice(0, ROUND));
    setIdx(0);
    setPicked(null);
    setMissed([]);
    setDone(false);
    setSaved(false);
  };

  const answer = (article: "de" | "het") => {
    setPicked(article);
    if (article !== noun.article) setMissed((m) => [...m, noun]);
    if (canSpeak()) speakDutch(`${noun.article} ${noun.word}`, 0.95);
  };

  const next = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const saveMissed = () => {
    addCards(
      missed.map((n) =>
        newCard(`${n.article} ${n.word}`, n.ru, "article", n.scenarioId)
      )
    );
    setSaved(true);
  };

  if (!pool.length) {
    return (
      <div>
        <button className="ghost" onClick={() => history.back()}>
          ← Назад
        </button>
        <h1>Тренажёр de/het</h1>
        <p className="ru">Для этого сценария слов пока не подобрано.</p>
        <button onClick={() => (location.hash = "#/articles")}>
          Все слова
        </button>
      </div>
    );
  }

  if (done) {
    const right = deck.length - missed.length;
    return (
      <div className="center">
        <h1>Круг пройден</h1>
        <p className="lead">
          {right} из {deck.length}
        </p>
        <p className="ru">
          Артикль не выводится правилом — он запоминается вместе со словом.
          Ошибки сегодня и есть ваш список на завтра.
        </p>

        {missed.length > 0 && (
          <>
            <div className="card">
              <h3>Не угадали</h3>
              {missed.map((n) => (
                <p key={n.word}>
                  <span className="nl">
                    <span className={n.article === "de" ? "article-de" : "article-het"}>
                      {n.article}
                    </span>{" "}
                    {n.word}
                  </span>
                  <br />
                  <span className="ru">{n.ru}</span>
                </p>
              ))}
            </div>
            <button className="secondary" onClick={saveMissed} disabled={saved}>
              {saved ? "Добавлено в повторение ✓" : `В повторение (${missed.length})`}
            </button>
          </>
        )}

        <button onClick={restart}>Ещё круг</button>
        <button className="secondary" onClick={() => (location.hash = "#/")}>
          На главную
        </button>
      </div>
    );
  }

  const correct = picked === noun.article;

  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>de или het</h1>
      <p className="muted">
        {scenario ? `Слова к сценарию: ${scenario.title}` : "Слова из всех сценариев"}
        {" · "}
        {idx + 1} из {deck.length}
      </p>
      <div className="progress">
        <div style={{ width: `${((idx + 1) / deck.length) * 100}%` }} />
      </div>

      <div className="card flashcard">
        {picked === null ? (
          <>
            <p className="ru">{noun.ru}</p>
            <p className="small muted">Какая форма верная?</p>
          </>
        ) : (
          <>
            <p className="nl">
              <span className={noun.article === "de" ? "article-de" : "article-het"}>
                {noun.article}
              </span>{" "}
              {noun.word}
            </p>
            <p className="ru">{noun.ru}</p>
            <p className="small">
              {correct ? (
                <span className="pill">верно</span>
              ) : (
                <span className="pill red">мимо</span>
              )}
            </p>
          </>
        )}
      </div>

      {picked === null ? (
        <div className="btnrow">
          <button className="secondary" onClick={() => answer("de")}>
            de {noun.word}
          </button>
          <button className="secondary" onClick={() => answer("het")}>
            het {noun.word}
          </button>
        </div>
      ) : (
        <>
          {canSpeak() && (
            <button
              className="inline secondary"
              onClick={() => speakDutch(`${noun.article} ${noun.word}`, 0.85)}
            >
              🔊 Ещё раз, медленно
            </button>
          )}
          <button onClick={next}>
            {idx + 1 === deck.length ? "Итоги" : "Дальше"}
          </button>
        </>
      )}

      <p className="small muted">
        Правила, по которому это можно вывести, не существует — поэтому его
        здесь и нет. Работает только одно: никогда не держать существительное
        в голове без артикля.
      </p>
    </div>
  );
}
