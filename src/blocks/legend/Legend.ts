import { Styles } from 'src/config';
import { dom } from '@nextgis/utils';
import { MapControl } from '@nextgis/webmap';

// import 'legend.scss';

export interface LegendOptions {
  styles: Styles[];
}

export class Legend implements MapControl {
  private styles: Styles[];
  private container: HTMLElement;

  constructor(private options: LegendOptions) {
    this.styles = this.options.styles;
    this.container = this.createContainer();
  }

  onAdd() {
    return this.container;
  }

  onRemove() {
    // ignore
  }

  createContainer() {
    var element = dom.create('div', 'legend');
    var list = dom.create('ul', 'legend-list list-unstyled');
    for (var fry = 0; fry < this.styles.length; fry++) {
      var styleBlock = this._createStyleBlock(this.styles[fry]);
      if (styleBlock) {
        list.appendChild(styleBlock);
      }
    }

    element.appendChild(list);
    return element;
  }

  private _createStyleBlock(style: Styles) {
    if (style.label) {
      const listItem = dom.create('li', 'legend-list__item ');

      const icon = dom.create('div', 'legend-list__icon legend-list__icon--point', listItem);
      const fillColor = style.style.fillColor || '#fff';
      icon.style.backgroundColor = fillColor;

      const text = dom.create('div', 'legend-list__text', listItem);
      text.innerHTML = style.label;

      return listItem;
    }
  }
}
