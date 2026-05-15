import './ComputerApp.css';
import { useState, useRef } from 'react';


export default function Computer() {

  const APPS = [
  { id: 'terminal', icon: '💻', label: 'Terminal', 
    content: () => (
      <div className="terminal-content">
        <p>Welcome to the aaa</p>
        <p>Type 'help' for a list of commands.</p>
      </div> )},
  
  { id: 'editor', icon: '📝', label: 'Editor',
    content: () => (
      <div className="editor-content">
        <p>Editor coming soon...</p>
      </div> )},

  { id: 'browser', icon: '🌐', label: 'Browser',
    content: () => (
      <div className="browser-content">
        <p>Browser coming soon...</p>
      </div> )}
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
          
           {(() => APPS.find(app => app.id === activeApp)?.content?.())()}

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



