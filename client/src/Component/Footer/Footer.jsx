import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <Link to='/'>
          <img src='../Full_Logo.png' alt='' />
        </Link>
      </div>
      <div className='footer-about-us'>
        <Link to='/'>Về chúng tôi</Link>
      </div>
    </div>
  );
}

export default Footer;
