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
  // ───────────────────────── ПЯТАЯ ПАРТИЯ: A2 ─────────────────────────
  {
    id: "kinderbijslag-aanvragen",
    domain: "bureaucratie",
    level: "A2",
    title: "Оформить детское пособие (kinderbijslag)",
    context: "Звонок в SVB после рождения ребёнка или переезда — оформление kinderbijslag",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Спросят BSN ребёнка и родителя, дату рождения и с какого момента ребёнок живёт с вами.",
      "Уточнят, получаете ли вы уже пособие от другой страны — двойное не положено.",
      "Объяснят, что выплата идёт раз в квартал и на какой счёт.",
      "В конце скажут, когда ждать первое письмо с подтверждением.",
    ],
    lines: [
      {
        nl: "Ik wil kinderbijslag aanvragen voor mijn zoon.",
        ru: "Я хочу оформить детское пособие на сына.",
      },
      {
        nl: "Hij is twee maanden geleden geboren.",
        ru: "Он родился два месяца назад.",
      },
      {
        nl: "Nee, ik ontvang nog geen kinderbijslag uit een ander land.",
        ru: "Нет, я ещё не получаю пособие из другой страны.",
      },
      {
        nl: "Op welke rekening wordt het overgemaakt?",
        ru: "На какой счёт это переведут?",
      },
      {
        nl: "Wanneer krijg ik de eerste betaling?",
        ru: "Когда придёт первая выплата?",
      },
    ],
    replyBank: [
      { nl: "Wat is het BSN van uw kind?", ru: "Какой BSN у вашего ребёнка?", key: "BSN kind", register: "formeel" },
      { nl: "Ontvangt u al kinderbijslag uit een ander land?", ru: "Вы уже получаете пособие из другой страны?", key: "ander land", register: "formeel" },
      { nl: "De uitkering wordt per kwartaal overgemaakt.", ru: "Выплата переводится раз в квартал.", key: "per kwartaal", register: "formeel" },
      { nl: "U ontvangt binnen zes weken een schriftelijke bevestiging.", ru: "В течение шести недель придёт письменное подтверждение.", key: "schriftelijke bevestiging", register: "formeel" },
      { nl: "Wilt u dat ik het bedrag nog even noem?", ru: "Назвать сумму ещё раз?", key: "bedrag", register: "neutraal" },
      { nl: "Kunt u dat nummer nog een keer herhalen?", ru: "Повторите этот номер ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We're happy to continue this call in English.", ru: "Мы с радостью продолжим звонок по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers", "spellen"],
    traps: [
      {
        wrong: "Hij was geboren twee maanden geleden.",
        right: "Hij is twee maanden geleden geboren.",
        why: "«Родился» в перфекте образуется через zijn, не hebben: изменение состояния берёт zijn. Обстоятельство времени встаёт перед причастием, а не после него.",
      },
      {
        wrong: "de kinderbijslag, het rekening",
        right: "de kinderbijslag, de rekening",
        why: "Оба de: de kinderbijslag, de rekening — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "kinderbijslag",
        focus: "составное слово",
        tip: "КИН-дер-бэйс-лах. kind(er) + bijslag — надбавка на ребёнка.",
      },
      {
        word: "kwartaal",
        focus: "долгое aa",
        tip: "квар-ТА:Л. Квартал — единица времени в большинстве выплат.",
      },
    ],
  },
  {
    id: "zorgverzekering-wisselen",
    domain: "bureaucratie",
    level: "A2",
    title: "Сменить медицинскую страховку",
    context: "Звонок в новую страховую компанию в конце года — переход на другую zorgverzekering",
    minutes: 8,
    openerContext: "telefoon",
    brief: [
      "Спросят, какой пакет вас интересует — базовый или с дополнительным покрытием.",
      "Уточнят текущую страховую и дату, с которой хотите перейти — обычно с 1 января.",
      "Расскажут про размер собственного риска (eigen risico) и как он влияет на сумму.",
      "В конце объяснят, что старую страховку не нужно отменять самим — новая сделает это за вас.",
    ],
    lines: [
      {
        nl: "Ik wil overstappen naar een andere zorgverzekering.",
        ru: "Я хочу перейти на другую медицинскую страховку.",
      },
      {
        nl: "Welk pakket past bij mijn situatie?",
        ru: "Какой пакет подходит для моей ситуации?",
      },
      {
        nl: "Wat is het eigen risico bij dit pakket?",
        ru: "Какой собственный риск у этого пакета?",
      },
      {
        nl: "Moet ik mijn oude verzekering zelf opzeggen?",
        ru: "Мне нужно самому отменять старую страховку?",
      },
      {
        nl: "Vanaf wanneer gaat de nieuwe verzekering in?",
        ru: "С какого числа начнёт действовать новая страховка?",
      },
    ],
    replyBank: [
      { nl: "Bij welke verzekeraar zit u nu?", ru: "В какой страховой вы сейчас?", key: "verzekeraar", register: "formeel" },
      { nl: "Het standaardpakket dekt de basiszorg.", ru: "Стандартный пакет покрывает базовую медицину.", key: "standaardpakket", register: "neutraal" },
      { nl: "Het eigen risico is dit jaar vijfhonderd euro.", ru: "Собственный риск в этом году — пятьсот евро.", key: "vijfhonderd euro", register: "formeel" },
      { nl: "Wij regelen de opzegging bij uw oude verzekeraar.", ru: "Мы сами оформим отмену у вашей старой страховой.", key: "opzegging", register: "formeel" },
      { nl: "De nieuwe verzekering gaat in per één januari.", ru: "Новая страховка начнёт действовать с первого января.", key: "één januari", register: "neutraal" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Можете объяснить ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I can send the package details in English too.", ru: "Могу прислать детали пакета и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Ik moet opzeggen mijn oude verzekering.",
        right: "Ik moet mijn oude verzekering opzeggen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "het risico, de pakket",
        right: "het risico, het pakket",
        why: "Оба het: het risico, het pakket.",
      },
    ],
    gate: [
      {
        word: "zorgverzekering",
        focus: "составное слово, харде G",
        tip: "ЗОРХ-фер-зе:-кə-ринх. zorg + verzekering — медицинская страховка.",
      },
      {
        word: "eigen risico",
        focus: "ei = дифтонг «эй»",
        tip: "ЭЙ-хен ри-СИ:-ко. Собственный риск — сумма, которую платите сами до начала покрытия.",
      },
    ],
  },
  {
    id: "parkeervergunning-aanvragen",
    domain: "bureaucratie",
    level: "A2",
    title: "Оформить парковочное разрешение жильца",
    context: "Визит или онлайн-заявка в gemeente на парковочное разрешение для своей улицы",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Спросят адрес и подтверждение регистрации по этому адресу в BRP.",
      "Уточнят номер и марку автомобиля.",
      "Объяснят, что в некоторых зонах есть лист ожидания.",
      "В конце скажут стоимость за год и способ оплаты.",
    ],
    lines: [
      {
        nl: "Ik wil een parkeervergunning aanvragen voor mijn straat.",
        ru: "Я хочу оформить парковочное разрешение для своей улицы.",
      },
      {
        nl: "Mijn kenteken is...",
        ru: "Номер моей машины...",
      },
      {
        nl: "Staat er een wachtlijst voor deze zone?",
        ru: "Есть лист ожидания для этой зоны?",
      },
      {
        nl: "Hoeveel kost dit per jaar?",
        ru: "Сколько это стоит в год?",
      },
    ],
    replyBank: [
      { nl: "Staat u ingeschreven op dit adres?", ru: "Вы зарегистрированы по этому адресу?", key: "ingeschreven", register: "formeel" },
      { nl: "Wat is uw kenteken?", ru: "Ваш номер машины?", key: "kenteken", register: "neutraal" },
      { nl: "Voor deze zone geldt helaas een wachtlijst.", ru: "К сожалению, для этой зоны есть лист ожидания.", key: "wachtlijst", register: "formeel" },
      { nl: "Dat kost honderdtwintig euro per jaar.", ru: "Это стоит сто двадцать евро в год.", key: "honderdtwintig", register: "neutraal" },
      { nl: "U kunt digitaal of aan de balie betalen.", ru: "Оплатить можно онлайн или на стойке.", key: "digitaal", register: "neutraal" },
      { nl: "Kunt u dat nog een keer spellen?", ru: "Продиктуйте по буквам ещё раз?", key: "spellen", register: "informeel" },
      { nl: "Happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["spellen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil aanvragen een parkeervergunning.",
        right: "Ik wil een parkeervergunning aanvragen.",
        why: "Дополнение перед инфинитивом, не после него.",
      },
      {
        wrong: "het wachtlijst, de kenteken",
        right: "de wachtlijst, het kenteken",
        why: "de wachtlijst, het kenteken — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "parkeervergunning",
        focus: "составное слово",
        tip: "пар-КЕ:Р-фер-хюн-нинх. parkeer + vergunning — разрешение на парковку.",
      },
      {
        word: "kenteken",
        focus: "ударение на -TEken",
        tip: "КЕН-те:-кен. Номерной знак — спрашивают в любом разговоре про машину.",
      },
    ],
  },
  {
    id: "naturalisatie-informatie",
    domain: "bureaucratie",
    level: "A2",
    title: "Спросить про требования к натурализации",
    context: "Визит в gemeente за информацией о процедуре натурализации — только справочно",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Спросят, сколько лет вы уже проживаете в Нидерландах непрерывно.",
      "Расскажут про требуемый языковой уровень и какие экзамены его подтверждают.",
      "Объяснят список документов и сроки рассмотрения — это справочная информация, не консультация по вашему делу.",
      "В конце дадут ссылку на сайт IND с точным списком требований.",
    ],
    lines: [
      {
        nl: "Ik wil informatie over naturalisatie.",
        ru: "Мне нужна информация о натурализации.",
      },
      {
        nl: "Ik woon hier nu vijf jaar.",
        ru: "Я живу здесь уже пять лет.",
      },
      {
        nl: "Welk taalniveau heb ik hiervoor nodig?",
        ru: "Какой уровень языка мне для этого нужен?",
      },
      {
        nl: "Welke documenten moet ik meenemen?",
        ru: "Какие документы мне взять с собой?",
      },
    ],
    replyBank: [
      { nl: "Hoe lang woont u al onafgebroken in Nederland?", ru: "Сколько вы уже непрерывно живёте в Нидерландах?", key: "onafgebroken", register: "formeel" },
      { nl: "U heeft minimaal taalniveau A2 nodig.", ru: "Вам нужен минимум уровень A2.", key: "taalniveau A2", register: "formeel" },
      { nl: "Neemt u uw paspoort en verblijfsvergunning mee.", ru: "Возьмите с собой паспорт и вид на жительство.", key: "verblijfsvergunning", register: "formeel" },
      { nl: "Voor uw specifieke situatie verwijs ik u naar de IND.", ru: "По вашей конкретной ситуации обращайтесь в IND.", key: "verwijs ik u", register: "formeel" },
      { nl: "Hier is de link met de volledige lijst.", ru: "Вот ссылка с полным списком.", key: "volledige lijst", register: "neutraal" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I can point you to the English page too.", ru: "Могу показать и англоязычную страницу.", register: "switch" },
    ],
    repairIds: ["betekent", "opschrijven"],
    traps: [
      {
        wrong: "Ik woon hier al vijf jaar sinds.",
        right: "Ik woon hier nu vijf jaar.",
        why: "Продолжительность до настоящего момента передаётся через nu/al + период, без лишнего sinds в конце — sinds требует точку отсчёта, а не длительность.",
      },
      {
        wrong: "het taalniveau, de document",
        right: "het taalniveau, het document",
        why: "Оба het: het taalniveau, het document.",
      },
    ],
    gate: [
      {
        word: "naturalisatie",
        focus: "ударение на -SA-",
        tip: "на-тю-ра-ли-ЗА-си. Натурализация — длинное слово, произносите по частям.",
      },
      {
        word: "onafgebroken",
        focus: "составное слово",
        tip: "он-АФ-хə-бро:-кен. «Непрерывно» — важное слово для любого срокового вопроса.",
      },
    ],
  },
  {
    id: "digid-machtiging",
    domain: "bureaucratie",
    level: "A2",
    title: "Оформить доверенность через DigiD",
    context: "Звонок в поддержку DigiD — оформление machtiging, чтобы кто-то другой мог действовать от вашего имени",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "Спросят, для какого ведомства нужна доверенность — у каждого своя форма machtiging.",
      "Уточнят данные того, кого вы уполномочиваете — BSN и полное имя.",
      "Объяснят, что доверенность нужно подписать обеим сторонам.",
      "В конце скажут, как долго доверенность действует и как её отозвать.",
    ],
    lines: [
      {
        nl: "Ik wil iemand machtigen om zaken voor mij te regelen.",
        ru: "Я хочу уполномочить кого-то решать за меня дела.",
      },
      {
        nl: "Het gaat om de Belastingdienst.",
        ru: "Речь о налоговой службе.",
      },
      {
        nl: "Moeten wij dit allebei ondertekenen?",
        ru: "Нам обоим нужно это подписать?",
      },
      {
        nl: "Hoe lang blijft deze machtiging geldig?",
        ru: "Как долго действует эта доверенность?",
      },
      {
        nl: "Hoe kan ik de machtiging weer intrekken?",
        ru: "Как отозвать эту доверенность?",
      },
    ],
    replyBank: [
      { nl: "Voor welke instantie heeft u de machtiging nodig?", ru: "Для какого ведомства вам нужна доверенность?", key: "instantie", register: "formeel" },
      { nl: "Beide partijen moeten het formulier ondertekenen.", ru: "Обе стороны должны подписать форму.", key: "ondertekenen", register: "formeel" },
      { nl: "De machtiging blijft geldig tot u hem intrekt.", ru: "Доверенность действует, пока вы её не отзовёте.", key: "intrekt", register: "formeel" },
      { nl: "U kunt dit online intrekken via uw account.", ru: "Отозвать можно онлайн через ваш аккаунт.", key: "online intrekken", register: "neutraal" },
      { nl: "Kunt u het BSN van de andere persoon geven?", ru: "Можете дать BSN другого человека?", key: "BSN", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We can explain this process in English too.", ru: "Можем объяснить этот процесс и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "Ik wil machtigen iemand.",
        right: "Ik wil iemand machtigen.",
        why: "Дополнение перед инфинитивом, не после него.",
      },
      {
        wrong: "de machtiging, het instantie",
        right: "de machtiging, de instantie",
        why: "Оба de: de machtiging, de instantie.",
      },
    ],
    gate: [
      {
        word: "machtiging",
        focus: "харде G, ударение на MACH-",
        tip: "МАХ-ти-хинх. Доверенность — слово, встречающееся во всех формальных инстанциях.",
      },
      {
        word: "intrekken",
        focus: "отделяемый глагол",
        tip: "ИН-тре-кен. Отзывать — ik trek in.",
      },
    ],
  },
  {
    id: "verklaring-omtrent-gedrag",
    domain: "bureaucratie",
    level: "A2",
    title: "Заказать справку о несудимости (VOG)",
    context: "Заявка на VOG (Verklaring Omtrent Gedrag) для нового рабочего места",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Спросят, для какой должности и какого работодателя нужна справка.",
      "Уточнят, есть ли у вас код работодателя (screeningsprofiel) — обычно его даёт сам работодатель.",
      "Объяснят срок рассмотрения — обычно несколько недель.",
      "В конце скажут стоимость и что делать, если справку отклонят.",
    ],
    lines: [
      {
        nl: "Ik wil een VOG aanvragen voor mijn nieuwe baan.",
        ru: "Я хочу заказать VOG для новой работы.",
      },
      {
        nl: "Mijn werkgever heeft mij een screeningsprofiel gegeven.",
        ru: "Работодатель дал мне код профиля проверки.",
      },
      {
        nl: "Hoe lang duurt de aanvraag?",
        ru: "Сколько занимает рассмотрение?",
      },
      {
        nl: "Wat gebeurt er als de VOG wordt afgewezen?",
        ru: "Что будет, если справку отклонят?",
      },
    ],
    replyBank: [
      { nl: "Heeft u het screeningsprofiel van uw werkgever?", ru: "У вас есть код профиля от работодателя?", key: "screeningsprofiel", register: "formeel" },
      { nl: "De aanvraag duurt meestal vier weken.", ru: "Рассмотрение занимает обычно четыре недели.", key: "vier weken", register: "neutraal" },
      { nl: "Bij afwijzing krijgt u een schriftelijke motivering.", ru: "При отказе вам придёт письменное обоснование.", key: "afwijzing", register: "formeel" },
      { nl: "U kunt bezwaar maken tegen een afwijzing.", ru: "На отказ можно подать возражение.", key: "bezwaar", register: "formeel" },
      { nl: "Dat kost eenenveertig euro vijftig.", ru: "Это стоит сорок один пятьдесят.", key: "eenenveertig", register: "neutraal" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I can walk you through this in English too.", ru: "Могу разобрать это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Wat gebeurt er als de VOG afgewezen wordt als?",
        right: "Wat gebeurt er als de VOG wordt afgewezen?",
        why: "Придаточное условия с «als» уводит спрягаемый глагол wordt в конец, после причастия afgewezen — а не сохраняет прямой порядок главного предложения.",
      },
      {
        wrong: "de aanvraag, het bezwaar",
        right: "de aanvraag, het bezwaar",
        why: "de aanvraag, het bezwaar — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "screeningsprofiel",
        focus: "заимствование, ударение на SCREE-",
        tip: "СКРИ:-нинхс-про-фи:л. Заимствовано из английского, с нидерландским окончанием -s.",
      },
      {
        word: "afwijzing",
        focus: "ij = «эй»",
        tip: "АФ-вэй-зинх. Отказ — от глагола afwijzen.",
      },
    ],
  },
  {
    id: "kentekenbewijs-overschrijven",
    domain: "bureaucratie",
    level: "A2",
    title: "Переоформить машину на своё имя",
    context: "Визит к дилеру или в RDW-пункт для переоформления купленной подержанной машины",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Спросят документы обеих сторон — продавца и покупателя.",
      "Проверят техосмотр (APK) — если он просрочен, машину нельзя переоформить.",
      "Объяснят, что старая страховка перестаёт действовать сразу, новую нужно оформить заранее.",
      "В конце выдадут новое свидетельство о регистрации.",
    ],
    lines: [
      {
        nl: "Ik wil dit kenteken op mijn naam overschrijven.",
        ru: "Я хочу переоформить эту машину на своё имя.",
      },
      {
        nl: "Is de APK nog geldig?",
        ru: "Техосмотр ещё действителен?",
      },
      {
        nl: "Ik heb al een nieuwe verzekering geregeld.",
        ru: "Я уже оформил новую страховку.",
      },
      {
        nl: "Wanneer krijg ik het nieuwe kentekenbewijs?",
        ru: "Когда я получу новое свидетельство о регистрации?",
      },
    ],
    replyBank: [
      { nl: "Zijn beide partijen hier aanwezig?", ru: "Обе стороны присутствуют?", key: "beide partijen", register: "formeel" },
      { nl: "De APK is nog drie maanden geldig.", ru: "Техосмотр действителен ещё три месяца.", key: "APK geldig", register: "neutraal" },
      { nl: "Heeft u al een verzekering voor deze auto?", ru: "У вас уже есть страховка на эту машину?", key: "verzekering", register: "formeel" },
      { nl: "U krijgt het nieuwe kentekenbewijs per post.", ru: "Новое свидетельство придёт по почте.", key: "per post", register: "formeel" },
      { nl: "Dat duurt ongeveer vijf werkdagen.", ru: "Это займёт примерно пять рабочих дней.", key: "vijf werkdagen", register: "neutraal" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "Happy to go through this in English too.", ru: "С радостью разберу это и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt"],
    traps: [
      {
        wrong: "Ik heb geregeld al een nieuwe verzekering.",
        right: "Ik heb al een nieuwe verzekering geregeld.",
        why: "Рамочная конструкция: причастие geregeld уходит в самый конец, обстоятельство al — перед дополнением.",
      },
      {
        wrong: "het kenteken, de kentekenbewijs",
        right: "het kenteken, het kentekenbewijs",
        why: "Оба het: het kenteken, het kentekenbewijs.",
      },
    ],
    gate: [
      {
        word: "kentekenbewijs",
        focus: "составное слово",
        tip: "КЕН-те:-кен-бə-вэйс. kenteken + bewijs — свидетельство о регистрации.",
      },
      {
        word: "overschrijven",
        focus: "sch = s + харде G",
        tip: "О:-вер-схрэй-вен. Переоформлять — тот же глагол, что и «переписывать».",
      },
    ],
  },
  {
    id: "paspoort-kind-aanvragen",
    domain: "bureaucratie",
    level: "A2",
    title: "Оформить паспорт ребёнку",
    context: "Визит в gemeente для оформления первого паспорта ребёнку — нужны оба родителя или их согласие",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Спросят, присутствуют ли оба родителя — если нет, нужно письменное согласие отсутствующего.",
      "Уточнят гражданство ребёнка и родителей, если оно отличается.",
      "Сфотографируют ребёнка — для маленьких детей может понадобиться несколько попыток.",
      "В конце скажут срок изготовления и стоимость, которая зависит от возраста ребёнка.",
    ],
    lines: [
      {
        nl: "Ik wil een paspoort aanvragen voor mijn dochter.",
        ru: "Я хочу оформить паспорт своей дочери.",
      },
      {
        nl: "Haar vader kon vandaag helaas niet mee.",
        ru: "Её отец, к сожалению, не смог прийти сегодня.",
      },
      {
        nl: "Is schriftelijke toestemming dan voldoende?",
        ru: "Письменного согласия тогда достаточно?",
      },
      {
        nl: "Hoe lang duurt het voordat het klaar is?",
        ru: "Сколько времени займёт, прежде чем будет готово?",
      },
    ],
    replyBank: [
      { nl: "Zijn beide ouders vandaag aanwezig?", ru: "Оба родителя присутствуют сегодня?", key: "beide ouders", register: "formeel" },
      { nl: "Bij afwezigheid is schriftelijke toestemming verplicht.", ru: "При отсутствии обязательно письменное согласие.", key: "schriftelijke toestemming", register: "formeel" },
      { nl: "Voor kinderen onder achttien gelden andere kosten.", ru: "Для детей до восемнадцати действует другая цена.", key: "andere kosten", register: "neutraal" },
      { nl: "Het paspoort is over ongeveer een week klaar.", ru: "Паспорт будет готов примерно через неделю.", key: "een week", register: "neutraal" },
      { nl: "Kijk rechtdoor voor de foto, alstublieft.", ru: "Смотрите прямо для фото, пожалуйста.", key: "rechtdoor", register: "informeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to explain the requirements in English too.", ru: "С радостью объясню требования и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers"],
    traps: [
      {
        wrong: "Haar vader kon niet mee vandaag.",
        right: "Haar vader kon vandaag helaas niet mee.",
        why: "Обстоятельство времени vandaag встаёт сразу после спрягаемого глагола, а не в самом конце — отделяемая частица mee всё равно уходит последней.",
      },
      {
        wrong: "het toestemming, de paspoort",
        right: "de toestemming, het paspoort",
        why: "de toestemming, het paspoort — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "toestemming",
        focus: "ударение на -STEM-",
        tip: "ту-СТЕ-минх. Согласие — уже знакомое слово из школьного сценария, здесь в паспортном контексте.",
      },
      {
        word: "afwezigheid",
        focus: "ударение на -WE-",
        tip: "аф-ВЕ:-зех-хэйт. Отсутствие — от wezig (присутствующий) с приставкой af-.",
      },
    ],
  },
  {
    id: "ggd-jeugdgezondheidszorg-controle",
    domain: "gezondheid",
    level: "A2",
    title: "Плановый медосмотр школьника в GGD",
    context: "Плановый осмотр ребёнка школьного возраста в GGD (jeugdgezondheidszorg)",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Медсестра спросит про рост, зрение, слух и общее самочувствие ребёнка.",
      "Могут спросить про питание, сон и активность — стандартные вопросы для этого возраста.",
      "Проверят прививочный статус по карте.",
      "В конце дадут рекомендации и скажут, когда следующий осмотр.",
    ],
    lines: [
      {
        nl: "Mijn dochter groeit goed, denk ik.",
        ru: "Моя дочь, кажется, хорошо растёт.",
      },
      {
        nl: "Ze slaapt de laatste tijd wat onrustig.",
        ru: "Последнее время она спит немного беспокойно.",
      },
      {
        nl: "Zijn haar ogen en oren in orde?",
        ru: "С её глазами и ушами всё в порядке?",
      },
      {
        nl: "Zit ze op schema met de vaccinaties?",
        ru: "Она идёт по графику прививок?",
      },
      {
        nl: "Wanneer is de volgende controle?",
        ru: "Когда следующий осмотр?",
      },
    ],
    replyBank: [
      { nl: "Hoe eet en slaapt ze over het algemeen?", ru: "Как в целом она ест и спит?", key: "over het algemeen", register: "neutraal" },
      { nl: "Haar gehoor en zicht zijn beide goed.", ru: "Слух и зрение у неё в порядке.", key: "gehoor en zicht", register: "neutraal" },
      { nl: "Ze loopt keurig op schema met de prikken.", ru: "Она отлично идёт по графику прививок.", key: "op schema", register: "informeel" },
      { nl: "De volgende controle is over een jaar.", ru: "Следующий осмотр через год.", key: "over een jaar", register: "formeel" },
      { nl: "Let u de komende tijd op haar slaapritme.", ru: "Понаблюдайте ближайшее время за режимом сна.", key: "slaapritme", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to go through this in English too.", ru: "С радостью разберу это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen"],
    traps: [
      {
        wrong: "Ze slaapt onrustig de laatste tijd.",
        right: "Ze slaapt de laatste tijd wat onrustig.",
        why: "Обстоятельство времени «de laatste tijd» тяготеет к середине фразы, перед прилагательным-наречием, а не к самому концу.",
      },
      {
        wrong: "het gehoor, de zicht",
        right: "het gehoor, het zicht",
        why: "Оба het: het gehoor, het zicht.",
      },
    ],
    gate: [
      {
        word: "slaapritme",
        focus: "составное слово",
        tip: "СЛА:П-рит-мə. slaap + ritme — режим сна.",
      },
      {
        word: "gehoor",
        focus: "долгое oo",
        tip: "хə-ХО:Р. Слух — от глагола horen.",
      },
    ],
  },
  {
    id: "huisarts-uitslag-bespreken",
    domain: "gezondheid",
    level: "A2",
    title: "Обсудить результаты анализов с терапевтом",
    context: "Телефонный разговор с huisarts об уже готовых результатах анализов",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Врач сначала спросит, как вы себя чувствуете сейчас.",
      "Расскажет результаты по одному показателю за раз — переспрашивайте, если не поняли термин.",
      "Может предложить план: подождать, повторить анализ или направить к специалисту.",
      "В конце уточнит, есть ли у вас вопросы прямо сейчас.",
    ],
    lines: [
      {
        nl: "Ik bel voor de uitslag van mijn bloedonderzoek.",
        ru: "Я звоню по поводу результата анализа крови.",
      },
      {
        nl: "Wat betekent deze waarde precies?",
        ru: "Что именно означает это значение?",
      },
      {
        nl: "Moet ik me ergens zorgen om maken?",
        ru: "Мне стоит из-за чего-то беспокоиться?",
      },
      {
        nl: "Wat is de volgende stap?",
        ru: "Какой следующий шаг?",
      },
    ],
    replyBank: [
      { nl: "Uw uitslagen zien er over het algemeen goed uit.", ru: "Ваши результаты в целом выглядят хорошо.", key: "over het algemeen goed", register: "neutraal" },
      { nl: "Deze waarde is net iets aan de hoge kant.", ru: "Это значение чуть выше нормы.", key: "aan de hoge kant", register: "neutraal" },
      { nl: "Ik stel voor dat we het over drie maanden herhalen.", ru: "Предлагаю повторить анализ через три месяца.", key: "herhalen", register: "formeel" },
      { nl: "Dit hoeft u niet ongerust te maken.", ru: "Из-за этого не стоит волноваться.", key: "ongerust", register: "formeel" },
      { nl: "Heeft u nog vragen hierover?", ru: "У вас есть ещё вопросы по этому поводу?", key: "vragen", register: "neutraal" },
      { nl: "Kunt u dat wat eenvoudiger uitleggen?", ru: "Можете объяснить попроще?", key: "eenvoudiger", register: "informeel" },
      { nl: "We can go through this in English if you prefer.", ru: "Можем разобрать это по-английски, если хотите.", register: "switch" },
    ],
    repairIds: ["betekent", "momentje"],
    traps: [
      {
        wrong: "Ik moet me zorgen maken ergens om?",
        right: "Moet ik me ergens zorgen om maken?",
        why: "Вопрос без вопросительного слова начинается с глагола: Moet ik…? — а не с подлежащего, как в утвердительном порядке слов.",
      },
      {
        wrong: "de uitslag, het waarde",
        right: "de uitslag, de waarde",
        why: "Оба de: de uitslag, de waarde.",
      },
    ],
    gate: [
      {
        word: "bloedonderzoek",
        focus: "составное слово",
        tip: "БЛУТ-он-дер-зу:к. bloed + onderzoek — анализ крови.",
      },
      {
        word: "ongerust",
        focus: "ударение на -RUST",
        tip: "он-хə-РЮСТ. Обеспокоенный — отрицание от gerust (спокойный).",
      },
    ],
  },
  {
    id: "tandarts-wortelkanaalbehandeling",
    domain: "gezondheid",
    level: "A2",
    title: "Обсудить лечение корневого канала",
    context: "Разговор с дантистом о необходимости лечения корневого канала после осмотра",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Дантист объяснит, почему нужно именно такое лечение, а не просто пломба.",
      "Расскажет, сколько визитов потребуется и сколько времени займёт каждый.",
      "Уточнит, какая часть стоимости покрывается страховкой.",
      "В конце предложит записаться на первый визит.",
    ],
    lines: [
      {
        nl: "Waarom is een wortelkanaalbehandeling nodig?",
        ru: "Почему нужно лечение корневого канала?",
      },
      {
        nl: "Hoeveel afspraken kost dit ongeveer?",
        ru: "Сколько визитов это займёт примерно?",
      },
      {
        nl: "Wordt dit vergoed door mijn verzekering?",
        ru: "Это покрывается моей страховкой?",
      },
      {
        nl: "Kan ik meteen een afspraak maken?",
        ru: "Могу я сразу записаться?",
      },
    ],
    replyBank: [
      { nl: "De wortel is ontstoken, een vulling is niet genoeg.", ru: "Корень воспалён, пломбы недостаточно.", key: "ontstoken", register: "neutraal" },
      { nl: "Dit kost meestal twee tot drie afspraken.", ru: "Обычно это занимает два-три визита.", key: "twee tot drie", register: "neutraal" },
      { nl: "Uw basisverzekering vergoedt dit gedeeltelijk.", ru: "Ваша базовая страховка покрывает это частично.", key: "gedeeltelijk", register: "formeel" },
      { nl: "Ik plan de eerste afspraak volgende week in.", ru: "Запишу вас на первый визит на следующую неделю.", key: "eerste afspraak", register: "neutraal" },
      { nl: "Heeft u nog vragen over de behandeling?", ru: "Есть ещё вопросы по лечению?", key: "behandeling", register: "neutraal" },
      { nl: "Kunt u dat wat langzamer uitleggen?", ru: "Объясните чуть помедленнее?", key: "langzamer", register: "informeel" },
      { nl: "I'm happy to explain the procedure in English too.", ru: "С радостью объясню процедуру и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen"],
    traps: [
      {
        wrong: "Is dit vergoed door mijn verzekering?",
        right: "Wordt dit vergoed door mijn verzekering?",
        why: "Регулярный процесс возмещения описывается страдательным залогом с worden, а не с zijn.",
      },
      {
        wrong: "de wortel, het vulling",
        right: "de wortel, de vulling",
        why: "Оба de: de wortel, de vulling.",
      },
    ],
    gate: [
      {
        word: "wortelkanaalbehandeling",
        focus: "составное слово",
        tip: "ВОР-тел-ка-НА:Л-бə-хан-де-линх. wortel + kanaal + behandeling — самое длинное слово в этом сценарии.",
      },
      {
        word: "ontstoken",
        focus: "ударение на -STO-",
        tip: "онт-СТО:-кен. Воспалённый — причастие от ontsteken.",
      },
    ],
  },
  {
    id: "apotheek-bijwerkingen-melden",
    domain: "gezondheid",
    level: "A2",
    title: "Сообщить о побочных эффектах лекарства",
    context: "Визит в аптеку — сообщить о неприятных побочных эффектах назначенного лекарства",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "Фармацевт спросит, какие именно симптомы и когда они начались.",
      "Уточнит, принимаете ли вы другие лекарства одновременно.",
      "Может предложить альтернативу или посоветует обратиться к врачу.",
      "В конце объяснит, как сообщить об этом официально (bijwerking melden).",
    ],
    lines: [
      {
        nl: "Ik heb last van bijwerkingen van dit medicijn.",
        ru: "У меня побочные эффекты от этого лекарства.",
      },
      {
        nl: "Ik voel me al twee dagen duizelig.",
        ru: "Уже два дня у меня кружится голова.",
      },
      {
        nl: "Ik gebruik verder geen andere medicijnen.",
        ru: "Больше никаких других лекарств я не принимаю.",
      },
      {
        nl: "Moet ik hiermee naar de huisarts?",
        ru: "Мне с этим нужно к терапевту?",
      },
    ],
    replyBank: [
      { nl: "Welke klachten heeft u precies?", ru: "Какие именно жалобы у вас?", key: "klachten precies", register: "formeel" },
      { nl: "Gebruikt u nog andere medicijnen ernaast?", ru: "Принимаете ли ещё какие-то лекарства помимо этого?", key: "ernaast", register: "neutraal" },
      { nl: "Dit komt helaas vaker voor bij dit medicijn.", ru: "Это, к сожалению, случается с этим лекарством нередко.", key: "komt vaker voor", register: "neutraal" },
      { nl: "Neem contact op met uw huisarts hierover.", ru: "Свяжитесь по этому поводу с терапевтом.", key: "contact op", register: "formeel" },
      { nl: "U kunt dit ook officieel melden bij het meldpunt.", ru: "Об этом можно также официально сообщить в специальную службу.", key: "meldpunt", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to note this down in English too.", ru: "С радостью запишу это и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "Ik ben duizelig al twee dagen.",
        right: "Ik voel me al twee dagen duizelig.",
        why: "Самочувствие выражается через «voelen me + прилагательное», а не через «zijn + прилагательное» отдельно — а обстоятельство длительности встаёт перед прилагательным.",
      },
      {
        wrong: "de bijwerking, het meldpunt",
        right: "de bijwerking, het meldpunt",
        why: "de bijwerking, het meldpunt — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "bijwerkingen",
        focus: "ij = «эй»",
        tip: "БЭЙ-вер-кин-хен. Побочные эффекты — множественное число, встречается на каждой листовке-вкладыше.",
      },
      {
        word: "duizelig",
        focus: "ui = /œy/",
        tip: "ДЁЙ-зə-лех. Голова кружится — один из самых частых симптомов в аптеке.",
      },
    ],
  },
  {
    id: "ggz-verwijzing-gesprek",
    domain: "gezondheid",
    level: "A2",
    title: "Разговор о направлении к психологу",
    context: "Разговор с huisarts о направлении к психологу (GGZ) — только про сам процесс, не про суть проблемы",
    minutes: 7,
    openerContext: "loket",
    brief: [
      "Врач спросит, как долго вы себя так чувствуете и мешает ли это повседневной жизни.",
      "Объяснит разницу между базовой и специализированной GGZ-помощью.",
      "Скажет, что направление действует определённый срок и что делать, если лист ожидания длинный.",
      "В конце уточнит, готовы ли вы получить направление сейчас.",
    ],
    lines: [
      {
        nl: "Ik voel me al een tijd niet goed en wil hulp.",
        ru: "Я уже некоторое время плохо себя чувствую и хочу помощи.",
      },
      {
        nl: "Het beïnvloedt mijn werk en slaap.",
        ru: "Это влияет на мою работу и сон.",
      },
      {
        nl: "Wat is het verschil tussen de opties?",
        ru: "В чём разница между вариантами?",
      },
      {
        nl: "Hoe lang is de wachtlijst ongeveer?",
        ru: "Какой примерно лист ожидания?",
      },
    ],
    replyBank: [
      { nl: "Sinds wanneer voelt u zich zo?", ru: "С каких пор вы так себя чувствуете?", key: "sinds wanneer", register: "formeel" },
      { nl: "Ik schrijf u een verwijzing naar de basis-GGZ.", ru: "Я выпишу вам направление в базовую GGZ.", key: "basis-GGZ", register: "formeel" },
      { nl: "De wachtlijst verschilt per praktijk.", ru: "Лист ожидания отличается по практикам.", key: "wachtlijst", register: "neutraal" },
      { nl: "Deze verwijzing is een jaar geldig.", ru: "Это направление действительно год.", key: "een jaar geldig", register: "formeel" },
      { nl: "Neem gerust weer contact op als het nodig is.", ru: "Обращайтесь снова, если понадобится.", key: "contact op", register: "informeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can talk this through in English if that helps.", ru: "Можем обсудить это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Het beïnvloedt mijn werk en slaap sinds een tijd.",
        right: "Ik voel me al een tijd niet goed en wil hulp.",
        why: "«al een tijd» — длительность до сейчас — встаёт сразу после подлежащего и глагола, а не выносится в конец через sinds без даты.",
      },
      {
        wrong: "de wachtlijst, het verwijzing",
        right: "de wachtlijst, de verwijzing",
        why: "Оба de: de wachtlijst, de verwijzing.",
      },
    ],
    gate: [
      {
        word: "beïnvloedt",
        focus: "ë с тремой — раздельное произношение",
        tip: "бə-ЪЙН-флут. Тrema над ë означает, что гласные произносятся раздельно, не как дифтонг.",
      },
      {
        word: "verwijzing",
        focus: "ij = «эй»",
        tip: "вер-ВЭЙ-зинх. Направление — уже знакомое слово из других медицинских сценариев.",
      },
    ],
  },
  {
    id: "verloskundige-eerste-afspraak",
    domain: "gezondheid",
    level: "A2",
    title: "Первый приём у акушерки",
    context: "Первая встреча с verloskundige после подтверждения беременности",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Акушерка спросит дату последней менструации, чтобы рассчитать срок родов.",
      "Расскажет про график последующих визитов и какие анализы понадобятся.",
      "Спросит про хронические заболевания и предыдущие беременности.",
      "В конце объяснит, куда звонить в экстренном случае вне рабочих часов.",
    ],
    lines: [
      {
        nl: "Dit is mijn eerste zwangerschap.",
        ru: "Это моя первая беременность.",
      },
      {
        nl: "Mijn laatste menstruatie was op...",
        ru: "Моя последняя менструация была...",
      },
      {
        nl: "Hoe vaak heb ik een afspraak nodig?",
        ru: "Как часто мне нужно приходить на приём?",
      },
      {
        nl: "Wie bel ik buiten kantooruren?",
        ru: "Кому звонить в нерабочее время?",
      },
    ],
    replyBank: [
      { nl: "Is dit uw eerste zwangerschap?", ru: "Это ваша первая беременность?", key: "eerste zwangerschap", register: "formeel" },
      { nl: "Wat was de eerste dag van uw laatste menstruatie?", ru: "Какой был первый день последней менструации?", key: "laatste menstruatie", register: "formeel" },
      { nl: "De eerste maanden komt u eens per vier weken.", ru: "Первые месяцы вы будете приходить раз в четыре недели.", key: "eens per vier weken", register: "neutraal" },
      { nl: "Buiten kantooruren belt u dit alarmnummer.", ru: "Вне рабочих часов звоните по этому экстренному номеру.", key: "alarmnummer", register: "formeel" },
      { nl: "Heeft u chronische aandoeningen?", ru: "У вас есть хронические заболевания?", key: "chronische aandoeningen", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это ещё раз спокойно?", key: "rustig herhalen", register: "informeel" },
      { nl: "I'm happy to go through this in English too.", ru: "С радостью разберу это и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen", "cijfers"],
    traps: [
      {
        wrong: "Hoe vaak ik heb een afspraak nodig?",
        right: "Hoe vaak heb ik een afspraak nodig?",
        why: "После вопросительного слова сразу глагол heb, подлежащее ik — третьим.",
      },
      {
        wrong: "de zwangerschap, het aandoening",
        right: "de zwangerschap, de aandoening",
        why: "Оба de: de zwangerschap, de aandoening.",
      },
    ],
    gate: [
      {
        word: "zwangerschap",
        focus: "ударение на -SCHAP",
        tip: "ЗВАНХ-хер-схап. Беременность — слово, встречающееся во всех разговорах этого цикла.",
      },
      {
        word: "verloskundige",
        focus: "ударение на -KUN-",
        tip: "вер-ЛОС-кюн-ди-хə. Акушерка — независимая профессия в нидерландской системе, не то же самое, что врач.",
      },
    ],
  },
  {
    id: "opticien-bril-aanpassen",
    domain: "gezondheid",
    level: "A2",
    title: "Подгонка новых очков у оптика",
    context: "Визит к оптику через несколько дней после покупки очков — жалоба на дискомфорт",
    minutes: 5,
    openerContext: "winkel",
    brief: [
      "Оптик спросит, что именно неудобно — давит за ушами, съезжают, размыто видно.",
      "Проверит посадку и, если нужно, подкорректирует дужки на месте.",
      "Может предложить перепроверить рецепт, если размытость не проходит.",
      "В конце спросит, всё ли теперь удобно.",
    ],
    lines: [
      {
        nl: "Deze bril knelt achter mijn oren.",
        ru: "Эти очки давят мне за ушами.",
      },
      {
        nl: "Ik zie ook nog steeds een beetje wazig.",
        ru: "У меня всё ещё немного размыто видно.",
      },
      {
        nl: "Kunt u de pootjes aanpassen?",
        ru: "Можете подкорректировать дужки?",
      },
      {
        nl: "Moet mijn recept opnieuw gecontroleerd worden?",
        ru: "Нужно ли перепроверить мой рецепт?",
      },
    ],
    replyBank: [
      { nl: "Waar knelt de bril precies?", ru: "Где именно жмут очки?", key: "knelt", register: "informeel" },
      { nl: "Ik pas de pootjes even voor u aan.", ru: "Сейчас подкорректирую дужки для вас.", key: "pas aan", register: "informeel" },
      { nl: "Ziet u overal wazig, of alleen in de verte?", ru: "Размыто видно везде, или только вдали?", key: "wazig", register: "neutraal" },
      { nl: "Laten we uw ogen nog een keer meten.", ru: "Давайте ещё раз измерим ваше зрение.", key: "meten", register: "informeel" },
      { nl: "Zit de bril nu comfortabeler?", ru: "Теперь очки удобнее сидят?", key: "comfortabeler", register: "informeel" },
      { nl: "Kunt u dat nog een keer laten zien?", ru: "Можете показать это ещё раз?", key: "laten zien", register: "informeel" },
      { nl: "I'm happy to sort this out in English too.", ru: "С радостью разберусь с этим и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "Ik zie nog steeds wazig een beetje.",
        right: "Ik zie ook nog steeds een beetje wazig.",
        why: "«een beetje» встаёт перед прилагательным-наречием wazig, а не после него в самом конце.",
      },
      {
        wrong: "de bril, het pootje",
        right: "de bril, het pootje",
        why: "de bril, het pootje (уменьшительное — всегда het) — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "wazig",
        focus: "долгое aa",
        tip: "ВА:-зех. Размыто — про зрение, не путать с moe (усталый).",
      },
      {
        word: "pootjes",
        focus: "уменьшительное -jes",
        tip: "ПО:Т-йəс. Дужки очков — от poot с уменьшительным.",
      },
    ],
  },
  {
    id: "ziekenhuis-opname-voorbereiding",
    domain: "gezondheid",
    level: "A2",
    title: "Подготовка к плановой госпитализации",
    context: "Телефонный разговор с больницей перед плановой процедурой — организационные вопросы",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Спросят, принимаете ли вы лекарства, которые нужно временно отменить перед процедурой.",
      "Уточнят, есть ли аллергии на лекарства или материалы.",
      "Объяснят, во сколько приходить и что взять с собой.",
      "В конце скажут, сколько примерно продлится пребывание.",
    ],
    lines: [
      {
        nl: "Ik bel over mijn opname volgende week.",
        ru: "Я звоню по поводу моей госпитализации на следующей неделе.",
      },
      {
        nl: "Moet ik met bepaalde medicijnen stoppen?",
        ru: "Мне нужно прекратить приём каких-то лекарств?",
      },
      {
        nl: "Ik heb een allergie voor penicilline.",
        ru: "У меня аллергия на пенициллин.",
      },
      {
        nl: "Wat moet ik meenemen naar het ziekenhuis?",
        ru: "Что мне взять с собой в больницу?",
      },
    ],
    replyBank: [
      { nl: "Gebruikt u bloedverdunners?", ru: "Вы принимаете разжижающие кровь препараты?", key: "bloedverdunners", register: "formeel" },
      { nl: "Heeft u allergieën voor medicijnen?", ru: "У вас есть аллергии на лекарства?", key: "allergieën", register: "formeel" },
      { nl: "Neemt u een identiteitsbewijs en pyjama mee.", ru: "Возьмите с собой документ и пижаму.", key: "pyjama", register: "formeel" },
      { nl: "U wordt de avond ervoor verwacht om zeven uur.", ru: "Вас ждут вечером накануне в семь часов.", key: "de avond ervoor", register: "formeel" },
      { nl: "De opname duurt meestal twee dagen.", ru: "Госпитализация обычно длится два дня.", key: "twee dagen", register: "neutraal" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We can go through the details in English too.", ru: "Можем разобрать детали и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers"],
    traps: [
      {
        wrong: "Ik heb allergie voor penicilline.",
        right: "Ik heb een allergie voor penicilline.",
        why: "Исчисляемое существительное allergie требует неопределённый артикль een — в русском «у меня аллергия» без артикля вообще, что и подталкивает его пропустить.",
      },
      {
        wrong: "de opname, het pyjama",
        right: "de opname, de pyjama",
        why: "Оба de: de opname, de pyjama.",
      },
    ],
    gate: [
      {
        word: "bloedverdunners",
        focus: "составное слово",
        tip: "БЛУТ-фер-дюн-нерс. bloed + verdunners — разжижающие кровь препараты.",
      },
      {
        word: "opname",
        focus: "ударение на OP-",
        tip: "ОП-на:-мə. Госпитализация — от глагола opnemen.",
      },
    ],
  },
  {
    id: "schoolkeuze-voortgezet-onderwijs",
    domain: "school",
    level: "A2",
    title: "День открытых дверей средней школы",
    context: "Разговор с представителем школы на дне открытых дверей при выборе средней школы для ребёнка",
    minutes: 7,
    openerContext: "informeel",
    brief: [
      "Представитель школы расскажет про уровни обучения и профили (havo, vwo, vmbo).",
      "Спросят про интересы и сильные стороны ребёнка.",
      "Расскажут про иностранные языки, кружки и расписание.",
      "В конце объяснят, как и до какого срока подать заявку.",
    ],
    lines: [
      {
        nl: "Welke niveaus biedt deze school aan?",
        ru: "Какие уровни предлагает эта школа?",
      },
      {
        nl: "Mijn zoon is sterk in taal, minder in rekenen.",
        ru: "Мой сын силён в языках, слабее в математике.",
      },
      {
        nl: "Welke talen kan hij hier leren?",
        ru: "Какие языки он может здесь изучать?",
      },
      {
        nl: "Tot wanneer kunnen we hem aanmelden?",
        ru: "До какого срока можно подать заявку?",
      },
    ],
    replyBank: [
      { nl: "Wij bieden havo en vwo aan.", ru: "Мы предлагаем havo и vwo.", key: "havo en vwo", register: "formeel" },
      { nl: "Waar liggen zijn interesses?", ru: "В чём его интересы?", key: "interesses", register: "neutraal" },
      { nl: "Naast Engels bieden we Duits en Frans aan.", ru: "Кроме английского, предлагаем немецкий и французский.", key: "Duits en Frans", register: "neutraal" },
      { nl: "De aanmelding sluit half maart.", ru: "Приём заявок закрывается в середине марта.", key: "half maart", register: "formeel" },
      { nl: "U kunt ook een proefles inplannen.", ru: "Можно также записаться на пробный урок.", key: "proefles", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "opschrijven"],
    traps: [
      {
        wrong: "Mijn zoon is sterk in taal, in rekenen minder.",
        right: "Mijn zoon is sterk in taal, minder in rekenen.",
        why: "«minder» встаёт перед предлогом, к которому относится, а не после существительного — порядок фиксирован иначе, чем в русском.",
      },
      {
        wrong: "de niveau, het interesse",
        right: "het niveau, de interesse",
        why: "het niveau, de interesse — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "aanmelding",
        focus: "харде G перед -ing",
        tip: "А:Н-мел-динх. Подача заявки — слово встречается в каждом школьном разговоре.",
      },
      {
        word: "proefles",
        focus: "долгое oe",
        tip: "ПРУ:Ф-лес. Пробный урок — от proberen.",
      },
    ],
  },
  {
    id: "leerplichtambtenaar-gesprek",
    domain: "school",
    level: "A2",
    title: "Разговор с инспектором по посещаемости",
    context: "Разговор с leerplichtambtenaar после нескольких пропусков ребёнка в школе",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Инспектор объяснит, сколько именно пропусков зафиксировано и за какой период.",
      "Спросит причину отсутствий — важно объяснить честно, без оправданий сверх необходимого.",
      "Может предложить план: справка от врача, договор о посещаемости.",
      "В конце объяснит последствия, если пропуски продолжатся.",
    ],
    lines: [
      {
        nl: "Ik begrijp dat er zorgen zijn over de aanwezigheid.",
        ru: "Я понимаю, что есть опасения по поводу посещаемости.",
      },
      {
        nl: "Mijn dochter was regelmatig ziek deze maand.",
        ru: "Моя дочь часто болела в этом месяце.",
      },
      {
        nl: "Moet ik hiervoor een doktersverklaring hebben?",
        ru: "Мне нужна для этого справка от врача?",
      },
      {
        nl: "Wat gebeurt er als dit zo doorgaat?",
        ru: "Что будет, если так продолжится?",
      },
    ],
    replyBank: [
      { nl: "Uw dochter heeft dit schooljaar acht keer verzuimd.", ru: "Ваша дочь пропустила восемь раз в этом учебном году.", key: "acht keer", register: "formeel" },
      { nl: "Wat is de reden van de afwezigheid geweest?", ru: "Какова была причина отсутствий?", key: "reden", register: "formeel" },
      { nl: "Een doktersverklaring zou helpen.", ru: "Справка от врача помогла бы.", key: "doktersverklaring", register: "formeel" },
      { nl: "Bij herhaling moeten wij dit melden.", ru: "При повторении мы обязаны об этом сообщить.", key: "melden", register: "formeel" },
      { nl: "Laten we samen een plan opstellen.", ru: "Давайте вместе составим план.", key: "plan opstellen", register: "neutraal" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue this conversation in English if easier.", ru: "Можем продолжить разговор по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen", "betekent"],
    traps: [
      {
        wrong: "Wat gebeurt er als dit doorgaat zo?",
        right: "Wat gebeurt er als dit zo doorgaat?",
        why: "В придаточном с als «zo» встаёт перед отделяемым глаголом в конце фразы, не после него.",
      },
      {
        wrong: "de verzuim, het reden",
        right: "het verzuim, de reden",
        why: "het verzuim, de reden — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "leerplichtambtenaar",
        focus: "составное слово, самое длинное в сценарии",
        tip: "ЛЕ:Р-плихт-амб-тə-НА:Р. leerplicht + ambtenaar — инспектор по обязательному образованию.",
      },
      {
        word: "doktersverklaring",
        focus: "составное слово",
        tip: "ДОК-терс-фер-КЛА:-ринх. dokters + verklaring — справка от врача.",
      },
    ],
  },
  {
    id: "ouderbijdrage-vraag",
    domain: "school",
    level: "A2",
    title: "Вопрос о добровольном родительском взносе",
    context: "Разговор с администрацией школы о добровольном родительском взносе (vrijwillige ouderbijdrage)",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Объяснят, на что идёт взнос — экскурсии, праздники, дополнительные материалы.",
      "Подтвердят, что взнос действительно добровольный и отказ не влияет на участие ребёнка.",
      "Могут предложить рассрочку, если сумма для вас велика.",
      "В конце скажут срок оплаты и способ.",
    ],
    lines: [
      {
        nl: "Waar wordt de ouderbijdrage precies voor gebruikt?",
        ru: "На что именно идёт родительский взнос?",
      },
      {
        nl: "Is deze bijdrage echt vrijwillig?",
        ru: "Этот взнос действительно добровольный?",
      },
      {
        nl: "Kan ik in termijnen betalen?",
        ru: "Можно оплатить в рассрочку?",
      },
      {
        nl: "Wat als ik niet betaal?",
        ru: "Что будет, если я не заплачу?",
      },
    ],
    replyBank: [
      { nl: "Het gaat naar excursies en schoolfeesten.", ru: "Это идёт на экскурсии и школьные праздники.", key: "excursies", register: "neutraal" },
      { nl: "De bijdrage is inderdaad volledig vrijwillig.", ru: "Взнос действительно полностью добровольный.", key: "vrijwillig", register: "formeel" },
      { nl: "Uw kind wordt nooit uitgesloten van activiteiten.", ru: "Ваш ребёнок никогда не будет исключён из мероприятий.", key: "uitgesloten", register: "formeel" },
      { nl: "Gespreid betalen kan altijd in overleg.", ru: "Оплату в рассрочку всегда можно согласовать.", key: "gespreid betalen", register: "neutraal" },
      { nl: "U betaalt via de schoolapp of per factuur.", ru: "Оплата через школьное приложение или по счёту.", key: "factuur", register: "neutraal" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Uw kind wordt nooit uitgesloten nooit van activiteiten.",
        right: "Uw kind wordt nooit uitgesloten van activiteiten.",
        why: "Одно отрицание — nooit — а не два, как иногда напрашивается по аналогии с усилением в русском.",
      },
      {
        wrong: "de bijdrage, het factuur",
        right: "de bijdrage, de factuur",
        why: "Оба de: de bijdrage, de factuur.",
      },
    ],
    gate: [
      {
        word: "ouderbijdrage",
        focus: "составное слово",
        tip: "О:У-дер-бэй-дра:-хə. ouder + bijdrage — родительский взнос.",
      },
      {
        word: "uitgesloten",
        focus: "ui = /œy/",
        tip: "ЁЙТ-хə-сло:-тен. Исключённый — причастие от uitsluiten.",
      },
    ],
  },
  {
    id: "dyslexie-onderzoek-gesprek",
    domain: "school",
    level: "A2",
    title: "Разговор про обследование на дислексию",
    context: "Разговор с внутришкольным специалистом (intern begeleider) о направлении ребёнка на обследование дислексии",
    minutes: 7,
    openerContext: "informeel",
    brief: [
      "Специалист объяснит, какие сложности заметили учителя и почему предлагают обследование.",
      "Расскажет, как проходит процесс и сколько он занимает.",
      "Уточнит, есть ли похожие сложности у других членов семьи.",
      "В конце объяснит, что происходит после подтверждения диагноза — какая поддержка положена.",
    ],
    lines: [
      {
        nl: "Wat merken de leerkrachten precies op?",
        ru: "Что именно замечают учителя?",
      },
      {
        nl: "Komt dit vaker voor in onze familie.",
        ru: "Это встречается в нашей семье чаще.",
        note: "Это не вопрос, а подтверждение факта: «Ja, dit komt vaker voor in onze familie».",
      },
      {
        nl: "Hoe lang duurt het onderzoek?",
        ru: "Сколько занимает обследование?",
      },
      {
        nl: "Welke ondersteuning krijgt hij als het bevestigd wordt?",
        ru: "Какую поддержку он получит, если диагноз подтвердится?",
      },
    ],
    replyBank: [
      { nl: "Hij heeft moeite met het herkennen van letters.", ru: "Ему трудно распознавать буквы.", key: "herkennen", register: "neutraal" },
      { nl: "Komt dyslexie voor in de familie?", ru: "Дислексия встречается в семье?", key: "in de familie", register: "formeel" },
      { nl: "Het onderzoek duurt meestal enkele weken.", ru: "Обследование обычно занимает несколько недель.", key: "enkele weken", register: "neutraal" },
      { nl: "Bij bevestiging krijgt hij extra begeleiding.", ru: "При подтверждении он получит дополнительное сопровождение.", key: "extra begeleiding", register: "formeel" },
      { nl: "We houden u steeds op de hoogte.", ru: "Мы будем вас постоянно информировать.", key: "op de hoogte", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can go through this in English if that's easier.", ru: "Можем разобрать это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Hij heeft moeite herkennen van letters.",
        right: "Hij heeft moeite met het herkennen van letters.",
        why: "«moeite hebben met» — застывшее сочетание, требующее met и артикль перед отглагольным существительным het herkennen.",
      },
      {
        wrong: "de onderzoek, het begeleiding",
        right: "het onderzoek, de begeleiding",
        why: "het onderzoek, de begeleiding — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "dyslexie",
        focus: "ударение на -LEK-",
        tip: "дис-ЛЕК-си:. Дислексия — заимствовано почти без изменений.",
      },
      {
        word: "begeleiding",
        focus: "ei = «эй»",
        tip: "бə-хə-ЛЭЙ-динх. Сопровождение — от глагола begeleiden.",
      },
    ],
  },
  {
    id: "schoolreis-betaling-regelen",
    domain: "school",
    level: "A2",
    title: "Оплата школьной экскурсии",
    context: "Короткий разговор в школе об оплате многодневной школьной поездки (schoolreis/kamp)",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Спросят, оплачиваете ли вы сразу всю сумму или частями.",
      "Объяснят, что входит в стоимость — транспорт, проживание, питание.",
      "Могут упомянуть, что есть фонд поддержки для семей с трудным финансовым положением.",
      "В конце скажут крайний срок оплаты.",
    ],
    lines: [
      {
        nl: "Wat zit er allemaal bij de prijs inbegrepen?",
        ru: "Что всё включено в цену?",
      },
      {
        nl: "Kan ik in delen betalen?",
        ru: "Можно оплатить частями?",
      },
      {
        nl: "Is er ondersteuning als het bedrag lastig is?",
        ru: "Есть ли поддержка, если сумма затруднительна?",
      },
      {
        nl: "Wat is de uiterste betaaldatum?",
        ru: "Какой крайний срок оплаты?",
      },
    ],
    replyBank: [
      { nl: "Vervoer, overnachting en eten zijn inbegrepen.", ru: "Транспорт, ночлег и еда включены.", key: "inbegrepen", register: "neutraal" },
      { nl: "Gespreid betalen in twee termijnen kan.", ru: "Можно оплатить двумя частями.", key: "twee termijnen", register: "neutraal" },
      { nl: "Er is een schoolfonds voor wie het nodig heeft.", ru: "Есть школьный фонд для тех, кому это нужно.", key: "schoolfonds", register: "formeel" },
      { nl: "De uiterste betaaldatum is over drie weken.", ru: "Крайний срок оплаты — через три недели.", key: "uiterste betaaldatum", register: "formeel" },
      { nl: "Neem gerust contact op als er iets onduidelijk is.", ru: "Обращайтесь, если что-то непонятно.", key: "onduidelijk", register: "informeel" },
      { nl: "Kunt u dat nog een keer opschrijven?", ru: "Можете записать это ещё раз?", key: "opschrijven", register: "informeel" },
      { nl: "I'm happy to send the details in English too.", ru: "С радостью пришлю детали и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "cijfers"],
    traps: [
      {
        wrong: "Wat zit er bij de prijs allemaal inbegrepen?",
        right: "Wat zit er allemaal bij de prijs inbegrepen?",
        why: "«allemaal» тяготеет к позиции сразу после er, а не в середине фразы перед предлогом.",
      },
      {
        wrong: "het schoolfonds, de termijn",
        right: "het schoolfonds, de termijn",
        why: "het schoolfonds, de termijn — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "inbegrepen",
        focus: "ударение на -GRE-",
        tip: "ин-бə-ХРЕ:-пен. Включено — причастие от inbegrijpen.",
      },
      {
        word: "uiterste",
        focus: "ui = /œy/",
        tip: "ЁЙ-тер-стə. Крайний/предельный — прилагательное превосходной степени.",
      },
    ],
  },
  {
    id: "tussenrapport-gesprek",
    domain: "school",
    level: "A2",
    title: "Разговор о промежуточном табеле",
    context: "Короткий разговор с учителем о промежуточных оценках ребёнка (tussenrapport)",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Учитель кратко пройдётся по основным предметам.",
      "Отметит, что идёт хорошо, а что требует внимания.",
      "Может предложить дополнительную практику дома по одному предмету.",
      "В конце спросит, есть ли у вас вопросы или наблюдения со своей стороны.",
    ],
    lines: [
      {
        nl: "Hoe gaat het met haar over het algemeen?",
        ru: "Как у неё дела в целом?",
      },
      {
        nl: "Waar kan ik haar thuis het beste bij helpen?",
        ru: "В чём мне лучше всего помочь ей дома?",
      },
      {
        nl: "Merkt u nog iets anders op dat ik moet weten?",
        ru: "Замечаете ли вы что-то ещё, что мне следует знать?",
      },
      {
        nl: "Ik zal er thuis extra op letten.",
        ru: "Я обращу на это дома особое внимание.",
      },
    ],
    replyBank: [
      { nl: "Ze doet het goed bij taal en rekenen.", ru: "У неё хорошо получается язык и математика.", key: "doet het goed", register: "informeel" },
      { nl: "Bij spelling kan nog wat extra oefening.", ru: "По орфографии не помешает ещё немного практики.", key: "extra oefening", register: "neutraal" },
      { nl: "Ze is soms wat afgeleid tijdens de les.", ru: "Иногда она немного отвлекается на уроке.", key: "afgeleid", register: "neutraal" },
      { nl: "Thuis lezen zou al veel helpen.", ru: "Чтение дома уже сильно помогло бы.", key: "lezen", register: "informeel" },
      { nl: "Ik ben hier positief over gestemd.", ru: "Я настроен по этому поводу положительно.", key: "positief gestemd", register: "formeel" },
      { nl: "Kunt u dat nog een keer opschrijven?", ru: "Можете записать это ещё раз?", key: "opschrijven", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "betekent"],
    traps: [
      {
        wrong: "Ik zal extra op letten er thuis.",
        right: "Ik zal er thuis extra op letten.",
        why: "«letten op» + er: er встаёт сразу после спрягаемого глагола, обстоятельство thuis — перед предлогом op, а не в конце.",
      },
      {
        wrong: "de rapport, het spelling",
        right: "het rapport, de spelling",
        why: "het rapport, de spelling — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "afgeleid",
        focus: "ei = «эй»",
        tip: "АФ-хə-лэйт. Отвлечённый — причастие от afleiden.",
      },
      {
        word: "tussenrapport",
        focus: "составное слово",
        tip: "ТЮ-сен-ра-ПОРТ. tussen + rapport — промежуточный табель.",
      },
    ],
  },
  {
    id: "kind-pesten-melden",
    domain: "school",
    level: "A2",
    title: "Сообщить учителю о буллинге",
    context: "Серьёзный, но спокойный разговор с учителем о том, что ребёнка дразнят одноклассники",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Начните спокойно и конкретно — что именно происходит и как долго.",
      "Учитель спросит детали: кто, когда, как часто.",
      "Обсудят план действий — разговор с классом, наблюдение, встреча с другими родителями.",
      "В конце договоритесь о повторном разговоре через определённое время.",
    ],
    lines: [
      {
        nl: "Ik maak me zorgen, mijn zoon wordt gepest.",
        ru: "Я беспокоюсь, моего сына дразнят.",
      },
      {
        nl: "Het gebeurt al een paar weken tijdens de pauze.",
        ru: "Это происходит уже пару недель на перемене.",
      },
      {
        nl: "Wat gaat de school hieraan doen?",
        ru: "Что школа собирается с этим делать?",
      },
      {
        nl: "Kunnen we hier over twee weken op terugkomen?",
        ru: "Можем вернуться к этому через две недели?",
      },
    ],
    replyBank: [
      { nl: "Kunt u vertellen wat er precies gebeurt?", ru: "Можете рассказать, что именно происходит?", key: "precies gebeurt", register: "formeel" },
      { nl: "Ik ga hier zeker mee aan de slag.", ru: "Я обязательно этим займусь.", key: "aan de slag", register: "informeel" },
      { nl: "Ik praat eerst met de klas hierover.", ru: "Сначала я поговорю об этом с классом.", key: "praat met de klas", register: "neutraal" },
      { nl: "We houden dit de komende weken goed in de gaten.", ru: "Мы будем внимательно следить за этим ближайшие недели.", key: "in de gaten", register: "formeel" },
      { nl: "Laten we over twee weken opnieuw afspreken.", ru: "Давайте договоримся снова через две недели.", key: "opnieuw afspreken", register: "neutraal" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can talk this through in English if that helps.", ru: "Можем обсудить это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Mijn zoon wordt gepest wordt.",
        right: "Mijn zoon wordt gepest.",
        why: "Пассив собирается одним wordt + причастием, без дублирования вспомогательного глагола в конце.",
      },
      {
        wrong: "de pauze, het klas",
        right: "de pauze, de klas",
        why: "Оба de: de pauze, de klas.",
      },
    ],
    gate: [
      {
        word: "gepest",
        focus: "короткая e",
        tip: "хə-ПЕСТ. Причастие от pesten — дразнить/травить.",
      },
      {
        word: "in de gaten houden",
        focus: "устойчивое сочетание",
        tip: "ИН де ХА:-тен ХАУ-ден. «Держать в поле зрения» — следить за ситуацией.",
      },
    ],
  },
  {
    id: "mbo-open-dag",
    domain: "school",
    level: "A2",
    title: "День открытых дверей в колледже (mbo)",
    context: "Разговор с представителем mbo (профессионального образования) на дне открытых дверей для подростка",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Представитель расскажет про уровни mbo (niveau 1–4) и на какой ваш ребёнок может претендовать.",
      "Спросит про интересы — техника, уход, торговля и так далее.",
      "Расскажет про стажировку (stage) как часть программы.",
      "В конце объяснит сроки подачи заявки и требования по документам.",
    ],
    lines: [
      {
        nl: "Welk niveau past bij het diploma van mijn zoon?",
        ru: "Какой уровень подходит для диплома моего сына?",
      },
      {
        nl: "Hij is geïnteresseerd in techniek.",
        ru: "Он интересуется техникой.",
      },
      {
        nl: "Hoe werkt de stage binnen deze opleiding?",
        ru: "Как устроена стажировка в этой программе?",
      },
      {
        nl: "Wanneer moeten we hem aanmelden?",
        ru: "Когда нам нужно его записать?",
      },
    ],
    replyBank: [
      { nl: "Met zijn diploma kan hij op niveau drie instromen.", ru: "С его дипломом он может поступить на третий уровень.", key: "niveau drie", register: "formeel" },
      { nl: "Waar liggen zijn interesses precies?", ru: "В чём именно его интересы?", key: "interesses", register: "neutraal" },
      { nl: "De stage begint meestal in het tweede jaar.", ru: "Стажировка обычно начинается на втором году.", key: "tweede jaar", register: "neutraal" },
      { nl: "Aanmelden kan tot één april.", ru: "Записаться можно до первого апреля.", key: "één april", register: "formeel" },
      { nl: "Neem zijn diploma en cijferlijst mee.", ru: "Возьмите с собой его диплом и ведомость оценок.", key: "cijferlijst", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Hij is geïnteresseerd voor techniek.",
        right: "Hij is geïnteresseerd in techniek.",
        why: "«geïnteresseerd» управляет предлогом in, а не voor — устойчивое сочетание запоминается целиком.",
      },
      {
        wrong: "het niveau, de stage",
        right: "het niveau, de stage",
        why: "het niveau, de stage — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "geïnteresseerd",
        focus: "трема над ë внутри слова — нет, здесь просто ie после i",
        tip: "хə-ин-те-ре-СЕ:РТ. Заинтересованный — длинное причастие, произносите по частям.",
      },
      {
        word: "cijferlijst",
        focus: "ij = «эй»",
        tip: "СЭЙ-фер-лэйст. cijfer + lijst — ведомость оценок.",
      },
    ],
  },
  {
    id: "huurcontract-opzeggen",
    domain: "wonen",
    level: "A2",
    title: "Расторгнуть договор аренды",
    context: "Звонок или письмо арендодателю — уведомление о расторжении договора аренды",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "Спросят дату, с которой вы хотите съехать, и уточнят срок уведомления по договору.",
      "Могут напомнить про финальный осмотр квартиры перед выездом.",
      "Объяснят, когда и как вернут залог.",
      "В конце попросят подтвердить расторжение письменно.",
    ],
    lines: [
      {
        nl: "Ik wil mijn huurcontract opzeggen.",
        ru: "Я хочу расторгнуть договор аренды.",
      },
      {
        nl: "Ik wil per de eerste van volgende maand vertrekken.",
        ru: "Я хочу выехать с первого числа следующего месяца.",
      },
      {
        nl: "Wat is de opzegtermijn precies?",
        ru: "Какой именно срок уведомления?",
      },
      {
        nl: "Wanneer krijg ik mijn borg terug?",
        ru: "Когда мне вернут залог?",
      },
    ],
    replyBank: [
      { nl: "Per wanneer wilt u vertrekken?", ru: "С какого числа хотите съехать?", key: "per wanneer", register: "formeel" },
      { nl: "De opzegtermijn is één kalendermaand.", ru: "Срок уведомления — один календарный месяц.", key: "opzegtermijn", register: "formeel" },
      { nl: "We plannen een eindinspectie in.", ru: "Мы назначим финальный осмотр.", key: "eindinspectie", register: "formeel" },
      { nl: "De borg wordt binnen een maand teruggestort.", ru: "Залог вернут в течение месяца.", key: "teruggestort", register: "formeel" },
      { nl: "Kunt u dit ook schriftelijk bevestigen?", ru: "Можете подтвердить это письменно?", key: "schriftelijk", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We can confirm this in English by email too.", ru: "Можем подтвердить это по-английски по почте.", register: "switch" },
    ],
    repairIds: ["opschrijven", "herhalen"],
    traps: [
      {
        wrong: "Ik wil opzeggen mijn huurcontract.",
        right: "Ik wil mijn huurcontract opzeggen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de borg, het opzegtermijn",
        right: "de borg, de opzegtermijn",
        why: "Оба de: de borg, de opzegtermijn.",
      },
    ],
    gate: [
      {
        word: "opzegtermijn",
        focus: "составное слово",
        tip: "ОП-зех-тер-мэйн. opzeggen + termijn — срок уведомления при расторжении.",
      },
      {
        word: "eindinspectie",
        focus: "составное слово",
        tip: "ЭЙНТ-ин-спек-си:. eind + inspectie — финальный осмотр перед выездом.",
      },
    ],
  },
  {
    id: "buren-overlast-formeel-klagen",
    domain: "wonen",
    level: "A2",
    title: "Формальная жалоба на шум от соседей",
    context: "Звонок в жилищную корпорацию (woningcorporatie) — формальная жалоба после многократных разговоров с соседом напрямую",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Спросят, пробовали ли вы уже поговорить с соседом напрямую и когда.",
      "Попросят описать конкретно, что и когда происходит — с датами, если возможно.",
      "Объяснят дальнейшие шаги — письмо соседу, медиация, в крайнем случае суд.",
      "В конце попросят вести дневник инцидентов.",
    ],
    lines: [
      {
        nl: "Ik wil een officiële klacht indienen over geluidsoverlast.",
        ru: "Я хочу подать официальную жалобу на шумовое беспокойство.",
      },
      {
        nl: "Ik heb al meerdere keren met de buren gesproken.",
        ru: "Я уже несколько раз разговаривал с соседями.",
      },
      {
        nl: "Het gebeurt meestal 's avonds laat.",
        ru: "Это происходит обычно поздно вечером.",
      },
      {
        nl: "Wat zijn de volgende stappen?",
        ru: "Какие дальнейшие шаги?",
      },
    ],
    replyBank: [
      { nl: "Heeft u al zelf met de buren gesproken?", ru: "Вы уже сами разговаривали с соседями?", key: "zelf gesproken", register: "formeel" },
      { nl: "Kunt u de data van de overlast noteren?", ru: "Можете записывать даты беспокойства?", key: "noteren", register: "formeel" },
      { nl: "Wij sturen de buren een officiële brief.", ru: "Мы отправим соседям официальное письмо.", key: "officiële brief", register: "formeel" },
      { nl: "Bij herhaling bieden we mediation aan.", ru: "При повторении предложим медиацию.", key: "mediation", register: "formeel" },
      { nl: "Houdt u een logboek bij van de incidenten.", ru: "Ведите дневник инцидентов.", key: "logboek", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это ещё раз спокойно?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can handle this by email in English too.", ru: "Можем решить это по почте и на английском.", register: "switch" },
    ],
    repairIds: ["opschrijven", "momentje"],
    traps: [
      {
        wrong: "Het gebeurt laat meestal 's avonds.",
        right: "Het gebeurt meestal 's avonds laat.",
        why: "«meestal» встаёт ближе к глаголу, а обстоятельство времени «'s avonds laat» — цельным блоком в конце.",
      },
      {
        wrong: "de klacht, het logboek",
        right: "de klacht, het logboek",
        why: "de klacht, het logboek — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "geluidsoverlast",
        focus: "составное слово",
        tip: "хə-ЛЁЙТС-о:-вер-ласт. geluid + overlast — шумовое беспокойство.",
      },
      {
        word: "logboek",
        focus: "долгое oe",
        tip: "ЛОХ-бу:к. Дневник учёта — из английского log + голландское boek.",
      },
    ],
  },
  {
    id: "woningcorporatie-inschrijven",
    domain: "wonen",
    level: "A2",
    title: "Встать на очередь в жилищную корпорацию",
    context: "Регистрация в системе жилищной корпорации для получения социального жилья — постановка в очередь",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Спросят состав семьи и текущий доход — это влияет, на какое жильё вы можете претендовать.",
      "Объяснят, как накапливаются «годы ожидания» (wachttijd) и как их использовать при подаче заявки.",
      "Расскажут, как часто нужно продлевать регистрацию.",
      "В конце покажут, как пользоваться сайтом для подачи заявок на конкретные квартиры.",
    ],
    lines: [
      {
        nl: "Ik wil me inschrijven voor een sociale huurwoning.",
        ru: "Я хочу зарегистрироваться на социальное жильё.",
      },
      {
        nl: "Hoe werkt de wachttijd precies?",
        ru: "Как именно работает срок ожидания?",
      },
      {
        nl: "Moet ik mijn inschrijving jaarlijks verlengen?",
        ru: "Мне нужно ежегодно продлевать регистрацию?",
      },
      {
        nl: "Hoe reageer ik op een woning die mij aanspreekt?",
        ru: "Как отреагировать на квартиру, которая мне понравилась?",
      },
    ],
    replyBank: [
      { nl: "Wat is de samenstelling van uw huishouden?", ru: "Какой состав вашей семьи?", key: "huishouden", register: "formeel" },
      { nl: "Uw wachttijd loopt vanaf de inschrijfdatum.", ru: "Срок ожидания идёт с даты регистрации.", key: "wachttijd", register: "formeel" },
      { nl: "U moet dit elk jaar opnieuw bevestigen.", ru: "Это нужно подтверждать заново каждый год.", key: "elk jaar", register: "formeel" },
      { nl: "U reageert eenvoudig via de website.", ru: "Отреагировать можно просто через сайт.", key: "reageert", register: "informeel" },
      { nl: "Hoe hoger uw wachttijd, hoe hoger uw kans.", ru: "Чем больше срок ожидания, тем выше шанс.", key: "hoe hoger", register: "neutraal" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain the system in English too.", ru: "С радостью объясню систему и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen"],
    traps: [
      {
        wrong: "Ik moet verlengen mijn inschrijving jaarlijks.",
        right: "Ik moet mijn inschrijving jaarlijks verlengen.",
        why: "Дополнение и обстоятельство перед инфинитивом, не после него.",
      },
      {
        wrong: "de wachttijd, het huishouden",
        right: "de wachttijd, het huishouden",
        why: "de wachttijd, het huishouden — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "wachttijd",
        focus: "составное слово",
        tip: "ВАХТ-тэйт. wacht + tijd — срок ожидания.",
      },
      {
        word: "huishouden",
        focus: "ui = /œy/",
        tip: "ХЁЙС-хау-ден. Домохозяйство — состав семьи, живущей вместе.",
      },
    ],
  },
  {
    id: "cv-ketel-onderhoud",
    domain: "wonen",
    level: "A2",
    title: "Плановое обслуживание отопительного котла",
    context: "Визит мастера для ежегодного планового обслуживания CV-ketel (отопительного котла)",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Мастер спросит, были ли за год какие-то проблемы с отоплением или горячей водой.",
      "Проверит давление в системе и объяснит, если оно слишком низкое.",
      "Может предложить заменить деталь, если что-то изношено.",
      "В конце расскажет, когда следующее плановое обслуживание.",
    ],
    lines: [
      {
        nl: "Zijn er dit jaar problemen geweest met de verwarming?",
        ru: "Были ли в этом году проблемы с отоплением?",
      },
      {
        nl: "De druk leek me laatst wat laag.",
        ru: "Давление в последнее время казалось мне низковатым.",
      },
      {
        nl: "Moet er iets vervangen worden?",
        ru: "Нужно ли что-то заменить?",
      },
      {
        nl: "Wanneer is de volgende onderhoudsbeurt?",
        ru: "Когда следующее плановое обслуживание?",
      },
    ],
    replyBank: [
      { nl: "De druk staat inderdaad iets te laag.", ru: "Давление действительно немного низковато.", key: "te laag", register: "neutraal" },
      { nl: "Ik vul het systeem even bij.", ru: "Сейчас подолью воды в систему.", key: "vul bij", register: "informeel" },
      { nl: "Dit onderdeel is aan vervanging toe.", ru: "Эту деталь пора заменить.", key: "toe aan vervanging", register: "neutraal" },
      { nl: "De volgende beurt is over een jaar.", ru: "Следующее обслуживание через год.", key: "over een jaar", register: "neutraal" },
      { nl: "Alles werkt verder prima.", ru: "Всё остальное работает отлично.", key: "prima", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "betekent"],
    traps: [
      {
        wrong: "De druk leek me wat laag laatst.",
        right: "De druk leek me laatst wat laag.",
        why: "Обстоятельство времени laatst встаёт перед прилагательным, а не после него в самом конце.",
      },
      {
        wrong: "de druk, het onderhoud",
        right: "de druk, het onderhoud",
        why: "de druk, het onderhoud — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "onderhoudsbeurt",
        focus: "составное слово",
        tip: "ОН-дер-хаутс-бёрт. onderhoud + beurt — плановое обслуживание.",
      },
      {
        word: "vervanging",
        focus: "харде G перед -ing",
        tip: "фер-ФАН-хинх. Замена — от глагола vervangen.",
      },
    ],
  },
  {
    id: "verhuisbericht-instanties",
    domain: "wonen",
    level: "A2",
    title: "Сообщить о переезде разным инстанциям",
    context: "Серия коротких звонков после переезда — банк, страховая, работодатель",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "В каждом звонке спросят номер клиента и подтверждение личности.",
      "Попросят старый и новый адрес и дату переезда.",
      "Могут уточнить, изменился ли ещё и номер телефона.",
      "В конце каждый раз скажут, когда изменение вступит в силу.",
    ],
    lines: [
      {
        nl: "Ik wil mijn adreswijziging doorgeven.",
        ru: "Я хочу сообщить об изменении адреса.",
      },
      {
        nl: "Mijn klantnummer is...",
        ru: "Мой номер клиента...",
      },
      {
        nl: "Mijn telefoonnummer blijft hetzelfde.",
        ru: "Мой номер телефона остаётся тем же.",
      },
      {
        nl: "Vanaf wanneer geldt het nieuwe adres?",
        ru: "С какого числа действует новый адрес?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw klantnummer?", ru: "Ваш номер клиента?", key: "klantnummer", register: "formeel" },
      { nl: "Wat is uw nieuwe adres?", ru: "Ваш новый адрес?", key: "nieuwe adres", register: "formeel" },
      { nl: "Blijven uw overige gegevens hetzelfde?", ru: "Остальные данные остаются прежними?", key: "overige gegevens", register: "formeel" },
      { nl: "Dit gaat per direct in.", ru: "Это вступает в силу немедленно.", key: "per direct", register: "formeel" },
      { nl: "U ontvangt hiervan een bevestiging per e-mail.", ru: "Вам придёт подтверждение по почте.", key: "bevestiging", register: "formeel" },
      { nl: "Kunt u dat nog een keer spellen?", ru: "Продиктуйте по буквам ещё раз?", key: "spellen", register: "informeel" },
      { nl: "I can take this information in English too.", ru: "Могу принять эту информацию и по-английски.", register: "switch" },
    ],
    repairIds: ["spellen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil doorgeven mijn adreswijziging.",
        right: "Ik wil mijn adreswijziging doorgeven.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "het adreswijziging, de klantnummer",
        right: "de adreswijziging, het klantnummer",
        why: "de adreswijziging, het klantnummer — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "adreswijziging",
        focus: "составное слово",
        tip: "а-ДРЕС-вэй-зи-хинх. adres + wijziging — изменение адреса.",
      },
      {
        word: "overige",
        focus: "ударение на O-",
        tip: "О:-вə-рих-хə. Остальной/прочий — часто встречается в формальных звонках.",
      },
    ],
  },
  {
    id: "vve-onderhoudsfonds-vraag",
    domain: "wonen",
    level: "A2",
    title: "Вопрос про фонд обслуживания VvE",
    context: "Разговор с управляющим VvE (объединения собственников) о размере взноса в фонд обслуживания",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Спросят, о каком именно взносе идёт речь — ежемесячном или разовом на конкретный ремонт.",
      "Объяснят, как рассчитывается сумма — по доле в здании.",
      "Могут показать последний отчёт фонда, если попросить.",
      "В конце скажут, когда следующее собрание, где можно обсудить подробнее.",
    ],
    lines: [
      {
        nl: "Ik heb een vraag over de bijdrage aan het onderhoudsfonds.",
        ru: "У меня вопрос о взносе в фонд обслуживания.",
      },
      {
        nl: "Hoe wordt dit bedrag precies berekend?",
        ru: "Как именно рассчитывается эта сумма?",
      },
      {
        nl: "Mag ik het laatste jaarverslag inzien?",
        ru: "Могу я посмотреть последний годовой отчёт?",
      },
      {
        nl: "Wanneer is de volgende vergadering?",
        ru: "Когда следующее собрание?",
      },
    ],
    replyBank: [
      { nl: "Het bedrag wordt berekend op basis van uw aandeel.", ru: "Сумма рассчитывается на основе вашей доли.", key: "aandeel", register: "formeel" },
      { nl: "Ik stuur u het jaarverslag per e-mail.", ru: "Пришлю вам годовой отчёт по почте.", key: "jaarverslag", register: "formeel" },
      { nl: "De volgende vergadering is over zes weken.", ru: "Следующее собрание через шесть недель.", key: "zes weken", register: "neutraal" },
      { nl: "U kunt vragen ook schriftelijk indienen.", ru: "Вопросы можно также подать письменно.", key: "schriftelijk", register: "formeel" },
      { nl: "Het fonds staat er financieel gezond voor.", ru: "Фонд в хорошем финансовом состоянии.", key: "financieel gezond", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "We could send the report in English too.", ru: "Можем прислать отчёт и на английском.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Mag ik inzien het laatste jaarverslag?",
        right: "Mag ik het laatste jaarverslag inzien?",
        why: "Дополнение перед инфинитивом, не после него.",
      },
      {
        wrong: "het aandeel, de fonds",
        right: "het aandeel, het fonds",
        why: "Оба het: het aandeel, het fonds.",
      },
    ],
    gate: [
      {
        word: "onderhoudsfonds",
        focus: "составное слово",
        tip: "ОН-дер-хаутс-фонс. onderhoud + fonds — фонд обслуживания.",
      },
      {
        word: "jaarverslag",
        focus: "долгое aa",
        tip: "ЯР-фер-слах. Годовой отчёт — jaar + verslag.",
      },
    ],
  },
  {
    id: "huurtoeslag-aanvragen",
    domain: "wonen",
    level: "A2",
    title: "Оформить жилищную субсидию (huurtoeslag)",
    context: "Оформление huurtoeslag через Belastingdienst — субсидии на аренду жилья",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Спросят ваш доход, состав семьи и размер арендной платы.",
      "Объяснят пороги, при которых субсидия ещё положена.",
      "Уточнят, есть ли у вас уже DigiD для подачи заявки онлайн.",
      "В конце скажут, когда ждать первую выплату.",
    ],
    lines: [
      {
        nl: "Ik wil huurtoeslag aanvragen.",
        ru: "Я хочу оформить жилищную субсидию.",
      },
      {
        nl: "Mijn huur is driehonderd euro per maand.",
        ru: "Моя аренда — триста евро в месяц.",
      },
      {
        nl: "Kom ik in aanmerking met mijn inkomen?",
        ru: "Подхожу ли я по своему доходу?",
      },
      {
        nl: "Hoe vraag ik dit online aan?",
        ru: "Как мне подать заявку онлайн?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw bruto jaarinkomen?", ru: "Какой у вас годовой доход брутто?", key: "jaarinkomen", register: "formeel" },
      { nl: "Uw huur valt binnen de grens.", ru: "Ваша аренда в пределах лимита.", key: "binnen de grens", register: "formeel" },
      { nl: "U vraagt dit aan met uw DigiD.", ru: "Заявку подаёте через DigiD.", key: "DigiD", register: "neutraal" },
      { nl: "De eerste betaling volgt binnen zes weken.", ru: "Первая выплата придёт в течение шести недель.", key: "zes weken", register: "formeel" },
      { nl: "Wijzigingen in inkomen moet u zelf doorgeven.", ru: "Об изменениях дохода нужно сообщать самому.", key: "wijzigingen", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We can go through this in English too.", ru: "Можем разобрать это и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen"],
    traps: [
      {
        wrong: "Ik wil aanvragen huurtoeslag.",
        right: "Ik wil huurtoeslag aanvragen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de huurtoeslag, het inkomen",
        right: "de huurtoeslag, het inkomen",
        why: "de huurtoeslag, het inkomen — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "huurtoeslag",
        focus: "составное слово",
        tip: "ХЮ:Р-ту:с-лах. huur + toeslag — субсидия на аренду.",
      },
      {
        word: "jaarinkomen",
        focus: "составное слово, долгое aa",
        tip: "ЯР-ин-ко:-мен. jaar + inkomen — годовой доход.",
      },
    ],
  },
  {
    id: "inbraak-melden-politie",
    domain: "wonen",
    level: "A2",
    title: "Сообщить полиции о взломе",
    context: "Звонок в полицию (не экстренную линию) — сообщить о взломе квартиры, обнаруженном по возвращении домой",
    minutes: 7,
    openerContext: "telefoon",
    brief: [
      "Спросят, находитесь ли вы сейчас в безопасности и есть ли злоумышленник поблизости.",
      "Попросят не трогать вещи до приезда полиции.",
      "Уточнят, что пропало и что повреждено.",
      "В конце дадут номер заявления (aangifte) для страховки.",
    ],
    lines: [
      {
        nl: "Ik denk dat er bij mij is ingebroken.",
        ru: "Мне кажется, ко мне взломали дом.",
      },
      {
        nl: "Ik ben nu weer thuis, ik voel me veilig.",
        ru: "Я сейчас снова дома, чувствую себя в безопасности.",
      },
      {
        nl: "Er lijkt een laptop te ontbreken.",
        ru: "Похоже, пропал ноутбук.",
      },
      {
        nl: "Moet ik hier aangifte van doen?",
        ru: "Мне нужно подать заявление?",
      },
    ],
    replyBank: [
      { nl: "Bent u op dit moment veilig?", ru: "Вы сейчас в безопасности?", key: "veilig", register: "formeel" },
      { nl: "Raak alstublieft niets aan tot wij er zijn.", ru: "Пожалуйста, ничего не трогайте до нашего приезда.", key: "raak niets aan", register: "formeel" },
      { nl: "Wat mist u precies?", ru: "Что именно пропало?", key: "mist", register: "formeel" },
      { nl: "Wij komen dit ter plaatse opnemen.", ru: "Мы приедем и всё зафиксируем на месте.", key: "ter plaatse", register: "formeel" },
      { nl: "U krijgt een aangiftenummer voor uw verzekering.", ru: "Вы получите номер заявления для страховки.", key: "aangiftenummer", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can send an officer who speaks English if needed.", ru: "Можем прислать сотрудника, говорящего по-английски, если нужно.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Ik denk dat er is ingebroken bij mij.",
        right: "Ik denk dat er bij mij is ingebroken.",
        why: "В придаточном is уходит в конец, а обстоятельство bij mij встаёт перед ним, а не после.",
      },
      {
        wrong: "de aangifte, het laptop",
        right: "de aangifte, de laptop",
        why: "Оба de: de aangifte, de laptop.",
      },
    ],
    gate: [
      {
        word: "ingebroken",
        focus: "ударение на -BRO-",
        tip: "ИН-хə-бро:-кен. Причастие от inbreken — взломать.",
      },
      {
        word: "aangifte",
        focus: "долгое aa",
        tip: "А:Н-хиф-тə. Заявление в полицию — ключевое слово для страховки.",
      },
    ],
  },
  {
    id: "glasvezel-aansluiting",
    domain: "wonen",
    level: "A2",
    title: "Подключение оптоволоконного интернета",
    context: "Визит техника для подключения glasvezel (оптоволоконного интернета) в новой квартире",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Техник спросит, где удобнее разместить роутер.",
      "Объяснит, что часть работы — прокладка кабеля от улицы до квартиры.",
      "Может предупредить о коротком отключении на время переключения.",
      "В конце проверит скорость соединения вместе с вами.",
    ],
    lines: [
      {
        nl: "Waar kan de router het beste komen te staan?",
        ru: "Где лучше всего разместить роутер?",
      },
      {
        nl: "Hoe lang duurt de installatie ongeveer?",
        ru: "Сколько примерно занимает установка?",
      },
      {
        nl: "Valt de verbinding straks helemaal weg?",
        ru: "Соединение потом полностью пропадёт?",
      },
      {
        nl: "Kunnen we samen de snelheid testen?",
        ru: "Можем вместе проверить скорость?",
      },
    ],
    replyBank: [
      { nl: "Het liefst dicht bij de meterkast.", ru: "Лучше всего рядом со счётчиковым шкафом.", key: "meterkast", register: "informeel" },
      { nl: "De installatie duurt ongeveer een uur.", ru: "Установка занимает примерно час.", key: "een uur", register: "neutraal" },
      { nl: "U bent kort offline tijdens het omzetten.", ru: "Во время переключения вы ненадолго будете офлайн.", key: "offline", register: "informeel" },
      { nl: "Laten we samen even de snelheid checken.", ru: "Давайте вместе проверим скорость.", key: "checken", register: "informeel" },
      { nl: "Alles staat nu goed ingesteld.", ru: "Всё теперь настроено правильно.", key: "ingesteld", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain the setup in English too.", ru: "С радостью объясню настройку и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen"],
    traps: [
      {
        wrong: "Valt de verbinding weg helemaal straks?",
        right: "Valt de verbinding straks helemaal weg?",
        why: "Отделяемая частица weg уходит в конец фразы, а обстоятельство времени straks и наречие helemaal встают перед ней.",
      },
      {
        wrong: "de router, het verbinding",
        right: "de router, de verbinding",
        why: "Оба de: de router, de verbinding.",
      },
    ],
    gate: [
      {
        word: "glasvezel",
        focus: "составное слово",
        tip: "ХЛАС-фе:-зел. glas + vezel — оптоволокно, буквально «стеклянное волокно».",
      },
      {
        word: "meterkast",
        focus: "составное слово",
        tip: "МЕ:-тер-каст. meter + kast — щиток со счётчиками.",
      },
    ],
  },
  {
    id: "contract-verlenging-gesprek",
    domain: "werk",
    level: "A2",
    title: "Разговор о продлении трудового контракта",
    context: "Разговор с руководителем за месяц до окончания срочного трудового контракта",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Руководитель начнёт с общей оценки вашей работы за период.",
      "Может сразу предложить продление или сказать, что решение будет позже.",
      "Обсудят, меняются ли условия — часы, зарплата, обязанности.",
      "В конце договорятся, когда прозвучит окончательный ответ.",
    ],
    lines: [
      {
        nl: "Ik hoor graag hoe het verdergaat met mijn contract.",
        ru: "Хотел бы узнать, как обстоят дела с моим контрактом.",
      },
      {
        nl: "Zijn er wijzigingen in de voorwaarden?",
        ru: "Есть ли изменения в условиях?",
      },
      {
        nl: "Wanneer hoor ik het definitieve antwoord?",
        ru: "Когда я узнаю окончательный ответ?",
      },
      {
        nl: "Ik sta open voor een gesprek hierover.",
        ru: "Я открыт для разговора об этом.",
      },
    ],
    replyBank: [
      { nl: "We zijn erg tevreden over je werk.", ru: "Мы очень довольны твоей работой.", key: "tevreden", register: "informeel" },
      { nl: "We willen je contract graag verlengen.", ru: "Мы хотели бы продлить твой контракт.", key: "verlengen", register: "informeel" },
      { nl: "De voorwaarden blijven verder hetzelfde.", ru: "Остальные условия остаются прежними.", key: "hetzelfde", register: "neutraal" },
      { nl: "Je hoort dit uiterlijk volgende week definitief.", ru: "Окончательно ты узнаешь об этом не позднее следующей недели.", key: "uiterlijk", register: "formeel" },
      { nl: "Heb je zelf nog wensen hierover?", ru: "У тебя самого есть пожелания на этот счёт?", key: "wensen", register: "informeel" },
      { nl: "Kun je dat nog een keer zeggen?", ru: "Можешь повторить?", key: "nog een keer", register: "informeel" },
      { nl: "We can discuss this in English if you prefer.", ru: "Можем обсудить это по-английски, если предпочитаешь.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Ik hoor graag hoe verdergaat het met mijn contract.",
        right: "Ik hoor graag hoe het verdergaat met mijn contract.",
        why: "В придаточном, вводимом «hoe», подлежащее het встаёт перед глаголом verdergaat, а не после — как в главном предложении.",
      },
      {
        wrong: "het contract, de voorwaarde",
        right: "het contract, de voorwaarde",
        why: "het contract, de voorwaarde — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "verlengen",
        focus: "ударение на -LEN-",
        tip: "вер-ЛЕНХ-ен. Продлевать — уже знакомый глагол из других сценариев.",
      },
      {
        word: "definitief",
        focus: "ударение на -TIEF",
        tip: "де-фи-ни-ТИ:Ф. Окончательный — прилагательное с ударением на последний слог.",
      },
    ],
  },
  {
    id: "uwv-ww-aanvragen",
    domain: "werk",
    level: "A2",
    title: "Оформить пособие по безработице (WW)",
    context: "Звонок или визит в UWV после потери работы — оформление WW-uitkering",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Спросят дату последнего рабочего дня и причину увольнения.",
      "Уточнят трудовой стаж — от него зависит длительность выплат.",
      "Объяснят обязанность искать работу и подавать отчёты (sollicitatieplicht).",
      "В конце скажут, когда придёт первая выплата.",
    ],
    lines: [
      {
        nl: "Ik wil een WW-uitkering aanvragen.",
        ru: "Я хочу оформить пособие по безработице.",
      },
      {
        nl: "Mijn laatste werkdag was vorige week.",
        ru: "Мой последний рабочий день был на прошлой неделе.",
      },
      {
        nl: "Hoe lang duurt mijn uitkering ongeveer?",
        ru: "Сколько примерно будет длиться моё пособие?",
      },
      {
        nl: "Wat moet ik doen om aan mijn sollicitatieplicht te voldoen?",
        ru: "Что мне делать, чтобы выполнить обязанность по поиску работы?",
      },
    ],
    replyBank: [
      { nl: "Wat was de reden van uw ontslag?", ru: "Какова была причина увольнения?", key: "ontslag", register: "formeel" },
      { nl: "Hoeveel jaar heeft u aaneengesloten gewerkt?", ru: "Сколько лет вы непрерывно работали?", key: "aaneengesloten", register: "formeel" },
      { nl: "U moet minimaal één keer per week solliciteren.", ru: "Вам нужно подавать заявки минимум раз в неделю.", key: "solliciteren", register: "formeel" },
      { nl: "De eerste betaling volgt binnen vier weken.", ru: "Первая выплата придёт в течение четырёх недель.", key: "vier weken", register: "formeel" },
      { nl: "U moet dit maandelijks bij ons doorgeven.", ru: "Это нужно ежемесячно нам сообщать.", key: "maandelijks", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "We can explain this process in English too.", ru: "Можем объяснить этот процесс и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Wat ik moet doen om te voldoen aan mijn sollicitatieplicht?",
        right: "Wat moet ik doen om aan mijn sollicitatieplicht te voldoen?",
        why: "После вопросительного слова сразу глагол moet, подлежащее ik — третьим; в обороте «om … te» глагол в инфинитиве уходит в самый конец.",
      },
      {
        wrong: "de uitkering, het ontslag",
        right: "de uitkering, het ontslag",
        why: "de uitkering, het ontslag — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "sollicitatieplicht",
        focus: "составное слово",
        tip: "со-ли-си-ТА:-си-плихт. sollicitatie + plicht — обязанность искать работу.",
      },
      {
        word: "aaneengesloten",
        focus: "составное слово",
        tip: "А:-не:н-хə-сло:-тен. Непрерывно — важно для расчёта стажа.",
      },
    ],
  },
  {
    id: "loondienst-belastingaangifte",
    domain: "werk",
    level: "A2",
    title: "Спросить у HR про годовую справку для налоговой",
    context: "Короткий разговор с HR-отделом про jaaropgave — годовую справку о доходах для налоговой декларации",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Спросите, когда обычно рассылают jaaropgave — обычно в начале года.",
      "Уточните, куда обращаться, если документ не пришёл или в нём ошибка.",
      "HR может объяснить, что документ также доступен в личном кабинете сотрудника.",
      "В конце уточните срок подачи налоговой декларации.",
    ],
    lines: [
      {
        nl: "Wanneer ontvang ik mijn jaaropgave?",
        ru: "Когда я получу свою годовую справку?",
      },
      {
        nl: "Ik heb hem nog niet gezien in mijn inbox.",
        ru: "Я ещё не видел её в своей почте.",
      },
      {
        nl: "Kan ik hem ook via het personeelsportaal vinden?",
        ru: "Могу я найти её также через портал сотрудника?",
      },
      {
        nl: "Tot wanneer moet ik mijn aangifte indienen?",
        ru: "До какого срока мне нужно подать декларацию?",
      },
    ],
    replyBank: [
      { nl: "De jaaropgave gaat begin februari de deur uit.", ru: "Годовая справка рассылается в начале февраля.", key: "begin februari", register: "neutraal" },
      { nl: "U kunt hem ook downloaden via het portaal.", ru: "Можете также скачать её через портал.", key: "portaal", register: "neutraal" },
      { nl: "De aangifte moet meestal voor één mei binnen zijn.", ru: "Декларацию обычно нужно подать до первого мая.", key: "één mei", register: "formeel" },
      { nl: "Als er iets ontbreekt, mailt u de salarisadministratie.", ru: "Если чего-то не хватает, напишите в отдел зарплат.", key: "salarisadministratie", register: "formeel" },
      { nl: "Wilt u dat ik het nu voor u opzoek?", ru: "Хотите, я сейчас это для вас найду?", key: "opzoek", register: "informeel" },
      { nl: "Kunt u dat nog een keer opschrijven?", ru: "Можете это записать ещё раз?", key: "opschrijven", register: "informeel" },
      { nl: "I'm happy to send this in English too.", ru: "С радостью пришлю это и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "cijfers"],
    traps: [
      {
        wrong: "Ik heb hem gezien nog niet in mijn inbox.",
        right: "Ik heb hem nog niet gezien in mijn inbox.",
        why: "«nog niet» встаёт перед причастием, а не после него.",
      },
      {
        wrong: "de jaaropgave, het portaal",
        right: "de jaaropgave, het portaal",
        why: "de jaaropgave, het portaal — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "jaaropgave",
        focus: "составное слово, долгое aa",
        tip: "ЯР-оп-ха:-вə. jaar + opgave — годовая справка о доходах.",
      },
      {
        word: "salarisadministratie",
        focus: "самое длинное слово в сценарии",
        tip: "са-ЛА:-рис-ад-ми-нис-тра:-си. Отдел, занимающийся расчётом зарплаты.",
      },
    ],
  },
  {
    id: "functioneringsgesprek",
    domain: "werk",
    level: "A2",
    title: "Ежегодная беседа по итогам работы",
    context: "Плановая ежегодная беседа с руководителем — functioneringsgesprek",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Руководитель спросит вашу собственную оценку года — что получилось, что нет.",
      "Обсудят конкретные примеры, а не только общие впечатления.",
      "Могут предложить цели на следующий год или курс обучения.",
      "В конце вместе запишут договорённости в форму.",
    ],
    lines: [
      {
        nl: "Ik ben over het algemeen tevreden met dit jaar.",
        ru: "В целом я доволен этим годом.",
      },
      {
        nl: "Dit project vond ik het meest uitdagend.",
        ru: "Этот проект показался мне самым сложным.",
      },
      {
        nl: "Welke doelen stellen we voor volgend jaar?",
        ru: "Какие цели поставим на следующий год?",
      },
      {
        nl: "Is er een cursus die hierbij zou helpen?",
        ru: "Есть ли курс, который в этом помог бы?",
      },
    ],
    replyBank: [
      { nl: "Wat vond je zelf het meest geslaagd dit jaar?", ru: "Что тебе самому показалось наиболее удачным в этом году?", key: "geslaagd", register: "informeel" },
      { nl: "Laten we concrete doelen afspreken.", ru: "Давай договоримся о конкретных целях.", key: "concrete doelen", register: "informeel" },
      { nl: "Een training zou hier zeker bij helpen.", ru: "Тренинг здесь точно помог бы.", key: "training", register: "informeel" },
      { nl: "Ik zet dit even op papier voor ons beiden.", ru: "Я это сейчас запишу для нас обоих.", key: "op papier", register: "informeel" },
      { nl: "Hoe voel je je verder in je rol?", ru: "Как ты вообще себя чувствуешь в своей роли?", key: "in je rol", register: "informeel" },
      { nl: "Kun je dat nog een keer uitleggen?", ru: "Можешь объяснить ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "We can do this review in English if you prefer.", ru: "Можем провести эту беседу по-английски, если предпочитаешь.", register: "switch" },
    ],
    repairIds: ["opschrijven", "momentje"],
    traps: [
      {
        wrong: "Dit project ik vond het meest uitdagend.",
        right: "Dit project vond ik het meest uitdagend.",
        why: "Первым стоит обстоятельство/дополнение dit project — глагол vond остаётся на втором месте, подлежащее ik уходит за него.",
      },
      {
        wrong: "het doel, de cursus",
        right: "het doel, de cursus",
        why: "het doel, de cursus — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "functioneringsgesprek",
        focus: "составное слово, самое длинное",
        tip: "функ-ци-о-НЕ:-рингс-хə-спрек. functioneren + gesprek — беседа по итогам работы.",
      },
      {
        word: "uitdagend",
        focus: "ui = /œy/",
        tip: "ЁЙТ-да:-хент. Сложный/бросающий вызов — от uitdagen.",
      },
    ],
  },
  {
    id: "arbeidsconflict-mediation",
    domain: "werk",
    level: "A2",
    title: "Медиация при конфликте на работе",
    context: "Первая встреча с медиатором по поводу конфликта с коллегой",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Медиатор объяснит правила разговора — по очереди, без перебиваний, конфиденциально.",
      "Попросит описать ситуацию со своей стороны, без обвинений.",
      "Поможет сформулировать, что именно вы хотели бы изменить.",
      "В конце договорятся о следующем шаге — совместной встрече или отдельных беседах.",
    ],
    lines: [
      {
        nl: "Ik wil graag mijn kant van het verhaal vertellen.",
        ru: "Я хотел бы рассказать свою сторону истории.",
      },
      {
        nl: "Het probleem begon na een misverstand vorige maand.",
        ru: "Проблема началась после недоразумения в прошлом месяце.",
      },
      {
        nl: "Ik wil vooral weer normaal kunnen samenwerken.",
        ru: "Я хочу прежде всего снова нормально работать вместе.",
      },
      {
        nl: "Wat is de volgende stap in dit proces?",
        ru: "Какой следующий шаг в этом процессе?",
      },
    ],
    replyBank: [
      { nl: "We houden ons allebei aan een paar regels.", ru: "Мы оба будем придерживаться нескольких правил.", key: "regels", register: "formeel" },
      { nl: "Vertel rustig wat er volgens u is gebeurd.", ru: "Расскажите спокойно, что, по-вашему, произошло.", key: "volgens u", register: "formeel" },
      { nl: "Wat zou u concreet anders willen zien?", ru: "Что бы вы хотели видеть по-другому конкретно?", key: "concreet", register: "formeel" },
      { nl: "We plannen een gezamenlijk gesprek in.", ru: "Мы назначим совместную встречу.", key: "gezamenlijk", register: "formeel" },
      { nl: "Alles wat hier gezegd wordt, blijft vertrouwelijk.", ru: "Всё, что здесь сказано, остаётся конфиденциальным.", key: "vertrouwelijk", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue in English if that's more comfortable.", ru: "Можем продолжить по-английски, если так удобнее.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik wil vooral kunnen samenwerken weer normaal.",
        right: "Ik wil vooral weer normaal kunnen samenwerken.",
        why: "«weer normaal» встаёт перед закрывающим инфинитивом kunnen samenwerken, а не после него.",
      },
      {
        wrong: "het conflict, de regel",
        right: "het conflict, de regel",
        why: "het conflict, de regel — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "vertrouwelijk",
        focus: "ударение на -TROU-",
        tip: "фер-ТРАУ-вə-лек. Конфиденциальный — от vertrouwen (доверие).",
      },
      {
        word: "gezamenlijk",
        focus: "ударение на -ZA-",
        tip: "хə-ЗА:-мен-лек. Совместный — часто встречается в рабочих разговорах.",
      },
    ],
  },
  {
    id: "reiskostenvergoeding-vraag",
    domain: "werk",
    level: "A2",
    title: "Вопрос о компенсации транспортных расходов",
    context: "Разговор с HR о правилах компенсации транспортных расходов до работы",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Спросят, каким транспортом вы добираетесь — своим или общественным.",
      "Объяснят формулу расчёта — за километр или по фактическим билетам.",
      "Уточнят, нужно ли сохранять чеки или билеты.",
      "В конце скажут, когда компенсация приходит вместе с зарплатой.",
    ],
    lines: [
      {
        nl: "Hoe wordt de reiskostenvergoeding berekend?",
        ru: "Как рассчитывается компенсация транспортных расходов?",
      },
      {
        nl: "Ik reis met het openbaar vervoer.",
        ru: "Я езжу на общественном транспорте.",
      },
      {
        nl: "Moet ik mijn kaartjes bewaren?",
        ru: "Мне нужно сохранять билеты?",
      },
      {
        nl: "Wanneer wordt dit uitbetaald?",
        ru: "Когда это выплачивается?",
      },
    ],
    replyBank: [
      { nl: "Reist u met eigen vervoer of het OV?", ru: "Вы добираетесь на своём транспорте или на общественном?", key: "eigen vervoer", register: "formeel" },
      { nl: "Bij het OV vergoeden we de daadwerkelijke kosten.", ru: "При общественном транспорте мы возмещаем фактические расходы.", key: "daadwerkelijke kosten", register: "formeel" },
      { nl: "Bewaar uw kaartjes voor de zekerheid.", ru: "Сохраняйте билеты на всякий случай.", key: "voor de zekerheid", register: "informeel" },
      { nl: "Dit wordt samen met uw salaris uitbetaald.", ru: "Это выплачивается вместе с зарплатой.", key: "uitbetaald", register: "formeel" },
      { nl: "Declareer dit maandelijks via het systeem.", ru: "Заявляйте это ежемесячно через систему.", key: "declareer", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "opschrijven"],
    traps: [
      {
        wrong: "Ik reis met het vervoer openbaar.",
        right: "Ik reis met het openbaar vervoer.",
        why: "Прилагательное openbaar стоит перед существительным vervoer, порядок фиксирован, как во всех устойчивых сочетаниях.",
      },
      {
        wrong: "de vergoeding, het kosten",
        right: "de vergoeding, de kosten",
        why: "de vergoeding, de kosten — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "reiskostenvergoeding",
        focus: "составное слово, самое длинное",
        tip: "РЭЙС-кос-тен-фер-ХУ:-динх. reis + kosten + vergoeding — компенсация транспортных расходов.",
      },
      {
        word: "declareer",
        focus: "ударение на -REER",
        tip: "де-кла-РЕ:Р. Заявлять расходы на возмещение.",
      },
    ],
  },
  {
    id: "thuiswerken-afspraken",
    domain: "werk",
    level: "A2",
    title: "Договориться об удалённой работе",
    context: "Разговор с руководителем о постоянных днях удалённой работы",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Спросите, сколько дней в неделю можно работать из дома.",
      "Руководитель может уточнить, какие дни обязательно быть в офисе для встреч команды.",
      "Обсудят, как это отразится на оценке результатов работы.",
      "В конце договорятся, кто и как это зафиксирует официально.",
    ],
    lines: [
      {
        nl: "Ik wil graag twee dagen per week thuiswerken.",
        ru: "Я хотел бы работать из дома два дня в неделю.",
      },
      {
        nl: "Welke dagen moet ik zeker op kantoor zijn?",
        ru: "В какие дни мне обязательно нужно быть в офисе?",
      },
      {
        nl: "Verandert er iets aan de beoordeling van mijn werk?",
        ru: "Изменится ли что-то в оценке моей работы?",
      },
      {
        nl: "Kunnen we dit schriftelijk vastleggen?",
        ru: "Можем зафиксировать это письменно?",
      },
    ],
    replyBank: [
      { nl: "Twee dagen thuiswerken is prima bespreekbaar.", ru: "Два дня удалённой работы вполне обсуждаемо.", key: "bespreekbaar", register: "informeel" },
      { nl: "Op dinsdag en donderdag hebben we teamoverleg.", ru: "По вторникам и четвергам у нас командные встречи.", key: "teamoverleg", register: "neutraal" },
      { nl: "De beoordeling blijft gebaseerd op resultaten.", ru: "Оценка по-прежнему строится на результатах.", key: "resultaten", register: "formeel" },
      { nl: "Ik leg dit vast in een korte afspraak.", ru: "Я зафиксирую это в коротком соглашении.", key: "afspraak", register: "informeel" },
      { nl: "Laten we dit over drie maanden evalueren.", ru: "Давай оценим это через три месяца.", key: "evalueren", register: "informeel" },
      { nl: "Kun je dat nog een keer zeggen?", ru: "Можешь повторить?", key: "nog een keer", register: "informeel" },
      { nl: "We can discuss this in English if easier.", ru: "Можем обсудить это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["opschrijven", "herhalen"],
    traps: [
      {
        wrong: "Verandert iets er aan de beoordeling?",
        right: "Verandert er iets aan de beoordeling van mijn werk?",
        why: "Безличное er встаёт сразу после глагола, перед подлежащим iets — порядок фиксирован.",
      },
      {
        wrong: "het overleg, de resultaat",
        right: "het overleg, het resultaat",
        why: "het overleg, het resultaat — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "thuiswerken",
        focus: "составное слово",
        tip: "ТЁЙС-вер-кен. thuis + werken — работать из дома.",
      },
      {
        word: "teamoverleg",
        focus: "составное слово",
        tip: "ТИ:М-о:-вер-лех. team + overleg — командная встреча.",
      },
    ],
  },
  {
    id: "pensioenfonds-vraag",
    domain: "werk",
    level: "A2",
    title: "Вопрос про пенсионный фонд",
    context: "Звонок в пенсионный фонд компании — вопрос про накопления и отчисления",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "Спросят номер полиса или BSN для идентификации.",
      "Объяснят, как читать годовой обзор пенсионных накоплений.",
      "Могут рассказать про возможность дополнительных добровольных взносов.",
      "В конце скажут, где посмотреть актуальный баланс онлайн.",
    ],
    lines: [
      {
        nl: "Ik heb een vraag over mijn pensioenopbouw.",
        ru: "У меня вопрос про мои пенсионные накопления.",
      },
      {
        nl: "Kunt u het overzicht voor mij uitleggen?",
        ru: "Можете объяснить мне этот обзор?",
      },
      {
        nl: "Kan ik vrijwillig extra bijdragen?",
        ru: "Могу я вносить дополнительные добровольные взносы?",
      },
      {
        nl: "Waar zie ik mijn actuele saldo?",
        ru: "Где мне посмотреть актуальный баланс?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw polisnummer of BSN?", ru: "Ваш номер полиса или BSN?", key: "polisnummer", register: "formeel" },
      { nl: "Dit bedrag toont uw huidige opbouw.", ru: "Эта сумма показывает ваши текущие накопления.", key: "huidige opbouw", register: "neutraal" },
      { nl: "Extra bijstorten kan altijd, binnen bepaalde grenzen.", ru: "Дополнительные взносы возможны всегда, в определённых пределах.", key: "bijstorten", register: "formeel" },
      { nl: "Uw saldo staat altijd in het online portaal.", ru: "Ваш баланс всегда доступен в онлайн-портале.", key: "saldo", register: "neutraal" },
      { nl: "Ik stuur u de link per e-mail.", ru: "Пришлю вам ссылку по почте.", key: "link", register: "informeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "cijfers"],
    traps: [
      {
        wrong: "Kan ik bijdragen extra vrijwillig?",
        right: "Kan ik vrijwillig extra bijdragen?",
        why: "Наречия vrijwillig и extra встают перед инфинитивом bijdragen в этом порядке, а не после него.",
      },
      {
        wrong: "het pensioen, de saldo",
        right: "het pensioen, het saldo",
        why: "het pensioen, het saldo — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "pensioenopbouw",
        focus: "составное слово",
        tip: "пен-си-У:Н-оп-бау. pensioen + opbouw — накопление пенсии.",
      },
      {
        word: "bijstorten",
        focus: "отделяемый глагол",
        tip: "БЭЙ-стор-тен. Довносить — ik stort bij.",
      },
    ],
  },
  {
    id: "opzegtermijn-bespreken",
    domain: "werk",
    level: "A2",
    title: "Обсудить срок уведомления при увольнении",
    context: "Разговор с HR при подаче заявления об уходе — обсуждение срока отработки",
    minutes: 6,
    openerContext: "informeel",
    brief: [
      "Сообщите о своём решении уйти и предполагаемую дату последнего дня.",
      "HR уточнит срок уведомления по контракту — обычно месяц.",
      "Обсудят передачу дел и возможный отпуск, который нужно использовать.",
      "В конце попросят подтвердить увольнение письменно.",
    ],
    lines: [
      {
        nl: "Ik wil mijn ontslag aankondigen.",
        ru: "Я хочу объявить об уходе.",
      },
      {
        nl: "Mijn laatste werkdag zou over een maand zijn.",
        ru: "Мой последний рабочий день был бы через месяц.",
      },
      {
        nl: "Moet ik nog vakantiedagen opnemen?",
        ru: "Мне нужно ещё использовать отпускные дни?",
      },
      {
        nl: "Kunt u dit schriftelijk bevestigen?",
        ru: "Можете подтвердить это письменно?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw beoogde laatste werkdag?", ru: "Какой у вас предполагаемый последний рабочий день?", key: "laatste werkdag", register: "formeel" },
      { nl: "De opzegtermijn in uw contract is één maand.", ru: "Срок уведомления в вашем контракте — один месяц.", key: "opzegtermijn", register: "formeel" },
      { nl: "U heeft nog vijf vakantiedagen openstaan.", ru: "У вас ещё осталось пять неиспользованных отпускных дней.", key: "openstaan", register: "formeel" },
      { nl: "We sturen u een schriftelijke bevestiging.", ru: "Мы отправим вам письменное подтверждение.", key: "bevestiging", register: "formeel" },
      { nl: "Laten we samen de overdracht plannen.", ru: "Давайте вместе спланируем передачу дел.", key: "overdracht", register: "neutraal" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can arrange the paperwork in English too.", ru: "Можем оформить документы и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil aankondigen mijn ontslag.",
        right: "Ik wil mijn ontslag aankondigen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "het ontslag, de overdracht",
        right: "het ontslag, de overdracht",
        why: "het ontslag, de overdracht — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "opzegtermijn",
        focus: "составное слово",
        tip: "ОП-зех-тер-мэйн. Уже встречалось в разговоре про аренду — здесь про работу.",
      },
      {
        word: "overdracht",
        focus: "ударение на -DRACHT",
        tip: "О:-вер-драхт. Передача дел — от глагола overdragen.",
      },
    ],
  },
  {
    id: "autokeuring-apk",
    domain: "dagelijks",
    level: "A2",
    title: "Пройти техосмотр автомобиля (APK)",
    context: "Визит в гараж на ежегодный технический осмотр автомобиля (APK-keuring)",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "На стойке спросят номер машины и последний пробег.",
      "Объяснят, сколько времени займёт проверка и можно ли подождать на месте.",
      "Если найдут проблему, объяснят, критична ли она для прохождения осмотра.",
      "В конце выдадут сертификат или назначат срок на устранение недостатков.",
    ],
    lines: [
      {
        nl: "Ik kom voor de jaarlijkse APK-keuring.",
        ru: "Я пришёл на ежегодный техосмотр.",
      },
      {
        nl: "Hoeveel kilometer staat er nu op de teller?",
        ru: "Сколько сейчас на счётчике?",
      },
      {
        nl: "Kan ik hier wachten tot het klaar is?",
        ru: "Могу я подождать здесь, пока не будет готово?",
      },
      {
        nl: "Is dit een probleem waarmee ik hem niet mag laten rijden?",
        ru: "Это проблема, из-за которой мне нельзя ездить дальше?",
      },
    ],
    replyBank: [
      { nl: "Wat is het kenteken van uw auto?", ru: "Номер вашей машины?", key: "kenteken", register: "formeel" },
      { nl: "De keuring duurt ongeveer drie kwartier.", ru: "Осмотр занимает примерно три четверти часа.", key: "drie kwartier", register: "neutraal" },
      { nl: "U kunt hier gerust wachten.", ru: "Можете спокойно подождать здесь.", key: "wachten", register: "informeel" },
      { nl: "Dit is een licht mankement, geen probleem.", ru: "Это небольшой недостаток, не проблема.", key: "licht mankement", register: "neutraal" },
      { nl: "Dit moet u binnen twee maanden laten repareren.", ru: "Это нужно исправить в течение двух месяцев.", key: "twee maanden", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain the results in English too.", ru: "С радостью объясню результаты и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "betekent"],
    traps: [
      {
        wrong: "Is dit een probleem waarmee ik niet mag laten hem rijden?",
        right: "Is dit een probleem waarmee ik hem niet mag laten rijden?",
        why: "Дополнение hem встаёт перед закрывающими глаголами mag laten rijden, а не разрывает их порядок посередине.",
      },
      {
        wrong: "de keuring, het mankement",
        right: "de keuring, het mankement",
        why: "de keuring, het mankement — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "keuring",
        focus: "ударение на KEU-",
        tip: "КЁ:-ринх. Осмотр/проверка — базовое слово для техосмотра.",
      },
      {
        word: "mankement",
        focus: "ударение на -MENT",
        tip: "ман-кə-МЕНТ. Небольшая неисправность — не так серьёзно, как storing.",
      },
    ],
  },
  {
    id: "sportschool-lidmaatschap",
    domain: "dagelijks",
    level: "A2",
    title: "Оформить абонемент в спортзал",
    context: "Визит в спортзал для оформления абонемента и уточнения условий отмены",
    minutes: 6,
    openerContext: "winkel",
    brief: [
      "Спросят, какой тип абонемента интересует — месячный или годовой, со скидкой при годовой оплате.",
      "Расскажут про минимальный срок обязательства и условия расторжения.",
      "Могут предложить бесплатное вводное занятие.",
      "В конце оформят абонемент и покажут, как работает вход по карте.",
    ],
    lines: [
      {
        nl: "Ik wil me graag inschrijven voor een lidmaatschap.",
        ru: "Я хотел бы оформить абонемент.",
      },
      {
        nl: "Wat is de minimale looptijd van het contract?",
        ru: "Какой минимальный срок обязательства по контракту?",
      },
      {
        nl: "Hoe kan ik dit later weer opzeggen?",
        ru: "Как потом можно это отменить?",
      },
      {
        nl: "Is er een gratis proefles?",
        ru: "Есть бесплатное пробное занятие?",
      },
    ],
    replyBank: [
      { nl: "Wilt u een maand- of jaarabonnement?", ru: "Хотите месячный или годовой абонемент?", key: "jaarabonnement", register: "neutraal" },
      { nl: "De minimale looptijd is drie maanden.", ru: "Минимальный срок — три месяца.", key: "drie maanden", register: "formeel" },
      { nl: "Opzeggen kan met één maand opzegtermijn.", ru: "Отменить можно с уведомлением за месяц.", key: "opzegtermijn", register: "formeel" },
      { nl: "De eerste les is altijd gratis.", ru: "Первое занятие всегда бесплатное.", key: "gratis", register: "informeel" },
      { nl: "U betaalt automatisch via incasso.", ru: "Оплата автоматически через прямое дебетование.", key: "incasso", register: "formeel" },
      { nl: "Kunt u dat nog een keer uitleggen?", ru: "Объясните ещё раз?", key: "uitleggen", register: "informeel" },
      { nl: "I'm happy to explain the plans in English too.", ru: "С радостью объясню тарифы и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "betekent"],
    traps: [
      {
        wrong: "Ik wil inschrijven me voor een lidmaatschap.",
        right: "Ik wil me graag inschrijven voor een lidmaatschap.",
        why: "Возвратное местоимение me встаёт сразу после подлежащего/глагола, не после отделяемого инфинитива.",
      },
      {
        wrong: "het abonnement, de looptijd",
        right: "het abonnement, de looptijd",
        why: "het abonnement, de looptijd — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "lidmaatschap",
        focus: "составное слово",
        tip: "ЛИТ-ма:т-сха-п. lid + maatschap — членство/абонемент.",
      },
      {
        word: "incasso",
        focus: "ударение на -CAS-",
        tip: "ин-КА-со. Прямое дебетование — регулярное автоматическое списание.",
      },
    ],
  },
  {
    id: "dierenarts-huisdier",
    domain: "dagelijks",
    level: "A2",
    title: "Приём у ветеринара",
    context: "Визит к ветеринару с домашним питомцем — плановый осмотр или лёгкое недомогание",
    minutes: 6,
    openerContext: "loket",
    brief: [
      "Ветеринар спросит, что именно беспокоит и как долго.",
      "Уточнит вес, возраст и последние прививки животного.",
      "Может предложить анализы или просто наблюдение дома.",
      "В конце назначит дату следующего визита, если нужно.",
    ],
    lines: [
      {
        nl: "Mijn kat eet al twee dagen minder.",
        ru: "Моя кошка уже два дня ест меньше.",
      },
      {
        nl: "Ze is verder wel actief zoals altijd.",
        ru: "В остальном она активна, как обычно.",
      },
      {
        nl: "Zijn haar vaccinaties nog up-to-date?",
        ru: "Её прививки ещё актуальны?",
      },
      {
        nl: "Moet ik me hier zorgen om maken?",
        ru: "Мне стоит из-за этого беспокоиться?",
      },
    ],
    replyBank: [
      { nl: "Sinds wanneer eet ze minder precies?", ru: "С каких пор именно она ест меньше?", key: "sinds wanneer", register: "formeel" },
      { nl: "Haar vaccinaties zijn nog volledig up-to-date.", ru: "Её прививки полностью актуальны.", key: "up-to-date", register: "neutraal" },
      { nl: "Laten we haar even wegen en voelen.", ru: "Давайте её взвесим и осмотрим.", key: "wegen", register: "informeel" },
      { nl: "Dit hoeft u niet meteen ongerust te maken.", ru: "Из-за этого не стоит сразу волноваться.", key: "ongerust", register: "formeel" },
      { nl: "Kom over een week terug als het niet beter gaat.", ru: "Возвращайтесь через неделю, если лучше не станет.", key: "over een week", register: "neutraal" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["betekent", "herhalen"],
    traps: [
      {
        wrong: "Ze is actief wel zoals altijd verder.",
        right: "Ze is verder wel actief zoals altijd.",
        why: "«verder» и подтверждающее «wel» встают в начале смыслового блока, а не разбрасываются по концу фразы.",
      },
      {
        wrong: "de kat, het vaccinatie",
        right: "de kat, de vaccinatie",
        why: "Оба de: de kat, de vaccinatie.",
      },
    ],
    gate: [
      {
        word: "dierenarts",
        focus: "составное слово",
        tip: "ДИ:-рен-артс. dieren + arts — ветеринар.",
      },
      {
        word: "ongerust",
        focus: "ударение на -RUST",
        tip: "он-хə-РЮСТ. Уже знакомое слово из медицинских сценариев — здесь про питомца.",
      },
    ],
  },
  {
    id: "kledingwinkel-omruilen",
    domain: "dagelijks",
    level: "A2",
    title: "Обменять одежду в магазине",
    context: "Возврат в магазин одежды — обмен купленной вещи на другой размер",
    minutes: 5,
    openerContext: "winkel",
    brief: [
      "На кассе спросят чек и причину обмена.",
      "Проверят, что вещь не ношена и с бирками.",
      "Могут предложить обмен на другой размер или возврат денег на карту.",
      "В конце уточнят, устраивает ли вас найденная замена.",
    ],
    lines: [
      {
        nl: "Ik wil deze trui graag omruilen voor een andere maat.",
        ru: "Я хотел бы обменять этот свитер на другой размер.",
      },
      {
        nl: "Hier is mijn bonnetje.",
        ru: "Вот мой чек.",
      },
      {
        nl: "Kan ik ook gewoon mijn geld terugkrijgen?",
        ru: "Могу я просто вернуть деньги?",
      },
      {
        nl: "Hebben jullie deze maat nog op voorraad?",
        ru: "У вас есть этот размер в наличии?",
      },
    ],
    replyBank: [
      { nl: "Heeft u hier uw aankoopbon bij?", ru: "У вас с собой чек о покупке?", key: "aankoopbon", register: "formeel" },
      { nl: "Zitten de kaartjes er nog aan?", ru: "Бирки ещё на месте?", key: "kaartjes", register: "informeel" },
      { nl: "Terugbetaling kan alleen op dezelfde kaart.", ru: "Возврат денег возможен только на ту же карту.", key: "terugbetaling", register: "formeel" },
      { nl: "Deze maat is helaas niet meer op voorraad.", ru: "К сожалению, этого размера больше нет в наличии.", key: "op voorraad", register: "neutraal" },
      { nl: "Wilt u een andere kleur proberen?", ru: "Хотите попробовать другой цвет?", key: "andere kleur", register: "informeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to help in English too.", ru: "С радостью помогу и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "klopt"],
    traps: [
      {
        wrong: "Kan ik ook gewoon terugkrijgen mijn geld?",
        right: "Kan ik ook gewoon mijn geld terugkrijgen?",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de bonnetje, het maat",
        right: "het bonnetje, de maat",
        why: "het bonnetje (уменьшительное — всегда het), de maat.",
      },
    ],
    gate: [
      {
        word: "omruilen",
        focus: "ударение на RUI-",
        tip: "ОМ-рёй-лен. Обменивать — om + ruilen.",
      },
      {
        word: "voorraad",
        focus: "долгое aa",
        tip: "ВО:Р-ра:т. Наличие/запас на складе.",
      },
    ],
  },
  {
    id: "taxi-bestellen-telefonisch",
    domain: "dagelijks",
    level: "A2",
    title: "Заказать такси по телефону",
    context: "Звонок в таксомоторную компанию — заказ такси на определённое время и адрес",
    minutes: 5,
    openerContext: "telefoon",
    brief: [
      "Спросят адрес отправления и назначения.",
      "Уточнят точное время, к которому нужна машина.",
      "Могут спросить, нужно ли детское кресло или место для багажа.",
      "В конце назовут примерную стоимость и время ожидания.",
    ],
    lines: [
      {
        nl: "Ik wil graag een taxi bestellen.",
        ru: "Я хотел бы заказать такси.",
      },
      {
        nl: "Ik moet om acht uur bij het station zijn.",
        ru: "Мне нужно быть на вокзале в восемь.",
      },
      {
        nl: "Ik heb best veel bagage bij me.",
        ru: "У меня довольно много багажа.",
      },
      {
        nl: "Hoeveel gaat de rit ongeveer kosten?",
        ru: "Сколько примерно будет стоить поездка?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw ophaaladres?", ru: "Ваш адрес, откуда забрать?", key: "ophaaladres", register: "formeel" },
      { nl: "Hoe laat moet de taxi er zijn?", ru: "Во сколько такси должно приехать?", key: "hoe laat", register: "neutraal" },
      { nl: "We sturen een grotere auto voor de bagage.", ru: "Мы пришлём машину побольше для багажа.", key: "grotere auto", register: "informeel" },
      { nl: "De rit kost ongeveer twintig euro.", ru: "Поездка стоит примерно двадцать евро.", key: "twintig euro", register: "neutraal" },
      { nl: "De taxi is over tien minuten bij u.", ru: "Такси будет у вас через десять минут.", key: "tien minuten", register: "neutraal" },
      { nl: "Kunt u dat adres nog een keer herhalen?", ru: "Повторите этот адрес ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I can take this booking in English too.", ru: "Могу принять этот заказ и по-английски.", register: "switch" },
    ],
    repairIds: ["cijfers", "herhalen", "spellen"],
    traps: [
      {
        wrong: "Ik heb bagage bij me best veel.",
        right: "Ik heb best veel bagage bij me.",
        why: "«best veel» встаёт перед существительным bagage, а не после дополнения — как усилительное сочетание, оно всегда стоит перед словом, к которому относится.",
      },
      {
        wrong: "de taxi, het bagage",
        right: "de taxi, de bagage",
        why: "Оба de: de taxi, de bagage.",
      },
    ],
    gate: [
      {
        word: "ophaaladres",
        focus: "составное слово",
        tip: "ОП-ха:л-а-дрес. ophalen + adres — адрес, откуда забрать пассажира.",
      },
      {
        word: "bagage",
        focus: "заимствование из французского",
        tip: "ба-ХА:-жə. Багаж — произносится почти как во французском, с мягким «ж».",
      },
    ],
  },
  {
    id: "verzekering-fiets-diefstal",
    domain: "dagelijks",
    level: "A2",
    title: "Сообщить страховой о краже велосипеда",
    context: "Звонок в страховую компанию после кражи велосипеда — вместе с уже поданным заявлением в полицию",
    minutes: 6,
    openerContext: "telefoon",
    brief: [
      "Спросят номер заявления в полиции (aangiftenummer) — оформите его заранее.",
      "Уточнят, где и когда именно украли велосипед.",
      "Попросят чек или другое доказательство покупки, если оно есть.",
      "В конце скажут, сколько времени займёт рассмотрение и как придёт компенсация.",
    ],
    lines: [
      {
        nl: "Mijn fiets is gisteren gestolen.",
        ru: "Мой велосипед украли вчера.",
      },
      {
        nl: "Ik heb al aangifte gedaan bij de politie.",
        ru: "Я уже подал заявление в полицию.",
      },
      {
        nl: "Ik heb helaas geen aankoopbon meer.",
        ru: "У меня, к сожалению, больше нет чека о покупке.",
      },
      {
        nl: "Hoe lang duurt de afhandeling ongeveer?",
        ru: "Сколько примерно займёт рассмотрение?",
      },
    ],
    replyBank: [
      { nl: "Heeft u het aangiftenummer bij de hand?", ru: "У вас под рукой номер заявления?", key: "aangiftenummer", register: "formeel" },
      { nl: "Waar en wanneer is de fiets gestolen?", ru: "Где и когда украли велосипед?", key: "gestolen", register: "formeel" },
      { nl: "Een foto van de fiets is ook voldoende bewijs.", ru: "Фото велосипеда тоже достаточное доказательство.", key: "bewijs", register: "neutraal" },
      { nl: "De afhandeling duurt meestal twee weken.", ru: "Рассмотрение обычно занимает две недели.", key: "twee weken", register: "formeel" },
      { nl: "U ontvangt het bedrag op uw rekening.", ru: "Сумма придёт вам на счёт.", key: "op uw rekening", register: "formeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "We can handle this claim in English too.", ru: "Можем обработать эту заявку и на английском.", register: "switch" },
    ],
    repairIds: ["herhalen", "spellen"],
    traps: [
      {
        wrong: "Mijn fiets was gestolen gisteren.",
        right: "Mijn fiets is gisteren gestolen.",
        why: "Кража — событие, а не длящееся состояние: перфект образуется через is, обстоятельство времени встаёт перед причастием, а не после него.",
      },
      {
        wrong: "de aangifte, het bewijs",
        right: "de aangifte, het bewijs",
        why: "de aangifte, het bewijs — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "gestolen",
        focus: "ударение на -STO-",
        tip: "хə-СТО:-лен. Украдено — причастие от stelen.",
      },
      {
        word: "afhandeling",
        focus: "харде G перед -ing",
        tip: "АФ-хан-дə-линх. Обработка/рассмотрение заявки.",
      },
    ],
  },
  {
    id: "buurthuis-cursus-aanmelden",
    domain: "dagelijks",
    level: "A2",
    title: "Записаться на курс в общественном центре",
    context: "Визит в buurthuis (общественный центр) для записи на курс — например, кулинарию или рукоделие",
    minutes: 5,
    openerContext: "informeel",
    brief: [
      "Спросят, какой курс интересует и есть ли уже опыт в этой теме.",
      "Расскажут расписание и стоимость — часто со скидкой для местных жителей.",
      "Могут спросить, нужен ли материал с собой или всё предоставляется.",
      "В конце запишут вас и дадут расписание на бумаге.",
    ],
    lines: [
      {
        nl: "Ik wil me aanmelden voor de kookcursus.",
        ru: "Я хочу записаться на курс кулинарии.",
      },
      {
        nl: "Ik heb hier geen ervaring mee.",
        ru: "У меня в этом нет опыта.",
      },
      {
        nl: "Moet ik zelf ingrediënten meenemen?",
        ru: "Мне нужно самому приносить ингредиенты?",
      },
      {
        nl: "Is er korting voor buurtbewoners?",
        ru: "Есть скидка для местных жителей?",
      },
    ],
    replyBank: [
      { nl: "Heeft u al ervaring met koken?", ru: "У вас уже есть опыт готовки?", key: "ervaring", register: "informeel" },
      { nl: "Alle ingrediënten worden door ons geregeld.", ru: "Все ингредиенты мы организуем сами.", key: "geregeld", register: "informeel" },
      { nl: "Buurtbewoners krijgen tien procent korting.", ru: "Местным жителям скидка десять процентов.", key: "korting", register: "informeel" },
      { nl: "De cursus start volgende week dinsdag.", ru: "Курс начинается в следующий вторник.", key: "volgende week", register: "neutraal" },
      { nl: "Hier is het rooster op papier.", ru: "Вот расписание на бумаге.", key: "rooster", register: "informeel" },
      { nl: "Kunt u dat nog een keer opschrijven?", ru: "Можете записать это ещё раз?", key: "opschrijven", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["opschrijven", "cijfers"],
    traps: [
      {
        wrong: "Ik heb geen ervaring hier mee.",
        right: "Ik heb hier geen ervaring mee.",
        why: "«hier … mee» — застывшее сочетание с er/hier в начале и предлогом в конце, между ними встаёт дополнение geen ervaring.",
      },
      {
        wrong: "de cursus, het korting",
        right: "de cursus, de korting",
        why: "Оба de: de cursus, de korting.",
      },
    ],
    gate: [
      {
        word: "buurtbewoners",
        focus: "составное слово",
        tip: "БЮРТ-бə-во:-нерс. buurt + bewoners — жители района.",
      },
      {
        word: "ingrediënten",
        focus: "трема надë",
        tip: "ин-хре-ди-ЕН-тен. Ингредиенты — трема показывает раздельное произношение i и e.",
      },
    ],
  },
  {
    id: "cadeaubon-inwisselen",
    domain: "dagelijks",
    level: "A2",
    title: "Использовать подарочный сертификат",
    context: "Визит в магазин — использование подарочного сертификата (cadeaubon) и вопрос про условия",
    minutes: 4,
    openerContext: "winkel",
    brief: [
      "На кассе спросят номинал сертификата и что именно вы выбрали.",
      "Могут уточнить срок действия, если сертификат старый.",
      "Объяснят, что делать, если сумма покупки меньше номинала сертификата.",
      "В конце проведут оплату и, если нужно, выдадут остаток на новом сертификате.",
    ],
    lines: [
      {
        nl: "Ik wil deze cadeaubon graag inwisselen.",
        ru: "Я хотел бы использовать этот подарочный сертификат.",
      },
      {
        nl: "Is deze bon nog geldig?",
        ru: "Этот сертификат ещё действителен?",
      },
      {
        nl: "Wat gebeurt er met het resterende bedrag?",
        ru: "Что будет с оставшейся суммой?",
      },
      {
        nl: "Kan ik het verschil bijbetalen met pin?",
        ru: "Могу я доплатить разницу картой?",
      },
    ],
    replyBank: [
      { nl: "Deze bon is nog een jaar geldig.", ru: "Этот сертификат действителен ещё год.", key: "een jaar geldig", register: "neutraal" },
      { nl: "Het restbedrag zetten we op een nieuwe bon.", ru: "Остаток мы поместим на новый сертификат.", key: "restbedrag", register: "neutraal" },
      { nl: "Bijbetalen met pin is geen probleem.", ru: "Доплатить картой не проблема.", key: "bijbetalen", register: "informeel" },
      { nl: "Deze bon is helaas al verlopen.", ru: "Этот сертификат, к сожалению, уже просрочен.", key: "verlopen", register: "neutraal" },
      { nl: "Zal ik de bon voor u scannen?", ru: "Отсканировать сертификат для вас?", key: "scannen", register: "informeel" },
      { nl: "Kunt u dat nog een keer herhalen?", ru: "Повторите ещё раз?", key: "herhalen", register: "informeel" },
      { nl: "I'm happy to sort this out in English too.", ru: "С радостью разберусь с этим и по-английски.", register: "switch" },
    ],
    repairIds: ["herhalen", "cijfers"],
    traps: [
      {
        wrong: "Ik wil inwisselen deze cadeaubon.",
        right: "Ik wil deze cadeaubon graag inwisselen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de cadeaubon, het bedrag",
        right: "de cadeaubon, het bedrag",
        why: "de cadeaubon, het bedrag — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "cadeaubon",
        focus: "составное слово, заимствование из французского",
        tip: "ка-ДО:-бон. cadeau + bon — подарочный сертификат.",
      },
      {
        word: "verlopen",
        focus: "ударение на -LO-",
        tip: "вер-ЛО:-пен. Просроченный — уже знакомое слово из других сценариев.",
      },
    ],
  },
  // ───────────────────────── ШЕСТАЯ ПАРТИЯ: B1 ─────────────────────────
  {
    id: "bezwaar-belastingaanslag",
    domain: "bureaucratie",
    level: "B1",
    title: "Подать возражение на налоговое решение",
    context: "Звонок в Belastingdienst перед подачей формального возражения (bezwaar) на налоговое решение",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Спросят номер решения и дату, когда вы его получили — срок подачи возражения ограничен, обычно шесть недель.",
      "Попросят изложить, с чем конкретно вы не согласны и на основании чего.",
      "Могут предложить сначала уточнить детали неформально, прежде чем подавать официально.",
      "В конце объяснят, что происходит после подачи и сколько это займёт.",
    ],
    lines: [
      {
        nl: "Ik ben het niet eens met deze aanslag en wil bezwaar maken.",
        ru: "Я не согласен с этим решением и хочу подать возражение.",
      },
      {
        nl: "Volgens mij is er een aftrekpost niet meegenomen.",
        ru: "По-моему, один из вычетов не учли.",
      },
      {
        nl: "Binnen welke termijn moet ik dit indienen?",
        ru: "В какой срок мне нужно это подать?",
      },
      {
        nl: "Wat gebeurt er terwijl mijn bezwaar behandeld wordt?",
        ru: "Что происходит, пока рассматривается моё возражение?",
      },
      {
        nl: "Moet ik ondertussen wel gewoon betalen?",
        ru: "Мне пока нужно всё равно платить?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw aanslagnummer?", ru: "Ваш номер решения?", key: "aanslagnummer", register: "formeel" },
      { nl: "U heeft zes weken de tijd om bezwaar te maken.", ru: "У вас есть шесть недель на подачу возражения.", key: "zes weken", register: "formeel" },
      { nl: "Kunt u aangeven welke aftrekpost u bedoelt?", ru: "Можете уточнить, какой вычет вы имеете в виду?", key: "aftrekpost", register: "formeel" },
      { nl: "Tijdens de behandeling loopt de betalingsverplichting door.", ru: "Во время рассмотрения обязанность платить сохраняется.", key: "betalingsverplichting", register: "formeel" },
      { nl: "U kunt eventueel uitstel van betaling aanvragen.", ru: "Вы можете при желании запросить отсрочку платежа.", key: "uitstel", register: "formeel" },
      { nl: "De behandeling duurt doorgaans enkele maanden.", ru: "Рассмотрение обычно занимает несколько месяцев.", key: "enkele maanden", register: "neutraal" },
      { nl: "Kunt u dat nog eens rustig toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can go through this process in English if that helps.", ru: "Можем разобрать этот процесс по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil maken bezwaar tegen deze aanslag.",
        right: "Ik wil bezwaar maken tegen deze aanslag.",
        why: "Дополнение перед инфинитивом, не после него — тот же порядок, что и во всех подобных оборотах с maken.",
      },
      {
        wrong: "Wat gebeurt er terwijl behandeld wordt mijn bezwaar?",
        right: "Wat gebeurt er terwijl mijn bezwaar behandeld wordt?",
        why: "В придаточном с terwijl подлежащее mijn bezwaar встаёт перед спрягаемым глаголом wordt, который уходит в конец.",
      },
    ],
    gate: [
      {
        word: "aftrekpost",
        focus: "составное слово",
        tip: "АФ-трек-пост. aftrek + post — статья налогового вычета.",
      },
      {
        word: "betalingsverplichting",
        focus: "составное слово, самое длинное",
        tip: "бə-ТА:-линхс-фер-плих-тинх. betaling + verplichting — обязанность платить.",
      },
    ],
  },
  {
    id: "ind-verlenging-vergunning",
    domain: "bureaucratie",
    level: "B1",
    title: "Продлить вид на жительство при изменившихся обстоятельствах",
    context: "Приём в IND для продления вида на жительство — обстоятельства (работа, доход) немного изменились с прошлой заявки",
    minutes: 10,
    openerContext: "loket",
    brief: [
      "Спросят, что именно изменилось с последней заявки — работодатель, доход, семейное положение.",
      "Уточнят, соответствуете ли вы всё ещё требованиям вашего вида разрешения.",
      "Могут попросить дополнительные документы, если ситуация неоднозначна.",
      "В конце объяснят срок рассмотрения и что делать, если старое разрешение истечёт раньше.",
    ],
    lines: [
      {
        nl: "Sinds mijn vorige aanvraag ben ik van werkgever veranderd.",
        ru: "С момента прошлой заявки я сменил работодателя.",
      },
      {
        nl: "Voldoe ik nog steeds aan de voorwaarden?",
        ru: "Я всё ещё соответствую условиям?",
      },
      {
        nl: "Wat als mijn huidige vergunning verloopt voordat dit is afgehandeld?",
        ru: "Что если моё нынешнее разрешение истечёт раньше, чем это обработают?",
      },
      {
        nl: "Welke aanvullende documenten heeft u nog nodig?",
        ru: "Какие дополнительные документы вам ещё нужны?",
      },
    ],
    replyBank: [
      { nl: "Wat is er precies veranderd sinds uw vorige aanvraag?", ru: "Что именно изменилось с вашей прошлой заявки?", key: "veranderd", register: "formeel" },
      { nl: "U voldoet nog steeds aan de gestelde voorwaarden.", ru: "Вы по-прежнему соответствуете установленным условиям.", key: "voorwaarden", register: "formeel" },
      { nl: "Zolang uw aanvraag loopt, blijft uw verblijf rechtmatig.", ru: "Пока заявка на рассмотрении, ваше пребывание остаётся законным.", key: "rechtmatig", register: "formeel" },
      { nl: "We hebben nog een recente werkgeversverklaring nodig.", ru: "Нам ещё нужна свежая справка от работодателя.", key: "werkgeversverklaring", register: "formeel" },
      { nl: "De behandeling duurt gemiddeld drie maanden.", ru: "Рассмотрение занимает в среднем три месяца.", key: "drie maanden", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We're happy to explain this procedure in English too.", ru: "Мы с радостью объясним эту процедуру и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Wat als verloopt mijn huidige vergunning voordat dit is afgehandeld?",
        right: "Wat als mijn huidige vergunning verloopt voordat dit is afgehandeld?",
        why: "В придаточном условия с «als» подлежащее встаёт перед спрягаемым глаголом verloopt, который уходит в конец блока.",
      },
      {
        wrong: "de voorwaarde, het werkgeversverklaring",
        right: "de voorwaarde, de werkgeversverklaring",
        why: "Оба de: de voorwaarde, de werkgeversverklaring.",
      },
    ],
    gate: [
      {
        word: "rechtmatig",
        focus: "ударение на -MA-",
        tip: "рехт-МА:-тех. Законный/правомерный — ключевое слово в разговорах со статусом.",
      },
      {
        word: "werkgeversverklaring",
        focus: "составное слово, самое длинное",
        tip: "ВЕРК-хе:-верс-фер-КЛА:-ринх. werkgever + verklaring — справка от работодателя.",
      },
    ],
  },
  {
    id: "schuldhulpverlening-intake",
    domain: "bureaucratie",
    level: "B1",
    title: "Приём в службе помощи по долгам",
    context: "Первичный приём в муниципальной службе schuldhulpverlening после накопления задолженностей",
    minutes: 10,
    openerContext: "loket",
    brief: [
      "Специалист попросит перечислить все долги и кредиторов, даже если это неприятно.",
      "Спросит про доход и обязательные расходы, чтобы понять реальную картину.",
      "Объяснит возможные пути — план выплат, посредничество с кредиторами, в крайнем случае WSNP.",
      "В конце договорятся о следующей встрече и о том, какие документы принести.",
    ],
    lines: [
      {
        nl: "Ik kom mijn schulden in kaart laten brengen.",
        ru: "Я пришёл, чтобы разобраться в своих долгах.",
      },
      {
        nl: "Het gaat om verschillende schuldeisers, niet alleen één.",
        ru: "Речь о нескольких кредиторах, а не об одном.",
      },
      {
        nl: "Welke opties heb ik realistisch gezien?",
        ru: "Какие у меня реально есть варианты?",
      },
      {
        nl: "Wat gebeurt er als ik hier niet uitkom op eigen kracht?",
        ru: "Что будет, если я сам не справлюсь с этим?",
      },
    ],
    replyBank: [
      { nl: "Kunt u al uw schuldeisers op een rijtje zetten?", ru: "Можете перечислить всех своих кредиторов?", key: "schuldeisers", register: "formeel" },
      { nl: "Wat zijn uw vaste maandelijkse lasten?", ru: "Какие у вас постоянные ежемесячные расходы?", key: "vaste lasten", register: "formeel" },
      { nl: "We kunnen bemiddelen tussen u en uw schuldeisers.", ru: "Мы можем выступить посредником между вами и кредиторами.", key: "bemiddelen", register: "formeel" },
      { nl: "Bij grotere problemen is er ook de wettelijke regeling.", ru: "При более серьёзных проблемах есть и законное урегулирование.", key: "wettelijke regeling", register: "formeel" },
      { nl: "Neemt u volgende keer uw bankafschriften mee.", ru: "В следующий раз возьмите с собой банковские выписки.", key: "bankafschriften", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can go through this in English if that's easier for you.", ru: "Можем разобрать это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Wat gebeurt er als ik hier niet op eigen kracht uitkom?",
        right: "Wat gebeurt er als ik hier niet uitkom op eigen kracht?",
        why: "Отделяемая частица uitkomen уходит в конец придаточного, а обстоятельство «op eigen kracht» встаёт перед ней, а не разрывает конструкцию.",
      },
      {
        wrong: "de schuldeiser, het regeling",
        right: "de schuldeiser, de regeling",
        why: "Оба de: de schuldeiser, de regeling.",
      },
    ],
    gate: [
      {
        word: "schuldeisers",
        focus: "составное слово",
        tip: "СХЮЛТ-эй-серс. schuld + eisers — кредиторы, буквально «требующие долг».",
      },
      {
        word: "bemiddelen",
        focus: "ударение на -MID-",
        tip: "бə-МИ-дə-лен. Выступать посредником.",
      },
    ],
  },
  {
    id: "dubbele-nationaliteit-vraag",
    domain: "bureaucratie",
    level: "B1",
    title: "Вопрос о двойном гражданстве при натурализации",
    context: "Разговор в gemeente о том, как двойное гражданство соотносится с натурализацией — только справочно",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Спросят, из какой страны ваше нынешнее гражданство — правила отличаются по странам.",
      "Объяснят общий принцип: Нидерланды обычно требуют отказа от старого гражданства, кроме исключений.",
      "Подчеркнут, что точный ответ по вашей ситуации даст только IND, а не сотрудник gemeente.",
      "В конце дадут контакт и ссылку для уточнения деталей.",
    ],
    lines: [
      {
        nl: "Moet ik mijn huidige nationaliteit opgeven bij naturalisatie?",
        ru: "Мне нужно отказаться от своего нынешнего гражданства при натурализации?",
      },
      {
        nl: "Zijn er uitzonderingen op deze regel?",
        ru: "Есть ли исключения из этого правила?",
      },
      {
        nl: "Bij wie kan ik dit voor mijn situatie navragen?",
        ru: "У кого я могу уточнить это для своей ситуации?",
      },
      {
        nl: "Kunt u mij daarheen doorverwijzen?",
        ru: "Можете направить меня туда?",
      },
    ],
    replyBank: [
      { nl: "In principe moet u afstand doen van uw huidige nationaliteit.", ru: "В принципе, вам нужно отказаться от нынешнего гражданства.", key: "afstand doen", register: "formeel" },
      { nl: "Er bestaan enkele uitzonderingen, afhankelijk van het land.", ru: "Существует несколько исключений, в зависимости от страны.", key: "uitzonderingen", register: "formeel" },
      { nl: "Voor uw specifieke situatie kan alleen de IND uitsluitsel geven.", ru: "По вашей конкретной ситуации только IND может дать точный ответ.", key: "uitsluitsel", register: "formeel" },
      { nl: "Ik verwijs u door naar de juiste afdeling.", ru: "Направлю вас в нужный отдел.", key: "doorverwijzen", register: "formeel" },
      { nl: "Hier is de link met meer informatie.", ru: "Вот ссылка с дополнительной информацией.", key: "link", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "I can point you to the English-language page too.", ru: "Могу показать и англоязычную страницу.", register: "switch" },
    ],
    repairIds: ["betekent", "momentje"],
    traps: [
      {
        wrong: "Ik moet opgeven mijn huidige nationaliteit.",
        right: "Ik moet mijn huidige nationaliteit opgeven.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de nationaliteit, het uitzondering",
        right: "de nationaliteit, de uitzondering",
        why: "Оба de: de nationaliteit, de uitzondering.",
      },
    ],
    gate: [
      {
        word: "uitsluitsel",
        focus: "ui = /œy/",
        tip: "ЁЙТ-слёйт-сел. Окончательный ответ/разъяснение — редкое, но важное слово.",
      },
      {
        word: "doorverwijzen",
        focus: "отделяемый глагол",
        tip: "ДО:Р-вер-вэй-зен. Перенаправлять — ik verwijs door.",
      },
    ],
  },
  {
    id: "gemeente-bezwaarschrift-parkeerboete",
    domain: "bureaucratie",
    level: "B1",
    title: "Оспорить штраф за парковку",
    context: "Звонок в gemeente перед подачей письменного возражения на штраф за парковку, который кажется несправедливым",
    minutes: 8,
    openerContext: "telefoon",
    brief: [
      "Спросят номер штрафа и дату, чтобы найти дело.",
      "Попросят изложить основание для возражения — например, знак был не виден, разрешение было оформлено.",
      "Объяснят, что штраф нужно всё равно оплатить, пока возражение не рассмотрено, если оно не приостанавливает взыскание.",
      "В конце скажут срок рассмотрения и что делать при отказе.",
    ],
    lines: [
      {
        nl: "Ik wil bezwaar maken tegen een parkeerboete.",
        ru: "Я хочу оспорить штраф за парковку.",
      },
      {
        nl: "Het verkeersbord was op dat moment niet goed zichtbaar.",
        ru: "Дорожный знак в тот момент был плохо виден.",
      },
      {
        nl: "Moet ik de boete ondertussen toch betalen?",
        ru: "Мне пока всё равно нужно оплатить штраф?",
      },
      {
        nl: "Wat als mijn bezwaar wordt afgewezen?",
        ru: "Что если моё возражение отклонят?",
      },
    ],
    replyBank: [
      { nl: "Wat is het kenmerk van de boete?", ru: "Какой номер у штрафа?", key: "kenmerk", register: "formeel" },
      { nl: "Waarop is uw bezwaar precies gebaseerd?", ru: "На чём именно основано ваше возражение?", key: "gebaseerd", register: "formeel" },
      { nl: "In afwachting van de uitspraak hoeft u niet te betalen.", ru: "Пока ожидается решение, платить не обязательно.", key: "in afwachting", register: "formeel" },
      { nl: "Bij afwijzing kunt u in beroep gaan bij de rechter.", ru: "При отказе вы можете обратиться в суд.", key: "in beroep gaan", register: "formeel" },
      { nl: "De uitspraak volgt meestal binnen zes weken.", ru: "Решение обычно приходит в течение шести недель.", key: "zes weken", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can go through this in English if you prefer.", ru: "Можем разобрать это по-английски, если предпочитаете.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Het bord was niet goed zichtbaar op dat moment.",
        right: "Het verkeersbord was op dat moment niet goed zichtbaar.",
        why: "Обстоятельство времени «op dat moment» тяготеет к середине фразы, перед прилагательным-наречием, а не выносится в самый конец.",
      },
      {
        wrong: "de boete, het bezwaar",
        right: "de boete, het bezwaar",
        why: "de boete, het bezwaar — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "gebaseerd",
        focus: "ударение на -SEERD",
        tip: "хə-ба-СЕ:РТ. Основанный — причастие от baseren.",
      },
      {
        word: "afwijzing",
        focus: "ij = «эй»",
        tip: "АФ-вэй-зинх. Отказ — уже знакомое слово из других формальных сценариев.",
      },
    ],
  },
  {
    id: "ziekenhuis-second-opinion",
    domain: "gezondheid",
    level: "B1",
    title: "Запросить второе медицинское мнение",
    context: "Разговор с лечащим врачом о желании получить второе мнение перед серьёзным решением о лечении",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Начните мягко, но чётко — это ваше право, а не недоверие к врачу лично.",
      "Врач спросит, по какому именно решению вы хотите второе мнение.",
      "Объяснит, как это организовать и покрывается ли это страховкой.",
      "В конце договоритесь, кому передать медицинскую документацию.",
    ],
    lines: [
      {
        nl: "Ik zou graag een second opinion willen krijgen voordat ik beslis.",
        ru: "Я хотел бы получить второе мнение, прежде чем принять решение.",
      },
      {
        nl: "Het gaat vooral om de operatie die u voorstelt.",
        ru: "Речь в основном об операции, которую вы предлагаете.",
      },
      {
        nl: "Wordt dit vergoed door mijn verzekering?",
        ru: "Это покрывается моей страховкой?",
      },
      {
        nl: "Kunt u mijn dossier doorsturen naar de andere arts?",
        ru: "Можете переслать моё дело другому врачу?",
      },
    ],
    replyBank: [
      { nl: "Een second opinion is uiteraard uw goed recht.", ru: "Второе мнение — это, разумеется, ваше законное право.", key: "goed recht", register: "formeel" },
      { nl: "Waarover precies wilt u een tweede mening?", ru: "О чём именно вы хотите второе мнение?", key: "tweede mening", register: "neutraal" },
      { nl: "Dit wordt over het algemeen wel vergoed.", ru: "Это в целом обычно покрывается.", key: "vergoed", register: "formeel" },
      { nl: "Ik stuur uw dossier door zodra u dat wilt.", ru: "Перешлю ваше дело, как только скажете.", key: "dossier", register: "formeel" },
      { nl: "Neemt u vooral de tijd die u nodig heeft.", ru: "Не торопитесь, берите столько времени, сколько нужно.", key: "neem de tijd", register: "informeel" },
      { nl: "Kunt u dat rustig nog een keer toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can arrange this in English too if needed.", ru: "Можем организовать это и по-английски, если нужно.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik zou graag krijgen een second opinion.",
        right: "Ik zou graag een second opinion willen krijgen.",
        why: "Условное «zou willen» + инфинитив krijgen уходит в конец целиком, дополнение встаёт перед всей группой глаголов.",
      },
      {
        wrong: "het mening, het dossier",
        right: "de mening, het dossier",
        why: "de mening, het dossier — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "dossier",
        focus: "заимствование из французского",
        tip: "до-СЬЕ:. Медицинское дело/досье — произносится почти как во французском.",
      },
      {
        word: "vergoed",
        focus: "ударение на -GOED",
        tip: "фер-ХУ:Т. Возмещённый — часто встречается в разговорах со страховкой.",
      },
    ],
  },
  {
    id: "ggz-behandelplan-bespreken",
    domain: "gezondheid",
    level: "B1",
    title: "Обсудить план лечения с психологом",
    context: "Разговор с психологом о согласованном плане лечения после нескольких сессий — только про процесс, не про суть терапии",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Психолог предложит подвести промежуточный итог — что уже проработали, что дальше.",
      "Может предложить изменить частоту сессий или подход.",
      "Спросит вашу собственную оценку прогресса.",
      "В конце вместе скорректируют план и договорятся о следующих шагах.",
    ],
    lines: [
      {
        nl: "Ik merk dat het de laatste weken iets beter gaat.",
        ru: "Я замечаю, что последние недели дела идут немного лучше.",
      },
      {
        nl: "Zouden we de frequentie van de sessies kunnen aanpassen?",
        ru: "Могли бы мы скорректировать частоту сессий?",
      },
      {
        nl: "Ik twijfel of deze aanpak nog steeds bij mij past.",
        ru: "Я сомневаюсь, подходит ли мне ещё этот подход.",
      },
      {
        nl: "Wat stelt u voor als volgende stap?",
        ru: "Что вы предлагаете в качестве следующего шага?",
      },
    ],
    replyBank: [
      { nl: "Hoe ervaart u zelf de vooruitgang tot nu toe?", ru: "Как вы сами оцениваете прогресс на данный момент?", key: "vooruitgang", register: "formeel" },
      { nl: "We kunnen de sessies best afbouwen naar eens per maand.", ru: "Можем вполне сократить сессии до раза в месяц.", key: "afbouwen", register: "neutraal" },
      { nl: "Laten we samen kijken naar een andere invalshoek.", ru: "Давайте вместе посмотрим на другой подход.", key: "invalshoek", register: "neutraal" },
      { nl: "Uw eigen inzicht hierin is heel waardevol.", ru: "Ваше собственное понимание здесь очень ценно.", key: "inzicht", register: "formeel" },
      { nl: "We leggen dit nieuwe plan samen vast.", ru: "Мы вместе зафиксируем этот новый план.", key: "vastleggen", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue this conversation in English if that helps.", ru: "Можем продолжить этот разговор по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik twijfel of past deze aanpak nog steeds bij mij.",
        right: "Ik twijfel of deze aanpak nog steeds bij mij past.",
        why: "В придаточном, вводимом «of», подлежащее deze aanpak встаёт перед спрягаемым глаголом past, который уходит в конец.",
      },
      {
        wrong: "de aanpak, het invalshoek",
        right: "de aanpak, de invalshoek",
        why: "Оба de: de aanpak, de invalshoek.",
      },
    ],
    gate: [
      {
        word: "invalshoek",
        focus: "составное слово",
        tip: "ИН-фалс-ху:к. invals + hoek — угол зрения/подход.",
      },
      {
        word: "vooruitgang",
        focus: "ui = /œy/",
        tip: "во:р-ЁЙТ-ханх. Прогресс — vooruit + gang.",
      },
    ],
  },
  {
    id: "huisarts-chronische-aandoening",
    domain: "gezondheid",
    level: "B1",
    title: "Обсудить лечение хронического заболевания",
    context: "Плановый разговор с huisarts о ведении хронического заболевания на долгий срок",
    minutes: 9,
    openerContext: "loket",
    brief: [
      "Врач спросит, как вы справляетесь с симптомами в повседневной жизни.",
      "Обсудят, нужно ли скорректировать лекарства или добавить специалиста.",
      "Может предложить план долгосрочного наблюдения с регулярными визитами.",
      "В конце спросит, есть ли у вас вопросы, которые давно откладывали.",
    ],
    lines: [
      {
        nl: "Over het algemeen kan ik ermee omgaan, maar niet altijd.",
        ru: "В целом я справляюсь с этим, но не всегда.",
      },
      {
        nl: "Zou het zinvol zijn om de dosering aan te passen?",
        ru: "Было бы разумно скорректировать дозировку?",
      },
      {
        nl: "Ik heb al een tijd een vraag die ik nog niet heb gesteld.",
        ru: "У меня уже давно есть вопрос, который я ещё не задавал.",
      },
      {
        nl: "Hoe vaak moeten we dit in de toekomst controleren?",
        ru: "Как часто нужно будет это проверять в будущем?",
      },
    ],
    replyBank: [
      { nl: "Waarin merkt u dat het niet altijd lukt?", ru: "В чём вы замечаете, что не всегда получается?", key: "merkt u", register: "formeel" },
      { nl: "We kunnen de dosering geleidelijk aanpassen.", ru: "Мы можем постепенно скорректировать дозировку.", key: "geleidelijk", register: "neutraal" },
      { nl: "Stelt u die vraag gerust, daar zijn we voor.", ru: "Задайте этот вопрос смело, для этого мы здесь.", key: "gerust", register: "informeel" },
      { nl: "Laten we elk kwartaal een controle inplannen.", ru: "Давайте планировать проверку каждый квартал.", key: "elk kwartaal", register: "formeel" },
      { nl: "Dit is een langdurig traject, geen quick fix.", ru: "Это долгий путь, не быстрое решение.", key: "langdurig traject", register: "informeel" },
      { nl: "Kunt u dat rustig nog een keer toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can go through this in English if that's easier.", ru: "Можем разобрать это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik heb een vraag al een tijd die ik nog niet heb gesteld.",
        right: "Ik heb al een tijd een vraag die ik nog niet heb gesteld.",
        why: "«al een tijd» встаёт сразу после глагола heb, перед дополнением, а не разрывает придаточное предложение внутри.",
      },
      {
        wrong: "de dosering, het traject",
        right: "de dosering, het traject",
        why: "de dosering, het traject — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "geleidelijk",
        focus: "ударение на -LEI-",
        tip: "хə-ЛЭЙ-дə-лек. Постепенно — от глагола geleiden.",
      },
      {
        word: "langdurig",
        focus: "ударение на -DU-",
        tip: "ЛАНХ-дю:-рех. Долгосрочный — lang + durig.",
      },
    ],
  },
  {
    id: "medicatie-afbouwen-gesprek",
    domain: "gezondheid",
    level: "B1",
    title: "Обсудить постепенную отмену лекарства",
    context: "Разговор с huisarts о желании постепенно снизить дозу или прекратить приём лекарства после долгого срока",
    minutes: 8,
    openerContext: "loket",
    brief: [
      "Начните с объяснения, почему вы этого хотите — самочувствие улучшилось, побочные эффекты, личный выбор.",
      "Врач объяснит, почему резко прекращать нельзя и как выглядит безопасное снижение.",
      "Обсудят, на что обращать внимание во время снижения дозы.",
      "В конце составят конкретный график с контрольными точками.",
    ],
    lines: [
      {
        nl: "Ik zou graag willen kijken of ik kan afbouwen.",
        ru: "Я хотел бы посмотреть, могу ли я постепенно снизить дозу.",
      },
      {
        nl: "Ik voel me al een tijd stabieler.",
        ru: "Я уже некоторое время чувствую себя стабильнее.",
      },
      {
        nl: "Waar moet ik op letten tijdens het afbouwen?",
        ru: "На что мне обращать внимание во время снижения?",
      },
      {
        nl: "Kunnen we een concreet schema afspreken?",
        ru: "Можем договориться о конкретном графике?",
      },
    ],
    replyBank: [
      { nl: "Afbouwen kan, maar altijd geleidelijk en onder begeleiding.", ru: "Снижение возможно, но всегда постепенно и под наблюдением.", key: "onder begeleiding", register: "formeel" },
      { nl: "Stoppen in één keer raad ik sterk af.", ru: "Резко прекратить я настоятельно не рекомендую.", key: "raad ik af", register: "formeel" },
      { nl: "Let vooral op terugkerende klachten.", ru: "Обращайте особое внимание на возвращающиеся симптомы.", key: "terugkerende klachten", register: "neutraal" },
      { nl: "We stellen samen een afbouwschema op.", ru: "Мы вместе составим график снижения.", key: "afbouwschema", register: "formeel" },
      { nl: "Kom bij twijfel gewoon eerder terug.", ru: "При сомнениях просто возвращайтесь раньше.", key: "eerder terug", register: "informeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can go through the schedule in English too.", ru: "Можем разобрать график и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik voel stabieler me al een tijd.",
        right: "Ik voel me al een tijd stabieler.",
        why: "Возвратное me встаёт сразу после глагола voel, а обстоятельство длительности al een tijd — перед прилагательным, а не в разброс по фразе.",
      },
      {
        wrong: "het schema, de medicatie",
        right: "het schema, de medicatie",
        why: "het schema, de medicatie — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "afbouwschema",
        focus: "составное слово",
        tip: "АФ-баус-схе:-ма. afbouw + schema — график постепенного снижения.",
      },
      {
        word: "begeleiding",
        focus: "ei = «эй»",
        tip: "бə-хə-ЛЭЙ-динх. Сопровождение — уже знакомое слово из школьных сценариев, здесь в медицинском контексте.",
      },
    ],
  },
  {
    id: "thuiszorg-aanvragen",
    domain: "gezondheid",
    level: "B1",
    title: "Оформить уход на дому для пожилого родственника",
    context: "Звонок в организацию thuiszorg или в gemeente для оформления ухода на дому для пожилого родителя",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Спросят, какая именно помощь нужна — уборка, уход, медицинские процедуры.",
      "Уточнят текущую ситуацию и есть ли уже индикация (WMO/Wlz) от специалиста.",
      "Объяснят, как проходит оценка потребности (keukentafelgesprek) на дому.",
      "В конце расскажут о собственном взносе (eigen bijdrage) и как он рассчитывается.",
    ],
    lines: [
      {
        nl: "Ik wil thuiszorg aanvragen voor mijn moeder.",
        ru: "Я хочу оформить уход на дому для своей матери.",
      },
      {
        nl: "Ze heeft vooral hulp nodig bij het huishouden.",
        ru: "Ей в основном нужна помощь по хозяйству.",
      },
      {
        nl: "Hoe verloopt de beoordeling van haar situatie?",
        ru: "Как проходит оценка её ситуации?",
      },
      {
        nl: "Wat komt er ongeveer bij kijken qua kosten?",
        ru: "Сколько это будет стоить примерно?",
      },
    ],
    replyBank: [
      { nl: "Welke vorm van ondersteuning heeft zij precies nodig?", ru: "Какая именно поддержка ей нужна?", key: "ondersteuning", register: "formeel" },
      { nl: "We plannen eerst een gesprek bij haar thuis in.", ru: "Мы сначала назначим разговор у неё дома.", key: "gesprek bij haar thuis", register: "formeel" },
      { nl: "Op basis daarvan bepalen we de juiste indicatie.", ru: "На основе этого мы определим нужную индикацию.", key: "indicatie", register: "formeel" },
      { nl: "De eigen bijdrage hangt af van haar inkomen.", ru: "Собственный взнос зависит от её дохода.", key: "eigen bijdrage", register: "formeel" },
      { nl: "Dit wordt landelijk berekend, niet door ons.", ru: "Это рассчитывается на федеральном уровне, не нами.", key: "landelijk berekend", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can explain this system in English too.", ru: "Можем объяснить эту систему и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent", "cijfers"],
    traps: [
      {
        wrong: "We plannen een gesprek in bij haar thuis eerst.",
        right: "We plannen eerst een gesprek bij haar thuis in.",
        why: "Отделяемая частица in отделяемого глагола inplannen уходит в самый конец, а eerst встаёт перед дополнением, не после него.",
      },
      {
        wrong: "de indicatie, het bijdrage",
        right: "de indicatie, de bijdrage",
        why: "Оба de: de indicatie, de bijdrage.",
      },
    ],
    gate: [
      {
        word: "keukentafelgesprek",
        focus: "составное слово, самое длинное",
        tip: "КЁ:-кен-та:-фел-хə-спрек. keukentafel + gesprek — буквально «разговор за кухонным столом», оценка потребностей на дому.",
      },
      {
        word: "eigen bijdrage",
        focus: "устойчивое сочетание",
        tip: "ЭЙ-хен БЭЙ-дра:-хə. Собственный взнос — уже встречался в других сценариях про пособия.",
      },
    ],
  },
  {
    id: "vertrouwenspersoon-gesprek",
    domain: "school",
    level: "B1",
    title: "Разговор с доверенным лицом школы",
    context: "Серьёзный конфиденциальный разговор с vertrouwenspersoon школы о беспокоящей ситуации с ребёнком",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Доверенное лицо объяснит правила конфиденциальности в начале разговора.",
      "Попросит изложить ситуацию своими словами, без давления рассказать больше, чем вы готовы.",
      "Обсудят возможные следующие шаги — от неформального наблюдения до официальной жалобы.",
      "В конце договорятся, как и когда будет обратная связь.",
    ],
    lines: [
      {
        nl: "Ik wil dit in vertrouwen met u bespreken.",
        ru: "Я хочу обсудить это с вами конфиденциально.",
      },
      {
        nl: "Ik weet niet zeker of ik al een officiële klacht wil indienen.",
        ru: "Я не уверен, хочу ли я уже подавать официальную жалобу.",
      },
      {
        nl: "Wat zijn mijn opties op dit moment?",
        ru: "Какие у меня варианты на данный момент?",
      },
      {
        nl: "Kunt u mij op de hoogte houden zonder namen te noemen?",
        ru: "Можете держать меня в курсе, не называя имён?",
      },
    ],
    replyBank: [
      { nl: "Alles wat u vertelt, blijft tussen ons.", ru: "Всё, что вы расскажете, останется между нами.", key: "blijft tussen ons", register: "formeel" },
      { nl: "U hoeft nog geen definitieve beslissing te nemen.", ru: "Вам ещё не нужно принимать окончательное решение.", key: "definitieve beslissing", register: "formeel" },
      { nl: "We kunnen dit eerst informeel bespreekbaar maken.", ru: "Мы можем сначала обсудить это неформально.", key: "informeel bespreekbaar", register: "formeel" },
      { nl: "Ik houd u op de hoogte zonder details te delen.", ru: "Буду держать вас в курсе, не раскрывая деталей.", key: "op de hoogte", register: "formeel" },
      { nl: "Neem gerust de tijd die u nodig heeft.", ru: "Не торопитесь, берите столько времени, сколько нужно.", key: "de tijd nemen", register: "informeel" },
      { nl: "Kunt u dat nog een keer rustig zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue this in English if that's more comfortable.", ru: "Можем продолжить это по-английски, если так удобнее.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Kunt u mij houden op de hoogte zonder namen noemen te?",
        right: "Kunt u mij op de hoogte houden zonder namen te noemen?",
        why: "Отделяемый глагол houden держится вместе в конце, а в обороте «zonder … te» инфинитив noemen уходит в самый конец придаточного.",
      },
      {
        wrong: "het klacht, de beslissing",
        right: "de klacht, de beslissing",
        why: "Оба de: de klacht, de beslissing.",
      },
    ],
    gate: [
      {
        word: "vertrouwenspersoon",
        focus: "составное слово, самое длинное",
        tip: "фер-ТРАУ-венс-пер-со:н. vertrouwen + persoon — доверенное лицо.",
      },
      {
        word: "bespreekbaar",
        focus: "ударение на -SPREEK-",
        tip: "бə-СПРЕ:К-ба:р. Обсуждаемый — от bespreken.",
      },
    ],
  },
  {
    id: "examen-vrijstelling-aanvragen",
    domain: "school",
    level: "B1",
    title: "Запросить освобождение от части экзамена",
    context: "Разговор с координатором школы о запросе на освобождение или адаптацию части экзамена по медицинским причинам",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Объясните конкретно, о какой части экзамена речь и почему нужна адаптация.",
      "Координатор спросит, есть ли официальное медицинское заключение.",
      "Обсудят возможные варианты — больше времени, отдельная комната, изменённый формат.",
      "В конце объяснят срок подачи официального запроса.",
    ],
    lines: [
      {
        nl: "Ik wil een aanpassing aanvragen voor het examen.",
        ru: "Я хочу запросить адаптацию для экзамена.",
      },
      {
        nl: "Het gaat om extra tijd vanwege een leerprobleem.",
        ru: "Речь о дополнительном времени из-за трудностей в обучении.",
      },
      {
        nl: "Heb ik hiervoor een officiële verklaring nodig?",
        ru: "Мне для этого нужна официальная справка?",
      },
      {
        nl: "Tot wanneer moet ik dit verzoek indienen?",
        ru: "До какого срока мне нужно подать это заявление?",
      },
    ],
    replyBank: [
      { nl: "Welke aanpassing heeft u precies in gedachten?", ru: "Какую именно адаптацию вы имеете в виду?", key: "in gedachten", register: "formeel" },
      { nl: "Een officiële verklaring is hiervoor verplicht.", ru: "Официальная справка для этого обязательна.", key: "verplicht", register: "formeel" },
      { nl: "Mogelijk is extra tijd of een aparte ruimte.", ru: "Возможно дополнительное время или отдельное помещение.", key: "aparte ruimte", register: "neutraal" },
      { nl: "Dit verzoek moet u ruim van tevoren indienen.", ru: "Это заявление нужно подать заблаговременно.", key: "van tevoren", register: "formeel" },
      { nl: "Ik stuur u het formulier hiervoor toe.", ru: "Пришлю вам форму для этого.", key: "formulier", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "I'm happy to explain this in English too.", ru: "С радостью объясню это и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil aanvragen een aanpassing voor het examen.",
        right: "Ik wil een aanpassing aanvragen voor het examen.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de aanpassing, het verklaring",
        right: "de aanpassing, de verklaring",
        why: "Оба de: de aanpassing, de verklaring.",
      },
    ],
    gate: [
      {
        word: "leerprobleem",
        focus: "составное слово",
        tip: "ЛЕ:Р-про-бле:м. leer + probleem — трудность в обучении.",
      },
      {
        word: "verzoek",
        focus: "долгое oe",
        tip: "вер-ЗУ:К. Просьба/заявление — от глагола verzoeken.",
      },
    ],
  },
  {
    id: "overstap-schooladvies-bezwaar",
    domain: "school",
    level: "B1",
    title: "Оспорить рекомендацию школы по уровню",
    context: "Разговор с директором школы, когда родители не согласны с рекомендацией по уровню обучения ребёнка",
    minutes: 10,
    openerContext: "informeel",
    brief: [
      "Изложите конкретно, почему вы не согласны — оценки, наблюдения, собственное мнение о ребёнке.",
      "Директор объяснит, на чём основана рекомендация и насколько она гибкая.",
      "Обсудят возможность пересмотра — дополнительный тест, испытательный период на более высоком уровне.",
      "В конце договорятся о конкретных следующих шагах и сроке.",
    ],
    lines: [
      {
        nl: "Wij zijn het niet helemaal eens met het schooladvies.",
        ru: "Мы не совсем согласны со школьной рекомендацией.",
      },
      {
        nl: "Onze dochter presteert volgens ons hoger dan dit advies suggereert.",
        ru: "Наша дочь, на наш взгляд, показывает результаты выше, чем предполагает эта рекомендация.",
      },
      {
        nl: "Is er ruimte om dit te heroverwegen?",
        ru: "Есть ли возможность это пересмотреть?",
      },
      {
        nl: "Welke stappen kunnen wij hiervoor zetten?",
        ru: "Какие шаги мы можем для этого предпринять?",
      },
    ],
    replyBank: [
      { nl: "Waarop baseert u uw twijfel precies?", ru: "На чём именно основаны ваши сомнения?", key: "twijfel", register: "formeel" },
      { nl: "Het advies is gebaseerd op meerdere toetsen en observaties.", ru: "Рекомендация основана на нескольких тестах и наблюдениях.", key: "observaties", register: "formeel" },
      { nl: "Een aanvullende toets behoort tot de mogelijkheden.", ru: "Дополнительный тест — один из вариантов.", key: "aanvullende toets", register: "formeel" },
      { nl: "Een proefperiode op een hoger niveau kan ook.", ru: "Испытательный период на более высоком уровне тоже возможен.", key: "proefperiode", register: "neutraal" },
      { nl: "Laten we hier samen een plan voor maken.", ru: "Давайте вместе составим для этого план.", key: "plan maken", register: "informeel" },
      { nl: "Kunt u dat rustig nog een keer toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can discuss this in English if that's easier.", ru: "Можем обсудить это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Onze dochter presteert hoger volgens ons dan dit advies suggereert.",
        right: "Onze dochter presteert volgens ons hoger dan dit advies suggereert.",
        why: "Вставное «volgens ons» встаёт сразу после подлежащего фразы-суждения, перед прилагательным hoger, а не разрывает сравнительную конструкцию.",
      },
      {
        wrong: "het advies, de toets",
        right: "het advies, de toets",
        why: "het advies, de toets — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "heroverwegen",
        focus: "составное слово",
        tip: "хер-О:-вер-ве:-хен. Пересматривать — her + overwegen.",
      },
      {
        word: "proefperiode",
        focus: "долгое oe",
        tip: "ПРУ:Ф-пе-ри-о:-де. Испытательный период — уже знакомое слово из рабочих сценариев.",
      },
    ],
  },
  {
    id: "kind-blijven-zitten-gesprek",
    domain: "school",
    level: "B1",
    title: "Разговор о повторении класса ребёнком",
    context: "Серьёзный разговор с учителем о возможности того, что ребёнок останется на второй год",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Учитель изложит конкретные показатели, на которых основано предложение.",
      "Обсудят, что повторение года даёт ребёнку, а не наказание.",
      "Спросят ваше мнение и как ребёнок сам к этому относится.",
      "В конце договорятся о сроке окончательного решения.",
    ],
    lines: [
      {
        nl: "Ik begrijp dat u overweegt hem te laten doubleren.",
        ru: "Я понимаю, что вы рассматриваете возможность оставить его на второй год.",
      },
      {
        nl: "Wat zou hij hierdoor concreet winnen?",
        ru: "Что конкретно он от этого выиграет?",
      },
      {
        nl: "Hoe heeft hij het er zelf over?",
        ru: "Как он сам об этом говорит?",
      },
      {
        nl: "Wanneer moeten we hierover definitief beslissen?",
        ru: "Когда нам нужно окончательно решить этот вопрос?",
      },
    ],
    replyBank: [
      { nl: "Hij loopt op meerdere vakken duidelijk achter.", ru: "По нескольким предметам он явно отстаёт.", key: "loopt achter", register: "formeel" },
      { nl: "Een extra jaar geeft hem tijd om dit in te halen.", ru: "Дополнительный год даст ему время наверстать это.", key: "in te halen", register: "neutraal" },
      { nl: "Hij merkt zelf ook dat het lastig gaat.", ru: "Он и сам замечает, что ему тяжело.", key: "merkt zelf", register: "informeel" },
      { nl: "We moeten dit voor de zomervakantie beslissen.", ru: "Нам нужно решить это до летних каникул.", key: "voor de zomervakantie", register: "formeel" },
      { nl: "Laten we dit samen met hem bespreken.", ru: "Давайте обсудим это вместе с ним.", key: "samen bespreken", register: "informeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can talk this through in English if that's easier.", ru: "Можем обсудить это по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik begrijp dat u overweegt te laten hem doubleren.",
        right: "Ik begrijp dat u overweegt hem te laten doubleren.",
        why: "В обороте «om … te» (здесь om опущено после overwegen) дополнение hem встаёт перед всей группой te laten doubleren, а не разрывает её.",
      },
      {
        wrong: "het vak, de jaar",
        right: "het vak, het jaar",
        why: "het vak, het jaar — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "doubleren",
        focus: "заимствование из французского",
        tip: "ду-БЛЕ:-рен. Оставаться на второй год — от французского doubler.",
      },
      {
        word: "inhalen",
        focus: "отделяемый глагол",
        tip: "ИН-ха:-лен. Наверстать — ik haal in.",
      },
    ],
  },
  {
    id: "hoogbegaafdheid-gesprek",
    domain: "school",
    level: "B1",
    title: "Разговор о поддержке одарённого ребёнка",
    context: "Разговор с учителем о дополнительной поддержке ребёнка, показывающего признаки одарённости и скуки на обычной программе",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Опишите конкретные наблюдения — скучает, заканчивает задания слишком быстро, задаёт неожиданно сложные вопросы.",
      "Учитель может предложить обследование или дополнительные задания повышенной сложности (verrijking).",
      "Обсудят, как это не выделит ребёнка негативно среди одноклассников.",
      "В конце договорятся о пробном периоде с изменённой программой.",
    ],
    lines: [
      {
        nl: "Ik heb het vermoeden dat hij zich verveelt op school.",
        ru: "У меня подозрение, что ему скучно в школе.",
      },
      {
        nl: "Hij is thuis met veel complexere vragen bezig.",
        ru: "Дома он занят намного более сложными вопросами.",
      },
      {
        nl: "Zou een onderzoek naar hoogbegaafdheid zinvol zijn?",
        ru: "Было бы разумно провести обследование на одарённость?",
      },
      {
        nl: "Hoe voorkomen we dat hij zich anders voelt dan de rest?",
        ru: "Как нам избежать того, чтобы он чувствовал себя иначе, чем остальные?",
      },
    ],
    replyBank: [
      { nl: "Wat merkt u daar precies aan thuis?", ru: "Что именно вы замечаете дома?", key: "merkt u", register: "formeel" },
      { nl: "We kunnen hem verrijkingsstof aanbieden.", ru: "Мы можем предложить ему задания повышенной сложности.", key: "verrijkingsstof", register: "neutraal" },
      { nl: "Een onderzoek kan meer duidelijkheid geven.", ru: "Обследование может дать больше ясности.", key: "duidelijkheid", register: "formeel" },
      { nl: "We doen dit altijd op een subtiele manier.", ru: "Мы всегда делаем это ненавязчиво.", key: "subtiele manier", register: "informeel" },
      { nl: "Laten we een proefperiode van zes weken afspreken.", ru: "Давайте договоримся об испытательном периоде в шесть недель.", key: "proefperiode", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can discuss this in English if you prefer.", ru: "Можем обсудить это по-английски, если предпочитаете.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Hoe voorkomen we dat voelt hij zich anders dan de rest?",
        right: "Hoe voorkomen we dat hij zich anders voelt dan de rest?",
        why: "В придаточном, вводимом «dat», подлежащее hij встаёт перед глаголом voelt, который уходит в конец.",
      },
      {
        wrong: "de hoogbegaafdheid, het duidelijkheid",
        right: "de hoogbegaafdheid, de duidelijkheid",
        why: "Оба de: de hoogbegaafdheid, de duidelijkheid.",
      },
    ],
    gate: [
      {
        word: "hoogbegaafdheid",
        focus: "составное слово",
        tip: "хо:х-бə-ХА:ФТ-хэйт. hoog + begaafdheid — одарённость.",
      },
      {
        word: "verrijkingsstof",
        focus: "составное слово",
        tip: "фер-РЭЙ-кинхс-стоф. verrijking + stof — материал повышенной сложности.",
      },
    ],
  },
  {
    id: "huurcommissie-geschil",
    domain: "wonen",
    level: "B1",
    title: "Обращение в комиссию по спорам об аренде",
    context: "Звонок в Huurcommissie перед подачей дела о споре с арендодателем — например, о завышенной арендной плате",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Спросят, пробовали ли вы уже решить вопрос напрямую с арендодателем.",
      "Уточнят детали спора — сумма, договор, точки, по которым жильё оценивается.",
      "Объяснят, что дело рассматривается независимо и решение обязательно для обеих сторон.",
      "В конце скажут, какие документы приложить и сколько стоит подача.",
    ],
    lines: [
      {
        nl: "Ik overweeg een zaak in te dienen bij de huurcommissie.",
        ru: "Я рассматриваю возможность подать дело в комиссию по спорам об аренде.",
      },
      {
        nl: "Ik heb dit al zonder succes met de verhuurder besproken.",
        ru: "Я уже безуспешно обсуждал это с арендодателем.",
      },
      {
        nl: "Hoe wordt bepaald of de huur te hoog is?",
        ru: "Как определяется, что аренда слишком высока?",
      },
      {
        nl: "Is de uitspraak bindend voor beide partijen?",
        ru: "Решение обязательно для обеих сторон?",
      },
    ],
    replyBank: [
      { nl: "Heeft u al geprobeerd dit rechtstreeks op te lossen?", ru: "Вы уже пробовали решить это напрямую?", key: "rechtstreeks", register: "formeel" },
      { nl: "Dit wordt beoordeeld met een puntensysteem.", ru: "Это оценивается с помощью системы баллов.", key: "puntensysteem", register: "formeel" },
      { nl: "De uitspraak is inderdaad bindend voor beide partijen.", ru: "Решение действительно обязательно для обеих сторон.", key: "bindend", register: "formeel" },
      { nl: "U heeft het huurcontract en de correspondentie nodig.", ru: "Вам нужны договор аренды и переписка.", key: "correspondentie", register: "formeel" },
      { nl: "De kosten voor het indienen zijn relatief laag.", ru: "Стоимость подачи относительно невысока.", key: "relatief laag", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can go through this process in English too.", ru: "Можем разобрать этот процесс и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik overweeg in te dienen een zaak bij de huurcommissie.",
        right: "Ik overweeg een zaak in te dienen bij de huurcommissie.",
        why: "В обороте «om … te» (om опущено) дополнение een zaak встаёт перед инфинитивом in te dienen, а не после него.",
      },
      {
        wrong: "de uitspraak, het puntensysteem",
        right: "de uitspraak, het puntensysteem",
        why: "de uitspraak, het puntensysteem — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "puntensysteem",
        focus: "составное слово",
        tip: "ПЮН-тен-сис-те:м. punten + systeem — система баллов для оценки арендной платы.",
      },
      {
        word: "bindend",
        focus: "ударение на BIN-",
        tip: "БИН-дент. Обязательный к исполнению — от binden.",
      },
    ],
  },
  {
    id: "verbouwing-toestemming-vve",
    domain: "wonen",
    level: "B1",
    title: "Запросить у VvE разрешение на ремонт",
    context: "Разговор с управляющим VvE — запрос формального разрешения на существенный ремонт в своей квартире",
    minutes: 8,
    openerContext: "informeel",
    brief: [
      "Опишите конкретно, что планируете менять — особенно если это касается несущих стен или общих коммуникаций.",
      "Управляющий объяснит, нужно ли выносить вопрос на собрание или достаточно письменного согласия.",
      "Обсудят сроки шумных работ, если такие правила есть в доме.",
      "В конце договорятся о процедуре подачи официального запроса.",
    ],
    lines: [
      {
        nl: "Ik wil toestemming vragen voor een verbouwing.",
        ru: "Я хочу запросить разрешение на ремонт.",
      },
      {
        nl: "Het gaat om het verwijderen van een niet-dragende wand.",
        ru: "Речь о сносе ненесущей стены.",
      },
      {
        nl: "Moet dit worden voorgelegd aan de vergadering?",
        ru: "Это нужно выносить на собрание?",
      },
      {
        nl: "Zijn er beperkingen wat betreft geluidsoverlast?",
        ru: "Есть ли ограничения по шумовому беспокойству?",
      },
    ],
    replyBank: [
      { nl: "Om welk type verbouwing gaat het precies?", ru: "О каком именно виде ремонта идёт речь?", key: "type verbouwing", register: "formeel" },
      { nl: "Bij een niet-dragende wand volstaat schriftelijke toestemming.", ru: "Для ненесущей стены достаточно письменного согласия.", key: "volstaat", register: "formeel" },
      { nl: "Boorwerkzaamheden mogen alleen op werkdagen overdag.", ru: "Бурильные работы разрешены только в будни днём.", key: "boorwerkzaamheden", register: "formeel" },
      { nl: "Dient u dit verzoek schriftelijk bij ons in.", ru: "Подайте это заявление нам письменно.", key: "schriftelijk indienen", register: "formeel" },
      { nl: "We reageren doorgaans binnen twee weken.", ru: "Мы обычно отвечаем в течение двух недель.", key: "twee weken", register: "neutraal" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can handle this by email in English too.", ru: "Можем решить это по почте и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Het gaat om verwijderen van een niet-dragende wand het.",
        right: "Het gaat om het verwijderen van een niet-dragende wand.",
        why: "Отглагольное существительное het verwijderen требует определённый артикль — оно ведёт себя как обычное существительное среднего рода, а не как голый инфинитив.",
      },
      {
        wrong: "de wand, het verzoek",
        right: "de wand, het verzoek",
        why: "de wand, het verzoek — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "niet-dragende",
        focus: "составное слово с дефисом",
        tip: "нит-ДРА:-хен-дə. Ненесущая (стена) — dragen значит «нести».",
      },
      {
        word: "boorwerkzaamheden",
        focus: "составное слово",
        tip: "БО:Р-верк-за:м-хе:-ден. boor + werkzaamheden — бурильные работы.",
      },
    ],
  },
  {
    id: "koopwoning-onderhandelen",
    domain: "wonen",
    level: "B1",
    title: "Торговаться при покупке жилья",
    context: "Разговор с продавцом или его агентом при покупке квартиры — обсуждение цены после осмотра",
    minutes: 10,
    openerContext: "informeel",
    brief: [
      "Начните с позитивного впечатления от квартиры, прежде чем переходить к цене.",
      "Обоснуйте предложенную цену конкретными наблюдениями — состояние, рынок, необходимый ремонт.",
      "Продавец может сразу отказать, встречно предложить или взять время подумать.",
      "В конце договоритесь о сроке ответа и следующих шагах, если сделка состоится.",
    ],
    lines: [
      {
        nl: "We zijn erg enthousiast over de woning.",
        ru: "Мы в восторге от этой квартиры.",
      },
      {
        nl: "Gezien de staat van het dak willen we een bod doen onder de vraagprijs.",
        ru: "Учитывая состояние крыши, мы хотим предложить цену ниже запрашиваемой.",
      },
      {
        nl: "Is hier ruimte voor onderhandeling?",
        ru: "Есть ли здесь возможность для торга?",
      },
      {
        nl: "Tot wanneer hebben we bedenktijd?",
        ru: "До какого срока у нас есть время подумать?",
      },
    ],
    replyBank: [
      { nl: "Fijn om te horen dat het u aanspreekt.", ru: "Приятно слышать, что вам нравится.", key: "aanspreekt", register: "informeel" },
      { nl: "De verkoper staat in principe open voor onderhandeling.", ru: "Продавец в принципе открыт для торга.", key: "open voor onderhandeling", register: "formeel" },
      { nl: "Dit bod ligt wel behoorlijk onder de vraagprijs.", ru: "Это предложение довольно сильно ниже запрашиваемой цены.", key: "behoorlijk onder", register: "neutraal" },
      { nl: "Ik leg dit voor aan de verkoper en kom erop terug.", ru: "Передам это продавцу и вернусь с ответом.", key: "kom erop terug", register: "formeel" },
      { nl: "U heeft doorgaans enkele dagen bedenktijd.", ru: "У вас обычно есть несколько дней на размышление.", key: "bedenktijd", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can negotiate this in English if that's easier.", ru: "Можем вести переговоры по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "cijfers"],
    traps: [
      {
        wrong: "We willen doen een bod onder de vraagprijs.",
        right: "We willen een bod doen onder de vraagprijs.",
        why: "Дополнение перед инфинитивом отделяемого глагола, не после него.",
      },
      {
        wrong: "de vraagprijs, het onderhandeling",
        right: "de vraagprijs, de onderhandeling",
        why: "Оба de: de vraagprijs, de onderhandeling.",
      },
    ],
    gate: [
      {
        word: "vraagprijs",
        focus: "составное слово",
        tip: "ВРА:Х-прэйс. vraag + prijs — запрашиваемая цена.",
      },
      {
        word: "bedenktijd",
        focus: "составное слово",
        tip: "бə-ДЕНК-тэйт. bedenken + tijd — время на размышление.",
      },
    ],
  },
  {
    id: "hypotheek-adviesgesprek",
    domain: "wonen",
    level: "B1",
    title: "Консультация по ипотеке",
    context: "Первая консультационная встреча с ипотечным консультантом при покупке первого жилья",
    minutes: 10,
    openerContext: "informeel",
    brief: [
      "Консультант спросит доход, текущие обязательства и накопления.",
      "Объяснит максимальную сумму, которую вам могут одолжить, и почему именно такую.",
      "Обсудят фиксированную ставку на разный срок и её плюсы и минусы.",
      "В конце составят список документов для официальной заявки.",
    ],
    lines: [
      {
        nl: "Hoeveel zou ik ongeveer kunnen lenen?",
        ru: "Сколько я примерно мог бы занять?",
      },
      {
        nl: "Wat zijn de voor- en nadelen van een lange rentevaste periode?",
        ru: "Какие плюсы и минусы у долгого срока фиксированной ставки?",
      },
      {
        nl: "Houdt u ook rekening met mijn studieschuld?",
        ru: "Вы учитываете и мой студенческий долг?",
      },
      {
        nl: "Welke documenten heeft u van mij nodig?",
        ru: "Какие документы вам от меня нужны?",
      },
    ],
    replyBank: [
      { nl: "Dat hangt af van uw inkomen en vaste lasten.", ru: "Это зависит от вашего дохода и постоянных расходов.", key: "vaste lasten", register: "formeel" },
      { nl: "Een langere rentevaste periode geeft meer zekerheid.", ru: "Более длинный срок фиксированной ставки даёт больше уверенности.", key: "rentevaste periode", register: "neutraal" },
      { nl: "Uw studieschuld tellen we inderdaad mee.", ru: "Ваш студенческий долг мы действительно учитываем.", key: "studieschuld", register: "formeel" },
      { nl: "We hebben uw loonstroken en jaaropgave nodig.", ru: "Нам нужны ваши расчётные листы и годовая справка.", key: "jaaropgave", register: "formeel" },
      { nl: "Neem gerust de tijd om dit door te nemen.", ru: "Не торопитесь, изучите это спокойно.", key: "doornemen", register: "informeel" },
      { nl: "Kunt u dat nog een keer rustig uitleggen?", ru: "Объясните это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can go through the numbers in English too.", ru: "Можем разобрать цифры и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "cijfers", "opschrijven"],
    traps: [
      {
        wrong: "Wat zijn de nadelen en voordelen van rentevaste periode een lange?",
        right: "Wat zijn de voor- en nadelen van een lange rentevaste periode?",
        why: "Прилагательное lange встаёт перед всей группой rentevaste periode, а устойчивый порядок voor- en nadelen (плюсы и минусы) не переставляется местами.",
      },
      {
        wrong: "de rente, het studieschuld",
        right: "de rente, de studieschuld",
        why: "Оба de: de rente, de studieschuld.",
      },
    ],
    gate: [
      {
        word: "rentevaste periode",
        focus: "составное словосочетание",
        tip: "РЕН-тə-фас-тə пе-ри-О:-де. rente + vaste + periode — период фиксированной процентной ставки.",
      },
      {
        word: "studieschuld",
        focus: "составное слово",
        tip: "СТЮ:-ди-схулт. studie + schuld — студенческий долг.",
      },
    ],
  },
  {
    id: "onderhuur-toestemming-vragen",
    domain: "wonen",
    level: "B1",
    title: "Запросить разрешение на субаренду",
    context: "Разговор с арендодателем — запрос разрешения временно сдать квартиру в субаренду на время долгой командировки",
    minutes: 8,
    openerContext: "telefoon",
    brief: [
      "Объясните причину и срок — обычно это влияет на решение арендодателя.",
      "Арендодатель может согласиться с условиями или отказать полностью — субаренда часто запрещена по умолчанию.",
      "Обсудят, кто отвечает за поведение субарендатора и состояние квартиры.",
      "В конце договоритесь, нужно ли всё оформить письменно как дополнение к договору.",
    ],
    lines: [
      {
        nl: "Ik wil toestemming vragen om tijdelijk onder te verhuren.",
        ru: "Я хочу запросить разрешение временно сдать в субаренду.",
      },
      {
        nl: "Het gaat om een uitzending van zes maanden.",
        ru: "Речь о командировке на шесть месяцев.",
      },
      {
        nl: "Blijf ik zelf verantwoordelijk voor de woning?",
        ru: "Я сам остаюсь ответственным за квартиру?",
      },
      {
        nl: "Kunnen we dit vastleggen in een aanvullend document?",
        ru: "Можем зафиксировать это в дополнительном документе?",
      },
    ],
    replyBank: [
      { nl: "Onderverhuur is in principe niet toegestaan.", ru: "Субаренда в принципе не разрешена.", key: "niet toegestaan", register: "formeel" },
      { nl: "Onder deze omstandigheden kan ik een uitzondering overwegen.", ru: "При таких обстоятельствах я могу рассмотреть исключение.", key: "uitzondering overwegen", register: "formeel" },
      { nl: "U blijft hoofdhuurder en dus verantwoordelijk.", ru: "Вы остаётесь основным арендатором и, соответственно, ответственным.", key: "hoofdhuurder", register: "formeel" },
      { nl: "Laten we dit inderdaad schriftelijk vastleggen.", ru: "Давайте действительно зафиксируем это письменно.", key: "vastleggen", register: "formeel" },
      { nl: "Ik heb de naam van de onderhuurder nodig.", ru: "Мне нужно имя субарендатора.", key: "onderhuurder", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can put this agreement in English too.", ru: "Можем оформить это соглашение и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik wil vragen toestemming om tijdelijk onder te verhuren.",
        right: "Ik wil toestemming vragen om tijdelijk onder te verhuren.",
        why: "Дополнение перед инфинитивом, не после него; частица onder отделяемого глагола verhuren уходит в конец оборота «om … te».",
      },
      {
        wrong: "de onderhuurder, het uitzending",
        right: "de onderhuurder, de uitzending",
        why: "Оба de: de onderhuurder, de uitzending.",
      },
    ],
    gate: [
      {
        word: "hoofdhuurder",
        focus: "составное слово",
        tip: "ХО:ФТ-хёр-дер. hoofd + huurder — основной арендатор.",
      },
      {
        word: "onderverhuur",
        focus: "составное слово",
        tip: "ОН-дер-фер-хю:р. onder + verhuur — субаренда.",
      },
    ],
  },
  {
    id: "ontslag-op-staande-voet-gesprek",
    domain: "werk",
    level: "B1",
    title: "Оспорить немедленное увольнение",
    context: "Разговор с юридическим консультантом или профсоюзом после получения немедленного увольнения (ontslag op staande voet)",
    minutes: 10,
    openerContext: "telefoon",
    brief: [
      "Изложите ситуацию максимально фактически — что сказали, когда и в каком контексте.",
      "Консультант спросит, было ли предупреждение заранее и получили ли вы это письменно.",
      "Объяснит, что немедленное увольнение требует очень веской причины и часто оспаривается успешно.",
      "В конце обсудят срок подачи возражения — он очень короткий.",
    ],
    lines: [
      {
        nl: "Ik ben op staande voet ontslagen en begrijp de reden niet helemaal.",
        ru: "Меня уволили немедленно, и я не совсем понимаю причину.",
      },
      {
        nl: "Ik heb hiervoor geen eerdere waarschuwing gehad.",
        ru: "До этого у меня не было предупреждения.",
      },
      {
        nl: "Hoeveel tijd heb ik om dit aan te vechten?",
        ru: "Сколько у меня времени, чтобы это оспорить?",
      },
      {
        nl: "Wat zijn mijn kansen realistisch gezien?",
        ru: "Каковы мои реальные шансы?",
      },
    ],
    replyBank: [
      { nl: "Kunt u precies vertellen wat er is gezegd?", ru: "Можете точно рассказать, что было сказано?", key: "precies vertellen", register: "formeel" },
      { nl: "Een ontslag zonder waarschuwing is juridisch kwetsbaar.", ru: "Увольнение без предупреждения юридически уязвимо.", key: "kwetsbaar", register: "formeel" },
      { nl: "U heeft slechts twee maanden om dit aan te vechten.", ru: "У вас всего два месяца, чтобы это оспорить.", key: "twee maanden", register: "formeel" },
      { nl: "Uw kansen lijken op basis hiervan behoorlijk goed.", ru: "На основании этого ваши шансы выглядят довольно хорошими.", key: "behoorlijk goed", register: "neutraal" },
      { nl: "Laten we dit zo snel mogelijk schriftelijk vastleggen.", ru: "Давайте как можно быстрее зафиксируем это письменно.", key: "vastleggen", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can handle this case in English too if needed.", ru: "Можем вести это дело и на английском, если нужно.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Hoeveel tijd heb ik om aan te vechten dit?",
        right: "Hoeveel tijd heb ik om dit aan te vechten?",
        why: "Дополнение dit встаёт перед инфинитивом aan te vechten в обороте «om … te», а не после него.",
      },
      {
        wrong: "het ontslag, de waarschuwing",
        right: "het ontslag, de waarschuwing",
        why: "het ontslag, de waarschuwing — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "ontslag op staande voet",
        focus: "устойчивое сочетание",
        tip: "онт-СЛАХ оп СТА:н-дə ВУТ. Буквально «увольнение на стоячую ногу» — немедленное увольнение.",
      },
      {
        word: "kwetsbaar",
        focus: "долгое aa",
        tip: "КВЕТС-ба:р. Уязвимый — часто встречается в юридическом контексте.",
      },
    ],
  },
  {
    id: "salarisonderhandeling",
    domain: "werk",
    level: "B1",
    title: "Переговоры о повышении зарплаты",
    context: "Разговор с руководителем — обоснованный запрос повышения зарплаты",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Начните с конкретных достижений за последний период.",
      "Назовите желаемую сумму или процент, обоснованный рынком или ростом обязанностей.",
      "Руководитель может сразу согласиться, предложить компромисс или взять время подумать.",
      "В конце договоритесь о сроке окончательного ответа.",
    ],
    lines: [
      {
        nl: "Ik zou graag mijn salaris willen bespreken.",
        ru: "Я хотел бы обсудить свою зарплату.",
      },
      {
        nl: "Mijn verantwoordelijkheden zijn het afgelopen jaar flink gegroeid.",
        ru: "Мои обязанности значительно выросли за последний год.",
      },
      {
        nl: "Ik denk aan een verhoging van rond de tien procent.",
        ru: "Я думаю о повышении примерно на десять процентов.",
      },
      {
        nl: "Is hier ruimte voor, gezien de huidige situatie?",
        ru: "Есть ли для этого возможность, учитывая нынешнюю ситуацию?",
      },
    ],
    replyBank: [
      { nl: "Laten we eens kijken naar je prestaties van dit jaar.", ru: "Давай посмотрим на твои достижения за этот год.", key: "prestaties", register: "informeel" },
      { nl: "Tien procent is fors, maar bespreekbaar.", ru: "Десять процентов — это много, но обсуждаемо.", key: "bespreekbaar", register: "informeel" },
      { nl: "Ik moet dit eerst met HR afstemmen.", ru: "Мне нужно сначала согласовать это с HR.", key: "afstemmen", register: "formeel" },
      { nl: "Laten we hier volgende week op terugkomen.", ru: "Давай вернёмся к этому на следующей неделе.", key: "terugkomen", register: "informeel" },
      { nl: "Een tussenoplossing is misschien ook denkbaar.", ru: "Промежуточное решение тоже, возможно, вариант.", key: "tussenoplossing", register: "neutraal" },
      { nl: "Kun je dat nog een keer rustig toelichten?", ru: "Можешь спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can continue this discussion in English if easier.", ru: "Можем продолжить это обсуждение по-английски, если так легче.", register: "switch" },
    ],
    repairIds: ["momentje", "cijfers"],
    traps: [
      {
        wrong: "Mijn verantwoordelijkheden zijn gegroeid flink het afgelopen jaar.",
        right: "Mijn verantwoordelijkheden zijn het afgelopen jaar flink gegroeid.",
        why: "Обстоятельство времени «het afgelopen jaar» встаёт перед наречием flink и причастием, а не выносится в самый конец.",
      },
      {
        wrong: "de verhoging, het tussenoplossing",
        right: "de verhoging, de tussenoplossing",
        why: "Оба de: de verhoging, de tussenoplossing.",
      },
    ],
    gate: [
      {
        word: "verantwoordelijkheden",
        focus: "долгое, самое трудное слово",
        tip: "фер-ант-во:р-дə-лек-хе:-ден. Обязанности/ответственность — множественное число.",
      },
      {
        word: "tussenoplossing",
        focus: "составное слово",
        tip: "ТЮ-сен-оп-ло-синх. tussen + oplossing — промежуточное решение.",
      },
    ],
  },
  {
    id: "re-integratie-tweede-spoor",
    domain: "werk",
    level: "B1",
    title: "Обсудить реинтеграцию по второму треку",
    context: "Разговор с консультантом по реинтеграции после длительного больничного, когда возврат на старую должность невозможен",
    minutes: 10,
    openerContext: "loket",
    brief: [
      "Консультант объяснит, что такое второй трек (tweede spoor) — поиск работы у другого работодателя.",
      "Обсудят ваши навыки, ограничения по здоровью и интересы для нового направления.",
      "Могут предложить переквалификацию или стажировку.",
      "В конце составят план с конкретными шагами и сроками.",
    ],
    lines: [
      {
        nl: "Ik begrijp dat terugkeer naar mijn oude functie niet haalbaar is.",
        ru: "Я понимаю, что возврат на мою прежнюю должность невозможен.",
      },
      {
        nl: "Wat houdt het tweede spoor precies in?",
        ru: "Что именно подразумевает второй трек?",
      },
      {
        nl: "Welke beperkingen moet ik hierbij in acht nemen?",
        ru: "Какие ограничения мне нужно здесь учитывать?",
      },
      {
        nl: "Kom ik in aanmerking voor omscholing?",
        ru: "Подхожу ли я под переквалификацию?",
      },
    ],
    replyBank: [
      { nl: "Het tweede spoor richt zich op werk bij een andere werkgever.", ru: "Второй трек направлен на работу у другого работодателя.", key: "andere werkgever", register: "formeel" },
      { nl: "We houden rekening met uw medische beperkingen.", ru: "Мы учитываем ваши медицинские ограничения.", key: "beperkingen", register: "formeel" },
      { nl: "Omscholing behoort zeker tot de mogelijkheden.", ru: "Переквалификация точно входит в число возможностей.", key: "omscholing", register: "formeel" },
      { nl: "We stellen samen een re-integratieplan op.", ru: "Мы вместе составим план реинтеграции.", key: "re-integratieplan", register: "formeel" },
      { nl: "Dit traject duurt doorgaans zes tot twaalf maanden.", ru: "Этот процесс обычно занимает от шести до двенадцати месяцев.", key: "zes tot twaalf maanden", register: "neutraal" },
      { nl: "Kunt u dat rustig nog een keer toelichten?", ru: "Можете спокойно ещё раз это пояснить?", key: "toelichten", register: "informeel" },
      { nl: "We can go through this plan in English too.", ru: "Можем разобрать этот план и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Welke beperkingen moet ik in acht nemen hierbij?",
        right: "Welke beperkingen moet ik hierbij in acht nemen?",
        why: "«hierbij» встаёт перед отделяемым сочетанием in acht nemen, а не после него в самом конце.",
      },
      {
        wrong: "het spoor, de beperking",
        right: "het spoor, de beperking",
        why: "het spoor, de beperking — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "re-integratieplan",
        focus: "составное слово с дефисом",
        tip: "ре-ин-те-ХРА:-си-план. re-integratie + plan — план возвращения к работе.",
      },
      {
        word: "omscholing",
        focus: "харде G перед -ing",
        tip: "ОМ-схо:-линх. Переквалификация — om + scholing.",
      },
    ],
  },
  {
    id: "concurrentiebeding-bespreken",
    domain: "werk",
    level: "B1",
    title: "Обсудить пункт о неконкуренции при увольнении",
    context: "Разговор с HR при увольнении об условиях пункта о неконкуренции (concurrentiebeding) в контракте",
    minutes: 9,
    openerContext: "informeel",
    brief: [
      "Спросите, действует ли пункт о неконкуренции всё ещё, если вы уходите сами.",
      "HR объяснит территорию и срок действия ограничения.",
      "Обсудят возможность договориться об исключении для конкретного нового работодателя.",
      "В конце скажут, к кому обратиться для официального запроса на снятие ограничения.",
    ],
    lines: [
      {
        nl: "Geldt het concurrentiebeding ook als ik zelf ontslag neem?",
        ru: "Пункт о неконкуренции действует и если я увольняюсь сам?",
      },
      {
        nl: "Hoe lang en voor welk gebied geldt deze beperking?",
        ru: "Как долго и для какой территории действует это ограничение?",
      },
      {
        nl: "Is er ruimte om hierover te onderhandelen?",
        ru: "Есть ли возможность договориться по этому поводу?",
      },
      {
        nl: "Bij wie kan ik een officieel verzoek indienen?",
        ru: "К кому я могу подать официальный запрос?",
      },
    ],
    replyBank: [
      { nl: "Het beding geldt inderdaad ongeacht de reden van vertrek.", ru: "Пункт действительно действует независимо от причины ухода.", key: "ongeacht", register: "formeel" },
      { nl: "Dit geldt voor twaalf maanden binnen Nederland.", ru: "Это действует двенадцать месяцев на территории Нидерландов.", key: "twaalf maanden", register: "formeel" },
      { nl: "Onderhandelen over een uitzondering is soms mogelijk.", ru: "Иногда возможно договориться об исключении.", key: "uitzondering", register: "neutraal" },
      { nl: "Dient u dit verzoek in bij onze juridische afdeling.", ru: "Подайте это заявление в наш юридический отдел.", key: "juridische afdeling", register: "formeel" },
      { nl: "Wij nemen dit serieus in overweging.", ru: "Мы серьёзно это рассмотрим.", key: "in overweging", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can discuss this clause in English too.", ru: "Можем обсудить этот пункт и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Geldt het concurrentiebeding ook als neem ik zelf ontslag?",
        right: "Geldt het concurrentiebeding ook als ik zelf ontslag neem?",
        why: "В придаточном условия с «als» подлежащее ik встаёт перед глаголом neem, который уходит в конец.",
      },
      {
        wrong: "het beding, de gebied",
        right: "het beding, het gebied",
        why: "het beding, het gebied — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "concurrentiebeding",
        focus: "составное слово",
        tip: "кон-кю-РЕН-си-бə-динх. concurrentie + beding — пункт о неконкуренции.",
      },
      {
        word: "ongeacht",
        focus: "ударение на -ACHT",
        tip: "он-хə-АХТ. Независимо от — устойчивое слово в юридическом контексте.",
      },
    ],
  },
  {
    id: "klokkenluider-melding",
    domain: "werk",
    level: "B1",
    title: "Сообщить о серьёзном нарушении на работе",
    context: "Конфиденциальный разговор с доверенным лицом компании (vertrouwenspersoon) о желании сообщить о серьёзном нарушении",
    minutes: 10,
    openerContext: "informeel",
    brief: [
      "Доверенное лицо объяснит правила конфиденциальности и защиту от последствий (klokkenluidersbescherming).",
      "Попросит изложить факты максимально конкретно — что, когда, кто был вовлечён.",
      "Обсудят, готовы ли вы к тому, что дело может дойти до внешнего расследования.",
      "В конце договорятся о следующих шагах и о том, как вас будут держать в курсе.",
    ],
    lines: [
      {
        nl: "Ik wil een ernstige misstand melden.",
        ru: "Я хочу сообщить о серьёзном нарушении.",
      },
      {
        nl: "Ik ben bang voor de gevolgen als dit bekend wordt.",
        ru: "Я боюсь последствий, если это станет известно.",
      },
      {
        nl: "Ben ik beschermd als klokkenluider?",
        ru: "Я защищён как информатор?",
      },
      {
        nl: "Wat gebeurt er nadat ik dit heb gemeld?",
        ru: "Что произойдёт после того, как я об этом сообщу?",
      },
    ],
    replyBank: [
      { nl: "Alles wat u meldt, behandelen wij vertrouwelijk.", ru: "Всё, что вы сообщите, мы обработаем конфиденциально.", key: "vertrouwelijk", register: "formeel" },
      { nl: "U bent wettelijk beschermd tegen represailles.", ru: "Вы юридически защищены от репрессий.", key: "represailles", register: "formeel" },
      { nl: "Kunt u de feiten zo concreet mogelijk beschrijven?", ru: "Можете описать факты максимально конкретно?", key: "concreet", register: "formeel" },
      { nl: "Dit kan uiteindelijk leiden tot een extern onderzoek.", ru: "В итоге это может привести к внешнему расследованию.", key: "extern onderzoek", register: "formeel" },
      { nl: "We houden u op elke stap van de hoogte.", ru: "Мы будем держать вас в курсе на каждом шаге.", key: "op de hoogte", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue this in English if that's more comfortable.", ru: "Можем продолжить это по-английски, если так удобнее.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Ik ben bang voor de gevolgen als bekend dit wordt.",
        right: "Ik ben bang voor de gevolgen als dit bekend wordt.",
        why: "В придаточном условия подлежащее dit встаёт перед прилагательным bekend и глаголом wordt, который уходит в конец.",
      },
      {
        wrong: "de misstand, het onderzoek",
        right: "de misstand, het onderzoek",
        why: "de misstand, het onderzoek — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "klokkenluider",
        focus: "составное слово",
        tip: "КЛО-кен-лёй-дер. klokken + luider — буквально «звонящий в колокол», информатор.",
      },
      {
        word: "represailles",
        focus: "заимствование из французского",
        tip: "ре-прə-ЗА:Й-йəс. Репрессии/ответные меры.",
      },
    ],
  },
  {
    id: "verzekeringsclaim-geschil",
    domain: "dagelijks",
    level: "B1",
    title: "Оспорить отказ страховой в выплате",
    context: "Звонок в страховую компанию после отказа в выплате по заявленному ущербу — попытка оспорить решение",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Спросят номер дела, чтобы найти отказ и его основание.",
      "Изложите, почему вы не согласны с отказом — конкретно, ссылаясь на условия полиса.",
      "Могут предложить пересмотр с дополнительными документами.",
      "В конце объяснят, куда обращаться, если пересмотр тоже не поможет (Kifid).",
    ],
    lines: [
      {
        nl: "Ik ben het niet eens met de afwijzing van mijn claim.",
        ru: "Я не согласен с отказом по моей заявке.",
      },
      {
        nl: "Volgens de polisvoorwaarden zou dit gedekt moeten zijn.",
        ru: "Согласно условиям полиса, это должно быть покрыто.",
      },
      {
        nl: "Kan mijn dossier opnieuw worden bekeken?",
        ru: "Можно ли пересмотреть моё дело?",
      },
      {
        nl: "Waar kan ik terecht als dit niet wordt opgelost?",
        ru: "Куда мне обращаться, если это не решится?",
      },
    ],
    replyBank: [
      { nl: "Wat is uw dossiernummer?", ru: "Номер вашего дела?", key: "dossiernummer", register: "formeel" },
      { nl: "Op basis waarvan bent u het niet eens met de afwijzing?", ru: "На каком основании вы не согласны с отказом?", key: "op basis waarvan", register: "formeel" },
      { nl: "We kunnen dit met aanvullende stukken opnieuw bekijken.", ru: "Мы можем пересмотреть это с дополнительными документами.", key: "aanvullende stukken", register: "formeel" },
      { nl: "Bij een geschil kunt u terecht bij het Kifid.", ru: "При споре вы можете обратиться в Kifid.", key: "geschil", register: "formeel" },
      { nl: "Ik leg dit voor aan onze schade-afdeling.", ru: "Передам это в наш отдел урегулирования ущерба.", key: "schade-afdeling", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can review this in English too if needed.", ru: "Можем пересмотреть это и на английском, если нужно.", register: "switch" },
    ],
    repairIds: ["momentje", "opschrijven"],
    traps: [
      {
        wrong: "Volgens de polisvoorwaarden dit zou gedekt moeten zijn.",
        right: "Volgens de polisvoorwaarden zou dit gedekt moeten zijn.",
        why: "Первым стоит обстоятельство volgens de polisvoorwaarden — глагол zou остаётся на втором месте, подлежащее dit уходит за него.",
      },
      {
        wrong: "de claim, het geschil",
        right: "de claim, het geschil",
        why: "de claim, het geschil — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "polisvoorwaarden",
        focus: "составное слово",
        tip: "ПО:-лис-фо:р-ва:р-ден. polis + voorwaarden — условия полиса.",
      },
      {
        word: "geschil",
        focus: "долгое i",
        tip: "хə-СХИЛ. Спор/разногласие — юридический термин.",
      },
    ],
  },
  {
    id: "incassobureau-betalingsregeling",
    domain: "dagelijks",
    level: "B1",
    title: "Договориться о рассрочке с коллекторским агентством",
    context: "Звонок в incassobureau после получения письма о задолженности — попытка договориться о плане выплат",
    minutes: 9,
    openerContext: "telefoon",
    brief: [
      "Признайте задолженность, но объясните свою текущую финансовую ситуацию.",
      "Предложите конкретную посильную сумму ежемесячно.",
      "Агентство может согласиться, предложить свои условия или отказать.",
      "В конце попросите письменное подтверждение договорённости.",
    ],
    lines: [
      {
        nl: "Ik erken de schuld, maar kan niet in één keer betalen.",
        ru: "Я признаю долг, но не могу заплатить всё сразу.",
      },
      {
        nl: "Ik stel voor om vijftig euro per maand af te lossen.",
        ru: "Я предлагаю выплачивать пятьдесят евро в месяц.",
      },
      {
        nl: "Kunnen we hier een regeling voor treffen?",
        ru: "Можем мы договориться об этом?",
      },
      {
        nl: "Kunt u dit schriftelijk bevestigen?",
        ru: "Можете подтвердить это письменно?",
      },
    ],
    replyBank: [
      { nl: "Fijn dat u contact opneemt over deze schuld.", ru: "Хорошо, что вы связались по поводу этого долга.", key: "contact opneemt", register: "formeel" },
      { nl: "Vijftig euro per maand is voor ons bespreekbaar.", ru: "Пятьдесят евро в месяц для нас обсуждаемо.", key: "bespreekbaar", register: "neutraal" },
      { nl: "We leggen deze regeling schriftelijk vast.", ru: "Мы зафиксируем эту договорённость письменно.", key: "regeling vastleggen", register: "formeel" },
      { nl: "Bij een gemiste betaling vervalt de regeling.", ru: "При пропущенном платеже договорённость аннулируется.", key: "vervalt", register: "formeel" },
      { nl: "U ontvangt hiervan een bevestiging per post.", ru: "Вам придёт подтверждение по почте.", key: "bevestiging", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can arrange this payment plan in English too.", ru: "Можем оформить этот план выплат и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "cijfers"],
    traps: [
      {
        wrong: "Ik stel voor om aflossen vijftig euro per maand.",
        right: "Ik stel voor om vijftig euro per maand af te lossen.",
        why: "В обороте «om … te» дополнение и обстоятельство встают перед инфинитивом af te lossen, частица af — прямо перед te.",
      },
      {
        wrong: "de schuld, het regeling",
        right: "de schuld, de regeling",
        why: "Оба de: de schuld, de regeling.",
      },
    ],
    gate: [
      {
        word: "aflossen",
        focus: "ударение на -LOS-",
        tip: "АФ-ло-сен. Выплачивать долг постепенно.",
      },
      {
        word: "betalingsregeling",
        focus: "составное слово",
        tip: "бə-ТА:-линхс-ре:-хə-линх. betaling + regeling — план выплат.",
      },
    ],
  },
  {
    id: "autogarage-geschil-reparatie",
    domain: "dagelijks",
    level: "B1",
    title: "Оспорить качество ремонта автомобиля",
    context: "Разговор с автомастерской, когда после ремонта проблема не решена или появилась новая",
    minutes: 8,
    openerContext: "winkel",
    brief: [
      "Опишите конкретно, что не так — та же проблема вернулась или появилась новая после ремонта.",
      "Мастерская может предложить бесплатно исправить или оспорить, что проблема связана с их работой.",
      "Обсудите, кто несёт расходы, если понадобится ещё один визит.",
      "В конце договоритесь о сроке исправления и подтверждении в письменном виде.",
    ],
    lines: [
      {
        nl: "Het probleem waarvoor ik kwam, is niet opgelost.",
        ru: "Проблема, из-за которой я приезжал, не решена.",
      },
      {
        nl: "Sterker nog, er is een nieuw geluid bijgekomen.",
        ru: "Более того, появился новый звук.",
      },
      {
        nl: "Ik verwacht dat dit kosteloos wordt hersteld.",
        ru: "Я ожидаю, что это исправят бесплатно.",
      },
      {
        nl: "Kunt u dit schriftelijk bevestigen?",
        ru: "Можете подтвердить это письменно?",
      },
    ],
    replyBank: [
      { nl: "Wat hoort u precies dat er niet goed is?", ru: "Что именно вы слышите, что не так?", key: "precies", register: "formeel" },
      { nl: "Dit valt inderdaad onder onze garantie.", ru: "Это действительно подпадает под нашу гарантию.", key: "garantie", register: "formeel" },
      { nl: "We herstellen dit kosteloos voor u.", ru: "Мы исправим это для вас бесплатно.", key: "kosteloos", register: "informeel" },
      { nl: "Ik geef u hiervan een schriftelijke bevestiging mee.", ru: "Дам вам письменное подтверждение этого.", key: "bevestiging", register: "formeel" },
      { nl: "We plannen dit zo snel mogelijk in.", ru: "Мы назначим это как можно скорее.", key: "inplannen", register: "informeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "I'm happy to sort this out in English too.", ru: "С радостью разберусь с этим и по-английски.", register: "switch" },
    ],
    repairIds: ["momentje", "herhalen"],
    traps: [
      {
        wrong: "Ik verwacht dat wordt dit kosteloos hersteld.",
        right: "Ik verwacht dat dit kosteloos wordt hersteld.",
        why: "В придаточном с dat подлежащее dit встаёт перед wordt, который уходит в конец после наречия kosteloos.",
      },
      {
        wrong: "de garantie, het geluid",
        right: "de garantie, het geluid",
        why: "de garantie, het geluid — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "kosteloos",
        focus: "долгое oo",
        tip: "КОС-тə-ло:с. Бесплатно/безвозмездно — более формальное слово, чем gratis.",
      },
      {
        word: "hersteld",
        focus: "ударение на -STELD",
        tip: "хер-СТЕЛТ. Исправлено — причастие от herstellen.",
      },
    ],
  },
  {
    id: "buurtbemiddeling-gesprek",
    domain: "dagelijks",
    level: "B1",
    title: "Медиация с соседями через buurtbemiddeling",
    context: "Встреча с бесплатным медиатором района (buurtbemiddeling) для разрешения затяжного конфликта с соседями",
    minutes: 10,
    openerContext: "informeel",
    brief: [
      "Медиатор объяснит правила — нейтралитет, конфиденциальность, обе стороны говорят по очереди.",
      "Попросит изложить ситуацию со своей точки зрения, избегая обвинений.",
      "Поможет найти общий язык и сформулировать конкретные договорённости.",
      "В конце запишут договорённости и назначат контрольную встречу.",
    ],
    lines: [
      {
        nl: "Ik waardeer het dat we dit samen proberen op te lossen.",
        ru: "Я ценю, что мы пытаемся решить это вместе.",
      },
      {
        nl: "Vanuit mijn kant speelt dit al enkele maanden.",
        ru: "С моей стороны это длится уже несколько месяцев.",
      },
      {
        nl: "Ik zou het liefst gewoon weer normaal contact willen hebben.",
        ru: "Я хотел бы прежде всего просто снова нормально общаться.",
      },
      {
        nl: "Welke concrete afspraken kunnen we hieruit halen?",
        ru: "Какие конкретные договорённости мы можем из этого извлечь?",
      },
    ],
    replyBank: [
      { nl: "Fijn dat u beiden hiervoor de tijd neemt.", ru: "Хорошо, что вы оба находите на это время.", key: "de tijd neemt", register: "formeel" },
      { nl: "Vertelt u vanuit uw eigen ervaring, zonder verwijten.", ru: "Расскажите со своей точки зрения, без обвинений.", key: "zonder verwijten", register: "formeel" },
      { nl: "Wat zou voor u al een verbetering betekenen?", ru: "Что для вас уже было бы улучшением?", key: "verbetering", register: "neutraal" },
      { nl: "Laten we een paar concrete afspraken vastleggen.", ru: "Давайте зафиксируем несколько конкретных договорённостей.", key: "afspraken vastleggen", register: "formeel" },
      { nl: "We plannen over een maand een vervolggesprek in.", ru: "Через месяц назначим контрольную встречу.", key: "vervolggesprek", register: "formeel" },
      { nl: "Kunt u dat rustig nog een keer zeggen?", ru: "Скажите это спокойно ещё раз?", key: "rustig", register: "informeel" },
      { nl: "We can continue in English if that's more comfortable for everyone.", ru: "Можем продолжить по-английски, если так всем удобнее.", register: "switch" },
    ],
    repairIds: ["momentje", "betekent"],
    traps: [
      {
        wrong: "Ik zou willen hebben liefst gewoon weer normaal contact.",
        right: "Ik zou het liefst gewoon weer normaal contact willen hebben.",
        why: "«het liefst gewoon weer normaal» встаёт целым блоком перед закрывающим инфинитивом willen hebben, а не разбивает его.",
      },
      {
        wrong: "het contact, de verbetering",
        right: "het contact, de verbetering",
        why: "het contact, de verbetering — заучивать со словом.",
      },
    ],
    gate: [
      {
        word: "vervolggesprek",
        focus: "составное слово",
        tip: "фер-ФОЛХ-хə-спрек. vervolg + gesprek — контрольная/повторная встреча.",
      },
      {
        word: "verwijten",
        focus: "ij = «эй»",
        tip: "вер-ВЭЙ-тен. Обвинения/упрёки — множественное число от verwijt.",
      },
    ],
  },
  {
    id: "contract-webwinkel-annuleren",
    domain: "dagelijks",
    level: "B1",
    title: "Отменить заказ в интернет-магазине по праву на отказ",
    context: "Звонок или чат с интернет-магазином — использование законного 14-дневного права на отмену покупки",
    minutes: 7,
    openerContext: "winkel",
    brief: [
      "Сообщите номер заказа и что хотите воспользоваться правом на отказ (herroepingsrecht).",
      "Магазин может уточнить причину — хотя по закону она не требуется.",
      "Обсудят, кто оплачивает обратную пересылку и когда вернут деньги.",
      "В конце дадут инструкцию по возврату и номер для отслеживания возврата.",
    ],
    lines: [
      {
        nl: "Ik wil gebruikmaken van mijn herroepingsrecht.",
        ru: "Я хочу воспользоваться своим правом на отказ.",
      },
      {
        nl: "Ik hoef hiervoor toch geen reden op te geven?",
        ru: "Мне ведь не нужно указывать причину?",
      },
      {
        nl: "Wie draagt de kosten van het retourneren?",
        ru: "Кто несёт расходы на возврат?",
      },
      {
        nl: "Wanneer krijg ik mijn geld terug?",
        ru: "Когда мне вернут деньги?",
      },
    ],
    replyBank: [
      { nl: "Een reden is inderdaad niet verplicht.", ru: "Причина действительно не обязательна.", key: "niet verplicht", register: "formeel" },
      { nl: "De verzendkosten van retour zijn voor uw rekening.", ru: "Расходы на пересылку возврата — за ваш счёт.", key: "verzendkosten", register: "formeel" },
      { nl: "Wij betalen het bedrag terug binnen veertien dagen.", ru: "Мы вернём сумму в течение четырнадцати дней.", key: "veertien dagen", register: "formeel" },
      { nl: "U kunt het formulier hier downloaden.", ru: "Форму можно скачать здесь.", key: "formulier", register: "informeel" },
      { nl: "Stuur ons het trackingnummer als bewijs.", ru: "Пришлите нам номер отслеживания как подтверждение.", key: "trackingnummer", register: "formeel" },
      { nl: "Kunt u dat nog een keer rustig herhalen?", ru: "Повторите это спокойно ещё раз?", key: "rustig herhalen", register: "informeel" },
      { nl: "We can handle the return in English too.", ru: "Можем оформить возврат и на английском.", register: "switch" },
    ],
    repairIds: ["momentje", "cijfers"],
    traps: [
      {
        wrong: "Ik hoef op te geven geen reden hiervoor toch?",
        right: "Ik hoef hiervoor toch geen reden op te geven?",
        why: "Отрицательное дополнение geen reden встаёт перед отделяемым инфинитивом op te geven, а не после него.",
      },
      {
        wrong: "het recht, de kosten",
        right: "het recht, de kosten",
        why: "het recht, de kosten — заучивать целиком.",
      },
    ],
    gate: [
      {
        word: "herroepingsrecht",
        focus: "составное слово, самое длинное",
        tip: "хер-РУ:-пинхс-рехт. herroeping + recht — право на отказ от покупки.",
      },
      {
        word: "verzendkosten",
        focus: "составное слово",
        tip: "фер-ЗЕНТ-кос-тен. verzend + kosten — расходы на пересылку.",
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
