import { useContext } from 'react';
import './Browser.css';
import GameContext from '../../game/GameContext';

export default function Browser() {
  const { scene } = useContext(GameContext);

  return (
    <div className="browser-content">
      <div className="browser-toolbar">
        <span className="browser-url">{scene.url}</span>
      </div>
      <div className="browser-scene">
        <h3>{scene.title}</h3>
        <p>{scene.status}</p>
      </div>
    </div>
  );
}
