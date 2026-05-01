import './Phone.css';
import { useState, useEffect, useRef } from 'react';

export default function Phone() {
  const [open, setOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const ref = useRef(null);

  const toggle = (appName) => {
    setActiveApp(prev => prev === appName ? null : appName);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveApp(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(prev => !prev)}>⠿</button>

      {open && (
        <div className="phone-apps">
          <div className='status-bar'>
            <span className='level'>lvl: 0</span>
            <span className='time'>10:30</span>
            <span className='energy'>🔋</span>
          </div>
        
        <div className="apps-grid">
          {/* Кошелёк */}
          {(!activeApp || activeApp === 'vallet') && (
            <button className="vallet" onClick={() => toggle('vallet')}>👛</button>
          )}
          {activeApp === 'vallet' && <div className="vallet-menu">Баланс: $...</div>}

          {/* Почта */}
          {(!activeApp || activeApp === 'mail') && (
            <button className="mail" onClick={() => toggle('mail')}>📧</button>
          )}
          {activeApp === 'mail' && <div className="mail-menu">Почта пуста</div>}

          {/* Википедия */}
          {(!activeApp || activeApp === 'wiki') && (
            <button className="wiki" onClick={() => toggle('wiki')}>📚</button>
          )}
          {activeApp === 'wiki' && <div className="wiki-menu">Википедия открыта</div>}

          {/* Магазин */}
          {(!activeApp || activeApp === 'store') && (
            <button className="store" onClick={() => toggle('store')}>🛍️</button>
          )}
          {activeApp === 'store' && <div className="store-menu">Магазин открыть</div>}

          {/* Настройки */}
          {(!activeApp || activeApp === 'settings') && (
            <button className="settings" onClick={() => toggle('settings')}>⚙️</button>
          )}
          {activeApp === 'settings' && <div className="settings-menu">Настройки</div>}

          {/* Форум */}
          {(!activeApp || activeApp === 'forum') && (
            <button className="forum" onClick={() => toggle('forum')}>💬</button>
          )}
          {activeApp === 'forum' && <div className="forum-menu">Форум открыть</div>}
        </div>
      </div>
      )}
    </div>
  );
}