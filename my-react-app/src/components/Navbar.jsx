import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h4 className="navbar-title">HackDev</h4>
      <button>Quests</button>
      <button>Shop</button>
      <button>Settings</button>
    </nav>
  );
}

export default Navbar;