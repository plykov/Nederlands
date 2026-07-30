import { useEffect, useState, type ReactNode } from "react";
import Home from "./views/Home";
import Scenarios from "./views/Scenarios";
import Rehearse from "./views/Rehearse";
import Debrief from "./views/Debrief";
import Review from "./views/Review";
import Ledger from "./views/Ledger";
import RepairView from "./views/RepairView";
import Roleplay from "./views/Roleplay";
import Grammar from "./views/Grammar";
import Listening from "./views/Listening";
import Progress from "./views/Progress";
import Course from "./views/Course";
import Feedback from "./views/Feedback";
import Settings from "./views/Settings";
import OpenerDrill from "./views/Opener";
import ArticleTrainer from "./views/ArticleTrainer";
import WordOrder from "./views/WordOrder";
import { dueCards } from "./lib/srs";

/**
 * Простая hash-навигация: #/, #/scenarios, #/rehearse/:id, #/debrief/:id?,
 * #/opener/:id?, #/articles/:id?, #/review, #/ledger, #/repair, #/settings
 */
function parseHash(): string[] {
  const h = window.location.hash.replace(/^#\/?/, "");
  return h ? h.split("/") : [""];
}

/** Разделы без собственной вкладки живут под «Сегодня». */
const HOME_SECTIONS = [
  "",
  "rehearse",
  "debrief",
  "roleplay",
  "opener",
  "articles",
  "wordorder",
  "grammar",
  "repair",
  "listening",
  "course",
];

export default function App() {
  const [route, setRoute] = useState<string[]>(parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const page = route[0] || "";
  const due = dueCards().length;

  let view: ReactNode;
  switch (page) {
    case "scenarios":
      view = <Scenarios />;
      break;
    case "rehearse":
      view = <Rehearse scenarioId={route[1]} />;
      break;
    case "debrief":
      view = <Debrief scenarioId={route[1]} />;
      break;
    case "roleplay":
      view = <Roleplay scenarioId={route[1]} />;
      break;
    case "opener":
      view = <OpenerDrill key={route[1] ?? "all"} scenarioId={route[1]} />;
      break;
    case "articles":
      view = <ArticleTrainer key={route[1] ?? "all"} scenarioId={route[1]} />;
      break;
    case "wordorder":
      view = <WordOrder key={route[1] ?? "menu"} structure={route[1]} />;
      break;
    case "review":
      view = <Review />;
      break;
    case "ledger":
      view = <Ledger />;
      break;
    case "repair":
      view = <RepairView />;
      break;
    case "grammar":
      view = <Grammar />;
      break;
    case "listening":
      view = <Listening />;
      break;
    case "progress":
      view = <Progress />;
      break;
    case "course":
      view = <Course lessonId={route[1]} />;
      break;
    case "feedback":
      view = <Feedback />;
      break;
    case "settings":
      view = <Settings />;
      break;
    default:
      view = <Home />;
  }

  const tab = (href: string, ico: string, label: string, badge?: number) => (
    <a href={href} className={isActive(href, page) ? "active" : ""}>
      <span className="ico">{ico}</span>
      {label}
      {badge ? <span className="badge-count">{badge}</span> : null}
    </a>
  );

  return (
    <>
      <main>{view}</main>
      <nav className="tabs">
        {tab("#/", "🏠", "Сегодня")}
        {tab("#/scenarios", "🎭", "Сценарии")}
        {tab("#/review", "🔁", "Повторение", due)}
        {tab("#/ledger", "📖", "Я умею")}
        {tab("#/settings", "⚙️", "Ещё")}
      </nav>
    </>
  );
}

function isActive(href: string, page: string): boolean {
  const target = href.replace(/^#\//, "");
  if (target === "") return HOME_SECTIONS.includes(page);
  return page === target;
}
