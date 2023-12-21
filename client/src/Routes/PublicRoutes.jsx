import ItemPage from '@/Pages/ItemPage';
import CategoryPage from '@/Pages/CategoryPage';
import HomePage from '@/Pages/HomePage';

const contentRoute = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/item/:id',
    element: <ItemPage />,
  },

  {
    path: '/categories/:name',
    element: <CategoryPage />,
  },
];
export default contentRoute;
