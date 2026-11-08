import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ email, onSignOut, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo de Alrededor de los EE.UU."
        className="header__logo"
      />

      <div className="header__auth">
        {loggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <button onClick={onSignOut} className="header__logout">
              Cerrar sesión
            </button>
          </>
        ) : location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        ) : (
          <Link to="/signin" className="header__link">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
