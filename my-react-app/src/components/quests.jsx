import './Quests.css';
import { useContext } from 'react';
import GameContext from './GameContext';

// Quests block
const quests = [
  {
  id: 1,
  title: 'test',
  quest: 'input "hack start" in console',
  expected: 'hack start',
  reward: { xp: 10, money: 100},
  unlocked: true
  }
]

function Quests() {
    
  const { activeQuest } = useContext(GameContext)
    const quest = quests[activeQuest]
  
    return (
      <div key={quest.id} className="quests-container">
        <h2>Quests</h2>
        <h4>{quest.title}</h4>
        <p className='quest'>{quest.quest}</p>
        <p className='reward'>xp: {quest.reward.xp}, $: {quest.reward.money}</p>
      </div>
  );
}

export default Quests;