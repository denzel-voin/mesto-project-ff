import {deleteCardRequest, likeRequest} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardParams) => {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.id = cardParams.card.id;
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeNumber = cardElement.querySelector('.card__like-number');
  cardLikeNumber.textContent = cardParams.card.likes.length;
  cardImage.src = cardParams.card.link;
  cardImage.alt = `${cardParams.card.name}`;
  cardElement.querySelector('.card__title').textContent = cardParams.card.name;

  cardParams.card.likes.forEach(el => {
    if (el._id === cardParams.userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  if (cardParams.userId === cardParams.card.ownerId) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');
    cardElement.appendChild(deleteButton);
    deleteButton.addEventListener('click', cardParams.callBackDeleteCard);
  }

  likeButton.addEventListener('click', cardParams.callBackLikeCard);
  cardImage.addEventListener('click', cardParams.openCard);

  return cardElement;

};

const likeCard = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  const activeLike = event.target.closest('.card__like-button_is-active');
  const card = event.target.closest('.card');
  const likeNumber = card.querySelector('.card__like-number');
  likeRequest(activeLike, card)
    .then((result) => {
      likeNumber.textContent = result.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => console.error('Ошибка: ', error));
}

const deleteCard = (event) => {
  const card = event.target.closest('.card');
  deleteCardRequest(card).then(() => card.remove())
    .catch(error => console.error('Ошибка: ', error));
}

export { createCard, likeCard, deleteCard }
