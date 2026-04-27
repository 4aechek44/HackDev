import './Quests.css';

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
  return (
    <div>
    {quests.map(quest => (
      <div key={quest.id} className="quests-container">
        <h2>Quests</h2>
        <h4>{quest.title}</h4>
        <p className='quest'>{quest.quest}</p>
        <p className='reward'>xp: {quest.reward.xp}, $: {quest.reward.money}</p>
      </div>
    ))}
    </div>
  );
}

export default Quests;