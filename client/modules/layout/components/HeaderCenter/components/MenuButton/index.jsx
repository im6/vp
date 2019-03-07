//http://codepen.io/dicson/pen/waKPgQ
import React from 'react';
import PropTypes from 'prop-types';
//import style from '!style-loader!css-loader!less-loader!autoprefixer-loader!./style.less';
import style from './style.less';
const triggerClassName = 'toggle-button';

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const me = this;
    const classStr = 'navTrigger '+ triggerClassName + (me.props.isNavBtnActive ? ' active' : '');
    const result = <div className={classStr}>
      <i/>
      <i/>
      <i/>
    </div>;
    return result;
  }
}

export default MenuButton;
