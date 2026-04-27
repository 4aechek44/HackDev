import Navbar from "./components/Navbar";
import Quests from "./components/Quests";
import Money from "./components/Money";
import Level from "./components/Level";
import CodeEditor from "./components/CodeEditor"
import Hacker from './components/Hacker';
import { GameProvider } from "./components/GameContext";
import './App.css';

function App() {
  return (
    <div>
    <GameProvider>
      <Navbar />
      <Quests />
      <Money />
      <Level />
      <CodeEditor />
      <Hacker />
    </GameProvider>
    </div>
  );
}

export default App;