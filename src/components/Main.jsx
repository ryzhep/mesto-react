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
    <main className="content">
      <section className="profile">
        <a
          style={{ backgroundImage: `url(${userAvatar})` }}
          alt="Аватар профиля"
          className="profile__avatar"
          onClick={onEditAvatar}
        ></a>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__open-popup"
            type="button"
            onClick={onEditProfile}
          >
            <img
              src={buttonImage}
              alt="изображение карандаша для редактирования"
              className="profile__image-edit"
            />
          </button>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}>
          <img src={plus} alt="плюсик" className="profile__add-icon" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}
export default Main;
