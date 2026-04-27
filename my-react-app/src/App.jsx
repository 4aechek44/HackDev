import Quests from "./components/Quests";
import Money from "./components/Money";
import Level from "./components/Level";
import CodeEditor from "./components/CodeEditor"
import Hacker from './components/Hacker';
import { GameProvider } from "./components/GameContext";

function App() {
  return (
    <div>
    <GameProvider>
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