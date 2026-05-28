import { createContext, useState } from "react";
import { createSceneState, findSceneByUrl, findSceneForQuest } from "./sceneEngine.js";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [activeQuest, setActiveQuest] = useState(0);
  const [xp, setXp] = useState(0);
  const [money, setMoney] = useState(0);
  const [activeOsApp, setActiveOsApp] = useState(null);
  const [browserUrl, setBrowserUrl] = useState("");
  const [browserStatus, setBrowserStatus] = useState("start");
  const [currentSceneId, setCurrentSceneId] = useState(null);
  const [scene, setScene] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [lastCommand, setLastCommand] = useState(null);

  const addMoney = (amount) => setMoney((prev) => prev + amount);
  const spendMoney = (amount) => setMoney((prev) => Math.max(0, prev - amount));

  const getXpForLevel = (level) => (10 * level * (level - 1)) / 2;

  const getLevel = (totalXp) => {
    let level = 1;
    let remaining = totalXp;

    while (remaining >= 10 * level) {
      remaining -= 10 * level;
      level++;
    }

    return level;
  };

  const getProgress = (totalXp) => {
    const level = getLevel(totalXp);
    const current = getXpForLevel(level);
    const next = getXpForLevel(level + 1);

    return (totalXp - current) / (next - current);
  };

  const dispatchCommand = (command) => {
    setLastCommand(command);
    setCommandHistory((prev) => [...prev, command]);
  };

  const updateScene = (patch) => {
    setScene((prev) => ({ ...(prev ?? {}), ...patch }));
  };

  const openBrowserUrl = (url) => {
    const nextUrl = url.trim();
    const nextScene = findSceneByUrl(nextUrl);

    setBrowserUrl(nextUrl);

    if (!nextUrl) {
      setBrowserStatus("start");
      setCurrentSceneId(null);
      setScene(null);
      return null;
    }

    if (!nextScene) {
      setBrowserStatus("not-found");
      setCurrentSceneId(null);
      setScene(null);
      return null;
    }

    setBrowserStatus("scene");
    setCurrentSceneId(nextScene.id);
    setScene(createSceneState(nextScene));
    return nextScene;
  };

  const level = getLevel(xp);
  const progress = getProgress(xp);
  const suggestedScene = findSceneForQuest(activeQuest) ?? null;
  const suggestedUrl = suggestedScene?.url ?? "";

  return (
    <GameContext.Provider
      value={{
        activeQuest,
        setActiveQuest,
        xp,
        setXp,
        money,
        setMoney,
        addMoney,
        spendMoney,
        level,
        progress,
        getXpForLevel,
        activeOsApp,
        setActiveOsApp,
        browserUrl,
        setBrowserUrl,
        browserStatus,
        setBrowserStatus,
        currentSceneId,
        setCurrentSceneId,
        scene,
        setScene,
        updateScene,
        openBrowserUrl,
        suggestedScene,
        suggestedUrl,
        commandHistory,
        lastCommand,
        dispatchCommand,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
