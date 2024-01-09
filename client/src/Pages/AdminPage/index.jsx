import { Button } from '@nextui-org/react';
import FunctionTabs from './FunctionTabs';
import { useAuth } from '@/Global_reference/context/auth';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const { setToken, setRole } = useAuth();
  const nav = useNavigate();
  const handleLogOut = () => {
    setToken('');
    setRole('');
    nav('/');
  };
  return (
    <div className='mx-20 my-5'>
      <img
        src='src/Global_reference/assets/logo.svg'
        alt=''
        className='m-auto'
      />
      <div className='font-bold text-2xl mb-4 text-center uppercase'>
        Trang quản lý cho cửa hàng Glamour Haven
      </div>
      <FunctionTabs />

      <Button
        endContent={<i className='fa-solid fa-check'></i>}
        disableRipple='true'
        className='mt-4 font-semibold w-[100%]'
        onClick={() => {
          handleLogOut();
        }}
      >
        Đăng xuất
      </Button>
    </div>
  );
}

export function Component() {
  return <AdminPage />;
}

export default AdminPage;
