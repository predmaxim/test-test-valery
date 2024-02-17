import {Link} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import styles from './PostCard.module.scss';
import {PostType} from '@/libs/types';
import {Button, Modal, PostForm} from '@/components';
import {usePostStore} from '@/store';
import {useCallback, useId, useState} from 'react';

export type PostCardProps = {
  post: PostType,
  onRemove: () => void,
  className: string
};

export const PostCard = ({post, onRemove, className}: PostCardProps) => {
  const [
    deletePost,
    updatePost
  ] = usePostStore(state =>
    [state.deletePost, state.updatePost]);
  const [showModal, setShowModal] = useState(false);
  const formId = useId();

  const removeAction = useCallback(() => {
    deletePost(post._id);
    onRemove();
  }, [deletePost, onRemove, post._id]);

  const editHandler = useCallback(() => {
    setShowModal(true);
  }, []);

  const updatePostHandler = useCallback((postFields: PostType) => {
    updatePost({...post, ...postFields});
    setShowModal(false);
  }, [post, updatePost]);

  const onCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className={`${styles.PostGrid} ${className}`}>
      <div key={post._id} className={styles.PostCard}>
        <h3>
          <Link to={`${ROUTES.post}/${post._id}`}>
            {post.title}
          </Link>
        </h3>
        <p>{post.content}</p>
        <div className={styles.PostCard__actions}>
          <Button onClick={removeAction}>Remove</Button>
          <Button onClick={editHandler}>Edit</Button>
          {showModal &&
            <Modal
              onCancel={onCancel}
              header="Update Post"
              formId={formId}
            >
              <PostForm onSubmit={updatePostHandler} post={post} id={formId}/>
            </Modal>}
        </div>
      </div>
    </div>
  );
};
