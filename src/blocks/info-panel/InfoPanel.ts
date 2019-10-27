import L from 'leaflet';

import { template } from '../../utils';
import { MapControl } from '@nextgis/ngw-map';
import { FeatureLayerField } from '@nextgis/ngw-connector';
import { dom } from '@nextgis/utils';
import { Feature } from 'geojson';
import { Resource } from '../../config';
// import './info-panel.scss';

export interface InfoPanelOptions {
  onClose?: () => void;
}

export class InfoPanel implements MapControl {
  private container: HTMLElement;
  private closer: HTMLElement;
  private inner: HTMLElement;

  constructor(public options: InfoPanelOptions) {}

  onAdd() {
    this.container = dom.create('div', 'info-panel');

    this.closer = dom.create('a', 'info-panel__close material-icons', this.container);
    this.closer.innerHTML = 'close';
    this.closer.setAttribute('href', '#');

    this.inner = dom.create('div', 'info-panel__inner', this.container);

    this.closer.addEventListener('click', e => {
      e.preventDefault();
      this.hide();
    });

    window.addEventListener('resize', () => {
      this.checkOverflowing();
    });

    L.DomEvent.disableScrollPropagation(this.container);
    L.DomEvent.disableClickPropagation(this.container);

    return this.container;
  }

  onRemove() {
    // ignore
  }

  show(feature: Feature, fieldNames: FeatureLayerField[], mapLayer: Resource) {
    const props = feature.properties;
    const propsAliased = {};

    for (const key in props) {
      const value = props[key];
      let apiField;
      for (let fry = 0; fry < fieldNames.length; fry++) {
        if (fieldNames[fry].keyname === key) {
          apiField = fieldNames[fry];
          break;
        }
      }
      if (apiField) {
        if (
          key != 'name' &&
          key != 'lat' &&
          key != 'lon' &&
          value &&
          apiField &&
          apiField.display_name
        ) {
          propsAliased[apiField.display_name] = value;
        }
      }
    }

    const html = this._createHtml(props, propsAliased);

    const infoPanel = this.inner;
    infoPanel.innerHTML = '';
    infoPanel.appendChild(html);

    const btn = document.getElementsByClassName('btn')[0] as HTMLElement;
    L.DomEvent.on(btn, 'click', e => {
      e.preventDefault();
      const url = template(mapLayer.meta.detailUrl, {
        id: feature.properties[mapLayer.meta.idField]
      });
      const win = window.open(url, '_blank');
      win.focus();
    });

    this.checkOverflowing();
    this.inner.scrollTop = 0;

    this.container.classList.add('active');
  }

  hide() {
    this.container.classList.remove('active');
    if (this.options.onClose) {
      this.options.onClose();
    }
  }
  checkOverflowing() {
    setTimeout(() => {
      if (
        this.inner.offsetHeight < this.inner.scrollHeight ||
        this.inner.offsetWidth < this.inner.scrollWidth
      ) {
        const scrollWidth = this.inner.offsetWidth - this.inner.clientWidth;
        this.closer.style.right = scrollWidth + 5 + 'px';
      } else {
        this.container.classList.remove('overflowed');
      }
    }, 100);
  }
  _createHtml(prop, properties) {
    const wrap = document.createElement('div');
    if (prop.name) {
      const title = document.createElement('div');
      title.className = 'info-panel__title';
      title.innerHTML = prop.link
        ? '<a href="' +
          prop.link +
          '" class="info-panel__link" target="_blank">' +
          prop.name +
          '</a>'
        : prop.name;
      wrap.appendChild(title);
    }
    if (prop.location) {
      const location = document.createElement('div');
      location.className = 'info-panel__location';
      location.innerHTML = prop.location;
      wrap.appendChild(location);
    }
    if (prop.startdate) {
      const status = document.createElement('div');
      status.className = 'info-panel__status';
      status.innerHTML = prop.startdate;
      wrap.appendChild(status);
    }
    for (const key in properties) {
      const value = properties[key];
      const item = document.createElement('div');
      item.className = 'info-panel__item';
      item.innerHTML = '<div class="info-panel__item-title">' + key + '</div > ' + value;
      wrap.appendChild(item);
    }
    if (prop.name) {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.innerHTML = 'Подробнее';
      wrap.appendChild(btn);
    }
    return wrap;
  }
}
