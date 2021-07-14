const cardsList = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function createCard (object) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = object.author.avatar;
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${object.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = object.offer.type.display;
  cardElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = object.offer.description;

  //Проверка на наличие данных в блоке с описанием
  if (object.offer.description === '') {
    cardElement.querySelector('.popup__description').style.display = 'none';
  } else {
    cardElement.querySelector('.popup__description').textContent = object.offer.description;
  }

  //Создает список удобств
  if (Array.isArray(object.offer.features)) {
    const modifiers = object.offer.features.map((feature) => `popup__feature--${feature}`);
    cardElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (! modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').style.display = 'none';
  }

  // Добавляет фото
  if (Array.isArray(object.offer.photos)) {
    object.offer.photos.forEach((photo) => {
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
}

export {createCard, cardsList};
