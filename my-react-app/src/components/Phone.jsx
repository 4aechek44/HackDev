import './Phone.css';
import { useState, useEffect, useRef } from 'react';

const APPS = [
  { id: 'mail',     icon: '✉️',  label: 'Mail',    menu: 'Почта пуста' },
  { id: 'vallet',   icon: '💳',  label: 'Vallet',  menu: 'Баланс: $...' },
  { id: 'wiki',     icon: '📖',  label: 'Wiki',      menu: 'Википедия открыта' },
  { id: 'forum',    icon: '💬',  label: 'Forum',     menu: 'Форум открыть' },
  { id: 'store',    icon: '🛒',  label: 'Store',    menu: 'Магазин открыть' },
  { id: 'settings', icon: '🌐',  label: 'Settings',   menu: 'Браузер открыть' },
];

export default function Phone() {
  const [activeApp, setActiveApp] = useState(null);
  const ref = useRef(null);

  const toggle = (id) => setActiveApp(prev => prev === id ? null : id);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActiveApp(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = APPS.find(a => a.id === activeApp);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
     <div className="phone-shell">
      <div className="phone-apps">

        <div className="status-bar">
        <span className="time">10:30</span> {/* ДОБАВИТЬ ПОЗЖЕ ВРЕМЯ НАСТОЯЩЕЕ */}
          <span className="energy">▌▌▌ 🔋</span>
        </div>

        {activeApp ? (
          <div className={`${activeApp}-menu app-screen`}>
            <button className="app-back" onClick={() => setActiveApp(null)}>← назад</button>
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