import { createContext, useState } from "react";

const GameContext = createContext()

export function GameProvider({ children }) {

  const [activeQuest, setActiveQuest] = useState(0)
  const [xp, setXp] = useState(0)
  const [money, setMoney] = useState(0)

  // Деньги
  const addMoney = (amount) => setMoney(prev => prev + amount)
  const spendMoney = (amount) => setMoney(prev => Math.max(0, prev - amount))

  // XP нужный для начала уровня N
  const getXpForLevel = (level) => (10 * level * (level - 1)) / 2

  // текущий уровень на основе xp
  const getLevel = (totalXp) => {
    let level = 1
    let remaining = totalXp
    while (remaining >= 10 * level) {
      remaining -= 10 * level
      level++
    }
    return level
  }

  // прогресс 0.0 → 1.0 для бара
  const getProgress = (totalXp) => {
    const level = getLevel(totalXp)
    const current = getXpForLevel(level)
    const next = getXpForLevel(level + 1)
    return (totalXp - current) / (next - current)
  }

  const level = getLevel(xp)
  const progress = getProgress(xp)

  return (
    <GameContext.Provider value={{
      activeQuest, setActiveQuest,
      xp, setXp,
      money, setMoney,
      addMoney,
      spendMoney,
      level,
      progress,
      getXpForLevel,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext