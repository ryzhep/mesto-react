import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";

function App() {
  // переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '', isOpen: false});

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name, isOpen: true });
 }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: '', name: '', isOpen: false });
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

  return (
    <>
      <div class="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          popupId="edit-popup"
          idForm="edit-form"
          title="Редактировать профиль"
          name="formEdit"
          children={
            <>
              <input
                id="name-input"
                type="text"
                class="popup__input"
                name="name"
                placeholder="Имя"
                required
                minlength="2"
                maxlength="40"
              />
              <span class="popup__input-error name-input-error"></span>
              <input
                id="profession-input"
                type="text"
                class="popup__input"
                name="description"
                placeholder="Вид деятельности"
                required
                minlength="2"
                maxlength="200"
              />
              <span class="popup__input-error profession-input-error"></span>
              <button type="submit" class="popup__button">
                Сохранить
              </button>
            </>
          }
        />
        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          popupId="newcard-popup"
          idForm="newcard-form"
          title="Новое место"
          name="formEdit"
          children={
            <>
              <input
                id="name-card"
                type="text"
                class="popup__input"
                name="name"
                placeholder="Название"
                required
                minlength="2"
                maxlength="30"
              />
              <span class="popup__input-error name-card-error"></span>
              <input
                id="image-link"
                type="url"
                class="popup__input"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span class="popup__input-error image-link-error"></span>
              <button type="submit" class="popup__button">
                Создать
              </button>
            </>
          }
        />

        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          popupId="avatar-popup"
          idForm="avatar-form"
          title="Обновить аватар"
          name="avatar"
          children={
            <>
              <input
                id="avatar-link"
                type="url"
                class="popup__input"
                name="link-avatar"
                placeholder="URL"
                required
              />
              <span class="popup__input-error avatar-link-error"></span>
              <button type="submit" class="popup__button">
                Сохранить
              </button>
            </>
          }
        />
       
       <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 

        <div id="deletecard-popup" class="popup ">
          <div class="popup__container">
            <form
              id="deletecard-form"
              class="popup__form"
              name="deleteCard"
              novalidate
            >
              <button
                id="close-delete-form"
                class="popup__close-button"
                type="button"
              ></button>
              <h2 class="popup__title">Вы уверены?</h2>
              <button type="submit" class="popup__submit-button">
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
