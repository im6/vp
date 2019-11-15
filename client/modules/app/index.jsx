import React from 'react';
import Routes from '../../routes';
import Layout from '../layout';
import ColorLoading from '../../../isomorphic/ColorLoading';
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
    const { isClient } = this.state;
    const {
      location: { pathname },
    } = window;
    return (
      <Layout>{isClient ? <Routes /> : <ColorLoading url={pathname} />}</Layout>
    );
  }
}

export default App;
