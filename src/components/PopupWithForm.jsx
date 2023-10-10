function PopupWithForm({ popupId, idForm, title, name, children, isOpen }) {
  return (
    <div id={popupId} className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form id={idForm} className="popup__form" name={name} novalidate>
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
        <button
          id="close-delete-form"
          class="popup__close-button"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
