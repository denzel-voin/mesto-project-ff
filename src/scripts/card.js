import {checkResponse, deleteCardRequest, likeRequest} from "./api";

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
    deleteButton.addEventListener('click', callBackDeleteCard); // Move inside this block
  }
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', callBackLikeCard); // Move here
  cardImage.addEventListener('click', openCard);
  return cardElement
}


const likeCard = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
  const activeLike = event.target.closest('.card__like-button_is-active');
  const card = event.target.closest('.card');
  const likeNumber = card.querySelector('.card__like-number');
  likeRequest(activeLike, card, likeNumber, likeButton)
    .then(res => {
      checkResponse(res)
        .then((result) => {
          console.log(result)
          likeNumber.textContent = result.likes.length;
        })
    })
    .catch(error => {
      likeButton.classList.toggle('card__like-button_is-active');
      console.error('Ошибка: ', error);
    });
}

const deleteCard = (event) => {
  const card = event.target.closest('.card');
  deleteCardRequest(card)
    .then(res => {
      checkResponse(res);
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
  card.remove();
}

export { createCard, likeCard, deleteCard }
