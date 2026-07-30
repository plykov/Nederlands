import type { Domain, Scenario } from "../types";

/**
 * Домены — из `_SCHEMA.md`, шесть штук.
 *
 * Объём v1: по два сценария на домен. `BUILD_PLAN.md` M12 ставит целью
 * 30–40 сценариев — это отдельная работа по наполнению, а не часть каркаса.
 */
export const DOMAINS: Domain[] = [
  { id: "bureaucratie", title: "Бюрократия", icon: "🏛️" },
  { id: "gezondheid", title: "Здоровье", icon: "🩺" },
  { id: "school", title: "Дети и школа", icon: "🎒" },
  { id: "wonen", title: "Жильё", icon: "🏠" },
  { id: "werk", title: "Работа и деньги", icon: "💶" },
  { id: "dagelijks", title: "Повседневное", icon: "🛒" },
];

export const SCENARIOS: Scenario[] = [
  // ───────────────────────── БЮРОКРАТИЯ ─────────────────────────
  {
    id: "gemeente-inschrijving",
    domain: "bureaucratie",
    level: "A1",
    title: "Регистрация в гемеенте (BRP)",
    context: "Приём по записи в gemeente: первичная регистрация по адресу",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Вас вызовут по фамилии — произнесут её неузнаваемо. Ловите звук и номер, а не правильную форму.",
      "Попросят паспорт и договор аренды. Документы принимают молча, но говорят при этом быстро.",
      "Спросят, живёте ли вы по этому адресу и есть ли разрешение основного жильца.",
      "Могут сказать, что документа не хватает или что он должен быть переведён и легализован.",
      "В конце скажут, когда придёт BSN. Это главное, что нужно унести с собой — переспросите.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik heb een afspraak om me in te schrijven.",
        ru: "Добрый день, у меня запись на регистрацию.",
        note: "«inschrijven» — отделяемый глагол. В обороте «om … te» частица te встаёт внутрь: om me in te schrijven.",
      },
      {
        nl: "Hier is mijn paspoort en mijn huurcontract.",
        ru: "Вот мой паспорт и договор аренды.",
        note: "Инверсия: обстоятельство впереди — глагол вторым. «Hier IS mijn paspoort», не «Hier mijn paspoort is».",
      },
      {
        nl: "Ja, ik woon op dit adres. Ik heb toestemming van de hoofdbewoner.",
        ru: "Да, я живу по этому адресу. У меня есть разрешение основного жильца.",
        note: "het adres, de hoofdbewoner, de toestemming — учите с артиклем.",
      },
      {
        nl: "Sorry, dat ging te snel. Kunt u dat langzamer herhalen?",
        ru: "Извините, это было слишком быстро. Можете повторить медленнее?",
        note: "Ключевая фраза. Произносите её быстро и уверенно — иначе перейдут на английский.",
      },
      {
        nl: "Dus ik moet nog een document opsturen. Klopt dat?",
        ru: "То есть мне нужно ещё отправить документ. Верно?",
        note: "Проверка понимания вслух. «opsturen» — снова отделяемый глагол.",
      },
      {
        nl: "Wanneer krijg ik mijn BSN?",
        ru: "Когда я получу BSN?",
        note: "Есть вопросительное слово — значит глагол сразу за ним, а подлежащее третьим.",
      },
    ],
    replyBank: [
      { nl: "Heeft u een afspraak?", ru: "У вас есть запись?", key: "afspraak", register: "neutraal" },
      { nl: "Mag ik uw identiteitsbewijs zien?", ru: "Можно ваш документ, удостоверяющий личность?", key: "identiteitsbewijs", register: "formeel" },
      { nl: "Neemt u plaats in de wachtruimte, u wordt zo geroepen.", ru: "Присядьте в зале ожидания, вас скоро вызовут.", key: "neemt u plaats", register: "formeel" },
      { nl: "Woont u op dit adres? Heeft u toestemming van de hoofdbewoner?", ru: "Вы живёте по этому адресу? Есть разрешение основного жильца?", key: "hoofdbewoner", register: "neutraal" },
      { nl: "Dit document moet vertaald en gelegaliseerd zijn.", ru: "Этот документ должен быть переведён и легализован.", key: "gelegaliseerd", register: "formeel" },
      { nl: "U krijgt uw BSN binnen twee weken per post.", ru: "Вы получите BSN в течение двух недель по почте.", key: "binnen twee weken", register: "neutraal" },
      { nl: "Dat kan ik hier niet regelen, daarvoor moet u bij de IND zijn.", ru: "Это я здесь не решаю, для этого вам нужно в IND.", key: "dat kan ik niet regelen", register: "neutraal" },
      { nl: "Kunt u dat even spellen?", ru: "Продиктуйте это по буквам?", key: "spellen", register: "informeel" },
      { nl: "Klopt dit adres nog? Anders moet u een verhuizing doorgeven.", ru: "Этот адрес актуален? Иначе нужно подать о переезде.", key: "doorgeven", register: "neutraal" },
      { nl: "Shall I speak English?", ru: "Мне говорить по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "klopt", "spellen"],
    traps: [
      {
        wrong: "Ik heb een afspraak om me inschrijven.",
        right: "Ik heb een afspraak om me in te schrijven.",
        why: "У отделяемых глаголов частица te встаёт МЕЖДУ приставкой и корнем: in-te-schrijven, op-te-sturen. В русском такой частицы нет вообще, поэтому её просто теряют.",
      },
      {
        wrong: "Hier mijn paspoort is.",
        right: "Hier is mijn paspoort.",
        why: "Если предложение начинается не с подлежащего, глагол всё равно остаётся на втором месте, а подлежащее уходит за него. Русский порядок слов свободный — нидерландский нет.",
      },
      {
        wrong: "de paspoort, de huurcontract",
        right: "het paspoort, het huurcontract",
        why: "Артикль — часть слова, правила нет и не будет. Заучивайте целиком: het paspoort, het huurcontract, het adres — но de gemeente, de afspraak, de toestemming.",
      },
    ],
    gate: [
      {
        word: "inschrijven",
        focus: "sch = s + харде G",
        tip: "ин-СХРЭЙ-вен. Не «ш»: сначала чистое s, потом хриплый G. Дальше ij — дифтонг «эй».",
      },
      {
        word: "huurcontract",
        focus: "uu = /yː/",
        tip: "ХЮ:Р-кон-тракт. Губы как для «у», язык как для «и». В русском такого звука нет — без него слово не узнают.",
      },
      {
        word: "gemeente",
        focus: "харде G + долгое ee",
        tip: "хə-МЕ:Н-тə. Начальный G хриплый, не «г». Конечное -e — безударный шва, почти проглатывается.",
      },
    ],
  },
  {
    id: "ind-verblijfsvergunning",
    domain: "bureaucratie",
    level: "A2",
    title: "IND: продление вида на жительство",
    context: "Приём в IND по записи: продление или замена карточки",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "На входе проверят запись и документ. Без записи в IND не принимают — это не формальность.",
      "Спросят цель визита: продление, замена карточки, изменение статуса.",
      "Снимут биометрию: попросят приложить пальцы и смотреть прямо в камеру, не улыбаясь.",
      "Скажут срок рассмотрения и как придёт решение. Ради этого вы и пришли — переспросите обязательно.",
      "По существу вашего дела здесь не консультируют: сотрудник за окном отвечает только за процедуру.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik heb een afspraak voor de verlenging van mijn verblijfsvergunning.",
        ru: "Добрый день, у меня запись на продление вида на жительство.",
        note: "de verlenging, de verblijfsvergunning. Длинное составное слово произносится одним куском, ударение на первой части.",
      },
      {
        nl: "Hier is mijn afspraakbevestiging en mijn verblijfsdocument.",
        ru: "Вот подтверждение записи и моя карточка ВНЖ.",
      },
      {
        nl: "Mijn situatie is niet veranderd. Ik werk nog bij dezelfde werkgever.",
        ru: "Моя ситуация не изменилась. Я по-прежнему работаю у того же работодателя.",
        note: "«nog» здесь — «по-прежнему», а не «ещё не». Одна частица меняет смысл фразы целиком.",
      },
      {
        nl: "Sorry, dat ging te snel. Kunt u dat langzamer herhalen?",
        ru: "Извините, слишком быстро. Можете повторить медленнее?",
      },
      {
        nl: "Hoe lang duurt de behandeling van mijn aanvraag?",
        ru: "Сколько времени занимает рассмотрение заявления?",
        note: "Вопросительное слово впереди, глагол сразу за ним: hoe lang DUURT de behandeling.",
      },
      {
        nl: "Dus ik krijg bericht per post en ik hoef niet te bellen. Klopt dat?",
        ru: "То есть мне придёт письмо и звонить не нужно. Верно?",
        note: "«hoeven niet te» = «не нужно». «Moeten niet» означало бы «нельзя» — русское «не должен» покрывает оба смысла, нидерландский их различает.",
      },
    ],
    replyBank: [
      { nl: "Heeft u een afspraak? Zonder afspraak kunnen wij u niet helpen.", ru: "У вас есть запись? Без записи мы не принимаем.", key: "zonder afspraak", register: "formeel" },
      { nl: "Mag ik uw verblijfsdocument en uw paspoort zien?", ru: "Можно вашу карточку ВНЖ и паспорт?", key: "verblijfsdocument", register: "formeel" },
      { nl: "Neemt u plaats, u wordt zo geroepen.", ru: "Присаживайтесь, вас скоро вызовут.", key: "neemt u plaats", register: "formeel" },
      { nl: "Wilt u hier uw vingerafdrukken plaatsen? Vier vingers, dan de duim.", ru: "Приложите сюда пальцы? Четыре пальца, потом большой.", key: "vingerafdrukken", register: "neutraal" },
      { nl: "Kijkt u recht in de camera, niet lachen alstublieft.", ru: "Смотрите прямо в камеру, не улыбайтесь, пожалуйста.", key: "recht in de camera", register: "formeel" },
      { nl: "De behandeltermijn is negentig dagen, maar meestal gaat het sneller.", ru: "Срок рассмотрения — девяносто дней, но обычно быстрее.", key: "behandeltermijn", register: "formeel" },
      { nl: "U ontvangt bericht per post op het adres dat bij ons bekend is.", ru: "Вы получите письмо по адресу, который у нас записан.", key: "bericht per post", register: "formeel" },
      { nl: "Is uw adres nog hetzelfde? Wijzigingen moet u zelf doorgeven.", ru: "Адрес прежний? Об изменениях нужно сообщать самому.", key: "doorgeven", register: "neutraal" },
      { nl: "Daar ga ik niet over, daarvoor moet u bij de gemeente zijn.", ru: "Это не ко мне, с этим — в гемеенте.", key: "daar ga ik niet over", register: "neutraal" },
      { nl: "De leges heeft u al betaald? Anders kan ik de aanvraag niet in behandeling nemen.", ru: "Пошлину вы уже оплатили? Иначе я не могу принять заявление.", key: "de leges", register: "formeel" },
      { nl: "Would you prefer to continue in English?", ru: "Может, продолжим по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "klopt", "cijfers"],
    traps: [
      {
        wrong: "Ik moet betalen de leges.",
        right: "Ik moet de leges betalen.",
        why: "Модальный глагол забирает второе место, а смысловой уходит в самый конец. Всё остальное — между ними. Русское «должен заплатить пошлину» ставит глаголы рядом; здесь их разводят по краям.",
      },
      {
        wrong: "Ik moet niet bellen. (в значении «мне не нужно звонить»)",
        right: "Ik hoef niet te bellen.",
        why: "«Не нужно» — это hoeven niet te. «Moeten niet» значит «нельзя». Русское «мне не надо звонить» переводится по-разному в зависимости от того, что вы имеете в виду.",
      },
      {
        wrong: "Ik wacht mijn verblijfsvergunning.",
        right: "Ik wacht op mijn verblijfsvergunning.",
        why: "Глагол тянет за собой свой предлог: wachten op, vragen naar, zoeken naar, denken aan. Учите глагол сразу с предлогом — отдельно он не запомнится.",
      },
    ],
    gate: [
      {
        word: "verblijfsvergunning",
        focus: "ij = «эй», ударение на -BLIJFS-",
        tip: "фер-БЛЭЙФС-фер-хю-нинг. Главное — не сказать «ий»: ij и ei звучат одинаково, как «эй».",
      },
      {
        word: "vingerafdrukken",
        focus: "v глуше русского «в»",
        tip: "ФИН-хер-аф-дрю-кен. Нидерландское v ближе к «ф», чем к «в». Ударение на первый слог.",
      },
      {
        word: "uw",
        focus: "/yː/ + w",
        tip: "Ю:в, с округлёнными губами. Звучит в каждой второй фразе чиновника — если он звучит как «у», вас переспросят.",
      },
    ],
  },

  // ───────────────────────── ЗДОРОВЬЕ ─────────────────────────
  {
    id: "huisarts-inschrijving",
    domain: "gezondheid",
    level: "A1",
    title: "Семейный врач: регистрация и жалоба",
    context: "Первый визит в практику huisarts: записаться пациентом",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Сначала — стойка ассистента. Она решает, нужен ли вам приём вообще: так устроена система, это не отказ.",
      "Спросят BSN, страховку и адрес — практика берёт пациентов только своего района.",
      "Спросят, на что жалуетесь. Отвечайте коротко: длинного рассказа здесь не ждут.",
      "Приём могут дать не сегодня, а через несколько дней. Время назовут по-нидерландски — это отдельная ловушка.",
      "Не рассчитывайте на рецепт с первого раза: обычный ответ — «понаблюдаем».",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik wil me graag inschrijven als patiënt.",
        ru: "Добрый день, я хотел бы записаться пациентом.",
        note: "«graag» смягчает просьбу — без него фраза звучит как требование.",
      },
      {
        nl: "Ik woon hier in de buurt. Dit is mijn BSN en mijn zorgverzekering.",
        ru: "Я живу в этом районе. Вот мой BSN и страховка.",
        note: "de buurt, de zorgverzekering, het BSN.",
      },
      {
        nl: "Ik heb al een week keelpijn en koorts.",
        ru: "У меня уже неделю болит горло и температура.",
        note: "Обстоятельство времени идёт перед дополнением: al een week keelpijn.",
      },
      {
        nl: "Sorry, kunt u dat langzamer herhalen?",
        ru: "Извините, можете повторить медленнее?",
      },
      {
        nl: "Wanneer kan ik langskomen?",
        ru: "Когда я могу прийти?",
        note: "При модальном глаголе смысловой уходит в конец целиком, приставка не отделяется: kan ik langskomen.",
      },
      {
        nl: "Dus vrijdag om half elf. Klopt dat?",
        ru: "То есть в пятницу в половине одиннадцатого. Верно?",
        note: "Осторожно: half elf — это 10:30, а не 11:30. Проверяйте время всегда.",
      },
    ],
    replyBank: [
      { nl: "Bent u al ingeschreven bij ons?", ru: "Вы у нас уже зарегистрированы?", key: "ingeschreven", register: "neutraal" },
      { nl: "Woont u in dit postcodegebied? Anders kunnen wij u niet aannemen.", ru: "Вы живёте в этом почтовом районе? Иначе мы вас не примем.", key: "postcodegebied", register: "formeel" },
      { nl: "Heeft u uw BSN en uw verzekeringspas bij u?", ru: "У вас с собой BSN и страховая карта?", key: "verzekeringspas", register: "neutraal" },
      { nl: "Waar kan ik u mee helpen? Vertelt u het maar kort.", ru: "Чем могу помочь? Расскажите коротко.", key: "kort", register: "neutraal" },
      { nl: "Hoe lang heeft u die klachten al?", ru: "Как давно у вас эти жалобы?", key: "klachten", register: "neutraal" },
      { nl: "Heeft u koorts gemeten? Hoeveel graden?", ru: "Вы мерили температуру? Сколько градусов?", key: "koorts", register: "neutraal" },
      { nl: "Ik zet u erbij voor vrijdag, om half elf.", ru: "Записываю вас на пятницу, на половину одиннадцатого.", key: "half elf", register: "informeel" },
      { nl: "De dokter belt u vanmiddag tussen twee en vier terug.", ru: "Врач перезвонит вам сегодня между двумя и четырьмя.", key: "terugbellen", register: "neutraal" },
      { nl: "Eerst even aankijken. Als het niet overgaat, belt u opnieuw.", ru: "Пока понаблюдаем. Если не пройдёт — позвоните ещё раз.", key: "aankijken", register: "informeel" },
      { nl: "Bij spoed belt u 112, anders de huisartsenpost.", ru: "При экстренном случае звоните 112, иначе — в дежурную практику.", key: "huisartsenpost", register: "formeel" },
      { nl: "I can explain it in English if that is easier?", ru: "Могу объяснить по-английски, если так проще?", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "klopt", "opschrijven"],
    traps: [
      {
        wrong: "half elf = половина двенадцатого",
        right: "half elf = 10:30",
        why: "Нидерландское half elf — это половина ДО одиннадцати, то есть 10:30. Русская «половина одиннадцатого» совпадает, а вот «полдвенадцатого» — это уже half twaalf. Ошибка здесь стоит пропущенного приёма: всегда переспрашивайте цифрами.",
      },
      {
        wrong: "Ik bel omdat ik heb keelpijn.",
        right: "Ik bel omdat ik keelpijn heb.",
        why: "В придаточном (omdat, dat, als, of, terwijl) глагол уходит в самый конец. Это первое, что ломается: в русском придаточное строится так же, как главное, и переносить глагол не приходится.",
      },
      {
        wrong: "de ziekenhuis, het koorts",
        right: "het ziekenhuis, de koorts",
        why: "Артикль запоминается только вместе со словом. de koorts, de keelpijn, de afspraak, de apotheek — но het ziekenhuis, het recept, het spreekuur.",
      },
    ],
    gate: [
      {
        word: "huisarts",
        focus: "ui = /œy/",
        tip: "ХЁЙС-артс. Ui — не «уй» и не «ю»: губы округлены, звук скользит от «ё» к «й». Самый частый источник непонимания у русскоязычных.",
      },
      {
        word: "keelpijn",
        focus: "долгое ee + ij",
        tip: "КЕ:Л-пэйн. Тяните ee по-настоящему долго; короткий гласный делает слово неузнаваемым.",
      },
      {
        word: "gezondheid",
        focus: "харде G, конечное d оглушается",
        tip: "хə-ЗОНТ-хэйт. Начальный G хриплый. Конечное d звучит как «т» — ровно как русское «род» → «рот»: это вы уже умеете, ничего нового.",
      },
    ],
  },
  {
    id: "apotheek-medicijn",
    domain: "gezondheid",
    level: "A1",
    title: "Аптека: получить лекарство по рецепту",
    context: "Аптека рядом с домом, рецепт уже выписан врачом",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "Назовёте фамилию и дату рождения — по ним ищут рецепт.",
      "Спросят, получали ли вы это лекарство раньше. От ответа зависит, будут ли объяснять приём.",
      "Режим приёма объяснят быстро и один раз. Это то, ради чего вы пришли.",
      "Могут сказать, что лекарства нет в наличии или что страховка покрывает не всё.",
      "Перескажите режим приёма своими словами. Ошибка здесь опаснее любой грамматической.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik kom een recept ophalen.",
        ru: "Добрый день, я за лекарством по рецепту.",
        note: "het recept. «ophalen» — забрать что-то заказанное; после «kom» стоит целым инфинитивом.",
      },
      {
        nl: "Mijn naam is … , geboren … .",
        ru: "Меня зовут … , дата рождения … .",
        note: "Дату рождения спрашивают всегда — однофамильцев много.",
      },
      {
        nl: "Nee, dit medicijn heb ik nog niet eerder gehad.",
        ru: "Нет, это лекарство я раньше не получал.",
        note: "Дополнение вынесено вперёд — значит глагол вторым, подлежащее третьим: dit medicijn HEB IK.",
      },
      {
        nl: "Hoe vaak moet ik dit innemen?",
        ru: "Как часто это принимать?",
        note: "innemen — «принимать внутрь» о лекарстве. Просто nemen здесь не годится.",
      },
      {
        nl: "Dus drie keer per dag, bij het eten. Klopt dat?",
        ru: "То есть три раза в день, во время еды. Верно?",
      },
      {
        nl: "Mag ik dat even opschrijven?",
        ru: "Можно я это запишу?",
        note: "«even» — частица-смягчитель, «на секундочку». Без неё просьба звучит тяжелее.",
      },
    ],
    replyBank: [
      { nl: "Wat is uw naam en geboortedatum?", ru: "Ваше имя и дата рождения?", key: "geboortedatum", register: "neutraal" },
      { nl: "Heeft u dit medicijn al eerder gehad?", ru: "Вы это лекарство раньше получали?", key: "eerder gehad", register: "neutraal" },
      { nl: "Drie keer per dag één tablet, bij de maaltijd.", ru: "Три раза в день по таблетке, во время еды.", key: "bij de maaltijd", register: "formeel" },
      { nl: "Niet innemen met melk of zuivel.", ru: "Не принимать с молоком и молочными продуктами.", key: "zuivel", register: "formeel" },
      { nl: "De kuur moet u helemaal afmaken, ook als u zich beter voelt.", ru: "Курс нужно допить до конца, даже если станет легче.", key: "de kuur afmaken", register: "formeel" },
      { nl: "Dit zit niet in het basispakket, dat kost twaalf euro vijftig.", ru: "Это не входит в базовую страховку, стоит двенадцать пятьдесят.", key: "basispakket", register: "neutraal" },
      { nl: "Het is momenteel niet op voorraad, morgen kunt u het ophalen.", ru: "Сейчас нет в наличии, завтра сможете забрать.", key: "op voorraad", register: "neutraal" },
      { nl: "Heeft u een klantenkaart bij ons?", ru: "У вас есть наша карта клиента?", key: "klantenkaart", register: "informeel" },
      { nl: "Wilt u even bij de balie wachten? Ik pak het voor u.", ru: "Подождите у стойки? Я сейчас принесу.", key: "de balie", register: "informeel" },
      { nl: "Shall I write it down in English for you?", ru: "Написать вам это по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "klopt", "betekent"],
    traps: [
      {
        wrong: "Ik moet het medicijn innemen drie keer per dag.",
        right: "Ik moet het medicijn drie keer per dag innemen.",
        why: "Смысловой глагол уходит в самый конец — после всех обстоятельств. Русское «должен принимать три раза в день» ставит глагол в середину, и по-нидерландски это сразу слышно.",
      },
      {
        wrong: "apotheek — аптека, где продаётся всё",
        right: "apotheek — только по рецепту; остальное в drogist",
        why: "В нидерландской apotheek выдают рецептурные лекарства. Витамины, пластыри, парацетамол — в drogist (Etos, Kruidvat). Слово выглядит знакомым, но обозначает не то же самое, что русская «аптека».",
      },
      {
        wrong: "een moment, een vraag (в разговоре у стойки)",
        right: "een momentje, een vraagje",
        why: "Уменьшительное -je в нидерландском не про размер, а про смягчение: momentje, vraagje, kaartje. Русская система уменьшительных у вас уже есть — новыми здесь будут только сами формы.",
      },
    ],
    gate: [
      {
        word: "apotheek",
        focus: "ударение на -TEEK, долгое ee",
        tip: "а-по-ТЕ:К. Ударение на последний слог, не на «по», как в русском. ee тянется.",
      },
      {
        word: "geneesmiddel",
        focus: "харде G + долгое ee",
        tip: "хə-НЕ:С-ми-дəл. Начальный G хриплый, второй слог ударный и долгий.",
      },
      {
        word: "uur",
        focus: "/yː/",
        tip: "Ю:Р, губы трубочкой, язык вперёд. «Om de zes uur» — каждые шесть часов; если гласный съехал в «у», вас переспросят.",
      },
    ],
  },

  // ───────────────────────── ДЕТИ И ШКОЛА ─────────────────────────
  {
    id: "school-aanmelding",
    domain: "school",
    level: "A2",
    title: "Запись ребёнка в школу",
    context: "Встреча в основной школе (basisschool): подача заявления",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Разговаривать будете с директором или завучем, а не в окошке. Это беседа, а не приём документов.",
      "Спросят возраст ребёнка, где он учился раньше и как у него с нидерландским.",
      "Расскажут про класс языковой поддержки (nieuwkomersklas). Это ключевая часть разговора.",
      "Спросят про особые потребности и прежний уровень. Отвечайте фактами, без оценок.",
      "В конце скажут срок ответа и что донести. Переспросите обе вещи — их называют скороговоркой.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik wil mijn dochter aanmelden voor groep vier.",
        ru: "Добрый день, я хочу записать дочь в четвёртую группу.",
        note: "Нидерландские классы называются groep 1–8. «aanmelden» — отделяемый глагол.",
      },
      {
        nl: "Zij is acht jaar en zit nu op een school in het buitenland.",
        ru: "Ей восемь, сейчас она учится в школе за границей.",
        note: "«op school zitten» — устойчивое «учиться в школе». Не «in de school».",
      },
      {
        nl: "Zij spreekt nog geen Nederlands, wel een beetje Engels.",
        ru: "По-нидерландски она пока не говорит, немного по-английски.",
        note: "«wel» здесь противопоставляет: «зато». Без него фраза теряет половину смысла.",
      },
      {
        nl: "Kunt u dat langzamer herhalen? Ik wil dit goed begrijpen.",
        ru: "Можете повторить медленнее? Я хочу понять это правильно.",
      },
      {
        nl: "Hoe werkt de taalklas precies? Hoeveel dagen per week?",
        ru: "Как именно работает языковой класс? Сколько дней в неделю?",
      },
      {
        nl: "Dus u laat het ons binnen twee weken weten. Klopt dat?",
        ru: "То есть вы сообщите нам в течение двух недель. Верно?",
        note: "Рамка: laat … weten. Всё остальное встаёт между двумя частями.",
      },
    ],
    replyBank: [
      { nl: "Welkom. Gaat het om een aanmelding of om een rondleiding?", ru: "Здравствуйте. Вы по поводу записи или на экскурсию?", key: "aanmelding", register: "formeel" },
      { nl: "In welke groep zat uw dochter in het buitenland?", ru: "В каком классе ваша дочь училась за границей?", key: "in welke groep", register: "neutraal" },
      { nl: "Wij hebben een nieuwkomersklas voor kinderen die nog geen Nederlands spreken.", ru: "У нас есть класс для детей, которые пока не говорят по-нидерландски.", key: "nieuwkomersklas", register: "formeel" },
      { nl: "Dat duurt meestal een jaar, daarna stroomt zij door naar een reguliere groep.", ru: "Обычно это год, потом она переходит в обычный класс.", key: "doorstromen", register: "formeel" },
      { nl: "Heeft u het rapport van de vorige school? Graag met een vertaling.", ru: "У вас есть табель из прежней школы? Желательно с переводом.", key: "het rapport", register: "formeel" },
      { nl: "Wij hebben op dit moment een wachtlijst voor groep vier.", ru: "Сейчас в четвёртую группу есть лист ожидания.", key: "wachtlijst", register: "neutraal" },
      { nl: "U hoort binnen twee weken van ons, per mail.", ru: "Мы ответим в течение двух недель, по электронной почте.", key: "u hoort van ons", register: "neutraal" },
      { nl: "Er is een ouderbijdrage, maar die is vrijwillig.", ru: "Есть родительский взнос, но он добровольный.", key: "ouderbijdrage", register: "formeel" },
      { nl: "Op woensdag zijn de kinderen om kwart over twaalf vrij.", ru: "По средам детей отпускают в четверть первого.", key: "kwart over twaalf", register: "informeel" },
      { nl: "Would it help if we did this in English?", ru: "Может, будет проще по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt", "opschrijven", "betekent"],
    traps: [
      {
        wrong: "Zij spreekt niet Nederlands.",
        right: "Zij spreekt geen Nederlands.",
        why: "Перед существительным без артикля отрицание — geen: geen Nederlands, geen tijd, geen kinderen. Niet отрицает всё остальное — глаголы, прилагательные, вещи с артиклем. В русском отрицание одно на все случаи.",
      },
      {
        wrong: "Op woensdag de kinderen zijn vrij.",
        right: "Op woensdag zijn de kinderen vrij.",
        why: "Обстоятельство впереди — глагол всё равно вторым, подлежащее уходит за него. Та же инверсия, что и в «Hier is mijn paspoort»: правило одно, а забывается каждый раз заново.",
      },
      {
        wrong: "Zij zit in de school.",
        right: "Zij zit op school.",
        why: "«Учиться в школе» — op school, без артикля. Так же: op kantoor, op vakantie. Русское «в» подставляет in, и получается «сидит внутри здания».",
      },
    ],
    gate: [
      {
        word: "school",
        focus: "sch = s + харде G",
        tip: "СХО:Л. Не «шко:л»: s и хриплый G произносятся раздельно. То же в schrijven, schoon, misschien.",
      },
      {
        word: "nieuwkomersklas",
        focus: "ieu = «и:у»",
        tip: "НИ:У-ко-мəрс-клас. ieu — долгое «и» со скольжением в «у». Ударение на первый слог.",
      },
      {
        word: "vrijwillig",
        focus: "ij дважды, -ig = «-əх»",
        tip: "ФРЭЙ-ви-лəх. Оба ij — «эй». Конечное -ig звучит «əх», не «иг»: mogelijk, twintig, vrijwillig.",
      },
    ],
  },
  {
    id: "oudergesprek-leerkracht",
    domain: "school",
    level: "B1",
    title: "Разговор с учителем об успехах ребёнка",
    context: "Десятиминутная беседа с учителем (10-minutengesprek)",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Разговор жёстко ограничен по времени — обычно десять минут. Учитель будет держать темп сам.",
      "Начнут с общей картины: как ребёнок чувствует себя в классе.",
      "Покажут результаты тестов Cito и объяснят буквы-оценки. Это самая плотная часть.",
      "Скажут прямо, что беспокоит. Нидерландские учителя не смягчают — это норма, а не претензия.",
      "Договоритесь о конкретном следующем шаге и сроке. Без этого разговор останется без результата.",
    ],
    lines: [
      {
        nl: "Goedemiddag, fijn dat we even kunnen praten.",
        ru: "Добрый день, хорошо, что удалось поговорить.",
        note: "«fijn dat …» — стандартное начало. «even» смягчает до «немного поговорить».",
      },
      {
        nl: "Hoe gaat het met haar in de klas? Heeft zij aansluiting gevonden?",
        ru: "Как у неё дела в классе? Она нашла контакт с детьми?",
        note: "«aansluiting vinden» — прижиться, влиться в коллектив. Устойчивое сочетание.",
      },
      {
        nl: "Ik zie thuis dat zij moeite heeft met begrijpend lezen.",
        ru: "Дома я вижу, что ей трудно с пониманием прочитанного.",
        note: "Придаточное с «dat» — глагол в самый конец: dat zij moeite HEEFT.",
      },
      {
        nl: "Wat kunnen wij thuis doen om haar te helpen?",
        ru: "Что мы можем делать дома, чтобы ей помочь?",
        note: "Оборот «om … te» + инфинитив, всегда в конце: om haar te helpen.",
      },
      {
        nl: "Sorry, ik wil zeker weten dat ik het goed begrijp. Bedoelt u …?",
        ru: "Извините, хочу убедиться, что понял правильно. Вы имеете в виду …?",
      },
      {
        nl: "Zullen we over twee maanden opnieuw kijken hoe het gaat?",
        ru: "Может, через два месяца снова посмотрим, как дела?",
        note: "«Zullen we …?» — стандартное предложение сделать что-то вместе.",
      },
    ],
    replyBank: [
      { nl: "Fijn dat u er bent. We hebben tien minuten, dus ik begin meteen.", ru: "Хорошо, что пришли. У нас десять минут, начну сразу.", key: "tien minuten", register: "neutraal" },
      { nl: "Het gaat over het algemeen goed, ze is een vrolijk kind.", ru: "В целом всё хорошо, она весёлый ребёнок.", key: "over het algemeen", register: "neutraal" },
      { nl: "Ik maak me wel een beetje zorgen over haar taalontwikkeling.", ru: "Меня всё же немного беспокоит её развитие речи.", key: "zorgen maken over", register: "formeel" },
      { nl: "Bij begrijpend lezen scoort ze een D, dat is onder het gemiddelde.", ru: "По пониманию прочитанного у неё D — это ниже среднего.", key: "onder het gemiddelde", register: "formeel" },
      { nl: "Rekenen gaat juist heel goed, daar hoeven we ons geen zorgen over te maken.", ru: "А вот с математикой всё отлично, тут волноваться не о чем.", key: "juist", register: "neutraal" },
      { nl: "Zij is stil in de kring, maar in het groepswerk doet ze goed mee.", ru: "В общем кругу она молчит, но в групповой работе участвует хорошо.", key: "de kring", register: "informeel" },
      { nl: "Wat ik u zou adviseren: elke dag twintig minuten hardop lezen.", ru: "Что я бы посоветовала: каждый день двадцать минут читать вслух.", key: "hardop lezen", register: "formeel" },
      { nl: "Het is echt niet erg, dit zien we bij meer kinderen die later instromen.", ru: "Это правда не страшно, так бывает у многих детей, пришедших позже.", key: "instromen", register: "neutraal" },
      { nl: "Ik zet haar op de lijst voor extra ondersteuning.", ru: "Я поставлю её в список на дополнительную поддержку.", key: "extra ondersteuning", register: "formeel" },
      { nl: "Zullen we in maart opnieuw afspreken? Dan zien we of het geholpen heeft.", ru: "Договоримся снова на март? Тогда посмотрим, помогло ли.", key: "opnieuw afspreken", register: "informeel" },
      { nl: "Feel free to say it in English if that's easier for you.", ru: "Скажите по-английски, если вам так проще.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "klopt", "laatste"],
    traps: [
      {
        wrong: "Ik zie dat zij heeft moeite met lezen.",
        right: "Ik zie dat zij moeite met lezen heeft.",
        why: "После dat, omdat, of, als глагол уходит в самый конец придаточного. В русском ничего подобного нет: «я вижу, что ей трудно» строится так же, как главное предложение.",
      },
      {
        wrong: "Wij maken ons zorgen over dat.",
        right: "Daar maken wij ons zorgen over.",
        why: "О неодушевлённом «этом» говорят через er/daar, а не dat: daarover, ervoor, ermee — причём часто разрывая надвое: daar … over. Русское «об этом» переводится буквально и звучит неправильно.",
      },
      {
        wrong: "Zij heeft geholpen mij veel.",
        right: "Zij heeft mij veel geholpen.",
        why: "Причастие уходит в самый конец, а дополнение встаёт между вспомогательным глаголом и им. Это рамка (tangconstructie): heeft … geholpen. Русский ставит глаголы рядом.",
      },
    ],
    gate: [
      {
        word: "gesprek",
        focus: "харде G, ударение на -SPREK",
        tip: "хə-СПРЕК. Первый слог — безударный шва, почти проглатывается. Не «ге-спрек».",
      },
      {
        word: "moeilijk",
        focus: "oe = «у», -lijk = «-лək»",
        tip: "МУЙ-лək. oe — чистое «у», не «оэ». Окончание -lijk всегда безударное: mogelijk, eigenlijk, natuurlijk.",
      },
      {
        word: "ontwikkeling",
        focus: "ударение на -WIK-, безударные слоги схлопываются",
        tip: "онт-ВИ-кə-линх. Не проговаривайте безударные слоги отчётливо — по-нидерландски они смазываются, и отчётливость звучит иностранно.",
      },
    ],
  },

  // ───────────────────────── ЖИЛЬЁ ─────────────────────────
  {
    id: "verhuurder-onderhoud",
    domain: "wonen",
    level: "A2",
    title: "Звонок о поломке в квартире",
    context: "Звонок арендодателю или в жилищную корпорацию",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Телефон — самое трудное: нет лица и жестов. Опенер про нидерландский нужен в первой же фразе.",
      "Адрес называйте раньше всего остального: по нему находят договор.",
      "Опишите поломку одним предложением, детали — потом.",
      "Спросят, когда вас застать дома. Держите наготове два варианта времени.",
      "В конце — номер заявки. Запишите его: без номера следующий звонок начнётся с нуля.",
    ],
    lines: [
      {
        nl: "Goedemiddag, u spreekt met … . Ik bel over een storing in mijn woning.",
        ru: "Добрый день, вас беспокоит … . Я звоню по поводу неисправности в квартире.",
        note: "«U spreekt met …» — так представляются по телефону. de storing, de woning.",
      },
      {
        nl: "Mijn adres is … , tweede verdieping.",
        ru: "Мой адрес … , второй этаж.",
        note: "Нидерландский «второй этаж» — третий уровень: begane grond, eerste, tweede.",
      },
      {
        nl: "De verwarming doet het niet. Het is koud in huis.",
        ru: "Отопление не работает. В квартире холодно.",
        note: "«het doet het niet» — устойчивое «не работает». Буквальный перевод здесь не выручит.",
      },
      {
        nl: "Sorry, ik versta u niet goed. Kunt u dat herhalen?",
        ru: "Извините, я вас плохо слышу. Можете повторить?",
        note: "verstaan — «расслышать», begrijpen — «понять смысл». По телефону нужно первое.",
      },
      {
        nl: "Ik ben donderdag de hele dag thuis, of vrijdagochtend.",
        ru: "В четверг я дома весь день, или в пятницу утром.",
      },
      {
        nl: "Kunt u mij het meldingsnummer geven? Ik schrijf het op.",
        ru: "Можете дать номер заявки? Я запишу.",
        note: "Дательное дополнение перед винительным: mij het meldingsnummer.",
      },
    ],
    replyBank: [
      { nl: "Woningstichting, goedemiddag, waarmee kan ik u helpen?", ru: "Жилищная корпорация, добрый день, чем могу помочь?", key: "waarmee", register: "formeel" },
      { nl: "Wat is uw adres en uw postcode?", ru: "Ваш адрес и почтовый индекс?", key: "postcode", register: "neutraal" },
      { nl: "Sinds wanneer werkt de verwarming niet?", ru: "С какого времени не работает отопление?", key: "sinds wanneer", register: "neutraal" },
      { nl: "Heeft u de ketel al gecontroleerd? Staat de druk goed?", ru: "Вы проверяли котёл? Давление в норме?", key: "de ketel, de druk", register: "formeel" },
      { nl: "Ik maak er een melding van, u krijgt een meldingsnummer.", ru: "Я оформляю заявку, вы получите её номер.", key: "een melding maken", register: "formeel" },
      { nl: "De monteur komt dinsdag tussen acht en twaalf.", ru: "Мастер придёт во вторник между восемью и двенадцатью.", key: "de monteur", register: "neutraal" },
      { nl: "U moet er wel de hele ochtend zijn, wij kunnen geen tijd afspreken.", ru: "Но быть дома придётся всё утро, точное время мы не назначаем.", key: "de hele ochtend", register: "formeel" },
      { nl: "Als er niemand thuis is, brengen wij voorrijkosten in rekening.", ru: "Если никого не будет дома, мы выставим счёт за выезд.", key: "voorrijkosten", register: "formeel" },
      { nl: "Dit valt onder klein onderhoud, dat is voor rekening van de huurder.", ru: "Это мелкий ремонт, он за счёт нанимателя.", key: "voor rekening van", register: "formeel" },
      { nl: "Bij een spoedgeval belt u het storingsnummer, dat staat op de website.", ru: "В экстренном случае звоните на аварийный номер, он есть на сайте.", key: "spoedgeval", register: "formeel" },
      { nl: "Sorry, would English be easier for you?", ru: "Извините, вам будет проще по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "opschrijven", "klopt"],
    traps: [
      {
        wrong: "Ik heb koud.",
        right: "Ik heb het koud.",
        why: "Состояние «мне холодно» требует обязательного het: ik heb HET koud, ik heb HET warm, ik heb HET druk. Без него фраза не собирается. Русская безличная конструкция «мне холодно» подлежащего не требует вовсе.",
      },
      {
        wrong: "Is een monteur beschikbaar?",
        right: "Is er een monteur beschikbaar?",
        why: "Неопределённое подлежащее тянет за собой пустое er: er is een monteur, er komt iemand, er zijn problemen. В русском такого слова нет, и его теряют системно — это первая ступень модуля «er».",
      },
      {
        wrong: "Ik bel voor een storing.",
        right: "Ik bel over een storing.",
        why: "bellen over — «звонить по поводу». Voor означало бы «ради» или «вместо». Каждый глагол держит свой предлог: bellen over, wachten op, vragen naar, denken aan.",
      },
    ],
    gate: [
      {
        word: "verwarming",
        focus: "v ближе к «ф», w — губно-зубное",
        tip: "фер-ВАР-минх. Нидерландское w произносится верхними зубами по нижней губе — мягче русского «в», но не «у».",
      },
      {
        word: "huurder",
        focus: "uu = /yː/",
        tip: "ХЮ:Р-дəр. Huurder — наниматель, verhuurder — наймодатель. Одна приставка меняет сторону договора, так что звук должен быть чистым.",
      },
      {
        word: "storing",
        focus: "-ing = «-инх»",
        tip: "СТО-ринх. Конечное -ng — задненёбное, без отдельного «г» на конце. То же в woning, melding, verwarming.",
      },
    ],
  },
  {
    id: "energiebedrijf-aansluiting",
    domain: "wonen",
    level: "A2",
    title: "Энергокомпания: договор на новом адресе",
    context: "Звонок в колл-центр после переезда",
    minutes: 8,
    openerContext: "telefoon",
    brief: [
      "Первая преграда — голосовое меню. Ловите цифры, остальное можно пропускать мимо ушей.",
      "Спросят адрес, дату переезда и показания счётчика. Приготовьте их заранее.",
      "Предложат тариф: фиксированный или переменный. Здесь будут говорить быстро и много.",
      "Назовут ежемесячный аванс (termijnbedrag) — это предоплата, а не итоговая цена.",
      "В конце — дата начала договора и когда придёт подтверждение. Переспросите цифрами.",
    ],
    lines: [
      {
        nl: "Goedemiddag, u spreekt met … . Ik wil graag een contract afsluiten voor een nieuw adres.",
        ru: "Добрый день, вас беспокоит … . Я хотел бы заключить договор на новый адрес.",
        note: "«een contract afsluiten» — заключить договор; глагол отделяемый: ik sluit een contract af.",
      },
      {
        nl: "Ik ben op een maart verhuisd naar … .",
        ru: "Я переехал первого марта на … .",
        note: "verhuizen идёт со вспомогательным zijn, а не hebben: это перемещение и смена состояния.",
      },
      {
        nl: "De meterstand is … . Zal ik hem doorgeven?",
        ru: "Показания счётчика … . Продиктовать?",
        note: "de meterstand — «он», поэтому hem. Неодушевлённые предметы в нидерландском тоже он или она.",
      },
      {
        nl: "Sorry, dat was te snel. Kunt u het termijnbedrag herhalen?",
        ru: "Извините, слишком быстро. Можете повторить сумму аванса?",
      },
      {
        nl: "Wat is het verschil tussen een vast en een variabel contract?",
        ru: "В чём разница между фиксированным и переменным договором?",
      },
      {
        nl: "Dus ik krijg de bevestiging per mail binnen vijf werkdagen. Klopt dat?",
        ru: "То есть подтверждение придёт на почту в течение пяти рабочих дней. Верно?",
      },
    ],
    replyBank: [
      { nl: "Voor een verhuizing toets een, voor een nieuw contract toets twee.", ru: "Для переезда нажмите один, для нового договора — два.", key: "toets twee", register: "formeel" },
      { nl: "Alle medewerkers zijn in gesprek, een moment geduld alstublieft.", ru: "Все операторы заняты, подождите, пожалуйста.", key: "een moment geduld", register: "formeel" },
      { nl: "Kunt u uw klantnummer of uw postcode en huisnummer geven?", ru: "Назовите номер клиента или индекс и номер дома.", key: "klantnummer", register: "neutraal" },
      { nl: "Per wanneer wilt u het contract laten ingaan?", ru: "С какой даты должен начать действовать договор?", key: "per wanneer", register: "formeel" },
      { nl: "Wat is de meterstand voor stroom en voor gas?", ru: "Какие показания по электричеству и по газу?", key: "de meterstand", register: "neutraal" },
      { nl: "Wilt u een vast contract voor drie jaar of een variabel tarief?", ru: "Вам фиксированный договор на три года или переменный тариф?", key: "vast of variabel", register: "formeel" },
      { nl: "Uw termijnbedrag wordt zesentachtig euro per maand.", ru: "Ваш ежемесячный аванс — восемьдесят шесть евро.", key: "zesentachtig", register: "formeel" },
      { nl: "Dat is een voorschot, aan het eind van het jaar volgt de jaarafrekening.", ru: "Это предоплата, в конце года будет окончательный расчёт.", key: "de jaarafrekening", register: "formeel" },
      { nl: "U heeft veertien dagen bedenktijd, daarna staat het contract vast.", ru: "У вас четырнадцать дней на отказ, потом договор вступает в силу окончательно.", key: "bedenktijd", register: "formeel" },
      { nl: "De bevestiging sturen wij per mail, binnen vijf werkdagen.", ru: "Подтверждение вышлем по почте в течение пяти рабочих дней.", key: "werkdagen", register: "neutraal" },
      { nl: "I can switch to English, no problem.", ru: "Могу перейти на английский, без проблем.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen", "opschrijven", "klopt"],
    traps: [
      {
        wrong: "86 — «tachtigzes»",
        right: "86 — «zesentachtig» (шесть-и-восемьдесят)",
        why: "Числа от 21 до 99 называются задом наперёд: сначала единицы, потом en, потом десятки. В деньгах, датах и номерах это самая дорогая ошибка — всегда переспрашивайте «cijfer voor cijfer».",
      },
      {
        wrong: "Ik heb verhuisd naar Utrecht.",
        right: "Ik ben verhuisd naar Utrecht.",
        why: "Глаголы перемещения и смены состояния берут zijn: ik ben verhuisd, ik ben gegaan, ik ben gebleven. Остальные — hebben. В русском вспомогательного глагола нет вовсе, поэтому выбирать приходится сознательно каждый раз.",
      },
      {
        wrong: "Ik heb afgesloten een contract.",
        right: "Ik heb een contract afgesloten.",
        why: "Причастие уходит в самый конец, дополнение встаёт между ним и вспомогательным глаголом. У отделяемых глаголов ge- вставляется внутрь: af-GE-sloten, door-GE-geven, in-GE-schreven.",
      },
    ],
    gate: [
      {
        word: "energiebedrijf",
        focus: "g в -gie остаётся хриплым, ij = «эй»",
        tip: "э-нер-ХИ:-бə-дрэйф. Даже в заимствованиях g не смягчается: energie звучит как «энерХи».",
      },
      {
        word: "meterstand",
        focus: "долгое ee, конечное d оглушается",
        tip: "МЕ:-тəр-стант. Ударение на первый слог, d на конце звучит как «т».",
      },
      {
        word: "zesentachtig",
        focus: "ch = харде G, -ig = «əх»",
        tip: "зе-сəн-ТАХ-тəх. Два хриплых звука в одном слове. Тренируйте вместе с acht, achttien, tachtig.",
      },
    ],
  },

  // ───────────────────────── РАБОТА И ДЕНЬГИ ─────────────────────────
  {
    id: "werkoverleg-collegas",
    domain: "werk",
    level: "A2",
    title: "Планёрка и разговор с коллегами",
    context: "Утренний standup и small talk у кофемашины",
    minutes: 7,
    openerContext: "informeel",
    brief: [
      "Планёрка короткая, говорят по очереди. Свои три предложения готовьте заранее — импровизировать не придётся.",
      "Между собой коллеги говорят быстро и сокращениями. Ваша очередь — единственный отрезок, где темп задаёте вы.",
      "Small talk до и после — часть работы. Погода, выходные, отпуск: трёх тем хватает.",
      "Обращение на «ты» (jij, je). Рабочая среда в Нидерландах неформальная почти всегда.",
      "Если ради вас перешли на английский, возвращать разговор удобнее в свою очередь, а не посреди чужой.",
    ],
    lines: [
      {
        nl: "Goedemorgen allemaal. Ik ben Nederlands aan het leren, dus zeg het maar als ik te langzaam ben.",
        ru: "Всем доброе утро. Я учу нидерландский, так что скажите, если я слишком медленно.",
        note: "«aan het + инфинитив» — действие в процессе: ik ben aan het leren. Прямого аналога в русском нет.",
      },
      {
        nl: "Gisteren heb ik de rapportage afgerond.",
        ru: "Вчера я закончил отчёт.",
        note: "Обстоятельство впереди — инверсия: gisteren HEB IK. Причастие в самый конец.",
      },
      {
        nl: "Vandaag ga ik verder met de planning voor volgende week.",
        ru: "Сегодня продолжу планирование на следующую неделю.",
        note: "«verder gaan met» — продолжать что-то.",
      },
      {
        nl: "Ik loop tegen een probleem aan met de toegang tot het systeem.",
        ru: "Я столкнулся с проблемой доступа к системе.",
        note: "«ergens tegenaan lopen» — натолкнуться на проблему. Приставка уезжает в конец: loop … aan.",
      },
      {
        nl: "Sorry, kun je dat herhalen? Ik miste het laatste stuk.",
        ru: "Извини, можешь повторить? Я упустил последнее.",
        note: "На «ты»: kun JE, а не kunt u. В офисе «u» коллеге звучит странно.",
      },
      {
        nl: "Hoe was jouw weekend?",
        ru: "Как прошли твои выходные?",
        note: "Обязательный вопрос в понедельник. Ответ ждут короткий — одно-два предложения.",
      },
    ],
    replyBank: [
      { nl: "Goedemorgen, zullen we beginnen? We houden het kort.", ru: "Доброе утро, начнём? Давайте коротко.", key: "we houden het kort", register: "informeel" },
      { nl: "Wat heb jij gisteren gedaan en waar loop je tegenaan?", ru: "Что ты вчера сделал и с чем застрял?", key: "waar loop je tegenaan", register: "informeel" },
      { nl: "Kun je dat even toelichten? Ik snap het nog niet helemaal.", ru: "Можешь пояснить? Я пока не совсем понял.", key: "toelichten", register: "informeel" },
      { nl: "Dat pakken we na de standup even samen op.", ru: "Разберём это вместе после планёрки.", key: "oppakken", register: "informeel" },
      { nl: "Ik zit er zelf ook nog mee, laten we straks even bellen.", ru: "У меня та же проблема, давай потом созвонимся.", key: "ermee zitten", register: "informeel" },
      { nl: "Lukt dat nog voor vrijdag, denk je?", ru: "Успеешь до пятницы, как думаешь?", key: "lukken", register: "informeel" },
      { nl: "Prima, top. Verder nog iemand?", ru: "Отлично. Ещё кто-нибудь?", key: "verder nog iemand", register: "informeel" },
      { nl: "Ik ben er volgende week niet, ik heb vrij.", ru: "На следующей неделе меня не будет, я в отпуске.", key: "vrij hebben", register: "informeel" },
      { nl: "Hoe was jouw weekend? Lekker weer gehad?", ru: "Как выходные? Погода была нормальная?", key: "lekker weer", register: "informeel" },
      { nl: "Zullen we vrijdag met het team een borrel doen?", ru: "Может, в пятницу командой посидим?", key: "de borrel", register: "informeel" },
      { nl: "We can do the standup in English, that's fine.", ru: "Можем провести планёрку по-английски, это нормально.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "laatste", "momentje"],
    traps: [
      {
        wrong: "Kunt u dat herhalen? (коллеге за соседним столом)",
        right: "Kun je dat herhalen?",
        why: "На работе в Нидерландах почти всегда «ты». «U» коллеге читается как дистанция или ирония. Русская привычка держать «вы» по умолчанию здесь работает против вас.",
      },
      {
        wrong: "Ik loop aan tegen een probleem.",
        right: "Ik loop tegen een probleem aan.",
        why: "Приставка отделяемого глагола уходит в самый конец предложения, а не остаётся при корне: loop … aan, pak … op, bel … terug.",
      },
      {
        wrong: "Ik ga naar kantoor morgen met de trein.",
        right: "Ik ga morgen met de trein naar kantoor.",
        why: "Порядок обстоятельств жёсткий: время → образ действия → место. Morgen (когда), met de trein (как), naar kantoor (куда). В русском порядок свободный, поэтому калька слышна мгновенно.",
      },
    ],
    gate: [
      {
        word: "collega",
        focus: "g хриплый и в середине слова",
        tip: "ко-ЛЕ:-ха. Не «коллега»: g остаётся хриплым везде, а ударение падает на второй слог.",
      },
      {
        word: "weekend",
        focus: "долгое ee, ударение на первый слог",
        tip: "ВЕ:-кент. Не по-английски: ударение на WEEK-, конечное d оглушается в «т».",
      },
      {
        word: "lukken",
        focus: "короткое u = /ʏ/",
        tip: "ЛЮ-кəн. Короткое u — как «ю» в «тюль», но короче и глуше. «Lukt het?» («получается?») вы услышите каждый день.",
      },
    ],
  },
  {
    id: "loonstrook-vraag",
    domain: "werk",
    level: "B1",
    title: "Вопрос о расчётном листке",
    context: "Разговор с HR или бухгалтерией о зарплате и условиях",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "О деньгах здесь говорят прямо, но по делу. Приходите с конкретным вопросом, а не с общим недоумением.",
      "Расчётный листок плотный: brutoloon, nettoloon, loonheffing, vakantiegeld, pensioenpremie.",
      "Отпускные начисляют весь год, а выплачивают обычно в мае. Это самая частая причина непонимания.",
      "Спросят, что именно непонятно. Показать пальцем в строку — нормально и экономит пять минут.",
      "Договоритесь, что ответ пришлют письменно. Устная договорённость про деньги забывается с обеих сторон.",
    ],
    lines: [
      {
        nl: "Heb je even tijd? Ik heb een vraag over mijn loonstrook.",
        ru: "У тебя есть минутка? У меня вопрос по расчётному листку.",
        note: "de loonstrook. «Even» смягчает просьбу до «на минутку».",
      },
      {
        nl: "Ik begrijp het verschil tussen brutoloon en nettoloon, maar deze post niet.",
        ru: "Разницу между брутто и нетто я понимаю, а вот эту строку — нет.",
        note: "de post здесь — «статья, строка в документе», а не «почта».",
      },
      {
        nl: "Wat houdt de loonheffingskorting precies in?",
        ru: "Что именно означает налоговая льгота?",
        note: "«inhouden» — «означать, содержать». Приставка в конец: houdt … in.",
      },
      {
        nl: "Wanneer wordt het vakantiegeld uitbetaald?",
        ru: "Когда выплачивают отпускные?",
        note: "Пассив: wordt … uitbetaald. Кто именно платит — не называется, и это нормально.",
      },
      {
        nl: "Sorry, ik wil zeker weten dat ik het goed begrijp. Bedoel je dat …?",
        ru: "Извини, хочу убедиться, что понял правильно. Ты имеешь в виду, что …?",
      },
      {
        nl: "Kun je me dat op de mail zetten? Dan kan ik het rustig nalezen.",
        ru: "Можешь прислать это письмом? Тогда я спокойно перечитаю.",
        note: "«op de mail zetten» — разговорное «прислать по почте».",
      },
    ],
    replyBank: [
      { nl: "Zeg het maar, waar gaat het over?", ru: "Говори, о чём речь?", key: "zeg het maar", register: "informeel" },
      { nl: "Dat is de loonheffing, die draagt de werkgever direct af aan de Belastingdienst.", ru: "Это подоходный налог, работодатель перечисляет его сразу в налоговую.", key: "loonheffing afdragen", register: "formeel" },
      { nl: "Het vakantiegeld bouw je het hele jaar op, maar het wordt in mei uitbetaald.", ru: "Отпускные копятся весь год, а выплачиваются в мае.", key: "opbouwen", register: "neutraal" },
      { nl: "Die post is de pensioenpremie, dat is jouw eigen bijdrage.", ru: "Эта строка — пенсионный взнос, твоя собственная часть.", key: "pensioenpremie", register: "formeel" },
      { nl: "Bruto is voor de belasting, netto is wat er op je rekening komt.", ru: "Брутто — до налога, нетто — то, что приходит на счёт.", key: "bruto en netto", register: "informeel" },
      { nl: "Klopt, dat is met terugwerkende kracht vanaf januari verrekend.", ru: "Верно, это пересчитано задним числом с января.", key: "met terugwerkende kracht", register: "formeel" },
      { nl: "Als het niet klopt, dan corrigeren we het in de volgende periode.", ru: "Если это неверно, исправим в следующем периоде.", key: "corrigeren", register: "neutraal" },
      { nl: "Dat kan ik zo een-twee-drie niet zeggen, ik zoek het even uit.", ru: "Так сразу не скажу, я это выясню.", key: "uitzoeken", register: "informeel" },
      { nl: "Ik stuur je een mailtje met de uitleg erbij.", ru: "Пришлю тебе письмо с объяснением.", key: "de uitleg", register: "informeel" },
      { nl: "Voor je contract moet je bij P&O zijn, niet bij mij.", ru: "По договору — в отдел кадров, не ко мне.", key: "P&O", register: "neutraal" },
      { nl: "It's quite technical — shall I explain it in English?", ru: "Тема техническая — объяснить по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "klopt", "opschrijven"],
    traps: [
      {
        wrong: "Wanneer betaalt het vakantiegeld?",
        right: "Wanneer wordt het vakantiegeld uitbetaald?",
        why: "Пассив строится через worden + причастие. Русское «когда выплачивают отпускные» — безличное активное, и калька превращает деньги в того, кто платит.",
      },
      {
        wrong: "de post = почта; het bureau = бюро",
        right: "de post = строка в документе; het bureau = письменный стол",
        why: "Слова выглядят знакомыми и означают другое. Из той же серии на работе: brutaal — наглый, а не «брутальный»; de directeur — первое лицо организации, а не начальник отдела.",
      },
      {
        wrong: "Wat inhoudt de korting?",
        right: "Wat houdt de korting in?",
        why: "В вопросе и в главном предложении приставка отделяется и уходит в конец: houdt … in, zoekt … uit, betaalt … uit. Слитно она стоит только в инфинитиве и в придаточном.",
      },
    ],
    gate: [
      {
        word: "loonstrook",
        focus: "два долгих oo",
        tip: "ЛО:Н-стро:к. Оба oo долгие и закрытые — ближе к «оу», чем к русскому «о».",
      },
      {
        word: "uitbetaald",
        focus: "ui = /œy/, ударная приставка",
        tip: "ЁЙТ-бə-та:лт. Снова ui — тот же звук, что в huis и huisarts.",
      },
      {
        word: "belastingdienst",
        focus: "ударение на -LAS-, -ing = «инх»",
        tip: "бə-ЛАС-тинх-динст. Первый слог проглатывается. Слово встретится чаще, чем хотелось бы.",
      },
    ],
  },

  // ───────────────────────── ПОВСЕДНЕВНОЕ ─────────────────────────
  {
    id: "buurman-geluid",
    domain: "dagelijks",
    level: "A1",
    title: "Разговор с соседом о шуме",
    context: "У двери или на лестнице, разговор на пару минут",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Разговор короткий и стоя. Длинного вступления не будет — переходите к делу со второй фразы.",
      "На «ты». Соседи в Нидерландах обращаются на jij почти всегда, даже незнакомые.",
      "Говорите факт, а не оценку: «было слышно до двух», а не «вы шумели».",
      "Ждите встречного объяснения — гости, ремонт, ребёнок. Выслушать его — половина решения.",
      "Договоритесь о конкретном: до скольких, в какие дни. Без этого разговор ничего не изменит.",
    ],
    lines: [
      {
        nl: "Hoi, ik ben je buurvrouw van boven. Heb je even?",
        ru: "Здравствуйте, я ваша соседка сверху. Есть минутка?",
        note: "«Heb je even?» — стандартное начало короткого разговора.",
      },
      {
        nl: "Ik ben Nederlands aan het leren, dus sorry als ik langzaam ben.",
        ru: "Я учу нидерландский, извините, если медленно.",
      },
      {
        nl: "Vannacht hoorde ik muziek tot een uur of twee. Dat hield ons wakker.",
        ru: "Ночью я слышала музыку часов до двух. Мы из-за этого не спали.",
        note: "«een uur of twee» — «часа примерно в два». Конструкция «een X of Y» означает приблизительность.",
      },
      {
        nl: "Ik wil geen ruzie, ik wil het gewoon even zeggen.",
        ru: "Я не хочу ссоры, просто хочу об этом сказать.",
        note: "«gewoon» — «просто»; частица, которая заметно смягчает фразу.",
      },
      {
        nl: "Zou het lukken om na elven wat zachter te doen?",
        ru: "Получится ли после одиннадцати делать потише?",
        note: "«Zou het lukken om … te …» — самая вежливая форма просьбы.",
      },
      {
        nl: "Fijn, dank je. Bel gerust aan als er iets is.",
        ru: "Отлично, спасибо. Звоните, если что.",
        note: "«aanbellen» — позвонить в дверь. «gerust» — «не стесняясь».",
      },
    ],
    replyBank: [
      { nl: "Hoi, zeg het maar.", ru: "Привет, говори.", key: "zeg het maar", register: "informeel" },
      { nl: "Oh, sorry, was het zo hard? Dat wist ik niet.", ru: "Ой, извини, так громко было? Я не знал.", key: "zo hard", register: "informeel" },
      { nl: "We hadden visite, dat loopt soms uit.", ru: "У нас были гости, иногда затягивается.", key: "uitlopen", register: "informeel" },
      { nl: "Ik zal er op letten, sorry daarvoor.", ru: "Буду следить, извини.", key: "erop letten", register: "informeel" },
      { nl: "Volgende week is er een verbouwing, dat geeft ook lawaai.", ru: "На следующей неделе ремонт, тоже будет шумно.", key: "de verbouwing", register: "informeel" },
      { nl: "Je mag altijd even aanbellen, hoor.", ru: "Можешь всегда просто позвонить в дверь.", key: "hoor", register: "informeel" },
      { nl: "Nou ja, het is pas half elf, hè?", ru: "Ну, всего-то полодиннадцатого, а?", key: "hè", register: "informeel" },
      { nl: "Ik hoor jullie ook wel eens, maar daar zeg ik niks van.", ru: "Я вас тоже иногда слышу, но ничего не говорю.", key: "wel eens", register: "informeel" },
      { nl: "Prima, dan spreken we dat zo af.", ru: "Хорошо, так и договоримся.", key: "afspreken", register: "informeel" },
      { nl: "Sorry, my Dutch is fast — shall we do English?", ru: "Извини, я говорю быстро — может, по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "klopt", "momentje"],
    traps: [
      {
        wrong: "Je mag aanbellen.",
        right: "Je mag altijd even aanbellen, hoor.",
        why: "Частицы hoor, hè, even, gewoon, maar, toch — это не мусор, а тон. Без них фраза звучит как приказ. Русские «-то», «же», «ну» устроены так же, так что сама идея вам знакома — новые только слова.",
      },
      {
        wrong: "na elf uur → «na elf»",
        right: "na elven",
        why: "После предлога часы получают -en: na elven, voor achten, tegen zevenen. Остаток старого падежа, живущий только в этой конструкции — зато встречается постоянно.",
      },
      {
        wrong: "de lawaai, het muziek",
        right: "het lawaai, de muziek",
        why: "Снова артикли и снова без правила: het lawaai, het geluid — но de muziek, de buurman, de ruzie. Другого пути, кроме как учить со словом, нет.",
      },
    ],
    gate: [
      {
        word: "buurman",
        focus: "uu = /yː/",
        tip: "БЮ:Р-ман. Тот же долгий звук, что в huur и uur. Buurman — сосед, buurvrouw — соседка.",
      },
      {
        word: "geluid",
        focus: "харде G + ui",
        tip: "хə-ЛЁЙТ. Два трудных места подряд: хриплый G и дифтонг ui. Конечное d звучит как «т».",
      },
      {
        word: "lawaai",
        focus: "aai = «а:й»",
        tip: "ла-ВА:Й. Долгое «а» со скольжением в «й», ударение на второй слог.",
      },
    ],
  },
  {
    id: "ov-controle",
    domain: "dagelijks",
    level: "A1",
    title: "Контролёр в транспорте",
    context: "Проверка проездного в поезде или трамвае",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Контролёр подходит внезапно и говорит одну фразу. Здесь решает скорость ответа, а не его правильность.",
      "Главное — понять, чего от вас хотят: карту, документ или объяснение.",
      "Самая частая проблема — не отметились на входе. Это штраф, и спорить на месте бесполезно.",
      "Если что-то не так, объясните одним предложением. Длинные объяснения делают только хуже.",
      "Штраф оформляют на месте. Спросите, как и до какого числа платить.",
    ],
    lines: [
      {
        nl: "Goedemiddag, hier is mijn kaart.",
        ru: "Добрый день, вот моя карта.",
      },
      {
        nl: "Sorry, ik denk dat ik vergeten ben in te checken.",
        ru: "Извините, кажется, я забыл отметиться.",
        note: "«vergeten zijn» — со вспомогательным zijn. И te уходит внутрь отделяемого глагола: in TE checken.",
      },
      {
        nl: "Ik ben hier nieuw en ik leer nog Nederlands.",
        ru: "Я здесь недавно и ещё учу нидерландский.",
      },
      {
        nl: "Wat moet ik nu doen?",
        ru: "Что мне теперь делать?",
        note: "Вопросительное слово, потом сразу глагол: wat MOET IK.",
      },
      {
        nl: "Kunt u dat opschrijven? Ik wil het goed doen.",
        ru: "Можете написать? Я хочу сделать правильно.",
      },
      {
        nl: "Dus ik krijg een brief en ik heb veertien dagen. Klopt dat?",
        ru: "То есть придёт письмо и у меня четырнадцать дней. Верно?",
      },
    ],
    replyBank: [
      { nl: "Goedemiddag, vervoersbewijzen alstublieft.", ru: "Добрый день, проездные документы.", key: "vervoersbewijs", register: "formeel" },
      { nl: "Kunt u even uitchecken en opnieuw inchecken?", ru: "Отметьтесь на выход и заново на вход.", key: "in- en uitchecken", register: "neutraal" },
      { nl: "Deze kaart is niet ingecheckt, dat is reizen zonder geldig vervoersbewijs.", ru: "Карта не отмечена — это проезд без действительного билета.", key: "zonder geldig vervoersbewijs", register: "formeel" },
      { nl: "Mag ik uw identiteitsbewijs zien?", ru: "Можно ваш документ?", key: "identiteitsbewijs", register: "formeel" },
      { nl: "Er staat te weinig saldo op uw kaart, minimaal twintig euro voor de trein.", ru: "На карте мало денег, для поезда нужно минимум двадцать евро.", key: "saldo", register: "formeel" },
      { nl: "U krijgt een boete van vijftig euro plus de ritprijs.", ru: "Вам выпишут штраф пятьдесят евро плюс стоимость поездки.", key: "de boete", register: "formeel" },
      { nl: "De brief komt binnen twee weken op uw huisadres.", ru: "Письмо придёт в течение двух недель на домашний адрес.", key: "de brief", register: "formeel" },
      { nl: "U kunt bezwaar maken, dat staat op de achterkant.", ru: "Можете подать возражение, как — написано на обороте.", key: "bezwaar maken", register: "formeel" },
      { nl: "Bij de volgende halte moet u uitstappen.", ru: "На следующей остановке вам нужно выйти.", key: "uitstappen", register: "formeel" },
      { nl: "Do you understand, or shall I say it in English?", ru: "Вы понимаете, или сказать по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "klopt", "cijfers"],
    traps: [
      {
        wrong: "Ik heb vergeten inchecken.",
        right: "Ik ben vergeten in te checken.",
        why: "Три ошибки в одной короткой фразе, и все три — от русской кальки «я забыл отметиться». Vergeten в этом значении берёт zijn; инфинитив требует te; te уходит внутрь отделяемого глагола.",
      },
      {
        wrong: "Wat ik moet nu doen?",
        right: "Wat moet ik nu doen?",
        why: "В вопросе с вопросительным словом глагол идёт сразу за ним, подлежащее третьим. Русский порядок «что я должен делать» здесь просто не работает.",
      },
      {
        wrong: "Ik weet niet of ik moet uitstappen hier.",
        right: "Ik weet niet of ik hier moet uitstappen.",
        why: "В придаточном с of/dat оба глагола уезжают в самый конец, а обстоятельство встаёт перед ними. Русское придаточное строится как главное, поэтому эта перестановка не происходит сама собой.",
      },
    ],
    gate: [
      {
        word: "vervoersbewijs",
        focus: "v как «ф», ij = «эй»",
        tip: "фер-ФУРС-бə-вэйс. Длинное составное слово; главное — не потерять «эй» в конце.",
      },
      {
        word: "uitchecken",
        focus: "ui = /œy/, корень по-английски",
        tip: "ЁЙТ-че-кəн. Приставка uit- с тем самым ui, а -checken заимствовано и звучит на английский манер.",
      },
      {
        word: "boete",
        focus: "oe = «у», конечное -e = шва",
        tip: "БУ-тə. oe — чистое «у». Слово, которое лучше узнавать с первого раза.",
      },
    ],
  },

  // ──────────────── БЮРОКРАТИЯ · вторая пара ────────────────
  {
    id: "belastingdienst-toeslagen",
    domain: "bureaucratie",
    level: "B1",
    title: "Налоговая: вопрос по пособиям (toeslagen)",
    context: "Звонок в Belastingdienst после изменения дохода",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Голосовое меню и очередь съедят первые минуты. Ловите цифры, остальное можно пропускать.",
      "Для опознания спросят BSN и дату рождения. Держите их перед глазами.",
      "Разговор пойдёт про суммы, даты и «изменение обстоятельств» — это ключевое понятие всей системы.",
      "Могут сказать, что вы получили лишнее и придётся вернуть. Это рядовая ситуация, а не обвинение.",
      "В конце — что вы должны сделать и до какого числа. Перескажите своими словами, иначе уйдёте без плана.",
    ],
    lines: [
      {
        nl: "Goedemiddag, u spreekt met … . Ik bel over mijn huurtoeslag.",
        ru: "Добрый день, вас беспокоит … . Я звоню по поводу жилищного пособия.",
        note: "de huurtoeslag, de zorgtoeslag, de kinderopvangtoeslag — все с de.",
      },
      {
        nl: "Mijn burgerservicenummer is … .",
        ru: "Мой BSN … .",
        note: "Диктуйте по цифрам и медленно: это первое, что у вас спросят.",
      },
      {
        nl: "Mijn inkomen is veranderd. Ik ben in mei van baan gewisseld.",
        ru: "Мой доход изменился. В мае я сменил работу.",
        note: "«van baan wisselen» — сменить работу. Устойчивое сочетание, без артикля.",
      },
      {
        nl: "Moet ik dat zelf doorgeven, of doet mijn werkgever dat?",
        ru: "Мне нужно сообщить самому, или это делает работодатель?",
        note: "Второй вариант вопроса начинается с «of» и снова с глагола.",
      },
      {
        nl: "Sorry, dat ging te snel. Kunt u het bedrag herhalen? Cijfer voor cijfer.",
        ru: "Извините, слишком быстро. Повторите сумму по цифрам?",
      },
      {
        nl: "Dus ik moet het voor het einde van de maand wijzigen, anders krijg ik een naheffing. Klopt dat?",
        ru: "То есть мне нужно изменить это до конца месяца, иначе придёт доначисление. Верно?",
        note: "de naheffing — доначисление. Это слово лучше узнать в разговоре, чем потом в письме.",
      },
    ],
    replyBank: [
      { nl: "Voor toeslagen toets drie.", ru: "По пособиям нажмите три.", key: "toets drie", register: "formeel" },
      { nl: "U wordt doorverbonden, een moment geduld alstublieft.", ru: "Соединяю, подождите, пожалуйста.", key: "doorverbonden", register: "formeel" },
      { nl: "Kunt u uw burgerservicenummer en geboortedatum geven?", ru: "Назовите BSN и дату рождения.", key: "burgerservicenummer", register: "formeel" },
      { nl: "Waar gaat uw vraag over? Huurtoeslag, zorgtoeslag of kinderopvangtoeslag?", ru: "По какому пособию вопрос? Жильё, медицина или детский сад?", key: "waar gaat uw vraag over", register: "formeel" },
      { nl: "Een wijziging in uw inkomen moet u zelf binnen vier weken doorgeven.", ru: "Об изменении дохода нужно сообщить самому в течение четырёх недель.", key: "wijziging doorgeven", register: "formeel" },
      { nl: "U heeft over de afgelopen maanden te veel ontvangen.", ru: "За прошедшие месяцы вы получили больше положенного.", key: "te veel ontvangen", register: "formeel" },
      { nl: "Dat bedrag moet u terugbetalen, u krijgt daarover een brief.", ru: "Эту сумму нужно вернуть, вам придёт письмо.", key: "terugbetalen", register: "formeel" },
      { nl: "U kunt een betalingsregeling aanvragen als het niet in één keer lukt.", ru: "Можно оформить рассрочку, если единовременно не получается.", key: "betalingsregeling", register: "formeel" },
      { nl: "Dat regelt u het beste zelf via Mijn Toeslagen met uw DigiD.", ru: "Удобнее сделать это самому через Mijn Toeslagen с DigiD.", key: "DigiD", register: "neutraal" },
      { nl: "Heeft u verder nog vragen?", ru: "Есть ещё вопросы?", key: "verder nog vragen", register: "neutraal" },
      { nl: "I can continue in English if you prefer.", ru: "Могу продолжить по-английски, если вам удобнее.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen", "opschrijven", "klopt"],
    traps: [
      {
        wrong: "de toeslag = надбавка от работодателя",
        right: "de toeslag = государственное пособие",
        why: "В нидерландском обиходе toeslag — это доплата от государства: huurtoeslag, zorgtoeslag. Надбавка к зарплате называется иначе. Спутав их, вы уведёте весь разговор не туда.",
      },
      {
        wrong: "Ik wil een betalingsregeling vragen.",
        right: "Ik wil een betalingsregeling aanvragen.",
        why: "vragen — спросить, aanvragen — подать заявление. Приставка меняет «поинтересоваться» на «оформить», и в разговоре с ведомством это совершенно разные действия.",
      },
      {
        wrong: "Ik moet zelf het doorgeven.",
        right: "Ik moet het zelf doorgeven.",
        why: "Короткое безударное местоимение het стремится к началу средней части предложения — перед zelf, перед обстоятельствами. Русский порядок «сам это сообщить» ставит их наоборот.",
      },
    ],
    gate: [
      {
        word: "toeslag",
        focus: "oe = «у», конечное g хриплое",
        tip: "ТУ-слах. oe — чистое «у», не «оэ». Конечное -g как в dag.",
      },
      {
        word: "burgerservicenummer",
        focus: "длинное составное, ударение на первой части",
        tip: "БЮР-хер-сер-ви-сə-ню-мер. Произносится одним потоком; по слогам звучит как диктант.",
      },
      {
        word: "naheffing",
        focus: "ударная приставка na-, -ing = «инх»",
        tip: "НА-хе-финх. Приставка ударная, дальше всё смазывается.",
      },
    ],
  },
  {
    id: "bank-rekening-openen",
    domain: "bureaucratie",
    level: "A2",
    title: "Открытие счёта в банке",
    context: "Приём в отделении: расчётный счёт и дебетовая карта",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Чаще всего нужна запись — без неё в отделении могут не принять.",
      "Попросят паспорт, BSN и подтверждение адреса.",
      "Спросят, зачем вам счёт и откуда доходы. Это обязательная процедура для всех, а не подозрение к вам.",
      "Расскажут про тип счёта, карту и ежемесячную комиссию.",
      "В конце — когда придёт карта и как её активировать. Это два разных срока и два разных письма.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik wil graag een betaalrekening openen.",
        ru: "Добрый день, я хотел бы открыть расчётный счёт.",
        note: "de betaalrekening — расчётный, de spaarrekening — сберегательный.",
      },
      {
        nl: "Hier is mijn paspoort, mijn BSN en een bewijs van mijn adres.",
        ru: "Вот паспорт, BSN и подтверждение адреса.",
      },
      {
        nl: "Ik werk hier sinds maart. Mijn salaris komt van mijn werkgever.",
        ru: "Я работаю здесь с марта. Зарплату получаю от работодателя.",
        note: "«sinds» указывает момент начала: sinds maart. Длительность — это «al»: al drie maanden.",
      },
      {
        nl: "Wat kost de rekening per maand?",
        ru: "Сколько стоит счёт в месяц?",
      },
      {
        nl: "Sorry, kunt u dat langzamer herhalen?",
        ru: "Извините, можете повторить медленнее?",
      },
      {
        nl: "Dus de pas komt binnen vijf werkdagen en de pincode apart. Klopt dat?",
        ru: "То есть карта придёт в течение пяти рабочих дней, а пин-код отдельно. Верно?",
        note: "Они приходят разными письмами — это не сбой, а правило безопасности.",
      },
    ],
    replyBank: [
      { nl: "Heeft u een afspraak gemaakt?", ru: "Вы записывались?", key: "een afspraak maken", register: "formeel" },
      { nl: "Mag ik uw identiteitsbewijs en uw burgerservicenummer?", ru: "Можно ваш документ и BSN?", key: "identiteitsbewijs", register: "formeel" },
      { nl: "Waarvoor wilt u de rekening gebruiken?", ru: "Для чего вам нужен счёт?", key: "waarvoor", register: "formeel" },
      { nl: "Wij zijn verplicht te vragen waar uw inkomen vandaan komt.", ru: "Мы обязаны спросить, откуда у вас доход.", key: "verplicht te vragen", register: "formeel" },
      { nl: "Een betaalrekening kost twee euro vijfentwintig per maand.", ru: "Расчётный счёт стоит два двадцать пять в месяц.", key: "vijfentwintig", register: "neutraal" },
      { nl: "U krijgt een bankpas en een pincode, die komen apart per post.", ru: "Вы получите карту и пин-код, они придут отдельно по почте.", key: "apart per post", register: "formeel" },
      { nl: "De pas moet u eerst activeren bij een geldautomaat.", ru: "Карту нужно сначала активировать в банкомате.", key: "activeren", register: "formeel" },
      { nl: "Wilt u er ook een spaarrekening bij?", ru: "Хотите ещё и сберегательный счёт?", key: "spaarrekening", register: "neutraal" },
      { nl: "U kunt alles regelen in de app, die is ook in het Engels.", ru: "Всё можно делать в приложении, оно есть и на английском.", key: "in de app", register: "informeel" },
      { nl: "Would you like me to continue in English?", ru: "Продолжить по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "spellen", "klopt"],
    traps: [
      {
        wrong: "Voor wat wilt u de rekening?",
        right: "Waarvoor wilt u de rekening?",
        why: "Предлог с вопросительным словом склеивается в одно слово: waarvoor, waarmee, waarover, waarnaar. «Voor wat» понятно, но сразу выдаёт кальку.",
      },
      {
        wrong: "«twee euro vijfentwintig» — два ноль пять",
        right: "«twee euro vijfentwintig» — два евро двадцать пять",
        why: "Центы называются как обычное число, задом наперёд: vijfentwintig — «пять-и-двадцать», то есть 25. В цене это слышно мгновенно и стоит дорого.",
      },
      {
        wrong: "Ik werk hier al maart.",
        right: "Ik werk hier sinds maart.",
        why: "«Sinds» — с какого момента, «al» — как долго: sinds maart, но al drie maanden. Русское «уже с марта» соединяет оба смысла в одной фразе, нидерландский их разводит.",
      },
    ],
    gate: [
      {
        word: "rekening",
        focus: "-ing = «инх», ударение на RE-",
        tip: "РЕ-кə-нинх. Средний слог проглатывается почти полностью.",
      },
      {
        word: "geldautomaat",
        focus: "харде G, au = «ау»",
        tip: "ХЕЛТ-ау-то-ма:т. Начальный g хриплый, конечное d в geld оглушается в «т».",
      },
      {
        word: "verplicht",
        focus: "-cht = харде G + т",
        tip: "фер-ПЛИХТ. Сочетание -cht звучит хрипло: recht, echt, nacht, verplicht.",
      },
    ],
  },

  // ──────────────── ЗДОРОВЬЕ · вторая пара ────────────────
  {
    id: "tandarts-afspraak",
    domain: "gezondheid",
    level: "A1",
    title: "Стоматолог: острая боль",
    context: "Утренний звонок в стоматологию за срочным приёмом",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "Звонить нужно утром: окна для срочных случаев держат на тот же день и разбирают их быстро.",
      "Спросят, пациент ли вы у них. Если нет, направят в дежурную клинику — это не отказ.",
      "Спросят, что болит и как давно. Коротко и конкретно.",
      "Время назовут цифрами и быстро. Здесь ошибаются чаще всего — переспрашивайте.",
      "Уточните, что взять и сколько будет стоить: взрослым стоматология в базовую страховку не входит.",
    ],
    lines: [
      {
        nl: "Goedemorgen, u spreekt met … . Ik heb veel kiespijn.",
        ru: "Доброе утро, вас беспокоит … . У меня сильно болит зуб.",
        note: "de kiespijn — про коренной зуб, и это слово используют по умолчанию.",
      },
      {
        nl: "Ja, ik ben patiënt bij u. Mijn geboortedatum is … .",
        ru: "Да, я ваш пациент. Дата рождения … .",
      },
      {
        nl: "Sinds gisteravond. Het doet vooral pijn bij koud drinken.",
        ru: "Со вчерашнего вечера. Особенно больно от холодного.",
        note: "«bij koud drinken» — при питье холодного. Действие как существительное передаётся инфинитивом.",
      },
      {
        nl: "Kunt u dat langzamer herhalen? Hoe laat precies?",
        ru: "Можете повторить медленнее? Во сколько именно?",
      },
      {
        nl: "Moet ik iets meenemen? En wat kost het ongeveer?",
        ru: "Нужно что-то взять с собой? И сколько это примерно стоит?",
        note: "meenemen отделяемый, но после модального стоит целиком.",
      },
      {
        nl: "Dus vandaag om kwart over drie. Klopt dat?",
        ru: "То есть сегодня в четверть четвёртого. Верно?",
      },
    ],
    replyBank: [
      { nl: "Tandartspraktijk, goedemorgen. Waarmee kan ik u helpen?", ru: "Стоматология, доброе утро. Чем могу помочь?", key: "waarmee", register: "formeel" },
      { nl: "Bent u al patiënt bij ons?", ru: "Вы уже наш пациент?", key: "patiënt bij ons", register: "neutraal" },
      { nl: "Wat is uw geboortedatum?", ru: "Ваша дата рождения?", key: "geboortedatum", register: "neutraal" },
      { nl: "Sinds wanneer heeft u er last van?", ru: "С какого времени беспокоит?", key: "last hebben van", register: "neutraal" },
      { nl: "Is het een kloppende pijn, of alleen bij warm en koud?", ru: "Боль пульсирующая или только от горячего и холодного?", key: "kloppende pijn", register: "formeel" },
      { nl: "Ik heb vanmiddag nog een plekje vrij, kwart over drie.", ru: "На сегодня есть окно, в четверть четвёртого.", key: "een plekje vrij", register: "informeel" },
      { nl: "Kunt u een kwartier eerder komen voor de administratie?", ru: "Можете прийти на пятнадцать минут раньше для оформления?", key: "een kwartier eerder", register: "formeel" },
      { nl: "Neemt u uw verzekeringspas en identiteitsbewijs mee.", ru: "Возьмите страховую карту и документ.", key: "meenemen", register: "formeel" },
      { nl: "Tandheelkundige zorg zit voor volwassenen niet in het basispakket.", ru: "Стоматология взрослым в базовую страховку не входит.", key: "basispakket", register: "formeel" },
      { nl: "Is English easier for you?", ru: "Вам проще по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "klopt", "opschrijven"],
    traps: [
      {
        wrong: "kwart over drie = без четверти три",
        right: "kwart over drie = 15:15",
        why: "«Over» — после, «voor» — до. Kwart over drie это 15:15, а kwart voor vier — 15:45. Обе фразы про один и тот же час, и перепутать их значит опоздать на сорок минут.",
      },
      {
        wrong: "Ik heb last met mijn kies.",
        right: "Ik heb last van mijn kies.",
        why: "«last hebben van» — беспокоит, мешает. Предлог van, не met. У врача эта конструкция звучит постоянно: last van hoofdpijn, last van mijn rug.",
      },
      {
        wrong: "Het doet pijn bij koud drinken vooral.",
        right: "Het doet vooral pijn bij koud drinken.",
        why: "Наречия степени — vooral, echt, heel — встают перед тем, что уточняют, а не сползают в конец. Русский порядок слов здесь свободнее.",
      },
    ],
    gate: [
      {
        word: "kiespijn",
        focus: "ie = долгое «и», ij = «эй»",
        tip: "КИ:С-пэйн. Два разных диграфа в одном коротком слове: ie тянется как «и», ij звучит «эй».",
      },
      {
        word: "tandarts",
        focus: "конечное d оглушается",
        tip: "ТАНТ-артс. d звучит как «т» — то же оглушение, что в русском «зуб» → «зуп». Это вы уже умеете.",
      },
      {
        word: "afspraak",
        focus: "aa = долгое «а», ударение на -SPRAAK",
        tip: "аф-СПРА:К. Тяните aa по-настоящему. Слово, которое вы произнесёте чаще любого другого.",
      },
    ],
  },
  {
    id: "ziekenhuis-verwijzing",
    domain: "gezondheid",
    level: "B1",
    title: "Приём специалиста по направлению",
    context: "Больница: первый визит к специалисту после направления от huisarts",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Сначала регистрация — через автомат или стойку. Нужен документ и страховка.",
      "Врач будет говорить быстро и терминами. Это норма профессиональной речи, а не пренебрежение.",
      "Спросят историю: когда началось, что уже пробовали, какие лекарства принимаете.",
      "Могут назначить исследование. Уточните: где, когда и нужно ли готовиться.",
      "В конце спросите, что дальше и кто с вами свяжется. Без этого вы уйдёте без плана.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik heb een afspraak. Ik ben doorverwezen door mijn huisarts.",
        ru: "Добрый день, у меня приём. Меня направил семейный врач.",
        note: "«doorverwezen worden door» — пассив с указанием, кем. de verwijzing — направление.",
      },
      {
        nl: "De klachten zijn ongeveer drie maanden geleden begonnen.",
        ru: "Жалобы начались примерно три месяца назад.",
        note: "«geleden» стоит ПОСЛЕ отрезка времени: drie maanden geleden.",
      },
      {
        nl: "Ik gebruik op dit moment geen medicijnen.",
        ru: "Сейчас я не принимаю лекарств.",
        note: "О лекарствах говорят «gebruiken», а не «nemen».",
      },
      {
        nl: "Sorry, ik ken dat woord niet. Wat betekent «…»?",
        ru: "Извините, я не знаю это слово. Что значит «…»?",
      },
      {
        nl: "Begrijp ik goed dat ik eerst bloed moet laten prikken?",
        ru: "Правильно ли я понимаю, что сначала нужно сдать кровь?",
        note: "«bloed laten prikken» — сдать кровь. Конструкция laten + инфинитив: дать сделать.",
      },
      {
        nl: "Wanneer hoor ik de uitslag, en van wie?",
        ru: "Когда я узнаю результат, и от кого?",
        note: "de uitslag — результат анализа. Ключевое слово всего визита.",
      },
    ],
    replyBank: [
      { nl: "Meldt u zich eerst aan bij de zuil, daarna neemt u plaats.", ru: "Сначала отметьтесь на стойке-автомате, потом присаживайтесь.", key: "de zuil, aanmelden", register: "formeel" },
      { nl: "Heeft u een verwijzing van uw huisarts?", ru: "У вас есть направление от семейного врача?", key: "de verwijzing", register: "formeel" },
      { nl: "De dokter loopt ongeveer twintig minuten uit.", ru: "Врач задерживается примерно на двадцать минут.", key: "uitlopen", register: "neutraal" },
      { nl: "Vertelt u eens, wat zijn precies uw klachten?", ru: "Расскажите, что именно вас беспокоит?", key: "vertelt u eens", register: "formeel" },
      { nl: "Wanneer zijn de klachten begonnen, en is het erger geworden?", ru: "Когда начались жалобы и стало ли хуже?", key: "erger geworden", register: "formeel" },
      { nl: "Gebruikt u medicijnen? Ook zelfzorgmiddelen?", ru: "Принимаете лекарства? В том числе безрецептурные?", key: "zelfzorgmiddelen", register: "formeel" },
      { nl: "Ik wil eerst bloed laten prikken en een echo aanvragen.", ru: "Сначала сдадим кровь и назначим УЗИ.", key: "een echo aanvragen", register: "formeel" },
      { nl: "U hoeft daarvoor niet nuchter te zijn.", ru: "Для этого натощак приходить не нужно.", key: "nuchter", register: "formeel" },
      { nl: "De uitslag bespreken we over twee weken telefonisch.", ru: "Результат обсудим через две недели по телефону.", key: "de uitslag bespreken", register: "formeel" },
      { nl: "Als er iets afwijkends is, bellen wij u eerder.", ru: "Если будет что-то отклоняющееся от нормы, позвоним раньше.", key: "afwijkend", register: "formeel" },
      { nl: "Shall I explain this in English? It's quite technical.", ru: "Объяснить по-английски? Тема техническая.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen", "klopt", "laatste"],
    traps: [
      {
        wrong: "geleden drie maanden",
        right: "drie maanden geleden",
        why: "«Назад» ставится ПОСЛЕ отрезка времени. Русский порядок «три месяца назад» совпадает — сбивает как раз английское «ago», если вы переводите через английский.",
      },
      {
        wrong: "Ik moet bloed prikken.",
        right: "Ik moet bloed laten prikken.",
        why: "Без «laten» получается, что кровь берёте вы сами. Laten + инфинитив означает «поручить, дать сделать»: laten prikken, laten zien, laten weten, mijn haar laten knippen.",
      },
      {
        wrong: "nuchter = трезвый",
        right: "nuchter = натощак",
        why: "В больнице nuchter значит «на голодный желудок». «U moet nuchter komen» — прийти не поев. Понять это как «трезвым» стоит отменённого анализа.",
      },
    ],
    gate: [
      {
        word: "ziekenhuis",
        focus: "ie = долгое «и», ui = /œy/",
        tip: "ЗИ:-кəн-хёйс. Два диграфа подряд: ie тянется как «и», ui — огублённый дифтонг из huis.",
      },
      {
        word: "verwijzing",
        focus: "ij = «эй», -ing = «инх»",
        tip: "фер-ВЭЙ-зинх. Ударение на средний слог, первый проглатывается.",
      },
      {
        word: "uitslag",
        focus: "ui = /œy/, харде G на конце",
        tip: "ЁЙТ-слах. Конечное -g хриплое. Ради этого слова вы придёте второй раз — узнавайте его сразу.",
      },
    ],
  },

  // ──────────────── ДЕТИ И ШКОЛА · вторая пара ────────────────
  {
    id: "kinderopvang-plek",
    domain: "school",
    level: "A2",
    title: "Детский сад: есть ли место",
    context: "Звонок в kinderopvang по поводу места и очереди",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Очереди длинные, поэтому вопрос почти всегда «когда», а не «есть ли».",
      "Спросят возраст ребёнка и с какой даты нужно место.",
      "Спросят, сколько дней в неделю и какие именно. Решите это до звонка.",
      "Расскажут про почасовой тариф и про компенсацию от государства — это разные вещи.",
      "Запишут в лист ожидания. Уточните, когда перезвонят: без этого вы просто исчезнете из виду.",
    ],
    lines: [
      {
        nl: "Goedemiddag, u spreekt met … . Ik bel voor een plek op de opvang.",
        ru: "Добрый день, вас беспокоит … . Я звоню по поводу места в саду.",
        note: "«bellen voor» — звонить ради чего-то; «bellen over» — по поводу проблемы. Разные предлоги, разные ситуации.",
      },
      {
        nl: "Mijn zoon is twee jaar. Wij zoeken opvang vanaf september.",
        ru: "Сыну два года. Место нужно с сентября.",
        note: "«vanaf» — начиная с (в будущем). «Sinds» — только про прошлое.",
      },
      {
        nl: "Wij hebben drie dagen nodig: maandag, dinsdag en donderdag.",
        ru: "Нам нужно три дня: понедельник, вторник и четверг.",
        note: "Дни недели идут без предлога и без артикля.",
      },
      {
        nl: "Sorry, kunt u dat herhalen? Hoeveel kost het per dag?",
        ru: "Извините, повторите? Сколько это стоит в день?",
      },
      {
        nl: "Krijgen wij daar kinderopvangtoeslag over?",
        ru: "На это положена государственная компенсация?",
        note: "Предлог отрывается и уходит в конец: daar … over.",
      },
      {
        nl: "Dus wij staan op de wachtlijst en u belt in mei. Klopt dat?",
        ru: "То есть мы в листе ожидания и вы позвоните в мае. Верно?",
      },
    ],
    replyBank: [
      { nl: "Kinderopvang De Vlinder, goedemiddag.", ru: "Детский сад «Де Влиндер», добрый день.", key: "kinderopvang", register: "formeel" },
      { nl: "Hoe oud is uw zoon, en per wanneer zoekt u opvang?", ru: "Сколько сыну лет и с какой даты нужно место?", key: "per wanneer", register: "formeel" },
      { nl: "Wij hebben op dit moment een wachtlijst van ongeveer een jaar.", ru: "Сейчас лист ожидания примерно на год.", key: "wachtlijst", register: "formeel" },
      { nl: "Welke dagen zou u willen? Vaste dagen werken het beste.", ru: "Какие дни вам нужны? Лучше всего фиксированные.", key: "vaste dagen", register: "neutraal" },
      { nl: "De hele dagopvang is van half acht tot half zeven.", ru: "Полный день — с половины восьмого до половины седьмого.", key: "half acht", register: "formeel" },
      { nl: "Het uurtarief is negen euro vijftien.", ru: "Почасовой тариф — девять пятнадцать.", key: "uurtarief", register: "formeel" },
      { nl: "Een deel krijgt u terug via de kinderopvangtoeslag, dat regelt u zelf.", ru: "Часть вернётся через компенсацию, оформляете её сами.", key: "terugkrijgen", register: "formeel" },
      { nl: "Ik zet u op de lijst, u hoort in mei van ons.", ru: "Ставлю вас в список, ответим в мае.", key: "op de lijst zetten", register: "neutraal" },
      { nl: "Wilt u eerst een keer komen kijken?", ru: "Хотите сначала прийти посмотреть?", key: "komen kijken", register: "informeel" },
      { nl: "Broertjes en zusjes hebben voorrang.", ru: "У братьев и сестёр приоритет.", key: "voorrang", register: "formeel" },
      { nl: "We can also do this in English if that helps.", ru: "Можем и по-английски, если так удобнее.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "klopt", "betekent"],
    traps: [
      {
        wrong: "Wij zoeken opvang sinds september. (имея в виду «с сентября и дальше»)",
        right: "Wij zoeken opvang vanaf september.",
        why: "«Sinds» смотрит назад: sinds september значит «ищем с сентября и до сих пор». «Vanaf» смотрит вперёд: нужно начиная с сентября. Русское «с сентября» покрывает оба смысла, и выбрать приходится осознанно.",
      },
      {
        wrong: "half acht = 8:30",
        right: "half acht = 7:30",
        why: "Половина ДО восьми. Правило то же, что и в half elf, но на часах работы сада ошибка стоит опоздания на целый час.",
      },
      {
        wrong: "Krijgen wij toeslag over dat?",
        right: "Krijgen wij daar toeslag over?",
        why: "Неодушевлённое после предлога заменяется на daar или er, а сам предлог уезжает в конец: daar … over. «Over dat» понятно, но так не говорят.",
      },
    ],
    gate: [
      {
        word: "kinderopvang",
        focus: "ударение на KIN-, -ng = «нх»",
        tip: "КИН-дер-оп-фанх. Конечное -ng задненёбное, отдельного «г» на конце нет.",
      },
      {
        word: "wachtlijst",
        focus: "-cht + ij",
        tip: "ВАХТ-лэйст. Хриплое -cht, сразу за ним «эй». Два трудных места подряд.",
      },
      {
        word: "uurtarief",
        focus: "uu = /yː/, ie = долгое «и»",
        tip: "Ю:Р-та-ри:ф. Начинается тем же звуком, что uur и huur.",
      },
    ],
  },
  {
    id: "ziekmelding-school",
    domain: "school",
    level: "A1",
    title: "Сообщить в школу, что ребёнок болеет",
    context: "Короткий утренний звонок до начала уроков",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Звонить нужно до начала уроков, обычно до половины девятого. Позже это уже считается прогулом.",
      "Отвечает администратор или автоответчик, не учитель.",
      "Назовите ребёнка, класс и причину — тремя короткими фразами.",
      "Могут спросить, что именно и надолго ли. Отвечайте просто, диагноз от вас не ждут.",
      "Разговор длится меньше минуты. Это ровно тот случай, где скорость важнее правильности.",
    ],
    lines: [
      {
        nl: "Goedemorgen, u spreekt met … . Ik bel over … uit groep vier.",
        ru: "Доброе утро, вас беспокоит … . Я звоню по поводу … из четвёртой группы.",
        note: "Так представляются по телефону: сначала вы, потом о ком речь.",
      },
      {
        nl: "Hij is ziek, hij kan vandaag niet komen.",
        ru: "Он болеет, сегодня прийти не сможет.",
      },
      {
        nl: "Hij heeft koorts, achtendertig vijf.",
        ru: "У него температура, тридцать восемь и пять.",
        note: "Температуру называют двумя числами подряд, слово «градусов» не добавляют.",
      },
      {
        nl: "Ik weet nog niet hoe lang. Ik bel morgen weer.",
        ru: "Пока не знаю, насколько. Позвоню завтра снова.",
      },
      {
        nl: "Sorry, kunt u dat herhalen?",
        ru: "Извините, можете повторить?",
      },
      {
        nl: "Dus ik hoef verder niets te doen. Klopt dat?",
        ru: "То есть больше ничего делать не нужно. Верно?",
        note: "«hoeven niet te» — не нужно. Не «moeten niet», это означало бы «нельзя».",
      },
    ],
    replyBank: [
      { nl: "Basisschool De Regenboog, goedemorgen.", ru: "Начальная школа «Де Регенбоох», доброе утро.", key: "basisschool", register: "formeel" },
      { nl: "U spreekt met de administratie. Om welk kind gaat het?", ru: "Это администрация. О каком ребёнке речь?", key: "om welk kind gaat het", register: "formeel" },
      { nl: "In welke groep zit hij?", ru: "В какой он группе?", key: "in welke groep", register: "neutraal" },
      { nl: "Wat heeft hij precies?", ru: "Что именно у него?", key: "wat heeft hij", register: "neutraal" },
      { nl: "Heeft hij koorts gemeten?", ru: "Температуру мерили?", key: "koorts", register: "neutraal" },
      { nl: "Oké, ik geef het door aan de leerkracht.", ru: "Хорошо, передам учителю.", key: "doorgeven aan", register: "neutraal" },
      { nl: "Belt u morgen weer even als hij nog ziek is?", ru: "Позвоните завтра, если он ещё будет болеть?", key: "weer even bellen", register: "informeel" },
      { nl: "Als het langer duurt dan een week, horen wij het graag.", ru: "Если продлится больше недели, сообщите нам.", key: "langer dan", register: "formeel" },
      { nl: "Beterschap alvast!", ru: "Выздоравливайте!", key: "beterschap", register: "informeel" },
      { nl: "Sorry, shall I take this in English?", ru: "Извините, перейти на английский?", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt", "spellen", "cijfers"],
    traps: [
      {
        wrong: "achtendertig graden vijf",
        right: "achtendertig vijf",
        why: "Температуру называют двумя числами подряд, без слова «градусов». Добавленное graden звучит как перевод и сразу это выдаёт.",
      },
      {
        wrong: "Ik moet verder niets doen.",
        right: "Ik hoef verder niets te doen.",
        why: "«Не нужно» — это hoeven niet/niets te. «Moeten niet» значит «нельзя». Правило уже встречалось в разговоре с IND и упрямо не приживается — потому что в русском обе мысли звучат как «не должен».",
      },
      {
        wrong: "langer als een week",
        right: "langer dan een week",
        why: "Сравнение строится через dan: groter dan, langer dan, meer dan. Путаница с als настолько распространена, что её допускают и сами нидерландцы, — но в школе и в официальном разговоре её замечают.",
      },
    ],
    gate: [
      {
        word: "ziekmelding",
        focus: "ie = долгое «и», -ing = «инх»",
        tip: "ЗИ:К-мел-динх. Ударение на первый слог, дальше всё смазывается.",
      },
      {
        word: "koorts",
        focus: "oo = долгое «о»",
        tip: "КО:РТС. Тяните oo: короткий гласный превращает слово в неузнаваемое.",
      },
      {
        word: "beterschap",
        focus: "-sch- = s + харде G",
        tip: "БЕ:-тəр-схап. Снова sch: сначала s, потом хриплый G. Этим словом с вами попрощаются — узнайте его заранее.",
      },
    ],
  },

  // ──────────────── ЖИЛЬЁ · вторая пара ────────────────
  {
    id: "woning-bezichtiging",
    domain: "wonen",
    level: "B1",
    title: "Просмотр съёмной квартиры",
    context: "Bezichtiging на конкурентном рынке: пятнадцать минут и сорок претендентов",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "На просмотр приходят десятки людей. У вас пятнадцать минут, и внимание агента — минуты две.",
      "Про доход и состав семьи спросят почти сразу. Это фильтр, а не бестактность.",
      "Задавайте вопросы про сроки, залог и коммунальные. Молчаливый кандидат не запоминается.",
      "Скажут, что откликов много и решение будет к концу недели.",
      "Спросите прямо, что прислать и до какого числа. Это единственный способ попасть в короткий список.",
    ],
    lines: [
      {
        nl: "Hoi, ik kom voor de bezichtiging. Ik ben Nederlands aan het leren, dus zeg het maar als ik te langzaam ben.",
        ru: "Здравствуйте, я на просмотр. Я учу нидерландский, так что скажите, если я слишком медленно.",
      },
      {
        nl: "Is de huurprijs inclusief of exclusief servicekosten?",
        ru: "Цена включает коммунальные или нет?",
        note: "inclusief / exclusief — ключевая пара при аренде. Разница бывает в сотню евро в месяц.",
      },
      {
        nl: "Wij zijn met zijn tweeën en wij hebben allebei een vast contract.",
        ru: "Нас двое, и у обоих постоянный контракт.",
        note: "«met zijn tweeën» — вдвоём. Конструкция нелогичная, запоминается только целиком.",
      },
      {
        nl: "Hoeveel maanden borg vraagt u?",
        ru: "Сколько месяцев залога?",
        note: "de borg — залог.",
      },
      {
        nl: "Sorry, wat betekent «kale huur» precies?",
        ru: "Извините, что именно значит «kale huur»?",
        note: "kale huur — «голая» аренда, без коммунальных платежей.",
      },
      {
        nl: "Wat moet ik aanleveren, en tot wanneer?",
        ru: "Что нужно прислать и до какого числа?",
        note: "aanleveren — предоставить документы. Отделяемый глагол.",
      },
    ],
    replyBank: [
      { nl: "Loop maar even rond, ik ben zo bij je.", ru: "Осмотритесь пока, я сейчас подойду.", key: "rondlopen", register: "informeel" },
      { nl: "De kale huur is twaalfhonderd, servicekosten zijn honderd euro.", ru: "Голая аренда — тысяча двести, коммунальные — сто.", key: "kale huur", register: "formeel" },
      { nl: "Wij vragen twee maanden borg.", ru: "Залог — два месяца.", key: "borg", register: "neutraal" },
      { nl: "Wat is jullie gezamenlijk bruto-inkomen?", ru: "Какой у вас совокупный доход до налогов?", key: "gezamenlijk bruto-inkomen", register: "formeel" },
      { nl: "De eis is drieënhalf keer de maandhuur.", ru: "Требование — три с половиной месячных аренды.", key: "drieënhalf keer", register: "formeel" },
      { nl: "Er zijn veertig aanmeldingen voor deze woning.", ru: "На эту квартиру сорок откликов.", key: "aanmeldingen", register: "neutraal" },
      { nl: "Als je interesse hebt, mail me dan vandaag je gegevens.", ru: "Если интересно, пришлите сегодня свои данные.", key: "gegevens mailen", register: "informeel" },
      { nl: "Wij hebben een werkgeversverklaring en drie loonstroken nodig.", ru: "Нужна справка от работодателя и три расчётных листка.", key: "werkgeversverklaring", register: "formeel" },
      { nl: "De eigenaar beslist eind van de week.", ru: "Владелец решит к концу недели.", key: "de eigenaar beslist", register: "neutraal" },
      { nl: "Huisdieren zijn helaas niet toegestaan.", ru: "Домашние животные, к сожалению, не разрешены.", key: "toegestaan", register: "formeel" },
      { nl: "Your Dutch is fine, but shall we switch to English to go faster?", ru: "У вас нормальный нидерландский, но, может, по-английски будет быстрее?", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers", "opschrijven", "klopt"],
    traps: [
      {
        wrong: "Wij zijn twee.",
        right: "Wij zijn met zijn tweeën.",
        why: "«Нас двое» — met zijn tweeën, met zijn drieën. Буквальное «wij zijn twee» звучит как «мы — число два». Логики в конструкции нет, учить только целиком.",
      },
      {
        wrong: "exclusief servicekosten = включая коммунальные",
        right: "exclusief servicekosten = БЕЗ коммунальных",
        why: "Inclusief — с, exclusief — без. Сбивает английское exclusive, которое про исключительность, а не про исключение из суммы. Цена ошибки — около сотни евро в месяц.",
      },
      {
        wrong: "drieënhalf = 3,15",
        right: "drieënhalf = 3,5",
        why: "«Три с половиной», пишется слитно: tweeënhalf, drieënhalf, vierenhalf. В требовании к доходу это множитель, от которого зависит, рассматривают вас вообще или нет.",
      },
    ],
    gate: [
      {
        word: "bezichtiging",
        focus: "-cht- в середине, -ing в конце",
        tip: "бə-ЗИХ-тə-хинх. Хриплое -cht посередине. Слово трудное, но без него на просмотр не записаться.",
      },
      {
        word: "huurprijs",
        focus: "uu = /yː/, ij = «эй»",
        tip: "ХЮ:Р-прэйс. Тот же /yː/, что в huur, huurder и verhuurder.",
      },
      {
        word: "borg",
        focus: "конечное -g хриплое",
        tip: "БОРХ, не «борг». Слово короткое, а стоит двух месячных аренд — произнесите его чисто.",
      },
    ],
  },
  {
    id: "internet-storing",
    domain: "wonen",
    level: "A2",
    title: "Провайдер: не работает интернет",
    context: "Звонок в службу поддержки, чек-лист и вызов мастера",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Сначала автоответчик и проверка «известных сбоев» в вашем районе.",
      "Проведут по чек-листу: перезагрузка, индикаторы, кабель. Спорить бесполезно — быстрее пройти его.",
      "Спросят про цвет лампочек. Посмотрите на модем ДО звонка, иначе будете бегать по квартире с телефоном.",
      "Если не чинится — назначат мастера или пришлют новый модем.",
      "Возьмите номер обращения. Без него следующий разговор начнётся с нуля.",
    ],
    lines: [
      {
        nl: "Goedemiddag, u spreekt met … . Mijn internet doet het niet.",
        ru: "Добрый день, вас беспокоит … . У меня не работает интернет.",
        note: "«het doet het niet» — та же устойчивая формула, что и про отопление.",
      },
      {
        nl: "Ik heb de modem al opnieuw opgestart, maar het hielp niet.",
        ru: "Модем я уже перезагрузил, но не помогло.",
        note: "opstarten — отделяемый; в перфекте ge- уходит внутрь: op-GE-start.",
      },
      {
        nl: "Er brandt een rood lampje bij «internet».",
        ru: "У надписи «internet» горит красная лампочка.",
        note: "Пустое er при неопределённом подлежащем: er brandt een lampje.",
      },
      {
        nl: "Sorry, ik versta u slecht. Kunt u dat herhalen?",
        ru: "Извините, я вас плохо слышу. Повторите?",
      },
      {
        nl: "Wanneer kan de monteur komen? Ik werk overdag thuis.",
        ru: "Когда может прийти мастер? Я днём работаю дома.",
      },
      {
        nl: "Kunt u mij het zaaknummer geven? Ik schrijf het op.",
        ru: "Можете дать номер обращения? Я запишу.",
      },
    ],
    replyBank: [
      { nl: "Voor storingen toets een.", ru: "По неисправностям нажмите один.", key: "storingen", register: "formeel" },
      { nl: "Er is op dit moment geen bekende storing in uw postcodegebied.", ru: "Известных сбоев в вашем районе сейчас нет.", key: "bekende storing", register: "formeel" },
      { nl: "Kunt u de stekker er dertig seconden uit halen?", ru: "Выньте вилку на тридцать секунд.", key: "de stekker eruit halen", register: "neutraal" },
      { nl: "Welke lampjes branden er, en welke kleur hebben ze?", ru: "Какие лампочки горят и какого цвета?", key: "lampjes", register: "neutraal" },
      { nl: "Ik doe nu een meting op afstand, blijft u even aan de lijn.", ru: "Делаю удалённую проверку, оставайтесь на линии.", key: "aan de lijn blijven", register: "formeel" },
      { nl: "Ik zie dat er geen signaal binnenkomt.", ru: "Вижу, что сигнал не приходит.", key: "geen signaal", register: "formeel" },
      { nl: "Ik stuur u een nieuwe modem op, die is er overmorgen.", ru: "Вышлю новый модем, будет послезавтра.", key: "overmorgen", register: "formeel" },
      { nl: "Anders plannen wij een monteur in, tussen acht en dertien uur.", ru: "Иначе назначим мастера, между восемью и часом дня.", key: "inplannen", register: "formeel" },
      { nl: "U ontvangt het zaaknummer per sms.", ru: "Номер обращения придёт по СМС.", key: "zaaknummer", register: "formeel" },
      { nl: "Zijn er verder nog dingen waarmee ik u kan helpen?", ru: "Могу ещё чем-то помочь?", key: "waarmee", register: "formeel" },
      { nl: "I could switch to English, might be quicker?", ru: "Могу перейти на английский, возможно, будет быстрее?", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "opschrijven", "momentje"],
    traps: [
      {
        wrong: "Brandt een rood lampje.",
        right: "Er brandt een rood lampje.",
        why: "Неопределённое подлежащее требует пустого er в начале: er brandt, er komt, er staat. Без него фраза повисает. Это первая и самая частая функция er.",
      },
      {
        wrong: "over morgen",
        right: "overmorgen",
        why: "Слитно и одним словом: overmorgen — послезавтра, eergisteren — позавчера. Раздельное «over morgen» значило бы «про завтра», и вас переспросят.",
      },
      {
        wrong: "Ik heb de modem gestart op.",
        right: "Ik heb de modem opgestart.",
        why: "В перфекте отделяемый глагол собирается обратно, и ge- встаёт ВНУТРЬ: op-ge-start. В конце приставка стоит только в настоящем времени.",
      },
    ],
    gate: [
      {
        word: "lampje",
        focus: "-je делает слово het-словом",
        tip: "ЛАМ-пйə. Уменьшительное здесь чисто техническое — «лампочка». И артикль автоматически het, независимо от de lamp.",
      },
      {
        word: "zaaknummer",
        focus: "aa = долгое «а»",
        tip: "ЗА:К-ню-мер. Тяните aa; ударение на первый слог.",
      },
      {
        word: "overmorgen",
        focus: "харде G в середине",
        tip: "о-фер-МОР-хəн. Ударный только третий слог, остальные смазываются.",
      },
    ],
  },

  // ──────────────── РАБОТА И ДЕНЬГИ · вторая пара ────────────────
  {
    id: "sollicitatiegesprek",
    domain: "werk",
    level: "B1",
    title: "Собеседование о работе",
    context: "Первая встреча с нанимающим менеджером",
    minutes: 10,
    openerContext: "loket",
    brief: [
      "Начнут со small talk: дорога, погода, легко ли нашли офис. Это не формальность, а первая оценка.",
      "Попросят рассказать о себе. Держите наготове две минуты, не десять.",
      "Спросят, почему эта компания и почему вы. «Мне нужна работа» — не ответ.",
      "Про слабые стороны и про деньги спросят прямо. В Нидерландах это не считается бестактным.",
      "В конце ваша очередь спрашивать. Не задать ни одного вопроса — плохой сигнал.",
    ],
    lines: [
      {
        nl: "Goedemiddag, aangenaam. Ik ben Nederlands aan het leren, dus mag het wat langzamer?",
        ru: "Добрый день, приятно познакомиться. Я учу нидерландский, можно чуть медленнее?",
        note: "«aangenaam» — стандартное «приятно познакомиться» при рукопожатии.",
      },
      {
        nl: "Ik heb zeven jaar ervaring als … , waarvan drie jaar in een internationaal team.",
        ru: "У меня семь лет опыта как … , из них три года в международной команде.",
        note: "«waarvan» — «из которых», одним словом.",
      },
      {
        nl: "Wat mij aanspreekt in deze functie is … .",
        ru: "В этой позиции меня привлекает … .",
        note: "«aanspreken» — привлекать, находить отклик. Отделяемый: spreekt … aan.",
      },
      {
        nl: "Sorry, ik weet niet zeker of ik de vraag goed begrijp. Bedoelt u …?",
        ru: "Извините, я не уверен, что правильно понял вопрос. Вы имеете в виду …?",
      },
      {
        nl: "Ik zit te denken aan een bedrag tussen … en … .",
        ru: "Я рассчитываю на сумму между … и … .",
        note: "«zitten te denken» — думать прямо сейчас. Конструкция zitten/staan/liggen te + инфинитив звучит очень по-нидерландски.",
      },
      {
        nl: "Ik heb zelf ook een paar vragen. Hoe ziet het team eruit?",
        ru: "У меня тоже есть пара вопросов. Что представляет собой команда?",
        note: "«eruit zien» — выглядеть. Части разлетаются: ziet … eruit.",
      },
    ],
    replyBank: [
      { nl: "Kom binnen, heb je de weg goed kunnen vinden?", ru: "Проходите, легко нас нашли?", key: "de weg vinden", register: "informeel" },
      { nl: "Vertel eens wat over jezelf.", ru: "Расскажите немного о себе.", key: "vertel eens", register: "informeel" },
      { nl: "Waarom heb je op deze functie gesolliciteerd?", ru: "Почему вы откликнулись на эту вакансию?", key: "solliciteren op", register: "neutraal" },
      { nl: "Wat zijn je sterke en minder sterke punten?", ru: "Какие у вас сильные и слабые стороны?", key: "minder sterke punten", register: "neutraal" },
      { nl: "Wij werken hier vrij plat, iedereen zegt gewoon wat hij vindt.", ru: "У нас довольно плоская структура, все говорят что думают.", key: "plat", register: "informeel" },
      { nl: "Wat had je qua salaris in gedachten?", ru: "Какую зарплату вы имели в виду?", key: "qua salaris", register: "neutraal" },
      { nl: "Dat ligt iets boven onze schaal, maar er is ruimte om over te praten.", ru: "Это чуть выше нашей вилки, но обсудить можно.", key: "ruimte om over te praten", register: "formeel" },
      { nl: "Het is een contract voor een jaar, met uitzicht op vast.", ru: "Договор на год, с перспективой постоянного.", key: "uitzicht op vast", register: "formeel" },
      { nl: "Heb je zelf nog vragen aan ons?", ru: "У вас есть вопросы к нам?", key: "nog vragen", register: "neutraal" },
      { nl: "Wij laten uiterlijk vrijdag iets weten.", ru: "Ответим не позднее пятницы.", key: "uiterlijk", register: "formeel" },
      { nl: "By the way, our working language is English — feel free to switch.", ru: "Кстати, рабочий язык у нас английский — можете переходить.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen", "klopt", "momentje"],
    traps: [
      {
        wrong: "Ik heb voor deze functie gesolliciteerd.",
        right: "Ik heb op deze functie gesolliciteerd.",
        why: "solliciteren OP een functie — откликнуться на вакансию. Предлог op, не voor. Ещё одна пара «глагол плюс свой предлог», которую учат целиком.",
      },
      {
        wrong: "Ik denk aan een bedrag tussen … en … .",
        right: "Ik zit te denken aan een bedrag tussen … en … .",
        why: "Конструкция zitten/staan/liggen te + инфинитив описывает действие в процессе: ik zit te denken, hij staat te wachten. В русском ей соответствует просто несовершенный вид, поэтому её не производят — а звучит она очень естественно.",
      },
      {
        wrong: "plat = плоский, скучный",
        right: "plat (об организации) = без иерархии",
        why: "«Wij werken hier plat» значит, что дистанции между начальником и подчинённым почти нет. Это ключевая черта нидерландской рабочей культуры, и на собеседовании её опишут буквально этим словом.",
      },
    ],
    gate: [
      {
        word: "sollicitatiegesprek",
        focus: "-tie = «ци», харде G в -gesprek",
        tip: "со-ли-си-ТА-ци-хə-спрек. Сочетание -tie всегда звучит «ци», а gesprek — с хриплым G.",
      },
      {
        word: "ervaring",
        focus: "v ближе к «ф», -ing = «инх»",
        tip: "эр-ФА:-ринх. Ударение на второй слог, тяните a.",
      },
      {
        word: "salaris",
        focus: "ударение на -LA-",
        tip: "са-ЛА:-рис. Ударение на второй слог и долгое a. Слово, которое надо произнести уверенно.",
      },
    ],
  },
  {
    id: "ziekmelding-werk",
    domain: "werk",
    level: "A1",
    title: "Сообщить на работу, что заболел",
    context: "Короткий звонок руководителю до начала рабочего дня",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Звонить нужно до начала дня, обычно до девяти. Сообщение в чате во многих компаниях не считается.",
      "Звоните руководителю, а не коллеге. В Нидерландах правила на этот счёт довольно строгие.",
      "Диагноз называть вы не обязаны, и спрашивать вас о нём не должны.",
      "Скажите, надолго ли, и что делать со срочными задачами.",
      "Через несколько дней может позвонить bedrijfsarts — врач компании. Это обычная процедура, а не проверка.",
    ],
    lines: [
      {
        nl: "Goedemorgen, met … . Ik bel om me ziek te melden.",
        ru: "Доброе утро, это … . Я звоню сообщить, что заболел.",
        note: "«met …» — короткое представление по телефону. «om … te melden» — чтобы сообщить.",
      },
      {
        nl: "Ik voel me niet goed, ik heb koorts.",
        ru: "Я плохо себя чувствую, у меня температура.",
        note: "«zich voelen» возвратный: ik voel me, jij voelt je, hij voelt zich.",
      },
      {
        nl: "Ik denk dat ik er morgen ook niet ben.",
        ru: "Думаю, завтра меня тоже не будет.",
        note: "«er zijn» — быть на месте. В придаточном глагол уходит в конец.",
      },
      {
        nl: "De presentatie van donderdag heb ik al doorgestuurd naar Anne.",
        ru: "Презентацию на четверг я уже переслал Анне.",
        note: "Дополнение вынесено вперёд, поэтому инверсия: heb IK. Причастие в самый конец.",
      },
      {
        nl: "Sorry, kun je dat herhalen?",
        ru: "Извини, можешь повторить?",
      },
      {
        nl: "Ik hou je op de hoogte.",
        ru: "Буду держать в курсе.",
        note: "«op de hoogte houden» — фраза, которой такой звонок заканчивают.",
      },
    ],
    replyBank: [
      { nl: "Goedemorgen, wat vervelend. Wat is er aan de hand?", ru: "Доброе утро, как неприятно. Что случилось?", key: "wat is er aan de hand", register: "informeel" },
      { nl: "Geen probleem, beterschap.", ru: "Без проблем, выздоравливай.", key: "beterschap", register: "informeel" },
      { nl: "Denk je dat het één dag is of langer?", ru: "Думаешь, это на день или дольше?", key: "of langer", register: "informeel" },
      { nl: "Zal ik je afspraken van vandaag afzeggen?", ru: "Отменить твои сегодняшние встречи?", key: "afzeggen", register: "informeel" },
      { nl: "Is er iets wat echt vandaag af moet?", ru: "Есть что-то, что обязательно надо закончить сегодня?", key: "af moeten", register: "informeel" },
      { nl: "Ik geef het door aan het team.", ru: "Передам команде.", key: "doorgeven aan", register: "neutraal" },
      { nl: "Meld je morgen even weer, ook als je beter bent.", ru: "Отпишись завтра, даже если станет лучше.", key: "je melden", register: "informeel" },
      { nl: "Als het langer duurt, neemt de bedrijfsarts contact op.", ru: "Если затянется, свяжется врач компании.", key: "bedrijfsarts", register: "formeel" },
      { nl: "Doe rustig aan, het werk loopt niet weg.", ru: "Не торопись, работа никуда не денется.", key: "rustig aan doen", register: "informeel" },
      { nl: "No worries — English is fine too if you're not feeling well.", ru: "Ничего страшного — можно и по-английски, раз вам нехорошо.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt", "laatste", "betekent"],
    traps: [
      {
        wrong: "Ik voel niet goed.",
        right: "Ik voel me niet goed.",
        why: "«Чувствовать себя» обязательно возвратное: ik voel me, jij voelt je, hij voelt zich. Без местоимения фраза означает «я плохо ощущаю» — то есть про осязание.",
      },
      {
        wrong: "Ik bel om ziek te melden.",
        right: "Ik bel om me ziek te melden.",
        why: "«zich ziek melden» тоже возвратное, и «me» встаёт сразу после om. Пропустить его — самая частая ошибка в этом звонке.",
      },
      {
        wrong: "Ik denk dat ik morgen ook niet ben.",
        right: "Ik denk dat ik er morgen ook niet ben.",
        why: "«Быть на месте» требует er: ik ben er niet, hij is er wel. Без него получается «меня не существует». Это вторая, местная функция er.",
      },
    ],
    gate: [
      {
        word: "bedrijfsarts",
        focus: "ij = «эй», -fs слитно",
        tip: "бə-ДРЭЙФС-артс. Три согласных подряд в середине — не вставляйте между ними гласную.",
      },
      {
        word: "hoogte",
        focus: "oo долгое + харде G",
        tip: "ХО:Х-тə. Долгое oo и хриплый G подряд. «Op de hoogte houden» — этим вы закончите разговор.",
      },
      {
        word: "vervelend",
        focus: "v как «ф», ударение на -VE-",
        tip: "фер-ФЕ:-лəнт. Означает «досадно, неприятно» — первое, что вам ответят.",
      },
    ],
  },

  // ──────────────── ПОВСЕДНЕВНОЕ · вторая пара ────────────────
  {
    id: "pakket-bezorger",
    domain: "dagelijks",
    level: "A1",
    title: "Курьер у двери",
    context: "Доставка посылки: вам или соседям",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Курьер спешит. У вас секунд пятнадцать, и говорит он быстро.",
      "Спросит, вы ли адресат, и попросит расписаться — на экране или в приложении.",
      "Часто просят принять посылку для соседей. Это обычная практика, отказываться необязательно.",
      "Могут попросить документ, если посылка ценная или в ней алкоголь.",
      "Если дома никого — оставят карточку с адресом пункта выдачи и сроком.",
    ],
    lines: [
      {
        nl: "Ja, dat ben ik.",
        ru: "Да, это я.",
        note: "На «Bent u …?» отвечают именно так. Голое «ja, ik ben» звучит оборванно.",
      },
      {
        nl: "Sorry, kunt u dat herhalen? Voor wie is het pakket?",
        ru: "Извините, повторите? Для кого посылка?",
      },
      {
        nl: "Ja hoor, ik neem het wel aan voor de buren.",
        ru: "Да конечно, приму для соседей.",
        note: "het pakket — значит «het», не «hem». «Wel» здесь означает готовность помочь.",
      },
      {
        nl: "Waar moet ik tekenen?",
        ru: "Где расписаться?",
        note: "tekenen — и «расписаться», и «рисовать». Здесь первое.",
      },
      {
        nl: "Kunt u het bij de buren op nummer twaalf afgeven?",
        ru: "Можете оставить у соседей в двенадцатой?",
        note: "afgeven — передать, оставить. Отделяемый глагол.",
      },
      {
        nl: "Dank u wel, fijne dag!",
        ru: "Спасибо, хорошего дня!",
      },
    ],
    replyBank: [
      { nl: "Goedemiddag, een pakketje voor nummer veertien.", ru: "Добрый день, посылка для четырнадцатой.", key: "pakketje", register: "neutraal" },
      { nl: "Kunt u even tekenen op het schermpje?", ru: "Распишитесь на экране?", key: "tekenen", register: "neutraal" },
      { nl: "Wilt u ook even tekenen voor de buren?", ru: "Распишетесь ещё и за соседей?", key: "voor de buren", register: "informeel" },
      { nl: "Mag ik uw legitimatie zien? Er zit alcohol in.", ru: "Можно ваш документ? Здесь алкоголь.", key: "legitimatie", register: "formeel" },
      { nl: "Ik kom morgen tussen twee en vier terug.", ru: "Завтра вернусь между двумя и четырьмя.", key: "terugkomen", register: "neutraal" },
      { nl: "Dan laat ik een kaartje achter in de brievenbus.", ru: "Тогда оставлю карточку в почтовом ящике.", key: "een kaartje achterlaten", register: "neutraal" },
      { nl: "U kunt het ophalen bij het afhaalpunt om de hoek.", ru: "Забрать можно в пункте выдачи за углом.", key: "afhaalpunt", register: "neutraal" },
      { nl: "Het ligt daar veertien dagen, daarna gaat het retour.", ru: "Лежит там две недели, потом уходит обратно.", key: "retour gaan", register: "formeel" },
      { nl: "Sorry, ik heb haast. Even snel tekenen graag.", ru: "Извините, тороплюсь. Распишитесь быстро.", key: "haast hebben", register: "informeel" },
      { nl: "English? Sorry, I'm in a hurry.", ru: "По-английски? Извините, я тороплюсь.", register: "switch" },
    ],
    repairIds: ["herhalen", "spellen", "klopt", "betekent"],
    traps: [
      {
        wrong: "Ja, ik ben.",
        right: "Ja, dat ben ik.",
        why: "На вопрос «Bent u …?» отвечают «dat ben ik» — «это я». Глагол zijn не остаётся в конце фразы голым, ему нужно что-то после себя.",
      },
      {
        wrong: "Ik neem hem aan. (о het pakket)",
        right: "Ik neem het aan.",
        why: "Местоимение согласуется с артиклем: het pakket → het, de doos → hem. Вот зачем артикль хранится вместе со словом — он определяет ещё и это.",
      },
      {
        wrong: "pakketje — маленькая посылка, pakket — большая",
        right: "pakketje — обычное бытовое слово для любой посылки",
        why: "Уменьшительное здесь не про размер: pakketje, kaartje, schermpje — просто обиходные формы. Курьер скажет pakketje и про огромную коробку.",
      },
    ],
    gate: [
      {
        word: "pakketje",
        focus: "двойная kk = короткий гласный",
        tip: "па-КЕ-тйə. Удвоенная согласная означает, что гласный перед ней короткий. Это общее правило нидерландской орфографии.",
      },
      {
        word: "brievenbus",
        focus: "ie = долгое «и», u короткое",
        tip: "БРИ:-фəн-бюс. Почтовый ящик — понадобится в первую же неделю.",
      },
      {
        word: "afhaalpunt",
        focus: "aa = долгое «а», ударение на AF-",
        tip: "АФ-ха:л-пюнт. Пункт выдачи. Тяните aa в середине.",
      },
    ],
  },
  {
    id: "markt-winkel",
    domain: "dagelijks",
    level: "A1",
    title: "Рынок и магазин: купить и заплатить",
    context: "Прилавок на рынке, потом касса в супермаркете",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "На рынке говорят быстро, громко и сокращениями. Это темп, а не грубость.",
      "Спросят, сколько вам. Отвечайте числом и единицей: «een pond», «twee ons».",
      "Старые меры живы: pond — это 500 грамм, ons — 100 грамм.",
      "Спросят, нужно ли что-то ещё. «Nee, dat was het» закрывает разговор.",
      "На кассе спросят про карту магазина и способ оплаты. Наличные во многих местах не принимают вовсе.",
    ],
    lines: [
      {
        nl: "Goedemiddag, mag ik een pond tomaten?",
        ru: "Добрый день, можно полкило помидоров?",
        note: "«mag ik» — обычная форма просьбы в магазине, мягче чем «ik wil».",
      },
      {
        nl: "En twee ons oude kaas, alstublieft.",
        ru: "И двести грамм выдержанного сыра, пожалуйста.",
        note: "ons = 100 грамм. «Oude kaas» — выдержанный, «jonge kaas» — молодой.",
      },
      {
        nl: "Sorry, hoeveel kost dat samen?",
        ru: "Извините, сколько всего?",
        note: "«samen» — вместе, в сумме.",
      },
      {
        nl: "Nee, dat was het, dank u wel.",
        ru: "Нет, это всё, спасибо.",
        note: "«dat was het» — «это всё». Прошедшее время, хотя говорят о настоящем моменте.",
      },
      {
        nl: "Kan ik met pin betalen?",
        ru: "Можно картой?",
        note: "«pinnen» стало самостоятельным глаголом: платить картой.",
      },
      {
        nl: "Sorry, kunt u dat herhalen? Ik versta u niet goed.",
        ru: "Извините, повторите? Я вас плохо слышу.",
      },
    ],
    replyBank: [
      { nl: "Zegt u het maar!", ru: "Слушаю вас!", key: "zegt u het maar", register: "informeel" },
      { nl: "Hoeveel mag het zijn?", ru: "Сколько вам?", key: "hoeveel mag het zijn", register: "informeel" },
      { nl: "Een pond, dat is vijf euro twintig.", ru: "Полкило — пять двадцать.", key: "een pond", register: "neutraal" },
      { nl: "Wilt u er nog iets bij?", ru: "Что-нибудь ещё к этому?", key: "er nog iets bij", register: "informeel" },
      { nl: "Deze zijn in de aanbieding, twee voor drie euro.", ru: "Эти по акции, два за три евро.", key: "in de aanbieding", register: "informeel" },
      { nl: "Anders nog iets?", ru: "Ещё что-нибудь?", key: "anders nog iets", register: "informeel" },
      { nl: "Dat is dan samen acht euro vijfenzeventig.", ru: "Тогда всего восемь семьдесят пять.", key: "vijfenzeventig", register: "neutraal" },
      { nl: "Heeft u een bonuskaart?", ru: "У вас есть карта магазина?", key: "bonuskaart", register: "neutraal" },
      { nl: "Contant kan hier helaas niet, alleen pinnen.", ru: "Наличными здесь нельзя, только картой.", key: "contant, pinnen", register: "formeel" },
      { nl: "You want English? No problem.", ru: "Хотите по-английски? Без проблем.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "betekent", "klopt"],
    traps: [
      {
        wrong: "een ons = 10 грамм, een pond = 400 грамм",
        right: "een ons = 100 г, een pond = 500 г",
        why: "Старые меры живут и на рынке, и в супермаркете. «Twee ons» — это двести грамм, а не два. Ошибка обходится в лишний пакет сыра или в слишком маленький.",
      },
      {
        wrong: "Ik wil een pond tomaten.",
        right: "Mag ik een pond tomaten?",
        why: "«Ik wil» звучит как требование. Просят через «mag ik» или «doet u maar» — та же смягчающая логика, что в русском «можно мне» вместо «я хочу».",
      },
      {
        wrong: "Wilt u nog iets bij?",
        right: "Wilt u er nog iets bij?",
        why: "Снова er: пара «er … bij» означает «к этому ещё», и между её частями встаёт всё остальное. В русском такому слову соответствовать нечему, поэтому его теряют.",
      },
    ],
    gate: [
      {
        word: "alstublieft",
        focus: "ie долгое, ударение на -BLIEFT",
        tip: "алс-тю-БЛИ:ФТ, слитно и быстро. В речи сокращается почти до «астюблиф» — не проговаривайте по буквам.",
      },
      {
        word: "aanbieding",
        focus: "aa и ie долгие, -ing = «инх»",
        tip: "А:Н-би-динх. Слово, ради которого стоит прислушиваться: означает скидку.",
      },
      {
        word: "pinnen",
        focus: "двойная nn = короткий гласный",
        tip: "ПИ-нəн. То же орфографическое правило, что в pakketje: удвоенная согласная укорачивает гласный.",
      },
    ],
  },
];

export const scenarioById = (id: string): Scenario | undefined =>
  SCENARIOS.find((s) => s.id === id);

export const domainById = (id: string): Domain | undefined =>
  DOMAINS.find((d) => d.id === id);

/** Реплика, где собеседник предлагает перейти на английский. */
export const switchReplyOf = (s: Scenario) =>
  s.replyBank.find((r) => r.register === "switch");
