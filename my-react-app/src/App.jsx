import Quests from "./components/Quests";
import Money from "./components/Money";
import Level from "./components/Level";
import CodeEditor from "./components/CodeEditor"
import Phone from "./components/Phone";
import Hacker from './components/Hacker';
import { GameProvider } from "./components/GameContext";

function App() {
  return (
    <div>
    <GameProvider>
      <Quests />
      <CodeEditor />
      <Phone />
      <Hacker />
    </GameProvider>
    </div>
  );
}

export default App;