import { useContext, useState } from 'react';
import './Browser.css';
import GameContext from '../../game/GameContext';

export default function Browser() {
  const {
    browserUrl,
    browserStatus,
    scene,
    openBrowserUrl,
    suggestedUrl,
  } = useContext(GameContext);
  const [address, setAddress] = useState(browserUrl);

  const submitAddress = (event) => {
    event.preventDefault();
    openBrowserUrl(address);
  };

  const openSuggestedUrl = () => {
    if (!suggestedUrl) return;
    setAddress(suggestedUrl);
    openBrowserUrl(suggestedUrl);
  };

  return (
    <div className="browser-content">
      <div className="browser-tabs">
        <div className="browser-tab active">New Tab</div>
      </div>

      <form className="browser-addressbar" onSubmit={submitAddress}>
        <input
          className="browser-address-input"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Search or enter address"
        />
        <button className="browser-go-button" type="submit">Go</button>
      </form>

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
          <h1 className="browser-title">Gaagle</h1>
          <form className="browser-searchbar" onSubmit={submitAddress}>
            <input
              className="browser-searchbar-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Search or enter address"
            />
            <button className="browser-searchbar-button" type="submit">Search</button>
          </form>
          {suggestedUrl && (
            <button className="browser-suggested-url" type="button" onClick={openSuggestedUrl}>
              {suggestedUrl}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
