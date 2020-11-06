import './map.scss';
import 'leaflet/dist/leaflet.css';

import { Map as LMap, FeatureGroup, point } from 'leaflet';
import { NgwMap, LayerDefinition } from '@nextgis/ngw-map';
import MapAdapter from '@nextgis/leaflet-map-adapter';
import { InfoPanel } from '../info-panel/InfoPanel';
import { Legend } from '../legend/Legend';
import { FeatureFilter } from '../feature-filter/FeatureFilter';
import { AuthorLogo } from '../author-logo/AuthorLogo';
import { Fullscreen } from '../fullscreen-control/FullscreenControl';

import { MapOptions, Resource, styles } from '../../config';
import { ResourceAdapter } from '@nextgis/ngw-kit';
import { Feature } from 'geojson';

export class OilspillMap {
  authorLogo = new AuthorLogo({ id: 'author-logo' });
  wwfLogo = new AuthorLogo({ id: 'wwf-logo' });

  ngwMap: NgwMap<LMap>;
  infoPanel: InfoPanel;
  legend: Legend;
  featureFilter: FeatureFilter;

  constructor(private options: MapOptions) {
    this.renderMap();
  }

  async renderMap(): Promise<void> {
    const { resources, ...ngwMapOptions } = this.options.ngwMapOptions;
    this.ngwMap = await new NgwMap({
      mapAdapter: new MapAdapter(),
      ...ngwMapOptions,
    });

    // set Basemap
    // await this.ngwMap.addBaseLayer('TILE', {
    //   ...this.options.basemap,
    // });

    // add custom tools
    this.ngwMap.addControl(
      this.ngwMap.createToggleControl(
        new Fullscreen(this.ngwMap, {
          html: {
            on: '<a class="material-icons">fullscreen_exit</a>',
            off: '<a class="material-icons">fullscreen</a>',
          },
        })
      ),
      'top-left'
    );
    this.ngwMap.addControl(
      this.ngwMap.createButtonControl({
        html: '<a class="material-icons">home</a>',
        onClick: () => this.goHome(),
      }),
      'top-left'
    );
    this.ngwMap.onLoad('controls:create').then(() => {
      this.ngwMap.addControl(
        this.ngwMap.createControl(this.authorLogo),
        'bottom-right'
      );
    });
    this.ngwMap.addControl(
      this.ngwMap.createControl(this.wwfLogo),
      'bottom-left'
    );

    // add Legend
    this.legend = new Legend({ styles });
    this.ngwMap.addControl(
      this.ngwMap.createControl(this.legend, { margin: true }),
      'bottom-left'
    );

    // add Filter-list
    this.featureFilter = new FeatureFilter(this.ngwMap, {
      filters: [
        { type: 'prop', propName: 'name', label: 'Компания' },
        { type: 'prop', propName: 'date', label: 'Квартал' },
        { type: 'prop', propName: 'region', label: 'Регион' },
      ],
      onChange: (layers) => {
        this._zoomToFeatures(layers);
      },
    });
    this.ngwMap.addControl(
      this.ngwMap.createControl(this.featureFilter, { margin: true }),
      'bottom-left'
    );

    for (const r of resources) {
      const resource = await this.ngwMap.addNgwLayer(r);
      if (resource) {
        this.featureFilter.setLayer(resource);
        if (r.fit) {
          this.options.ngwMapOptions.center = this.ngwMap.getCenter();
          this.options.ngwMapOptions.zoom = this.ngwMap.getZoom();
        }
      }
    }
    this.ngwMap.emitter.on('layer:click', (e) => {
      if (e.selected) {
        const exist = resources.find((x) => x.id === e.layer.id);
        if (exist) {
          const adapter = e.layer as ResourceAdapter;
          this.highlightFeature(e.source, e.feature, adapter, exist);
        }
      } else {
        this.infoPanel.hide();
      }
    });

    // // add Info panel
    this.infoPanel = new InfoPanel({
      onClose: () => {
        this.unhighlightFeature();
      },
    });
    this.ngwMap.addControl(
      this.ngwMap.createControl(this.infoPanel, { margin: true }),
      'top-right'
    );
  }

  highlightFeature(
    e,
    feature: Feature,
    adapter: ResourceAdapter,
    mapLayer: Resource
  ): void {
    this.checkFeatureVisibility(e);
    this.infoPanel.show(feature, adapter.item.feature_layer.fields, mapLayer);
  }

  async unhighlightFeature() {
    const layers = await this.ngwMap.getNgwLayers();
    for (const t in layers) {
      this.ngwMap.unSelectLayer(layers[t].layer);
    }
  }

  checkFeatureVisibility(e): void {
    const map = this.ngwMap.mapAdapter.map;
    const mapWidth = this.ngwMap.getContainer().offsetWidth;
    const mapOffset =
      this.options.minOffsetRight - (mapWidth - e.containerPoint.x);
    let mapCenterPixels;
    let newMapCenterPixels;
    let newMapCenter;

    if (mapOffset > 0) {
      mapCenterPixels = map.latLngToContainerPoint(map.getCenter());

      newMapCenterPixels = point(
        mapCenterPixels.x + mapOffset,
        mapCenterPixels.y
      );
      newMapCenter = map.containerPointToLatLng(newMapCenterPixels);

      map.panTo(newMapCenter);
    }
  }

  goHome() {
    const fitLayerOpt = this.options.ngwMapOptions.resources.find((x) => x.fit);
    if (fitLayerOpt) {
      const fitLayer = this.ngwMap.getLayer(fitLayerOpt.id);
      if (fitLayer) {
        return this.ngwMap.fitLayer(fitLayer);
      }
    }
    this.ngwMap.setView(
      this.options.ngwMapOptions.center,
      this.options.ngwMapOptions.zoom
    );
  }

  _zoomToFeatures(layers: LayerDefinition[]) {
    if (layers && layers.length) {
      const layer = new FeatureGroup(layers.map((x) => x.layer));
      const bounds = layer.getBounds();
      this.ngwMap.mapAdapter.map.fitBounds(bounds, { maxZoom: 13 });
    }
  }
}
