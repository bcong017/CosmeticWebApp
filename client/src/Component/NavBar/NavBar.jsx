import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './NavBar.css';

function NavBar() {
  return (
    <>
      <div id='header'>
        {/*begin nav*/}
        <Link id='Logo' to='/'>
          <img src='../Full_Logo.png' alt='Logo' />
        </Link>
        <a className='category' href='#'>
          Danh mục
          <i className='fa-solid fa-arrow-down arrow-down-icon'></i>
          <div className='container'>
            <ul className='subnav'>
              <span> Chăm sóc da mặt</span>
              <li>
                <a href='#'>Tẩy trang mặt</a>
              </li>
              <li>
                <a href='#'>Sữa rửa mặt</a>
              </li>
              <li>
                <a href='#'>Tẩy tế bào chết</a>
              </li>
              <li>
                <a href='#'>Dưỡng môi</a>
              </li>
            </ul>
            <ul className='subnav'>
              <span> Trang điểm mặt</span>
              <li>
                <a href='#'>Kem lót</a>
              </li>
              <li>
                <a href='#'>Kem nền</a>
              </li>
              <li>
                <a href='#'>Phấn nước Cushion</a>
              </li>
            </ul>
            <ul className='subnav'>
              <span> Chăm sóc tóc và da đầu</span>
              <li>
                <a href='#'>Dầu gội</a>
              </li>
              <li>
                <a href='#'>Dầu xả</a>
              </li>
              <li>
                <a href='#'>Dưỡng tóc</a>
              </li>
            </ul>
            <ul className='subnav'>
              <span> Nước hoa</span>
              <li>
                <a href='#'>Nước hoa nữ</a>
              </li>
              <li>
                <a href='#'>Nước hoa nam</a>
              </li>
              <li>
                <a href='#'>Xịt thơm toàn thân</a>
              </li>
              <li>
                <a href='#'>Nước hoa vùng kín</a>
              </li>
            </ul>
          </div>
        </a>
        <SearchBar></SearchBar>
        <div className='tooltip'>
          <Link to='/'>
            <i className='fa-solid fa-circle-user user-icon'></i>
          </Link>
          <span className='tooltiptext'>Đăng nhập / Đăng ký</span>
        </div>
        <div className='tooltip'>
          <Link to='/'>
            <i className='fa-solid fa-cart-shopping cart-icon'></i>
          </Link>
          <span className='tooltiptext'>Giỏ hàng</span>
        </div>
        {/*end nav*/}
      </div>
    </>
  );
}

export default NavBar;
