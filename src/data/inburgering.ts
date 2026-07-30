import type { InburgeringRoute, LegalStatus } from "../types";
import { LEVEL_NOTE } from "./cando";

/**
 * Трекер inburgering — SPEC §2.7. Справочные сроки и требования по
 * общедоступным правилам, ничего сверх этого: ни советов по конкретному
 * делу, ни оценки шансов на продление или исключение. CLAUDE.md, правило 7.
 */

export interface StatusInfo {
  id: LegalStatus;
  title: string;
  obligated: boolean;
  hook: string;
  deadline: string;
}

export const STATUSES: StatusInfo[] = [
  {
    id: "obligated",
    title: "Гражданин РФ по семейному или убежищному разрешению",
    obligated: true,
    hook: "Обязанность установлена законом.",
    deadline: "Три года с начала обязанности, уровень B1.",
  },
  {
    id: "kennismigrant",
    title: "Kennismigrant (высококвалифицированный специалист)",
    obligated: false,
    hook: "Пока разрешение временное — освобождение действует.",
    deadline: "Понадобится для постоянного вида на жительство или натурализации.",
  },
  {
    id: "temp_protection",
    title: "Украина, временная защита",
    obligated: false,
    hook: "Работа, школа, повседневная жизнь.",
    deadline: "Обязанности по inburgering нет.",
  },
  {
    id: "naturalisation",
    title: "Собираюсь подавать на натурализацию",
    obligated: false,
    hook: "Гражданство.",
    deadline: LEVEL_NOTE.A2,
  },
];

export const statusById = (id: LegalStatus): StatusInfo | undefined =>
  STATUSES.find((s) => s.id === id);

export interface RouteInfo {
  id: InburgeringRoute;
  title: string;
  forWhom: string;
  requirements: string[];
}

/**
 * KNM, MAP и PVT общие для всех трёх маршрутов — разница в языковом пороге
 * и в форме итогового подтверждения.
 */
export const ROUTES: RouteInfo[] = [
  {
    id: "b1",
    title: "B1-route — стандартный маршрут",
    forWhom: "По умолчанию, если не выбран другой маршрут.",
    requirements: [
      "KNM — экзамен «Знание нидерландского общества»",
      "MAP — модуль «Рынок труда и участие»",
      "PVT — участие в Participatieverklaringstraject",
      "Языковой экзамен на уровень B1 (Staatsexamen NT2 программа I или инбюргерингс-экзамены)",
    ],
  },
  {
    id: "onderwijs",
    title: "Onderwijsroute — образовательный маршрут",
    forWhom:
      "Обычно для тех, кто может учиться в нидерландском среднем или профессиональном образовании — чаще 18–27 лет.",
    requirements: [
      "KNM, MAP и PVT — как и в B1-route",
      "Языковой курс совмещён с программой, ведущей к диплому",
      "Завершается признанным дипломом вместо отдельного языкового экзамена",
    ],
  },
  {
    id: "z",
    title: "Z-route — маршрут самостоятельности",
    forWhom:
      "Если B1 недостижим даже при максимальных усилиях — по возрасту, здоровью или уровню образования.",
    requirements: [
      "KNM, MAP и PVT — как и в B1-route",
      "Фиксированного языкового порога нет",
      "Нужно подтвердить «максимальные усилия» на протяжении всего маршрута",
    ],
  },
];

export const routeById = (id: InburgeringRoute): RouteInfo | undefined =>
  ROUTES.find((r) => r.id === id);

/** Три года с начала обязанности — единственная дата, которую мы вычисляем. */
export const obligationDeadlineISO = (startISO: string): string => {
  const d = new Date(startISO);
  d.setFullYear(d.getFullYear() + 3);
  return d.toISOString();
};

export const ADVICE_BOUNDARY =
  "Мы показываем сроки и требования по общедоступным правилам — и ничего сверх этого. По продлениям, исключениям и вашему конкретному делу обращайтесь в муниципалитет, в DUO или к юристу.";
