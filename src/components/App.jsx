import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api.js";
import EditProfilePopup from "../components/EditProfilePopup.jsx";
import EditAvatarPopup from "../components/EditAvatarPopup.jsx";
import AddPlacePopup from "../components/AddPlacePopup.jsx";

function App() {
  // переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false,
  });
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    api
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name, isOpen: true });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete() {
    api
      .deleteCard(selectedCardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== selectedCardDelete._id);
        setCards(newCards);
        setSelectedCardDelete();
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: "", name: "", isOpen: false });
  }

  //изменяют значение
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  // работает
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then(() => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateAvatar(avatar) {
    api
      .newAvatar(avatar)
      .then(() => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .apiAddNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <div id="deletecard-popup" className="popup ">
          <div className="popup__container">
            <form
              id="deletecard-form"
              className="popup__form"
              name="deleteCard"
              noValidate
            >
              <button
                id="close-delete-form"
                className="popup__close-button"
                type="button"
              ></button>
              <h2 className="popup__title">Вы уверены?</h2>
              <button type="submit" className="popup__submit-button">
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
