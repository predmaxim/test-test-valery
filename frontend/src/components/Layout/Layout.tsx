import {ReactNode} from 'react';
import {Footer, Header} from '@/components';
import styles from './Layout.module.scss';

export const Layout = ({children}: { children: ReactNode }) => {

  return (<>
    <Header/>
    <main className={`${styles.main} main`}>
      {children}
    </main>
    <Footer/>
  </>);
};
