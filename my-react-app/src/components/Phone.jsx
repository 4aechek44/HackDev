import './Phone.css';
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import GameContext from './GameContext';

export default function Phone() {
  
  const { money } = useContext(GameContext);

  const [activeApp, setActiveApp] = useState(null);
  const ref = useRef(null);

  const toggle = (id) => setActiveApp(prev => prev === id ? null : id);

  const APPS = [
  { id: 'mail',     icon: '✉️',  label: 'Mail',     menu: 'Почта пуста' },
  { id: 'vallet',   icon: '💳',  label: 'Vallet',   menu: 'Баланс: $' + money },
  { id: 'wiki',     icon: '📖',  label: 'Wiki',     menu: 'Википедия открыта' },
  { id: 'forum',    icon: '💬',  label: 'Forum',    menu: 'Форум открыть' },
  { id: 'store',    icon: '🛒',  label: 'Store',    menu: 'Магазин открыть' },
  { id: 'settings', icon: '🌐',  label: 'Settings', menu: 'Браузер открыть' },
];

  const active = APPS.find(a => a.id === activeApp);

  const [time, setTime] = useState(
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
);

  useEffect(() => {
  const interval = setInterval(() => {
  setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, 1000);
  return () => clearInterval(interval);
}, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
     <div className="phone-shell">
      <div className="phone-apps">

        <div className="status-bar">
        <span className="time">{time}</span>
          <span className="energy">▌▌▌ 🔋</span>
        </div>

        {activeApp ? (
          <div className={`${activeApp}-menu app-screen`}>
            <button className="app-back" onClick={() => setActiveApp(null)}>← Назад</button>
            {active.menu}
          </div>
        ) : (
          <div className="apps-grid">
            {APPS.map(app => (
              <button
                key={app.id}
                className={app.id}
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
    </div>
  );
}