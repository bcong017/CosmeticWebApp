import Carousel from '@/Component/Carousel/Carousel';
import './style.css';
import { useEffect, useState } from 'react';
import { APP_ROLE } from '@/Global_reference/variables.js';
import { useAuth } from '@/Global_reference/context/auth.jsx';

import common from '@/Api_Call/common';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const nav = useNavigate();
  const { role } = useAuth();
  let [ItemList, setItemList] = useState({});
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
    if (role == APP_ROLE.ADMIN) {
      nav('/admin');
    } else {
      getItemList();
    }
  }, [location]);

  return (
    <div className='flex flex-col gap-8 mt-2'>
      <Carousel
        listOfItem={ItemList?.topSoldItems}
        title='Bán chạy'
        className='mt-4'
      ></Carousel>
      <Carousel
        title='Được người dùng ưa thích'
        listOfItem={ItemList?.topRatedItems}
      ></Carousel>
    </div>
  );
}

export function Component() {
  return <HomePage />;
}

export default HomePage;
