import './computer.css';
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import GameContext from './GameContext';


export default function Computer() {
  
  const APPS = [
  { id: 'terminal', icon: '💻', label: 'Terminal', menu: 'Терминал открыт' },
  { id: 'editor',   icon: '📝', label: 'Editor',   menu: 'Редактор кода открыт' },
  { id: 'browser',  icon: '🌐', label: 'Browser',  menu: 'Браузер открыт' },
];

  const [activeApp, setActiveApp] = useState(null);
  const ref = useRef(null);

  const toggle = (id) => setActiveApp(prev => prev === id ? null : id);

  

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className='computer-shell'>
        <div className='computer-taskbar'>
            {/* сюда потом всякие иконки */}
        </div>
        {activeApp ? (
          <div className={`${activeApp}-menu computer-app-screen`}>
            <button className="computer-app-back" onClick={() => setActiveApp(null)}>x</button>
          </div>
        ) : (
          <div className="computer-apps">
            {APPS.map(app => (
              <button
                key={app.id}
                className="app-icon"
                onClick={() => toggle(app.id)}
              >
                <div className="app-icon">{app.icon}</div>
                <span className="app-label">{app.label}</span>
              </button>
            ))}
          </div>
        )}  
      </div>
    </div>
  );
}

