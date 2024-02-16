export const API_URL = import.meta.env.API_URL || 'http://localhost:5000';
export const POST_LIMIT: number = 10;
export const POST_TITLE_LIMIT: number = 12;
export const POST_CONTENT_LIMIT: number = 50;
export const SORT_BY = {title: 'title'} as const;
export const SORT_BY_DEFAULT = SORT_BY.title;
export const DIRECTION = {
  asc: 'asc',
  desc: 'desc'
} as const;
export const DIRECTION_DEFAULT = DIRECTION.asc;
export const PAGE_DEFAULT = 1;
