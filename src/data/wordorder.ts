import type { CefrLevel } from "./cando";

/**
 * Конструктор порядка слов (SPEC §2.3).
 *
 * Четыре структуры, на которых ломается русскоязычный, — и ломается не от
 * незнания, а потому что в русском порядок слов свободный и переставлять
 * ничего не приходится. Поэтому здесь не выбор из вариантов, а сборка:
 * пока фразу не соберёшь руками, перестановка не становится автоматической.
 *
 * Фрагменты хранятся строчными буквами (кроме имён собственных), а заглавная
 * и точка добавляются при показе. Иначе заглавная буква выдавала бы, какой
 * фрагмент идёт первым, и упражнение теряло бы смысл.
 *
 * `accept` — для предложений, где допустимы два порядка. Засчитывать
 * правильный ответ как ошибку нельзя: это тот же принцип, по которому в
 * произношении нет автоматической оценки.
 */

export type StructureId = "v2" | "inversie" | "bijzin" | "tang";

export interface Structure {
  id: StructureId;
  title: string;
  gist: string;
  /** чем отличается от русского — показывается перед раундом */
  contrast: string;
}

export interface WordOrderPuzzle {
  id: string;
  structure: StructureId;
  level: CefrLevel;
  /** фрагменты в ПРАВИЛЬНОМ порядке; вид перемешивает их сам */
  chunks: string[];
  ru: string;
  /** почему именно так — показывается после проверки */
  why: string;
  /** другие допустимые порядки, целиком, строчными и через пробел */
  accept?: string[];
  scenarioId?: string;
}

export const STRUCTURES: Structure[] = [
  {
    id: "v2",
    title: "Глагол вторым",
    gist: "Спрягаемый глагол занимает вторую позицию. Всегда.",
    contrast:
      "В русском порядок свободный: «я иду завтра в гемеенте» можно сказать пятью способами. В нидерландском вторая позиция принадлежит глаголу, и это не стилистика, а грамматика.",
  },
  {
    id: "inversie",
    title: "Инверсия",
    gist: "Начали не с подлежащего — подлежащее уходит за глагол.",
    contrast:
      "«Завтра я иду» переносится буквально и ломается: по-нидерландски получается «завтра иду я». Это самая частая ошибка, и она слышна сразу.",
  },
  {
    id: "bijzin",
    title: "Придаточное",
    gist: "После omdat, dat, of, als глагол уезжает в самый конец.",
    contrast:
      "Русское придаточное строится как главное, поэтому переставлять глагол не приходится вообще. Здесь приходится — и первым делом это разваливается, когда вы волнуетесь.",
  },
  {
    id: "tang",
    title: "Рамка",
    gist: "Два глагола по краям, всё остальное между ними.",
    contrast:
      "Русский ставит глаголы рядом: «должен заплатить пошлину». Нидерландский разводит их по краям предложения, иногда на полстроки.",
  },
];

export const PUZZLES: WordOrderPuzzle[] = [
  // ── Глагол вторым ──
  {
    id: "wo-v2-1",
    structure: "v2",
    level: "A1",
    chunks: ["ik", "heb", "een afspraak", "bij de gemeente"],
    ru: "У меня запись в гемеенте.",
    why: "Подлежащее первым, спрягаемый глагол вторым, дальше дополнение и место.",
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-v2-2",
    structure: "v2",
    level: "A2",
    chunks: ["de monteur", "komt", "dinsdag", "tussen acht en twaalf"],
    ru: "Мастер придёт во вторник между восемью и двенадцатью.",
    why: "Подлежащее может быть длинным — «de monteur» это одна позиция, а не две. Глагол всё равно вторым.",
    scenarioId: "verhuurder-onderhoud",
  },
  {
    id: "wo-v2-3",
    structure: "v2",
    level: "A2",
    chunks: ["wij", "zoeken", "opvang", "vanaf september"],
    ru: "Нам нужно место в саду с сентября.",
    why: "«vanaf» смотрит вперёд: начиная с сентября. «Sinds» означало бы «с сентября и до сих пор».",
    scenarioId: "kinderopvang-plek",
  },
  {
    id: "wo-v2-4",
    structure: "v2",
    level: "A1",
    chunks: ["zij", "spreekt", "nog", "geen Nederlands"],
    ru: "Она пока не говорит по-нидерландски.",
    why: "Перед существительным без артикля отрицание — geen, а не niet. «Nog geen» — «пока не».",
    scenarioId: "school-aanmelding",
  },
  {
    id: "wo-v2-5",
    structure: "v2",
    level: "A2",
    chunks: ["ik", "bel", "over een storing", "in mijn woning"],
    ru: "Я звоню по поводу неисправности в квартире.",
    why: "bellen over — звонить по поводу. Предлог принадлежит глаголу и учится вместе с ним.",
    scenarioId: "verhuurder-onderhoud",
  },

  // ── Инверсия ──
  {
    id: "wo-inv-1",
    structure: "inversie",
    level: "A1",
    chunks: ["morgen", "ga", "ik", "naar de gemeente"],
    ru: "Завтра я иду в гемеенте.",
    why: "Обстоятельство заняло первую позицию, поэтому глагол идёт вторым, а подлежащее вытесняется на третью. Русское «завтра я иду» переносится буквально и ломается.",
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-inv-2",
    structure: "inversie",
    level: "A1",
    chunks: ["hier", "is", "mijn paspoort"],
    ru: "Вот мой паспорт.",
    why: "«Hier» впереди — значит «is» вторым, а не в конце. «Hier mijn paspoort is» звучит как перевод слово в слово.",
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-inv-3",
    structure: "inversie",
    level: "A2",
    chunks: ["gisteren", "heb", "ik", "de rapportage", "afgerond"],
    ru: "Вчера я закончил отчёт.",
    why: "Здесь работают сразу два правила: инверсия после «gisteren» и рамка heb … afgerond.",
    scenarioId: "werkoverleg-collegas",
  },
  {
    id: "wo-inv-4",
    structure: "inversie",
    level: "A2",
    chunks: ["op woensdag", "zijn", "de kinderen", "vrij"],
    ru: "По средам дети свободны.",
    why: "«Op woensdag» — одна позиция, пусть и из двух слов. Подлежащее уходит за глагол.",
    scenarioId: "school-aanmelding",
  },
  {
    id: "wo-inv-5",
    structure: "inversie",
    level: "A1",
    chunks: ["daarom", "bel", "ik", "u"],
    ru: "Поэтому я вам звоню.",
    why: "Daarom, dus, toen, hier — все они забирают первую позицию и вызывают инверсию.",
  },

  // ── Придаточное ──
  {
    id: "wo-bij-1",
    structure: "bijzin",
    level: "A2",
    chunks: ["ik bel", "omdat", "ik", "een probleem", "heb"],
    ru: "Я звоню, потому что у меня проблема.",
    why: "После omdat глагол уходит в самый конец придаточного — за дополнение, за всё.",
    scenarioId: "internet-storing",
  },
  {
    id: "wo-bij-2",
    structure: "bijzin",
    level: "A2",
    chunks: ["zij zegt", "dat", "zij", "morgen", "komt"],
    ru: "Она говорит, что придёт завтра.",
    why: "Dat — подчинительный союз, значит глагол последний. С «want» порядок остался бы обычным.",
  },
  {
    id: "wo-bij-3",
    structure: "bijzin",
    level: "B1",
    chunks: ["ik weet niet", "of", "het", "vandaag", "lukt"],
    ru: "Я не знаю, получится ли это сегодня.",
    why: "Русское «ли» в косвенном вопросе — это of, а не als. И глагол снова в конце.",
  },
  {
    id: "wo-bij-4",
    structure: "bijzin",
    level: "A2",
    chunks: ["ik ga naar de gemeente", "omdat", "ik", "me", "inschrijf"],
    ru: "Я иду в гемеенте, потому что регистрируюсь.",
    why: "В придаточном отделяемый глагол собирается обратно в одно слово: inschrijf, а не «schrijf … in».",
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-bij-5",
    structure: "bijzin",
    level: "B1",
    chunks: ["ik denk", "dat", "ik", "er morgen", "niet", "ben"],
    ru: "Думаю, завтра меня там не будет.",
    why: "«er» здесь — «на месте»: без него получилось бы «меня не существует». И ben в самом конце.",
    scenarioId: "ziekmelding-werk",
  },

  // ── Рамка ──
  {
    id: "wo-tang-1",
    structure: "tang",
    level: "A2",
    chunks: ["ik", "moet", "vandaag", "de leges", "betalen"],
    ru: "Мне нужно сегодня заплатить пошлину.",
    why: "Модальный вторым, инфинитив в самом конце, между ними всё остальное.",
    accept: ["ik moet de leges vandaag betalen"],
    scenarioId: "ind-verblijfsvergunning",
  },
  {
    id: "wo-tang-2",
    structure: "tang",
    level: "A2",
    chunks: ["ik", "heb", "het document", "gisteren", "opgestuurd"],
    ru: "Я вчера отправил документ.",
    why: "Причастие закрывает рамку. У отделяемого глагола ge- оказывается внутри: op-ge-stuurd.",
    accept: ["ik heb gisteren het document opgestuurd"],
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-tang-3",
    structure: "tang",
    level: "A2",
    chunks: ["zij", "kan", "vrijdag", "niet", "komen"],
    ru: "В пятницу она не может прийти.",
    why: "Niet встаёт прямо перед закрывающим инфинитивом, а не там, где стояло бы русское «не».",
  },
  {
    id: "wo-tang-4",
    structure: "tang",
    level: "A1",
    chunks: ["ik", "schrijf", "me", "in", "bij de gemeente"],
    ru: "Я регистрируюсь в гемеенте.",
    why: "Приставка отрывается от корня и уходит вправо. Оба порядка встречаются, но этот — обычный.",
    accept: ["ik schrijf me bij de gemeente in"],
    scenarioId: "gemeente-inschrijving",
  },
  {
    id: "wo-tang-5",
    structure: "tang",
    level: "A1",
    chunks: ["ik", "bel", "u", "morgen", "terug"],
    ru: "Я перезвоню вам завтра.",
    why: "terugbellen разваливается на bel … terug, и приставка встаёт после обстоятельства времени.",
    scenarioId: "verhuurder-onderhoud",
  },
];

export const structureById = (id: string): Structure | undefined =>
  STRUCTURES.find((s) => s.id === id);

export const puzzlesFor = (structure: StructureId | "all"): WordOrderPuzzle[] =>
  structure === "all"
    ? PUZZLES
    : PUZZLES.filter((p) => p.structure === structure);

/** Все допустимые сборки одной задачи. */
export const solutionsOf = (p: WordOrderPuzzle): string[] => [
  p.chunks.join(" "),
  ...(p.accept ?? []),
];

/** Как предложение показывается человеку: с заглавной и точкой. */
export const renderSentence = (words: string[]): string => {
  const s = words.join(" ");
  return s ? s[0].toUpperCase() + s.slice(1) + "." : "";
};
