let editProfile = document.querySelector('.bio__edit-btn');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__form');
let bioName = document.querySelector('.bio__name');
let bioDescription = document.querySelector('.bio__description');
let nameInput = document.querySelector('.popup__input_call');
let jobInput = document.querySelector('.popup__input_hobbie');

function openModalWindow() {
  modalWindow.classList.add('popup_opened');
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
}

function closeModalWindow() {
  modalWindow.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  bioName.textContent = nameInput.value;
  bioDescription.textContent = jobInput.value;
  closeModalWindow();
}

editProfile.addEventListener('click', openModalWindow);
modalCloseBtn.addEventListener('click', closeModalWindow);
formElement.addEventListener('submit', formSubmitHandler); 