import {PostDetails} from '../../components';
import {useParams} from 'react-router-dom';

export const PostPage = () => {
  const params = useParams();
  return (
    <div>
      {params.id && <PostDetails id={params.id}/>}
    </div>
  );
};
