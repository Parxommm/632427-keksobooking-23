import {setAddress} from './form.js';
import {createCard} from './card.js';
import {getData} from './api.js';

const SIMILAR_MARKER_COUNT = 10;

const TokyoCenter = {
  lat:35.68168,
  lng: 139.75387,
};

const map = L.map('map-canvas')
  .on('load', getData)
  .setView(TokyoCenter, 13);

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
  TokyoCenter,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const addOneOffer = (createAd) => {
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
    .addTo(markerGroup)
    .bindPopup(
      createCard(createAd),
    );
};

const addAllOffers = (createAds) => {
  createAds.slice(0, SIMILAR_MARKER_COUNT).forEach((element) => {
    addOneOffer(element);
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const resetMap = () => {
  clearMarkers();
  mainPinMarker.setLatLng(TokyoCenter);
  map.setView(TokyoCenter, 13);
  getData();
};

export {addAllOffers, TokyoCenter, clearMarkers, resetMap};
