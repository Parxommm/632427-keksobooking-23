const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacitySelectOptions = document.querySelectorAll('#capacity option');

// Валидация поля заголовка
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

function checkValidityTitle () {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
}

// Валидация поля цены за ночь
function checkValidityPrice () {
  const valuePrice = priceInput.value;

  if (valuePrice < +priceInput.min) {
    priceInput.setCustomValidity(`Минимальная цена ${ priceInput.min } руб.`);
  } else if (valuePrice > +priceInput.max) {
    priceInput.setCustomValidity(`Максимальная цена ${ priceInput.max } руб.`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

// Валидация количества комнат и количества мест
function checkValidityRoomNumberCapacity () {
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
}

function checkValidity () {
  titleInput.addEventListener('input', checkValidityTitle);
  priceInput.addEventListener('input', checkValidityPrice);
  document.addEventListener('DOMContentLoaded', checkValidityRoomNumberCapacity); //вызывается для того что бы функция сработала сразу после загрузки страницы
  roomNumberSelect.addEventListener('change', checkValidityRoomNumberCapacity);
}

export {checkValidity};
