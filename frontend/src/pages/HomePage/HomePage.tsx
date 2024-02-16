import {PostGrid} from '../../components';

export const HomePage = () => {
  return (
    <div>
      <h1>Posts</h1>
      <PostGrid limit={5} pagination sort/>
    </div>
  );
};
