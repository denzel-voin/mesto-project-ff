import {deleteCardRequest, likeRequest} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const createCard = (cards, callBackDeleteCard, callBackLikeCard, openCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.id = cards.id;
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeNumber = cardElement.querySelector('.card__like-number');
  cardLikeNumber.textContent = cards.likes.length;
  cardImage.src = cards.link;
  cardImage.alt = `${cards.name}`;
  cardElement.querySelector('.card__title').textContent = cards.name;
  const profile = document.querySelector('.profile__title');
  cards.likes.forEach(el => {
    if (el.name === profile.textContent) {
      const likeButton = cardElement.querySelector('.card__like-button');
      likeButton.classList.add('card__like-button_is-active');
    }
  })
  if (profile.textContent === cards.owner) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');
    cardElement.appendChild(deleteButton);
    cardElement.querySelector('.card__delete-button').addEventListener('click', callBackDeleteCard);
  }
  cardElement.querySelector('.card__like-button').addEventListener('click', callBackLikeCard);
  cardImage.addEventListener('click', openCard);
  return cardElement
}

const likeCard = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
  const activeLike = event.target.closest('.card__like-button_is-active');
  const card = event.target.closest('.card');
  const likeNumber = card.querySelector('.card__like-number');
  likeRequest(activeLike, card, likeNumber, likeButton);
}

const deleteCard = (event) => {
  const card = event.target.closest('.card');
  deleteCardRequest(card);
  card.remove();
}

export { createCard, likeCard, deleteCard }
