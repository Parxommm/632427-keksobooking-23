const adsFilter = document.querySelector('.map__filters');


const filterByType = function (ads) {
  return adsFilter['housing-type'].value === 'any' || adsFilter['housing-type'].value === ads.offer.type;
};

const filterByRooms = function (ads) {
  return adsFilter['housing-rooms'].value === 'any' || +adsFilter['housing-rooms'].value === ads.offer.rooms;
};
const filterByGuests = function (ads) {
  return adsFilter['housing-guests'].value === 'any' || +adsFilter['housing-guests'].value === ads.offer.guests;
};

const filterByPrice = function (ads) {
  if (adsFilter['housing-price'].value === 'any') {
    return true;
  } else {
    switch (adsFilter['housing-price'].value) {
      case 'low':
        if (ads.offer.price <= 10000) {
          return true;
        }
        break;
      case 'middle':
        if (ads.offer.price >= 10000 && ads.offer.price <= 50000) {
          return true;
        }
        break;
      case 'high':
        if (ads.offer.price >= 50000) {
          return true;
        }
        break;
    }
  }
};

const filterByFeatures = function (choosed, ads) {
  if (choosed.length === 0) {
    return true;
  } else if (ads.offer.features) {
    if (choosed.every((feature) => ads.offer.features.includes(feature))) {
      return true;
    }
  }
};


const setChangeCallback = function (callback) {
  adsFilter.addEventListener('change', callback);
};

const getFilteredAds = function (ads) {
  const choosedFeatures = new FormData(adsFilter).getAll('features');
  const filteredAds =  ads.filter((ad) => filterByType(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByPrice(ad) && filterByFeatures(choosedFeatures, ad));
  return filteredAds;
};


export {setChangeCallback, getFilteredAds};

