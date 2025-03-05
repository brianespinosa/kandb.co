import Head from 'next/head';

import package_ from '../../package.json';
import Logo from '../components/Logo';
import Main from '../components/Main';

const Home = () => {
  return (
    <Main>
      <Head>
        <title>{package_.name}</title>
      </Head>

      <Logo />
    </Main>
  );
};

export default Home;
