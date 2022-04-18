let editProfile = document.querySelector('.bio__edit-btn');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__form');
let bioName = document.querySelector('.bio__name');
let bioDescription = document.querySelector('.bio__description');
let nameInput = document.querySelector('.popup__input_type_call');
let jobInput = document.querySelector('.popup__input_type_hobbies');
let listContainer = document.querySelector('.elements__grid');
let template = document.querySelector('.template')
let deleteBtn = document.querySelector('.elements__dlt-btn');

function render() {
  const html = initialCards.map(getElement);
  listContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const templateName = getElementTemplate.querySelector('.elements__name');
  const templateImage = getElementTemplate.querySelector('.elements__photo');
  const deleteBtn = getElementTemplate.querySelector('.elements__dlt-btn');
  const likeBtn = getElementTemplate.querySelector('.elements__like-btn')

  templateImage.src = item.link;
  templateName.textContent = item.name;

  deleteBtn.addEventListener('click', removeElement);
  likeBtn.addEventListener('click', likeElement);

  return getElementTemplate;
}

function likeElement(){
  this.classList.toggle('button_active');
}


function removeElement(evt){
  const dltElement = evt.target.closest('.elements__item');
  dltElement.remove();
}

function openModalWindow() {
  modalWindow.classList.add('popup_is-active');
  nameInput.value = bioName.textContent;
  jobInput.value = bioDescription.textContent;
}

function closeModalWindow() {
  modalWindow.classList.remove('popup_is-active');
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

render();