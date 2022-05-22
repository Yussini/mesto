import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileBtn = document.querySelector(".bio__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

const profilePopup = document.querySelector(".popup_profile");
const profilePopupSaveBtn = profilePopup.querySelector('.popup__save-btn');
const cardPopup = document.querySelector(".popup_card");
//const cardPopupPushBtn = cardPopup.querySelector('.popup__push-btn');
const imagePopup = document.querySelector(".popup_album");


 
const popupAlbumImage = document.querySelector(".popup__image");
const popupDescription = document.querySelector(".popup__description");


const profileCloseBtn = document.querySelector(".popup__close-btn_profile");
const cardCloseBtn = document.querySelector(".popup__close-btn_card");
const albumCloseBtn = document.querySelector(".popup__close-btn_album");

const formBioElement = document.querySelector(".popup__form_bio");
const formImgCard = document.querySelector(".popup__form_card");

const bioName = document.querySelector(".bio__name");
const bioDescription = document.querySelector(".bio__description");
const nameInput = document.querySelector(".popup__input_type_call");
//const nameInputError = profilePopup.querySelector(`#${nameInput.id}-error`);
const jobInput = document.querySelector(".popup__input_type_hobbies");
//const jobInputError = profilePopup.querySelector(`#${jobInput.id}-error`);
const placeInput = document.querySelector(".popup__input_type_place");
//const placeInputError = cardPopup.querySelector(`#${placeInput.id}-error`);
const linkInput = document.querySelector(".popup__input_type_link");
//const linkInputError = cardPopup.querySelector(`#${linkInput.id}-error`);
const listContainer = document.querySelector(".elements__grid");
//const template = document.querySelector(".template");
const selectorTemaplate = '#card__template';

export const Settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is-active");
  document.addEventListener('keydown', closeByEscape);
}

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-active");
  document.removeEventListener('keydown', closeByEscape);
}

//Закрытие попапа по клику на оверлей
function onOverlayClick(event) {
  if(event.target === event.currentTarget) {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(imagePopup);
  }
}

//Закрытие на кнопку ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-active');
    closePopup(openedPopup);
  }
}


//Лайк карточки
/* function likeElement() {
  this.classList.toggle("button_active");
} */

//Удаление карточки
/* function removeElement(evt) {
  const dltElement = evt.target.closest(".elements__item");
  dltElement.remove();
} */

//Функция которая подсасывает значения из инпутов
/* function openPropfilePopup() {
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
} */

//Добавление карточки через template
/* function render() {
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
} */
const handleCLickImage = (link, name) => {
    popupAlbumImage.src = link;
    popupAlbumImage.alt = link;
    popupDescription.textContent = name;
  
    openPopup(imagePopup);
}

function renderCard (link, name) {
  return new Card(link, name, selectorTemaplate, handleCLickImage).getCard();
}

function addCard (card) {
  listContainer.prepend(card);
}

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

initialCards.forEach((item) => {
  const card = renderCard(item.link, item.name);
  addCard(card);
});

//Функция добавления карточки пользавателем  
/* function createElementImage(evt) {
  const element = evt.target.closest(".elements__item");
  const albumImage = element.querySelector(".elements__photo");

  popupAlbumImage.src = albumImage.src;
  popupAlbumImage.alt = albumImage.alt;
  popupDescription.textContent = albumImage.alt;

  openPopup(imagePopup);
} */

//Форма отправки изменений в имени и описании профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  bioName.textContent = nameInput.value;
  bioDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Форма добавления фотокарточки
/* function hundleAddCard(evt) {
  evt.preventDefault();
  const createCard = getElement({
    name: placeInput.value,
    link: linkInput.value,
  });
  listContainer.prepend(createCard);
  closePopup(cardPopup);
  placeInput.value = "";
  linkInput.value = "";
} */

function handleSubmitPopupAddCard (evt) {
  evt.preventDefault();
  const card = renderCard(linkInput.value, placeInput.value);
  addCard(card);
  closePopup(cardPopup);
}

profileBtn.addEventListener('click', () => {
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
  editProfileFormValidator.clearErrors();
  openPopup(profilePopup);
});
profilePopupSaveBtn.addEventListener('submit', handleProfileFormSubmit);


addCardBtn.addEventListener('click', () => {
  formImgCard.reset(); 
  addCardFormValidator.clearErrors();
  openPopup(cardPopup);
});
cardPopup.addEventListener('submit',  handleSubmitPopupAddCard);

/* //Кнопки
addCardBtn.addEventListener('click', () => {
  formImgCard.reset(); 
  disableButton(cardPopupPushBtn, Settings.inactiveButtonClass);
  hideError(Settings, placeInput, placeInputError);
  hideError(Settings, linkInput, linkInputError);
  openPopup(cardPopup);
});

profileBtn.addEventListener('click', () => { 
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
  if (nameInput.value && jobInput.value) {
    enableButton(profilePopupSaveBtn, Settings.inactiveButtonClass);
  } else {
    disableButton(profilePopupSaveBtn, Settings.inactiveButtonClass);
  }
  hideError(Settings, nameInput, nameInputError );
  hideError(Settings, jobInput, jobInputError );
  openPropfilePopup();
  openPopup(profilePopup);
}); */


profilePopup.addEventListener('click', onOverlayClick);
cardPopup.addEventListener('click', onOverlayClick);
imagePopup.addEventListener('click', onOverlayClick);
profileCloseBtn.addEventListener("click", () => closePopup(profilePopup));
cardCloseBtn.addEventListener("click", () => closePopup(cardPopup));
albumCloseBtn.addEventListener("click", () => closePopup(imagePopup));
formBioElement.addEventListener("submit", handleProfileFormSubmit);
//formImgCard.addEventListener("submit", hundleAddCard);

const addCardFormValidator = new FormValidator(Settings, formImgCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(Settings, formBioElement);
editProfileFormValidator.enableValidation();
//render();
