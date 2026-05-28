import { useContext, useState } from 'react';
import './Browser.css';
import GameContext from '../../game/GameContext';

export default function Browser() {
  const {
    browserUrl,
    browserStatus,
    scene,
    openBrowserUrl,
  } = useContext(GameContext);
  const [address, setAddress] = useState(browserUrl);

  const submitAddress = (event) => {
    event.preventDefault();
    openBrowserUrl(address);
  };

  return (
    <div className="browser-content">
      <div className="browser-tabs">
        <div className="browser-tab active">
          <span className="browser-tab-icon">G</span>
          <span>New Tab</span>
        </div>
        <button className="browser-add-tab">+</button>
      </div>

      <div className="browser-toolbar">
        <form className="browser-addressbar" onSubmit={submitAddress}>
          <span className="browser-address-logo">G</span>
          <input
            className="browser-address-input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="https://main.com"
          />
        </form>
      </div>

      {browserStatus === 'scene' && scene ? (
        <div className="browser-scene">
          <h1>{scene.title}</h1>
          <p>{scene.description}</p>
          <span className="browser-scene-status">Status: {scene.status}</span>
        </div>
      ) : browserStatus === 'not-found' ? (
        <div className="browser-not-found">
          <h1>Site not found</h1>
          <p>No scene is registered for {browserUrl}.</p>
        </div>
      ) : (
        <div className="browser-start">
          <h1 className="browser-title">
            <span className="browser-title-blue">G</span>
            <span className="browser-title-red">a</span>
            <span className="browser-title-yellow">a</span>
            <span className="browser-title-blue">g</span>
            <span className="browser-title-green">l</span>
            <span className="browser-title-red">e</span>
          </h1>

          <form className="browser-searchbar" onSubmit={submitAddress}>
            <span className="browser-search-icon">⌕</span>
            <input
              className="browser-searchbar-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="type a URL"
            />
            <button className="browser-searchbar-button" type="submit">Go</button>
          </form>
        </div>
      )}
    </div>
  );
}
