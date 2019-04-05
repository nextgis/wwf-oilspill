
import L from 'leaflet';

// import 'legend.scss';

export var Legend = L.Control.Legend = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
    this.styles = this.options.styles;
    this.container = this.createContainer();
  },

  onAdd: function () {
    return this.container;
  },

  createContainer: function () {
    var element = document.createElement('div');
    element.className = 'legend';
    var list = document.createElement('ul');
    list.className = 'legend-list list-unstyled';
    for (var fry = 0; fry < this.styles.length; fry++) {

      var styleBlock = this._createStyleBlock(this.styles[fry]);
      if (styleBlock) {
        list.appendChild(styleBlock);
      }
    }

    element.appendChild(list);
    return element;
  },

  _createStyleBlock: function (style) {
    if (style.label) {
      var listItem = document.createElement('li');
      listItem.className = 'legend-list__item ';

      var icon = document.createElement('div');
      icon.className = 'legend-list__icon legend-list__icon--point';
      icon.style.backgroundColor = style.style.fillColor;

      var text = document.createElement('div');
      text.className = 'legend-list__text';
      text.innerHTML = style.label;

      listItem.appendChild(icon);
      listItem.appendChild(text);

      return listItem;
    }
  }
});



