/**
 * «Разбор» — грамматический ящик по требованию.
 * Не курс (курс — это «Грамматический зал»), а короткие объяснения ровно
 * тех мест, где русский язык подставляет подножку.
 *
 * Здесь только синтаксис и морфология. Произношение живёт в гейтах
 * сценариев: там оно привязано к словам, которые вам вот-вот понадобятся.
 */

export interface GrammarNote {
  id: string;
  title: string;
  /** одной строкой: в чём подножка */
  gist: string;
  /** пары «как скажет русскоязычный» → «как правильно» */
  pairs: { wrong: string; right: string }[];
  /** объяснение по-русски, 2–4 предложения */
  body: string;
  /** позитивный перенос: то, что вы уже умеете */
  positive?: boolean;
  /** куда идти дальше, если объяснения недостаточно */
  link?: { href: string; label: string };
}

export const GRAMMAR_NOTES: GrammarNote[] = [
  {
    id: "de-het",
    title: "de или het: правила нет",
    gist: "Это не объясняется — это заучивается вместе со словом.",
    pairs: [
      { wrong: "de paspoort, de contract", right: "het paspoort, het contract" },
      { wrong: "het afspraak, het gemeente", right: "de afspraak, de gemeente" },
    ],
    body:
      "Здесь не будет правила, потому что рабочего правила не существует: распределение по de и het исторически произвольно, а все «подсказки» вроде «-ing всегда de» покрывают меньше половины случаев и подводят ровно там, где вы на них понадеетесь. Единственный способ, который работает, — никогда не хранить существительное без артикля: в голове, в карточке и на экране слово всегда стоит как «het paspoort», а не «paspoort (het)». Ошибка в артикле, кстати, почти никогда не мешает вас понять — но именно она выдаёт иностранца сильнее всего, поэтому дешевле выучить её один раз вместе со словом.",
    link: { href: "#/articles", label: "Открыть тренажёр de/het" },
  },
  {
    id: "v2",
    title: "Глагол на втором месте — всегда",
    gist: "Начали не с подлежащего — подлежащее уходит ЗА глагол.",
    pairs: [
      { wrong: "Morgen ik ga naar de gemeente.", right: "Morgen ga ik naar de gemeente." },
      { wrong: "Hier mijn paspoort is.", right: "Hier is mijn paspoort." },
      { wrong: "Daarom ik bel u.", right: "Daarom bel ik u." },
    ],
    body:
      "В главном предложении спрягаемый глагол занимает вторую позицию, и это место неприкосновенно. Если первым идёт не подлежащее, а обстоятельство (morgen, hier, daarom, gisteren), то подлежащее вытесняется на третью позицию — это называется инверсией. Русский порядок слов свободный, поэтому «завтра я иду» переносится буквально и звучит сразу неправильно. Практический приём: начиная фразу с обстоятельства, произносите глагол вторым словом почти механически, не задумываясь о смысле.",
  },
  {
    id: "verb-final",
    title: "В придаточном глагол уезжает в конец",
    gist: "После omdat, dat, als, of — глагол последний.",
    pairs: [
      { wrong: "Ik bel omdat ik heb een probleem.", right: "Ik bel omdat ik een probleem heb." },
      { wrong: "Ik weet niet of hij komt morgen.", right: "Ik weet niet of hij morgen komt." },
      { wrong: "Zij zegt dat zij is ziek.", right: "Zij zegt dat zij ziek is." },
    ],
    body:
      "Союзы omdat, dat, of, als, terwijl, hoewel, wanneer переключают предложение в другой порядок: глагол уходит в самый конец, за все дополнения и обстоятельства. Если глаголов два, в конец уезжают оба. В русском придаточное строится точно так же, как главное, поэтому перестановку приходится делать сознательно — и именно она разваливается первой, когда вы волнуетесь. Хорошая новость: список союзов короткий, и его достаточно выучить как список триггеров.",
  },
  {
    id: "bracket",
    title: "Рамка: два глагола по краям",
    gist: "Модальный — вторым, смысловой — в самый конец.",
    pairs: [
      { wrong: "Ik moet betalen de leges vandaag.", right: "Ik moet vandaag de leges betalen." },
      { wrong: "Ik heb gestuurd het document gisteren.", right: "Ik heb het document gisteren gestuurd." },
      { wrong: "Zij kan niet komen op vrijdag.", right: "Zij kan op vrijdag niet komen." },
    ],
    body:
      "Нидерландское предложение держится на рамке (tangconstructie): спрягаемый глагол стоит вторым, а инфинитив или причастие — в самом конце. Всё остальное — дополнения, обстоятельства, отрицание — помещается между ними, иногда на полстроки. Русский ставит глаголы рядом: «должен заплатить пошлину». Приучайте себя произносить фразу так, будто конец уже известен: сначала «ik moet …», потом всё содержимое, и только затем закрывающий глагол.",
  },
  {
    id: "separable",
    title: "Отделяемые глаголы: приставка улетает в конец",
    gist: "inschrijven → ik schrijf me in.",
    pairs: [
      { wrong: "Ik inschrijf me bij de gemeente.", right: "Ik schrijf me in bij de gemeente." },
      { wrong: "een afspraak om me inschrijven", right: "een afspraak om me in te schrijven" },
      { wrong: "Ik heb ingecheckt niet.", right: "Ik heb niet ingecheckt." },
    ],
    body:
      "У глаголов вроде inschrijven, opsturen, aanbellen, uitchecken, meenemen приставка в главном предложении отрывается и уезжает в конец. В инфинитиве с «om … te» частица te встаёт ВНУТРЬ: in te schrijven, op te sturen. В перфекте внутрь вставляется ge-: in-ge-schreven, af-ge-sloten. В придаточном же глагол собирается обратно целиком: «…omdat ik me inschrijf». Русские приставки не отделяются никогда, поэтому это место требует отдельной тренировки, а не понимания — понять его легко, делать автоматически трудно.",
  },
  {
    id: "er",
    title: "«er» — слово, которого нет в русском",
    gist: "Пустое подлежащее, «там», «об этом», счётное «их» и формальное подлежащее — всё это одно короткое er.",
    pairs: [
      { wrong: "Is een monteur beschikbaar?", right: "Is er een monteur beschikbaar?" },
      { wrong: "Wij praten over dat.", right: "Wij praten daarover. / Daar praten wij over." },
      { wrong: "Ik heb drie van hen.", right: "Ik heb er drie." },
      { wrong: "Wordt hard gewerkt.", right: "Er wordt hard gewerkt." },
    ],
    body:
      "У er пять разных работ, и учить их лучше по очереди, а не разом — в «Грамматическом зале» они и разбиты на пять последовательных уроков (er-1 … er-5), каждый открывается после предыдущего. Первая и самая частая: пустое подлежащее при неопределённом предмете — «er is een probleem», «er komt iemand». Вторая: «там» — «ik ben er geweest». Третья: замена неодушевлённого после предлога, причём предлог приклеивается — erover, ermee, ervoor — и часто разрывается надвое: «daar weet ik niets van». Четвёртая: счётное «их» — «ik heb er drie». Пятая: формальное подлежащее в безличных оборотах без названного деятеля — «er wordt gebeld» («звонят»), — которое пропадает, как только первую позицию в предложении занимает что-то другое. В русском ни одной из этих функций отдельного слова не соответствует, поэтому er систематически теряется — а без него фраза звучит оборванной.",
  },
  {
    id: "hebben-zijn",
    title: "hebben или zijn в прошедшем времени",
    gist: "Движение и смена состояния берут zijn, остальное — hebben.",
    pairs: [
      { wrong: "Ik heb verhuisd naar Utrecht.", right: "Ik ben verhuisd naar Utrecht." },
      { wrong: "Zij heeft gebleven thuis.", right: "Zij is thuis gebleven." },
      { wrong: "Ik ben het document gestuurd.", right: "Ik heb het document gestuurd." },
    ],
    body:
      "Перфект строится из вспомогательного глагола и причастия, и вспомогательный приходится выбирать. С zijn идут глаголы перемещения и изменения состояния: gaan, komen, verhuizen, blijven, worden, beginnen, sterven. Всё остальное — с hebben. В русском вспомогательного глагола в прошедшем времени нет вовсе («я переехал» — одно слово), поэтому выбор не подсказывается ничем и его нужно закладывать в память вместе с глаголом. Практический минимум: выучите список на zijn — он короткий, а всё, чего в нём нет, автоматически hebben.",
  },
  {
    id: "niet-geen",
    title: "niet или geen",
    gist: "Перед существительным без артикля — geen. Во всех остальных случаях — niet.",
    pairs: [
      { wrong: "Ik heb niet tijd.", right: "Ik heb geen tijd." },
      { wrong: "Zij spreekt niet Nederlands.", right: "Zij spreekt geen Nederlands." },
      { wrong: "Ik geen begrijp het.", right: "Ik begrijp het niet." },
    ],
    body:
      "Geen отрицает существительное, перед которым стоял бы неопределённый артикль или ничего: geen tijd, geen geld, geen Nederlands, geen kinderen. Niet отрицает всё прочее — глаголы, прилагательные, обстоятельства, а также существительные с определённым артиклем или притяжательным: «ik ken hem niet», «dat is niet mijn contract». Отдельная сложность — место niet в предложении: обычно оно идёт после дополнений и перед закрывающим глаголом. В русском отрицание одно на все случаи и стоит прямо перед отрицаемым словом, так что разводить эти два слова приходится сознательно.",
  },
  {
    id: "prepositions",
    title: "Глагол тянет за собой свой предлог",
    gist: "wachten OP, denken AAN, vragen NAAR — учить целиком.",
    pairs: [
      { wrong: "Ik wacht mijn verblijfsvergunning.", right: "Ik wacht op mijn verblijfsvergunning." },
      { wrong: "Ik bel voor een storing.", right: "Ik bel over een storing." },
      { wrong: "Zij zit in de school.", right: "Zij zit op school." },
    ],
    body:
      "Многие нидерландские глаголы работают только в паре с определённым предлогом, и выбор его логикой не выводится: wachten op, denken aan, vragen naar, zoeken naar, bellen over, zich zorgen maken over, luisteren naar. Русское управление другое, поэтому подставляется буквальный перевод — и фраза перестаёт быть нидерландской. Единственный рабочий способ: заучивать глагол сразу вместе с предлогом, как одно слово — «wachten-op», «denken-aan». Отдельно предлог не запоминается никогда.",
  },
  {
    id: "particles",
    title: "Частицы: even, maar, toch, hoor — это вы уже умеете",
    gist: "Русские «-то», «же», «ну» устроены так же. Новые здесь только слова.",
    pairs: [
      { wrong: "Kom hier.", right: "Kom even hier." },
      { wrong: "Zeg het.", right: "Zeg het maar." },
      { wrong: "Dat kan niet.", right: "Dat kan toch niet?" },
    ],
    body:
      "Even, maar, toch, hoor, nou, gewoon, eens — это модальные частицы: они не переводятся по словарю, а задают тон. Без них нидерландская фраза звучит как приказ или как претензия, хотя грамматически всё верно. Здесь у вас редкое преимущество: русский язык — тоже язык частиц, и сама идея «служебное словечко меняет интонацию всей фразы» вам знакома с детства. Учить нужно не концепцию, а конкретные слова, и лучше всего — целыми фразами из банка ответов: «zeg het maar», «doe maar», «kan het even?», «prima, hoor».",
    positive: true,
  },
  {
    id: "diminutive",
    title: "Уменьшительное -je: тоже знакомая механика",
    gist: "momentje, vraagje, kaartje — не про размер, а про смягчение.",
    pairs: [
      { wrong: "Ik heb een vraag. (у стойки, между делом)", right: "Ik heb een vraagje." },
      { wrong: "Een moment, alstublieft.", right: "Een momentje, alstublieft." },
      { wrong: "de kaartje", right: "het kaartje" },
    ],
    body:
      "Суффикс -je (и его варианты -tje, -pje, -etje) в нидерландском чаще смягчает, чем уменьшает: vraagje — это не «маленький вопрос», а «вопросик, не отниму много времени». Русская уменьшительная система работает ровно так же, поэтому интуиция у вас уже настроена — переносится она почти без потерь. Есть одна механическая деталь, которую стоит запомнить сразу: любое слово с -je становится het-словом, независимо от исходного артикля. De kaart, но het kaartje. De vraag, но het vraagje.",
    positive: true,
  },
  {
    id: "false-friends",
    title: "Ложные друзья",
    gist: "Слова, которые выглядят знакомо и означают другое.",
    pairs: [
      { wrong: "brutaal = брутальный", right: "brutaal = наглый" },
      { wrong: "eventueel = в итоге", right: "eventueel = возможно, при случае" },
      { wrong: "het bureau = бюро, контора", right: "het bureau = письменный стол" },
      { wrong: "de apotheek = аптека, где всё", right: "de apotheek = только по рецепту" },
    ],
    body:
      "Часть ловушек приходит из русского, часть — из английского, на который вы опираетесь. Из частых: slim — умный, а не стройный; de directeur — первое лицо организации, а не начальник отдела; de post — статья в документе, не только почта; het magazijn — склад, а не магазин; raar — странный, а не радостный. Отдельно стоит запомнить, что apotheek выдаёт лекарства по рецепту, а всё остальное — витамины, пластыри, парацетамол — продаётся в drogist. Ошибка стоит потерянного визита, а не только неловкости.",
  },
];

export const grammarById = (id: string): GrammarNote | undefined =>
  GRAMMAR_NOTES.find((n) => n.id === id);
