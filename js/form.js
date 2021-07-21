/* eslint-disable id-length */
import {TokyoCenter, resetMap} from './map.js';

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacitySelectOptions = document.querySelectorAll('#capacity option');
const filtersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const filtersFormElements = filtersForm.children;
const adFormElements = adForm.children;
const typeOfHousingSelect = document.querySelector('#type');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

// Неактивное состояние формы
const inactivateForm = () => {
  filtersForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < filtersFormElements.length; i++) {
    filtersFormElements[i].disabled = true;
  }
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = true;
  }
};

// Активное состояние формы
const activateForm = () => {
  filtersForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < filtersFormElements.length; i++) {
    filtersFormElements[i].disabled = false;
  }
  for (let i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = false;
  }
};

// Синхронизация типа жилья с минимальной ценой
const changeMinPrice = () => {
  if (typeOfHousingSelect.value === 'bungalow') {
    priceInput.min = 0;
    priceInput.placeholder ='0';
  } else if (typeOfHousingSelect.value === 'flat') {
    priceInput.min = 1000;
    priceInput.placeholder ='1000';
  } else if (typeOfHousingSelect.value === 'hotel') {
    priceInput.min = 3000;
    priceInput.placeholder ='3000';
  } else if (typeOfHousingSelect.value === 'house') {
    priceInput.min = 5000;
    priceInput.placeholder ='5000';
  } else if (typeOfHousingSelect.value === 'palace') {
    priceInput.min = 10000;
    priceInput.placeholder ='10000';
  }
};

typeOfHousingSelect.addEventListener('change', changeMinPrice);

// Синхронизация времени заезда и выезда
const changeTimeoutSelect = () => {
  timeoutSelect.value = timeinSelect.value;
};

const changeTimeinSelect = () => {
  timeinSelect.value = timeoutSelect.value;
};

timeinSelect.addEventListener('change', changeTimeoutSelect);
timeoutSelect.addEventListener('change', changeTimeinSelect);

// Валидация поля заголовка
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const checkValidityTitle = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

// Валидация поля цены за ночь
const checkValidityPrice = () => {
  const valuePrice = priceInput.value;

  if (valuePrice < +priceInput.min) {
    priceInput.setCustomValidity(`Минимальная цена ${ priceInput.min } руб.`);
  } else if (valuePrice > +priceInput.max) {
    priceInput.setCustomValidity(`Максимальная цена ${ priceInput.max } руб.`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
};

// Валидация количества комнат и количества мест
const checkValidityRoomNumberCapacity = () => {
  const numberOfRooms = roomNumberSelect.value;
  capacitySelectOptions.forEach((element) => {
    element.disabled = true;
  });
  if (numberOfRooms === '1') {
    capacitySelectOptions.forEach((element) => {
      if (element.value === '1') {
        element.disabled = false;
        capacitySelect.value = '1';
      }
    });
  } else if (numberOfRooms === '2') {
    capacitySelectOptions.forEach((element) => {
      if (element.value === '1' || element.value === '2') {
        element.disabled = false;
        capacitySelect.value = '1';
      }
    });
  } else if (numberOfRooms === '3') {
    capacitySelectOptions.forEach((element) => {
      if (element.value === '1' || element.value === '2' || element.value === '3') {
        element.disabled = false;
        capacitySelect.value = '1';
      }
    });
  } else if (numberOfRooms === '100') {
    capacitySelectOptions.forEach((element) => {
      if (element.value === '0') {
        element.disabled = false;
        capacitySelect.value = '0';
      }
    });
  }
};

const checkValidity = () => {
  titleInput.addEventListener('input', checkValidityTitle);
  priceInput.addEventListener('input', checkValidityPrice);
  document.addEventListener('DOMContentLoaded', checkValidityRoomNumberCapacity); //вызывается для того что бы функция сработала сразу после загрузки страницы
  roomNumberSelect.addEventListener('change', checkValidityRoomNumberCapacity);
};

const setAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

setAddress(TokyoCenter);

// Очистка формы по кнопке "очистить"
const resetForm = () => {
  filtersForm.reset();
  adForm.reset();
  changeMinPrice();
  resetMap();
  setAddress(TokyoCenter);
};

resetButton.addEventListener('click', resetForm);


export {checkValidity, inactivateForm, activateForm, setAddress, resetForm, adForm};
