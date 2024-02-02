import avatar from '../images/avatar.jpg';
import logo from '../images/logo.svg';
import '../pages/index.css';
import initialCards from './cards';
import { createCard, cardLike, renderCards, deleteFunc, createUserCard } from './card';
import { openCard, openNewCard, openPopUp, closePopupEsc, closePopUp } from './modal';

const loadImages = () => {
  const headerLogo = document.querySelector('.header__logo');
  const profileImage = document.querySelector('.profile__image');

  headerLogo.setAttribute('src', logo);
  profileImage.style.backgroundImage = `url(${avatar})`;
}

loadImages()

initialCards.forEach((card) => {
  renderCards(createCard(card, deleteFunc, cardLike, openCard));
});

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popUp = document.querySelectorAll('.popup');

editButton.addEventListener('click', openPopUp);
addButton.addEventListener('click', openNewCard);
popUp.forEach(el => el.classList.add('popup_is-animated'));

closeButton.forEach(element => {
  element.addEventListener('click', closePopUp);
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

window.addEventListener ('keydown', closePopupEsc);

const formElement = document.querySelector('.popup__form');
const formCardElement = document.querySelector('.popup_type_new-card .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopUp();
}

formElement.addEventListener('submit', handleFormSubmit);

formCardElement.addEventListener('submit', createUserCard);
