import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card';
import { openPopUp, closePopUp } from './modal';
import {clearValidation, enableValidation} from "./validation";
import {getInitialCards, getProfile, patchAvatar, patchProfile, postNewCard} from "./api";
import { handleSubmit } from "./utils";

const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const popUpTypeImage = document.querySelector('.popup_type_image');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopups = document.querySelectorAll('.popup__close');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formEditProfile = document.forms["edit-profile"];
const formEditAvatar = document.forms["edit-avatar"];
const formCardElement = document.forms["new-place"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpEditType = document.querySelector('.popup_type_edit');
const popUpImage = popUpTypeImage.querySelector('.popup__image');
const popUpCaption = popUpTypeImage.querySelector('.popup__caption');
const avatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__title');
const avatarUrl = document.querySelector('#input__avatar-link');
const buttonEditAvatar = document.querySelector('.profile__image-edit-button');
const popUpEditAvatar = document.querySelector('.popup_type_edit-avatar');
const initialCards = [];
let userId;

const cardParams = {
  card: null,
  callBackDeleteCard: deleteCard,
  callBackLikeCard: likeCard,
  openCard: openImagePopUp
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

Promise.all([getProfile(), getInitialCards()])
  .then(([userData, cards]) => {

    profileDescription.textContent = userData.about;
    profileName.textContent = userData.name;
    avatar.src = userData.avatar;
    cardParams.userId = userData._id;

    cards.forEach(el => {
      initialCards.push({
        name: el.name,
        link: el.link,
        likes: el.likes,
        owner: el.owner.name,
        id: el._id,
        ownerId: el.owner._id
      });
    });
    initialCards.forEach((card) => {
      cardParams.card = card;
      renderCard(card);
    });
  })
  .catch(error => console.error('Ошибка: ', error));

function renderCard(item, method = "append") {

  const cardElement = createCard(cardParams);

  placesList[ method ](cardElement);
}

function openImagePopUp (event) {
  openPopUp(popUpTypeImage);

  const cardImage = event.target.closest('.card__image');

  popUpImage.src = cardImage.src;
  popUpCaption.textContent = cardImage.alt;
  popUpImage.alt = cardImage.alt;
}

const openEditProfilePopup = () => {
  openPopUp(popUpEditType);
  clearValidation(popUpEditType, settings);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

}

function handleProfileFormSubmit(evt) {

  function makeRequest() {

    return patchProfile(nameInput.value, jobInput.value)
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopUp(popUpEditType);
    });

  }

  handleSubmit(makeRequest, evt);
}

function createUserCard (evt) {

  const name = cardName.value;
  const link = cardLink.value;
  const likes = [];
  const ownerId = userId;
  cardParams.userId = ownerId;
  const card = { name, link, likes, ownerId };

  function makeRequest() {

    return postNewCard(name, link)
      .then(result => {
        card.id = result._id;
        cardParams.card = card;
        const createdCard = createCard(cardParams);
        placesList.prepend(createdCard);
        closePopUp(popUpNewCard);
      })
  }

  handleSubmit(makeRequest, evt);
}

function submitEditAvatarForm(evt) {

  function makeRequest() {

    return patchAvatar(avatarUrl.value)
      .then((userData) => {
        avatar.src = userData.avatar;
        avatarUrl.value = '';
        closePopUp(popUpEditAvatar);
      });

  }

  handleSubmit(makeRequest, evt);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formCardElement.addEventListener('submit', createUserCard);
formEditAvatar.addEventListener('submit', submitEditAvatarForm);

const openEditAvatarPopup = () => {
  openPopUp(popUpEditAvatar);
  clearValidation(popUpEditAvatar, settings);
}

popups.forEach(el => el.classList.add('popup_is-animated'));
buttonsClosePopups.forEach(element => {
  element.addEventListener("click", () => popups.forEach(closePopUp));
})

buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopUp(popUpNewCard);
  clearValidation(popUpNewCard, settings);
});
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

enableValidation(settings);
