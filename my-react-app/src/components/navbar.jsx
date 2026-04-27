import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <a href="/">Quests </a>
        <a href="/about">Shop </a>
        <a href="/contact">Settings </a>
      </div>
    </nav>
  );
}

export default Navbar;