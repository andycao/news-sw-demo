import React from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav className="App-header">
      <ul>
        <li>
          <NavLink to="/index" activeClassName="active">
            Index
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName="active">
            List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
