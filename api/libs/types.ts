import {DIRECTION, SORT_BY} from '../libs/constants';

export type PostType = {
  _id?: string,
  title: string,
  content: string
};

export type PostSortType = keyof typeof SORT_BY
export type PostSortDirectionType = keyof typeof DIRECTION
