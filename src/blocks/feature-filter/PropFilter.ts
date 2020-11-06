import { BaseFilter, BaseFilterOptions, FilterData } from './BaseFilter';
import { ResourceAdapter } from '@nextgis/ngw-kit';
import { LayerDefinition } from '@nextgis/webmap';

export interface PropFilterOptions extends BaseFilterOptions {
  propName: string;
}

export class PropFilter extends BaseFilter<PropFilterOptions> {
  dataDict: FilterData = {};

  constructor(layer: ResourceAdapter, options: PropFilterOptions) {
    super(layer, options);
  }

  check(layer: LayerDefinition) {
    const prop = this._getLayerProp(layer);

    if (prop === this.value) {
      return true;
    } else if (this.value === this.options.empty.value) {
      return true;
    }
    return false;
  }

  getFilterData(layer: ResourceAdapter) {
    this.dataDict = {};
    layer.getLayers().forEach((f) => {
      const property = this._getLayerProp(f);
      if (property) {
        const exist = this.dataDict[property];
        if (exist) {
          this.dataDict[property] = exist + 1;
        } else {
          this.dataDict[property] = 1;
        }
      }
    });
    return this.dataDict;
  }

  _getLayerProp(l: LayerDefinition) {
    return (
      l.feature &&
      l.feature.properties &&
      l.feature.properties[this.options.propName]
    );
  }
}
