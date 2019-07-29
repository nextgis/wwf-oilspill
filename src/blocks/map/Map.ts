import NgwMap from '@nextgis/ngw-map';
import MapAdapter from '@nextgis/leaflet-map-adapter';
// import { InfoPanel } from '../info-panel/InfoPanel';
// import { Legend } from '../legend/Legend';
// import { FeatureFilter } from '../feature-filter/FeatureFilter';
import { AuthorLogo } from '../author-logo/AuthorLogo';
// import '../home-control/HomeControl';
import { Fullscreen } from '../fullscreen-control/FullscreenControl';

import 'leaflet/dist/leaflet.css';
import { MapOptions } from '../../config';

// import './map.scss';

export class Map {
  authorLogo = new AuthorLogo({ id: 'author-logo' });
  wwfLogo = new AuthorLogo({ id: 'wwf-logo' });

  ngwMap: NgwMap;

  constructor(private options: MapOptions) {
    this.renderMap();
  }

  async renderMap() {
    this.ngwMap = await new NgwMap(new MapAdapter(), this.options.ngwMapOptions);

    // that.map = new L.Map('map', {
    //   homeControl: true,
    //   homeControlOptions: {
    //     map: this
    //   },
    //   fullscreenControl: true,
    //   fullscreenControlOptions: {
    //     position: 'topleft'
    //   }
    // })

    // set Basemap
    // L.tileLayer(that.mapConfig.basemap.url, {
    //   attribution: that.mapConfig.basemap.attribution
    // }).addTo(that.map);

    // add custom tools
    this.ngwMap.addControl(
      this.ngwMap.createToggleControl(
        new Fullscreen(this.ngwMap, {
          html: {
            on: '<a class="material-icons">fullscreen_exit</a>',
            off: '<a class="material-icons">fullscreen</a>'
          }
        })
      ),
      'top-left'
    );

    this.ngwMap.addControl(this.ngwMap.createControl(this.authorLogo), 'bottom-right');
    this.ngwMap.addControl(this.ngwMap.createControl(this.wwfLogo), 'bottom-left');

    // add Legend
    // that.legend = new Legend({ styles: that.mapConfig.styles }).addTo(that.map);

    // // add Filter-list
    // that.featureFilter = new FeatureFilter({
    //   filters: [
    //     { type: 'prop', propName: 'name', label: 'Компания' },
    //     { type: 'prop', propName: 'date', label: 'Квартал' },
    //     { type: 'prop', propName: 'region', label: 'Регион' }
    //   ],
    //   onChange: function(layers) {
    //     that._zoomToFeatures(layers);
    //   }
    // }).addTo(that.map);

    // // add Info panel
    // that.infoPanel = new InfoPanel().addTo(that.map);
    // L.DomEvent.on(that.infoPanel.closer, 'click', function() {
    //   that.unhighlightFeature(that.selectedLayer, that.selectedLayerInitStyle);
    // });
  }

  // addLayer(mapLayer) {
  //   var that = this;

  //   var defIcon = new L.Icon.Default();
  //   defIcon.options.iconSize = [28, 40];

  //   // Set alias
  //   this.apiConnector.connect(mapLayer.id, function (data) {
  //     mapLayer.fieldNames = data.feature_layer.fields;
  //     loadGeojson();
  //   });

  //   // Load GeoJSON
  //   var loadGeojson = function () {
  //     that.apiConnector.geojson(mapLayer.id, function (data) {
  //       that._onGeojsonLoad(data, mapLayer);
  //     });
  //   };
  // }

  // _onGeojsonLoad(data, mapLayer) {
  //   var that = this;
  //   var crs3857 = new LProj.CRS('EPSG:3857');
  //   that.geojson = L.geoJson(data, {
  //     coordsToLatLng: function (coords) {
  //       var point = L.point(coords[0], coords[1]);
  //       return crs3857.projection.unproject(point);
  //     },
  //     pointToLayer: function (feature, latlng) {
  //       return L.circleMarker(latlng); //, {icon: defIcon});
  //     },
  //     onEachFeature: function (feature, layer) {
  //       that.setStyle(layer);
  //       layer.on({
  //         click: function (e) {
  //           that.highlightFeature(e, layer, mapLayer);
  //         }
  //       });
  //       // that.setFeatureLayerPopup(feature, layer, mapLayer);
  //     }
  //   }).addTo(that.map);
  //   that.featureFilter.setLayer(that.geojson);
  // }

  // setFeatureLayerPopup(feature, layer, mapLayer) {
  //   var popupFieldsConfig = mapLayer.popupFields;
  //   var popupFields = [];
  //   for (var fry = 0; fry < popupFieldsConfig.length; fry++) {
  //     var keyname = popupFieldsConfig[fry];
  //     var toPopup = feature.properties && feature.properties[keyname];
  //     if (toPopup) {
  //       popupFields.push({ keyname: keyname, value: toPopup });
  //     }
  //   }
  //   if (popupFields.length) {
  //     var message = document.createElement('div');
  //     for (var f = 0; f < popupFields.length; f++) {
  //       var item = popupFields[f];
  //       var element = document.createElement('div');
  //       var label = this.getFieldNameAlias(item, mapLayer);
  //       var lableHTML = label ? '<h4>' + label + '</h4>' : '';
  //       element.innerHTML = lableHTML + item.value;
  //       message.appendChild(element);
  //     }
  //     layer.bindPopup(message);
  //   }
  // }

  // getFieldNameAlias(item, mapLayer) {
  //   var fieldNames = mapLayer.fieldNames;
  //   for (var fry = 0; fry < fieldNames.length; fry++) {
  //     var fieldNameAlias = fieldNames[fry];
  //     if (item.keyname === fieldNameAlias.keyname) {
  //       return fieldNameAlias.display_name;
  //     }
  //   }
  //   return '';
  // }

  // highlightFeature(e, layer, mapLayer) {
  //   this.checkFeatureVisibility(e);
  //   this.infoPanel.show(layer.feature, mapLayer.fieldNames, mapLayer);

  //   if (this.selectedLayer) {
  //     this.unhighlightFeature(this.selectedLayer);
  //   }

  //   this.selectedLayer = layer;
  //   this.setStyle(this.selectedLayer, true);
  // }

  // unhighlightFeature(layer) {
  //   this.setStyle(layer);
  // }

  // setStyle(layer, isHover) {
  //   var styles = this.mapConfig.styles;
  //   var feature = layer.feature;
  //   var style;
  //   for (var fry = 0; fry < styles.length; fry++) {
  //     var styleConfig = styles[fry];
  //     var propertyName = styleConfig.property;
  //     var properties = feature.properties;
  //     if (properties[propertyName] && properties[propertyName] === styleConfig.value) {
  //       style = styleConfig[isHover ? 'hoverStyle' : 'style'];
  //       break;
  //     }
  //   }

  //   if (!style) {
  //     style = isHover ? this.mapConfig.defaultHoverStyle : this.mapConfig.defaultStyle;
  //   }
  //   layer.setStyle(style);
  // }

  // checkFeatureVisibility(e) {
  //   var mapWidth = this.map._container.offsetWidth,
  //     mapOffset = this.mapConfig.minOffsetRight - (mapWidth - e.containerPoint.x),
  //     mapCenterPixels,
  //     newMapCenterPixels,
  //     newMapCenter;

  //   if (mapOffset > 0) {
  //     mapCenterPixels = this.map.latLngToContainerPoint(this.map.getCenter());

  //     newMapCenterPixels = L.point(mapCenterPixels.x + mapOffset, mapCenterPixels.y);
  //     newMapCenter = this.map.containerPointToLatLng(newMapCenterPixels);

  //     this.map.panTo(newMapCenter);
  //   }
  // }

  // goHome() {
  //   this.map.setView(this.mapConfig.center, this.mapConfig.zoom);
  // }

  // _zoomToFeatures(layers) {
  //   if (layers && layers.length) {
  //     var layer = new L.FeatureGroup(layers);
  //     var bounds = layer.getBounds();
  //     this.map.fitBounds(bounds, { maxZoom: 13 });
  //   }
  // }
}
