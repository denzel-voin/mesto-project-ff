const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (cards) => {
  const cardElements = [];

  cards.forEach(element => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = `${element.name} пейзаж`;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);
    cardElements.push(cardElement);
  });

  return cardElements;
}

const deleteFunc = (event) => {
  const card = event.target.closest('.card');
  card.remove();
}

const renderCards = (cardElements) => {
  cardElements.forEach(cardElement => {
    placesList.append(cardElement);
  });
}

const cards = createCard(initialCards);
renderCards(cards);
