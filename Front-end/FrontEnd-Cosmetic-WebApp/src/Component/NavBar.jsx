import './NavBar.css'
function NavBar() {
    return(
<>
    <div id="header">
                {/*begin nav*/}
                <a id='imgA' href="#"><img src="../Full_Logo.png" alt="" /></a>
                <a className='navBarItem' href="#">Danh mục
                        <i className="fa-solid fa-arrow-down arrow-down-icon"></i>
                        <div className='container'>
                            
                            <ul className="subnav">
                                <span> Chăm sóc da mặt</span>
                                <li><a href="#">Tẩy trang mặt</a></li>
                                <li><a href="#">Sữa rửa mặt</a></li>
                                <li><a href="#">Tẩy tế bào chết</a></li>
                                <li><a href="#">Dưỡng môi</a></li>
                            </ul>
                            <ul className="subnav">
                                <span> Trang điểm mặt</span>
                                <li><a href="#">Kem lót</a></li>
                                <li><a href="#">Kem nền</a></li>
                                <li><a href="#">Phấn nước Cushion</a></li>
                            </ul>
                            <ul className="subnav">
                                <span> Chăm sóc tóc và da đầu</span>
                                <li><a href="#">Dầu gội</a></li>
                                <li><a href="#">Dầu xả</a></li>
                                <li><a href="#">Dưỡng tóc</a></li>
                            </ul>
                            <ul className="subnav">
                                <span> Nước hoa</span>
                                <li><a href="#">Nước hoa nữ</a></li>
                                <li><a href="#">Nước hoa nam</a></li>
                                <li><a href="#">Xịt thơm toàn thân</a></li>
                                <li><a href="#">Nước hoa vùng kín</a></li>
                            </ul>
                        </div>
                </a>
                <input type="text" placeholder='Tìm kiếm' />
                <a className='navBarItem' href="#">Đăng nhập/Đăng ký</a>
                <a href=""><i className="fa-solid fa-cart-shopping cart-icon"></i></a>
                {/*end nav*/}
    </div>
</>
)
}






export default NavBar
