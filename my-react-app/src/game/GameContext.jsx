import { createContext, useState } from "react";

const initialScene = {
  id: "training-node",
  title: "Training Node",
  url: "scene://training-node",
  status: "idle",
};

const GameContext = createContext();

export function GameProvider({ children }) {
  const [activeQuest, setActiveQuest] = useState(0);
  const [xp, setXp] = useState(0);
  const [money, setMoney] = useState(0);
  const [activeOsApp, setActiveOsApp] = useState(null);
  const [scene, setScene] = useState(initialScene);
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
    setScene((prev) => ({ ...prev, ...patch }));
  };

  const level = getLevel(xp);
  const progress = getProgress(xp);

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
        scene,
        setScene,
        updateScene,
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
