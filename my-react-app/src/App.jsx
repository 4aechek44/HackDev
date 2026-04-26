import Navbar from "./components/navbar";
import Quests from "./components/quests";
import Money from "./components/money";
import Level from "./components/level";
import CodeEditor from "./components/code_editor";
import Hacker from './components/hacker';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Quests />
      <Money />
      <Level />
      <CodeEditor />
      <Hacker />
    </div>
  );
}

export default App;