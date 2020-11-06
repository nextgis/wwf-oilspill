import { MapOptions, paint, styles } from '../config';

export const mapOptions: MapOptions = {
  ngwMapOptions: {
    baseUrl: 'https://barents-kara-xprojects.nextgis.com',
    center: [60, 65],
    zoom: 4,
    resources: [
      {
        id: 'oilgas_es_pt',
        resourceId: 197,
        fit: true,
        meta: {
          popupFields: ['answer'],
          idField: 'idrec',
          detailUrl: '../../oilspill-docs/{id}.pdf',
        },
        adapterOptions: {
          selectable: true,
          unselectOnSecondClick: true,
          paint: (f) => paint(f),
          selectedPaint: (f) => paint(f, { selected: true }),
          propertiesFilter: [['delete', 'ne', 1]],
        },
      },
    ],
  },
  basemap: {
    url: 'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png',
    attribution:
      "&copy; <a href=http://osm.org/copyright'>OpenStreetMap</a> contributors;Спутник &copy; Ростелеком",
  },
  minOffsetRight: 460,

  styles: styles,
};
