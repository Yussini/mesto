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
const profileBtn = document.querySelector('.bio__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const popups = document.querySelectorAll('.popup');
const popupCloseBtn = document.querySelectorAll('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const formImgCard = document.querySelector('.popup__img-card')

const bioName = document.querySelector('.bio__name');
const bioDescription = document.querySelector('.bio__description');
const nameInput = document.querySelector('.popup__input_type_call');
const jobInput = document.querySelector('.popup__input_type_hobbies');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const listContainer = document.querySelector('.elements__grid');
const template = document.querySelector('.template');
const deleteBtn = document.querySelectorAll('.elements__dlt-btn');


//Открытие попапа
function togglePopup(index){
  popups[index].classList.toggle("popup_is-active");

   if (popups[0]){
    nameInput.value = bioName.textContent;
    jobInput.value = bioDescription.textContent;
  }
}


//Закрытие попапа
function closePopups(index) {
  popups[index].classList.remove('popup_is-active');
}



//Добавление карточки через template
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
  templateImage.alt = item.name;
  templateName.textContent = item.name;

  templateImage.addEventListener('click', createElementImage);
  deleteBtn.addEventListener('click', removeElement);
  likeBtn.addEventListener('click', likeElement);

  return getElementTemplate;
}

  //Лайк карточки
  function likeElement(){
    this.classList.toggle('button_active');
  }

  //Удаление карточки
  function removeElement(evt){
    const dltElement = evt.target.closest('.elements__item');
    dltElement.remove();
  }

function createElementImage(evt) {
  
  const element = evt.target.closest(".elements__item");
  const albumImage = element.querySelector(".elements__photo");
  const popupAlbumImage = document.querySelector(".popup__image");
  const popupDescription = document.querySelector(".popup__description");

  popupAlbumImage.src = albumImage.src;
  popupAlbumImage.alt = albumImage.alt;
  popupDescription.textContent = albumImage.alt;

  togglePopup(2);
}

//Форма отправки изменений в имени и описании профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  bioName.textContent = nameInput.value;
  bioDescription.textContent = jobInput.value;
  closePopups(0);
  }

//Форма добавления фотокарточки
function hundleAddCard(evt) {
    evt.preventDefault();
    const createCard = getElement({
      name: placeInput.value,
      link: linkInput.value
    });
    listContainer.prepend(createCard);
    closePopups(1);
    placeInput.value ='';
    linkInput.value ='';
  }

//Кнопки
profileBtn.addEventListener('click', ()=> togglePopup(0));
addCardBtn.addEventListener('click', ()=> togglePopup(1));
popupCloseBtn[0].addEventListener('click', ()=> closePopups(0));
popupCloseBtn[1].addEventListener('click', ()=> closePopups(1));
popupCloseBtn[2].addEventListener('click', ()=> closePopups(2));
formElement.addEventListener('submit', formSubmitHandler);
formImgCard.addEventListener('submit', hundleAddCard);

render();


