import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import Header from 'containers/Header';
import SpinLoader from 'components/SpinLoader';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
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
