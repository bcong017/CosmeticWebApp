import { Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@/Component/Card/Card';

let list1 = [
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
];
let list2 = [
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://courses.uit.edu.vn/pluginfile.php/1/core_admin/logo/0x200/1695027451/logo-header.png',
    price: '100.000 VND',
  },
];
let list3 = [
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
  {
    itemName: 'Sữa rửa mặt',
    imgURL:
      'https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',
    price: '100.000 VND',
  },
];
function SearchResultPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (currentPage == 1) {
      list1 = list2;
    } else {
      list1 = list3;
    }
  }, [currentPage]);
  useEffect(() => {
    console.log(location.state.length);
    console.log(location.pathname.substring(19));
  }, []);
  return (
    <div className='flex flex-row my-5 mx-5'>
      <div className='bg-section-blue w-[100%] px-4 py-4'>
        <div className='text-xl font-bold'>
          Kết quả tìm kiếm:{' ' + location.pathname.substring(19) + ' '}
          <span className='text-base font-extralight'>
            &#40; Số lượng: {location.state.length} &#41;
          </span>
        </div>
        <div className='grid grid-cols-5 grid-rows-5 gap-3'>
          {list1.map((item, index) => (
            <Card
              itemName={item.itemName}
              imgURL={item.imgURL}
              price={item.price}
              key={index}
              className='self-center'
            ></Card>
          ))}
        </div>
        <div className='flex flex-col gap-5'>
          <Pagination
            total={10}
            color='secondary'
            page={currentPage}
            onChange={setCurrentPage}
            showControls='true'
            loop='true'
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;
