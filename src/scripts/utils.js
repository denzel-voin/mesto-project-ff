import {deleteCard, likeCard} from "./card";

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
  callBackLikeCard: likeCard
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch(error => console.error('Ошибка: ', error))
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export {
  placesList,
  avatar,
  avatarUrl,
  buttonEditAvatar,
  cardLink,
  cardName,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  buttonsClosePopups,
  cardParams,
  jobInput,
  popups,
  settings,
  userId,
  formCardElement,
  formEditAvatar,
  formEditProfile,
  nameInput,
  popUpEditAvatar,
  initialCards,
  popUpCaption,
  popUpEditType,
  popUpImage,
  popUpNewCard,
  profileDescription,
  profileTitle,
  profileName,
  popUpTypeImage
}
