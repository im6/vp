import { Component } from 'react';
import PropTypes from 'prop-types';
import * as style from './style.sass';
import Header from '../Header';
import SpinLoader from 'components/SpinLoader';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    // keep it in class component because of the timing of effect is better than hook, https://reactjs.org/docs/hooks-reference.html#timing-of-effects
    this.setState({
      loading: false,
    });
  }
  render() {
    const {
      state: { loading },
    } = this;
    const { children } = this.props;
    return (
      <div className={style.container}>
        <Header />
        {loading ? <SpinLoader /> : children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
