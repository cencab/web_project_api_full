import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          const userData = res.data ? res.data : res;
          if (userData) {
            setLoggedIn(true);
            setUserEmail(userData.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Token inválido o expirado:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data.data ? data.data : data);
        })
        .catch((error) => console.error("Error al cargar perfil:", error));

      api
        .getCardList()
        .then((data) => {
          setCards(data.data ? data.data : data);
        })
        .catch((error) => console.error("Error al cargar tarjetas:", error));
    }
  }, [loggedIn]);

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
    setIsInfoTooltipOpen(false);
  }

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  async function handleCardLike(card) {
    const isLiked =
      card.isLiked !== undefined
        ? card.isLiked
        : card.likes?.some((i) => i._id === currentUser?._id);

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const updatedCard = newCard.data ? newCard.data : newCard;
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? updatedCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addCard(cardData)
      .then((newCard) => {
        const addedCard = newCard.data ? newCard.data : newCard;
        setCards([addedCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error(err);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  };

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header
          email={userEmail}
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlace={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} />}
          />
        </Routes>

        <Footer />

        {isInfoTooltipOpen && (
          <InfoTooltip onClose={handleClosePopup} isSuccess={isSuccess} />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
