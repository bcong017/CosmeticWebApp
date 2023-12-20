import { userPage, adminPage } from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '@/Pages/NotFoundPage';
import { Token } from '@/main';
export default function Routing() {
  const token = useContext(Token);

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFoundPage />}></Route>

        {token == 'admin' &&
          adminPage.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}

        {token == 'guest' &&
          PublicRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}

        {token == 'user' &&
          [...PublicRoutes, ...userPage].map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
      </Routes>
    </>
  );
}
