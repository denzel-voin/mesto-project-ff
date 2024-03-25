import '../pages/index.css';
import { createCard } from './card';
import { openPopUp, closePopUp } from './modal';
import {clearValidation, enableValidation} from "./validation";
import {getInitialCards, getProfile, patchAvatar, patchProfile, postNewCard} from "./api";
import {
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
  popUpTypeImage,
  handleSubmit
} from "./utils";

cardParams.openCard = openImagePopUp;

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
      }
      );
    });
    initialCards.forEach((card) => {
      renderCard(card);
    });
  })
  .catch(error => console.error('Ошибка: ', error));

function renderCard(item, method = "append") {
  cardParams.card = item
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
        renderCard(card, 'prepend');
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
        closePopUp(popUpEditAvatar);
      });

  }

  handleSubmit(makeRequest, evt);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formCardElement.addEventListener('submit', createUserCard);
formEditAvatar.addEventListener('submit', submitEditAvatarForm);

const openEditAvatarPopup = () => openPopUp(popUpEditAvatar)

popups.forEach(el => el.classList.add('popup_is-animated'));
buttonsClosePopups.forEach(element => {
  element.addEventListener("click", () => popups.forEach(closePopUp));
})

buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardPopup.addEventListener('click', () => openPopUp(popUpNewCard));
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

enableValidation(settings);
