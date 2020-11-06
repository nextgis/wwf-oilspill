import {
  WebMap,
  ToggleControlOptions,
  HtmlDef,
  HtmlToggle,
} from '@nextgis/webmap';

export interface ToggleFullscreenOptions {
  pseudoFullscreen?: boolean;
}

export class Fullscreen implements ToggleControlOptions {
  html: HtmlDef | HtmlToggle = {
    on: 'fullscreen_exit',
    off: 'fullscreen',
  };
  title = {
    off: 'View Fullscreen',
    on: 'Exit Fullscreen',
  };

  addClass?: string;
  addClassOn?: string;
  addClassOff?: string;

  status = false;

  constructor(private webMap: WebMap, options?: ToggleControlOptions) {
    if (options) {
      for (const o in options) {
        this[o] = options[o];
      }
    }

    let fullscreenchange;

    if ('onfullscreenchange' in document) {
      fullscreenchange = 'fullscreenchange';
    } else if ('onmozfullscreenchange' in document) {
      fullscreenchange = 'mozfullscreenchange';
    } else if ('onwebkitfullscreenchange' in document) {
      fullscreenchange = 'webkitfullscreenchange';
    } else if ('onmsfullscreenchange' in document) {
      fullscreenchange = 'MSFullscreenChange';
    }

    if (fullscreenchange) {
      const onFullscreenChange = () => this._onFullscreenChange();

      this.webMap.onLoad().then(() => {
        document.addEventListener(fullscreenchange, onFullscreenChange);
      });

      // this.on('unload', function () {

      // });
    }
  }

  onClick(): void {
    this.toggleFullscreen();
  }

  isFullscreen(): boolean {
    return this.status || false;
  }

  toggleFullscreen(options?: ToggleFullscreenOptions): void {
    const container = this.webMap.getContainer();
    if (this.isFullscreen()) {
      if (options && options.pseudoFullscreen) {
        this._disablePseudoFullscreen(container);
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitCancelFullScreen) {
        // @ts-ignore
        document.webkitCancelFullScreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen();
      } else {
        this._disablePseudoFullscreen(container);
      }
    } else {
      if (options && options.pseudoFullscreen) {
        this._enablePseudoFullscreen(container);
      } else if (container.requestFullscreen) {
        container.requestFullscreen();
        // @ts-ignore
      } else if (container.mozRequestFullScreen) {
        // @ts-ignore
        container.mozRequestFullScreen();
        // @ts-ignore
      } else if (container.webkitRequestFullscreen) {
        // @ts-ignore
        container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        // @ts-ignore
      } else if (container.msRequestFullscreen) {
        // @ts-ignore
        container.msRequestFullscreen();
      } else {
        this._enablePseudoFullscreen(container);
      }
    }
  }

  private _enablePseudoFullscreen(container: HTMLElement) {
    container.classList.add('leaflet-pseudo-fullscreen');
    this._setFullscreen(true);
    // this.fire('fullscreenchange');
  }

  private _disablePseudoFullscreen(container) {
    container.classList.remove('leaflet-pseudo-fullscreen');
    this._setFullscreen(false);
    // this.fire('fullscreenchange');
  }

  private _setFullscreen(fullscreen: boolean) {
    this.status = fullscreen;
    const container = this.webMap.getContainer();
    if (fullscreen) {
      container.classList.add('leaflet-fullscreen-on');
    } else {
      container.classList.remove('leaflet-fullscreen-on');
    }
    if (this.webMap.mapAdapter.map.invalidateSize) {
      this.webMap.mapAdapter.map.invalidateSize();
    }
  }

  private _onFullscreenChange() {
    const fullscreenElement =
      document.fullscreenElement ||
      // @ts-ignore
      document.mozFullScreenElement ||
      // @ts-ignore
      document.webkitFullscreenElement ||
      // @ts-ignore
      document.msFullscreenElement;

    const container = this.webMap.getContainer();
    if (fullscreenElement === container && !this.status) {
      this._setFullscreen(true);
      // this.fire('fullscreenchange');
    } else if (fullscreenElement !== container && this.status) {
      this._setFullscreen(false);
      // this.fire('fullscreenchange');
    }
  }
}
