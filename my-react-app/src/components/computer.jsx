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
    <div className='computer-container'>

    </div>
  );
}

