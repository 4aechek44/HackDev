import { createContext, useState } from "react";

const GameContext = createContext()

export function GameProvider({ children }) {
  const [activeQuest, setActiveQuest] = useState(0)
  const [xp, setXp] = useState(0)
  const [money, setMoney] = useState(0)

  return (
    <GameContext.Provider value={{ activeQuest, setActiveQuest, xp, setXp, money, setMoney }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext