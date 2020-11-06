import { ResourceAdapter } from '@nextgis/ngw-kit';
import L from 'leaflet';
import { EventEmitter } from 'events';
import { LayerDefinition } from '@nextgis/webmap';

export interface BaseFilterOptions {
  label?: string;
  empty?: { name: string; value: any };
  allovedEmpty?: boolean;
}
export type FilterData = Record<string, number>;

const OPTIONS: BaseFilterOptions = {
  label: 'filter',
  empty: { name: 'Все', value: '*' },
  allovedEmpty: true,
};

export abstract class BaseFilter<
  O extends BaseFilterOptions = BaseFilterOptions
> extends EventEmitter {
  options: O;

  protected choices: any[];
  protected value: any;
  protected container: HTMLElement;
  protected labelContainer: HTMLElement;
  private _selectContainer: HTMLElement;

  constructor(private layer: ResourceAdapter, options: O) {
    super();
    this.options = { ...OPTIONS, ...options };
    this.choices = [];

    this.value = '';

    this.layer = layer;

    this.container = this._createContainer();
    this.setDefaultValue();
    this._addEventsListeners();
  }

  getFilterData?(layer: ResourceAdapter): FilterData;

  destroy(): void {
    this._removeEventsListeners();
  }

  update(layer?: ResourceAdapter): void {
    layer = layer || this.layer;

    for (let fry = 0; fry < this.choices.length; fry++) {
      const option = this.choices[fry];
      const parentNode = option && option.parentNode;
      if (parentNode) {
        parentNode.removeChild(option);
      }
    }

    const filterData = this.getFilterData(layer);
    if (this.options.allovedEmpty) {
      const empty = this.options.empty;
      this._addChoice(empty.name, empty.value);
    }
    const sortedData = Object.keys(filterData).sort();
    for (let f = 0; f < sortedData.length; f++) {
      const name = sortedData[f];
      this._addChoice(name, name, filterData[name]);
    }
  }

  getContainer(): HTMLElement {
    return this.container;
  }

  check(layer?: LayerDefinition): boolean {
    return true;
  }

  setDefaultValue(): void {
    if (this.options.allovedEmpty) {
      this.value = this.options.empty.value;
    }
  }

  private _createContainer() {
    const container = document.createElement('div');
    container.className = 'filter-list';
    this.labelContainer = this._createLabel();
    this.labelContainer.appendChild(this._createSelectContainer());

    container.appendChild(this.labelContainer);
    return container;
  }

  private _createLabel() {
    const label = document.createElement('label');
    if (this.options.label) {
      label.appendChild(document.createTextNode(this.options.label + ': '));
    }
    return label;
  }

  private _createSelectContainer() {
    this._selectContainer = document.createElement('select');

    return this._selectContainer;
  }

  private _addChoice(name: string, value: any, count?: number) {
    const option = document.createElement('option');
    option.innerHTML = name + (count ? ' (' + count + ')' : '');
    option.setAttribute('value', value);
    if (value === this.value) {
      option.setAttribute('selected', 'true');
    }
    this.choices.push(option);
    this._selectContainer.appendChild(option);
  }

  private _onSelectChange(e) {
    const value = e.target.value;
    this.value = value;
    this.emit('change', { value: value });
  }

  private _addEventsListeners() {
    L.DomEvent.on(this._selectContainer, 'change', this._onSelectChange, this);
  }

  private _removeEventsListeners() {
    L.DomEvent.off(this._selectContainer, 'change', this._onSelectChange, this);
  }
}
