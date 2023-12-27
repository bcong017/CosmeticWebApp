import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/Global_reference/context/auth';
import { APP_ROLE } from '../variables';

function ProtectedAdminRoute() {
  const { token, role } = useAuth();

  return token && role === APP_ROLE.ADMIN ? <Outlet /> : <Navigate to='/' />;
}

export function Component() {
  return <ProtectedAdminRoute />;
}
