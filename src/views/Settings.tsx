import { useState } from "react";
import { storage } from "../lib/storage";
import { allCards } from "../lib/srs";
import { tappable } from "../lib/a11y";

export default function Settings() {
  const [confirming, setConfirming] = useState(false);
  const [wiped, setWiped] = useState(false);

  const cards = allCards().length;
  const ledger = storage.getLedger().length;

  const wipe = () => {
    storage.wipeAll();
    setWiped(true);
    setConfirming(false);
  };

  return (
    <div>
      <h1>Ещё</h1>

      <div className="card">
        <h3>О приложении</h3>
        <p className="ru">
          Nederlands Vivo — для тех, кто уже живёт в Нидерландах и кому говорить
          нужно сейчас. Мы не учим язык «вообще» — мы готовим вас к конкретному
          разговору этой недели: гемеенте, IND, врач, школа, хозяин квартиры.
        </p>
        <p className="ru">
          Цикл: <b>репетиция → дело → разбор</b>. Семь минут до, пять минут
          после. Главная метрика — разговоры, которые остались на нидерландском.
        </p>
        <p className="small muted">
          Счётчиков дней подряд, сердечек и «минут занятий» здесь нет и не
          будет: на устную речь влияет частота реальных попыток, а не время,
          проведённое в приложении.
        </p>
      </div>

      <div className="card">
        <h3>Что стоит знать про курсы</h3>
        <p className="ru">
          Если на вас распространяется обязанность inburgering, курс и экзамены
          организуются через муниципалитет, а заём на обучение — через DUO.
          Кроме того, почти в каждом городе есть бесплатные <b>taalcafé</b> при
          библиотеках и <b>taalmaatjes</b> — волонтёры-собеседники. Курсы учат
          языку. Мы помогаем прожить эту неделю. Одно другому не мешает.
        </p>
      </div>

      <div className="card tappable" {...tappable(() => (location.hash = "#/inburgering"))}>
        <span className="pill amber">справочно</span>
        <p className="lead">Мои сроки inburgering</p>
        <p className="ru">
          Укажите статус — покажем срок и требования маршрута. Советов по
          вашему делу здесь нет и не будет.
        </p>
      </div>

      <div className="card">
        <h3>Языковые требования (справочно)</h3>
        <p className="ru">
          • <b>A2</b> — действующий языковой порог для натурализации. Переход на
          B1 обсуждался, но пока не принят.
          <br />• <b>B1</b> — стандартный маршрут inburgering для тех, на кого
          распространяется обязанность; срок — три года с её начала.
          <br />• Уровень подтверждают экзамены inburgering или Staatsexamen NT2
          (программа I — B1, программа II — B2).
        </p>
        <p className="small muted">
          Мы учим языку разговора в окошке — и никогда не консультируем по
          существу вашего дела. По процедурам, срокам и статусу обращайтесь в
          муниципалитет, в IND или к юристу.
        </p>
      </div>

      <div className="card tappable" {...tappable(() => (location.hash = "#/feedback"))}>
        <span className="pill amber">тестерам</span>
        <p className="lead">Оставить отзыв</p>
        <p className="ru">
          Если вы участвуете в тестировании — короткая анкета на 2–3 минуты.
          Особенно ценно то, что вам сказали, а вы не поняли.
        </p>
      </div>

      <div className="card">
        <h3>Ваши данные</h3>
        <p className="ru">
          Всё хранится только на этом устройстве: дневник ({ledger}), карточки (
          {cards}), запланированные дела. Голосовые записи не покидают телефон и
          не сохраняются после закрытия страницы. Серверов у этой версии нет —
          отправлять ваши данные попросту некуда.
        </p>
        {wiped ? (
          <p className="ru">Все данные удалены ✓ Обновите страницу.</p>
        ) : confirming ? (
          <div className="btnrow">
            <button className="danger" onClick={wipe}>
              Да, удалить всё безвозвратно
            </button>
            <button className="secondary" onClick={() => setConfirming(false)}>
              Отмена
            </button>
          </div>
        ) : (
          <button className="secondary" onClick={() => setConfirming(true)}>
            Удалить все мои данные
          </button>
        )}
      </div>
    </div>
  );
}
