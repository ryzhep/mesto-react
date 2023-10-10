import buttonImage from "../images/button-1.svg";
import plus from "../images/button-2.svg";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace}) {

  return (
    <main class="content">
      <section class="profile">
        <a
          alt="Аватар профиля"
          class="profile__avatar"
          onClick={onEditAvatar}
        ></a>
        <div class="profile__info">
          <h1 class="profile__name">Жак-Ив Кусто</h1>
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
          <p class="profile__profession">Исследователь океана</p>
        </div>
        <button
          class="profile__add"
          type="button"
          onClick={onAddPlace}
        >
          <img src={plus} alt="плюсик" class="profile__add-icon" />
        </button>
      </section>
      <section class="elements"></section>
    </main>
  );
}
export default Main;
