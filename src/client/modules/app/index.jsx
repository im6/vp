import React from 'react';
import Routes from '../../routes';
import Layout from '../layout';
import SpinLoader from '../../../isomorphic/SpinLoader';
import './bulma.modules.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
    };
  }
  componentDidMount() {
    this.setState({
      isClient: true,
    });
  }
  render() {
    const { state } = this;
    const { isClient } = state;
    return <Layout>{isClient ? <Routes /> : <SpinLoader />}</Layout>;
  }
}

export default App;
