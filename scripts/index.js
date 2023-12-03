const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
let cardElement;

const createCard = (cards) => {
  cards.forEach(element => {
    cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;
    placesList.append(cardElement)
  })
}

createCard(initialCards)

const cardDeleteButton = document.querySelectorAll('.card__delete-button');

const deleteFunc = (event) => {
  const card = event.target.closest('.card');
  card.remove();
}

cardDeleteButton.forEach((button) => {
  button.addEventListener('click', deleteFunc);
});
