const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const profileBtn = document.querySelector(".bio__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

const profilePopup = document.querySelector(".popup_profile");
const cardPopup = document.querySelector(".popup_card");
const imagePopup = document.querySelector(".popup_album");
const popups = document.querySelectorAll(".popup");


const closeBtnProfile = document.querySelector(".popup_close_profile");
const closeBtnCard = document.querySelector(".popup_close_card");
const closeBtnAlbum = document.querySelector(".popup_close_album");

const formBioElement = document.querySelector(".popup__form_bio");
const formImgCard = document.querySelector(".popup__form_card");

const bioName = document.querySelector(".bio__name");
const bioDescription = document.querySelector(".bio__description");
const nameInput = document.querySelector(".popup__input_type_call");
const jobInput = document.querySelector(".popup__input_type_hobbies");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const listContainer = document.querySelector(".elements__grid");
const template = document.querySelector(".template");

//Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is-active");
}

//Закрытие попапа
function close(popup) {
  popup.classList.remove("popup_is-active");
}

//Лайк карточки
function likeElement() {
  this.classList.toggle("button_active");
}

//Удаление карточки
function removeElement(evt) {
  const dltElement = evt.target.closest(".elements__item");
  dltElement.remove();
}

//Функция которая подсасывает значения из инпутов
function openPropfilePopup() {
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
}

//Добавление карточки через template
function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const templateName = getElementTemplate.querySelector(".elements__name");
  const templateImage = getElementTemplate.querySelector(".elements__photo");
  const deleteBtn = getElementTemplate.querySelector(".elements__dlt-btn");
  const likeBtn = getElementTemplate.querySelector(".elements__like-btn");

  templateImage.src = item.link;
  templateImage.alt = item.name;
  templateName.textContent = item.name;

  templateImage.addEventListener("click", createElementImage);
  deleteBtn.addEventListener("click", removeElement);
  likeBtn.addEventListener("click", likeElement);

  return getElementTemplate;
}

//Функция добавления карточки пользавателем  
function createElementImage(evt) {
  const element = evt.target.closest(".elements__item");
  const albumImage = element.querySelector(".elements__photo");
  const popupAlbumImage = document.querySelector(".popup__image");
  const popupDescription = document.querySelector(".popup__description");

  popupAlbumImage.src = albumImage.src;
  popupAlbumImage.alt = albumImage.alt;
  popupDescription.textContent = albumImage.alt;

  openPopup(imagePopup);
}

//Форма отправки изменений в имени и описании профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  bioName.textContent = nameInput.value;
  bioDescription.textContent = jobInput.value;
  close(profilePopup);
}

//Форма добавления фотокарточки
function hundleAddCard(evt) {
  evt.preventDefault();
  const createCard = getElement({
    name: placeInput.value,
    link: linkInput.value,
  });
  listContainer.prepend(createCard);
  close(cardPopup);
  placeInput.value = "";
  linkInput.value = "";
}

//Кнопки
profileBtn.addEventListener(
  "click",
  () => openPopup(profilePopup),
  openPropfilePopup()
);
addCardBtn.addEventListener("click", () => openPopup(cardPopup));
closeBtnProfile.addEventListener("click", () => close(profilePopup));
closeBtnCard.addEventListener("click", () => close(cardPopup));
closeBtnAlbum.addEventListener("click", () => close(imagePopup));
formBioElement.addEventListener("submit", formSubmitHandler);
formImgCard.addEventListener("submit", hundleAddCard);

render();
