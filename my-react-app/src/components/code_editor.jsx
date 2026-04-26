import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './code_editor.css';

function CodeEditor({ onRun }) {
  const [code, setCode] = useState('// your code here\n');
  const [output, setOutput] = useState(null);
  const iframeRef = useRef(null);

  const runCode = () => {
    setOutput('');

    const html = `<html><body><script>
      const logs = [];
      console.log = (...args) => {
        logs.push(args.join(' '));
        window.parent.postMessage({ type: 'log', data: logs }, '*');
      };
      try {
        ${code}
      } catch(e) {
        window.parent.postMessage({ type: 'error', data: e.message }, '*');
      }
    </script></body></html>`;

    window.addEventListener('message', function handler(e) {
      if (e.data?.type === 'log') setOutput(e.data.data.join('\n'));
      if (e.data?.type === 'error') setOutput('❌ ' + e.data.data);
      if (onRun) onRun(e.data);
      window.removeEventListener('message', handler);
    });

    iframeRef.current.srcdoc = html;
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <h5>SV Code</h5>
        <button className="compile-button" onClick={runCode}>▶ Compile</button>
      </div>

      <Editor
        height="300px"
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
        </div>
      )}

      <iframe ref={iframeRef} sandbox="allow-scripts" style={{ display: 'none' }} />
    </div>
  );
}

export default CodeEditor;