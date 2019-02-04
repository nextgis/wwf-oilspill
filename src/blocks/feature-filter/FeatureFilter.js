import L from 'leaflet';
import { PropFilter } from './PropFilter';

import './FeatureFilter.scss';

export var FeatureFilter = L.Control.extend({

  options: {
    position: 'bottomleft',
    filters: [],
    resetButtonName: 'Сбросить',
    showFilterBtnName: 'Показать фильтр',
    isOpen: false
  },

  _filters: [
    // {
    //   type: 'prop',
    //   propName: '',
    //   filter: PropFilterInstance
    // }
  ],

  initialize: function (options, layer) {
    L.Util.setOptions(this, options);
    if (layer) {
      this.setLayer(layer);
    }
  },

  onAdd: function (map) {
    this.map = map;
    var container = this._createContainer();
    this._toggleFilterContainer(this.options.isOpen);
    return container;
  },

  setLayer: function (layer) {
    this.layer = layer;
    // var container = this.getContainer();
    var container = this._featureContainer;
    for (var fry = 0; fry < this.options.filters.length; fry++) {
      var filterConfig = this.options.filters[fry];
      if (filterConfig) {
        if (filterConfig.type === 'prop') {
          this._addPropFilter(filterConfig);
        }
      }
    }

    for (var f = 0; f < this._filters.length; f++) {
      var _filter = this._filters[f];
      var filter = _filter.filter;
      if (filter) {
        container.appendChild(filter.getContainer());
      }
    }

    const controls =  L.DomUtil.create('div', 'filter-controls', container);

    const toggleFilterBtn = this._createToggleFilterBtn('скрыть', 'hide-filter');
    controls.appendChild(toggleFilterBtn)
    controls.appendChild(this._createResetButton());
    this.update();
  },

  update: function () {
    for (var f = 0; f < this._filters.length; f++) {
      var _filter = this._filters[f];
      var filter = _filter.filter;
      if (filter) {
        filter.update();
      }
    }
  },

  _createContainer: function () {
    const wrapper = L.DomUtil.create('div', 'filter-wrapper');

    this._featureContainer = L.DomUtil.create('div', 'feature-filter', wrapper);

    this._openFilterBtn = this._createToggleFilterBtn();
    wrapper.appendChild(this._openFilterBtn);

    return wrapper;
  },

  _toggleFilterContainer: function (status) {
    this.options.isOpen = status !== undefined ? status : !this.options.isOpen;
    if (this.options.isOpen) {
      this._featureContainer.style.display = 'block';
      this._openFilterBtn.style.display = 'none';
    } else {
      this._featureContainer.style.display = 'none';
      this._openFilterBtn.style.display = 'block';
    }
  },

  _createToggleFilterBtn: function (text, addClass) {

    const btn = document.createElement('button');
    btn.className = 'btn toggle-filter' + (addClass ? ' ' + addClass : '');
    btn.innerHTML = text || this.options.showFilterBtnName;

    btn.onclick = () => {
      this._toggleFilterContainer();
    }

    return btn;
  },

  _onFilterChange: function () {
    var that = this;
    var filteredFeatures = [];
    this.layer.eachLayer(function (layer) {
      var checked = false;
      var newFeature = JSON.parse(JSON.stringify(layer.feature));
      for (var fry = 0; fry < that._filters.length; fry++) {
        var _filter = that._filters[fry];
        var filter = _filter.filter;
        checked = filter.check(layer);
        if (!checked) {
          break;
          // if (data.filter === filter) {
          //   newFeature.properties = {};
          //   newFeature.properties[_filter.propName] = layer.feature.properties[_filter.propName];
          // }
        }
      }

      if (checked) {
        filteredFeatures.push(newFeature);
        layer.getElement().style.display = 'block';
      } else {
        layer.getElement().style.display = 'none';
      }

    });



    // var newLayer = L.geoJSON({type: 'FeatureCollection', features: filteredFeatures});
    for (var f = 0; f < this._filters.length; f++) {
      var filter = this._filters[f].filter;
      // filter.layer = newLayer;
      filter.update();
    }
  },

  _addPropFilter: function (options) {
    var filter = new PropFilter(this.layer, options);
    filter.on('change', function (data) {
      this._onFilterChange(filter, data.value);
    }, this);
    this._filters.push({
      type: 'prop',
      propName: options.propName,
      filter: filter
    })
  },

  _createResetButton: function () {
    var that = this;
    this.resetButton = document.createElement('button');
    this.resetButton.className = 'btn';
    this.resetButton.innerHTML = this.options.resetButtonName;
    L.DomEvent.on(this.resetButton, 'click', function () {
      for (var fry = 0; fry < that._filters.length; fry++) {
        var _filter = that._filters[fry];
        var filter = _filter.filter;
        filter._setDefaultValue();
      }
      that._onFilterChange();
    })
    return this.resetButton;
  }
});
