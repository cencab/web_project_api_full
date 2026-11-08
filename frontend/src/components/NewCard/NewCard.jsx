import { useState } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddPlace({ name, link });
    }
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="2"
          name="card-name"
          placeholder="Título"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span
          className={`popup__error ${nameError ? "popup__error_visible" : ""}`}
          id="card-name-error"
        >
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span
          className={`popup__error ${linkError ? "popup__error_visible" : ""}`}
          id="card-link-error"
        >
          {linkError}
        </span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
