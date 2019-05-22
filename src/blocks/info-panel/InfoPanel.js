
import L from 'leaflet';

import { template } from '../../utils';

// import './info-panel.scss';

export var InfoPanel = L.Control.InfoPanel = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
  },
  onAdd: function () {
    var that = this;

    this.container = L.DomUtil.create('div', 'info-panel'),
    this.closer = L.DomUtil.create('a', 'info-panel__close material-icons', this.container),
    this.inner = L.DomUtil.create('div', 'info-panel__inner', this.container);

    this.closer.innerHTML = 'close';
    this.closer.setAttribute('href', '#');

    L.DomEvent.on(this.closer, 'click', function (e) {
      e.preventDefault();
      that.hide();
    });

    window.addEventListener('resize', function () {
      that.checkOverflowing();
    })

    L.DomEvent.disableScrollPropagation(this.container);
    L.DomEvent.disableClickPropagation(this.container);
    return this.container;
  },
  show: function (feature, fieldNames, mapLayer) {
    var props = feature.properties;
    var propsAliased = {};
    var html;

    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        var value = props[key];
        var apiField;
        for (var fry = 0; fry < fieldNames.length; fry++) {
          if (fieldNames[fry].keyname === key) {
            apiField = fieldNames[fry];
            break;
          }
        }
        if (apiField) {
          if (key != 'name' && key != 'lat' && key != 'lon' && value && apiField && apiField.display_name) {
            propsAliased[apiField.display_name] = value;
          }
        }
      }
    }


    // html = this._createHtml({
    //   title: props.name,
    //   link: props.link,
    //   location: props.location,
    //   status: props.startdate,
    //   properties: propsAliased
    // });
    html = this._createHtml(props, propsAliased);

    var infoPanel = this.container.getElementsByClassName('info-panel__inner')[0];
    infoPanel.innerHTML = '';
    infoPanel.appendChild(html);

    var btn = document.getElementsByClassName('btn');
    L.DomEvent.on(btn, 'click', function (e) {
      e.preventDefault();
      var url = template(mapLayer.detailUrl, { id: feature.properties[mapLayer.idField] });
      var win = window.open(url, '_blank');
      win.focus();
    });

    this.checkOverflowing();
    this.inner.scrollTop = 0;

    this.container.classList.add('active');
  },
  hide: function () {
    this.container.classList.remove('active');
  },
  checkOverflowing: function () {
    var that = this;

    setTimeout(function () {
      if (that.inner.offsetHeight < that.inner.scrollHeight ||
        that.inner.offsetWidth < that.inner.scrollWidth) {
        var scrollWidth = that.inner.offsetWidth - that.inner.clientWidth;
        that.closer.style.right = scrollWidth + 5 + 'px';
      } else {
        that.container.classList.remove('overflowed');
      }
    }, 100);
  },
  _createHtml(prop, properties) {
    var wrap = document.createElement('div');
    if (prop.name) {
      var title = document.createElement('div');
      title.className = 'info-panel__title';
      title.innerHTML = prop.link ?
        '<a href="' + prop.link + '" class="info-panel__link" target="_blank">' + prop.name + '</a>' :
        prop.name;
      wrap.appendChild(title);
    }
    if (prop.location) {
      var location = document.createElement('div');
      location.className = 'info-panel__location';
      location.innerHTML = prop.location;
      wrap.appendChild(location);
    }
    if (prop.startdate) {
      var status = document.createElement('div');
      status.className = 'info-panel__status';
      status.innerHTML = prop.startdate;
      wrap.appendChild(status);
    }
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        var value = properties[key];
        var item = document.createElement('div');
        item.className = 'info-panel__item';
        item.innerHTML = '<div class="info-panel__item-title">' + key + '</div > ' + value;
        wrap.appendChild(item);
      }
    }
    if (prop.name) {
      var btn = document.createElement('button');
      btn.className = 'btn';
      btn.innerHTML = 'Подробнее';
      wrap.appendChild(btn);
    }
    return wrap;
  }
});
