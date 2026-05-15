import { useState, useRef, useContext } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';
import GameContext from './GameContext';
import { quests } from '../data/quests';

const LOG_META = {
  log:    { prefix: '',             cls: 'out-log' },
  warn:   { prefix: '⚠ ',          cls: 'out-warn' },
  error:  { prefix: '✖ ',          cls: 'out-error' },
  info:   { prefix: 'ℹ ',          cls: 'out-info' },
  alert:  { prefix: '🔔 alert: ',  cls: 'out-alert' },
  repl:   { prefix: '← ',          cls: 'out-repl' },
};

function buildIframe(code) {
  return `<html><body><script>
    const __logs__ = [];

    function capture(type, args) {
      __logs__.push({
        type,
        text: args.map(a => {
          if (a === null)      return 'null';
          if (a === undefined) return 'undefined';
          if (typeof a === 'object') {
            try { return JSON.stringify(a, null, 2); } catch { return String(a); }
          }
          return String(a);
        }).join(' ')
      });
    }

    console.log   = (...a) => capture('log',   a);
    console.warn  = (...a) => capture('warn',  a);
    console.error = (...a) => capture('error', a);
    console.info  = (...a) => capture('info',  a);
    console.table = (d)    => capture('log',   [typeof d === 'object' ? JSON.stringify(d, null, 2) : String(d)]);
    console.dir   = (d)    => capture('log',   [typeof d === 'object' ? JSON.stringify(d, null, 2) : String(d)]);
    window.alert   = (msg) => capture('alert', [String(msg)]);
    window.confirm = (msg) => { capture('alert', ['confirm: ' + msg]); return true; };
    window.prompt  = (msg) => { capture('alert', ['prompt: '  + msg]); return ''; };

    const __before__ = new Set(Object.keys(window));
    const __out__ = { logs: __logs__, scope: {}, repl: undefined, error: null };

    try {
      const __repl__ = eval(${JSON.stringify(code)});

      // var-переменные — попадают в window
      for (const key of Object.keys(window)) {
        if (!__before__.has(key)) {
          try { __out__.scope[key] = window[key]; } catch {}
        }
      }

      // REPL: последнее выражение
      if (__repl__ !== undefined) {
        __out__.repl = __repl__;
        capture('repl', [__repl__]);
      }
    } catch (e) {
      __out__.error = e.message;
      capture('error', [e.message]);
    }

    // Одно финальное сообщение со всем
    window.parent.postMessage({ type: 'done', data: __out__ }, '*');
  <\/script></body></html>`;
}

function CodeEditor({ onRun }) {
  const [code, setCode]           = useState('// your code here\n');
  const [logs, setLogs]           = useState([]);
  const [status, setStatus]       = useState(null); // 'success' | 'fail' | null
  const [lastReward, setLastReward] = useState(null);
  const iframeRef = useRef(null);

  const { activeQuest, setActiveQuest, setXp, setMoney } = useContext(GameContext);

  const runCode = () => {
    setLogs([]);
    setStatus(null);
    setLastReward(null);

    function handler(e) {
      if (e.data?.type !== 'done') return;
      window.removeEventListener('message', handler);

      const { logs: newLogs, scope, repl, error } = e.data.data;
      setLogs(newLogs);
      if (onRun) onRun(e.data.data);

      const quest = quests[activeQuest];

      // scope содержит var-переменные + __repl__ для let/const
      const fullScope = { ...scope, __repl__: repl };

      // logLines — только console.log строки (для простых expected-квестов)
      const logLines = newLogs.filter(l => l.type === 'log').map(l => l.text);
      const logResult = logLines.join('\n');

      const passed = quest.validate
        ? quest.validate(logResult, logLines, fullScope)
        : logResult.trim() === (quest.expected ?? '').trim();

      if (passed) {
        setStatus('success');
        setLastReward(quest.reward);
        setXp(prev   => prev + quest.reward.xp);
        setMoney(prev => prev + quest.reward.money);

        if (activeQuest + 1 < quests.length) {
          setTimeout(() => {
            setActiveQuest(activeQuest + 1);
            setStatus(null);
            setLogs([]);
            setLastReward(null);
            setCode('// your code here\n');
          }, 1800);
        }
      } else if (!error) {
        setStatus('fail');
      }
    }

    window.addEventListener('message', handler);
    iframeRef.current.srcdoc = buildIframe(code);
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <h5>SV Code</h5>
        <button className="compile-button" onClick={runCode}>▶ COMPILE</button>
      </div>

      <Editor
        height="330px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val ?? '')}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontFamily: "'Courier New', monospace",
        }}
      />

      {logs.length > 0 && (
        <div className="code-output">
          <span className="output-label">OUTPUT &gt;</span>
          <div className="output-lines">
            {logs.map((entry, i) => {
              const meta = LOG_META[entry.type] ?? LOG_META.log;
              return (
                <pre key={i} className={`output-line ${meta.cls}`}>
                  {meta.prefix}{entry.text || '(empty)'}
                </pre>
              );
            })}
          </div>

          {status === 'success' && lastReward && (
            <div className="output-success">
              ✅ Задание выполнено!&nbsp;
              <span>+{lastReward.xp} XP</span>
              <span> +${lastReward.money}</span>
            </div>
          )}

          {status === 'fail' && (
            <div className="output-fail">❌ Неверно. Попробуй ещё раз.</div>
          )}
        </div>
      )}

      <iframe ref={iframeRef} sandbox="allow-scripts" style={{ display: 'none' }} />
    </div>
  );
}

export default CodeEditor;