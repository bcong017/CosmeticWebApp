import HomePage from '@/Pages/HomePage';
import { userPage, adminPage } from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import NavBar from '@/Component/NavBar/NavBar';
import Footer from '@/Component/Footer/Footer';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '@/Pages/NotFoundPage';
import { Token } from '@/App';
export default function Routing() {
  const token = useContext(Token);
  return (
    <>
      <Routes>
        {token == 'admin' &&
          adminPage.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}

        <Route path='*' element={<NotFoundPage />}></Route>
        {token == 'guest' &&
          ((<NavBar />),
          PublicRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          )),
          (<Route path='/' element={<HomePage />} />),
          (<Footer />))}

        {token == 'user' &&
          ((<NavBar />),
          [...PublicRoutes, ...userPage].map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          )),
          (<Route path='/' element={<HomePage />} />),
          (<Footer />))}
      </Routes>
    </>
  );
}

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {/* This element will render either <DashboardMessages> when the URL is
//             "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
//         */}
//       <Outlet />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path='/' element={<Dashboard />}>
//         <Route path='messages' element={<AdminPage />} />
//         <Route path='tasks' element={<UserOrderPage />} />
//       </Route>
//     </Routes>
//   );
// }
