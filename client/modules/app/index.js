import React from 'react';
import PropTypes from 'prop-types';
import Routes from '../../routes';
import Layout from '../layout';
import './bulma.modules.sass';

class App extends React.Component {
  render(){
    const { dispatch } = this.props;
    return <Layout>
      <Routes dispatch={dispatch} />
    </Layout>;
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default App;