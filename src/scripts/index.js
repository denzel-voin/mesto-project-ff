import avatar from '../images/avatar.jpg'
import logo from '../images/logo.svg'
import '../pages/index.css';
import initialCards from './cards'

const loadImages = () => {
  const headerLogo = document.querySelector('.header__logo');
  const profileImage = document.querySelector('.profile__image');

  headerLogo.setAttribute('src', logo);
  profileImage.style.backgroundImage = `url(${avatar})`;
}
loadImages()

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (cards, callBackDeleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cards.link;
  cardElement.querySelector('.card__image').alt = `${cards.name}: пейзаж`;
  cardElement.querySelector('.card__title').textContent = cards.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', callBackDeleteCard);
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