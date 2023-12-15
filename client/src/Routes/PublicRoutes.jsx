import ItemPage from '@/Pages/ItemPage';
import CartPage from '@/Pages/CartPage';
import CategoryPage from '@/Pages/CategoryPage';

const contentRoute = [
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
