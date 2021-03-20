import React from 'react';
import { HeaderNav } from '../../routes/HeaderNavigation';
import ContentNavigation from '../Navigation/ContentNavigation';
import styles from './Main.module.css';

const Main = () => (
  <main className={styles.container}>
    <ContentNavigation route={HeaderNav} />
  </main>
);

export default Main;
