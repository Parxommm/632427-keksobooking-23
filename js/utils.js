// Сообщение об успешой/неуспешной отправке формы
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

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


const isEscEvent = (evt) => {
  evt.key === 'Escape' || evt.key === 'Esc';
};

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


export {showAlert, showSuccessCard, showErrorCard};
