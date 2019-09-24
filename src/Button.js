import React, { PureComponent } from 'react';
import styles from './App.module.css';

class Button extends PureComponent {
  render() {
    const { href, content } = this.props;
    return (
      <a
        className={styles.Button}
        href={href}
        rel='noopener noreferrer'
        target='_blank'
      >
        {content}
      </a>
    );
  }
}

export default Button;
