import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ onClose, isSuccess }) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} />
        <div className="popup__info">
          <div className="popup__status-icon">
            <img
              src={isSuccess ? successIcon : errorIcon}
              alt={isSuccess ? "Éxito" : "Error"}
            />
          </div>
          <h2 className="popup__title popup__title_type_tooltip">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
