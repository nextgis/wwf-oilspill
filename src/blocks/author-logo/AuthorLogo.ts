import { MapControl } from '@nextgis/webmap';

// import "autor-loga.scss";

interface Elment {
  elem?: HTMLElement | string;
  id?: string;
}

export class AuthorLogo implements MapControl {
  constructor(public options: Elment) {}

  onAdd(): HTMLElement {
    const opt = this.options;
    if (opt.id) {
      return document.getElementById(opt.id);
    } else if (opt.elem) {
      if (typeof opt.elem === 'string') {
        const element = document.createElement('div');
        element.innerHTML = opt.elem;
        return element;
      }
      return opt.elem;
    }
    throw new Error('no autor logo element');
  }

  onRemove(): void {
    // ignore
  }
}
