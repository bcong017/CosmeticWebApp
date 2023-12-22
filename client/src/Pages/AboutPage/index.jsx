import { Link } from 'react-router-dom';
import { Logo } from '../../Global_reference/assets/Logo';

export default function AboutPage() {
  return (
    <div className='h-[800px] flex justify-center items-center '>
      <div className='flex flex-col'>
        <div className='flex justify-center items-center'>
          <div className='flex flex-row'>
            <Link to='/'>
              <Logo />
            </Link>
            <Link className='flex justify-center items-center' to='/'>
              <div className='  font-bold text-heavy-pink uppercase'>
                Glamour heaven
              </div>
            </Link>
          </div>
        </div>
        <div className='font-bold text-heavy-pink uppercase flex flex-col justify-center gap-5 mt-4'>
          <div className='flex justify-center items-center'>Thực hiện:</div>
          <div>Frontend: Nguyễn Bá Công</div>
          <div>Backend: Nguyễn Minh Duy</div>
        </div>
      </div>
    </div>
  );
}
