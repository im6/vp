import React from 'react'
import { Link } from "react-router-dom";

class Header extends React.Component {render() {
    return (
      <div>
        <h1>this is Header</h1>
        <ul>
          <li>
            <Link to="/">Popular</Link>
          </li>
          <li>
            <Link to="/latest">Latest</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
