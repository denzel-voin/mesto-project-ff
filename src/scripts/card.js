import {closePopUp, openCard} from "./modal";

const createCard = (cards, callBackDeleteCard, callBackLikeCard, openCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cards.link;
  cardElement.querySelector('.card__image').alt = `${cards.name}`;
  cardElement.querySelector('.card__title').textContent = cards.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', callBackDeleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', callBackLikeCard);
  cardElement.querySelector('.card__image').addEventListener('click', openCard);
  return cardElement
}

const cardLike = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

const deleteFunc = (event) => {
  const card = event.target.closest('.card');
  card.remove();
}

const renderCards = (cardElement) => {
  const placesList = document.querySelector('.places__list');
  placesList.append(cardElement);
}

function createUserCard(evt) {
  evt.preventDefault();
  const cardName = document.querySelector('.popup__input_type_card-name');
  const cardLink = document.querySelector('.popup__input_type_url');
  const placesList = document.querySelector('.places__list');
  const name = cardName.value;
  const link = cardLink.value;
  const card = { name, link };

  placesList.prepend(createCard(card, deleteFunc, cardLike, openCard));

  closePopUp();
}

export { createCard, cardLike, deleteFunc, renderCards, createUserCard }
