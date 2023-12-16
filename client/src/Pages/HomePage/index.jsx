import Carousel from '@/Component/Carousel/Carousel';
import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  let [ItemList, setItemList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        setItemList(res.data ?? []);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Carousel
        listOfItem={ItemList?.topSoldItems}
        title='Bán chạy'
        className='w-1'
      ></Carousel>
      <Carousel
        title='Được người dùng ưa thích'
        listOfItem={ItemList?.topRatedItems}
      ></Carousel>

      {/* <Carousel title='Dành riêng cho bạn'></Carousel> */}
    </div>
  );
}

export default HomePage;
