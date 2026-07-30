import type { DomainId } from "../types";

/**
 * Вторая поверхность прогресса: карта CEFR can-do.
 * Намеренно НЕ главный экран — главное всегда реальные разговоры, —
 * но нужна с первого дня: на ней держится сигнал готовности к A2 и B1.
 */

export type CefrLevel = "A1" | "A2" | "B1";

export interface CanDo {
  id: string;
  level: CefrLevel;
  domain: DomainId;
  /** формулировка «я умею…» по-русски */
  text: string;
  /** сценарии, которые её закрывают */
  scenarios: string[];
}

export const CAN_DOS: CanDo[] = [
  // ── A1 ──
  {
    id: "a1-gegevens",
    level: "A1",
    domain: "bureaucratie",
    text: "Назвать свои данные и продиктовать по буквам фамилию и адрес",
    scenarios: ["gemeente-inschrijving", "ov-controle"],
  },
  {
    id: "a1-reparatie",
    level: "A1",
    domain: "bureaucratie",
    text: "Попросить повторить, замедлиться или написать — и не выпасть из разговора",
    scenarios: ["gemeente-inschrijving", "huisarts-inschrijving", "ov-controle"],
  },
  {
    id: "a1-klacht",
    level: "A1",
    domain: "gezondheid",
    text: "Коротко назвать жалобу и записаться на приём",
    scenarios: ["huisarts-inschrijving"],
  },
  {
    id: "a1-apotheek",
    level: "A1",
    domain: "gezondheid",
    text: "Получить лекарство по рецепту и понять режим приёма",
    scenarios: ["apotheek-medicijn"],
  },
  {
    id: "a1-buren",
    level: "A1",
    domain: "dagelijks",
    text: "Заговорить с соседом и объяснить проблему, не доводя до ссоры",
    scenarios: ["buurman-geluid"],
  },
  {
    id: "a1-ov",
    level: "A1",
    domain: "dagelijks",
    text: "Ответить контролёру и понять, что от вас требуется",
    scenarios: ["ov-controle"],
  },

  // ── A2 (действующий порог для натурализации) ──
  {
    id: "a2-loket",
    level: "A2",
    domain: "bureaucratie",
    text: "Пройти приём в учреждении: понять список документов и что делать дальше",
    scenarios: ["gemeente-inschrijving", "ind-verblijfsvergunning"],
  },
  {
    id: "a2-termijn",
    level: "A2",
    domain: "bureaucratie",
    text: "Понять срок рассмотрения и способ получить решение — с первого раза",
    scenarios: ["ind-verblijfsvergunning"],
  },
  {
    id: "a2-telefoon",
    level: "A2",
    domain: "wonen",
    text: "Объяснить поломку по телефону и договориться о визите мастера",
    scenarios: ["verhuurder-onderhoud"],
  },
  {
    id: "a2-contract",
    level: "A2",
    domain: "wonen",
    text: "Заключить договор по телефону и понять условия и суммы на слух",
    scenarios: ["energiebedrijf-aansluiting"],
  },
  {
    id: "a2-school",
    level: "A2",
    domain: "school",
    text: "Записать ребёнка в школу и понять, как устроена языковая поддержка",
    scenarios: ["school-aanmelding"],
  },
  {
    id: "a2-werk",
    level: "A2",
    domain: "werk",
    text: "Отчитаться на планёрке и поддержать короткий разговор с коллегами",
    scenarios: ["werkoverleg-collegas"],
  },

  // ── B1 (порог inburgering; предлагаемый новый порог для натурализации) ──
  {
    id: "b1-oudergesprek",
    level: "B1",
    domain: "school",
    text: "Провести разговор с учителем об успехах ребёнка и договориться о плане",
    scenarios: ["oudergesprek-leerkracht"],
  },
  {
    id: "b1-geld",
    level: "B1",
    domain: "werk",
    text: "Разобрать расчётный листок и задать конкретный вопрос о деньгах",
    scenarios: ["loonstrook-vraag"],
  },
  {
    id: "b1-onderhandelen",
    level: "B1",
    domain: "wonen",
    text: "Отстоять позицию вежливо: возразить, отказать, попросить подтверждение письменно",
    scenarios: ["verhuurder-onderhoud", "energiebedrijf-aansluiting"],
  },
  {
    id: "b1-doorvragen",
    level: "B1",
    domain: "bureaucratie",
    text: "Удержать разговор в нидерландском, когда собеседник уже предложил английский",
    scenarios: [
      "ind-verblijfsvergunning",
      "oudergesprek-leerkracht",
      "loonstrook-vraag",
      "woning-bezichtiging",
      "sollicitatiegesprek",
    ],
  },

  // ── добавлено вместе со второй партией сценариев ──
  {
    id: "a1-tandarts",
    level: "A1",
    domain: "gezondheid",
    text: "Позвонить с острой болью и получить приём на сегодня",
    scenarios: ["tandarts-afspraak"],
  },
  {
    id: "a1-ziekmelding",
    level: "A1",
    domain: "school",
    text: "Сообщить по телефону, что вы или ребёнок заболели",
    scenarios: ["ziekmelding-school", "ziekmelding-werk"],
  },
  {
    id: "a1-deur",
    level: "A1",
    domain: "dagelijks",
    text: "Ответить курьеру у двери и принять посылку",
    scenarios: ["pakket-bezorger"],
  },
  {
    id: "a1-boodschappen",
    level: "A1",
    domain: "dagelijks",
    text: "Купить нужное количество, спросить цену и заплатить",
    scenarios: ["markt-winkel"],
  },
  {
    id: "a2-bank",
    level: "A2",
    domain: "bureaucratie",
    text: "Открыть счёт в банке и понять условия обслуживания",
    scenarios: ["bank-rekening-openen"],
  },
  {
    id: "a2-opvang",
    level: "A2",
    domain: "school",
    text: "Узнать про место в детском саду: очередь, дни, тариф",
    scenarios: ["kinderopvang-plek"],
  },
  {
    id: "a2-helpdesk",
    level: "A2",
    domain: "wonen",
    text: "Пройти телефонный чек-лист поддержки и вызвать мастера",
    scenarios: ["internet-storing"],
  },
  {
    id: "b1-toeslagen",
    level: "B1",
    domain: "bureaucratie",
    text: "Обсудить с ведомством изменение дохода и возврат переплаты",
    scenarios: ["belastingdienst-toeslagen"],
  },
  {
    id: "b1-specialist",
    level: "B1",
    domain: "gezondheid",
    text: "Изложить историю специалисту и понять план обследования",
    scenarios: ["ziekenhuis-verwijzing"],
  },
  {
    id: "b1-huurmarkt",
    level: "B1",
    domain: "wonen",
    text: "Пройти просмотр квартиры и задать вопросы о цене, залоге и документах",
    scenarios: ["woning-bezichtiging"],
  },
  {
    id: "b1-sollicitatie",
    level: "B1",
    domain: "werk",
    text: "Пройти собеседование: рассказать о себе и обсудить условия",
    scenarios: ["sollicitatiegesprek"],
  },
];

export const LEVEL_NOTE: Record<CefrLevel, string> = {
  A1: "Выживание: короткие формулы, знакомые ситуации, много переспрашиваний.",
  A2: "Действующий языковой порог для натурализации. Переход на B1 обсуждается, но пока не принят.",
  B1: "Порог inburgering для тех, на кого распространяется обязанность (три года с её начала). Он же — предлагаемый новый уровень для натурализации.",
};
