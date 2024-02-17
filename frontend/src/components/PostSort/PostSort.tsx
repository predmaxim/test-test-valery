import styles from './PostSort.module.scss';
import {DIRECTION, SORT_BY, SORT_BY_DEFAULT} from '@/libs/constants';
import {ChangeEvent, useState} from 'react';
import {PostQueryProps} from '@/libs/types';
import {genFirstLetterUpperCase} from '@/libs/helpers';

type PostSortProps = PostQueryProps & {
  onChange: (sortValue: string[]) => void
}

export const PostSort = ({onChange}: PostSortProps) => {
  const [selectedValue, setSelectedValue] = useState(`${SORT_BY_DEFAULT} ${DIRECTION}`);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.currentTarget.value);
    onChange(e.currentTarget.value.split(' '));
  };

  return (
    <select
      className={`${styles.PostSort} input`}
      onChange={onChangeHandler}
      value={selectedValue}
    >
      {/*<option value="">- Sort By-</option>*/}
      {Object.values(SORT_BY).map((sortValue) => {
        return Object.values(DIRECTION).map((directionValue) => {
          return (
            <option value={`${sortValue} ${directionValue}`} key={sortValue + directionValue}>
              {genFirstLetterUpperCase([sortValue, directionValue])}
            </option>
          );
        });
      })}
    </select>
  );
};
