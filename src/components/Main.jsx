import buttonImage from "../images/button-1.svg";
import plus from "../images/button-2.svg";
import api from "../utils/Api.js";
import React from "react";

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  //const [cards, setCards] = useState([]);

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
{/* 
        {cards.map((card) => (
        <template id="template-element">
    <article class="element">
      <button class="element__delete" type="button"></button>
      <img class="element__image" style={{ backgroundImage: `url(${card})` }}/>
      <div class="element__description">
        <h2 class="element__name"></h2>
        <div class="element__like-elements">
          <button class="element__like" type="button"></button>
          <p class="element__likes-counter">0</p>
        </div>
      </div>s
    </article>
  </template>
      ))} */}
      

      </section>
    </main>
  );
}
export default Main;
