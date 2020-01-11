import React from 'react';
import styles from './Section.module.css';

const Section = ({ title, children }) => {
  return (
    <section className={styles._}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
