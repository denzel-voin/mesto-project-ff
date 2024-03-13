import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card';
import { openPopUp, closePopUp } from './modal';
import { enableValidation } from "./validation";
import {getInitialCards, getProfile, patchAvatar, patchProfile, postNewCard} from "./api";

const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const popUpTypeImage = document.querySelector('.popup_type_image');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('.popup__form');
const formEditAvatar = document.querySelector('.popup_type_edit-avatar');
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

getInitialCards()
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((result) => {
    result.forEach(el => {
      initialCards.push({ name: el.name, link: el.link, likes: el.likes, owner: el.owner.name, id: el._id });
    });
    initialCards.forEach((card) => {
      renderCards(createCard(card, deleteCard, likeCard, openImagePopUp));
    });
  })
  .catch((err) => {
    console.log('Ошибка:', err);
  });

getProfile();

function renderCards (cardElement) {
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
  renderLoading(true, buttonElement);
  postNewCard(name, link)
    .finally(() => renderLoading(false, buttonElement));
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
  const buttonElement = formEditProfile.querySelector('.popup__button');
  buttonElement.disabled = true;
  buttonElement.classList.add('form__submit_inactive');
  renderLoading(true, buttonElement);
  closePopUp(popUpEditType);
  patchProfile(name, job)
    .finally(() => renderLoading(false, buttonElement));
}

popups.forEach(el => el.classList.add('popup_is-animated'));

buttonsClosePopup.forEach(element => {
  element.addEventListener('click', () => popups.forEach(el => closePopUp(el)));
})

buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', () => openPopUp(popUpNewCard));

formEditProfile.addEventListener('submit', submitEditProfileForm);
formCardElement.addEventListener('submit', createUserCard);


const buttonEditAvatar = document.querySelector('.profile__image-edit-button');
const popUpEditAvatar = document.querySelector('.popup_type_edit-avatar');

const openEditAvatarPopup = () => {
  openPopUp(popUpEditAvatar);


  const errorElement = popUpEditAvatar.querySelectorAll(`.form__input-error_active`);
  if (errorElement) {
    errorElement.forEach(el =>{
      el.textContent = '';
      el.classList.remove('form__input-error_active');
    })
    const inputError = popUpEditAvatar.querySelectorAll(`.form__input_type_error`);
    if (inputError) {
      inputError.forEach(el => {
        el.classList.remove('form__input_type_error');
      })
    }
  }
}

buttonEditAvatar.addEventListener('click', openEditAvatarPopup);


const submitEditAvatarForm = (evt) => {
  evt.preventDefault();
  const avatar = document.querySelector('.profile__avatar');
  const avatarUrl = document.querySelector('#input__avatar-link');
  avatar.src = avatarUrl.value;
  avatarUrl.value = '';
  const buttonElement = popUpEditAvatar.querySelector('.popup__button');
  buttonElement.disabled = true;
  buttonElement.classList.add('form__submit_inactive');
  renderLoading(true, buttonElement);
  patchAvatar()
    .finally(() => renderLoading(false, buttonElement))
  closePopUp(popUpEditAvatar);
}

formEditAvatar.addEventListener('submit', submitEditAvatarForm);

enableValidation();

function renderLoading (isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}
