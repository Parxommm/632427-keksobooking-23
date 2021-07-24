import {typesOfHousingKeys, typesOfHousingValues} from './utils.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCard = (object) => {
  const cardElement = cardTemplate.cloneNode(true);
  const housingType = object.offer.type;
  const housingTypePopupText = cardElement.querySelector('.popup__type');
  const cardDescription = cardElement.querySelector('.popup__description');
  const housingDescription = object.offer.description;
  const housingFeatures = object.offer.features;
  const housingPhotos = object.offer.photos;

  cardElement.querySelector('.popup__avatar').src = object.author.avatar;
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${object.offer.price} ₽/ночь`;

  if (housingType === typesOfHousingKeys[0]) {
    housingTypePopupText.textContent = typesOfHousingValues[0];
  } else if (housingType === typesOfHousingKeys[1]) {
    housingTypePopupText.textContent = typesOfHousingValues[1];
  } else if (housingType === typesOfHousingKeys[2]) {
    housingTypePopupText.textContent = typesOfHousingValues[2];
  } else if (housingType === typesOfHousingKeys[3]) {
    housingTypePopupText.textContent = typesOfHousingValues[3];
  } else if(housingType === typesOfHousingKeys[4]) {
    housingTypePopupText.textContent = typesOfHousingValues[4];
  }

  cardElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;

  cardDescription.textContent = housingDescription;

  //Проверка на наличие данных в блоке с описанием
  if (housingDescription === '') {
    cardDescription.style.display = 'none';
  }


  //Создает список удобств
  if (Array.isArray(housingFeatures)) {
    const modifiers = housingFeatures.map((feature) => `popup__feature--${feature}`);
    cardElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (! modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
  cardElement.querySelector('.popup__features').style.display = 'none';

  // Добавляет фото
  if (Array.isArray(housingPhotos)) {
    housingPhotos.forEach((photo) => {
      const photoCardElement = document.createElement('img');
      photoCardElement.classList.add('popup__photo');
      photoCardElement.width = 45;
      photoCardElement.height = 40;
      photoCardElement.alt = 'Фотография жилья';
      photoCardElement.src = photo;
      cardElement.querySelector('.popup__photos').appendChild(photoCardElement);
    });
  }

  return cardElement;
};

export {createCard};
