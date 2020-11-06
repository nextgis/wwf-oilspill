import 'normalize.css/normalize.css';

import '../scss/main.scss';

import { OilspillMap } from '../blocks/OilspillMap/OilspillMap';
import { mapOptions } from './config';

export const map = new OilspillMap(mapOptions);
