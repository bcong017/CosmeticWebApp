import { Link } from 'react-router-dom';
import './Footer.css';
import { Logo } from '../../Global_reference/assets/Logo';

function Footer() {
  return (
    <div className='footer'>
      <div className='flex justify-center items-center'>
        <Link to='/'>
          <Logo />
        </Link>
        <Link to='/'>
          <div className='hidden sm:block font-bold text-heavy-pink uppercase'>
            Glamour heaven
          </div>
        </Link>
      </div>
      <div className='footer-about-us'>
        <Link to='/'>Về chúng tôi</Link>
      </div>
    </div>
  );
}

export default Footer;
