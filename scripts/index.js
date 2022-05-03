const profileBtn = document.querySelector(".bio__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

const profilePopup = document.querySelector(".popup_profile");
const profilePopupSaveBtn = profilePopup.querySelector('.popup__save-btn');
const cardPopup = document.querySelector(".popup_card");
const cardPopupPushBtn = cardPopup.querySelector('.popup__push-btn');
const imagePopup = document.querySelector(".popup_album");
const popups = document.querySelectorAll(".popup");

 
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
const nameInputError = profilePopup.querySelector(`#${nameInput.id}-error`);
const jobInput = document.querySelector(".popup__input_type_hobbies");
const jobInputError = profilePopup.querySelector(`#${jobInput.id}-error`);
const placeInput = document.querySelector(".popup__input_type_place");
const placeInputError = cardPopup.querySelector(`#${placeInput.id}-error`);
const linkInput = document.querySelector(".popup__input_type_link");
const linkInputError = cardPopup.querySelector(`#${linkInput.id}-error`);
const listContainer = document.querySelector(".elements__grid");
const template = document.querySelector(".template");

//Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is-active");
  document.addEventListener('keydown', closeByEscape);
}

//Закрытие попапа
function closepPopup(popup) {
  popup.classList.remove("popup_is-active");
  document.removeEventListener('keydown', closeByEscape);
}

//Закрытие попапа по клику на оверлей
function onOverlayClick(event) {
  if(event.target === event.currentTarget) {
    closepPopup(profilePopup);
    closepPopup(cardPopup);
    closepPopup(imagePopup);
  }
}

//Закрытие на кнопку ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-active');
    closepPopup(openedPopup);
  }
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

  popupAlbumImage.src = albumImage.src;
  popupAlbumImage.alt = albumImage.alt;
  popupDescription.textContent = albumImage.alt;

  openPopup(imagePopup);
}

//Форма отправки изменений в имени и описании профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  bioName.textContent = nameInput.value;
  bioDescription.textContent = jobInput.value;
  closepPopup(profilePopup);
}

//Форма добавления фотокарточки
function hundleAddCard(evt) {
  evt.preventDefault();
  const createCard = getElement({
    name: placeInput.value,
    link: linkInput.value,
  });
  listContainer.prepend(createCard);
  closepPopup(cardPopup);
  placeInput.value = "";
  linkInput.value = "";
}


//Кнопки
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
});


profilePopup.addEventListener('click', onOverlayClick);
cardPopup.addEventListener('click', onOverlayClick);
imagePopup.addEventListener('click', onOverlayClick);
profileCloseBtn.addEventListener("click", () => closepPopup(profilePopup));
cardCloseBtn.addEventListener("click", () => closepPopup(cardPopup));
albumCloseBtn.addEventListener("click", () => closepPopup(imagePopup));
formBioElement.addEventListener("submit", handleProfileFormSubmit);
formImgCard.addEventListener("submit", hundleAddCard);


render();
