import {showAlert} from './utils.js';
import {addAllOffers, TokyoCenter, clearMarkers} from './map.js';
import {adForm, setAddress} from './form.js';
import {setChangeCallback, getFilteredAds} from './filter.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;

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
      const addFilteredAds = () => {
        clearMarkers();
        addAllOffers(getFilteredAds(ads));
      };
      setChangeCallback(debounce(addFilteredAds, RERENDER_DELAY));
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
        setAddress(TokyoCenter);
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red', '1500px');
      }
    }).catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз', 'red', '1500px');
    });
  });
};

export {getData, sendData};
