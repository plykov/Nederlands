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
];

export const scenarioById = (id: string): Scenario | undefined =>
  SCENARIOS.find((s) => s.id === id);

export const domainById = (id: string): Domain | undefined =>
  DOMAINS.find((d) => d.id === id);

/** Реплика, где собеседник предлагает перейти на английский. */
export const switchReplyOf = (s: Scenario) =>
  s.replyBank.find((r) => r.register === "switch");
