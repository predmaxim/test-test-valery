import {Button, Modal, PostForm} from '@/components';
import {useCallback, useId, useState} from 'react';
import {PostType} from '@/libs/types';
import {usePostStore} from '@/store';

export const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const addPost = usePostStore((state) => state.addPost);
  const formId = useId();

  const createPostHandler = useCallback((post: Partial<PostType>) => {
    addPost(post as PostType);
    setShowModal(false);
  }, [addPost]);

  const onClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  return (<>
    <Button
      children={'Create Post'}
      onClick={onClick}
    />
    {showModal &&
      <Modal
        onCancel={onCancel}
        header="Create New Post"
        formId={formId}
      >
        <PostForm onSubmit={createPostHandler} id={formId}/>
      </Modal>
    }
  </>);
};
