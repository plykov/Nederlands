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

  // ── добавлено вместе с третьей партией сценариев ──
  {
    id: "a1-loket-vervolg",
    level: "A1",
    domain: "bureaucratie",
    text: "Продлить документ на приёме и уточнить срок и способ оплаты",
    scenarios: ["paspoort-verlenging"],
  },
  {
    id: "a2-telefoon-support",
    level: "A2",
    domain: "bureaucratie",
    text: "Объяснить техническую проблему по телефону и понять инструкцию в ответ",
    scenarios: ["digid-activeren"],
  },
  {
    id: "a1-kind-medisch",
    level: "A1",
    domain: "gezondheid",
    text: "Ответить на вопросы о самочувствии ребёнка на плановом медицинском приёме",
    scenarios: ["ggd-inenting"],
  },
  {
    id: "b1-medisch-plan",
    level: "B1",
    domain: "gezondheid",
    text: "Описать историю жалобы специалисту и обсудить план лечения и страховку",
    scenarios: ["fysiotherapie-verwijzing"],
  },
  {
    id: "a1-school-logistiek",
    level: "A1",
    domain: "school",
    text: "Договориться о логистике: дни присмотра, оплата, место встречи",
    scenarios: ["tussenschoolse-opvang"],
  },
  {
    id: "b1-school-advies",
    level: "B1",
    domain: "school",
    text: "Обсудить рекомендацию по уровню образования и отстоять точку зрения ребёнка",
    scenarios: ["mentor-gesprek-voortgezet"],
  },
  {
    id: "a2-wonen-overdracht",
    level: "A2",
    domain: "wonen",
    text: "Пройти передачу ключей: проверить состояние жилья и зафиксировать замечания",
    scenarios: ["sleuteloverdracht-makelaar"],
  },
  {
    id: "b1-wonen-vergadering",
    level: "B1",
    domain: "wonen",
    text: "Высказать и обосновать позицию на собрании жильцов и проголосовать осознанно",
    scenarios: ["vve-vergadering-buren"],
  },
  {
    id: "a2-werk-onboarding",
    level: "A2",
    domain: "werk",
    text: "Пройти оформление в первый рабочий день и уточнить условия контракта",
    scenarios: ["eerste-werkdag-hr"],
  },
  {
    id: "b1-werk-verzuim",
    level: "B1",
    domain: "werk",
    text: "Обсудить с врачом компании план возвращения на работу после больничного",
    scenarios: ["verzuim-bedrijfsarts"],
  },
  {
    id: "a1-dagelijks-dienst",
    level: "A1",
    domain: "dagelijks",
    text: "Записаться на бытовую услугу и объяснить, что именно нужно",
    scenarios: ["kapper-afspraak"],
  },
  {
    id: "a2-dagelijks-reparatie",
    level: "A2",
    domain: "dagelijks",
    text: "Описать неисправность мастеру и понять предложенное решение и цену",
    scenarios: ["fietsenmaker-reparatie"],
  },

  // ── добавлено вместе с четвёртой партией сценариев (A1) ──
  {
    id: "a1-loket-telefonisch",
    level: "A1",
    domain: "bureaucratie",
    text: "Записаться на приём по телефону и продиктовать свои данные",
    scenarios: ["afspraak-gemeente-telefonisch", "adresverandering-doorgeven"],
  },
  {
    id: "a1-loket-documenten",
    level: "A1",
    domain: "bureaucratie",
    text: "Заказать документ на приёме и понять условия получения",
    scenarios: ["uittreksel-brp-aanvragen", "rijbewijs-omwisselen"],
  },
  {
    id: "a1-medisch-telefoon",
    level: "A1",
    domain: "gezondheid",
    text: "Описать несложную жалобу по телефону и понять совет в ответ",
    scenarios: ["huisarts-telefonisch-consult", "recept-herhalen"],
  },
  {
    id: "a1-medisch-prikpost",
    level: "A1",
    domain: "gezondheid",
    text: "Пройти несложную медицинскую процедуру по направлению",
    scenarios: ["bloedprikken-afspraak"],
  },
  {
    id: "a1-school-bytovoe",
    level: "A1",
    domain: "school",
    text: "Обсудить со школой бытовой вопрос и дать чёткий ответ",
    scenarios: ["schoolfoto-toestemming", "verjaardag-trakteren"],
  },
  {
    id: "a1-school-uchastie",
    level: "A1",
    domain: "school",
    text: "Ответить на приглашение поучаствовать и договориться о деталях",
    scenarios: ["oudercommissie-uitnodiging", "schoolzwemmen-aanmelding"],
  },
  {
    id: "a1-wonen-dienst",
    level: "A1",
    domain: "wonen",
    text: "Передать данные или задать бытовой вопрос про жильё по телефону",
    scenarios: ["energie-meterstand-doorgeven", "huisvuil-ophalen-vraag"],
  },
  {
    id: "a1-wonen-sosedi",
    level: "A1",
    domain: "wonen",
    text: "Договориться с соседом об услуге и сообщить о мелком ущербе страховой",
    scenarios: ["buren-sleutel-vragen", "verzekering-schade-melden"],
  },
  {
    id: "a1-werk-bytovoe",
    level: "A1",
    domain: "werk",
    text: "Обсудить с коллегами бытовой рабочий вопрос — отпуск, обед, мероприятие",
    scenarios: ["verlof-aanvragen", "kantine-bestellen", "teamuitje-planning"],
  },
  {
    id: "a1-dagelijks-poruchenia",
    level: "A1",
    domain: "dagelijks",
    text: "Выполнить бытовое поручение вне дома: забрать вещи, записаться, отправить",
    scenarios: ["stomerij-afhalen", "bibliotheek-inschrijven", "postkantoor-pakket-versturen"],
  },
];

export const LEVEL_NOTE: Record<CefrLevel, string> = {
  A1: "Выживание: короткие формулы, знакомые ситуации, много переспрашиваний.",
  A2: "Действующий языковой порог для натурализации. Переход на B1 обсуждается, но пока не принят.",
  B1: "Порог inburgering для тех, на кого распространяется обязанность (три года с её начала). Он же — предлагаемый новый уровень для натурализации.",
};
