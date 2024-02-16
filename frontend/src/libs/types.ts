import {DIRECTION, POST_LIMIT, SORT_BY} from './constants';

export type PostType = {
  _id: string,
  title: string,
  content: string
};

export type PostSortType = keyof typeof SORT_BY
export type PostSortDirectionType = keyof typeof DIRECTION

export type PostQueryProps = {
  limit?: typeof POST_LIMIT,
  page?: number,
  sortBy?: keyof typeof SORT_BY,
  direction?: keyof typeof DIRECTION,
  search?: string
}
