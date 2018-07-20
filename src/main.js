import { Map } from './blocks/map/Map';

import 'normalize.css/normalize.css';
import 'leaflet/dist/leaflet.css';

import './scss/main.scss';

export var map = new Map({
  mapConfig: window.mapConfig
});


