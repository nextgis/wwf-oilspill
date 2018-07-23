import L from 'leaflet';

export var BaseFilter = L.Evented.extend({

  options: {
    label: 'filter',
    empty: {name: 'Все', value: '*'},
    allovedEmpty: true
  },

  initialize: function (layer, options) {
    L.Util.setOptions(this.options);

    this.choices = [],

    this.value = '',

    this.layer = layer;
    this.label = options.label;
    this.container = this._createContainer();
    this._setDefaultValue();
    this._addEventsListeners();
  },

  destroy: function () {
    this._removeEventsListeners();
  },

  update: function (layer) {

    layer = layer || this.layer;

    for (var fry = 0; fry < this.choices.length; fry++) {
      var option = this.choices[fry];
      var parentNode = option && option.parentNode;
      if (parentNode) {
        parentNode.removeChild(option);
      }
    }


    var filterData = this.getFilterData(layer);
    if (this.options.allovedEmpty) {
      var empty = this.options.empty;
      this._addChoice(empty.name, empty.value);
    }
    for (var f in filterData) {
      if (filterData.hasOwnProperty(f)) {
        var data = filterData[f];
        this._addChoice(f, f, data);
      }
    }
  },

  getContainer: function () {
    return this.container;
  },

  check: function () {
    return true;
  },

  _setDefaultValue: function () {
    if (this.options.allovedEmpty) {
      this.value = this.options.empty.value;
    }
  },

  _createContainer: function () {
    var container = document.createElement('div');
    container.className = 'filter-list';
    this.labelContainer = this._createLabel();
    this.labelContainer.appendChild(this._createSelectContainer());

    container.appendChild(this.labelContainer);
    return container;
  },

  _createLabel: function () {
    var label = document.createElement('label');
    if (this.label) {
      label.appendChild(document.createTextNode(this.label + ': '));
    }
    return label;
  },

  _createSelectContainer: function () {
    this._selectContainer = document.createElement('select');

    return this._selectContainer;
  },

  _addChoice: function (name, value, count) {
    var option = document.createElement('option');
    option.innerHTML = name + (count ? ' (' + count + ')' : '');
    option.setAttribute('value', value);
    if (value === this.value) {
      option.setAttribute('selected', 'true');
    }
    this.choices.push(option);
    this._selectContainer.appendChild(option);
  },

  _onSelectChange: function (e) {
    var value = e.target.value;
    this.value = value;
    this.fire('change', {value: value});
  },

  _addEventsListeners: function () {
    L.DomEvent.on(this._selectContainer, 'change', this._onSelectChange, this)
  },

  _removeEventsListeners: function () {
    L.DomEvent.off(this._selectContainer, 'change', this._onSelectChange, this)
  }
})
