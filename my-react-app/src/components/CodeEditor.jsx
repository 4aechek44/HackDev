import { useState, useRef } from 'react';
import { useContext } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';
import GameContext from './GameContext';
import { quests } from '../data/quests';

function CodeEditor({ onRun }) {
  const [code, setCode] = useState('// your code here\n');
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState(null); // 'success' | 'fail' | null
  const [lastReward, setLastReward] = useState(null);
  const iframeRef = useRef(null);

  const { activeQuest, setActiveQuest, setXp, setMoney } = useContext(GameContext);

  const runCode = () => {
    setOutput(null);
    setStatus(null);
    setLastReward(null);

    const html = `<html><body><script>
      const logs = [];
      console.log = (...args) => {
        logs.push(args.map(a =>
          typeof a === 'object' ? JSON.stringify(a) : String(a)
        ).join(' '));
        window.parent.postMessage({ type: 'log', data: logs }, '*');
      };
      try {
        ${code}
      } catch(e) {
        window.parent.postMessage({ type: 'error', data: e.message }, '*');
      }
    </script></body></html>`;

    window.addEventListener('message', function handler(e) {
      if (e.data?.type === 'log') {
        const lines = e.data.data;           // массив всех console.log
        const result = lines.join('\n');      // полный output как строка
        setOutput(result);

        const quest = quests[activeQuest];

        const passed = quest.validate
          ? quest.validate(result, lines)
          : result.trim() === quest.expected;

        if (passed) {
          setStatus('success');
          setLastReward(quest.reward);
          setXp(prev => prev + quest.reward.xp);
          setMoney(prev => prev + quest.reward.money);

          if (activeQuest + 1 < quests.length) {
            setTimeout(() => {
              setActiveQuest(activeQuest + 1);
              setStatus(null);
              setOutput(null);
              setLastReward(null);
              setCode('// your code here\n');
            }, 1800);
          }
        } else {
          setStatus('fail');
        }
      }

      if (e.data?.type === 'error') {
        setOutput('❌ ' + e.data.data);
        setStatus('fail');
      }

      if (onRun) onRun(e.data);
      window.removeEventListener('message', handler);
    });

    iframeRef.current.srcdoc = html;
  };

  const quest = quests[activeQuest];

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <h5>SV Code</h5>
        <button className="compile-button" onClick={runCode}>▶ COMPILE</button>
      </div>

      <Editor
        height="337px"
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

      {output !== null && (
        <div className="code-output">
          <span className="output-label">OUTPUT &gt;</span>
          <pre className="code-input">{output || '(empty)'}</pre>

          {status === 'success' && lastReward && (
            <div className="output-success">
              ✅ Задание выполнено! &nbsp;
              <span>+{lastReward.xp} XP</span>
              <span> +${lastReward.money}</span>
            </div>
          )}

          {status === 'fail' && (
            <div className="output-fail">
              ❌ Неверно. Ожидалось: <code>{quest.expected}</code>
            </div>
          )}
        </div>
      )}

      <iframe ref={iframeRef} sandbox="allow-scripts" style={{ display: 'none' }} />
    </div>
  );
}

export default CodeEditor;