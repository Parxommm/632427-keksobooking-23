/* eslint-disable no-unused-vars */
import {createAd} from './data.js';
import {createCard, cardsList} from './card.js';
import {checkValidity, inactivateForm, activateForm} from './form.js';
import {getData, sendData} from './api.js';

const SIMILAR_COUNT = 10;
const createAds = () => new Array(SIMILAR_COUNT).fill(null).map(() => createAd());

function createCards(arr, container) {
  arr.forEach((item) => container.append(createCard(item)));
}

// createCards(createAds(), cardsList);

// inactivateForm();

checkValidity();

// addAllOffers(createAds());

getData();
sendData();
