import './Navbar.css';
import { useState } from 'react';
import { useContext } from 'react';
import GameContext from './GameContext';


function Navbar() {

  const [activeButton, setActiveButton] = useState('Quests');
  const { level, progress, xp, getXpForLevel } = useContext(GameContext)
  const currentLevelXp = getXpForLevel(level)
  const nextLevelXp = getXpForLevel(level + 1) - currentLevelXp

  return (
    <nav className="navbar">
      <h4 className="navbar-title">
        <img className="nav-logo" src="/favicon.svg" alt="Logo" />
        Hack<span className='navbar-dev'>Dev</span>
      </h4>

      <div className='navbar-btn'>
        <button className={activeButton === 'Quests' ? 'active' : ''}
          onClick={() => setActiveButton('Quests')}>
          Quests
        </button>

        <button className={activeButton === 'Shop' ? 'active' : ''}
          onClick={() => setActiveButton('Shop')}>
          Shop
        </button>

        <button className={activeButton === 'Settings' ? 'active' : ''}
          onClick={() => setActiveButton('Settings')}>
          Settings
        </button>
      </div>

      <div className='navbar-info'>
        <img className="nav-star" src="/star.png" alt="star" />
        <span className='nav-xp'>Level: </span>
        
      <span>{level}</span>
        <div className="xp-bar">
        
        </div>
      <span>|{xp - currentLevelXp} / {nextLevelXp} XP</span>  
        
        <button className="avatar-btn">
          <img className="nav-avatar" src="/avatar.png" alt="avatar" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;