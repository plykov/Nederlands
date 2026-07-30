import { useState } from "react";
import { LOANWORDS, LOANWORD_MYTHS } from "../data/loanwords";
import { canSpeak, speakDutch } from "../lib/speech";

/**
 * Крючок заимствований (SPEC §2.6). Не задание и не тест — просто
 * приятная неожиданность: слово, которое вы уже произносите, оказывается
 * нидерландским. Тапом раскрывается оригинал, ошибиться тут нельзя.
 */
function WordCard({ w }: { w: (typeof LOANWORDS)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card tappable" onClick={() => setOpen((o) => !o)}>
      <p className="lead">{w.ru}</p>
      {open ? (
        <>
          <p className="nl">
            {w.nl}
            {canSpeak() && (
              <button
                className="inline secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  speakDutch(w.nl, 0.9);
                }}
              >
                🔊
              </button>
            )}
          </p>
          <p className="ru">{w.meaning}</p>
          <p className="small muted">{w.note}</p>
        </>
      ) : (
        <p className="small muted">Тапните — это слово нидерландское</p>
      )}
    </div>
  );
}

export default function Loanwords() {
  return (
    <div>
      <button className="ghost" onClick={() => history.back()}>
        ← Назад
      </button>
      <h1>Вы уже знаете кусочек нидерландского</h1>
      <p className="muted">
        Около 500 нидерландских слов вошли в русский при Петре I, в основном
        через флот. Вот {LOANWORDS.length}, которые вы наверняка уже
        произносите.
      </p>

      {LOANWORDS.map((w) => (
        <WordCard w={w} key={w.id} />
      ))}

      <h2>Похоже — но нет</h2>
      <p className="muted">
        Народная этимология охотно находит нидерландский след там, где его
        нет. Эти три слова только звучат похоже.
      </p>
      {LOANWORD_MYTHS.map((m) => (
        <div className="card" key={m.id}>
          <p className="small">
            <span className="pill amber">миф</span>
          </p>
          <p className="lead">{m.ru}</p>
          <p className="ru">
            Похоже на {m.looksLike}, но на самом деле — {m.actualOrigin}.
          </p>
          <p className="small muted">{m.note}</p>
        </div>
      ))}

      <p className="small muted">
        Источник — этимологический словарь Фасмера. Заимствование не
        объясняет ваше дело и не отменяет разговор на нидерландском — это
        просто повод не бояться языка с первой минуты.
      </p>
    </div>
  );
}
