const Settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const disableButton = (buttonEl, inactiveButtonClass) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(inactiveButtonClass);
}

const enableButton = (buttonEl, inactiveButtonClass) => {
  buttonEl.disabled = false;
  buttonEl.classList.remove(inactiveButtonClass);
}

const showError = (Settings, inputEl, errorElement) => {
  errorElement.classList.add(Settings.errorClass);
  inputEl.classList.add(Settings.inputErrorClass);
}

const hideError = (Settings, inputEl, errorElement) => {
  errorElement.classList.remove(Settings.errorClass);
  inputEl.classList.remove(Settings.inputErrorClass);
}



const invalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

const toggleButton = (inputList, buttonEl, inactiveButtonClass) => {
  if (invalidInput(inputList)) {
    disableButton(buttonEl, inactiveButtonClass);
  } else {
    enableButton(buttonEl, inactiveButtonClass);
  }
};


const validateInput = (Settings, formElement, inputEl) => {
  const errorNode = inputEl.parentNode.querySelector(`#${inputEl.id}-error`);
  if (!inputEl.validity.valid) {
    errorNode.textContent = inputEl.validationMessage;
    showError(Settings, inputEl, errorNode);
  } else {
    errorNode.textContent = '';
    hideError(Settings, inputEl, errorNode);
  }
}

const setEventListeners = (Settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(Settings.inputSelector));
  const buttonEl = formElement.querySelector(Settings.submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      validateInput(Settings, formElement, inputEl);
      toggleButton(inputList, buttonEl, Settings.inactiveButtonClass);
     });
  });
}

const enableValidation = (Settings) => {
  const formList = Array.from(document.querySelectorAll(Settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(Settings, formElement);
  });
}

enableValidation(Settings);