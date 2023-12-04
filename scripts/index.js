const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (cards) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cards.link;
  cardElement.querySelector('.card__image').alt = `${cards.name}: пейзаж`;
  cardElement.querySelector('.card__title').textContent = cards.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
  return cardElement
}

const deleteFunc = (event) => {
  const card = event.target.closest('.card');
  card.remove();
}

const renderCards = (cardElement) => {
  placesList.append(cardElement);
}

initialCards.forEach((card) => {
  renderCards(createCard(card, deleteFunc))
});