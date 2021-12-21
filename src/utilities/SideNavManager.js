const PREFIX = 'sideNav- ';

class SideNavManager {
  sideNavExpanded;

  constructor() {
    this.sideNavExpanded = false;
    if (!global.callbacks) global.callbacks = {};
  }

  subscribe(id, cb) {
    const key = `${PREFIX}${id}`;
    global.callbacks[key] = { callbackFn: cb };
  }

  unsubscribe(id) {
    const key = `${PREFIX}${id}`;
    delete global.callbacks[key];
  }

  sideNavToggled(isExpanded) {
    if (this.sideNavExpanded !== isExpanded) {
      this.sideNavExpanded = isExpanded;
      const callbackKeys = Object.keys(global.callbacks).filter((key) => key.startsWith(PREFIX));
      if (callbackKeys.length > 0) {
        callbackKeys
          .forEach((key) => {
            if (
              global.callbacks
            && global.callbacks[key]
            && global.callbacks[key].callbackFn
            ) {
              global.callbacks[key].callbackFn(isExpanded);
            }
          });
      }
    }
  }
}

const sideNavManager = new SideNavManager();

export default sideNavManager;