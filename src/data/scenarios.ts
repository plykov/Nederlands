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
  // ───────────────────────── ТРЕТЬЯ ПАРТИЯ ─────────────────────────
  {
    id: "paspoort-verlenging",
    domain: "bureaucratie",
    level: "A1",
    title: "Продление паспорта в gemeente",
    context: "Приём по записи в gemeente: продление загранпаспорта, срок которого истекает",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Вызовут по номеру талона, а не по фамилии — следите за экраном или табло.",
      "Спросят старый паспорт и попросят подтвердить, что данные не изменились.",
      "Сфотографируют на месте и попросят расписаться на экране.",
      "Назовут сумму и способ оплаты, а также срок, когда паспорт будет готов.",
    ],
    lines: [
      {
        nl: "Goedemorgen, ik kom mijn paspoort verlengen.",
        ru: "Доброе утро, я пришёл продлить паспорт.",
        note: "«verlengen» — продлить. Не путайте с «vernieuwen» (обновить/заменить) — оба слова встречаются в объявлениях.",
      },
      {
        nl: "Hier is mijn oude paspoort en mijn afspraakbevestiging.",
        ru: "Вот мой старый паспорт и подтверждение записи.",
      },
      {
        nl: "Nee, er is niets veranderd aan mijn gegevens.",
        ru: "Нет, в моих данных ничего не изменилось.",
      },
      {
        nl: "Moet ik hier tekenen?",
        ru: "Мне здесь расписаться?",
      },
      {
        nl: "Hoeveel kost dat en hoe kan ik betalen?",
        ru: "Сколько это стоит и как можно оплатить?",
        note: "«hoe kan ik» — обычная формула вежливого вопроса о способе действия.",
      },
      {
        nl: "Wanneer is het klaar om op te halen?",
        ru: "Когда его можно будет забрать?",
        note: "«ophalen» — отделяемый глагол, снова частица op в конце.",
      },
    ],
    replyBank: [
      { nl: "Heeft u een nummertje getrokken?", ru: "Вы взяли талон?", key: "nummertje", register: "neutraal" },
      { nl: "Zijn uw gegevens nog hetzelfde?", ru: "Ваши данные всё те же?", key: "hetzelfde", register: "formeel" },
      { nl: "Kijkt u recht in de camera, alstublieft.", ru: "Смотрите прямо в камеру, пожалуйста.", key: "recht in de camera", register: "formeel" },
      { nl: "Wilt u hier uw handtekening zetten?", ru: "Поставите здесь подпись?", key: "handtekening", register: "formeel" },
      { nl: "Dat is vierentwintig euro vijftig, pinnen kan hier.", ru: "Это двадцать четыре пятьдесят, можно картой.", key: "pinnen", register: "neutraal" },
      { nl: "U kunt het over ongeveer een week ophalen.", ru: "Забрать можно примерно через неделю.", key: "over een week", register: "neutraal" },
      { nl: "Wilt u een sms krijgen zodra het klaar is?", ru: "Хотите получить смс, как только будет готово?", key: "sms", register: "neutraal" },
      { nl: "Uw oude paspoort krijgt u geknipt terug.", ru: "Старый паспорт вам вернут с надрезанным уголком.", key: "geknipt", register: "neutraal" },
      { nl: "Shall we continue in English?", ru: "Продолжим по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt", "opschrijven"],
    traps: [
      {
        wrong: "Ik kom mijn paspoort te verlengen.",
        right: "Ik kom mijn paspoort verlengen.",
        why: "После «komen + инфинитив цели» частица te не нужна, в отличие от оборотов с «om … te». Русский так же обходится без частицы — здесь это, наоборот, помогает.",
      },
      {
        wrong: "Wanneer het is klaar?",
        right: "Wanneer is het klaar?",
        why: "Вопросительное слово требует глагол сразу за собой. «Wanneer het is» — калька с русского порядка, в нидерландском так нельзя.",
      },
      {
        wrong: "de paspoort",
        right: "het paspoort",
        why: "Артикль — часть слова, без правила. het paspoort, het gegeven — но de handtekening, de camera.",
      },
    ],
    gate: [
      {
        word: "verlengen",
        focus: "ударение на -LEN-",
        tip: "вер-ЛЕНГ-ен. Долгое e перед ng, ударение не на первый слог, как хочется по-русски.",
      },
      {
        word: "handtekening",
        focus: "составное слово, три части",
        tip: "ХАНТ-тей-кə-нинх. Читайте по кускам: hand + teken + ing.",
      },
      {
        word: "ophalen",
        focus: "харде G? Нет — просто h",
        tip: "ОП-ха:-лен. Придыхательное h, не хрипящий g — их легко перепутать на слух.",
      },
    ],
  },
  {
    id: "digid-activeren",
    domain: "bureaucratie",
    level: "A2",
    title: "Активация DigiD по телефону",
    context: "Звонок в поддержку DigiD: код активации из письма не сработал",
    minutes: 8,
    openerContext: "telefoon",
    brief: [
      "Автоответчик предложит выбрать тему нажатием цифры — слушайте до конца, не жмите наугад.",
      "Оператор попросит BSN и код активации из письма, который у вас должен быть под рукой.",
      "Спросят, какое сообщение об ошибке видите на экране — читайте дословно, не пересказывайте.",
      "Могут попросить установить приложение заново или подождать новый код по почте.",
      "В конце уточнят, решён ли вопрос, и предложат номер обращения на случай повторного звонка.",
    ],
    lines: [
      {
        nl: "Goedemiddag, mijn activeringscode werkt niet.",
        ru: "Добрый день, мой код активации не работает.",
      },
      {
        nl: "Mijn BSN is nul acht twee, drie vier vijf, zes zeven acht.",
        ru: "Мой BSN — ноль восемь два, три четыре пять, шесть семь восемь.",
        note: "Цифры телефона диктуют парами или тройками, не по одной — так их проще воспринимать на слух.",
      },
      {
        nl: "Er staat: 'deze code is verlopen'.",
        ru: "Там написано: «этот код истёк».",
        note: "Читайте текст ошибки дословно — оператор ориентируется именно на формулировку.",
      },
      {
        nl: "Ik heb de app al opnieuw geïnstalleerd, dat hielp niet.",
        ru: "Я уже переустановил приложение, это не помогло.",
      },
      {
        nl: "Kunt u een nieuwe code naar mij opsturen?",
        ru: "Можете отправить мне новый код?",
      },
      {
        nl: "Is dit nu opgelost, of moet ik nog iets doen?",
        ru: "Теперь это решено, или мне ещё что-то нужно сделать?",
      },
    ],
    replyBank: [
      { nl: "Met welk onderdeel kan ik u helpen?", ru: "С чем я могу вам помочь?", key: "onderdeel", register: "formeel" },
      { nl: "Wat is uw burgerservicenummer?", ru: "Ваш номер BSN?", key: "burgerservicenummer", register: "formeel" },
      { nl: "Welke foutmelding krijgt u precies te zien?", ru: "Какое именно сообщение об ошибке вы видите?", key: "foutmelding", register: "neutraal" },
      { nl: "Die code is inderdaad verlopen na drie dagen.", ru: "Этот код действительно истекает через три дня.", key: "verlopen", register: "neutraal" },
      { nl: "Ik stuur u per post een nieuwe activeringscode.", ru: "Я отправлю вам по почте новый код активации.", key: "per post", register: "formeel" },
      { nl: "Dat duurt meestal vijf werkdagen.", ru: "Обычно это занимает пять рабочих дней.", key: "vijf werkdagen", register: "neutraal" },
      { nl: "Heeft u nog een ander e-mailadres gekoppeld?", ru: "У вас привязан ещё какой-то другой адрес почты?", key: "gekoppeld", register: "neutraal" },
      { nl: "Noteert u dit zaaknummer voor de volgende keer.", ru: "Запишите этот номер обращения на следующий раз.", key: "zaaknummer", register: "formeel" },
      { nl: "Is er verder nog iets onduidelijk?", ru: "Есть ещё что-то непонятное?", key: "onduidelijk", register: "neutraal" },
      { nl: "I can also explain this in English if that's easier.", ru: "Могу объяснить это и по-английски, если так проще.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "betekent", "momentje"],
    traps: [
      {
        wrong: "Mijn code niet werkt.",
        right: "Mijn code werkt niet.",
        why: "Отрицание «niet» встаёт после глагола, если отрицается сам факт действия, а не после подлежащего, как в русском «код не работает».",
      },
      {
        wrong: "Ik heb geïnstalleerd de app opnieuw.",
        right: "Ik heb de app opnieuw geïnstalleerd.",
        why: "Рамочная конструкция (tang): вспомогательный глагол на втором месте, причастие — в самом конце. Дополнение встаёт между ними, а не после причастия.",
      },
      {
        wrong: "Is dit opgelost nu?",
        right: "Is dit nu opgelost?",
        why: "«nu» как обстоятельство времени тяготеет к середине фразы, перед причастием — калька с русского порядка звучит рублено.",
      },
    ],
    gate: [
      {
        word: "burgerservicenummer",
        focus: "длинное составное слово",
        tip: "БЮР-хер-сер-ВИ-се-нюм-мер. Произносите по частям: burger + service + nummer. В разговоре чаще говорят просто BSN.",
      },
      {
        word: "foutmelding",
        focus: "ou = /ʌu/, харде G",
        tip: "ФАУТ-мел-динх. ou звучит как русское «ау», слитно.",
      },
      {
        word: "verlopen",
        focus: "ver- безударная приставка",
        tip: "вер-ЛО:-пен. Ударение на второй слог, первый — почти «вэ».",
      },
    ],
  },
  {
    id: "ggd-inenting",
    domain: "gezondheid",
    level: "A1",
    title: "Прививка ребёнку в GGD",
    context: "Плановый визит в GGD (консультационное бюро) на прививку по календарю",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "На ресепшн спросят имя ребёнка и дату рождения, сверят с приглашением.",
      "Медсестра спросит про самочувствие ребёнка последние дни и про предыдущие реакции на прививки.",
      "Объяснит, какую прививку делает и куда, обычно на скорости, без пауз для вопросов.",
      "После укола расскажет, какая реакция нормальна, а с чем звонить.",
      "В конце дадут буклет и назначат дату следующей прививки.",
    ],
    lines: [
      {
        nl: "Goedemorgen, wij hebben een afspraak voor de inenting.",
        ru: "Доброе утро, у нас запись на прививку.",
      },
      {
        nl: "Ze is de laatste dagen gewoon gezond geweest.",
        ru: "Последние дни она была в порядке, здорова.",
        note: "«geweest» — причастие от «zijn». Составное прошедшее держится на аналогии с русским «была», но глагол другой.",
      },
      {
        nl: "Nee, eerder heeft ze nergens op gereageerd.",
        ru: "Нет, раньше ни на что не реагировала.",
      },
      {
        nl: "Waar in haar arm wordt het geprikt?",
        ru: "Куда в руку сделают укол?",
      },
      {
        nl: "Waar moet ik op letten vannacht?",
        ru: "На что мне обратить внимание сегодня ночью?",
        note: "«letten op» — управление с предлогом op, отдельно запоминаемое сочетание.",
      },
      {
        nl: "Wanneer is de volgende afspraak?",
        ru: "Когда следующая запись?",
      },
    ],
    replyBank: [
      { nl: "Wat is de geboortedatum van uw kind?", ru: "Дата рождения вашего ребёнка?", key: "geboortedatum", register: "formeel" },
      { nl: "Heeft ze koorts gehad de afgelopen dagen?", ru: "У неё была температура последние дни?", key: "koorts", register: "neutraal" },
      { nl: "Heeft ze eerder heftig gereageerd op een prik?", ru: "Она раньше сильно реагировала на укол?", key: "heftig gereageerd", register: "neutraal" },
      { nl: "Dit is de DKTP-prik, in de bovenarm.", ru: "Это прививка ДКТС, в плечо.", key: "bovenarm", register: "formeel" },
      { nl: "Een beetje koorts en een dik armpje is normaal.", ru: "Небольшая температура и опухшая ручка — это нормально.", key: "een dik armpje", register: "neutraal" },
      { nl: "Bel ons als de koorts hoger dan negenendertig wordt.", ru: "Звоните нам, если температура станет выше тридцати девяти.", key: "negenendertig", register: "formeel" },
      { nl: "Hier is een boekje met alle informatie.", ru: "Вот буклет со всей информацией.", key: "boekje", register: "informeel" },
      { nl: "De volgende oproep krijgt u automatisch per post.", ru: "На следующую прививку вас вызовут письмом автоматически.", key: "automatisch", register: "formeel" },
      { nl: "Shall I explain the rest in English?", ru: "Объяснить остальное по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "opschrijven"],
    traps: [
      {
        wrong: "Ze heeft nooit gereageerd op niets.",
        right: "Ze heeft nooit ergens op gereageerd.",
        why: "Двойное отрицание, естественное в русском («никогда ни на что»), в нидерландском не работает — отрицание одно.",
      },
      {
        wrong: "de arm, de kind",
        right: "de arm, het kind",
        why: "Каждое существительное — со своим артиклем без исключений: de arm, но het kind, het armpje (уменьшительные всегда het).",
      },
      {
        wrong: "Waar op moet ik letten?",
        right: "Waar moet ik op letten?",
        why: "Предлог, управляющий вопросительным словом, в разговорной речи отделяется и уходит в конец: waar … op letten, а не остаётся перед op сразу.",
      },
    ],
    gate: [
      {
        word: "inenting",
        focus: "харде G перед -ing",
        tip: "ин-ЭН-тинх. Ударение на второй слог, -ing на конце звучит как «инх».",
      },
      {
        word: "koorts",
        focus: "долгое oo",
        tip: "КО:РТС, слитно, oo — долгий закрытый звук, не «оо» с паузой.",
      },
      {
        word: "bovenarm",
        focus: "составное слово",
        tip: "БО:-вен-арм. boven + arm — верхняя часть руки, плечо.",
      },
    ],
  },
  {
    id: "fysiotherapie-verwijzing",
    domain: "gezondheid",
    level: "B1",
    title: "Первый приём у физиотерапевта",
    context: "Первичный приём у физиотерапевта по направлению от huisarts, боль в спине",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Спросят подробную историю боли: когда началась, что провоцирует, что облегчает.",
      "Попросят показать движение, которое вызывает боль, и оценить её по шкале от одного до десяти.",
      "Проверят направление от huisarts и спросят про страховку и количество оплаченных сеансов.",
      "Составят план лечения и объяснят упражнения — обычно быстро, с показом, а не долгим текстом.",
      "В конце назначат следующий приём и дадут листок с упражнениями на дом.",
    ],
    lines: [
      {
        nl: "De pijn zit vooral onderin mijn rug, aan de linkerkant.",
        ru: "Боль в основном внизу спины, с левой стороны.",
        note: "«onderin» — слитное наречие места, буквально «внизу-в».",
      },
      {
        nl: "Het begon ongeveer drie weken geleden, na het tillen van een doos.",
        ru: "Это началось примерно три недели назад, после того как поднимал коробку.",
      },
      {
        nl: "Op een schaal van tien geef ik het een zes.",
        ru: "По десятибалльной шкале — на шестёрку.",
      },
      {
        nl: "Zitten maakt het erger, lopen juist iets minder.",
        ru: "От сидения хуже, а от ходьбы, наоборот, немного легче.",
      },
      {
        nl: "Hier is de verwijzing van mijn huisarts.",
        ru: "Вот направление от моего терапевта.",
      },
      {
        nl: "Hoe vaak moet ik deze oefeningen doen?",
        ru: "Как часто мне делать эти упражнения?",
      },
      {
        nl: "Wordt dit vergoed door mijn verzekering?",
        ru: "Это покрывается моей страховкой?",
        note: "«vergoeden» — возмещать. Ключевой глагол для любого разговора о страховке.",
      },
    ],
    replyBank: [
      { nl: "Kunt u de pijn beschrijven? Stekend, zeurend of dof?", ru: "Опишите боль — острая, ноющая или тупая?", key: "stekend, zeurend, dof", register: "neutraal" },
      { nl: "Wanneer is de pijn begonnen?", ru: "Когда началась боль?", key: "begonnen", register: "neutraal" },
      { nl: "Kunt u deze beweging voor mij nadoen?", ru: "Можете повторить это движение для меня?", key: "nadoen", register: "formeel" },
      { nl: "Heeft u een verwijzing van de huisarts bij zich?", ru: "У вас с собой направление от терапевта?", key: "verwijzing", register: "formeel" },
      { nl: "Uw basisverzekering vergoedt de eerste negen behandelingen niet.", ru: "Базовая страховка не покрывает первые девять сеансов.", key: "vergoedt niet", register: "formeel" },
      { nl: "Heeft u een aanvullende verzekering afgesloten?", ru: "У вас оформлена дополнительная страховка?", key: "aanvullende verzekering", register: "neutraal" },
      { nl: "Doe deze oefening drie keer per dag, tien herhalingen.", ru: "Делайте это упражнение три раза в день, по десять повторений.", key: "drie keer per dag", register: "formeel" },
      { nl: "Het is normaal dat het de volgende dag wat stijver aanvoelt.", ru: "Нормально, что на следующий день будет немного скованно.", key: "stijver", register: "neutraal" },
      { nl: "Zullen we over twee weken evalueren?", ru: "Оценим результат через две недели?", key: "evalueren", register: "formeel" },
      { nl: "It might be simpler if I switch to English for the exercises.", ru: "Может, проще перейти на английский для упражнений.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "klopt"],
    traps: [
      {
        wrong: "Ik heb pijn drie weken geleden begonnen.",
        right: "De pijn is drie weken geleden begonnen.",
        why: "Русское «у меня началась боль» подсказывает «я» подлежащим. В нидерландском подлежащее — сама боль: de pijn begint, jij niet.",
      },
      {
        wrong: "Is dit vergoed door mijn verzekering?",
        right: "Wordt dit vergoed door mijn verzekering?",
        why: "Регулярный процесс возмещения описывается страдательным залогом с worden, а не с zijn — типичная путаница, потому что в русском разница не грамматикализована так же чётко.",
      },
      {
        wrong: "de rug, de basisverzekering, het beweging",
        right: "de rug, de basisverzekering, de beweging",
        why: "Только запоминание, без правила: de rug, de basisverzekering, de beweging — все три de, хотя ничем внешне друг на друга не похожи.",
      },
    ],
    gate: [
      {
        word: "verwijzing",
        focus: "ij = дифтонг «эй»",
        tip: "вер-ВЭЙ-зинх. Ударение на второй слог, ij звучит как русское «эй».",
      },
      {
        word: "oefeningen",
        focus: "oe = /u/, долгое",
        tip: "У:-фə-нин-хен. oe — чистое долгое «у», не дифтонг.",
      },
      {
        word: "verzekering",
        focus: "безударное ver-, харде G",
        tip: "вер-СЕ:-кə-ринх. Kering содержит харде G перед -ing.",
      },
    ],
  },
  {
    id: "tussenschoolse-opvang",
    domain: "school",
    level: "A1",
    title: "Запись на присмотр в обед (TSO)",
    context: "Звонок или разговор в школе о записи ребёнка на tussenschoolse opvang (присмотр в обеденный перерыв)",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Спросят, на какие дни недели нужен присмотр в обед и постоянно или разово.",
      "Уточнят, есть ли у ребёнка аллергии на еду — отвечайте коротко и по делу.",
      "Назовут стоимость за раз или за месяц и способ оплаты, обычно автосписанием.",
      "Объяснят, куда ребёнку приходить и кто встречает — иногда с планом школы на словах, быстро.",
    ],
    lines: [
      {
        nl: "Ik wil mijn zoon aanmelden voor de overblijf.",
        ru: "Я хочу записать сына на присмотр в обед.",
        note: "«overblijf» — разговорное слово для tussenschoolse opvang, встречается чаще на практике.",
      },
      {
        nl: "Het gaat om maandag, woensdag en vrijdag.",
        ru: "Речь о понедельнике, среде и пятнице.",
      },
      {
        nl: "Nee, hij heeft geen allergieën.",
        ru: "Нет, у него нет аллергий.",
      },
      {
        nl: "Hoe wordt er betaald, per maand of per keer?",
        ru: "Как оплачивается — по месяцам или разово?",
      },
      {
        nl: "Waar moet hij naartoe tijdens de pauze?",
        ru: "Куда ему идти на перемене?",
      },
    ],
    replyBank: [
      { nl: "Op welke dagen heeft u opvang nodig?", ru: "В какие дни вам нужен присмотр?", key: "welke dagen", register: "neutraal" },
      { nl: "Heeft uw kind allergieën of dieetwensen?", ru: "У вашего ребёнка есть аллергии или особая диета?", key: "allergieën", register: "formeel" },
      { nl: "Het kost twee euro vijftig per keer.", ru: "Это стоит два пятьдесят за раз.", key: "per keer", register: "neutraal" },
      { nl: "Wij schrijven het bedrag automatisch af.", ru: "Мы списываем сумму автоматически.", key: "automatisch afschrijven", register: "formeel" },
      { nl: "Hij moet naar het speellokaal, naast de gymzaal.", ru: "Ему нужно в игровую, рядом со спортзалом.", key: "speellokaal", register: "neutraal" },
      { nl: "Een overblijfouder haalt de kinderen op uit de klas.", ru: "Родитель-волонтёр забирает детей из класса.", key: "overblijfouder", register: "neutraal" },
      { nl: "U kunt dagen ook incidenteel bijboeken via de app.", ru: "Дни можно также разово добавить через приложение.", key: "bijboeken", register: "formeel" },
      { nl: "We're happy to switch to English if that's easier for you.", ru: "Мы с радостью перейдём на английский, если вам так проще.", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "cijfers"],
    traps: [
      {
        wrong: "Ik wil aanmelden mijn zoon.",
        right: "Ik wil mijn zoon aanmelden.",
        why: "Отделяемый глагол в неопределённой форме держится целиком в конце фразы: aanmelden, а не разрывается порядком слов из русского.",
      },
      {
        wrong: "het overblijfouder, het speellokaal",
        right: "de overblijfouder, het speellokaal",
        why: "Каждое слово — с собственным артиклем: de overblijfouder (человек), het speellokaal (составное на het-слово lokaal).",
      },
      {
        wrong: "Hoeveel het kost?",
        right: "Hoeveel kost het?",
        why: "После вопросительного слова сразу идёт глагол, подлежащее — третьим. Прямой перенос русского порядка сюда не подходит.",
      },
    ],
    gate: [
      {
        word: "overblijf",
        focus: "ei-звук через ij? Нет: -ij внутри слова",
        tip: "О:-вер-БЛЭЙФ. Ударение на второй слог, ij — дифтонг «эй».",
      },
      {
        word: "speellokaal",
        focus: "долгое ee, ударение на -kaal",
        tip: "спе:л-ло-КА:Л. Два долгих гласных подряд, оба тянутся.",
      },
      {
        word: "afschrijven",
        focus: "sch = s + харде G",
        tip: "АФ-схрэй-вен. Списывать деньги — тот же глагол, что и «переписывать».",
      },
    ],
  },
  {
    id: "mentor-gesprek-voortgezet",
    domain: "school",
    level: "B1",
    title: "Разговор с ментором в средней школе",
    context: "Плановый разговор с ментором (классным руководителем) о переходе ребёнка на другой уровень (advies)",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Ментор изложит успеваемость по предметам подряд, обычно по таблице, которую видит только он.",
      "Прозвучит рекомендация (advies) по уровню — vmbo, havo или vwo — с обоснованием через оценки и рабочие навыки.",
      "Спросят ваше мнение и мнение ребёнка о предпочтительном уровне и мотивации.",
      "Обсудят возможность пробного периода (overstap) на другом уровне при сомнении.",
      "В конце договорятся о следующей точке контроля — обычно через полгода.",
    ],
    lines: [
      {
        nl: "Hoe ziet u de ontwikkeling van mijn dochter dit jaar?",
        ru: "Как вы видите развитие моей дочери в этом году?",
      },
      {
        nl: "Wat betekent dit advies precies voor volgend jaar?",
        ru: "Что именно значит эта рекомендация для следующего года?",
        note: "«advies» — официальная рекомендация уровня, важный термин в системе среднего образования.",
      },
      {
        nl: "Zij wil zelf liever op havo-niveau doorgaan.",
        ru: "Она сама предпочла бы продолжить на уровне havo.",
      },
      {
        nl: "Is een overstapklas dan een optie voor ons?",
        ru: "Значит, для нас вариант — класс с переходным уровнем?",
      },
      {
        nl: "Waar moeten wij als ouders extra op letten?",
        ru: "На что нам как родителям стоит обратить особое внимание?",
      },
      {
        nl: "Wanneer spreken we elkaar weer?",
        ru: "Когда мы снова созвонимся/встретимся?",
      },
    ],
    replyBank: [
      { nl: "Ze presteert sterk op taal, minder op rekenen.", ru: "У неё сильные результаты по языку, слабее по математике.", key: "presteert", register: "formeel" },
      { nl: "Ons advies is havo, met een kanttekening bij wiskunde.", ru: "Наша рекомендация — havo, с оговоркой по математике.", key: "kanttekening", register: "formeel" },
      { nl: "Dit advies is niet in beton gegoten.", ru: "Эта рекомендация не высечена в камне.", key: "niet in beton gegoten", register: "informeel" },
      { nl: "Een overstapklas combineert twee niveaus het eerste jaar.", ru: "Переходный класс совмещает два уровня в первый год.", key: "overstapklas", register: "neutraal" },
      { nl: "Let vooral op haar motivatie voor de bètavakken.", ru: "Обратите особое внимание на её мотивацию к точным наукам.", key: "bètavakken", register: "formeel" },
      { nl: "We evalueren dit na het eerste rapport.", ru: "Мы оценим это после первого табеля.", key: "eerste rapport", register: "formeel" },
      { nl: "Uiteindelijk beslist de school, in overleg met u.", ru: "В конечном счёте решает школа, по согласованию с вами.", key: "beslist de school", register: "formeel" },
      { nl: "Heeft u hier nog vragen over?", ru: "У вас есть ещё вопросы по этому поводу?", key: "vragen", register: "neutraal" },
      { nl: "We can go through the report in English if you prefer.", ru: "Можем разобрать табель по-английски, если вам так удобнее.", register: "switch" },
    ],
    repairIds: ["betekent", "klopt", "herhalen"],
    traps: [
      {
        wrong: "Ik denk dat zij kan doorgaan op havo.",
        right: "Ik denk dat zij op havo kan doorgaan.",
        why: "В придаточном (bijzin) все спрягаемые формы уходят в конец, а не остаются на втором месте, как в главном предложении.",
      },
      {
        wrong: "Wat betekent dit advies voor volgend jaar precies?",
        right: "Wat betekent dit advies precies voor volgend jaar?",
        why: "Уточняющее слово «precies» тяготеет к середине фразы, а не к самому концу — порядок наречий не переносится напрямую из русского.",
      },
      {
        wrong: "het advies, de niveau",
        right: "het advies, het niveau",
        why: "Оба слова — het, вопреки ощущению, что абстрактные существительные на -ie/-eau должны быть de. Артикль запоминается со словом, не по правилу.",
      },
    ],
    gate: [
      {
        word: "overstapklas",
        focus: "составное слово, три части",
        tip: "О:-вер-стап-клас. over + stap + klas — «класс перешагивания».",
      },
      {
        word: "wiskunde",
        focus: "s читается как «с», не «ш»",
        tip: "ВИС-кюн-де. Не «виш-», хотя визуально тянет к «ш».",
      },
      {
        word: "beslist",
        focus: "s + t на конце, без гласной между",
        tip: "бə-СЛИСТ, слитно, оба согласных на конце произносятся чётко.",
      },
    ],
  },
  {
    id: "sleuteloverdracht-makelaar",
    domain: "wonen",
    level: "A2",
    title: "Передача ключей от арендованной квартиры",
    context: "Встреча с агентом (makelaar) при получении ключей: осмотр квартиры и опись состояния",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Агент проведёт по квартире и будет называть состояние вещей — слушайте, что он отмечает как уже повреждённое.",
      "Попросит подписать опись состояния (opnamestaat) — проверяйте каждый пункт, а не подписывайте не глядя.",
      "Объяснит, как работает отопление, счётчики и где отключение воды на случай аварии.",
      "Назовёт контакт на случай проблем в первую неделю и напомнит про залог (borg).",
      "В конце передаст ключи и попросит расписаться в получении.",
    ],
    lines: [
      {
        nl: "Deze kras in het aanrecht was er al, toch?",
        ru: "Эта царапина на столешнице уже была, да?",
        note: "«toch» в конце — просьба подтвердить то, что вы уже подозреваете. Частый разговорный оборот.",
      },
      {
        nl: "Kunt u dat noteren op de opnamestaat?",
        ru: "Можете отметить это в описи состояния?",
      },
      {
        nl: "Hoe werkt de verwarming precies?",
        ru: "Как именно работает отопление?",
      },
      {
        nl: "Waar zit de hoofdkraan van het water?",
        ru: "Где находится основной кран воды?",
      },
      {
        nl: "Wanneer krijg ik mijn borg terug als ik vertrek?",
        ru: "Когда мне вернут залог, когда я съеду?",
        note: "«als ik vertrek» — придаточное условия, глагол в конце.",
      },
      {
        nl: "Wie bel ik als er iets kapot is deze week?",
        ru: "Кому звонить, если на этой неделе что-то сломается?",
      },
    ],
    replyBank: [
      { nl: "Loopt u met mij mee, dan wijs ik alles aan.", ru: "Пройдёмте со мной, я всё покажу.", key: "wijs ik aan", register: "neutraal" },
      { nl: "Deze schade staat al genoteerd van de vorige huurder.", ru: "Это повреждение уже отмечено от предыдущего арендатора.", key: "genoteerd", register: "formeel" },
      { nl: "Zet u hier uw paraaf bij elk punt.", ru: "Поставьте здесь визу у каждого пункта.", key: "paraaf", register: "formeel" },
      { nl: "De thermostaat regelt alle radiatoren tegelijk.", ru: "Термостат управляет всеми радиаторами одновременно.", key: "thermostaat", register: "neutraal" },
      { nl: "De hoofdkraan zit onder de gootsteen.", ru: "Основной кран под мойкой.", key: "hoofdkraan", register: "neutraal" },
      { nl: "De borg krijgt u binnen een maand na vertrek terug.", ru: "Залог вернут в течение месяца после выезда.", key: "binnen een maand", register: "formeel" },
      { nl: "Bel bij problemen dit nummer van de beheerder.", ru: "При проблемах звоните по этому номеру управляющего.", key: "beheerder", register: "formeel" },
      { nl: "Zet u hier uw handtekening voor ontvangst van de sleutels?", ru: "Распишетесь здесь в получении ключей?", key: "ontvangst", register: "formeel" },
      { nl: "Would it help if we did this part in English?", ru: "Помогло бы, если бы мы сделали эту часть по-английски?", register: "switch" },
    ],
    repairIds: ["opschrijven", "klopt", "herhalen"],
    traps: [
      {
        wrong: "Ik krijg mijn borg terug wanneer ik vertrek.",
        right: "Ik krijg mijn borg terug wanneer ik vertrek.",
        why: "На самом деле порядок здесь верный — ловушка в другом: многие переносят русское «когда» с запятой перед главным предложением и забывают, что в bijzin глагол всё равно уходит в конец: wanneer ik vertrek, не wanneer vertrek ik.",
      },
      {
        wrong: "de aanrecht, het kraan",
        right: "het aanrecht, de kraan",
        why: "Ровно наоборот интуиции: het aanrecht (столешница/кухонная стойка), de kraan (кран). Запоминать парами со словом, не логикой.",
      },
      {
        wrong: "Wie ik bel als er iets kapot is?",
        right: "Wie bel ik als er iets kapot is?",
        why: "Вопросительное слово требует глагол сразу за собой в главной части, даже когда дальше идёт придаточное условия.",
      },
    ],
    gate: [
      {
        word: "opnamestaat",
        focus: "составное слово: opname + staat",
        tip: "ОП-на:-мə-ста:т. «Акт приёма» — состояние квартиры на бумаге.",
      },
      {
        word: "thermostaat",
        focus: "th читается как обычное t",
        tip: "тер-мо-СТА:Т. Никакого «th» по-английски — это просто t.",
      },
      {
        word: "beheerder",
        focus: "долгое ee, харде безударное be-",
        tip: "бə-ХЕ:Р-дер. Управляющий домом — слово встретится ещё не раз.",
      },
    ],
  },
  {
    id: "vve-vergadering-buren",
    domain: "wonen",
    level: "B1",
    title: "Собрание жильцов (VvE) по спорным расходам",
    context: "Годовое собрание VvE (объединения собственников), спор о плате за ремонт крыши",
    minutes: 10,
    openerContext: "loket",
    brief: [
      "Председатель огласит повестку и сразу перейдёт к пункту про смету на ремонт крыши — обсуждение начнётся быстро.",
      "Кто-то из соседей выскажется против суммы — вас, скорее всего, тоже спросят напрямую про мнение.",
      "Предложат голосование: сейчас на месте, поднятием руки, а не потом письмом.",
      "Могут упомянуть резервный фонд (reservefonds) и то, хватит ли его без дополнительного взноса.",
      "В конце запишут решение в протокол и назначат срок начала работ.",
    ],
    lines: [
      {
        nl: "Ik heb een vraag over de kostenverdeling.",
        ru: "У меня вопрос о распределении расходов.",
      },
      {
        nl: "Is dit bedrag al eerder door een aannemer bevestigd?",
        ru: "Эта сумма уже была подтверждена подрядчиком раньше?",
      },
      {
        nl: "Ik ben het niet helemaal eens met dit voorstel.",
        ru: "Я не совсем согласен с этим предложением.",
        note: "«het niet eens zijn met» — устойчивая формула несогласия, гораздо мягче, чем прямое «нет».",
      },
      {
        nl: "Kunnen we eerst een tweede offerte opvragen?",
        ru: "Можем мы сначала запросить второе предложение цены?",
      },
      {
        nl: "Is het reservefonds hiervoor voldoende?",
        ru: "Резервного фонда для этого достаточно?",
      },
      {
        nl: "Ik stem voor, mits we een tweede offerte krijgen.",
        ru: "Я голосую за, при условии что мы получим второе предложение.",
        note: "«mits» — условный союз, глагол снова в конце придаточного.",
      },
    ],
    replyBank: [
      { nl: "We gaan nu stemmen over agendapunt drie.", ru: "Сейчас голосуем по третьему пункту повестки.", key: "agendapunt", register: "formeel" },
      { nl: "Deze offerte is al door twee aannemers bekeken.", ru: "Это предложение уже рассмотрели два подрядчика.", key: "offerte", register: "neutraal" },
      { nl: "Wie is er tegen dit voorstel?", ru: "Кто против этого предложения?", key: "tegen", register: "formeel" },
      { nl: "Het reservefonds dekt ongeveer zeventig procent.", ru: "Резервный фонд покрывает примерно семьдесят процентов.", key: "reservefonds", register: "formeel" },
      { nl: "Bij een tekort volgt een eenmalige bijdrage per eigenaar.", ru: "При нехватке следует единовременный взнос с каждого собственника.", key: "eenmalige bijdrage", register: "formeel" },
      { nl: "Laten we dit vastleggen in de notulen.", ru: "Давайте зафиксируем это в протоколе.", key: "notulen", register: "formeel" },
      { nl: "De werkzaamheden starten waarschijnlijk in maart.", ru: "Работы, вероятно, начнутся в марте.", key: "werkzaamheden", register: "neutraal" },
      { nl: "Heeft iemand nog een opmerking voordat we afsluiten?", ru: "У кого-то есть ещё замечание, прежде чем закончим?", key: "opmerking", register: "formeel" },
      { nl: "We could send the minutes in English too, if useful.", ru: "Можем прислать протокол и на английском, если полезно.", register: "switch" },
    ],
    repairIds: ["betekent", "klopt", "opschrijven"],
    traps: [
      {
        wrong: "Ik stem voor mits we krijgen een tweede offerte.",
        right: "Ik stem voor, mits we een tweede offerte krijgen.",
        why: "«mits» вводит придаточное — глагол уходит в конец. Порядок слов в главной части не переносится автоматически в условное предложение.",
      },
      {
        wrong: "Ik ben niet eens het met dit voorstel.",
        right: "Ik ben het niet eens met dit voorstel.",
        why: "«het eens zijn met» — застывшее сочетание с фиктивным het, которое нельзя переставлять; порядок слов здесь фиксированный, не выводится логически.",
      },
      {
        wrong: "de reservefonds, het offerte",
        right: "het reservefonds, de offerte",
        why: "Опять пара наоборот интуиции: het reservefonds (сложное het-слово на -fonds), de offerte. Заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "kostenverdeling",
        focus: "составное слово, три части",
        tip: "КОС-тен-вер-ДЕ:-линх. kosten + verdeling — распределение расходов.",
      },
      {
        word: "reservefonds",
        focus: "французское -fonds, читается «фонс»",
        tip: "ре-СЕР-вə-фонс. Конечная -ds почти не слышна, звучит ближе к «фонс».",
      },
      {
        word: "notulen",
        focus: "ударение на первый слог",
        tip: "НО:-тю-лен. Протокол собрания — слово встретится на каждом VvE.",
      },
    ],
  },
  {
    id: "eerste-werkdag-hr",
    domain: "werk",
    level: "A2",
    title: "Первый рабочий день, встреча с HR",
    context: "Разговор с HR в первый рабочий день: документы, контракт, доступы",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "HR перечислит документы, которые нужны сегодня же — паспорт, BSN, номер счёта — обычно списком подряд.",
      "Объяснят детали контракта: испытательный срок, часы, отпускные дни — быстро и по пунктам.",
      "Расскажут про доступ к системам и почте, часто со ссылкой на инструкцию, которую пришлют позже.",
      "Спросят про экстренный контакт и любые особые обстоятельства (диета, здоровье на рабочем месте).",
      "В конце проведут по офису и представят команде.",
    ],
    lines: [
      {
        nl: "Hier zijn mijn identiteitsbewijs en mijn BSN-nummer.",
        ru: "Вот мой документ, удостоверяющий личность, и номер BSN.",
      },
      {
        nl: "Hoe lang is de proeftijd precies?",
        ru: "Сколько именно длится испытательный срок?",
      },
      {
        nl: "Hoeveel vakantiedagen krijg ik per jaar?",
        ru: "Сколько отпускных дней у меня в год?",
      },
      {
        nl: "Wanneer krijg ik toegang tot mijn e-mail?",
        ru: "Когда у меня будет доступ к почте?",
      },
      {
        nl: "Mijn noodcontact is mijn partner, ik geef het nummer zo door.",
        ru: "Мой экстренный контакт — партнёр, сейчас передам номер.",
        note: "«doorgeven» — отделяемый глагол, «zo» здесь — «сейчас/скоро», не путать с «так».",
      },
    ],
    replyBank: [
      { nl: "Heeft u uw identiteitsbewijs en rekeningnummer bij zich?", ru: "У вас с собой документ и номер счёта?", key: "rekeningnummer", register: "formeel" },
      { nl: "De proeftijd is één maand, zoals in het contract staat.", ru: "Испытательный срок — один месяц, как указано в контракте.", key: "proeftijd", register: "formeel" },
      { nl: "U bouwt vijfentwintig vakantiedagen per jaar op.", ru: "Вы накапливаете двадцать пять отпускных дней в год.", key: "vakantiedagen", register: "formeel" },
      { nl: "Uw inloggegevens krijgt u morgen per e-mail.", ru: "Данные для входа вы получите завтра по почте.", key: "inloggegevens", register: "neutraal" },
      { nl: "Wie is uw contactpersoon in geval van nood?", ru: "Кто ваш контактный человек в экстренном случае?", key: "in geval van nood", register: "formeel" },
      { nl: "Heeft u dieetwensen voor de bedrijfskantine?", ru: "У вас есть пожелания по питанию для столовой?", key: "dieetwensen", register: "neutraal" },
      { nl: "Ik loop zo met u mee naar uw team.", ru: "Сейчас провожу вас к вашей команде.", key: "loop mee", register: "informeel" },
      { nl: "Let's do the contract details in English, it's more precise.", ru: "Давайте разберём детали контракта на английском, так точнее.", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven", "cijfers"],
    traps: [
      {
        wrong: "Hoeveel vakantiedagen ik krijg per jaar?",
        right: "Hoeveel vakantiedagen krijg ik per jaar?",
        why: "После вопросительного слова глагол сразу же — «krijg», подлежащее «ik» третье. Русская интонационная перестановка сюда не переносится.",
      },
      {
        wrong: "Ik geef door het nummer zo.",
        right: "Ik geef het nummer zo door.",
        why: "Отделяемый глагол geef … door: приставка door уходит в самый конец фразы, а не остаётся рядом с корнем, как подсказывает русский порядок.",
      },
      {
        wrong: "de contract, het proeftijd",
        right: "het contract, de proeftijd",
        why: "Слова на -tijd почти всегда de (de proeftijd, de vrije tijd), а het contract — просто нужно запомнить отдельно.",
      },
    ],
    gate: [
      {
        word: "inloggegevens",
        focus: "составное слово, ударение на in-",
        tip: "ИН-лог-хə-хе:-венс. Данные для входа — часто повторяемое слово в офисе.",
      },
      {
        word: "proeftijd",
        focus: "oe = /u/, ij = «эй»",
        tip: "ПРУ:Ф-тэйт. Оба гласных отдельно: долгое u, потом дифтонг ei.",
      },
      {
        word: "vakantiedagen",
        focus: "ударение на -TIE-",
        tip: "ва-КАН-си-да:-хен. -tie читается как «си», не «тие».",
      },
    ],
  },
  {
    id: "verzuim-bedrijfsarts",
    domain: "werk",
    level: "B1",
    title: "Разговор с корпоративным врачом о больничном",
    context: "Плановый разговор (verzuimgesprek) с bedrijfsarts после нескольких недель больничного",
    minutes: 10,
    openerContext: "telefoon",
    brief: [
      "Врач спросит, как вы себя чувствуете сейчас, в сравнении с началом больничного — коротко, без деталей диагноза, если не хотите их раскрывать.",
      "Обсудят, какая часть работы уже посильна и с какой нагрузкой можно вернуться (opbouw).",
      "Врач составит план (probleemanalyse/advies) и передаст его и вам, и работодателю — но не саму медицинскую информацию.",
      "Может предложить постепенное возвращение — несколько часов в день, с ростом по неделям.",
      "В конце назначат следующую встречу через несколько недель для проверки прогресса.",
    ],
    lines: [
      {
        nl: "Het gaat iets beter dan drie weken geleden.",
        ru: "Мне немного лучше, чем три недели назад.",
      },
      {
        nl: "Ik denk dat ik twee ochtenden per week aan zou kunnen.",
        ru: "Думаю, я бы справился с двумя утрами в неделю.",
        note: "«zou kunnen» — вежливое условное «мог бы», типичное для обсуждения нагрузки, а не жёсткого обещания.",
      },
      {
        nl: "Ik wil liever niet in detail treden over de diagnose.",
        ru: "Я предпочитаю не вдаваться в детали диагноза.",
      },
      {
        nl: "Wat wordt er precies doorgegeven aan mijn werkgever?",
        ru: "Что именно передаётся моему работодателю?",
      },
      {
        nl: "Kunnen we een opbouwschema afspreken?",
        ru: "Можем договориться о графике постепенного возвращения?",
      },
      {
        nl: "Wanneer spreken we elkaar weer?",
        ru: "Когда мы снова созвонимся?",
      },
    ],
    replyBank: [
      { nl: "Hoe gaat het op dit moment, in het algemeen?", ru: "Как у вас дела сейчас, в целом?", key: "in het algemeen", register: "formeel" },
      { nl: "U hoeft de diagnose niet met mij te delen als u dat niet wilt.", ru: "Вам не обязательно делиться со мной диагнозом, если не хотите.", key: "hoeft niet te delen", register: "formeel" },
      { nl: "Alleen mijn advies gaat naar de werkgever, niet de details.", ru: "Работодателю передаётся только моя рекомендация, не подробности.", key: "advies", register: "formeel" },
      { nl: "Ik stel een opbouw voor van twee naar vier uur per week.", ru: "Я предлагаю рост с двух до четырёх часов в неделю.", key: "opbouw", register: "formeel" },
      { nl: "We evalueren dit over drie weken opnieuw.", ru: "Оценим это снова через три недели.", key: "evalueren", register: "formeel" },
      { nl: "Voelt dit tempo haalbaar voor u?", ru: "Этот темп кажется вам посильным?", key: "haalbaar", register: "neutraal" },
      { nl: "Bij verslechtering neemt u meteen contact op.", ru: "При ухудшении сразу свяжитесь с нами.", key: "verslechtering", register: "formeel" },
      { nl: "Ik leg dit vast in de probleemanalyse.", ru: "Я зафиксирую это в анализе проблемы.", key: "probleemanalyse", register: "formeel" },
      { nl: "We can continue this conversation in English if you'd prefer.", ru: "Можем продолжить этот разговор по-английски, если предпочитаете.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "momentje"],
    traps: [
      {
        wrong: "Ik denk dat ik twee ochtenden per week zou kunnen aan.",
        right: "Ik denk dat ik twee ochtenden per week aan zou kunnen.",
        why: "В bijzin рамка держится строго: отделяемая частица aan и спрягаемая форма zou kunnen обе уходят в конец, в этом порядке, а не разрываются как в независимом предложении.",
      },
      {
        wrong: "Wat wordt precies doorgegeven aan mijn werkgever?",
        right: "Wat wordt er precies doorgegeven aan mijn werkgever?",
        why: "Безличное «er» нужно, когда подлежащее неопределённое и стоит не в начале — здесь это чувствуется на слух у носителей, но не выводится из русского, где формального заполнителя места нет.",
      },
      {
        wrong: "de advies, het diagnose",
        right: "het advies, de diagnose",
        why: "Снова пара наоборот интуиции. het advies — несмотря на абстрактность, de diagnose — несмотря на схожесть с het advies по смыслу.",
      },
    ],
    gate: [
      {
        word: "opbouwschema",
        focus: "составное слово, ou = «ау»",
        tip: "ОП-бау-схе:-ма. opbouw + schema — график постепенного роста нагрузки.",
      },
      {
        word: "probleemanalyse",
        focus: "долгое ee в -bleem-",
        tip: "про-БЛЕ:М-а-на-ли-зə. Ударение на bleem, второе — на -ly-.",
      },
      {
        word: "verslechtering",
        focus: "харде G, ударение на -SLECH-",
        tip: "вер-СЛЕХ-тə-ринх. Харде G в середине слова, не смягчайте её.",
      },
    ],
  },
  {
    id: "kapper-afspraak",
    domain: "dagelijks",
    level: "A1",
    title: "Запись к парикмахеру",
    context: "Звонок или визит в парикмахерскую: запись на стрижку и объяснение, что нужно",
    minutes: 5,
    openerContext: "winkel",
    brief: [
      "Спросят, на какой день и время вам удобно, и предложат ближайшие варианты, если ваш день занят.",
      "Уточнят, что именно нужно: стрижка, укладка, окрашивание — отвечайте одним-двумя словами.",
      "В кресле спросят, насколько коротко и какой длины оставить — показывайте руками, если не хватает слов.",
      "В конце назовут сумму и спросят про чаевые или карту постоянного клиента.",
    ],
    lines: [
      {
        nl: "Ik wil graag een afspraak maken voor een knipbeurt.",
        ru: "Я хотел бы записаться на стрижку.",
      },
      {
        nl: "Heeft u ook donderdagavond nog plek?",
        ru: "У вас есть место ещё в четверг вечером?",
      },
      {
        nl: "Gewoon kort aan de zijkanten, iets langer bovenop.",
        ru: "Просто коротко по бокам, чуть длиннее сверху.",
        note: "«bovenop» — «сверху», слитное наречие места, часто встречается в описаниях стрижки.",
      },
      {
        nl: "Niet te kort, alstublieft.",
        ru: "Не слишком коротко, пожалуйста.",
      },
      {
        nl: "Hoeveel ben ik u schuldig?",
        ru: "Сколько с меня?",
        note: "Разговорная формула, буквально «сколько я вам должен» — вежливее, чем прямое «сколько стоит».",
      },
    ],
    replyBank: [
      { nl: "Welke dag komt u het beste uit?", ru: "Какой день вам удобнее всего?", key: "komt u uit", register: "neutraal" },
      { nl: "Wilt u alleen knippen, of ook wassen en föhnen?", ru: "Только стрижка, или ещё мытьё и укладка?", key: "wassen en föhnen", register: "neutraal" },
      { nl: "Hoe kort mag het aan de zijkanten?", ru: "Насколько коротко можно по бокам?", key: "zijkanten", register: "informeel" },
      { nl: "Zal ik de contouren ook even bijwerken?", ru: "Мне также подровнять контуры?", key: "bijwerken", register: "informeel" },
      { nl: "Dat wordt dan tweeëndertig euro.", ru: "С вас тридцать два евро.", key: "tweeëndertig", register: "neutraal" },
      { nl: "Wilt u volgende keer gelijk weer een afspraak maken?", ru: "Хотите сразу записаться на следующий раз?", key: "volgende keer", register: "informeel" },
      { nl: "Heeft u een klantenkaart bij ons?", ru: "У вас есть наша карта постоянного клиента?", key: "klantenkaart", register: "neutraal" },
      { nl: "Happy to explain the style options in English too.", ru: "С радостью объясню варианты стрижки и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "cijfers"],
    traps: [
      {
        wrong: "Ik wil maken een afspraak.",
        right: "Ik wil een afspraak maken.",
        why: "Инфинитив в двусоставном сказуемом (wil + инфинитив) уходит в конец фразы целиком, а дополнение встаёт перед ним — не после первого глагола, как в русском.",
      },
      {
        wrong: "de zijkant, het knipbeurt",
        right: "de zijkant, de knipbeurt",
        why: "Оба слова — de, несмотря на то что «beurt» кажется нейтральным по звучанию. Артикль держится за словом, не за смыслом.",
      },
      {
        wrong: "Hoeveel ik ben u schuldig?",
        right: "Hoeveel ben ik u schuldig?",
        why: "После вопросительного слова сразу глагол «ben», подлежащее «ik» — следом. Порядок фиксирован независимо от длины фразы.",
      },
    ],
    gate: [
      {
        word: "knipbeurt",
        focus: "eu = /øː/ передний огублённый",
        tip: "КНИП-бёрт. eu — звук, которого нет в русском: округлите губы как для «о», но произнесите «э».",
      },
      {
        word: "zijkanten",
        focus: "ij = дифтонг «эй»",
        tip: "ЗЭЙ-кан-тен. Бока головы при стрижке — слово почти всегда во множественном числе.",
      },
      {
        word: "föhnen",
        focus: "ö как в немецком, /øː/",
        tip: "ФЁ:-нен. Заимствовано из немецкого целиком вместе со звуком — сушить феном.",
      },
    ],
  },
  {
    id: "fietsenmaker-reparatie",
    domain: "dagelijks",
    level: "A2",
    title: "Ремонт велосипеда",
    context: "Визит в мастерскую fietsenmaker: спущенное колесо и скрипящие тормоза",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "Мастер быстро осмотрит велосипед и назовёт находки на ходу, часто технический жаргон.",
      "Спросит, чинить сейчас на месте (подождать) или оставить на день.",
      "Назовёт цену за каждую отдельную работу, а не общую сумму сразу.",
      "В конце проверит, крутятся ли колёса и работают ли тормоза, прежде чем отдать велосипед.",
    ],
    lines: [
      {
        nl: "Mijn achterband is lek en mijn remmen piepen.",
        ru: "У меня спущено заднее колесо и скрипят тормоза.",
        note: "«lek» — «спущенный/дырявый», ключевое слово для любой веломастерской.",
      },
      {
        nl: "Kan dit vandaag nog, of moet ik hem hier laten?",
        ru: "Это можно сегодня же, или мне оставить его здесь?",
      },
      {
        nl: "Wat gaat dat ongeveer kosten, alles bij elkaar?",
        ru: "Сколько это будет стоить примерно, всё вместе?",
      },
      {
        nl: "Kunt u ook meteen de kettingkast checken?",
        ru: "Можете заодно проверить защиту цепи?",
      },
      {
        nl: "Hoe laat kan ik hem ophalen?",
        ru: "Во сколько мне его забрать?",
      },
    ],
    replyBank: [
      { nl: "Uw band is inderdaad lek, ik zie een scheur.", ru: "У вас действительно спущено, вижу разрыв.", key: "scheur", register: "informeel" },
      { nl: "De remblokjes zijn helemaal versleten.", ru: "Тормозные колодки совсем стёрты.", key: "versleten", register: "neutraal" },
      { nl: "Dit kan ik er zo tussendoor doen, over een half uur klaar.", ru: "Это могу сделать сейчас между делом, готово через полчаса.", key: "tussendoor", register: "informeel" },
      { nl: "Een nieuwe band kost vijftien euro, plakken kan ook.", ru: "Новая камера — пятнадцать евро, можно и заклеить.", key: "plakken", register: "neutraal" },
      { nl: "De kettingkast zit los, dat maak ik gratis even vast.", ru: "Защита цепи разболталась, я это бесплатно подкручу.", key: "kettingkast", register: "informeel" },
      { nl: "Alles bij elkaar wordt het vijfendertig euro.", ru: "Всё вместе — тридцать пять евро.", key: "alles bij elkaar", register: "neutraal" },
      { nl: "U kunt hem over een half uur ophalen.", ru: "Забрать можно через полчаса.", key: "over een half uur", register: "neutraal" },
      { nl: "I can go through the repairs in English if you like.", ru: "Могу разобрать ремонт по-английски, если хотите.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "betekent"],
    traps: [
      {
        wrong: "Kan dit vandaag, of ik moet hem hier laten?",
        right: "Kan dit vandaag, of moet ik hem hier laten?",
        why: "После союза «of» во втором вопросе порядок вопросительный сохраняется: глагол перед подлежащим, а не как в утвердительном предложении.",
      },
      {
        wrong: "de band, het kettingkast",
        right: "de band, de kettingkast",
        why: "Оба de: de band, de kettingkast (составное слово наследует род от kast). Составные слова в нидерландском берут артикль последней части.",
      },
      {
        wrong: "Ik moet hem hier te laten.",
        right: "Ik moet hem hier laten.",
        why: "После «moeten + инфинитив» частица te не нужна — это модальный глагол, в отличие от оборотов «om … te». Лишняя te сюда просто не ставится.",
      },
    ],
    gate: [
      {
        word: "kettingkast",
        focus: "составное слово, ke- безударное",
        tip: "КЕ-тинх-каст. ketting + kast — защита цепи, часто просто «kast» в разговоре.",
      },
      {
        word: "remblokjes",
        focus: "уменьшительное -jes, короткая o",
        tip: "РЕМ-блок-йəс. Тормозные колодки — уменьшительное здесь не про размер, а обычное название детали.",
      },
      {
        word: "versleten",
        focus: "ударение на -SLE-",
        tip: "вер-СЛЕ:-тен. «Стёртый/изношенный» — от глагола slijten.",
      },
    ],
  },
  // ───────────────────────── ЧЕТВЁРТАЯ ПАРТИЯ: A1 ─────────────────────────
  {
    id: "afspraak-gemeente-telefonisch",
    domain: "bureaucratie",
    level: "A1",
    title: "Запись на приём в gemeente по телефону",
    context: "Звонок в муниципалитет, чтобы записаться на приём — своей очереди на сайте нет",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Автоответчик предложит выбрать тему нажатием цифры — слушайте до конца.",
      "Оператор спросит, по какому вопросу вы звоните, и предложит ближайшие даты.",
      "Уточнит ваше имя и номер BSN или дату рождения для записи.",
      "В конце назовёт дату, время и что взять с собой.",
    ],
    lines: [
      {
        nl: "Goedemiddag, ik wil graag een afspraak maken.",
        ru: "Добрый день, я хотел бы записаться на приём.",
      },
      {
        nl: "Het gaat over mijn inschrijving.",
        ru: "Речь о моей регистрации.",
      },
      {
        nl: "Mijn naam is... en mijn geboortedatum is...",
        ru: "Меня зовут... и моя дата рождения...",
      },
      {
        nl: "Heeft u ook een eerdere datum?",
        ru: "У вас есть дата пораньше?",
      },
      {
        nl: "Wat moet ik meenemen?",
        ru: "Что мне взять с собой?",
      },
    ],
    replyBank: [
      { nl: "Waarover gaat uw vraag?", ru: "По какому вопросу?", key: "waarover", register: "neutraal" },
      { nl: "Wat is uw geboortedatum?", ru: "Ваша дата рождения?", key: "geboortedatum", register: "formeel" },
      { nl: "De eerstvolgende afspraak is donderdag om tien uur.", ru: "Ближайший приём — в четверг в десять.", key: "eerstvolgende", register: "neutraal" },
      { nl: "Neemt u een geldig identiteitsbewijs mee.", ru: "Возьмите с собой действующий документ.", key: "identiteitsbewijs", register: "formeel" },
      { nl: "Ik stuur u een bevestiging per e-mail.", ru: "Отправлю вам подтверждение по почте.", key: "bevestiging", register: "neutraal" },
      { nl: "Wilt u dat ik het nummer herhaal?", ru: "Повторить номер?", key: "herhaal", register: "informeel" },
      { nl: "Kunt u uw achternaam spellen?", ru: "Продиктуйте фамилию по буквам?", key: "spellen", register: "formeel" },
      { nl: "We can also do this call in English.", ru: "Можем провести этот звонок и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "spellen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil maken een afspraak.",
        right: "Ik wil een afspraak maken.",
        why: "Инфинитив в двусоставном сказуемом уходит в конец фразы целиком, дополнение встаёт перед ним.",
      },
      {
        wrong: "Wat ik moet meenemen?",
        right: "Wat moet ik meenemen?",
        why: "После вопросительного слова сразу глагол, подлежащее — третьим.",
      },
    ],
    gate: [
      {
        word: "afspraak",
        focus: "ударение на -SPRAAK",
        tip: "аф-СПРА:К. Долгое aa, слово встретится в каждом разговоре о записи.",
      },
      {
        word: "eerstvolgende",
        focus: "составное слово",
        tip: "Е:РСТ-вол-хен-де. eerst + volgende — «ближайший следующий».",
      },
    ],
  },
  {
    id: "adresverandering-doorgeven",
    domain: "bureaucratie",
    level: "A1",
    title: "Сообщить о смене адреса",
    context: "Звонок или визит в gemeente после переезда — нужно передать новый адрес",
    minutes: 5,
    openerContext: "loket",
    brief: [
      "Спросят старый и новый адрес и дату переезда.",
      "Уточнят, кто ещё переезжает вместе с вами — по BRP это указывается для всех членов семьи.",
      "Могут спросить название и телефон нового арендодателя.",
      "В конце скажут, когда изменение вступит в силу и что придёт письмо.",
    ],
    lines: [
      {
        nl: "Ik wil een verhuizing doorgeven.",
        ru: "Я хочу сообщить о переезде.",
        note: "«doorgeven» — отделяемый глагол, частица встаёт в конец.",
      },
      {
        nl: "Mijn nieuwe adres is...",
        ru: "Мой новый адрес...",
      },
      {
        nl: "Ik verhuis op de eerste van volgende maand.",
        ru: "Я переезжаю первого числа следующего месяца.",
      },
      {
        nl: "Verhuist mijn partner ook mee?",
        ru: "Мой партнёр тоже переезжает?",
        note: "На самом деле это не вопрос, а подтверждение факта: «Ja, mijn partner verhuist ook mee».",
      },
      {
        nl: "Wanneer gaat dit in?",
        ru: "Когда это вступит в силу?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw nieuwe adres?", ru: "Ваш новый адрес?", key: "nieuwe adres", register: "formeel" },
      { nl: "Per wanneer verhuist u?", ru: "С какого числа переезжаете?", key: "per wanneer", register: "neutraal" },
      { nl: "Verhuizen er nog andere gezinsleden mee?", ru: "Переезжают ли с вами другие члены семьи?", key: "gezinsleden", register: "formeel" },
      { nl: "Dit gaat morgen al in.", ru: "Это вступит в силу уже завтра.", key: "gaat in", register: "neutraal" },
      { nl: "U krijgt hierover nog een brief.", ru: "Об этом вам ещё придёт письмо.", key: "brief", register: "formeel" },
      { nl: "Kunt u dat nog een keer zeggen?", ru: "Можете повторить ещё раз?", key: "nog een keer", register: "informeel" },
      { nl: "Shall we continue in English?", ru: "Продолжим по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil doorgeven een verhuizing.",
        right: "Ik wil een verhuizing doorgeven.",
        why: "Дополнение встаёт перед инфинитивом отделяемого глагола, а не после него.",
      },
      {
        wrong: "het adres, de verhuizing",
        right: "het adres, de verhuizing",
        why: "Оба слова запоминаются целиком со своим артиклем: het adres, de verhuizing — совпадение, а не правило.",
      },
    ],
    gate: [
      {
        word: "doorgeven",
        focus: "sch? нет — обычное g",
        tip: "ДО:Р-хе:-вен. Отделяемый глагол: ik geef door.",
      },
      {
        word: "gezinsleden",
        focus: "составное слово",
        tip: "хə-ЗИНС-ле:-ден. gezin + leden — члены семьи.",
      },
    ],
  },
  {
    id: "uittreksel-brp-aanvragen",
    domain: "bureaucratie",
    level: "A1",
    title: "Заказать выписку из BRP",
    context: "Визит или звонок в gemeente за выпиской из реестра для работодателя или банка",
    minutes: 5,
    openerContext: "loket",
    brief: [
      "Спросят, для чего нужна выписка — работодатель, банк, школа — формулировка может отличаться.",
      "Уточнят, нужна ли выписка на русском или английском, если такая есть, — обычно только на нидерландском.",
      "Назовут стоимость и способ оплаты.",
      "Скажут, можно получить сразу или нужно ждать по почте.",
    ],
    lines: [
      {
        nl: "Ik wil graag een uittreksel uit de BRP aanvragen.",
        ru: "Я хотел бы заказать выписку из BRP.",
      },
      {
        nl: "Het is voor mijn werkgever.",
        ru: "Это для моего работодателя.",
      },
      {
        nl: "Kan ik het meteen meekrijgen?",
        ru: "Могу я получить её сразу?",
      },
      {
        nl: "Hoeveel kost dat?",
        ru: "Сколько это стоит?",
      },
      {
        nl: "Kan ik met pin betalen?",
        ru: "Можно оплатить картой?",
      },
    ],
    replyBank: [
      { nl: "Waarvoor heeft u het uittreksel nodig?", ru: "Для чего вам нужна выписка?", key: "uittreksel", register: "formeel" },
      { nl: "Dat kost vijftien euro vijftig.", ru: "Это стоит пятнадцать пятьдесят.", key: "vijftien euro", register: "neutraal" },
      { nl: "U kunt het direct meenemen.", ru: "Можете забрать сразу.", key: "direct meenemen", register: "neutraal" },
      { nl: "Alleen pinnen kan hier, geen contant.", ru: "Только картой, наличными нельзя.", key: "pinnen", register: "formeel" },
      { nl: "Wilt u het in het Nederlands of Engels?", ru: "На нидерландском или английском?", key: "Nederlands of Engels", register: "neutraal" },
      { nl: "Kunt u dat nog eens herhalen?", ru: "Повторите, пожалуйста?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "Могу объяснить это и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt", "cijfers"],
    traps: [
      {
        wrong: "Ik wil aanvragen een uittreksel.",
        right: "Ik wil een uittreksel aanvragen.",
        why: "Дополнение перед инфинитивом, не после него — тот же порядок, что и во всех подобных оборотах.",
      },
      {
        wrong: "de uittreksel",
        right: "het uittreksel",
        why: "het uittreksel — только запоминание, без правила.",
      },
    ],
    gate: [
      {
        word: "uittreksel",
        focus: "ui = /œy/",
        tip: "ЁЙТ-трек-сел. ui — трудный звук, которого нет в русском: округлите губы и произнесите «эй» глубже.",
      },
      {
        word: "werkgever",
        focus: "харде G дважды",
        tip: "ВЕРК-хе:-вер. Оба g — работодатель.",
      },
    ],
  },
  {
    id: "rijbewijs-omwisselen",
    domain: "bureaucratie",
    level: "A1",
    title: "Обменять иностранные права",
    context: "Визит в gemeente для обмена иностранного водительского удостоверения",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Спросят, из какой страны ваши права и когда вы переехали — от этого зависит, нужен ли экзамен.",
      "Попросят оригинал прав, паспорт и фото.",
      "Предупредят, что старые права придётся сдать — заберут при обмене.",
      "Назовут срок изготовления новых прав и стоимость.",
    ],
    lines: [
      {
        nl: "Ik wil mijn rijbewijs omwisselen.",
        ru: "Я хочу обменять свои права.",
      },
      {
        nl: "Mijn rijbewijs komt uit Rusland.",
        ru: "Мои права из России.",
      },
      {
        nl: "Moet ik daarvoor examen doen?",
        ru: "Мне нужно для этого сдавать экзамен?",
      },
      {
        nl: "Krijg ik mijn oude rijbewijs terug?",
        ru: "Мне вернут мои старые права?",
      },
      {
        nl: "Hoe lang duurt het?",
        ru: "Сколько это займёт?",
      },
    ],
    replyBank: [
      { nl: "Uit welk land komt uw rijbewijs?", ru: "Из какой страны ваши права?", key: "welk land", register: "formeel" },
      { nl: "Voor dit land moet u opnieuw examen doen.", ru: "Для этой страны нужно заново сдавать экзамен.", key: "opnieuw examen", register: "neutraal" },
      { nl: "Uw oude rijbewijs wordt ingenomen.", ru: "Ваши старые права заберут.", key: "ingenomen", register: "formeel" },
      { nl: "Het nieuwe rijbewijs duurt ongeveer twee weken.", ru: "Новые права будут готовы примерно через две недели.", key: "twee weken", register: "neutraal" },
      { nl: "Heeft u een pasfoto bij u?", ru: "Фото с собой?", key: "pasfoto", register: "neutraal" },
      { nl: "Kunt u dat wat langzamer zeggen?", ru: "Можете сказать помедленнее?", key: "langzamer", register: "informeel" },
      { nl: "Let's continue in English if that's easier.", ru: "Продолжим по-английски, если так проще.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt"],
    traps: [
      {
        wrong: "Ik wil omwisselen mijn rijbewijs.",
        right: "Ik wil mijn rijbewijs omwisselen.",
        why: "Отделяемый глагол в неопределённой форме держится целиком в конце, дополнение перед ним.",
      },
      {
        wrong: "het rijbewijs, de examen",
        right: "het rijbewijs, het examen",
        why: "Оба слова — het: het rijbewijs, het examen. Заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "rijbewijs",
        focus: "ij = «эй», харде? нет",
        tip: "РЭЙ-бə-вэйс. Оба ij в слове — дифтонг «эй».",
      },
      {
        word: "ingenomen",
        focus: "ударение на -NO-",
        tip: "ин-хə-НО:-мен. Причастие от innemen — забрать/изъять.",
      },
    ],
  },
  {
    id: "huisarts-telefonisch-consult",
    domain: "gezondheid",
    level: "A1",
    title: "Телефонная консультация с терапевтом",
    context: "Звонок в приёмную huisarts за телефонной консультацией по несерьёзному недомоганию",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Ассистентка спросит имя, дату рождения и жалобу — коротко, по делу.",
      "Может дать совет по телефону сразу, без визита.",
      "Если нужно — предложит позвонить врачу перезвонить в течение дня.",
      "В конце уточнит, куда и когда обращаться, если не станет лучше.",
    ],
    lines: [
      {
        nl: "Goedemorgen, ik heb een vraag voor de huisarts.",
        ru: "Доброе утро, у меня вопрос к терапевту.",
      },
      {
        nl: "Ik heb al twee dagen hoofdpijn.",
        ru: "У меня уже два дня болит голова.",
      },
      {
        nl: "Moet ik langskomen of kan het telefonisch?",
        ru: "Мне нужно прийти, или можно по телефону?",
      },
      {
        nl: "Wanneer belt de dokter terug?",
        ru: "Когда перезвонит врач?",
      },
      {
        nl: "Wat moet ik doen als het erger wordt?",
        ru: "Что делать, если станет хуже?",
      },
    ],
    replyBank: [
      { nl: "Wat zijn uw klachten precies?", ru: "Какие именно у вас жалобы?", key: "klachten", register: "formeel" },
      { nl: "Sinds wanneer heeft u hier last van?", ru: "С каких пор это беспокоит?", key: "sinds wanneer", register: "neutraal" },
      { nl: "De dokter belt u vandaag nog terug.", ru: "Врач перезвонит вам сегодня же.", key: "belt terug", register: "formeel" },
      { nl: "Neem twee keer per dag een paracetamol.", ru: "Принимайте парацетамол два раза в день.", key: "paracetamol", register: "neutraal" },
      { nl: "Bel ons opnieuw als het niet overgaat.", ru: "Позвоните нам снова, если не пройдёт.", key: "opnieuw", register: "formeel" },
      { nl: "Kunt u dat wat langzamer herhalen?", ru: "Повторите чуть медленнее?", key: "langzamer herhalen", register: "informeel" },
      { nl: "Should I explain this in English instead?", ru: "Мне объяснить это по-английски?", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "Ik heb hoofdpijn sinds twee dagen.",
        right: "Ik heb al twee dagen hoofdpijn.",
        why: "Длительность до настоящего момента выражается через «al + период», а не через «sinds + число» без даты начала.",
      },
      {
        wrong: "de hoofdpijn, het klacht",
        right: "de hoofdpijn, de klacht",
        why: "Оба слова de: de hoofdpijn, de klacht. Запоминать со словом.",
      },
    ],
    gate: [
      {
        word: "hoofdpijn",
        focus: "долгое oo",
        tip: "ХО:ФТ-пэйн. Составное: hoofd (голова) + pijn (боль).",
      },
      {
        word: "klachten",
        focus: "харде G перед t",
        tip: "КЛАХ-тен. Жалобы — слово встретится в каждом медицинском разговоре.",
      },
    ],
  },
  {
    id: "recept-herhalen",
    domain: "gezondheid",
    level: "A1",
    title: "Заказать повторный рецепт в аптеке",
    context: "Звонок или визит в apotheek для повторного заказа лекарства по рецепту",
    minutes: 4,
    openerContext: "winkel",
    brief: [
      "Спросят имя, дату рождения и название лекарства — держите упаковку под рукой.",
      "Уточнят, выписывал ли рецепт huisarts или специалист.",
      "Скажут, когда лекарство будет готово — сразу или на следующий день.",
      "Могут спросить, нужна ли доставка или заберёте сами.",
    ],
    lines: [
      {
        nl: "Ik wil graag mijn recept laten herhalen.",
        ru: "Я хотел бы повторно заказать рецепт.",
      },
      {
        nl: "Het gaat om deze medicijnen.",
        ru: "Речь об этих лекарствах.",
      },
      {
        nl: "Wanneer kan ik het ophalen?",
        ru: "Когда можно забрать?",
      },
      {
        nl: "Kan het ook bezorgd worden?",
        ru: "Можно ли это доставить?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw geboortedatum?", ru: "Ваша дата рождения?", key: "geboortedatum", register: "formeel" },
      { nl: "Welke medicijnen bedoelt u precies?", ru: "Какие именно лекарства вы имеете в виду?", key: "welke medicijnen", register: "neutraal" },
      { nl: "Dat is morgen na twaalf uur klaar.", ru: "Будет готово завтра после двенадцати.", key: "na twaalf uur", register: "neutraal" },
      { nl: "Bezorgen kan, dat kost twee euro extra.", ru: "Доставка возможна, это два евро дополнительно.", key: "bezorgen", register: "formeel" },
      { nl: "Heeft u nog medicijnen over?", ru: "У вас ещё остались лекарства?", key: "over", register: "informeel" },
      { nl: "Kunt u dat even spellen?", ru: "Продиктуйте по буквам?", key: "spellen", register: "informeel" },
      { nl: "Happy to switch to English if needed.", ru: "С радостью перейду на английский, если нужно.", register: "switch" },
    ],
    repairIds: ["spellen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil herhalen mijn recept.",
        right: "Ik wil mijn recept laten herhalen.",
        why: "«Заказать повторно» по-нидерландски идёт через laten + инфинитив, дополнение перед обоими глаголами.",
      },
      {
        wrong: "de medicijn, het recept",
        right: "het medicijn, het recept",
        why: "Оба het: het medicijn, het recept.",
      },
    ],
    gate: [
      {
        word: "herhalen",
        focus: "ударение на -HA-",
        tip: "хер-ХА:-лен. Повторять — часто нужное слово в любом разговоре.",
      },
      {
        word: "bezorgen",
        focus: "харде G",
        tip: "бə-ЗОР-хен. Доставлять.",
      },
    ],
  },
  {
    id: "bloedprikken-afspraak",
    domain: "gezondheid",
    level: "A1",
    title: "Запись на сдачу крови",
    context: "Запись или визит в лабораторию (prikpost) для сдачи анализа крови по направлению врача",
    minutes: 5,
    openerContext: "loket",
    brief: [
      "На ресепшн спросят направление от врача и документ, удостоверяющий личность.",
      "Спросят, нужно ли приходить натощак — важная деталь, уточните заранее.",
      "После взятия крови объяснят, когда и как узнать результат.",
      "В конце дадут наклейку или карточку с номером для следующего визита.",
    ],
    lines: [
      {
        nl: "Ik heb een afspraak voor bloedprikken.",
        ru: "У меня запись на сдачу крови.",
      },
      {
        nl: "Hier is mijn verwijzing van de huisarts.",
        ru: "Вот моё направление от терапевта.",
      },
      {
        nl: "Moet ik nuchter zijn?",
        ru: "Мне нужно быть натощак?",
      },
      {
        nl: "Wanneer krijg ik de uitslag?",
        ru: "Когда я получу результат?",
      },
    ],
    replyBank: [
      { nl: "Heeft u een verwijzing bij zich?", ru: "У вас с собой направление?", key: "verwijzing", register: "formeel" },
      { nl: "Bent u nuchter naar binnen gekomen?", ru: "Вы пришли натощак?", key: "nuchter", register: "neutraal" },
      { nl: "De uitslag staat over drie dagen online.", ru: "Результат появится онлайн через три дня.", key: "drie dagen", register: "formeel" },
      { nl: "Rolt u uw mouw even op.", ru: "Закатайте, пожалуйста, рукав.", key: "mouw", register: "informeel" },
      { nl: "Kunt u uw naam nog een keer zeggen?", ru: "Назовите имя ещё раз?", key: "nog een keer", register: "informeel" },
      { nl: "We can do this in English too, no problem.", ru: "Можем и по-английски, без проблем.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt"],
    traps: [
      {
        wrong: "Ik ben nuchter gekomen naar binnen.",
        right: "Ik ben nuchter naar binnen gekomen.",
        why: "Рамочная конструкция: причастие gekomen уходит в самый конец, обстоятельство naar binnen — перед ним.",
      },
      {
        wrong: "de uitslag, het mouw",
        right: "de uitslag, de mouw",
        why: "Оба de: de uitslag (результат), de mouw (рукав).",
      },
    ],
    gate: [
      {
        word: "nuchter",
        focus: "харде G перед t",
        tip: "НЮХ-тер. Натощак — специфичное слово именно для медицинских анализов.",
      },
      {
        word: "verwijzing",
        focus: "ij = «эй»",
        tip: "вер-ВЭЙ-зинх. Направление от врача.",
      },
    ],
  },
  {
    id: "schoolfoto-toestemming",
    domain: "school",
    level: "A1",
    title: "Согласие на школьное фото",
    context: "Короткий разговор с учителем о согласии на школьную фотосъёмку и публикацию фото",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Учитель напомнит про день школьной фотосессии и спросит, нужен ли отдельный портрет.",
      "Спросит, разрешаете ли вы публиковать фото ребёнка на сайте школы.",
      "Могут спросить про братьев/сестёр — есть семейное фото за отдельную плату.",
      "В конце скажут, когда будут готовы фото и как их заказать.",
    ],
    lines: [
      {
        nl: "Mag mijn kind ook een individuele foto?",
        ru: "Может ли мой ребёнок сделать индивидуальное фото?",
      },
      {
        nl: "Ik geef geen toestemming voor de website.",
        ru: "Я не даю согласие на сайт.",
        note: "Прямой, но вежливый отказ — здесь не нужно долго объяснять причину.",
      },
      {
        nl: "Wanneer zijn de foto's klaar?",
        ru: "Когда будут готовы фото?",
      },
      {
        nl: "Hoe kan ik ze bestellen?",
        ru: "Как их заказать?",
      },
    ],
    replyBank: [
      { nl: "Wilt u ook een gezinsfoto erbij?", ru: "Хотите ещё и семейное фото?", key: "gezinsfoto", register: "informeel" },
      { nl: "Geeft u toestemming voor de schoolwebsite?", ru: "Даёте согласие на публикацию на сайте школы?", key: "toestemming", register: "formeel" },
      { nl: "De foto's zijn over twee weken klaar.", ru: "Фото будут готовы через две недели.", key: "twee weken", register: "neutraal" },
      { nl: "U bestelt ze via een link die u thuis krijgt.", ru: "Заказать можно по ссылке, которую пришлют домой.", key: "link", register: "informeel" },
      { nl: "Kunt u dat op papier zetten?", ru: "Можете написать это на бумаге?", key: "op papier", register: "informeel" },
      { nl: "I can send you the details in English too.", ru: "Могу прислать детали и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "klopt"],
    traps: [
      {
        wrong: "Ik geef niet toestemming.",
        right: "Ik geef geen toestemming.",
        why: "Отрицание существительного идёт через geen, не через niet — «согласия» здесь нет вовсе, а не «не согласен».",
      },
      {
        wrong: "de foto, het toestemming",
        right: "de foto, de toestemming",
        why: "Оба de: de foto, de toestemming.",
      },
    ],
    gate: [
      {
        word: "toestemming",
        focus: "ударение на -STEM-",
        tip: "ту-СТЕ-минх. Согласие — ключевое слово в разговорах со школой.",
      },
      {
        word: "gezinsfoto",
        focus: "составное слово",
        tip: "хə-ЗИНС-фо:-то. gezin + foto — семейное фото.",
      },
    ],
  },
  {
    id: "oudercommissie-uitnodiging",
    domain: "school",
    level: "A1",
    title: "Приглашение в родительский комитет",
    context: "Короткий разговор с учителем или другим родителем — приглашение вступить в родительский комитет",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Спросят, есть ли у вас время помогать с организацией школьных мероприятий.",
      "Объяснят, сколько встреч в год и сколько часов это занимает.",
      "Могут спросить, с чем конкретно вы готовы помочь — праздники, экскурсии, сбор денег.",
      "В конце дадут контакт, чтобы записаться или подумать.",
    ],
    lines: [
      {
        nl: "Hoeveel tijd kost dit ongeveer?",
        ru: "Сколько времени это примерно занимает?",
      },
      {
        nl: "Ik wil er graag over nadenken.",
        ru: "Я хотел бы об этом подумать.",
      },
      {
        nl: "Waarmee kan ik helpen?",
        ru: "С чем я могу помочь?",
      },
      {
        nl: "Kan ik u later dit antwoorden?",
        ru: "Могу я ответить вам позже?",
      },
    ],
    replyBank: [
      { nl: "We vergaderen zes keer per jaar.", ru: "Мы собираемся шесть раз в год.", key: "zes keer", register: "informeel" },
      { nl: "U kunt helpen bij het sinterklaasfeest.", ru: "Можете помочь с праздником Синтерклааса.", key: "sinterklaasfeest", register: "informeel" },
      { nl: "Denkt u er rustig over na.", ru: "Подумайте спокойно.", key: "rustig nadenken", register: "informeel" },
      { nl: "Hier is mijn nummer, appt u mij gerust.", ru: "Вот мой номер, пишите смело.", key: "appt u", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Можете объяснить ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I can explain the details in English if that helps.", ru: "Могу объяснить детали по-английски, если это поможет.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "momentje"],
    traps: [
      {
        wrong: "Ik wil nadenken over er.",
        right: "Ik wil er graag over nadenken.",
        why: "«er» + предлог: er встаёт перед предлогом over, а не после — целиком erover разбивается словом graag внутри фразы.",
      },
      {
        wrong: "het feest, de nummer",
        right: "het feest, het nummer",
        why: "Оба het: het feest, het nummer.",
      },
    ],
    gate: [
      {
        word: "vergaderen",
        focus: "ударение на -GA-",
        tip: "вер-ХА:-де-рен. Собираться на встречу/совещание.",
      },
      {
        word: "sinterklaasfeest",
        focus: "составное слово",
        tip: "СИН-тер-кла:с-фе:ст. Один из главных праздников года в Нидерландах.",
      },
    ],
  },
  {
    id: "schoolzwemmen-aanmelding",
    domain: "school",
    level: "A1",
    title: "Запись на школьное плавание",
    context: "Разговор в школе о записи ребёнка на schoolzwemmen — уроки плавания в рамках школьной программы",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Спросят, умеет ли ребёнок уже плавать и есть ли у него диплом A/B.",
      "Уточнят день недели занятий и что взять с собой — купальник, полотенце, шапочку.",
      "Могут спросить про освобождение по медицинским причинам.",
      "В конце скажут стоимость и способ оплаты — обычно через школу.",
    ],
    lines: [
      {
        nl: "Mijn kind kan nog niet zwemmen.",
        ru: "Мой ребёнок ещё не умеет плавать.",
      },
      {
        nl: "Wat moet ze meenemen?",
        ru: "Что ей взять с собой?",
      },
      {
        nl: "Is er een uitzondering mogelijk om medische redenen?",
        ru: "Возможно ли исключение по медицинским причинам?",
      },
      {
        nl: "Hoe en wanneer betaal ik hiervoor?",
        ru: "Как и когда мне за это заплатить?",
      },
    ],
    replyBank: [
      { nl: "Heeft uw kind al een zwemdiploma?", ru: "У вашего ребёнка уже есть диплом по плаванию?", key: "zwemdiploma", register: "neutraal" },
      { nl: "Ze moet een badpak, handdoek en badmuts meenemen.", ru: "Ей нужно взять купальник, полотенце и шапочку.", key: "badmuts", register: "informeel" },
      { nl: "Bij medische redenen kan een uitzondering.", ru: "По медицинским причинам возможно исключение.", key: "uitzondering", register: "formeel" },
      { nl: "De betaling loopt via de schoolapp.", ru: "Оплата проходит через школьное приложение.", key: "schoolapp", register: "neutraal" },
      { nl: "Kunt u dat opschrijven voor mij?", ru: "Можете это для меня записать?", key: "opschrijven", register: "informeel" },
      { nl: "I'm happy to write it down in English too.", ru: "С радостью запишу это и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "betekent"],
    traps: [
      {
        wrong: "Mijn kind kan zwemmen nog niet.",
        right: "Mijn kind kan nog niet zwemmen.",
        why: "«nog niet» встаёт перед закрывающим инфинитивом, а не после него.",
      },
      {
        wrong: "de diploma, het badmuts",
        right: "het diploma, de badmuts",
        why: "het diploma, de badmuts — заучивать парой со словом.",
      },
    ],
    gate: [
      {
        word: "zwemdiploma",
        focus: "составное слово",
        tip: "ЗВЕМ-ди-пло:-ма. zwem + diploma — диплом по плаванию, важный документ для нидерландских детей.",
      },
      {
        word: "badmuts",
        focus: "короткая a, d читается чётко",
        tip: "БАТ-мутс. Шапочка для плавания — обязательна почти везде.",
      },
    ],
  },
  {
    id: "verjaardag-trakteren",
    domain: "school",
    level: "A1",
    title: "Угощение на день рождения в классе",
    context: "Разговор с учителем о традиции trakteren — угощении, которое ребёнок приносит в свой день рождения",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Учитель напомнит про традицию и спросит дату дня рождения ребёнка.",
      "Может уточнить про аллергии в классе — сладости нужно выбирать с учётом этого.",
      "Подскажет, что угощение необязательно должно быть сладким — овощи тоже подходят.",
      "В конце скажут, во сколько удобнее принести угощение.",
    ],
    lines: [
      {
        nl: "Wanneer is het handig om te trakteren?",
        ru: "Когда удобнее принести угощение?",
      },
      {
        nl: "Zijn er allergieën waar ik rekening mee moet houden?",
        ru: "Есть аллергии, которые нужно учесть?",
      },
      {
        nl: "Moet het per se zoet zijn?",
        ru: "Обязательно ли это должно быть сладким?",
      },
      {
        nl: "Ik kom het rond negen uur brengen.",
        ru: "Я принесу это около девяти.",
      },
    ],
    replyBank: [
      { nl: "Het hoeft niet per se zoet te zijn.", ru: "Не обязательно должно быть сладким.", key: "niet per se zoet", register: "informeel" },
      { nl: "Er zit één kind met een notenallergie in de klas.", ru: "В классе один ребёнок с аллергией на орехи.", key: "notenallergie", register: "neutraal" },
      { nl: "Rond de ochtendpauze komt het meestal goed uit.", ru: "Обычно удобнее всего в утреннюю перемену.", key: "ochtendpauze", register: "informeel" },
      { nl: "Kleine porties zijn het handigst.", ru: "Маленькие порции удобнее всего.", key: "kleine porties", register: "informeel" },
      { nl: "Kunt u dat nog een keer zeggen?", ru: "Можете сказать ещё раз?", key: "nog een keer", register: "informeel" },
      { nl: "We can talk this through in English if easier.", ru: "Можем обсудить это по-английски, если так проще.", register: "switch" },
    ],
    repairIds: ["herhalen", "opschrijven"],
    traps: [
      {
        wrong: "Het moet niet per se zoet zijn.",
        right: "Het hoeft niet per se zoet te zijn.",
        why: "Отрицание обязательности («не обязательно») передаётся через hoeven niet, а не через moeten niet — это разные глаголы с разной логикой отрицания.",
      },
      {
        wrong: "de allergie, het klas",
        right: "de allergie, de klas",
        why: "Оба de: de allergie, de klas.",
      },
    ],
    gate: [
      {
        word: "trakteren",
        focus: "ударение на -TRE-",
        tip: "трак-ТЕ:-рен. Угощать — специфичное нидерландское слово для этой традиции.",
      },
      {
        word: "notenallergie",
        focus: "составное слово",
        tip: "НО:-тен-а-лер-хи:. noten + allergie — аллергия на орехи.",
      },
    ],
  },
  {
    id: "energie-meterstand-doorgeven",
    domain: "wonen",
    level: "A1",
    title: "Передать показания счётчика",
    context: "Звонок или онлайн-форма энергокомпании — ежегодная передача показаний счётчика",
    minutes: 3,
    openerContext: "telefoon",
    brief: [
      "Попросят номер клиента (klantnummer) — держите под рукой счёт.",
      "Спросят отдельно показания за электричество и за газ.",
      "Могут уточнить, снимали ли вы показания сами или это сделал техник.",
      "В конце скажут, когда придёт новый расчёт.",
    ],
    lines: [
      {
        nl: "Ik wil mijn meterstanden doorgeven.",
        ru: "Я хочу передать показания счётчика.",
      },
      {
        nl: "Mijn klantnummer is...",
        ru: "Мой номер клиента...",
      },
      {
        nl: "De meterstand voor elektriciteit is...",
        ru: "Показания по электричеству...",
      },
      {
        nl: "Wanneer krijg ik de nieuwe afrekening?",
        ru: "Когда я получу новый расчёт?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw klantnummer?", ru: "Ваш номер клиента?", key: "klantnummer", register: "formeel" },
      { nl: "Wat is de meterstand voor gas?", ru: "Какие показания по газу?", key: "meterstand gas", register: "neutraal" },
      { nl: "De afrekening volgt binnen een maand.", ru: "Расчёт придёт в течение месяца.", key: "binnen een maand", register: "formeel" },
      { nl: "Kunt u de cijfers nog een keer noemen?", ru: "Можете назвать цифры ещё раз?", key: "cijfers", register: "informeel" },
      { nl: "Dat is genoteerd, dank u wel.", ru: "Записано, спасибо.", key: "genoteerd", register: "formeel" },
      { nl: "I can take the numbers in English too.", ru: "Могу принять цифры и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen"],
    traps: [
      {
        wrong: "Ik wil doorgeven mijn meterstanden.",
        right: "Ik wil mijn meterstanden doorgeven.",
        why: "Отделяемый глагол в конце, дополнение перед ним — тот же порядок, что и всюду с doorgeven.",
      },
      {
        wrong: "de meterstand, het klantnummer",
        right: "de meterstand, het klantnummer",
        why: "de meterstand, het klantnummer — заучивать целиком со словом.",
      },
    ],
    gate: [
      {
        word: "meterstand",
        focus: "составное слово",
        tip: "МЕ:-тер-стант. meter + stand — показания счётчика.",
      },
      {
        word: "afrekening",
        focus: "харде G перед -ing",
        tip: "АФ-ре:-кə-нинх. Итоговый расчёт по счетам.",
      },
    ],
  },
  {
    id: "huisvuil-ophalen-vraag",
    domain: "wonen",
    level: "A1",
    title: "Вопрос про вывоз мусора",
    context: "Звонок в муниципалитет или разговор с соседом про расписание вывоза мусора",
    minutes: 3,
    openerContext: "telefoon",
    brief: [
      "Спросят ваш адрес, чтобы назвать точное расписание для вашей улицы.",
      "Объяснят, какие контейнеры в какой день — обычно разделение на бумагу, пластик, органику.",
      "Могут упомянуть, что крупногабаритный мусор нужно заказывать отдельно.",
      "В конце подскажут, где посмотреть расписание в приложении.",
    ],
    lines: [
      {
        nl: "Wanneer wordt het huisvuil bij mij opgehaald?",
        ru: "Когда у меня забирают мусор?",
      },
      {
        nl: "En het plastic afval?",
        ru: "А пластиковые отходы?",
      },
      {
        nl: "Hoe meld ik grofvuil aan?",
        ru: "Как заказать вывоз крупногабаритного мусора?",
      },
      {
        nl: "Is er een app hiervoor?",
        ru: "Есть приложение для этого?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw postcode?", ru: "Ваш почтовый индекс?", key: "postcode", register: "formeel" },
      { nl: "Het restafval wordt op dinsdag opgehaald.", ru: "Обычный мусор забирают по вторникам.", key: "restafval", register: "neutraal" },
      { nl: "Grofvuil meldt u aan via de website.", ru: "Крупногабаритный мусор заказывают через сайт.", key: "grofvuil", register: "formeel" },
      { nl: "Er is een handige afvalapp.", ru: "Есть удобное приложение про отходы.", key: "afvalapp", register: "informeel" },
      { nl: "Kunt u de postcode herhalen?", ru: "Повторите индекс?", key: "herhalen", register: "informeel" },
      { nl: "I can send this information in English too.", ru: "Могу прислать эту информацию и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "spellen"],
    traps: [
      {
        wrong: "Wanneer het huisvuil wordt opgehaald bij mij?",
        right: "Wanneer wordt het huisvuil bij mij opgehaald?",
        why: "После вопросительного слова сразу глагол, подлежащее — третьим, даже в пассивной конструкции.",
      },
      {
        wrong: "de huisvuil, het afval",
        right: "het huisvuil, het afval",
        why: "Оба het: het huisvuil, het afval.",
      },
    ],
    gate: [
      {
        word: "grofvuil",
        focus: "харде G дважды",
        tip: "ХРОФ-фёйл. Крупногабаритный мусор — мебель, техника.",
      },
      {
        word: "postcode",
        focus: "ударение на POST-",
        tip: "ПОСТ-ко:-де. В Нидерландах индекс всегда спрашивают первым.",
      },
    ],
  },
  {
    id: "buren-sleutel-vragen",
    domain: "wonen",
    level: "A1",
    title: "Попросить соседа подержать запасной ключ",
    context: "Короткий неформальный разговор с соседом — просьба подержать запасной ключ на случай отпуска",
    minutes: 3,
    openerContext: "informeel",
    brief: [
      "Начните с небольшого объяснения ситуации — например, поездка или ремонт.",
      "Спросите, не против ли сосед подержать ключ на всякий случай.",
      "Договоритесь, что делать, если что-то случится (полить цветы, впустить мастера).",
      "Поблагодарите и предложите взаимную услугу.",
    ],
    lines: [
      {
        nl: "Zou u misschien mijn reservesleutel willen bewaren?",
        ru: "Не могли бы вы подержать мой запасной ключ?",
        note: "«zou u willen» — вежливая форма просьбы, мягче прямого «kunt u».",
      },
      {
        nl: "Ik ben volgende week op vakantie.",
        ru: "На следующей неделе я в отпуске.",
      },
      {
        nl: "Kunt u misschien mijn planten water geven?",
        ru: "Не могли бы вы полить мои цветы?",
      },
      {
        nl: "Ik doe hetzelfde graag voor u terug.",
        ru: "Я с радостью отвечу тем же для вас.",
      },
    ],
    replyBank: [
      { nl: "Natuurlijk, geen probleem.", ru: "Конечно, без проблем.", key: "geen probleem", register: "informeel" },
      { nl: "Hoe lang bent u weg?", ru: "На сколько вы уезжаете?", key: "hoe lang", register: "informeel" },
      { nl: "Moet ik verder nog iets doen?", ru: "Мне ещё что-то нужно сделать?", key: "nog iets", register: "informeel" },
      { nl: "Bel me gerust als er iets is.", ru: "Звоните смело, если что-то случится.", key: "gerust", register: "informeel" },
      { nl: "Fijne vakantie alvast!", ru: "Хорошего отпуска заранее!", key: "fijne vakantie", register: "informeel" },
      { nl: "Sorry, could we talk in English? My Dutch isn't great.", ru: "Простите, можно по-английски? Мой нидерландский не очень.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt"],
    traps: [
      {
        wrong: "Ik doe hetzelfde terug voor u graag.",
        right: "Ik doe hetzelfde graag voor u terug.",
        why: "«graag» встаёт сразу после глагола или дополнения, а не в самом конце фразы — порядок наречий фиксирован иначе, чем в русском.",
      },
      {
        wrong: "de sleutel, het plant",
        right: "de sleutel, de plant",
        why: "Оба de: de sleutel, de plant.",
      },
    ],
    gate: [
      {
        word: "reservesleutel",
        focus: "составное слово",
        tip: "ре-СЕР-вə-слё:-тел. reserve + sleutel — запасной ключ.",
      },
      {
        word: "vakantie",
        focus: "ударение на -KAN-",
        tip: "ва-КАН-си. Отпуск — слово, которое встретится в любом соседском разговоре летом.",
      },
    ],
  },
  {
    id: "verzekering-schade-melden",
    domain: "wonen",
    level: "A1",
    title: "Сообщить о мелком ущербе страховой",
    context: "Звонок в страховую компанию — сообщить о небольшом повреждении в квартире (протечка, разбитое стекло)",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Спросят номер полиса и адрес, где произошёл ущерб.",
      "Попросят коротко описать, что случилось и когда.",
      "Уточнят, есть ли фотографии повреждения.",
      "В конце скажут, что происходит дальше — эксперт, возмещение, срок ответа.",
    ],
    lines: [
      {
        nl: "Ik wil schade melden aan mijn woning.",
        ru: "Я хочу сообщить о повреждении в моей квартире.",
      },
      {
        nl: "Er is een waterlek in de keuken.",
        ru: "На кухне протечка воды.",
      },
      {
        nl: "Ik heb er foto's van gemaakt.",
        ru: "Я сделал этому фотографии.",
      },
      {
        nl: "Wanneer hoor ik meer hierover?",
        ru: "Когда я услышу об этом подробнее?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw polisnummer?", ru: "Ваш номер полиса?", key: "polisnummer", register: "formeel" },
      { nl: "Wanneer is dit gebeurd?", ru: "Когда это произошло?", key: "wanneer gebeurd", register: "neutraal" },
      { nl: "Kunt u de foto's naar ons mailen?", ru: "Можете прислать нам фото по почте?", key: "mailen", register: "formeel" },
      { nl: "Een expert neemt binnen een week contact op.", ru: "Эксперт свяжется в течение недели.", key: "expert", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите, пожалуйста?", key: "herhalen", register: "informeel" },
      { nl: "We can also handle this by email in English.", ru: "Можем решить это и по почте на английском.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "spellen"],
    traps: [
      {
        wrong: "Ik heb foto's ervan gemaakt.",
        right: "Ik heb er foto's van gemaakt.",
        why: "«er … van» — застывшее сочетание с er в начале и предлогом van в конце, между ними встаёт дополнение foto's.",
      },
      {
        wrong: "de schade, het lek",
        right: "de schade, het lek",
        why: "de schade, het lek — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "waterlek",
        focus: "составное слово",
        tip: "ВА:-тер-лек. water + lek — протечка воды.",
      },
      {
        word: "polisnummer",
        focus: "ударение на PO-",
        tip: "ПО:-лис-нюм-мер. Номер страхового полиса — спрашивают в начале любого разговора.",
      },
    ],
  },
  {
    id: "verlof-aanvragen",
    domain: "werk",
    level: "A1",
    title: "Попросить отпуск у руководителя",
    context: "Короткий разговор с руководителем — запрос на отпускные дни",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Спросите заранее, удобно ли обсудить отпуск.",
      "Назовите конкретные даты и причину, если это важно (не всегда обязательно).",
      "Руководитель может сразу согласиться или попросить проверить график команды.",
      "Договоритесь, кто подхватит ваши задачи на это время.",
    ],
    lines: [
      {
        nl: "Kan ik volgende maand een week verlof opnemen?",
        ru: "Могу я взять неделю отпуска в следующем месяце?",
      },
      {
        nl: "Het gaat om deze data.",
        ru: "Речь об этих датах.",
      },
      {
        nl: "Wie neemt mijn taken over?",
        ru: "Кто подхватит мои задачи?",
      },
      {
        nl: "Ik hoor het graag zo snel mogelijk.",
        ru: "Буду рад узнать как можно скорее.",
      },
    ],
    replyBank: [
      { nl: "Laat me even in de agenda kijken.", ru: "Дайте посмотреть в календаре.", key: "agenda", register: "informeel" },
      { nl: "Dat moet lukken, geen probleem.", ru: "Должно получиться, без проблем.", key: "moet lukken", register: "informeel" },
      { nl: "Overleg dit ook even met je collega's.", ru: "Согласуй это ещё и с коллегами.", key: "overleg", register: "informeel" },
      { nl: "Zet het in het systeem, dan keur ik het goed.", ru: "Внеси это в систему, я одобрю.", key: "keur ik goed", register: "neutraal" },
      { nl: "Kun je dat nog een keer zeggen?", ru: "Можешь повторить?", key: "nog een keer", register: "informeel" },
      { nl: "We can discuss this in English if you prefer.", ru: "Можем обсудить это по-английски, если хочешь.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil opnemen een week verlof.",
        right: "Ik wil een week verlof opnemen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de verlof, het taak",
        right: "het verlof, de taak",
        why: "het verlof, de taak — заучивать целиком со словом.",
      },
    ],
    gate: [
      {
        word: "verlof",
        focus: "ударение на -LOF",
        tip: "вер-ЛОФ. Отпуск в рабочем контексте — не путать с vakantie, которое шире.",
      },
      {
        word: "collega's",
        focus: "ударение на -LE-",
        tip: "ко-ЛЕ:-хас. Коллеги — множественное число на -'s.",
      },
    ],
  },
  {
    id: "kantine-bestellen",
    domain: "werk",
    level: "A1",
    title: "Заказ обеда в рабочей столовой",
    context: "Разговор на кассе рабочей столовой — заказ обеда и оплата",
    minutes: 3,
    openerContext: "winkel",
    brief: [
      "На кассе спросят, что вы хотите — часто нужно выбрать быстро, очередь не ждёт.",
      "Могут спросить, есть ли у вас карта сотрудника для скидки.",
      "Уточнят, есть ли аллергии, если блюдо содержит частые аллергены.",
      "В конце назовут сумму и способ оплаты.",
    ],
    lines: [
      {
        nl: "Mag ik de soep van de dag?",
        ru: "Можно суп дня?",
      },
      {
        nl: "En een broodje kaas erbij.",
        ru: "И к этому бутерброд с сыром.",
      },
      {
        nl: "Kan ik met mijn personeelspas betalen?",
        ru: "Можно оплатить картой сотрудника?",
      },
      {
        nl: "Hoeveel is het samen?",
        ru: "Сколько всего?",
      },
    ],
    replyBank: [
      { nl: "Wilt u er ook drinken bij?", ru: "Хотите что-нибудь попить к этому?", key: "drinken", register: "informeel" },
      { nl: "Heeft u uw personeelspas bij u?", ru: "Карта сотрудника с вами?", key: "personeelspas", register: "neutraal" },
      { nl: "Dat is dan zes euro vijftig.", ru: "С вас шесть пятьдесят.", key: "zes euro", register: "neutraal" },
      { nl: "Zit er iets in waar u allergisch voor bent?", ru: "Есть ли в составе то, на что у вас аллергия?", key: "allergisch", register: "formeel" },
      { nl: "Wilt u het hier opeten of meenemen?", ru: "Съедите здесь или возьмёте с собой?", key: "meenemen", register: "informeel" },
      { nl: "I can go through the menu in English too.", ru: "Могу пройтись по меню и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen"],
    traps: [
      {
        wrong: "Ik wil betalen met mijn personeelspas kan?",
        right: "Kan ik met mijn personeelspas betalen?",
        why: "Вопрос без вопросительного слова начинается с глагола: Kan ik... betalen? — не «я хочу оплатить, можно?» дословно.",
      },
      {
        wrong: "de broodje, het soep",
        right: "het broodje, de soep",
        why: "het broodje (уменьшительное — всегда het), de soep.",
      },
    ],
    gate: [
      {
        word: "personeelspas",
        focus: "составное слово",
        tip: "пер-со-НЕ:ЛС-пас. personeel + pas — карта сотрудника.",
      },
      {
        word: "broodje",
        focus: "уменьшительное -je",
        tip: "БРО:Т-йə. Бутерброд — от brood (хлеб) с уменьшительным.",
      },
    ],
  },
  {
    id: "teamuitje-planning",
    domain: "werk",
    level: "A1",
    title: "Обсуждение планов на корпоратив",
    context: "Небольшой разговор с коллегами о планировании командного мероприятия (teamuitje)",
    minutes: 4,
    openerContext: "informeel",
    brief: [
      "Коллега спросит, какие даты вам подходят.",
      "Обсудят пару идей — боулинг, ужин, выезд за город.",
      "Могут спросить про особые пожелания по еде.",
      "В конце договорятся, кто всё организует.",
    ],
    lines: [
      {
        nl: "Welke datum komt jou het beste uit?",
        ru: "Какая дата тебе подходит лучше всего?",
      },
      {
        nl: "Ik heb geen voorkeur, alles is goed.",
        ru: "У меня нет предпочтений, всё подойдёт.",
      },
      {
        nl: "Heb je dieetwensen waar we rekening mee moeten houden?",
        ru: "У тебя есть пожелания по еде, которые нужно учесть?",
      },
      {
        nl: "Wie regelt de boekingen?",
        ru: "Кто занимается бронированием?",
      },
    ],
    replyBank: [
      { nl: "Zullen we voor bowlen gaan?", ru: "Может, боулинг?", key: "bowlen", register: "informeel" },
      { nl: "Ik hoor het wel als je iets weet.", ru: "Дай знать, если что-то узнаешь.", key: "ik hoor het wel", register: "informeel" },
      { nl: "Laten we een groepsapp maken.", ru: "Давай создадим групповой чат.", key: "groepsapp", register: "informeel" },
      { nl: "Ik regel de reservering wel.", ru: "Я займусь бронированием.", key: "reservering", register: "informeel" },
      { nl: "Kun je dat nog een keer zeggen?", ru: "Можешь повторить?", key: "nog een keer", register: "informeel" },
      { nl: "We can plan this in English in the group chat too.", ru: "Можем спланировать это и по-английски в чате.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "Welke datum jou komt het beste uit?",
        right: "Welke datum komt jou het beste uit?",
        why: "Вопросительное слово — сразу глагол komt, подлежащее jou — третьим.",
      },
      {
        wrong: "de teamuitje, het app",
        right: "het teamuitje, de app",
        why: "het teamuitje, de app — заучивать целиком со словом.",
      },
    ],
    gate: [
      {
        word: "teamuitje",
        focus: "ui = /œy/, уменьшительное -je",
        tip: "ТИ:М-ёй-тйə. team + uitje (уменьшительное от uit — вылазка).",
      },
      {
        word: "dieetwensen",
        focus: "долгое ie",
        tip: "ди-Е:Т-вен-сен. Пожелания по питанию.",
      },
    ],
  },
  {
    id: "stomerij-afhalen",
    domain: "dagelijks",
    level: "A1",
    title: "Забрать вещи из химчистки",
    context: "Визит в химчистку (stomerij) — забрать готовые вещи и оплатить",
    minutes: 3,
    openerContext: "winkel",
    brief: [
      "На стойке спросят номер квитанции или фамилию.",
      "Могут показать пятно, которое не полностью вывелось, и объяснить почему.",
      "Назовут сумму к оплате.",
      "Спросят, нужен ли чехол для одежды.",
    ],
    lines: [
      {
        nl: "Ik kom mijn kleding ophalen.",
        ru: "Я пришёл забрать свои вещи.",
      },
      {
        nl: "Hier is mijn bonnetje.",
        ru: "Вот моя квитанция.",
      },
      {
        nl: "Is de vlek er helemaal uit?",
        ru: "Пятно полностью вывелось?",
      },
      {
        nl: "Hoeveel ben ik u schuldig?",
        ru: "Сколько с меня?",
      },
    ],
    replyBank: [
      { nl: "Heeft u uw bonnetje bij zich?", ru: "У вас с собой квитанция?", key: "bonnetje", register: "formeel" },
      { nl: "Deze vlek is helaas niet helemaal weggegaan.", ru: "Это пятно, к сожалению, не полностью вывелось.", key: "vlek", register: "neutraal" },
      { nl: "Dat wordt dan twaalf euro.", ru: "С вас двенадцать евро.", key: "twaalf euro", register: "neutraal" },
      { nl: "Wilt u er een hoes bij?", ru: "Хотите чехол к этому?", key: "hoes", register: "informeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen"],
    traps: [
      {
        wrong: "Ik kom ophalen mijn kleding.",
        right: "Ik kom mijn kleding ophalen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de bonnetje, het vlek",
        right: "het bonnetje, de vlek",
        why: "het bonnetje (уменьшительное — всегда het), de vlek.",
      },
    ],
    gate: [
      {
        word: "stomerij",
        focus: "ударение на -REIJ",
        tip: "сто-мə-РЭЙ. Химчистка — слово с ударением на последний слог.",
      },
      {
        word: "bonnetje",
        focus: "уменьшительное -je",
        tip: "БОН-нə-тйə. Квитанция — от bon с уменьшительным.",
      },
    ],
  },
  {
    id: "bibliotheek-inschrijven",
    domain: "dagelijks",
    level: "A1",
    title: "Записаться в библиотеку",
    context: "Первый визит в местную библиотеку — оформление читательского билета",
    minutes: 5,
    openerContext: "loket",
    brief: [
      "На стойке спросят документ, удостоверяющий личность, и адрес.",
      "Объяснят стоимость абонемента — для взрослых и детей она разная.",
      "Расскажут, сколько книг можно взять одновременно и на какой срок.",
      "В конце покажут, как пользоваться самообслуживанием для сдачи книг.",
    ],
    lines: [
      {
        nl: "Ik wil me graag inschrijven bij de bibliotheek.",
        ru: "Я хотел бы записаться в библиотеку.",
      },
      {
        nl: "Hoeveel boeken mag ik tegelijk lenen?",
        ru: "Сколько книг можно взять одновременно?",
      },
      {
        nl: "Hoe lang mag ik ze houden?",
        ru: "На какой срок можно их держать?",
      },
      {
        nl: "Kan ik ze ook zelf inleveren?",
        ru: "Могу я сама их сдать?",
      },
    ],
    replyBank: [
      { nl: "Heeft u een identiteitsbewijs bij zich?", ru: "У вас с собой документ?", key: "identiteitsbewijs", register: "formeel" },
      { nl: "U mag maximaal tien boeken lenen.", ru: "Можно взять максимум десять книг.", key: "tien boeken", register: "neutraal" },
      { nl: "De uitleentermijn is drie weken.", ru: "Срок выдачи — три недели.", key: "uitleentermijn", register: "formeel" },
      { nl: "U kunt boeken zelf inleveren bij de automaat.", ru: "Сдать книги можно самостоятельно через автомат.", key: "automaat", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Можете объяснить ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I can explain the system in English too.", ru: "Могу объяснить систему и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil inschrijven me bij de bibliotheek.",
        right: "Ik wil me graag inschrijven bij de bibliotheek.",
        why: "Возвратное местоимение me встаёт сразу после подлежащего/спрягаемого глагола, не после отделяемого инфинитива.",
      },
      {
        wrong: "de boek, het bibliotheek",
        right: "het boek, de bibliotheek",
        why: "het boek, de bibliotheek — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "bibliotheek",
        focus: "ударение на -THEEK",
        tip: "би-бли-о-ТЕ:К. Долгое ee на конце, ударение на последнем слоге.",
      },
      {
        word: "uitleentermijn",
        focus: "составное слово, ui = «эй»",
        tip: "ЁЙТ-ле:н-тер-мэйн. uitlenen + termijn — срок выдачи.",
      },
    ],
  },
  {
    id: "postkantoor-pakket-versturen",
    domain: "dagelijks",
    level: "A1",
    title: "Отправить посылку на почте",
    context: "Визит в почтовый пункт (postkantoor/PostNL-punt) — отправка посылки",
    minutes: 4,
    openerContext: "winkel",
    brief: [
      "Спросят, куда отправляете посылку — страна и адрес важны для расчёта цены.",
      "Взвесят посылку и назовут варианты доставки — обычная или срочная.",
      "Могут спросить про содержимое, если это международная отправка.",
      "В конце дадут номер отслеживания.",
    ],
    lines: [
      {
        nl: "Ik wil dit pakket versturen naar Rusland.",
        ru: "Я хочу отправить эту посылку в Россию.",
      },
      {
        nl: "Hoeveel weegt het?",
        ru: "Сколько это весит?",
      },
      {
        nl: "Hoeveel kost de snelste optie?",
        ru: "Сколько стоит самый быстрый вариант?",
      },
      {
        nl: "Krijg ik een trackingnummer?",
        ru: "Я получу номер отслеживания?",
      },
    ],
    replyBank: [
      { nl: "Waar gaat het pakket naartoe?", ru: "Куда отправляется посылка?", key: "naartoe", register: "neutraal" },
      { nl: "Het weegt twee kilo.", ru: "Весит два килограмма.", key: "twee kilo", register: "neutraal" },
      { nl: "Wat zit er in het pakket?", ru: "Что внутри посылки?", key: "wat zit erin", register: "formeel" },
      { nl: "De snelste optie kost achttien euro.", ru: "Самый быстрый вариант стоит восемнадцать евро.", key: "achttien euro", register: "neutraal" },
      { nl: "U krijgt een trackingnummer per sms.", ru: "Номер отслеживания придёт по смс.", key: "trackingnummer", register: "informeel" },
      { nl: "I'm happy to sort this out in English too.", ru: "С радостью разберусь с этим и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen"],
    traps: [
      {
        wrong: "Ik wil versturen dit pakket.",
        right: "Ik wil dit pakket versturen.",
        why: "Дополнение перед инфинитивом, не после него.",
      },
      {
        wrong: "de pakket, het kilo",
        right: "het pakket, de kilo",
        why: "het pakket, de kilo — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "trackingnummer",
        focus: "заимствование, ударение на TRACK-",
        tip: "ТРЕ-кинх-нюм-мер. Заимствовано из английского почти без изменений.",
      },
      {
        word: "versturen",
        focus: "безударное ver-",
        tip: "вер-СТЮ:-рен. Отправлять — базовый глагол для любой почты.",
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
