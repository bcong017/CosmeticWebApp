import ItemPage from '@/Pages/ItemPage';
import CategoryPage from '@/Pages/CategoryPage';
import HomePage from '@/Pages/HomePage';
import SearchResultPage from '@/Pages/SearchResultPage';
import AboutPage from '@/Pages/AboutPage';
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
  {
    path: '/search/searchTerm/:input',
    element: <SearchResultPage />,
  },
  {
    path: '/aboutUs',
    element: <AboutPage />,
  },
];
export default contentRoute;
