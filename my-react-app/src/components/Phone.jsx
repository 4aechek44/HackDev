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
            <span>10:30</span>   {/*Позже добавить время */}
            <span>🔋</span>          
          </div>

          {/* Кошелёк */}
          <button className="vallet" onClick={() => toggle('vallet')}>👛</button>
          {activeApp === 'vallet' && <div className="vallet-menu">Баланс: $...</div>}

          {/* Почта */}
          <button className="mail" onClick={() => toggle('mail')}>📧</button>
          {activeApp === 'mail' && <div className="mail-menu">Почта пуста</div>}

          {/* Википедия */}
          <button className="wiki" onClick={() => toggle('wiki')}>📚</button>
          {activeApp === 'wiki' && <div className="wiki-menu">Википедия открыта</div>}

          {/* Магазин */}
          <button className="store" onClick={() => toggle('store')}>🛍️</button>
          {activeApp === 'store' && <div className="store-menu">Магазин открыть</div>}

          {/* Настройки */}
          <button className="settings" onClick={() => toggle('settings')}>⚙️</button>
          {activeApp === 'settings' && <div className="settings-menu">Настройки</div>}

          {/* Форум */}
          <button className="forum" onClick={() => toggle('forum')}>💬</button>
          {activeApp === 'forum' && <div className="forum-menu">Форум открыть</div>}
        </div>
      )}
    </div>
  );
}