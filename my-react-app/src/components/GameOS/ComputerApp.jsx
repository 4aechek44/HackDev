import { useState, useRef } from 'react';

import CodeEditor from './CodeEditor';
import Browser from './Browser';

import './ComputerApp.css';

export default function Computer() {

  const APPS = [
    {
      id: 'terminal',
      icon: '💻',
      label: 'Terminal',
      content: <CodeEditor />
    },

    {
      id: 'browser',
      icon: '🌐',
      label: 'Browser',
      content: <Browser />
    },

    {
      id: 'editor',
      icon: '📝',
      label: 'Editor',
      content: (
        <div className="editor-content">
          <p>Editor coming soon...</p>
        </div>
      )
    },

  ];

  const [openedApps, setOpenedApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const ref = useRef(null);

  const openApp = (id) => {

    /* если ещё не открыто */

    if (!openedApps.includes(id)) {
      setOpenedApps(prev => [...prev, id]);
    }

    /* показать это окно */

    setActiveApp(id);
  };

  /* ЗАКРЫТЬ */

  const closeApp = (id) => {

    setOpenedApps(prev =>
      prev.filter(appId => appId !== id)
    );

    /* если закрыли активное */

    if (activeApp === id) {
      setActiveApp(null);
    }
  };

  return (

    <div ref={ref} style={{ position: 'relative' }}>
      <div className="computer-shell">
        {/* TASKBAR */}
        <div className="computer-taskbar"></div>
        {/* ИКОНКИ */}
        <div className="computer-apps">
          {APPS.map(app => (
            
            <button
              key={app.id}
              className="app-button"
              onClick={() => openApp(app.id)}
            >
              <div className="app-emoji">
                {app.icon}
              </div>

              <span className="app-label">
                {app.label}
              </span>

            </button>
          ))}
        </div>

        {/* ОКНА */}

        {openedApps.map(appId => {

          const app = APPS.find(a => a.id === appId);

          return (

            <div key={app.id} className={`${app.id}-menu computer-app-screen`}
              style={{
                display:
                  activeApp === app.id
                    ? 'block'
                    : 'none'
              }}
            >
              <button className="computer-app-back" onClick={() => closeApp(app.id)}>x</button>

              {app.content}

            </div>
          );
        })}
      </div>
    </div>
  );
}