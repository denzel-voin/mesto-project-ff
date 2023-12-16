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
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addNewCard = document.querySelector('.popup_type_new-card');
const cardImage = document.querySelectorAll('.card__image');
const popUpTypeImage = document.querySelector('.popup_type_image');


cardImage.forEach(element => {
  element.addEventListener('click', () => {
    popUpTypeImage.style.display = 'flex';
    document.querySelector('.popup__image').src = element.src;
    document.querySelector('.popup__caption').textContent = element.alt
  })
})

editButton.addEventListener('click', () => {
  editPopup.style.display = 'flex'
});

closeButton.forEach(element => {
  element.addEventListener('click', () => {
    editPopup.style.display = 'none';
    addNewCard.style.display = 'none';
    popUpTypeImage.style.display = 'none';
  })
})


addButton.addEventListener('click', () => {
  addNewCard.style.display = 'flex'
});

