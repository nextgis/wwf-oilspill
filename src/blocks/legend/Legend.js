
import L from 'leaflet';

// import 'legend.scss';

export var Legend = L.Control.Legend = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },
  onAdd: function () {
    return this.options.elem;
  }
});



