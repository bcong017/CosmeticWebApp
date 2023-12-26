import { RouterProvider } from 'react-router-dom';
import AuthProvider from './Global_reference/context/auth';
import { router } from './Global_reference/routes';
import '@/App.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
