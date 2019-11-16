import React from 'react';
import Routes from '../../routes';
import Layout from '../layout';
import ColorLoading from '../../../isomorphic/ColorLoading';
import './bulma.modules.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = window;
    this.pathname = pathname;
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
    const { pathname, state } = this;
    const { isClient } = state;
    return (
      <Layout>{isClient ? <Routes /> : <ColorLoading url={pathname} />}</Layout>
    );
  }
}

export default App;
