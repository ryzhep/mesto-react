
function ImagePopup() {
    return (
        <div id="image-popup" class="popup">
        <div class="popup__container popup__container_image">
          <img class="popup__image" id="pupup__image" />
          <h2 class="popup__title-image" id="popup-name"></h2>
          <button
            id="close-image-form"
            class="popup__close-button"
            type="button"
          ></button>
        </div>
      </div>
    );
  }
  export default ImagePopup;