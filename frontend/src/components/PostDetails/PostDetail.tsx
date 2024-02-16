import {PostType} from '../../libs/types.ts';
import {usePostStore} from '../../store';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

type PostDetailProps = {
  id: PostType['_id']
}

export const PostDetails = ({id}: PostDetailProps) => {
  const getPost = usePostStore(state => state.getPost);
  const params = useParams();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    getPost(id || params.id as string)
      .then(post => setPost(post));
  }, [getPost, id, params.id]);

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
};
