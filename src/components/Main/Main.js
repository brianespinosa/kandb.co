import styles from './Main.module.scss';

import clsx from 'clsx';

const Main = ({ children, ...rest }) => (
  <main {...rest} className={clsx(styles._, rest.className)}>
    {children}
  </main>
);

export default Main;
