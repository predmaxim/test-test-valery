import {Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {HomePage} from '../pages/HomePage/HomePage.tsx';
import {PostPage} from '../pages/PostPage/PostPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage/>}/>
      <Route path={`${ROUTES.post}/:id`} element={<PostPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};
