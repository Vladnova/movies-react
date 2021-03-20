import React from 'react';
import { HeaderNav } from '../../routes/HeaderNavigation';
import Navigation from '../Navigation';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.container}>
    <Navigation
      route={HeaderNav}
      className={[styles.wrapList, styles.item, styles.link]}
      activeClassName={styles.activeLink}
    />
  </header>
);
export default Header;
