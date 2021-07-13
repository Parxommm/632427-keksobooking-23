import {showAlert} from './utils.js';
import {addAllOffers} from './map.js';
import {adForm, setAddress} from './form.js';

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Данные не загружены', 'red', 0);
      }
    }).then((ads) => {
      addAllOffers(ads);
    })
    .catch(() => {
      showAlert('Данные не загружены', 'red', 0);
    });
};


const sendData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        showAlert('Форма отправлена.', 'green', '1500px');
        adForm.reset();
        setAddress({
          lat:35.6938,
          lng: 139.7034,
        });
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red', '1500px');
      }
    }).catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red', '1500px');
    });
  });
};

export {getData, sendData};
