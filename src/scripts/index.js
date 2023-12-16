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
  cardElement.querySelector('.card__image').alt = `${cards.name}`;
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

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelectorAll('.card__image');
const popUpTypeImage = document.querySelector('.popup_type_image');


cardImage.forEach(element => {
  element.addEventListener('click', () => {
    popUpTypeImage.style.display = 'flex';
    popUpTypeImage.classList.add('popup_opened');
    document.querySelector('.popup__image').src = element.src;
    document.querySelector('.popup__caption').textContent = element.alt
  })
})

editButton.addEventListener('click', openPopUp);
addButton.addEventListener('click', openPopUp);
function openPopUp () {
  const popUp = document.querySelector('.popup');
  popUp.style.display = 'flex';
  popUp.classList.add('popup_opened');
}

function closePopUp () {
  const popUp = document.querySelector('.popup');
  popUp.style.display = 'none';
  popUpTypeImage.style.display = 'none'
  popUp.classList.remove('popup_opened');
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopUp();
  }
}

closeButton.forEach(element => {
  element.addEventListener('click', closePopUp)
})

window.addEventListener('click', e => {
  const target = e.target
  if (!target.closest('.profile__edit-button') &&
      !target.closest('.popup__content') &&
      !target.closest('.profile__add-button') &&
      !target.closest('.card__image')) {
    closePopUp();
  }
})

window.addEventListener ('keydown', closePopupEsc)
