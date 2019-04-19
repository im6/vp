import React from 'react';

const FinishModal = ({ isAuth }) => {
  const noAuth = <div>
    <p>
      Your new color is created successfully. We will review it before publish.
    </p>
    <h3>
      <b>OR</b> <br/>
      you could <b>sign in</b> and have it published instantly.
    </h3>
  </div>;

  const authElem = <div>
    <p>
      Congratulations, your new colors are successfully published and others will
      see them right now!
    </p>
  </div>;
  return isAuth ? authElem : noAuth;
};

export default FinishModal;
