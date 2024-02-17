import {Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {HomePage, NotFoundPage, PostPage} from '@/pages';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage/>}/>
      <Route path={`${ROUTES.post}/:id`} element={<PostPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};
