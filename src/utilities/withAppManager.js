import React from 'react';
import ViewportManager from './ViewportManager';
import SideNavManager from './SideNavManager';
import _isStyledComponent from './utils/isStyledComponent';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function wrapWithManager(Component) {
  const componentName = Component?.displayName || Component?.name || 'Component';
  const isStatelessFunctionalComponent = typeof Component === 'function'
  && !(Component.prototype && 'isReactComponent' in Component.prototype);
  const shouldSetInnerRef = _isStyledComponent(Component) || isStatelessFunctionalComponent;

  class WithManager extends React.Component {
    constructor(props) {
      super(props);
      this.viewportManager = ViewportManager;
      this.sideNavManager = SideNavManager;
      this.state = {};
      this.id = this.makeId(10);
    }

    componentDidMount() {
      this.viewportManager.subscribe((this.id), (vp) => {
        this.setViewport(vp);
      });
      this.sideNavManager.subscribe((this.id), (isExpanded) => {
        this.setSideNavState(isExpanded);
      });
      this.setState({
        viewport: this.viewportManager.viewport,
        sideNavManager: this.sideNavManager.sideNavExpanded,
      });
    }

    componentWillUnmount() {
      this.viewportManager.unsubscribe(this.id);
      this.sideNavManager.unsubscribe(this.id);
    }

    setViewport(vp) {
      this.setState({ viewport: vp });
    }

    setSideNavState(isExpanded) {
      this.setState({ sideNavExpanded: isExpanded });
    }

    sideNavAppHandler = (data) => {
      if (data !== this.sideNavManager.sideNavExpanded) {
        this.sideNavManager.sideNavToggled(data);
      }
    }

    makeId(length) {
      let i;
      let randomNum;
      let flooredNum;
      this.result = '';
      for (i = 0; i < length; i += 1) {
        randomNum = Math.random();
        flooredNum = Math.floor(randomNum * 10);
        this.result += CHARACTERS.charAt(flooredNum);
      }
      return this.result;
    }

    render() {
      const { viewport, sideNavExpanded = false } = this.state;

      const constructedProps = {
        viewport,
        sideNavExpanded,
        sideNavAppHandler: this.sideNavAppHandler,
        ...this.props,
      };

      if (!shouldSetInnerRef && constructedProps.innerRef) {
        constructedProps.ref = constructedProps.innerRef;
        delete constructedProps.innerRef;
      }
      return <Component {...constructedProps} />;
    }
  }

  WithManager.displayName = `WithManager(${componentName})`;

  return WithManager;
}