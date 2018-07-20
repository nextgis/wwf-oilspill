import $ from 'jquery';
import L from 'leaflet';
import LProj from 'proj4leaflet';
import { InfoPanel } from '../info-panel/InfoPanel';
import { Legend } from '../legend/Legend';
import { FilterList } from '../filter-list/FilterList';
import { FilterPeriod } from '../filter-period/FilterPeriod';
import { FilterRegion } from '../filter-region/FilterRegion';
import { AuthorLogo } from '../author-logo/AuthorLogo';
import '../home-control/HomeControl';
import '../fullscreen-control/FullscreenControl';

// import './map.scss';

export function Map(options) {
  this.mapConfig = options.mapConfig;

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

  // add Legend
  that.legend = new Legend({ elem: document.getElementById('legend') }).addTo(that.map);

  // add Filter-list
  that.filterList = new FilterList({ elem: document.getElementById('filter-company') }).addTo(that.map);

  // add Filter-list
  that.filterPeriod = new FilterPeriod({ elem: document.getElementById('filter-period') }).addTo(that.map);

  // add Filter-list
  that.filterRegion = new FilterRegion({ elem: document.getElementById('filter-region') }).addTo(that.map);

  that.map.filters = { 'company': 'Все', 'period': 'Все', 'region': 'Все' };

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
  $.ajax({
    url: that.mapConfig.nextgiscomUrl + '/api/resource/' + mapLayer.id,
    dataType: 'JSON',
    success: function (data) {
      mapLayer.fieldNames = data.feature_layer.fields;
      loadGeojson();
    }
  });

  // Load GeoJSON
  var loadGeojson = function () {
    $.ajax({
      url: that.mapConfig.nextgiscomUrl + '/api/resource/' + mapLayer.id + '/geojson',
      dataType: 'JSON',
      success: function (data) {
        var crs3857 = new LProj.CRS('EPSG:3857');
        that.geojson = L.geoJson(data, {
          style: function () {
            return mapLayer.style;
          },
          coordsToLatLng: function (coords) {
            var point = L.point(coords[0], coords[1]);
            return crs3857.projection.unproject(point);
          },
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);//, {icon: defIcon});
          },
          onEachFeature: function (feature, layer) {
            /*if (mapLayer.centroidStyle){
                if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                    layer._latlngs.forEach(function(poly){
                        var bounds = L.polygon(poly).getBounds(),
                        center = bounds.getCenter(),
                        marker = L.circleMarker(center, mapLayer.centroidStyle);
                        marker.on("click", function(e){ that.highlightFeature(e, layer, mapLayer);});
                        markers.push( marker);
                    });
                }
            }*/

            layer.on({
              click: function (e) { that.highlightFeature(e, e.target, mapLayer); }
            });
          }
        }).addTo(that.map);

        /*markers.forEach(function(marker){
            marker.addTo(that.map);
        })*/
      }
    });
  }
}

Map.prototype.highlightFeature = function (e, layer, mapLayer) {
  this.checkFeatureVisibility(e);
  this.infoPanel.show(layer.feature.properties, mapLayer.fieldNames);

  if (this.selectedLayer) this.unhighlightFeature(this.selectedLayer, this.selectedLayerInitStyle);

  this.selectedLayer = layer;
  this.selectedLayerInitStyle = mapLayer.style;
  this.selectedLayer.setStyle(mapLayer.hoverStyle);
}

Map.prototype.unhighlightFeature = function (layer, style) {
  layer.setStyle(style);
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
