import styles from './Search.module.scss';
import {ChangeEvent} from 'react';
import {Button} from '@/components';
import {RiCloseLine} from 'react-icons/ri';
import {usePostStore} from '@/store';

export function Search() {
  const [
    search,
    setSearch
  ] = usePostStore(state =>
    [state.search, state.setSearch]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClear = () => {
    setSearch('');
  };

  return (
    <div className={styles.Search}>
      <input
        type="text"
        id="Search__input"
        className={`${styles.Search__input} input`}
        placeholder="Search"
        value={search}
        onChange={onChangeHandler}
      />
      <Button
        onClick={onClear}
        icon={RiCloseLine}
        className={!search ? styles.Button : `${styles.Button} ${styles.active}`}
      />
    </div>
  );
}
