/* eslint-disable no-unused-vars */
import {createAd} from './data.js';
import {createCard, cardsList} from './card.js';
import {checkValidity} from './form.js';

// Может бить функцию createAds тоже нужно написать в data.js, а потом импортировать ее в card.js
// и там уже написать функцию createCards и импортировать ее сюда? Как лучше?
const SIMILAR_COUNT = 10;
const createAds = () => new Array(SIMILAR_COUNT).fill(null).map(() => createAd());

function createCards(arr, container) {
  arr.forEach((item) => container.append(createCard(item)));
}

createCards(createAds(), cardsList);
checkValidity();

