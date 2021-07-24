/* eslint-disable no-use-before-define */
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const successElement = successModalTemplate.cloneNode(true);
const errorElement = errorModalTemplate.cloneNode(true);
const closeErrorButton = errorElement.querySelector('.error__button');

const TYPES_OF_HOUSING = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const typesOfHousingKeys = Object.keys(TYPES_OF_HOUSING);
const typesOfHousingValues = Object.values(TYPES_OF_HOUSING);

// Сообщение об ошибке загрузки данных
const showAlert = (message, color, top) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = top;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

// eslint-disable-next-line arrow-body-style
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

// Сообщение об успешной отправке формы
const closeSuccessModal = () => {
  successElement.remove();
  document.removeEventListener('keydown', onEscCloseSuccessModal);
  successElement.removeEventListener('click', onClickCloseSuccessModal);
};

const  onEscCloseSuccessModal = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessModal();
  }
};

const onClickCloseSuccessModal = () => {
  closeSuccessModal();
};

const openSuccessModal = () => {
  document.body.appendChild(successElement);
  document.addEventListener('keydown', onEscCloseSuccessModal);
  successElement.addEventListener('click', onClickCloseSuccessModal);
};


// Сообщение при отправке формф с ошибкой
const closeErrorModal = () => {
  errorElement.remove();
  document.removeEventListener('keydown', onEscCloseErrorModal);
  errorElement.removeEventListener('click', onClickCloseErrorModal);
  closeErrorButton.removeEventListener('click', onClickCloseErrorModal);
};

const  onEscCloseErrorModal = (evt) => {
  if (isEscEvent(evt)) {
    closeErrorModal();
  }
};

const onClickCloseErrorModal = () => {
  closeErrorModal();
};

const openErrorModal = () => {
  document.body.appendChild(errorElement);
  document.addEventListener('keydown', onEscCloseErrorModal);
  errorElement.addEventListener('click', onClickCloseErrorModal);
  closeErrorButton.addEventListener('click', onClickCloseErrorModal);
};

export {typesOfHousingKeys, typesOfHousingValues, showAlert, openSuccessModal, openErrorModal};
