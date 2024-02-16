import {PostQueryProps, PostType} from '../../libs/types';
import {usePostStore} from '../../store';
import {useCallback, useEffect, useState} from 'react';
import {PAGE_DEFAULT, POST_LIMIT} from '../../libs/constants';
import {Pagination, PostCard, PostSort} from '../../components';
import styles from './PostGrid.module.scss';

export type PostGridProps = Omit<PostQueryProps, 'page'> & { pagination?: boolean, sort?: boolean };

export const PostGrid = ({limit, sortBy, direction, pagination = false, sort = false}: PostGridProps) => {
  const [
    posts = [],
    total,
    getPosts,
    search
  ] = usePostStore((state) =>
    [state.posts, state.total, state.getPosts, state.search]);
  const [
    query,
    setQuery
  ] = useState<PostQueryProps>({limit, sortBy, direction, search, page: PAGE_DEFAULT});

  const [pagesNum, setPageNum] = useState(Math.round(total / (limit ?? POST_LIMIT)));

  const getPageNum = useCallback(
    () => Math.round(total / (limit ?? POST_LIMIT)),
    [limit, total]);

  const onClickPagination = useCallback((page: number) => {
    setQuery({...query, page, search});
  }, [query, search]);

  const setSortHandler = useCallback((sortValue: string[]) => {
    const [sortBy, direction] = sortValue;
    setQuery({...query, sortBy, direction, search} as PostQueryProps);
  }, [query, search]);

  const onRemovePostHandler = useCallback(() => {
    setQuery({...query, search});
  }, [query, search]);

  useEffect(() => {
    getPosts({...query, search});
    setPageNum(getPageNum());
  }, [getPageNum, getPosts, query, search]);

  return (
    <div className={styles.PostGrid}>
      {!posts.length
        ? <h3>Posts Not Found</h3>
        : <>
          {sort && <PostSort page={query.page} onChange={setSortHandler}/>}
          {posts.map((post: PostType) => {
            return (
              <PostCard
                key={post._id}
                post={post}
                className={styles.PostGrid__item}
                onRemove={onRemovePostHandler}
              />
            );
          })}
          {pagination && <Pagination
            onClick={onClickPagination}
            pages={pagesNum}
            page={query.page}
          />}
        </>
      }
    </div>
  );
};
