const cardTemplate = document.querySelector('#card-template').content;
const createCard = (cards, callBackDeleteCard, callBackLikeCard, openCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cards.link;
  cardImage.alt = `${cards.name}`;
  cardElement.querySelector('.card__title').textContent = cards.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', callBackDeleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', callBackLikeCard);
  cardImage.addEventListener('click', openCard);
  return cardElement
}

const likeCard = (event) => {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

const deleteCard = (event) => {
  const card = event.target.closest('.card');
  card.remove();
}

export { createCard, likeCard, deleteCard }
