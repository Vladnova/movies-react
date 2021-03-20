import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({
  route,
  url = '',
  className = '',
  activeClassName = '',
}) => (
  <nav>
    <ul className={className[0]}>
      {route.map(
        ({ name, path, exact }) =>
          name &&
          name !== 'DefaultPage' && (
            <li key={path} className={className[1]}>
              <NavLink
                className={className[2]}
                activeClassName={activeClassName}
                exact={exact}
                to={`${url}${path}`}
              >
                {name}
              </NavLink>
            </li>
          ),
      )}
    </ul>
  </nav>
);
export default Navigation;
