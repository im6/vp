//http://codepen.io/dicson/pen/waKPgQ
import React from 'react';
import PropTypes from 'prop-types';
import style from '!style!css!less!autoprefixer-loader!./style.less';

const triggerClassName = 'toggle-button';

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let me = this;
    let classStr = 'navTrigger '+ triggerClassName + (me.props.isNavBtnActive ? ' active' : '');
    var result = <div className={classStr}>
      <i/>
      <i/>
      <i/>
    </div>;
    return result;
  }
}

export default MenuButton;
