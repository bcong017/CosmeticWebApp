import Carousel from '../../Component/Carousel/Carousel';
import './style.css';

function HomePage() {
  return (
    <div className='home-page-body'>
      <Carousel title='Bán chạy' className='w-1'></Carousel>
      <Carousel title='Bạn đã xem gì'></Carousel>
      <Carousel title='Giành riêng cho bạn'></Carousel>
    </div>
  );
}

export default HomePage;
