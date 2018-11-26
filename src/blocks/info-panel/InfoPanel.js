
import $ from 'jquery';
import L from 'leaflet';
import Handlebars from 'handlebars';

import {template} from '../../utils';

// import './info-panel.scss';

export var InfoPanel = L.Control.InfoPanel = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {
    L.Util.setOptions(this, options);
    this.template = Handlebars.compile(document.getElementById('info-panel-template').innerHTML);
  },
  onAdd: function () {
    var that = this;

    this.container = L.DomUtil.create('div', 'info-panel'),
    this.closer = L.DomUtil.create('a', 'info-panel__close material-icons', this.container),
    this.inner = L.DomUtil.create('div', 'info-panel__inner', this.container);

    this.closer.innerHTML = 'close';
    this.closer.setAttribute('href', '#');

    $(this.container).on('mousewheel mousedown mousemove mouseup click', function (e) {
      e.stopPropagation();
    })

    $(this.closer).on('click', function (e) {
      e.preventDefault();
      that.hide();
    });

    $(window).on('resize', function () {
      that.checkOverflowing();
    })

    L.DomEvent.disableScrollPropagation(this.container);
    return this.container;
  },
  show: function (feature, fieldNames, mapLayer) {
    var props = feature.properties;
    var propsAliased = {},
      html;

    $.each(props, function (key, value) {
      var apiField = $.grep(fieldNames, function (n) { return n.keyname == key; })[0];

      if (key != 'name' && key != 'lat' && key != 'lon' && value && apiField && apiField.display_name) {
        propsAliased[apiField.display_name] = value;
      }
    });

    html = this.template({
      title: props.name,
      link: props.link,
      location: props.location,
      status: props.startdate,
      properties: propsAliased
    });

    $(this.container).find('.info-panel__inner').html(html);

    var btn = $(this.container).find('#get-details-info-btn');
    $(btn).on('click', function (e) {
      e.preventDefault();
      var url = template(mapLayer.detailUrl, {id: feature.properties[mapLayer.idField]});
      var win = window.open(url, '_blank');
      win.focus();
    });

    this.checkOverflowing();
    this.inner.scrollTop = 0;

    $(this.container).addClass('active');
  },
  hide: function () {
    $(this.container).removeClass('active');
  },
  checkOverflowing: function () {
    var that = this;

    setTimeout(function () {
      if (that.inner.offsetHeight < that.inner.scrollHeight ||
        that.inner.offsetWidth < that.inner.scrollWidth) {
        var scrollWidth = that.inner.offsetWidth - that.inner.clientWidth;
        that.closer.style.right = scrollWidth + 5 + 'px';
      } else {
        $(that.container).removeClass('overflowed');
      }
    }, 100);
  }

});
