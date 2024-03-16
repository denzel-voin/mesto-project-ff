(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"9170d58a-0512-40e6-96dd-ff17859c3ccb","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},r=document.querySelector("#card-template").content,n=function(e,t,n,o){var c=r.querySelector(".card").cloneNode(!0);c.id=e.id;var a=c.querySelector(".card__image");c.querySelector(".card__like-number").textContent=e.likes.length,a.src=e.link,a.alt="".concat(e.name),c.querySelector(".card__title").textContent=e.name;var i=document.querySelector(".profile__title");if(e.likes.forEach((function(e){e.name===i.textContent&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active")})),i.textContent===e.owner){var u=document.createElement("button");u.classList.add("card__delete-button"),c.appendChild(u),u.addEventListener("click",t)}return c.querySelector(".card__like-button").addEventListener("click",n),a.addEventListener("click",o),c},o=function(r){var n=r.target.closest(".card__like-button");n.classList.toggle("card__like-button_is-active");var o=r.target.closest(".card__like-button_is-active"),c=r.target.closest(".card"),a=c.querySelector(".card__like-number");(function(t,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r.id),{method:t?"PUT":"DELETE",headers:e.headers})})(o,c).then((function(e){t(e).then((function(e){console.log(e),a.textContent=e.likes.length}))})).catch((function(e){n.classList.toggle("card__like-button_is-active"),console.error("Ошибка: ",e)}))},c=function(r){var n=r.target.closest(".card");(function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t.id),{method:"DELETE",headers:e.headers})})(n).then((function(e){t(e)})).catch((function(e){console.error("Ошибка: ",e)})),n.remove()},a=function(e){e.classList.add("popup_is-opened"),window.addEventListener("keydown",u),window.addEventListener("click",l)},i=function(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keydown",u),window.removeEventListener("click",l)},u=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}},l=function(e){var t=e.target;if(t.closest(".popup")&&!t.closest(".popup__content")){var r=document.querySelector(".popup_is-opened");i(r)}},s=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("form__submit_inactive")):(t.disabled=!0,t.classList.add("form__submit_inactive"))},d=document.querySelector(".places__list"),_=document.querySelector(".popup__input_type_card-name"),p=document.querySelector(".popup__input_type_url"),f=document.querySelector(".popup_type_image"),m=document.querySelector(".profile__edit-button"),v=document.querySelectorAll(".popup__close"),y=document.querySelector(".profile__add-button"),h=document.querySelectorAll(".popup"),S=document.querySelector(".popup__form"),q=document.querySelector(".popup_type_edit-avatar"),b=document.querySelector(".popup_type_new-card .popup__form"),E=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_edit"),w=f.querySelector(".popup__image"),A=f.querySelector(".popup__caption"),T=[];fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){t(e).then((function(e){e.forEach((function(e){T.push({name:e.name,link:e.link,likes:e.likes,owner:e.owner.name,id:e._id})})),T.forEach((function(e){var t;t=n(e,c,o,U),d.append(t)}))}))})).catch((function(e){console.log("Ошибка:",e)})),fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){t(e).then((function(e){var t=document.querySelector(".profile__avatar"),r=document.querySelector(".profile__title");document.querySelector(".profile__description").textContent=e.about,r.textContent=e.name,t.src=e.avatar}))})).catch((function(e){console.error("Ошибка: ",e)}));var U=function(e){a(f),w.src=e.target.closest(".card__image").src,A.textContent=e.target.closest(".card__image").alt,w.alt=e.target.closest(".card__image").alt};h.forEach((function(e){return e.classList.add("popup_is-animated")})),v.forEach((function(e){e.addEventListener("click",(function(){return h.forEach((function(e){return i(e)}))}))})),m.addEventListener("click",(function(){a(x),E.value=k.textContent,L.value=g.textContent;var e=x.querySelectorAll(".form__input-error_active");if(e){e.forEach((function(e){e.textContent="",e.classList.remove("form__input-error_active")}));var t=x.querySelectorAll(".form__input_type_error");t&&t.forEach((function(e){e.classList.remove("form__input_type_error")}))}})),y.addEventListener("click",(function(){return a(C)})),S.addEventListener("submit",(function(r){r.preventDefault();var n=E.value,o=L.value;k.textContent=n,g.textContent=o;var c=S.querySelector(".popup__button");c.disabled=!0,c.classList.add("form__submit_inactive"),N(!0,c),i(x),function(t,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:"".concat(t),about:"".concat(r)})})}(n,o).then((function(e){t(e)})).catch((function(e){console.error("Ошибка: ",e)})).finally((function(){return N(!1,c)}))})),b.addEventListener("submit",(function(r){r.preventDefault();var a=_.value,u=p.value,l={name:a,link:u,likes:[],owner:document.querySelector(".profile__title").textContent};b.reset();var s=b.querySelector(".popup__button");s.disabled=!0,s.classList.add("form__submit_inactive"),N(!0,s),function(t,r){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:"".concat(t),link:"".concat(r)})})}(a,u).then((function(e){t(e).then((function(e){l.id=e._id;var t=n(l,c,o,U);d.prepend(t)}))})).catch((function(e){console.error("Ошибка: ",e)})).finally((function(){return N(!1,s)})),i(C)}));var D=document.querySelector(".profile__image-edit-button"),P=document.querySelector(".popup_type_edit-avatar");function N(e,t){t.textContent=e?"Сохранение...":"Сохранить"}D.addEventListener("click",(function(){a(P);var e=P.querySelectorAll(".form__input-error_active");if(e){e.forEach((function(e){e.textContent="",e.classList.remove("form__input-error_active")}));var t=P.querySelectorAll(".form__input_type_error");t&&t.forEach((function(e){e.classList.remove("form__input_type_error")}))}})),q.addEventListener("submit",(function(r){r.preventDefault();var n=document.querySelector(".profile__avatar"),o=document.querySelector("#input__avatar-link");n.src=o.value,o.value="";var c=P.querySelector(".popup__button");c.disabled=!0,c.classList.add("form__submit_inactive"),N(!0,c),function(t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t.src})})}(n).then((function(e){t(e)})).catch((function(e){console.error("Ошибка: ",e)})).finally((function(){return N(!1,c)})),i(P)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(".popup__input")),r=e.querySelector(".popup__button");s(t,r),t.forEach((function(n){n.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("form__input_type_error"),r.classList.remove("form__input-error_active"),r.textContent=""}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add("form__input_type_error"),n.textContent=r,n.classList.add("form__input-error_active")}(e,t,t.validationMessage)}(e,n),s(t,r)}))}))}(e)}))})();