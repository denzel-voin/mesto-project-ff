const openPopUp = (element) => {
  element.classList.add('popup_is-opened');
  if (element === document.querySelector('.popup_type_image')) {
    element.querySelector('.popup__image').src = event.target.closest('.card__image').src;
    element.querySelector('.popup__caption').textContent = event.target.closest('.card__image').alt;
    element.querySelector('.popup__image').alt = event.target.closest('.card__image').alt;
  }
  window.addEventListener ('keydown', closePopupEsc);
  window.addEventListener ('click', closeByOverlayClick);
}

const closePopUp = () => {
  const popUp = document.querySelectorAll('.popup');
  popUp.forEach(el => {
    el.classList.remove('popup_is-opened');
    window.removeEventListener ('keydown', closePopupEsc);
    window.removeEventListener ('click', closeByOverlayClick);
  })
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopUp();
  }
}

const closeByOverlayClick = (e) => {
  const target = e.target
  if (target.closest('.popup') && !target.closest('.popup__content')) {
    closePopUp();
  }
}

export { openPopUp, closePopupEsc, closePopUp };
