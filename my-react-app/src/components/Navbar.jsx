import './Navbar.css';
import { useState } from 'react';

function Navbar() {

  const [activeButton, setActiveButton] = useState('Quests');

  return (
    <nav className="navbar">
      <h4 className="navbar-title">
        <img className="nav-logo" src="public/favicon.svg" alt="Logo" />
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
    </nav>
  );
}

export default Navbar;