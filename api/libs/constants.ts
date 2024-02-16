export const PORT = process.env.API_PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:root@mongo:27017/ttv';
export const APP_URL = process.env.APP_URL || 'http://localhost:3000';
export const POST_LIMIT = 10;
export const SORT_BY = {title: 'title'} as const;
export const DIRECTION = {asc: 'asc', desc: 'desc'} as const;
