import React from 'react';
import ViewportManager from './ViewportManager';
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
      this.state = {};
      this.id = this.makeId(10);
    }

    componentDidMount() {
      this.viewportManager.subscribe((this.id), (vp) => {
        this.setViewport(vp);
      });
      this.setState({
        viewport: this.viewportManager.viewport,
      });
    }

    componentWillUnmount() {
      this.viewportManager.unsubscribe(this.id);
    }

    setViewport(vp) {
      this.setState({ viewport: vp });
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
      const { viewport } = this.state;

      const constructedProps = {
        viewport,
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