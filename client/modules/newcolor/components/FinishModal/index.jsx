import React, { PropTypes } from 'react';

const FinishModal = ({isAuth}) => {
  const goLogin = (ev) => {
    ev.preventDefault();
  };

  let noAuth = <div>
    <p>
      Your new color is created successfully. We will review it before publish.
    </p>
    <h2>
      <b>OR</b> <br/>
      you could <a onClick={goLogin}>sign in</a> and have it published instantly.
    </h2>
  </div>;

  let authElem = <div>
    <p>
      Congratulations, your new colors are successfully published and others will
      see them right now!
    </p>

  </div>;

  return isAuth ? authElem : noAuth;
};

export default FinishModal;
