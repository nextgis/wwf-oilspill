import { Styles } from 'src/config';
import { create } from '@nextgis/dom';
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

  onAdd(): HTMLElement {
    return this.container;
  }

  onRemove(): void {
    // ignore
  }

  createContainer(): HTMLElement {
    const element = create('div', 'legend');
    const list = create('ul', 'legend-list list-unstyled');
    for (let fry = 0; fry < this.styles.length; fry++) {
      const styleBlock = this._createStyleBlock(this.styles[fry]);
      if (styleBlock) {
        list.appendChild(styleBlock);
      }
    }

    element.appendChild(list);
    return element;
  }

  private _createStyleBlock(style: Styles) {
    if (style.label) {
      const listItem = create('li', 'legend-list__item ');

      const icon = create(
        'div',
        'legend-list__icon legend-list__icon--point',
        listItem
      );
      const fillColor = style.style.fillColor || '#fff';
      if (typeof fillColor === 'string') {
        icon.style.backgroundColor = fillColor;
      }

      const text = create('div', 'legend-list__text', listItem);
      text.innerHTML = style.label;

      return listItem;
    }
  }
}
