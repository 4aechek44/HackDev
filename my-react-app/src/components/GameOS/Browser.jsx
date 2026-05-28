import { useContext } from 'react';
import './Browser.css';
import GameContext from '../../game/GameContext';

export default function Browser() {
  const { scene } = useContext(GameContext);
  const page = scene?.browserPage || 'home';
   

  return (
    <div className="browser-content">
      
      <div className="browser-tabs">
        <div className="browser-tab active">New Tab</div>
      </div>

      <div className="browser-addressbar">
        
      </div> 

    <h1 className="browser-title">Gaagle</h1>
      
      <div className="browser-searchbar">
        <input className='browser-searchbar-input' type="text" />
        <button className='browser-searchbar-button'>🔍</button>  
      </div>
    
    </div>
  );
}
