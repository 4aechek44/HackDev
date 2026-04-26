import './code_editor.css';

function CodeEditor() {
  return (
    <div className="code-editor-container">
      <h5>SV Code</h5>
      <textarea placeholder="Write your code here..." className="code-input"></textarea>
      <button className="compile-button">Compile</button>
    </div>
  );
}

export default CodeEditor;