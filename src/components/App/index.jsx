import React from 'react';
import Routes from '../../client/routes';
import './bulma.modules.sass';
import style from './style.sass';
import Header from 'containers/Header';
import SpinLoader from 'components/SpinLoader';

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
    const {
      state: { showLoading },
    } = this;
    return (
      <div className={style.container}>
        <Header />
        {showLoading ? <SpinLoader /> : <Routes />}
      </div>
    );
  }
}

export default App;
