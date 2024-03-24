const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '9170d58a-0512-40e6-96dd-ff17859c3ccb',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkResponse(res));
}

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkResponse(res));
}

const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
    .then(res => checkResponse(res));
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
    .then(res => checkResponse(res));
}

const patchAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => checkResponse(res));
}

const likeRequest = (activeLike, card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card.id}`, {
    method: activeLike ? 'DELETE' : 'PUT',
    headers: config.headers
  })
    .then(res => checkResponse(res));
}

const deleteCardRequest = (card) => {
  return fetch(`${config.baseUrl}/cards/${card.id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkResponse(res));
}

export {getInitialCards, getProfile, postNewCard, patchProfile, patchAvatar, likeRequest, deleteCardRequest}
