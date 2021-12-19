import React from 'react';
import ViewportManager from './ViewportManager';

class AppManager extends React.Component {
    componentDidMount() {
      ViewportManager.register();
    };
  
    componentWillUnmount() {
      ViewportManager.unregister();
    };
  
    render() {
      const { children } = this.props;
      if (!children) {
        return null;
      }
      return children;
    };
};
  
export default AppManager;