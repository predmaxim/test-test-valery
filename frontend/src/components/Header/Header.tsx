import logo from '@/assets/react.svg';
import {CreatePost, Search} from '@/components';
import {Link} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={`${styles.Header}`}>
      <Link to={ROUTES.home}>
        <img src={logo} className={styles.Header__logoImg} alt="logo"/>
      </Link>
      <Search/>
      <div className={styles.Header__menu}>
        <Link to={ROUTES.home}>
          Posts
        </Link>
        <CreatePost/>
      </div>
    </header>
  );
};
