import { NgwMapOptions as NMO, NgwLayerOptions } from '@nextgis/ngw-map';
import { Feature } from 'geojson';
import { CirclePaint, VectorAdapterLayerPaint } from '@nextgis/paint';

export interface ResourceMeta {
  popupFields: string[];
  idField: string;
  detailUrl: string;
}

export type Resource = NgwLayerOptions<'GEOJSON', ResourceMeta>;

export interface NgwMapOptions extends NMO {
  resources: Resource[];
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
  style: CirclePaint;
  hoverStyle: CirclePaint;
}

export const styles: Styles[] = [
  {
    property: 'type',
    label: 'спорные ситуации',
    value: 'спорная ситуация',
    style: {
      fillColor: '#7b4ea9',
    },
    hoverStyle: {
      fillColor: '#660bc3',
    },
  },
  {
    property: 'type',
    label: 'аварийные ситуации',
    value: 'аварийная ситуация',
    style: {
      fillColor: '#a84d4d',
    },
    hoverStyle: {
      fillColor: '#c30b0b',
    },
  },
  {
    property: 'type',
    label: 'аварийные и спорные ситуации',
    value: 'аварийная ситуация + спорная ситуация',
    style: {
      fillColor: '#a94e92',
    },
    hoverStyle: {
      fillColor: '#984683',
    },
  },
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

export const defPaint = (selected: boolean): VectorAdapterLayerPaint => {
  return {
    radius: selected ? 7 : 5,
    fillOpacity: 1,
    weight: selected ? 4 : 2,
    fillColor: '#ffffff',
    strokeColor: '#ffffff',
    strokeOpacity: 0.6,
    stroke: true,
  };
};

export function createPaint(
  properties: Record<string, unknown>,
  opt: { selected: boolean } = { selected: false }
): VectorAdapterLayerPaint {
  const p = defPaint(opt.selected);
  const style = styles.find((x) => properties[x.property] === x.value);
  if (style) {
    const s = opt.selected ? style.hoverStyle : style.style;
    return { ...p, ...s };
  }
  return p;
}

export function paint(
  feature: Feature,
  opt: { selected: boolean } = { selected: false }
): VectorAdapterLayerPaint {
  return createPaint(feature.properties, opt);
}

export const mapOptions: MapOptions = {
  ngwMapOptions: {
    qmsId: 2550,
    baseUrl: 'https://barents-kara-xprojects.nextgis.com',
    center: [60, 65],
    zoom: 4,
    resources: [
      {
        id: 'oilgas_es_pt',
        resourceId: 199,
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
  // basemap: {
  //   url: 'http://tiles.maps.sputnik.ru/tiles/kmt2/{z}/{x}/{y}.png',
  //   attribution:
  //     "&copy; <a href=http://osm.org/copyright'>OpenStreetMap</a> contributors;Спутник &copy; Ростелеком",
  // },
  minOffsetRight: 460,

  styles,
};
