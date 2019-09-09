import React from 'react';
import logo from './kb.svg';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img src={logo} className={styles.Logo} alt="logo" />
      </header>
    </div>
  );
}

export default App;
