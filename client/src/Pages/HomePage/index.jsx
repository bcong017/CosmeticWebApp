import Carousel from '@/Component/Carousel/Carousel';
import './style.css';
import { useEffect, useState } from 'react';

import common from '@/Api_Call/common';
function HomePage() {
  let [ItemList, setItemList] = useState([]);
  async function getItemList() {
    const items = await common
      .getItems()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    setItemList(items);
  }
  useEffect(() => {
    getItemList();
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
