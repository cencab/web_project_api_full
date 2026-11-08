import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onCardClick, onCardDelete, onCardLike } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes?.some((id) => id === currentUser?._id);

  const { name, link, owner, likes } = card;

  const ownerId =
    typeof owner === "object" && owner !== null ? owner._id : owner;

  const isOwn = card.owner === currentUser?._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_hidden"
  }`;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const imagePopup = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  const handleLikeClick = () => {
    onCardLike({ ...card, isLiked });
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(imagePopup)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            aria-label="Dar me gusta"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
        </div>
      </div>
    </li>
  );
}
