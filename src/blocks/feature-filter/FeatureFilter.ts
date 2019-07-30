import L from 'leaflet';
import { PropFilter, PropFilterOptions } from './PropFilter';
import { dom } from '@nextgis/utils';

import NgwMap, { MapControl, LayerDef, LayerDefinition } from '@nextgis/ngw-map';
import { ResourceAdapter } from '@nextgis/ngw-kit';
import { BaseFilter } from './BaseFilter';

import './FeatureFilter.scss';

type FilteredLayer = LayerDefinition;

export interface FilterOptions {
  type: 'prop';
  propName: string;
  label?: string;
  filter?: BaseFilter;
}

export interface FeatureFilterOptions {
  filters: FilterOptions[];
  resetButtonName?: string;
  showFilterBtnName?: string;
  loadingLayersStr?: string;
  isOpen?: boolean;
  onChange?: (layers: FilteredLayer[]) => void;
}

export class FeatureFilter implements MapControl {
  options: FeatureFilterOptions = {
    filters: [],
    resetButtonName: 'Сбросить',
    showFilterBtnName: 'Показать фильтр',
    loadingLayersStr: 'Загрузка...',
    isOpen: false
  };

  _filters: FilterOptions[] = [];
  private _layer: ResourceAdapter;
  private closer: HTMLElement;
  private _resetButton: HTMLElement;
  private _featureContainer: HTMLElement;
  private _openFilterBtn: HTMLButtonElement;
  private _filtered: HTMLElement;
  private _filteredCount: number;
  private _featuresCount: number;
  private _whole: HTMLElement;

  constructor(private ngwMap: NgwMap, options: FeatureFilterOptions, layer?: LayerDef) {
    this.options = { ...this.options, ...options };

    if (layer) {
      this.setLayer(this._layer);
    }
  }

  onAdd() {
    const container = this._createContainer();

    this._toggleFilterContainer(this.options.isOpen);
    L.DomEvent.disableClickPropagation(container);
    return container;
  }

  onRemove() {}

  setLayer(layer: LayerDef) {
    this._layer = this.ngwMap.getLayer(layer) as ResourceAdapter;
    // const container = this.getContainer();
    const container = this._featureContainer;
    this.options.filters.forEach(filterConfig => {
      if (filterConfig) {
        if (filterConfig.type === 'prop') {
          this._addPropFilter(filterConfig as PropFilterOptions);
        }
      }
    });

    this._filters.forEach(_filter => {
      const filter = _filter.filter;
      if (filter) {
        container.appendChild(filter.getContainer());
      }
    });

    const controls = dom.create('div', 'filter-controls', container);

    controls.appendChild(this._createFilterControl());

    this.update();
  }

  update() {
    this._filters.forEach(_filter => {
      const filter = _filter.filter;
      if (filter) {
        filter.update();
      }
    });
    this._updateToggleFilterBtn();
  }

  clean() {
    this._filters.forEach(_filter => {
      const filter = _filter.filter;
      filter.setDefaultValue();
    });
    this._onFilterChange();
  }

  _createContainer() {
    const wrapper = dom.create('div', 'filter-wrapper');

    this.closer = dom.create('a', 'info-panel__close material-icons', wrapper);
    this.closer.innerHTML = 'close';
    this.closer.setAttribute('href', '#');
    this.closer.onclick = () => {
      this._toggleFilterContainer();
    };

    this._featureContainer = dom.create('div', 'feature-filter', wrapper);

    this._createToggleFilterBtn();
    wrapper.appendChild(this._openFilterBtn);

    return wrapper;
  }

  _toggleFilterContainer(status?: boolean) {
    this.options.isOpen = status !== undefined ? status : !this.options.isOpen;
    if (this.options.isOpen) {
      this._featureContainer.style.display = 'block';
      this._openFilterBtn.style.display = 'none';
    } else {
      this._featureContainer.style.display = 'none';
      this._openFilterBtn.style.display = 'block';
    }
  }

  _createToggleFilterBtn(text?: string, addClass?: string) {
    this._openFilterBtn = document.createElement('button');
    this._updateToggleFilterBtn(text, addClass);

    this._openFilterBtn.onclick = () => {
      this._toggleFilterContainer();
    };
    return this._openFilterBtn;
  }

  _updateToggleFilterBtn(text?: string, addClass?: string) {
    const btn = this._openFilterBtn;
    btn.className = 'btn toggle-filter' + (addClass ? ' ' + addClass : '');
    if (this._layer) {
      btn.innerHTML = text || this.options.showFilterBtnName;
      btn.disabled = false;
    } else {
      btn.innerHTML = this.options.loadingLayersStr;
      btn.disabled = true;
    }
  }

  _onFilterChange() {
    const filteredLayers = this.ngwMap.filterLayer(this._layer, l => {
      return this._filters.every(f => f.filter.check(l));
    });

    if (this.options.onChange) {
      this.options.onChange(filteredLayers);
    }
    this._filters.forEach(_filter => {
      const filter = _filter.filter;
      filter.update();
    });
    this._filteredCount = filteredLayers.length;
    this._updateFilterControl();
  }

  _addPropFilter(options: PropFilterOptions) {
    const filter = new PropFilter(this._layer, options);
    filter.on('change', data => {
      this._onFilterChange();
    });
    this._filters.push({
      type: 'prop',
      propName: options.propName,
      filter: filter
    });
  }

  _createResetButton() {
    this._resetButton = document.createElement('button');
    this._resetButton.className = 'btn';
    this._resetButton.innerHTML = this.options.resetButtonName;
    L.DomEvent.on(this._resetButton, 'click', () => {
      this.clean();
    });
    return this._resetButton;
  }

  _createFilterControl() {
    const wrap = document.createElement('div');
    const whole = document.createElement('div');
    whole.className = 'filter-control__whole';
    this._whole = whole;
    this._updateWholeControl();
    wrap.appendChild(whole);

    this._filtered = document.createElement('div');
    this._filtered.className = 'filter-control__filtered';
    wrap.appendChild(this._filtered);
    this._updateFilterControl();

    return wrap;
  }

  _updateWholeControl() {
    this._featuresCount = this._layer.getLayers().length;
    this._filteredCount = this._featuresCount;
    this._whole.innerHTML = 'Всего: ' + (this._featuresCount ? this._featuresCount : '0');
  }

  _updateFilterControl() {
    this._filtered.innerHTML = '';
    if (this._filteredCount !== this._featuresCount) {
      const elem = document.createElement('div');
      elem.innerHTML =
        '<span>Выбрано: </span><span>' +
        this._filteredCount +
        '</span> ' +
        '<span><a class="material-icons clean-filter-ico" href="#" title="Сбросить фильтр">not_interested</a></span>';
      const cleanBtn = elem.getElementsByClassName('clean-filter-ico')[0] as HTMLButtonElement;
      cleanBtn.onclick = () => {
        this.clean();
      };
      this._filtered.appendChild(elem);
    }
  }
}