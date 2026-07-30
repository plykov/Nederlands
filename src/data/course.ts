import type { CefrLevel } from "./cando";

/**
 * «Грамматический зал» — необязательный структурный путь.
 *
 * «Разбор» отвечает на вопрос «почему так?» в момент, когда споткнулись.
 * Здесь другое: последовательность с упражнениями, для тех, кому нужны
 * явные правила. Русскоязычные учащиеся ждут именно этого, а «слабые
 * объяснения грамматики» — из главных причин бросить приложение.
 *
 * Урока про de/het здесь нет и не будет: правила не существует, а
 * притворяться, что оно есть, — прямое нарушение правила 4 в CLAUDE.md.
 * Артикли живут в отдельном тренажёре и заучиваются вместе со словом.
 */

export type Exercise =
  | {
      kind: "choose";
      prompt: string;
      ru: string;
      options: string[];
      answer: number;
      why: string;
    }
  | {
      kind: "fill";
      /** пропуск обозначается символами ___ */
      prompt: string;
      ru: string;
      /** допустимые ответы (сравнение нестрогое) */
      answer: string[];
      why: string;
    };

export interface Lesson {
  id: string;
  level: CefrLevel;
  title: string;
  gist: string;
  /** в чём именно расходится с русским */
  contrast: string;
  rule: string[];
  examples: { nl: string; ru: string }[];
  exercises: Exercise[];
  /**
   * id урока, который нужно пройти на 80%+ раньше. Сейчас держит только
   * ступени «er» (SPEC §2.4): пяти функциям одного слова нужен порядок,
   * а не единый урок разом.
   */
  requires?: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "v2",
    level: "A1",
    title: "Глагол на втором месте",
    gist: "Вторая позиция занята глаголом всегда. Начали с обстоятельства — подлежащее уходит за него.",
    contrast:
      "Русский порядок слов свободный: «завтра я иду», «я иду завтра», «иду я завтра» — всё допустимо. Нидерландский держит глагол на второй позиции жёстко, и любое отклонение слышно сразу.",
    rule: [
      "В главном предложении спрягаемый глагол стоит **на второй позиции**. Не вторым словом, а второй по счёту частью: «De nieuwe buurman **komt** morgen».",
      "Если первым идёт не подлежащее, а обстоятельство, подлежащее уходит **за глагол**. Это инверсия: «Morgen **komt** hij».",
      "Вопрос с вопросительным словом: слово — глагол — подлежащее. «Wanneer **komt** hij?»",
      "Вопрос без вопросительного слова: глагол идёт **первым**. «**Komt** hij morgen?»",
    ],
    examples: [
      { nl: "Ik ga morgen naar de gemeente.", ru: "Завтра я иду в гемеенте." },
      { nl: "Morgen ga ik naar de gemeente.", ru: "Завтра я иду в гемеенте. (то же самое, другой порядок)" },
      { nl: "Wanneer krijg ik mijn BSN?", ru: "Когда я получу BSN?" },
      { nl: "Hier is mijn paspoort.", ru: "Вот мой паспорт." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Morgen ___ ik naar de huisarts.",
        ru: "Завтра я иду к семейному врачу.",
        options: ["ga", "ik ga", "gaan"],
        answer: 0,
        why: "Обстоятельство morgen заняло первую позицию, значит глагол идёт вторым, а подлежащее ik — третьим.",
      },
      {
        kind: "choose",
        prompt: "___ een afspraak?",
        ru: "У вас есть запись?",
        options: ["Heeft u", "U heeft", "U hebben"],
        answer: 0,
        why: "В вопросе без вопросительного слова глагол стоит первым, подлежащее сразу за ним.",
      },
      {
        kind: "fill",
        prompt: "Hier ___ mijn huurcontract.",
        ru: "Вот мой договор аренды.",
        answer: ["is"],
        why: "Hier заняло первую позицию, поэтому вторая достаётся глаголу: hier IS mijn huurcontract.",
      },
      {
        kind: "choose",
        prompt: "Wanneer ___ de monteur?",
        ru: "Когда придёт мастер?",
        options: ["komt", "de monteur komt", "komen"],
        answer: 0,
        why: "Вопросительное слово — глагол — подлежащее. Подлежащее de monteur уже стоит после пропуска.",
      },
      {
        kind: "choose",
        prompt: "Daarom ___ ik u.",
        ru: "Поэтому я вам звоню.",
        options: ["bel", "ik bel", "bellen"],
        answer: 0,
        why: "Daarom — обстоятельство на первой позиции, дальше обычная инверсия: глагол, потом подлежащее.",
      },
    ],
  },
  {
    id: "verb-final",
    level: "A2",
    title: "Придаточное: глагол в конец",
    gist: "После omdat, dat, of, als глагол уезжает в самый конец предложения.",
    contrast:
      "В русском придаточное строится точно так же, как главное: «я звоню, потому что у меня проблема». Переставлять ничего не нужно, поэтому нидерландская перестановка не происходит сама собой — особенно когда вы волнуетесь.",
    rule: [
      "Союзы **omdat, dat, of, als, terwijl, hoewel, wanneer** отправляют глагол **в самый конец** придаточного.",
      "Если глаголов два, в конец уходят **оба**: «…omdat ik het niet **kan vinden**».",
      "**want** и **maar** — не подчинительные союзы: они соединяют два главных предложения, и порядок после них обычный.",
      "Отделяемый глагол в придаточном **собирается обратно**: «…omdat ik me **inschrijf**».",
    ],
    examples: [
      { nl: "Ik bel omdat de verwarming het niet doet.", ru: "Я звоню, потому что не работает отопление." },
      { nl: "Zij zegt dat zij morgen komt.", ru: "Она говорит, что придёт завтра." },
      { nl: "Ik weet niet of het vandaag lukt.", ru: "Я не знаю, получится ли сегодня." },
      { nl: "Ik bel want de verwarming doet het niet.", ru: "Я звоню, ведь отопление не работает." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Ik bel omdat de verwarming het niet ___.",
        ru: "Я звоню, потому что отопление не работает.",
        answer: ["doet"],
        why: "После omdat глагол уходит в самый конец, за отрицание и за все дополнения.",
      },
      {
        kind: "choose",
        prompt: "Ik ga naar de gemeente omdat ik me ___.",
        ru: "Я иду в гемеенте, потому что регистрируюсь.",
        options: ["inschrijf", "schrijf in", "in schrijf"],
        answer: 0,
        why: "В придаточном отделяемый глагол собирается обратно в одно слово и целиком встаёт в конец.",
      },
      {
        kind: "fill",
        prompt: "Zij zegt dat zij morgen niet ___.",
        ru: "Она говорит, что завтра не придёт.",
        answer: ["komt"],
        why: "Dat — подчинительный союз, значит глагол последний: …dat zij morgen niet komt.",
      },
      {
        kind: "choose",
        prompt: "Ik weet niet ___ het vandaag lukt.",
        ru: "Я не знаю, получится ли это сегодня.",
        options: ["of", "als", "dat"],
        answer: 0,
        why: "Русское «ли» в косвенном вопросе — это of. Als значит «если» или «когда», dat — «что».",
      },
      {
        kind: "choose",
        prompt: "Ik bel ___ de verwarming doet het niet.",
        ru: "Я звоню, ведь отопление не работает.",
        options: ["want", "omdat", "dat"],
        answer: 0,
        why: "После want порядок обычный, глагол вторым: doet het niet. С omdat пришлось бы сказать «…omdat de verwarming het niet doet».",
      },
    ],
  },
  {
    id: "separable",
    level: "A1",
    title: "Отделяемые глаголы",
    gist: "inschrijven → ik schrijf me in. Приставка улетает в конец предложения.",
    contrast:
      "Русские приставки не отделяются никогда: «записываюсь» остаётся одним словом в любой позиции. Понять нидерландское правило легко, а делать это автоматически — трудно, поэтому здесь нужна не логика, а тренировка.",
    rule: [
      "В главном предложении приставка **отрывается** и уходит в самый конец: inschrijven → «ik **schrijf** me **in**».",
      "В обороте **om … te** частица te встаёт ВНУТРЬ: «om me **in te** schrijven».",
      "В перфекте внутрь вставляется **ge-**: inschrijven → «**in**ge**schreven**», opsturen → «**op**ge**stuurd**».",
      "После модального глагола и в придаточном глагол стоит **целиком**: «ik moet me **inschrijven**», «…omdat ik me **inschrijf**».",
    ],
    examples: [
      { nl: "Ik schrijf me in bij de gemeente.", ru: "Я регистрируюсь в гемеенте." },
      { nl: "Ik heb een afspraak om me in te schrijven.", ru: "У меня запись на регистрацию." },
      { nl: "Ik heb me vorige week ingeschreven.", ru: "Я зарегистрировался на прошлой неделе." },
      { nl: "Ik moet me nog inschrijven.", ru: "Мне ещё нужно зарегистрироваться." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Ik ___ u morgen terug.",
        ru: "Я перезвоню вам завтра.",
        options: ["bel", "belt", "terugbel"],
        answer: 0,
        why: "Приставка terug уже стоит в конце, значит на второй позиции остаётся голый корень: ik bel … terug.",
      },
      {
        kind: "fill",
        prompt: "Ik heb een afspraak om me in ___ schrijven.",
        ru: "У меня запись на регистрацию.",
        answer: ["te"],
        why: "В обороте om … te частица te уходит ВНУТРЬ отделяемого глагола: in te schrijven.",
      },
      {
        kind: "choose",
        prompt: "Ik heb het formulier gisteren ___.",
        ru: "Я вчера отправил бланк.",
        options: ["opgestuurd", "gestuurd op", "op gestuurd"],
        answer: 0,
        why: "В перфекте ge- вставляется между приставкой и корнем: op-GE-stuurd. Пишется одним словом.",
      },
      {
        kind: "choose",
        prompt: "Sorry, ik ben vergeten in te ___.",
        ru: "Извините, я забыл отметиться.",
        options: ["checken", "inchecken", "gecheckt"],
        answer: 0,
        why: "Приставка in уже вынесена перед te, поэтому дальше идёт голый корень: in te checken.",
      },
      {
        kind: "fill",
        prompt: "Ik moet me nog ___ bij de gemeente.",
        ru: "Мне ещё нужно зарегистрироваться в гемеенте.",
        answer: ["inschrijven"],
        why: "После модального глагола инфинитив стоит целиком и приставка не отделяется.",
      },
    ],
  },
  {
    id: "bracket",
    level: "A2",
    title: "Рамка: два глагола по краям",
    gist: "Спрягаемый глагол вторым, инфинитив или причастие — в самом конце.",
    contrast:
      "Русский ставит глаголы рядом: «должен заплатить пошлину». Нидерландский разводит их по краям предложения, а всё содержимое помещает между ними — иногда на полстроки.",
    rule: [
      "Спрягаемый глагол — **вторым**, инфинитив или причастие — **в самом конце**. Между ними помещается всё остальное.",
      "Это и есть рамка (**tangconstructie**): «Ik **moet** vandaag de leges **betalen**».",
      "В перфекте рамка та же: «Ik **heb** het document gisteren **opgestuurd**».",
      "Отрицание **niet** встаёт прямо перед закрывающим глаголом: «Zij **kan** vrijdag niet **komen**».",
    ],
    examples: [
      { nl: "Ik moet vandaag de leges betalen.", ru: "Мне нужно сегодня заплатить пошлину." },
      { nl: "Ik heb het document gisteren opgestuurd.", ru: "Я вчера отправил документ." },
      { nl: "Zij kan op vrijdag niet komen.", ru: "В пятницу она не может прийти." },
      { nl: "Wij willen een contract afsluiten voor een nieuw adres.", ru: "Мы хотим заключить договор на новый адрес." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Ik moet vandaag de leges ___.",
        ru: "Мне нужно сегодня заплатить пошлину.",
        answer: ["betalen"],
        why: "Инфинитив закрывает рамку и стоит в самом конце, после дополнения и обстоятельства.",
      },
      {
        kind: "choose",
        prompt: "Zij ___ op vrijdag niet komen.",
        ru: "В пятницу она не может прийти.",
        options: ["kan", "kan niet", "komt"],
        answer: 0,
        why: "Модальный kan занимает вторую позицию, komen закрывает рамку, а niet стоит прямо перед ним.",
      },
      {
        kind: "fill",
        prompt: "Ik heb het document gisteren ___.",
        ru: "Я вчера отправил документ.",
        answer: ["opgestuurd"],
        why: "Причастие закрывает рамку. У отделяемого глагола ge- оказывается внутри: op-ge-stuurd.",
      },
      {
        kind: "choose",
        prompt: "Wij ___ een contract afsluiten voor een nieuw adres.",
        ru: "Мы хотим заключить договор на новый адрес.",
        options: ["willen", "willen afsluiten", "afsluiten willen"],
        answer: 0,
        why: "Спрягаемый глагол идёт вторым; afsluiten уже стоит дальше в предложении, дублировать его не нужно.",
      },
      {
        kind: "choose",
        prompt: "Ik kan vandaag ___ komen.",
        ru: "Сегодня я не могу прийти.",
        options: ["niet", "geen", "niets"],
        answer: 0,
        why: "Niet отрицает действие и встаёт прямо перед закрывающим инфинитивом. Geen отрицало бы существительное, а его здесь нет.",
      },
    ],
  },
  {
    id: "er-1-bestaan",
    level: "B1",
    title: "«Er», ступень 1: пустое подлежащее",
    gist: "При неопределённом предмете вначале обязателен пустой er.",
    contrast:
      "В русском подлежащее может быть неопределённым без всякой служебной подпорки: «есть проблема», «придёт мастер». В нидерландском в этом месте обязателен er — его нельзя ни опустить, ни угадать по контексту.",
    rule: [
      "Если подлежащее **неопределённое** — «een probleem», «iemand», «een monteur» — фраза не может начинаться с него напрямую: впереди встаёт пустое **er**. «**Er** is een probleem», «**Er** komt iemand».",
      "Если подлежащее уже **определено** — местоимение, имя, «het», «mijn …» — er не нужен вовсе: «Het probleem is opgelost», не «Er is het probleem opgelost».",
      "Это первая и самая частая из пяти работ er. Следующие ступени открываются по одной — сразу все пять учить не стоит.",
    ],
    examples: [
      { nl: "Er is een probleem met de verwarming.", ru: "С отоплением проблема." },
      { nl: "Er komt morgen een monteur.", ru: "Завтра придёт мастер." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "___ is een probleem met de verwarming.",
        ru: "С отоплением проблема.",
        answer: ["Er", "er"],
        why: "Подлежащее «een probleem» неопределённое, поэтому впереди становится пустое er.",
      },
      {
        kind: "choose",
        prompt: "___ komt morgen een monteur.",
        ru: "Завтра придёт мастер.",
        options: ["Er", "Het", "Daar"],
        answer: 0,
        why: "Тот же случай: подлежащее неопределённое (een monteur), значит нужно er. Het здесь означало бы конкретное «оно».",
      },
      {
        kind: "choose",
        prompt: "Как правильно сказать «Мой паспорт лежит на столе»?",
        ru: "Проверка на противоположный случай: подлежащее уже определено.",
        options: [
          "Mijn paspoort ligt op tafel.",
          "Er ligt mijn paspoort op tafel.",
          "Er is mijn paspoort op tafel.",
        ],
        answer: 0,
        why: "«Mijn paspoort» — определённое подлежащее (есть mijn), поэтому er здесь не ставится вообще.",
      },
    ],
  },
  {
    id: "er-2-plaats",
    level: "B1",
    title: "«Er», ступень 2: место",
    gist: "Er без ударения значит «там», заменяя уже названное место.",
    contrast:
      "Русское «там» — самостоятельное слово с ударением, которое можно поставить куда угодно. Er в этой функции безударно и почти всегда стоит внутри фразы, не в начале — для ударного «там» нидерландский использует другое слово, daar.",
    rule: [
      "**Место**: «Ik ben **er** geweest» — я там был. Er заменяет уже упомянутое место, а не вводит новое.",
      "Если «там» нужно подчеркнуть или поставить в начало фразы, используется **daar**, не er: «**Daar** heb ik nog nooit gewoond» — там я никогда не жил.",
    ],
    examples: [
      { nl: "Ben je weleens in Utrecht geweest? Ja, ik ben er twee keer geweest.", ru: "Ты бывал в Утрехте? Да, я был там дважды." },
      { nl: "Woont uw moeder nog in Rusland? Nee, ze woont er niet meer.", ru: "Ваша мама всё ещё живёт в России? Нет, она там больше не живёт." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Ben je weleens in Utrecht geweest? — Ja, ik ben ___ twee keer geweest.",
        ru: "Ты бывал в Утрехте? — Да, я был там дважды.",
        answer: ["er"],
        why: "Er безударно заменяет уже названное место — Utrecht.",
      },
      {
        kind: "choose",
        prompt: "Woont uw moeder nog in Rusland? — Nee, ze woont ___ niet meer.",
        ru: "Ваша мама всё ещё живёт в России? — Нет, она там больше не живёт.",
        options: ["er", "daar", "het"],
        answer: 0,
        why: "Внутри фразы, без ударения на «там» — нужен er, а не daar.",
      },
      {
        kind: "choose",
        prompt: "___ heb ik nog nooit gewoond.",
        ru: "Там я никогда не жил.",
        options: ["Daar", "Er", "Het"],
        answer: 0,
        why: "«Там» вынесено в начало и подчёркнуто — здесь нужен ударный daar, а не безударный er.",
      },
    ],
    requires: "er-1-bestaan",
  },
  {
    id: "er-3-voornaamwoord",
    level: "B1",
    title: "«Er», ступень 3: er + предлог",
    gist: "Неодушевлённое после предлога заменяется на er/daar, а предлог приклеивается сзади.",
    contrast:
      "В русском предлог и местоимение остаются раздельными: «об этом», «с этим». В нидерландском для неодушевлённых предметов местоимение сливается с предлогом в одно слово, и порядок обратный: предлог оказывается ПОСЛЕ er/daar — daarover, ermee, ervoor.",
    rule: [
      "**После предлога** неодушевлённое заменяется на er/daar, а предлог **приклеивается сзади**: over dat → **daarover**, met het → **ermee**.",
      "Одушевлённое (люди) остаётся с обычным предлогом впереди: «met hem», «over haar» — эта замена работает только для вещей.",
      "Приклеенный предлог часто **отрывается**, особенно в вопросах и в начале фразы: «**Waar** denk je **aan**?», «**Daar** weet ik niets **van**».",
    ],
    examples: [
      { nl: "Wij praten daarover.", ru: "Мы об этом говорим." },
      { nl: "Ik ben het ermee eens.", ru: "Я с этим согласен." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Wij praten ___.",
        ru: "Мы об этом говорим.",
        options: ["daarover", "over dat", "over het"],
        answer: 0,
        why: "Неодушевлённое после предлога заменяется на daar или er, а предлог приклеивается сзади: daarover, ermee, ervoor.",
      },
      {
        kind: "choose",
        prompt: "Ik ben het ___ eens.",
        ru: "Я с этим согласен.",
        options: ["ermee", "met het", "met dat"],
        answer: 0,
        why: "«Het» здесь неодушевлённое (обстоятельство разговора), значит нужно слитное ermee, а не met het.",
      },
      {
        kind: "choose",
        prompt: "___ weet ik niets van.",
        ru: "Об этом я ничего не знаю.",
        options: ["Daar", "Dat", "Er"],
        answer: 0,
        why: "Приклеенный предлог оторвался: daarvan → daar … van. В начале предложения в этой конструкции стоит именно daar.",
      },
    ],
    requires: "er-2-plaats",
  },
  {
    id: "er-4-hoeveelheid",
    level: "B1",
    title: "«Er», ступень 4: счётное «их»",
    gist: "При числе или количестве без существительного нужен er — «их» без него не собирается.",
    contrast:
      "В русском счётное «их» можно опустить: «Сколько у вас детей? — Двое». По-нидерландски пропуск невозможен — фраза без er звучит оборванной, как будто не закончена.",
    rule: [
      "**Счётное**: «Hoeveel heeft u? — Ik heb **er** twee». Без er фраза не собирается, даже если число уже названо.",
      "Работает и без явного числа, при словах вроде «genoeg», «veel», «weinig»: «Heb je genoeg? — Ja, ik heb **er** genoeg.»",
    ],
    examples: [
      { nl: "Heeft u kinderen? — Ik heb er twee.", ru: "У вас есть дети? — У меня их двое." },
      { nl: "Hoeveel documenten heeft u? — Ik heb er twee.", ru: "Сколько у вас документов? — У меня их два." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Hoeveel documenten heeft u? — Ik heb ___ twee.",
        ru: "Сколько у вас документов? — У меня их два.",
        answer: ["er"],
        why: "Счётное «их» — это er. По-русски его можно опустить, по-нидерландски нельзя.",
      },
      {
        kind: "choose",
        prompt: "Heeft u kinderen? — Ja, ik heb ___ twee.",
        ru: "У вас есть дети? — Да, у меня их двое.",
        options: ["er", "ze", "het"],
        answer: 0,
        why: "Перед числом без существительного нужен именно er, а не ze или het.",
      },
      {
        kind: "choose",
        prompt: "Heb je genoeg geld bij je? — Ja, ik heb ___ genoeg.",
        ru: "У тебя достаточно денег с собой? — Да, у меня достаточно.",
        options: ["er", "het", "dat"],
        answer: 0,
        why: "То же счётное er работает и без числа — перед «genoeg», «veel», «weinig».",
      },
    ],
    requires: "er-3-voornaamwoord",
  },
  {
    id: "er-5-onderwerp",
    level: "B1",
    title: "«Er», ступень 5: формальное подлежащее",
    gist: "В безличных оборотах без реального деятеля роль подлежащего берёт er.",
    contrast:
      "В русском безличные обороты обходятся без всякого подлежащего: «работают», «звонят». В нидерландском предложение не может остаться совсем без подлежащего — эту роль берёт формальный er, который исчезает, как только первую позицию занимает что-то другое.",
    rule: [
      "В безличных пассивных и некоторых непереходных оборотах без названного деятеля формальным подлежащим служит **er**: «**Er** wordt hard gewerkt» — работают усердно, никто конкретно не назван.",
      "Er исчезает, если первую позицию занимает что-то другое — обстоятельство места или времени: «**Vanavond** wordt gedanst» — er пропадает, а не остаётся внутри фразы.",
    ],
    examples: [
      { nl: "Er wordt vanavond gedanst.", ru: "Сегодня вечером будут танцевать." },
      { nl: "Er wordt gebeld.", ru: "Звонят (в дверь)." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "___ wordt gebeld.",
        ru: "Звонят (в дверь).",
        answer: ["Er", "er"],
        why: "Деятель не назван, первая позиция свободна — формальным подлежащим становится er.",
      },
      {
        kind: "choose",
        prompt: "Vanavond ___ gedanst.",
        ru: "Сегодня вечером будут танцевать.",
        options: ["wordt", "wordt er", "er wordt"],
        answer: 0,
        why: "Первую позицию уже занял «vanavond», поэтому формальный er пропадает — он нужен только когда позиция иначе осталась бы пустой.",
      },
      {
        kind: "choose",
        prompt: "___ wordt hard gewerkt.",
        ru: "Работают усердно.",
        options: ["Er", "Het", "Daar"],
        answer: 0,
        why: "Пятая и последняя работа er: формальное подлежащее там, где реального деятеля не называют вовсе.",
      },
    ],
    requires: "er-4-hoeveelheid",
  },
  {
    id: "perfectum",
    level: "A2",
    title: "Перфект: hebben или zijn",
    gist: "Перемещение и смена состояния берут zijn, всё остальное — hebben.",
    contrast:
      "В русском прошедшем времени вспомогательного глагола нет вовсе: «я переехал» — одно слово. Поэтому выбор между hebben и zijn ничем не подсказывается и его нужно закладывать в память вместе с глаголом.",
    rule: [
      "Перфект = **hebben** или **zijn** + причастие.",
      "С **zijn** идут глаголы перемещения и смены состояния: gaan, komen, blijven, worden, verhuizen, beginnen, gebeuren, sterven.",
      "Всё остальное — с **hebben**: doen, maken, sturen, betalen, zien, werken.",
      "Причастие: **ge- + корень + -d или -t**. Выбор по правилу **'t kofschip** — если корень кончается на t, k, f, s, ch или p, то -t: gewerkt, gemaakt. Иначе -d: gestuurd, gebeld.",
      "У глаголов с приставками be-, ver-, ont-, ge-, her- приставка **ge- не добавляется**: betaald, verhuisd, begrepen.",
    ],
    examples: [
      { nl: "Ik ben vorige maand verhuisd.", ru: "Я переехал в прошлом месяце." },
      { nl: "Ik heb het document opgestuurd.", ru: "Я отправил документ." },
      { nl: "Zij is thuis gebleven.", ru: "Она осталась дома." },
      { nl: "Wij hebben de leges betaald.", ru: "Мы заплатили пошлину." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Ik ___ vorige maand verhuisd.",
        ru: "Я переехал в прошлом месяце.",
        options: ["ben", "heb", "was"],
        answer: 0,
        why: "Verhuizen — перемещение и смена состояния, поэтому вспомогательный глагол zijn.",
      },
      {
        kind: "choose",
        prompt: "Ik ___ het document gisteren opgestuurd.",
        ru: "Я вчера отправил документ.",
        options: ["heb", "ben", "was"],
        answer: 0,
        why: "Opsturen — обычное действие с дополнением, поэтому hebben.",
      },
      {
        kind: "fill",
        prompt: "Zij ___ thuis gebleven.",
        ru: "Она осталась дома.",
        answer: ["is"],
        why: "Blijven входит в список глаголов на zijn, хотя перемещения тут как раз нет. Этот глагол приходится просто запомнить.",
      },
      {
        kind: "choose",
        prompt: "Wij hebben de leges ___.",
        ru: "Мы заплатили пошлину.",
        options: ["betaald", "gebetaald", "betaalt"],
        answer: 0,
        why: "У глаголов на be-, ver-, ont-, ge-, her- причастие обходится без ge-: betaald, а не gebetaald.",
      },
      {
        kind: "choose",
        prompt: "Ik heb twee uur ___.",
        ru: "Я работал два часа.",
        options: ["gewerkt", "gewerkd", "werkte"],
        answer: 0,
        why: "Корень werk кончается на k, а k есть в 't kofschip — значит окончание -t: gewerkt.",
      },
    ],
  },
  {
    id: "niet-geen",
    level: "A1",
    title: "niet или geen",
    gist: "Перед существительным без артикля — geen. Во всех остальных случаях — niet.",
    contrast:
      "В русском отрицание одно на все случаи и стоит прямо перед отрицаемым словом. Здесь их два, и выбор зависит от того, что именно вы отрицаете.",
    rule: [
      "**geen** — перед существительным, у которого стоял бы неопределённый артикль или ничего: geen tijd, geen geld, geen Nederlands, geen kinderen.",
      "**niet** — во всех остальных случаях: глаголы, прилагательные, обстоятельства.",
      "Существительное с **определённым артиклем или притяжательным** тоже берёт niet: «Dat is **niet** mijn contract».",
      "Место niet: **после** дополнений и **перед** закрывающим глаголом или прилагательным.",
    ],
    examples: [
      { nl: "Ik heb geen tijd.", ru: "У меня нет времени." },
      { nl: "Zij spreekt geen Nederlands.", ru: "Она не говорит по-нидерландски." },
      { nl: "Ik begrijp het niet.", ru: "Я этого не понимаю." },
      { nl: "Dat is niet mijn contract.", ru: "Это не мой договор." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Ik heb ___ tijd.",
        ru: "У меня нет времени.",
        options: ["geen", "niet", "niets"],
        answer: 0,
        why: "Перед существительным без артикля отрицание — geen.",
      },
      {
        kind: "choose",
        prompt: "Zij spreekt ___ Nederlands.",
        ru: "Она не говорит по-нидерландски.",
        options: ["geen", "niet", "niet een"],
        answer: 0,
        why: "Название языка ведёт себя как существительное без артикля, поэтому geen.",
      },
      {
        kind: "fill",
        prompt: "Ik begrijp het ___.",
        ru: "Я этого не понимаю.",
        answer: ["niet"],
        why: "Het — определённое местоимение, значит niet. И оно встаёт после дополнения, в конец.",
      },
      {
        kind: "choose",
        prompt: "Dat is ___ mijn contract.",
        ru: "Это не мой договор.",
        options: ["niet", "geen", "geen een"],
        answer: 0,
        why: "Перед притяжательным местоимением ставится niet: geen с mijn не сочетается.",
      },
      {
        kind: "choose",
        prompt: "Er is ___ monteur beschikbaar.",
        ru: "Свободного мастера нет.",
        options: ["geen", "niet", "niet de"],
        answer: 0,
        why: "«Een monteur» с отрицанием превращается в «geen monteur» — een и niet сливаются в geen.",
      },
    ],
  },
  {
    id: "diminutief",
    level: "A1",
    title: "Уменьшительное -je",
    gist: "Чаще смягчает, чем уменьшает. И всегда делает слово het-словом.",
    contrast:
      "Русская уменьшительная система устроена так же — «вопросик», «минутка», — поэтому интуиция у вас уже настроена и переносится почти без потерь. Новыми здесь будут только формы и одно механическое правило про артикль.",
    rule: [
      "Суффикс **-je** чаще смягчает, чем уменьшает: «een vraagje» — это не «маленький вопрос», а «вопросик, я быстро».",
      "Любое слово с -je становится **het**-словом. De kaart → **het** kaartje. De vraag → **het** vraagje.",
      "Варианты по звучанию: **-tje** после гласной и после l, n, r (kaartje, autootje); **-pje** после m (boompje); **-etje** после короткого гласного с l, m, n, ng, r, причём согласная удваивается (bel → belletje).",
      "Некоторые слова живут почти только в уменьшительной форме: **een biertje**, **een tientje**, **een toetje**.",
    ],
    examples: [
      { nl: "Heeft u een momentje?", ru: "У вас есть минутка?" },
      { nl: "Ik heb een vraagje over mijn loonstrook.", ru: "У меня вопросик по расчётному листку." },
      { nl: "Doe maar een biertje.", ru: "Мне пиво, пожалуйста." },
      { nl: "Het kaartje kost drie euro.", ru: "Билет стоит три евро." },
    ],
    exercises: [
      {
        kind: "choose",
        prompt: "Heeft u een ___?",
        ru: "У вас есть минутка?",
        options: ["momentje", "moment", "momenten"],
        answer: 0,
        why: "У стойки просят именно «momentje»: уменьшительное здесь смягчает просьбу, а не говорит о длительности.",
      },
      {
        kind: "choose",
        prompt: "___ kaartje kost drie euro.",
        ru: "Билет стоит три евро.",
        options: ["Het", "De", "Een de"],
        answer: 0,
        why: "Любое слово на -je становится het-словом, даже если исходное было de: de kaart → het kaartje.",
      },
      {
        kind: "fill",
        prompt: "Ik heb een vraag___ over mijn loonstrook.",
        ru: "У меня вопросик по расчётному листку.",
        answer: ["je"],
        why: "Vraag + je = vraagje. После обычной согласной ставится простое -je.",
      },
      {
        kind: "choose",
        prompt: "Doe maar een ___.",
        ru: "Мне пиво, пожалуйста.",
        options: ["biertje", "bier", "bieren"],
        answer: 0,
        why: "В баре заказывают «een biertje». Форма без уменьшительного звучит непривычно и слишком буквально.",
      },
      {
        kind: "choose",
        prompt: "De bel is kapot. Het ___ doet het niet.",
        ru: "Звонок сломан. Звоночек не работает.",
        options: ["belletje", "beltje", "belje"],
        answer: 0,
        why: "После короткого гласного с l, m, n, ng, r ставится -etje, а согласная удваивается: bel → belletje.",
      },
    ],
  },
];

export const lessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id);

export function matchesAnswer(input: string, accepted: string[]): boolean {
  const norm = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/\s+/g, " ");
  return accepted.some((a) => norm(a) === norm(input));
}
