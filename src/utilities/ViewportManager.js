import enquire from 'enquire.js';
import {
  breakpointSpecs,
  breakpointQueries,
} from './utils/breakpointQueries';

const PREFIX = 'viewport- ';

const {
  desktopQuery,
  desktopSmallQuery,
  tabletQuery,
  mobileQuery,
  mobileSmallQuery,
  landscapeQuery,
} = breakpointQueries;

const {
  desktop,
  desktopSmall,
  tablet,
  mobile,
} = breakpointSpecs;

class ViewportManager {

  constructor() {
    this.viewport = this.calculateCurrentViewport();
    if (!global.callbacks) global.callbacks = {};
  }

  register() {
    const self = this;
    let viewport;
    let newViewport;

    enquire.register(desktopQuery, {
      match: () => {
        if (viewport === 'desktop') return;
        self.changeViewport('desktop');
      },
      unmatch: () => {
        newViewport = this.calculateCurrentViewport();
        self.changeViewport(newViewport);
      },
    });

    enquire.register(desktopSmallQuery, {
      match: () => {
        if (viewport === 'desktopSmall') return;
        self.changeViewport('desktopSmall');
      },
      unmatch: () => {
        newViewport = this.calculateCurrentViewport();
        self.changeViewport(newViewport);
      },
    });

    enquire.register(tabletQuery, {
      match: () => {
        if (viewport === 'tablet') return;
        self.changeViewport('tablet');
      },
      unmatch: () => {
        newViewport = this.calculateCurrentViewport();
        self.changeViewport(newViewport);
      },
    });

    enquire.register(mobileQuery, {
      match: () => {
        if (viewport === 'mobile') return;
        self.changeViewport('mobile');
      },
      unmatch: () => {
        newViewport = this.calculateCurrentViewport();
        self.changeViewport(newViewport);
      },
    });

    enquire.register(mobileSmallQuery, {
      match: () => {
        if (viewport === 'mobileSmall') return;
        self.changeViewport('mobileSmall');
      },
      unmatch: () => {
        newViewport = this.calculateCurrentViewport();
        self.changeViewport(newViewport);
      },
    });
    // Handle delay in viewport manager when flipping orientations
    enquire.register(landscapeQuery, {
      match: () => {
        setTimeout(() => {
          newViewport = this.calculateCurrentViewport();
          self.changeViewport(newViewport);
        }, 100);
      },
      unmatch: () => {
        setTimeout(() => {
          newViewport = this.calculateCurrentViewport();
          self.changeViewport(newViewport);
        }, 100);
      },
    });

    this.registered = true;
  }

  unregister() {
    if (!this.registered) return;
    enquire.unregister(desktopQuery);
    enquire.unregister(desktopSmallQuery);
    enquire.unregister(tabletQuery);
    enquire.unregister(mobileQuery);
    enquire.unregister(mobileSmallQuery);
    enquire.unregister(landscapeQuery);
  }

  subscribe(id, cb) {
    this.id = `${PREFIX}${id}`;
    global.callbacks[`${PREFIX}${id}`] = { callbackFn: cb };
  }

  unsubscribe(id) {
    this.id = `${PREFIX}${id}`;
    delete global.callbacks[`${PREFIX}${id}`];
  }

  calculateCurrentViewport() {
    const width = Math.max(
      document.documentElement?.clientWidth || 0,
      window.innerWidth || 0,
    );

    let viewport = 'mobileSmall' || this.viewport;
    if (width >= desktop.min) {
      viewport = 'desktop';
    } else if (width >= desktopSmall.min && width < desktop.min) {
      viewport = 'desktopSmall';
    } else if (width >= tablet.min && width < desktopSmall.min) {
      viewport = 'tablet';
    } else if (width >= mobile.min && width < tablet.min) {
      viewport = 'mobile';
    } else if (width >= 0 && width < mobile.min) {
      viewport = 'mobileSmall';
    }

    return viewport;
  }

  changeViewport(currentViewport) {
    if (this.viewport !== currentViewport) {
      this.viewport = currentViewport;
      const callbackKeys = Object.keys(global.callbacks).filter((key) => key.startsWith(PREFIX));
      if (callbackKeys.length > 0) {
        callbackKeys.forEach((viewportKey) => {
          if (
            global.callbacks
            && global.callbacks[viewportKey]
            && global.callbacks[viewportKey].callbackFn
          ) {
            global.callbacks[viewportKey].callbackFn(currentViewport);
          }
        });
      }
    }
  }
}

const viewportManager = new ViewportManager();

export default viewportManager;