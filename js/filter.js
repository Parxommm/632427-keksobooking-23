/* eslint-disable arrow-body-style */
const adsFilter = document.querySelector('.map__filters');

const FILTER_PRICES = [10000, 50000];
const PRICE_CATEGORY = ['low', 'middle', 'high'];
const anyOptions = 'any';


const filterByType = (ads) => {
  const valueFilterByType = adsFilter['housing-type'].value;
  return valueFilterByType === anyOptions || valueFilterByType === ads.offer.type;
};

const filterByRooms = (ads) => {
  const valueFilterByRooms = adsFilter['housing-rooms'].value;
  return valueFilterByRooms === anyOptions || +valueFilterByRooms === ads.offer.rooms;
};
const filterByGuests = (ads) => {
  const valueFilterByGuests = adsFilter['housing-guests'].value;
  return valueFilterByGuests === anyOptions || +valueFilterByGuests === ads.offer.guests;
};

const filterByPrice = (ads) => {
  const valueFilterByPrice = adsFilter['housing-price'].value;
  if (valueFilterByPrice === anyOptions) {
    return true;
  }
  switch (valueFilterByPrice) {
    case PRICE_CATEGORY[0]:
      if (ads.offer.price <= FILTER_PRICES[0]) {
        return true;
      }
      break;
    case PRICE_CATEGORY[1]:
      if (ads.offer.price >= FILTER_PRICES[0] && ads.offer.price <= FILTER_PRICES[1]) {
        return true;
      }
      break;
    case PRICE_CATEGORY[2]:
      if (ads.offer.price >= FILTER_PRICES[1]) {
        return true;
      }
      break;
  }
};

const filterByFeatures = (choosed, ads) => {
  const housingFeatures = ads.offer.features;
  if (choosed.length === 0) {
    return true;
  } else if (housingFeatures) {
    if (choosed.every((feature) => housingFeatures.includes(feature))) {
      return true;
    }
  }
};


const setChangeCallback = (callback) => {
  adsFilter.addEventListener('change', callback);
};

const getFilteredAds = (ads) => {
  const choosedFeatures = new FormData(adsFilter).getAll('features');
  const filteredAds =  ads.filter((ad) => filterByType(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByPrice(ad) && filterByFeatures(choosedFeatures, ad));
  return filteredAds;
};


export {setChangeCallback, getFilteredAds};

