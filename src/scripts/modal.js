const openCard = (event) => {
  const popUpTypeImage = document.querySelector('.popup_type_image');
  popUpTypeImage.classList.add('popup_is-opened');
  document.querySelector('.popup__image').src = event.target.closest('.card__image').src;
  document.querySelector('.popup__caption').textContent = event.target.closest('.card__image').alt;
}

const openPopUp = () => {
  const popUp = document.querySelector('.popup');
  popUp.classList.add('popup_is-opened');
}

const openNewCard = () => {
  const popUpNewCard = document.querySelector('.popup_type_new-card');
  popUpNewCard.classList.add('popup_is-opened');
}

const closePopUp = () => {
  const popUp = document.querySelectorAll('.popup');
  popUp.forEach(el => {
    el.classList.remove('popup_is-opened');
  })
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopUp();
  }
}

export { openCard, openNewCard, openPopUp, closePopupEsc, closePopUp };
