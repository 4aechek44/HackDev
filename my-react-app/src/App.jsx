import Navbar from "./components/navbar";
import Quests from "./components/quests";
import Money from "./components/money";
import CodeEditor from "./components/code_editor";
import Hacker from './components/hacker';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Quests />
      <Money />
      <CodeEditor />
      <Hacker />
    </div>
  );
}

export default App;