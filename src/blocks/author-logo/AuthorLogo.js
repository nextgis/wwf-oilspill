
import L from 'leaflet';

// import "autor-loga.scss";

export var AuthorLogo = L.Control.AuthorLogo = L.Control.extend({
  options: {
    position: 'bottomright'
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },
  onAdd: function () {
    return this.options.elem;
  }
});




