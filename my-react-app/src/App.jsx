import './App.css';
import Navbar from "./components/Navbar";
import Quests from "./components/Quests";
import Computer from "./components/computer";
import Phone from "./components/Phone";
import Hacker from './components/Hacker';
import { GameProvider } from "./components/GameContext";


function App() {
  return (
    <div>
    <GameProvider>
      <Navbar />
      <Quests />
      <Computer />
      <Phone />
      <Hacker />
    </GameProvider>
    </div>
  );
}

export default App;