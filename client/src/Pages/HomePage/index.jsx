import Carousel from '../../Component/Carousel/Carousel';
import './style.css';

function HomePage() {
  return (
    <div className='home-page-body'>
      <Carousel title='Bán chạy' className='w-1'></Carousel>
      <Carousel title='Dành riêng cho bạn'></Carousel>
      <Carousel title='Bạn đã xem gì'></Carousel>
    </div>
  );
}

export default HomePage;
