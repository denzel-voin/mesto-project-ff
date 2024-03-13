const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
}

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      const avatar = document.querySelector('.profile__avatar');
      const profileName = document.querySelector('.profile__title');
      const profileDescription = document.querySelector(('.profile__description'));
      profileDescription.textContent = result.about;
      profileName.textContent = result.name;
      avatar.src = result.avatar;
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
}

const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`,
      likes: []
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
}

const patchProfile = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
}

const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar.src
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
}

const likeRequest = (activeLike, card, likeNumber, likeButton) => {
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: activeLike ? 'PUT' : 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      likeNumber.textContent = result.likes.length;
    })
    .catch(error => {
      likeButton.classList.toggle('card__like-button_is-active');
      console.error('Ошибка: ', error);
    });
}

const deleteCardRequest = (card) => {
  return fetch(`${config.baseUrl}/cards/${card.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    });
}

export {getInitialCards, getProfile, postNewCard, patchProfile, patchAvatar, likeRequest, deleteCardRequest}
