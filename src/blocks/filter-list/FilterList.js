import L from 'leaflet';

// import 'filter-list.scss';

export var FilterList = L.Control.FilterList = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'filter-list');

    // ... initialize other DOM elements, add listeners, etc.
    container.innerHTML =
      '<label>Компания: ' +
      '<select name="filters">' +
      '<option selected>Все</option>' +
      '<option>Газпромнефть</option>' +
      '<option>Лукойл</option>' +
      '<option>Роснефть</option>' +
      '</select>' +
      '</label>'
    ;
    L.DomEvent.on(container.firstChild.firstElementChild, 'change', function () {
      var filter = this.value;
      map.filters.company = filter;
      map.eachLayer(function (layer) {
        if (layer.feature) {
          if ((layer.feature.properties.name == map.filters.company || map.filters.company == 'Все') && (layer.feature.properties.date == map.filters.period || map.filters.period == 'Все') && (layer.feature.properties.region == map.filters.region || map.filters.region == 'Все')) {
            layer.getElement().style.display = 'block';
          } else {
            layer.getElement().style.display = 'none';
          }
        }
      });
    });
    return container;
  }
});
