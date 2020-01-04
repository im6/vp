import React from 'react';
import Routes from '../../routes';
import Layout from '../layout';
import SpinLoader from '../../../isomorphic/SpinLoader';
import './bulma.modules.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
    };
  }
  componentDidMount() {
    this.setState({
      showLoading: false,
    });
  }
  render() {
    const { state } = this;
    const { showLoading } = state;
    return <Layout>{showLoading ? <SpinLoader /> : <Routes />}</Layout>;
  }
}

export default App;
