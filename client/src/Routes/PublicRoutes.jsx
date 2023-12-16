import ItemPage from '@/Pages/ItemPage';
import CartPage from '@/Pages/CartPage';
import CategoryPage from '@/Pages/CategoryPage';
import HomePage from '@/Pages/HomePage';

const contentRoute = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/item',
    element: <ItemPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/category',
    element: <CategoryPage />,
  },
];
export default contentRoute;
