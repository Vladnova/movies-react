import React from 'react';
import { HeaderNav } from '../../routes/HeaderNavigation';
import Navigation from '../Navigation';
import styles from './Header.module.css'

const Header = () => (
    <header className={styles.container}>
      <Navigation route={HeaderNav} />
    </header>
  );
export default Header;
