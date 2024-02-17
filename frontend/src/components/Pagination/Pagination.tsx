import styles from './Pagination.module.scss';
import {PostQueryProps} from '@/libs/types.ts';
import {Button} from '@/components';

type PaginationProps = {
  page: PostQueryProps['page'],
  pages: number,
  onClick: (page: number) => void
}

export const Pagination = ({page: activePage, pages, onClick}: PaginationProps) => {
  return (
    <div className={styles.Pagination}>
      {
        (Array.from({length: pages}, (_, i) => ++i))
          .map((page) => {
            return (
              <Button
                className={`${styles.Pagination__item} ${activePage === page ? styles.active : ''}`}
                onClick={() => onClick(page)}
                key={page}
              >
                {page}
              </Button>
            );
          })
      }
    </div>
  );
};
