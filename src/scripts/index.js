import '../pages/index.css';
import initialCards from './cards';
import { createCard, likeCard, deleteCard } from './card';
import { openPopUp, closePopUp } from './modal';

const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

const renderCards = (cardElement) => {
  placesList.append(cardElement);
}

const popUpTypeImage = document.querySelector('.popup_type_image');

const createUserCard = (evt) => {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const card = { name, link };

  placesList.prepend(createCard(card, deleteCard, likeCard, () => openPopUp(popUpTypeImage)));
  closePopUp();
}

initialCards.forEach((card) => {
  renderCards(createCard(card, deleteCard, likeCard, () => openPopUp(popUpTypeImage)));
});

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');


popups.forEach(el => el.classList.add('popup_is-animated'));

buttonsClosePopup.forEach(element => {
  element.addEventListener('click', closePopUp);
})


const formEditProfile = document.querySelector('.popup__form');
const formCardElement = document.querySelector('.popup_type_new-card .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpEditType = document.querySelector('.popup_type_edit');
buttonOpenEditProfilePopup.addEventListener('click', () => openPopUp(popUpEditType));
buttonOpenAddCardPopup.addEventListener('click', () => openPopUp(popUpNewCard));

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopUp();
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
formCardElement.addEventListener('submit', createUserCard);
