import { Outlet } from 'react-router-dom';
import NavBar from '@/Component/NavBar/NavBar';
import Footer from '@/Component/Footer/Footer';

function UserLayout() {
  return (
    <div id='app-body'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export function Component() {
  return <UserLayout />;
}
