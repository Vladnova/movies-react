import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({route, url =''}) =>(
  <nav >
      <ul className={styles.wrapList}>
        {route.map(({ name, path, exact}) =>
        name&&<li key={path} className={styles.item}>
            <NavLink className={styles.link} activeClassName={styles.activeLink}
              exact={exact}
              to={`${url}${path}`}>
            {name}
          </NavLink>
        </li>
        )}
      </ul>
    </nav>
  );
export default Navigation;
