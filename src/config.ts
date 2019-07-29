import { NgwMapOptions as NMO, NgwLayerOptions, VectorAdapterLayerPaint, Paint } from '@nextgis/ngw-map';
import { Feature } from 'geojson';

export interface ResourceMeta {
  popupFields: string[];
  idField: string;
  detailUrl: string;
}

export interface NgwMapOptions extends NMO {
  resources: Array<NgwLayerOptions<'GEOJSON', ResourceMeta>>;
}

export interface MapOptions {
  ngwMapOptions: NgwMapOptions;
  basemap?: {
    url: string;
    attribution?: string;
  };
  minOffsetRight?: number;
  styles: Styles[];
}

export interface Styles {
  property: string;
  label: string;
  value: string;
  style: Paint;
  hoverStyle: Paint;
}

const styles: Styles[] = [
  {
    property: 'type',
    label: 'спорные ситуации',
    value: 'спорная ситуация',
    style: {
      fillColor: '#7b4ea9'
    },
    hoverStyle: {
      fillColor: '#660bc3'
    }
  },
  {
    property: 'type',
    label: 'аварийные ситуации',
    value: 'аварийная ситуация',
    style: {
      fillColor: '#a84d4d'
    },
    hoverStyle: {
      fillColor: '#c30b0b'
    }
  },
  {
    property: 'type',
    label: 'аварийные и спорные ситуации',
    value: 'аварийная ситуация + спорная ситуация',
    style: {
      fillColor: '#a94e92'
    },
    hoverStyle: {
      fillColor: '#984683'
    }
  }
  // {
  //   property: "type",
  //   label: "инцидент",
  //   value: "инцидент",
  //   "style": {
  //     radius: 5,
  //     fillOpacity: 1,
  //     weight: 2,
  //     color: "#ffffff",
  //     fillColor: "#2F4F4F",
  //     opacity: .6,
  //     fillRule: "nonzero"
  //   },
  //   "hoverStyle": {
  //     radius: 7,
  //     fillOpacity: 1,
  //     weight: 4,
  //     color: "#ffffff",
  //     fillColor: "#000000",
  //     opacity: .4,
  //     fillRule: "nonzero"
  //   }
  // }
];

function paint(feature: Feature, opt: { selected: boolean } = { selected: false }): VectorAdapterLayerPaint {
  const p = {
    radius: opt.selected ? 7 : 5,
    fillOpacity: 1,
    weight: opt.selected ? 4 : 2,
    fillColor: '#ffffff',
    strokeColor: '#ffffff',
    strokeOpacity: 0.6,
    stroke: true
  };
  const style = styles.find(x => feature.properties[x.property] === x.value);
  if (style) {
    const s = opt.selected ? style.hoverStyle : style.style;
    return { ...p, ...s };
  }
  return p;
}

export const mapOptions: MapOptions = {
  ngwMapOptions: {
    baseUrl: 'https://barents-kara-xprojects.nextgis.com',
    center: [60, 65],
    zoom: 4,
    resources: [
      {
        id: 'oilgas_es_pt',
        resourceId: 190,
        fit: true,
        meta: {
          popupFields: ['answer'],
          idField: 'idrec',
          detailUrl: '../../oilspill-docs/{id}.pdf'
        },
        adapterOptions: {
          selectable: true,
          paint: f => paint(f),
          selectedPaint: f => paint(f, { selected: true })
        }
      }
    ]
  },
  basemap: {
    url: 'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png',
    attribution: "&copy; <a href=http://osm.org/copyright'>OpenStreetMap</a> contributors;Спутник &copy; Ростелеком"
  },
  minOffsetRight: 460,

  styles
};