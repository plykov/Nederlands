/** Домены — из `_SCHEMA.md` этого репозитория, не из итальянского продукта. */
export type DomainId =
  | "bureaucratie"
  | "gezondheid"
  | "school"
  | "wonen"
  | "werk"
  | "dagelijks";

export interface Domain {
  id: DomainId;
  title: string; // русское название домена
  icon: string;
}

/** Реплика пользователя в сценарии */
export interface UserLine {
  nl: string;
  ru: string;
  /** контрастная заметка: чем нидерландское поведение отличается от русского ожидания */
  note?: string;
}

/** Ответ, который реально приходит в ответ — банк ответов */
export interface Reply {
  nl: string;
  ru: string;
  /** на что обратить слух: ключевое слово/формула */
  key?: string;
  /**
   * Регистр реплики. `switch` — момент, когда собеседник предлагает
   * перейти на английский. Ровно этот момент и надо отрепетировать.
   */
  register?: "formeel" | "neutraal" | "informeel" | "switch";
}

/** Ловушка интерференции: как скажет русскоязычный — и как правильно */
export interface Trap {
  wrong: string;
  right: string;
  why: string; // объяснение по-русски
}

/** Элемент произносительного гейта: то, из-за чего переключат на английский */
export interface GateItem {
  word: string;
  focus: string; // напр. «ui = /œy/», «харде G»
  tip: string; // как произнести, по-русски
}

/** Где происходит разговор — от этого зависит, какой опенер уместен. */
export type OpenerContext = "loket" | "telefoon" | "winkel" | "informeel";

export interface Scenario {
  id: string;
  domain: DomainId;
  level: "A1" | "A2" | "B1";
  title: string;
  /** когда это обычно случается — для триггера */
  context: string;
  minutes: number;
  openerContext: OpenerContext;
  /** что произойдёт, по порядку, по-русски */
  brief: string[];
  lines: UserLine[];
  replyBank: Reply[];
  /** id приёмов ремонта, ключевые для сценария */
  repairIds: string[];
  traps: Trap[];
  gate: GateItem[];
}

/** Приём «ремонта» разговора — ядро A1, не вежливость */
export interface RepairMove {
  id: string;
  nl: string;
  ru: string;
  when: string; // когда применять, по-русски
}

/**
 * Опенер против перехода на английский и ходы возврата, если переход
 * уже случился. SPEC §2.1: главный модуль продукта.
 */
export interface Opener {
  id: string;
  nl: string;
  ru: string;
  kind: "opener" | "recovery";
  /** для какой обстановки; `null` — годится везде */
  context: OpenerContext | null;
  when: string;
}

/**
 * Существительное для тренажёра de/het.
 * Артикль — часть слова, а не отдельное свойство: правила тут нет
 * и не будет (CLAUDE.md, правило 4).
 */
export interface Noun {
  word: string;
  article: "de" | "het";
  ru: string;
  /** к какому сценарию слово относится — чтобы учить нужное перед делом */
  scenarioId?: string;
}

/** Запись в Дневнике умений («Что я уже умею») */
export interface LedgerEntry {
  id: string;
  dateISO: string;
  scenarioId?: string;
  text: string; // что сделал
  stayedInDutch: boolean | null;
  notUnderstood: string[]; // что не понял — уходит в повторение
  couldNotSay: string[]; // что хотел сказать и не смог
}

/** Карточка повторения (FSRS-состояние хранится сериализованным) */
export interface ReviewCard {
  id: string;
  front: string; // нидерландское / услышанное
  back: string; // перевод / пояснение
  source: "debrief-heard" | "debrief-say" | "scenario" | "trap" | "article";
  scenarioId?: string;
  createdISO: string;
  fsrs: unknown; // сериализованная карточка ts-fsrs
}

/** Запланированное дело с датой — триггер репетиции */
export interface Appointment {
  id: string;
  scenarioId: string;
  dateISO: string;
  note: string;
  rehearsed: boolean;
  debriefed: boolean;
}
