/* eslint-disable id-length */
import {TokyoCenter, resetMap} from './map.js';
import {typesOfHousingKeys} from './utils.js';

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

const MIN_PRICES_FOR_HOUSING = [0, 1000, 3000, 5000, 10000];
const NUMBER_OF_ROOMS = ['1', '2', '3', '100'];
const NUMBER_OF_GUESTS = ['0', '1', '2', '3'];


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
  if (typeOfHousingSelect.value === typesOfHousingKeys[0]) {
    priceInput.min = MIN_PRICES_FOR_HOUSING[0];
    priceInput.placeholder =MIN_PRICES_FOR_HOUSING[0];
  } else if (typeOfHousingSelect.value === typesOfHousingKeys[1]) {
    priceInput.min = MIN_PRICES_FOR_HOUSING[1];
    priceInput.placeholder =MIN_PRICES_FOR_HOUSING[1];
  } else if (typeOfHousingSelect.value === typesOfHousingKeys[2]) {
    priceInput.min = MIN_PRICES_FOR_HOUSING[2];
    priceInput.placeholder =MIN_PRICES_FOR_HOUSING[2];
  } else if (typeOfHousingSelect.value === typesOfHousingKeys[3]) {
    priceInput.min = MIN_PRICES_FOR_HOUSING[3];
    priceInput.placeholder =MIN_PRICES_FOR_HOUSING[3];
  } else if (typeOfHousingSelect.value === typesOfHousingKeys[4]) {
    priceInput.min = MIN_PRICES_FOR_HOUSING[4];
    priceInput.placeholder =MIN_PRICES_FOR_HOUSING[4];
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
  }
  titleInput.setCustomValidity('');

  titleInput.reportValidity();
};

// Валидация поля цены за ночь
const checkValidityPrice = () => {
  const valuePrice = priceInput.value;

  if (valuePrice < +priceInput.min) {
    priceInput.setCustomValidity(`Минимальная цена ${ priceInput.min } руб.`);
  } else if (valuePrice > +priceInput.max) {
    priceInput.setCustomValidity(`Максимальная цена ${ priceInput.max } руб.`);
  }
  priceInput.setCustomValidity('');

  priceInput.reportValidity();
};

// Валидация количества комнат и количества мест
const checkValidityRoomNumberCapacity = () => {
  const numberOfRooms = roomNumberSelect.value;
  capacitySelectOptions.forEach((element) => {
    element.disabled = true;
  });
  if (numberOfRooms === NUMBER_OF_ROOMS[0]) {
    capacitySelectOptions.forEach((element) => {
      if (element.value === NUMBER_OF_GUESTS[1]) {
        element.disabled = false;
        capacitySelect.value = NUMBER_OF_GUESTS[1];
      }
    });
  } else if (numberOfRooms === NUMBER_OF_ROOMS[1]) {
    capacitySelectOptions.forEach((element) => {
      if (element.value === NUMBER_OF_GUESTS[1] || element.value === NUMBER_OF_GUESTS[2]) {
        element.disabled = false;
        capacitySelect.value = NUMBER_OF_GUESTS[1];
      }
    });
  } else if (numberOfRooms === NUMBER_OF_ROOMS[2]) {
    capacitySelectOptions.forEach((element) => {
      if (element.value === NUMBER_OF_GUESTS[1] || element.value === NUMBER_OF_GUESTS[2] || element.value === NUMBER_OF_GUESTS[3]) {
        element.disabled = false;
        capacitySelect.value = NUMBER_OF_GUESTS[1];
      }
    });
  } else if (numberOfRooms === NUMBER_OF_ROOMS[3]) {
    capacitySelectOptions.forEach((element) => {
      if (element.value === NUMBER_OF_GUESTS[0]) {
        element.disabled = false;
        capacitySelect.value = NUMBER_OF_GUESTS[0];
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
