import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/">Início</Link>
        <Link to="/cadastrar">Cadastro</Link>
      </div>
    </nav>
  );
}
