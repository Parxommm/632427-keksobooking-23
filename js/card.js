import {createAds} from './data.js';

const cardsList = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = createAds();

similarAds.forEach((adElement) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = adElement.author.avatar;
  cardElement.querySelector('.popup__title').textContent = adElement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adElement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${adElement.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = adElement.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = `${adElement.offer.rooms} комнаты для ${adElement.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adElement.offer.checkin}, выезд до ${adElement.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = adElement.offer.description;

  //Создает список удобств
  const modifiers = adElement.offer.features.map((feature) => `popup__feature--${feature}`);
  cardElement.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (! modifiers.includes(modifier)) {
      item.remove();
    }
  });

  // Добавляет фото
  const photoCardElement = document.createElement('img');
  photoCardElement.classList.add('popup__photo');
  photoCardElement.width = 45;
  photoCardElement.height = 40;
  photoCardElement.alt = 'Фотография жилья';
  adElement.offer.photos.forEach((photo) => {
    photoCardElement.src = photo;
    cardElement.querySelector('.popup__photos').appendChild(photoCardElement);
  });

  cardsList.appendChild(cardElement);
});

