import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper teal" style={{ padding: '0 2rem' }}>
        <span className="brand-logo left">Notes app</span>
        <ul id="nav-mobile" className="right">
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>
          <li>
            <NavLink to="/user">Profile</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
