import UserInfoPage from '@/Pages/UserInfoPage';
import AdminPage from '@/Pages/AdminPage';
import UserOrderPage from '@/Pages/UserOrdersPage';

export const userPage = [
  {
    path: '/userInfo',
    element: <UserInfoPage />,
  },
  {
    path: '/userOrderPage',
    element: <UserOrderPage />,
  },
];

export const adminPage = [
  {
    path: '/',
    element: <AdminPage />,
  },
];
