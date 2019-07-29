import { MapControl } from '@nextgis/webmap';

// import "autor-loga.scss";

interface Elment {
  elem?: HTMLElement | string;
  id?: string;
}

export class AuthorLogo implements MapControl {
  constructor(public options: Elment) {}

  onAdd() {
    const opt = this.options;
    if (opt.id) {
      return document.getElementById(opt.id);
    } else if (opt.elem) {
      if (typeof opt.elem === 'string') {
        return document.createTextNode(opt.elem);
      }
      return opt.elem;
    }
  }

  onRemove() {
    // ignore
  }
}
