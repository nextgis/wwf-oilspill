import $ from 'jquery';
import L from 'leaflet';
import LProj from 'proj4leaflet';
import { InfoPanel } from '../info-panel/InfoPanel';
import { Legend } from '../legend/Legend';
import { FeatureFilter } from '../feature-filter/FeatureFilter';
import { AuthorLogo } from '../author-logo/AuthorLogo';
import { getConnector } from '../../services/loadResource';
import '../home-control/HomeControl';
import '../fullscreen-control/FullscreenControl';

// import './map.scss';

export function Map(options) {
  this.mapConfig = options.mapConfig;
  this.apiConnector = getConnector({ baseUrl: options.mapConfig.nextgiscomUrl });

  this.renderMap();
}


Map.prototype.renderMap = function () {
  var that = this;
  that.map = new L.Map('map', {
    homeControl: true,
    homeControlOptions: {
      map: this
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topleft'
    }
  }).setView(that.mapConfig.center, that.mapConfig.zoom);

  // set Basemap
  L.tileLayer(that.mapConfig.basemap.url, {
    attribution: that.mapConfig.basemap.attribution,
  }).addTo(that.map);

  // add custom tools
  that.authorLogo = new AuthorLogo({ elem: document.getElementById('author-logo') }).addTo(that.map);
  that.wwfLogo = new AuthorLogo({ elem: document.getElementById('wwf-logo'), position: 'bottomleft' }).addTo(that.map);

  // add Legend
  that.legend = new Legend({ styles: that.mapConfig.styles }).addTo(that.map);

  // add Filter-list
  that.featureFilter = new FeatureFilter({
    filters: [
      {type: 'prop', propName: 'name', label: 'Компания'},
      {type: 'prop', propName: 'date', label: 'Квартал'},
      {type: 'prop', propName: 'region', label: 'Регион'},
    ]
  }).addTo(that.map);


  // add Info panel
  that.infoPanel = new InfoPanel().addTo(that.map);
  $(that.infoPanel.closer).on('click', function () {
    that.unhighlightFeature(that.selectedLayer, that.selectedLayerInitStyle);
  });

  // Add layers
  that.mapConfig.layers.forEach(function (layer) {
    that.addLayer(layer);
  });
}

Map.prototype.addLayer = function (mapLayer) {
  var that = this;

  var defIcon = new L.Icon.Default();
  defIcon.options.iconSize = [28, 40];

  // Set alias
  this.apiConnector.connect(mapLayer.id, function (data) {
    mapLayer.fieldNames = data.feature_layer.fields;
    loadGeojson();
  });

  // Load GeoJSON
  var loadGeojson = function () {
    that.apiConnector.geojson(mapLayer.id, function (data) {
      that._onGeojsonLoad(data, mapLayer);
    })
  }
}

Map.prototype._onGeojsonLoad = function (data, mapLayer) {
  var that = this;
  var crs3857 = new LProj.CRS('EPSG:3857');
  that.geojson = L.geoJson(data, {
    coordsToLatLng: function (coords) {
      var point = L.point(coords[0], coords[1]);
      return crs3857.projection.unproject(point);
    },
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);//, {icon: defIcon});
    },
    onEachFeature: function (feature, layer) {
      that.setStyle(layer);
      layer.on({
        click: function (e) { that.highlightFeature(e, layer, mapLayer); }
      });
      that.setFeatureLayerPopup(feature, layer, mapLayer);
    }
  }).addTo(that.map);
  that.featureFilter.setLayer(that.geojson);

}

Map.prototype.setFeatureLayerPopup = function (feature, layer, mapLayer) {
  var popupFieldsConfig = mapLayer.popupFields;
  var popupFields = [];
  for (var fry = 0; fry < popupFieldsConfig.length; fry++) {
    var keyname = popupFieldsConfig[fry];
    var toPopup = feature.properties && feature.properties[keyname];
    if (toPopup) {
      popupFields.push({keyname: keyname, value: toPopup});
    }
  }
  if (popupFields.length) {
    var message = document.createElement('div');
    for (var f = 0; f < popupFields.length; f++) {
      var item = popupFields[f];
      var element = document.createElement('div');
      var label = this.getFieldNameAlias(item, mapLayer)
      var lableHTML = label ? '<h4>' + label + '</h4>' : ''
      element.innerHTML = lableHTML + item.value;
      message.appendChild(element);
    }
    layer.bindPopup(message);
  }
}

Map.prototype.getFieldNameAlias = function (item, mapLayer) {
  var fieldNames = mapLayer.fieldNames;
  for (var fry = 0; fry < fieldNames.length; fry++) {
    var fieldNameAlias = fieldNames[fry];
    if (item.keyname === fieldNameAlias.keyname) {
      return fieldNameAlias.display_name;
    }
  }
  return '';
}

Map.prototype.highlightFeature = function (e, layer, mapLayer) {
  this.checkFeatureVisibility(e);
  this.infoPanel.show(layer.feature, mapLayer.fieldNames, mapLayer);

  if (this.selectedLayer) {
    this.unhighlightFeature(this.selectedLayer);
  }

  this.selectedLayer = layer;
  this.setStyle(this.selectedLayer, true);
}

Map.prototype.unhighlightFeature = function (layer) {
  this.setStyle(layer);
}

Map.prototype.setStyle = function (layer, isHover) {
  var styles = this.mapConfig.styles;
  var feature = layer.feature;
  var style;
  for (var fry = 0; fry < styles.length; fry++) {
    var styleConfig = styles[fry];
    var propertyName = styleConfig.property;
    var properties = feature.properties;
    if (properties[propertyName] && properties[propertyName] === styleConfig.value) {
      style = styleConfig[isHover ? 'hoverStyle' : 'style'];
      break;
    }
  }
  if (style) {
    layer.setStyle(style);
  }
}

Map.prototype.checkFeatureVisibility = function (e) {
  var mapWidth = this.map._container.offsetWidth,
    mapOffset = this.mapConfig.minOffsetRight - (mapWidth - e.containerPoint.x),
    mapCenterPixels,
    newMapCenterPixels,
    newMapCenter;

  if (mapOffset > 0) {
    mapCenterPixels = this.map.latLngToContainerPoint(this.map.getCenter());

    newMapCenterPixels = L.point(mapCenterPixels.x + mapOffset, mapCenterPixels.y);
    newMapCenter = this.map.containerPointToLatLng(newMapCenterPixels);

    this.map.panTo(newMapCenter);
  }
}

Map.prototype.goHome = function () {
  this.map.setView(this.mapConfig.center, this.mapConfig.zoom);
}
