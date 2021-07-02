import {activateForm, setAddress} from './form.js';
import {createCard} from './card.js';

const TokyoCenter = {
  lat:35.6938,
  lng: 139.7034,
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(); //Почему не работает, не могу разобраться?
  })
  .setView(TokyoCenter, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

setAddress(TokyoCenter);

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function addOneOffer(createAd) {
  const pinMarker = L.marker(
    {
      lat: createAd.location.lat,
      lng: createAd.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  pinMarker
    .addTo(map)
    .bindPopup(
      createCard(createAd),
    );
}

function addAllOffers(createAds) {
  createAds.forEach((element) => {
    addOneOffer(element);
  });
}

export {addAllOffers};
