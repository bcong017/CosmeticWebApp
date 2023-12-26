import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '',
    lazy: () => import('@/layouts/UserLayout'),
    children: [
      {
        index: true,
        lazy: () => import('@/Pages/HomePage'),
      },
      {
        path: 'item/:id',
        lazy: () => import('@/Pages/ItemPage'),
      },
      {
        path: 'categories/:name',
        lazy: () => import('@/Pages/CategoryPage'),
      },
      {
        path: 'search/searchTerm/:input',
        lazy: () => import('@/Pages/SearchResultPage'),
      },
      {
        path: 'aboutUs',
        lazy: () => import('@/Pages/AboutPage'),
      },
      {
        lazy: () => import('@/Global_reference/routes/ProtectedUserRoute'),
        children: [
          {
            path: 'userInfo',
            lazy: () => import('@/Pages/UserInfoPage'),
          },
          {
            path: 'userOrderPage',
            lazy: () => import('@/Pages/UserOrdersPage'),
          },
          {
            path: 'cart',
            lazy: () => import('@/Pages/UserInfoPage'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    lazy: () => import('@/Global_reference/routes/ProtectedAdminRoute'),
    children: [
      {
        index: true,
        lazy: () => import('@/Pages/AdminPage'),
      },
    ],
  },
  {
    path: '*',
    lazy: () => import('@/Pages/NotFoundPage'),
  },
]);
