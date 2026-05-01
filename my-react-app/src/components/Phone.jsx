import './Phone.css';
import { useState, useEffect, useRef } from 'react';

export default function Phone() {
  const [open, setOpen] = useState(false);       // открыто меню приложений
  const [activeApp, setActiveApp] = useState(null); // какое приложение активно
  const ref = useRef(null);

  const toggle = (appName) => {
    setActiveApp(prev => prev === appName ? null : appName);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveApp(null); // закрываем и приложение тоже
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
          {/* Кошелёк */}
          <button className="vallet" onClick={() => toggle('vallet')}>👛</button>
          {activeApp === 'vallet' && <div className="vallet-menu">Баланс: $...</div>}

          {/* Почта */}
          <button className="mail" onClick={() => toggle('mail')}>📧</button>
          {activeApp === 'mail' && <div className="mail-menu">Почта пуста</div>}

          {/* Википедия */}
          <button className="wiki" onClick={() => toggle('wiki')}>📚</button>
          {activeApp === 'wiki' && <div className="wiki-menu">Википедия открыта</div>}
        </div>
      )}
    </div>
  );
}