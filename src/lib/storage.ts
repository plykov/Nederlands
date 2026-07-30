import type {
  Appointment,
  InburgeringProfile,
  LedgerEntry,
  ReviewCard,
} from "../types";

/**
 * Всё хранится локально на устройстве (localStorage).
 * Голос никуда не отправляется — записи живут только в памяти страницы.
 * Это GDPR-позиция MVP: минимум данных, всё под контролем пользователя.
 */

const KEYS = {
  ledger: "nv.ledger.v1",
  cards: "nv.cards.v1",
  appointments: "nv.appointments.v1",
  onboarded: "nv.onboarded.v1",
  course: "nv.course.v1",
  inburgering: "nv.inburgering.v1",
} as const;

/** Лучший результат по уроку: id → доля верных ответов (0…1) */
export type CourseProgress = Record<string, number>;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // квота исчерпана или приватный режим — молча живём в памяти
  }
}

export const storage = {
  getLedger: (): LedgerEntry[] => load(KEYS.ledger, []),
  setLedger: (v: LedgerEntry[]) => save(KEYS.ledger, v),

  getCards: (): ReviewCard[] => load(KEYS.cards, []),
  setCards: (v: ReviewCard[]) => save(KEYS.cards, v),

  getAppointments: (): Appointment[] => load(KEYS.appointments, []),
  setAppointments: (v: Appointment[]) => save(KEYS.appointments, v),

  isOnboarded: (): boolean => load(KEYS.onboarded, false),
  setOnboarded: () => save(KEYS.onboarded, true),

  getCourse: (): CourseProgress => load(KEYS.course, {}),
  /** Сохраняем только улучшение — повторный проход не портит результат. */
  setLessonScore: (lessonId: string, score: number) => {
    const cur = load<CourseProgress>(KEYS.course, {});
    if ((cur[lessonId] ?? -1) < score) {
      save(KEYS.course, { ...cur, [lessonId]: score });
    }
  },

  getInburgering: (): InburgeringProfile | null => load(KEYS.inburgering, null),
  setInburgering: (v: InburgeringProfile | null) => save(KEYS.inburgering, v),

  /** Полное удаление всех данных пользователя — право на забвение, одна кнопка. */
  wipeAll: () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};

export const uid = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
