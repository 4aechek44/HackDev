import Navbar from "./components/navbar";
import Quests from "./components/quests";
import Money from "./components/money";
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Quests />
      <Money />
    </div>
  );
}

export default App;