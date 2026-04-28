import './Quests.css';
import { useContext } from 'react';
import GameContext from './GameContext';
import { quests } from '../data/quests';

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