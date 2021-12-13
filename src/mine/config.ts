import { Feature } from 'geojson';
import { VectorAdapterLayerPaint } from '@nextgis/paint';
import { MapOptions, paint, styles } from '../config';

export const mapOptions: MapOptions = {
  ngwMapOptions: {
    osm: true,
    baseUrl: 'https://barents-kara-xprojects.nextgis.com',
    center: [60, 65],
    zoom: 4,
    resources: [
      {
        id: 'oilgas_es_pt',
        resource: 197,
        fit: true,
        meta: {
          popupFields: ['answer'],
          idField: 'idrec',
          detailUrl: 'https://nextgis.ru/demo/oilspill-docs/{id}.pdf',
        },
        adapterOptions: {
          waitFullLoad: true,
          selectable: true,
          unselectOnSecondClick: true,
          paint: (f: Feature): VectorAdapterLayerPaint => paint(f),
          selectedPaint: (f: Feature): VectorAdapterLayerPaint =>
            paint(f, { selected: true }),
          propertiesFilter: [['delete', 'ne', 1]],
        },
      },
    ],
  },

  minOffsetRight: 460,

  styles: styles,
};
