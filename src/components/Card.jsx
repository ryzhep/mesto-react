import React from "react";

function Card({ card, onCardClick}) {
  function handleCardClick() {
    onCardClick(card);
  }
    
  return (

    <article className="element">
      <button className="element__delete" type="button"></button>
      <img
        className="element__image"
        onClick={handleCardClick}
        src={card.link}
        title={card.name}
        alt={card.name}
  
      />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-elements">
          <button className="element__like" type="button"></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
