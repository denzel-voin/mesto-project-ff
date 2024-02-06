const openPopUp = (element) => {
  element.classList.add('popup_is-opened');
  window.addEventListener ('keydown', closePopupEsc);
  window.addEventListener ('click', closeByOverlayClick);
}

const closePopUp = (element) => {
  element.classList.remove('popup_is-opened');
  window.removeEventListener ('keydown', closePopupEsc);
  window.removeEventListener ('click', closeByOverlayClick);
}

const closePopupEsc = (evt) => {
  const popUpIsOpened = document.querySelector('.popup_is-opened');
  if (popUpIsOpened && evt.key === 'Escape') {
    closePopUp(popUpIsOpened);
  }
}

const closeByOverlayClick = (e) => {
  const popUpIsOpened = document.querySelector('.popup_is-opened');
  const target = e.target
  if (target.closest('.popup') && !target.closest('.popup__content')) {
    closePopUp(popUpIsOpened);
  }
}

export { openPopUp, closePopUp };
