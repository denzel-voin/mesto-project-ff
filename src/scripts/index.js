import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card';
import { openPopUp, closePopUp } from './modal';
import { enableValidation } from "./validation";

const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const popUpTypeImage = document.querySelector('.popup_type_image');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('.popup__form');
const formCardElement = document.querySelector('.popup_type_new-card .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpEditType = document.querySelector('.popup_type_edit');
const popUpImage = popUpTypeImage.querySelector('.popup__image');
const popUpCaption = popUpTypeImage.querySelector('.popup__caption');
const initialCards = [];
fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
  method: 'GET',
  headers: {
    authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach(el => {
      initialCards.push({ name: el.name, link: el.link, likes: el.likes, owner: el.owner.name, id: el._id });
    });
    initialCards.forEach((card) => {
      renderCards(createCard(card, deleteCard, likeCard, openImagePopUp));
    });
  });


fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
  method: 'GET',
  headers: {
    authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb'
  }
})
  .then(res => res.json())
  .then((result) => {
    const avatar = document.querySelector('.profile__image');
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector(('.profile__description'));
    profileDescription.textContent = result.about;
    profileName.textContent = result.name;
    avatar.src = result.avatar;
  });


const renderCards = (cardElement) => {
  placesList.append(cardElement);
}

const openImagePopUp = (event) => {
  openPopUp(popUpTypeImage);

  popUpImage.src = event.target.closest('.card__image').src;
  popUpCaption.textContent = event.target.closest('.card__image').alt;
  popUpImage.alt = event.target.closest('.card__image').alt;
}

const createUserCard = (evt) => {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const likes = [];
  const owner = document.querySelector('.profile__title').textContent;
  const card = { name, link, likes, owner };
  formCardElement.reset();
  const buttonElement = formCardElement.querySelector('.popup__button');
  buttonElement.disabled = true;
  buttonElement.classList.add('form__submit_inactive');
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
    method: 'POST',
    headers: {
      authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`,
      likes: []
    })
  })
  placesList.prepend(createCard(card, deleteCard, likeCard, openImagePopUp));
  closePopUp(popUpNewCard);
}

const openEditProfilePopup = () => {
  openPopUp(popUpEditType);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const errorElement = popUpEditType.querySelectorAll(`.form__input-error_active`);
  if (errorElement) {
    errorElement.forEach(el =>{
      el.textContent = '';
      el.classList.remove('form__input-error_active');
    })
    const inputError = popUpEditType.querySelectorAll(`.form__input_type_error`);
    if (inputError) {
      inputError.forEach(el => {
        el.classList.remove('form__input_type_error');
      })
    }
  }
}

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopUp(popUpEditType);
  fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`
    })
  })
}

popups.forEach(el => el.classList.add('popup_is-animated'));

buttonsClosePopup.forEach(element => {
  element.addEventListener('click', () => popups.forEach(el => closePopUp(el)));
})

buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', () => openPopUp(popUpNewCard));

formEditProfile.addEventListener('submit', submitEditProfileForm);
formCardElement.addEventListener('submit', createUserCard);

enableValidation();
