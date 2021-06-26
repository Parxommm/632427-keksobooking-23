/* eslint-disable no-undef */
import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, createRandomArray} from './utils.js';

const TYPES_OF_HOUSING = [
  {
    id: 'bungalow',
    display: 'Бунгало',
  },
  {
    id: 'flat',
    display: 'Квартира',
  },
  {
    id: 'hotel',
    display: 'Отель',
  },
  {
    id: 'house',
    display: 'Дом',
  },
  {
    id: 'palace',
    display: 'Дворец',
  },
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
];

const ALL_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAd = () => ({
  author: {
    avatar: `img/avatars/user0${getRandomPositiveInteger(1, 8)}.png`,
  },
  offer: {
    title: 'Заголовок объявления',
    address: `Широта: ${getRandomPositiveFloat(35.65000, 35.70000, 5)}, Долгота: ${getRandomPositiveFloat(139.70000, 139.80000, 5)}`,
    price: getRandomPositiveInteger(10000, 1000000),
    type: getRandomArrayElement(TYPES_OF_HOUSING),
    rooms: getRandomPositiveInteger(1, 100),
    guests: getRandomPositiveInteger(1, 100),
    checkin: getRandomArrayElement(CHECKIN_TIMES),
    checkout: getRandomArrayElement(CHECKOUT_TIMES),
    features: createRandomArray(ALL_FEATURES, 5),
    description: 'Описаие объявления',
    photos: createRandomArray(ALL_PHOTOS, 3),
  },
  location: {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  },
});

export {createAd};
