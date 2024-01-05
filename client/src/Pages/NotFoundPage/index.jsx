import { Link } from 'react-router-dom';
import { Logo } from '@/Global_reference/assets/Logo';
export default function NotFoundPage({ text = 'trang' }) {
  return (
    <div className='translate-x-[-50%] translate-y-[-50%]  absolute left-[50%] top-[50%] font-extrabold text-4xl text-center'>
      Không tìm thấy {text} bạn yêu cầu, hãy bấm vào logo để được trở về trang
      chủ
      {text != 'trang' && (
        <div className='mt-4'>Đây có thể là lỗi từ hệ thống</div>
      )}
      <Link to={'/'}>
        <div className='flex justify-center items-center mt-4'>
          {' '}
          <Logo />
        </div>
      </Link>
    </div>
  );
}

export function Component() {
  return <NotFoundPage />;
}
