import { createEmptyCard, fsrs, generatorParameters, Rating } from "ts-fsrs";
import type { Card as FsrsCard } from "ts-fsrs";
import type { ReviewCard } from "../types";
import { storage, uid } from "./storage";

/** Планировщик повторений: готовая реализация FSRS, не самописная. */
const scheduler = fsrs(generatorParameters({ enable_fuzz: true }));

export { Rating };

function reviveFsrsCard(raw: unknown): FsrsCard {
  const c = raw as FsrsCard & { due: string | Date; last_review?: string | Date };
  return {
    ...c,
    due: new Date(c.due),
    last_review: c.last_review ? new Date(c.last_review) : undefined,
  } as FsrsCard;
}

export function newCard(
  front: string,
  back: string,
  source: ReviewCard["source"],
  scenarioId?: string
): ReviewCard {
  return {
    id: uid(),
    front,
    back,
    source,
    scenarioId,
    createdISO: new Date().toISOString(),
    fsrs: createEmptyCard(new Date()),
  };
}

export function addCards(cards: ReviewCard[]): void {
  if (!cards.length) return;
  const all = storage.getCards();
  storage.setCards([...all, ...cards]);
}

export function dueCards(now = new Date()): ReviewCard[] {
  return storage
    .getCards()
    .filter((c) => reviveFsrsCard(c.fsrs).due.getTime() <= now.getTime())
    .sort(
      (a, b) =>
        reviveFsrsCard(a.fsrs).due.getTime() - reviveFsrsCard(b.fsrs).due.getTime()
    );
}

export function allCards(): ReviewCard[] {
  return storage.getCards();
}

/** Оценить карточку и сохранить новое расписание. Возвращает дату следующего показа. */
export function rateCard(cardId: string, rating: Rating, now = new Date()): Date | null {
  const all = storage.getCards();
  const idx = all.findIndex((c) => c.id === cardId);
  if (idx < 0) return null;
  const current = reviveFsrsCard(all[idx].fsrs);
  const result = scheduler.repeat(current, now);
  const next = result[rating as 1 | 2 | 3 | 4].card;
  all[idx] = { ...all[idx], fsrs: next };
  storage.setCards(all);
  return next.due;
}

export function deleteCard(cardId: string): void {
  storage.setCards(storage.getCards().filter((c) => c.id !== cardId));
}
