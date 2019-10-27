import 'normalize.css/normalize.css';

import '../scss/main.scss';

import { Map } from '../blocks/map/Map';
import { mapOptions } from './config';

export var map = new Map(mapOptions);
