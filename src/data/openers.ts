import type { Opener, OpenerContext } from "../types";

/**
 * Антипереключение (SPEC §2.1) — главный модуль продукта.
 *
 * Опенер решает разговор в первые полторы секунды. Нидерландцы переходят
 * на английский не из-за ошибки в грамматике, а из-за паузы и интонации.
 * Поэтому опенер учится наизусть до состояния, когда он вылетает сам,
 * и тренируется на скорость — не на правильность.
 *
 * Ходы возврата (`recovery`) нужны отдельно: на английский всё равно
 * иногда перейдут, и этот момент тоже надо уметь отыграть.
 */
export const OPENERS: Opener[] = [
  {
    id: "loket",
    nl: "Sorry, ik leer Nederlands. Mag ik het in het Nederlands proberen?",
    ru: "Извините, я учу нидерландский. Можно я попробую по-нидерландски?",
    kind: "opener",
    context: "loket",
    when: "Окно в гемеенте, IND, банк, регистратура. Говорится сразу, до того как собеседник успел оценить ваш акцент.",
  },
  {
    id: "telefoon",
    nl: "Goedemiddag, u spreekt met … . Ik leer Nederlands, mag het langzaam?",
    ru: "Добрый день, вас беспокоит … . Я учу нидерландский, можно медленнее?",
    kind: "opener",
    context: "telefoon",
    when: "По телефону нет лица и жестов, поэтому предупредить нужно в первой фразе. «U spreekt met …» — стандартное нидерландское представление.",
  },
  {
    id: "winkel",
    nl: "Hoi, ik oefen mijn Nederlands. Mag het in het Nederlands?",
    ru: "Здравствуйте, я тренирую нидерландский. Можно по-нидерландски?",
    kind: "opener",
    context: "winkel",
    when: "Магазин, аптека, стойка информации. Короче и легче, чем в окошке: разговор быстрый, длинного вступления не будет.",
  },
  {
    id: "informeel",
    nl: "Ik ben Nederlands aan het leren. Vind je het goed als we Nederlands praten?",
    ru: "Я учу нидерландский. Ничего, если мы будем говорить по-нидерландски?",
    kind: "opener",
    context: "informeel",
    when: "Сосед, коллега, родитель в школе. На «ты», и с прямым вопросом-разрешением — так это звучит просьбой, а не декларацией.",
  },
  {
    id: "recovery-toch",
    nl: "Mag ik het toch in het Nederlands doen? Ik moet oefenen.",
    ru: "Можно всё-таки по-нидерландски? Мне нужно практиковаться.",
    kind: "recovery",
    context: null,
    when: "Основной ход возврата, когда на английский уже перешли. «Toch» здесь — то самое «всё-таки»: возражает мягко, но ясно.",
  },
  {
    id: "recovery-tijd",
    nl: "Ik versta u wel, ik heb alleen even tijd nodig.",
    ru: "Я вас понимаю, мне просто нужно чуть больше времени.",
    kind: "recovery",
    context: null,
    when: "Когда переходят на английский из-за вашей паузы, а не из-за непонимания. Снимает ровно ту причину, по которой это сделали.",
  },
  {
    id: "recovery-dank",
    nl: "Dank u, maar ik wil het graag in het Nederlands blijven doen.",
    ru: "Спасибо, но я хотел бы продолжить по-нидерландски.",
    kind: "recovery",
    context: null,
    when: "Вежливый отказ от помощи, которую предложили из лучших побуждений. Формальный вариант — для окошка и телефона.",
  },
];

export const openerById = (id: string): Opener | undefined =>
  OPENERS.find((o) => o.id === id);

/** Опенер под обстановку сценария; ходы возврата годятся везде. */
export const openerFor = (context: OpenerContext): Opener =>
  OPENERS.find((o) => o.kind === "opener" && o.context === context) ?? OPENERS[0];

export const RECOVERY_MOVES: Opener[] = OPENERS.filter((o) => o.kind === "recovery");
