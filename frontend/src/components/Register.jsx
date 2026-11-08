import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(email, password);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="auth__error">{emailError}</span>
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="auth__error">{passwordError}</span>
        <button className="auth__submit" type="submit" disabled={!isValid}>
          Regístrate
        </button>
      </form>
      <div className="auth__signup">
        <p>
          ¿Ya eres miembro?{" "}
          <Link to="/signin" className="auth__link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
