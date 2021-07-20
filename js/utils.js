function getRandomPositiveFloat (min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// массив случайной длины из неповторяющихся значений. Взял с https://qna.habr.com/q/844269
const createRandomArray = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0]);

// Сообщение об успешой/неуспешной отправке формы
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


const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');


let successModal = null;
let errorModal = null;

const closeSuccessModal = () => {
  if (successModal !== null) {
    successModal.remove();
    successModal.removeEventListener('click', closeSuccessModal);
    successModal = null;
  }
};

const closeErrorModal = () => {
  if (errorModal !== null) {
    errorModal.remove();
    errorModal.removeEventListener('click', closeErrorModal);
    errorModal = null;
  }
};

const onSuccessModalKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessModal();
    document.removeEventListener('keydown', onSuccessModalKeydown);
  }
};

const onErrorModalKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorModal();
    document.removeEventListener('keydown', onErrorModalKeydown);
  }
};

const showSuccessCard = () => {
  successModal = successModalTemplate.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', successModal);
  successModal.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onSuccessModalKeydown);
};

const showErrorCard = () => {
  errorModal = errorModalTemplate.cloneNode(true);
  document.body.insertAdjacentElement('afterbegin', errorModal);
  errorModal.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onErrorModalKeydown);
};


export {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, createRandomArray, showAlert, showSuccessCard, showErrorCard};
