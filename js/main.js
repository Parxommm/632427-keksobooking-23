/* eslint-disable no-unused-vars */
import {createAd} from './data.js';
import {createCard} from './card.js';
import {checkValidity} from './form.js';

const SIMILAR_COUNT = 10;
const createAds = () => new Array(SIMILAR_COUNT).fill(null).map(() => createAd());

createCard(createAds());
checkValidity();
