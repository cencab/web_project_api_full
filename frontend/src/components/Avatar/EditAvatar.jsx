import { useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();
  const [avatarError, setAvatarError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleAvatarChange = (e) => {
    setAvatarError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        id="avatar-url"
        name="avatar"
        placeholder="Enlace a la imagen de perfil"
        type="url"
        required
        onChange={handleAvatarChange}
      />
      <span
        className={`popup__error avatar-error ${
          avatarError ? "popup__error_visible" : ""
        }`}
      >
        {avatarError}
      </span>
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
