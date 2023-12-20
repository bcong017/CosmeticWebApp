import UserInfoPage from '@/Pages/UserInfoPage';
import AdminPage from '@/Pages/AdminPage';
import UserOrderPage from '@/Pages/UserOrdersPage';
import CartPage from '@/Pages/CartPage';

export const userPage = [
  {
    path: '/userInfo',
    element: <UserInfoPage />,
  },
  {
    path: '/userOrderPage',
    element: <UserOrderPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
];

export const adminPage = [
  {
    path: '/',
    element: <AdminPage />,
  },
];
