import { Button } from '@nextui-org/react';
import FunctionTabs from './FunctionTabs';
// import { Routes, Route } from 'react-router-dom';
// import CategoryTabs from './CategoryTabs';
function AdminPage() {
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
      >
        Đăng xuất
      </Button>
    </div>
  );
}

export default AdminPage;
