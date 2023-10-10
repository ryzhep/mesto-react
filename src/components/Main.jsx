import buttonImage from "../images/button-1.svg";
import plus from "../images/button-2.svg";
import api from "../utils/Api.js";
import React from "react";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .getAllCards()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main class="content">
      <section class="profile">
        <a
          style={{ backgroundImage: `url(${userAvatar})` }}
          alt="Аватар профиля"
          class="profile__avatar"
          onClick={onEditAvatar}
        ></a>
        <div class="profile__info">
          <h1 class="profile__name">{userName}</h1>
          <button
            class="profile__open-popup"
            type="button"
            onClick={onEditProfile}
          >
            <img
              src={buttonImage}
              alt="изображение карандаша для редактирования"
              class="profile__image-edit"
            />
          </button>
          <p class="profile__profession">{userDescription}</p>
        </div>
        <button class="profile__add" type="button" onClick={onAddPlace}>
          <img src={plus} alt="плюсик" class="profile__add-icon" />
        </button>
      </section>
      <section class="elements">
      {cards.map(card => (
          <Card
            card={card}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
