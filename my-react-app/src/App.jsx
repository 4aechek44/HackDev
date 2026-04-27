import Navbar from "./components/Navbar";
import Quests from "./components/Quests";
import Money from "./components/Money";
import Level from "./components/Level";
import CodeEditor from "./components/CodeEditor"
import Hacker from './components/Hacker';
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