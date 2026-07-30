import type { Noun } from "../types";

/**
 * Слова для тренажёра de/het.
 *
 * CLAUDE.md, правило 4: артикль никогда не преподаётся как правило.
 * Слово всегда хранится, показывается и тренируется вместе с артиклем —
 * распределение произвольное, и попытки вывести правило проваливаются.
 *
 * Все слова взяты из сценариев: тренируется то, что понадобится в деле,
 * а не абстрактный частотный список.
 */
export const NOUNS: Noun[] = [
  // bureaucratie
  { word: "gemeente", article: "de", ru: "муниципалитет", scenarioId: "gemeente-inschrijving" },
  { word: "paspoort", article: "het", ru: "паспорт", scenarioId: "gemeente-inschrijving" },
  { word: "huurcontract", article: "het", ru: "договор аренды", scenarioId: "gemeente-inschrijving" },
  { word: "afspraak", article: "de", ru: "запись, назначенная встреча", scenarioId: "gemeente-inschrijving" },
  { word: "adres", article: "het", ru: "адрес", scenarioId: "gemeente-inschrijving" },
  { word: "toestemming", article: "de", ru: "разрешение", scenarioId: "gemeente-inschrijving" },
  { word: "identiteitsbewijs", article: "het", ru: "удостоверение личности", scenarioId: "gemeente-inschrijving" },
  { word: "wachtruimte", article: "de", ru: "зал ожидания", scenarioId: "gemeente-inschrijving" },
  { word: "verblijfsvergunning", article: "de", ru: "вид на жительство", scenarioId: "ind-verblijfsvergunning" },
  { word: "aanvraag", article: "de", ru: "заявление", scenarioId: "ind-verblijfsvergunning" },
  { word: "verblijfsdocument", article: "het", ru: "карточка ВНЖ", scenarioId: "ind-verblijfsvergunning" },
  { word: "werkgever", article: "de", ru: "работодатель", scenarioId: "ind-verblijfsvergunning" },

  // gezondheid
  { word: "huisarts", article: "de", ru: "семейный врач", scenarioId: "huisarts-inschrijving" },
  { word: "koorts", article: "de", ru: "температура, жар", scenarioId: "huisarts-inschrijving" },
  { word: "keelpijn", article: "de", ru: "боль в горле", scenarioId: "huisarts-inschrijving" },
  { word: "zorgverzekering", article: "de", ru: "медицинская страховка", scenarioId: "huisarts-inschrijving" },
  { word: "ziekenhuis", article: "het", ru: "больница", scenarioId: "huisarts-inschrijving" },
  { word: "spreekuur", article: "het", ru: "приёмные часы", scenarioId: "huisarts-inschrijving" },
  { word: "buurt", article: "de", ru: "район, окрестность", scenarioId: "huisarts-inschrijving" },
  { word: "apotheek", article: "de", ru: "аптека", scenarioId: "apotheek-medicijn" },
  { word: "recept", article: "het", ru: "рецепт", scenarioId: "apotheek-medicijn" },
  { word: "medicijn", article: "het", ru: "лекарство", scenarioId: "apotheek-medicijn" },
  { word: "maaltijd", article: "de", ru: "приём пищи", scenarioId: "apotheek-medicijn" },
  { word: "balie", article: "de", ru: "стойка, ресепшн", scenarioId: "apotheek-medicijn" },

  // school
  { word: "school", article: "de", ru: "школа", scenarioId: "school-aanmelding" },
  { word: "rapport", article: "het", ru: "табель, отчёт", scenarioId: "school-aanmelding" },
  { word: "wachtlijst", article: "de", ru: "лист ожидания", scenarioId: "school-aanmelding" },
  { word: "ouderbijdrage", article: "de", ru: "родительский взнос", scenarioId: "school-aanmelding" },
  { word: "gesprek", article: "het", ru: "разговор, беседа", scenarioId: "oudergesprek-leerkracht" },
  { word: "kind", article: "het", ru: "ребёнок", scenarioId: "oudergesprek-leerkracht" },
  { word: "leerkracht", article: "de", ru: "учитель", scenarioId: "oudergesprek-leerkracht" },
  { word: "ontwikkeling", article: "de", ru: "развитие", scenarioId: "oudergesprek-leerkracht" },

  // wonen
  { word: "woning", article: "de", ru: "жильё, квартира", scenarioId: "verhuurder-onderhoud" },
  { word: "storing", article: "de", ru: "неисправность, сбой", scenarioId: "verhuurder-onderhoud" },
  { word: "verwarming", article: "de", ru: "отопление", scenarioId: "verhuurder-onderhoud" },
  { word: "onderhoud", article: "het", ru: "обслуживание, ремонт", scenarioId: "verhuurder-onderhoud" },
  { word: "huurder", article: "de", ru: "наниматель", scenarioId: "verhuurder-onderhoud" },
  { word: "dak", article: "het", ru: "крыша", scenarioId: "verhuurder-onderhoud" },
  { word: "contract", article: "het", ru: "договор", scenarioId: "energiebedrijf-aansluiting" },
  { word: "meterstand", article: "de", ru: "показания счётчика", scenarioId: "energiebedrijf-aansluiting" },
  { word: "termijnbedrag", article: "het", ru: "ежемесячный аванс", scenarioId: "energiebedrijf-aansluiting" },
  { word: "tarief", article: "het", ru: "тариф", scenarioId: "energiebedrijf-aansluiting" },

  // werk
  { word: "collega", article: "de", ru: "коллега", scenarioId: "werkoverleg-collegas" },
  { word: "weekend", article: "het", ru: "выходные", scenarioId: "werkoverleg-collegas" },
  { word: "kantoor", article: "het", ru: "офис", scenarioId: "werkoverleg-collegas" },
  { word: "vergadering", article: "de", ru: "совещание", scenarioId: "werkoverleg-collegas" },
  { word: "loonstrook", article: "de", ru: "расчётный листок", scenarioId: "loonstrook-vraag" },
  { word: "loon", article: "het", ru: "зарплата", scenarioId: "loonstrook-vraag" },
  { word: "vakantiegeld", article: "het", ru: "отпускные", scenarioId: "loonstrook-vraag" },
  { word: "belasting", article: "de", ru: "налог", scenarioId: "loonstrook-vraag" },
  { word: "rekening", article: "de", ru: "счёт", scenarioId: "loonstrook-vraag" },

  // dagelijks
  { word: "buurman", article: "de", ru: "сосед", scenarioId: "buurman-geluid" },
  { word: "lawaai", article: "het", ru: "шум", scenarioId: "buurman-geluid" },
  { word: "geluid", article: "het", ru: "звук", scenarioId: "buurman-geluid" },
  { word: "muziek", article: "de", ru: "музыка", scenarioId: "buurman-geluid" },
  { word: "ruzie", article: "de", ru: "ссора", scenarioId: "buurman-geluid" },
  { word: "kaart", article: "de", ru: "карта, проездной", scenarioId: "ov-controle" },
  { word: "vervoersbewijs", article: "het", ru: "проездной документ", scenarioId: "ov-controle" },
  { word: "boete", article: "de", ru: "штраф", scenarioId: "ov-controle" },
  { word: "trein", article: "de", ru: "поезд", scenarioId: "ov-controle" },
  { word: "station", article: "het", ru: "вокзал, станция", scenarioId: "ov-controle" },
  { word: "brief", article: "de", ru: "письмо", scenarioId: "ov-controle" },
  { word: "geld", article: "het", ru: "деньги", scenarioId: "ov-controle" },
];

export const nounsForScenario = (scenarioId: string): Noun[] =>
  NOUNS.filter((n) => n.scenarioId === scenarioId);
