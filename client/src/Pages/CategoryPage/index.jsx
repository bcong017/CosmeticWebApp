import {
  CheckboxGroup,
  Checkbox,
  Input,
  Button,
  Pagination,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@/Component/Card/Card';
import categories from '@/Api_Call/categories';
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
function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  let [ItemsInfo, setItemsInfo] = useState({});

  let arrayOfPages = [];
  async function getItemList() {
    const items = await categories
      .getItems(location.pathname)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(items);

    // setItemsInfo(items);
    // console.log(ItemsInfo);

    // generatePages(items);
    console.log(arrayOfPages);
  }
  function generatePages(items) {
    let amountOfItems = items?.resultedItems?.length;

    if (amountOfItems == undefined) return;

    while (amountOfItems - 25 > 0) {
      let page = [];
      if (amountOfItems >= 25) {
        for (let i = 0; i < 25; i++) {
          page.push(items?.resultedItems?.[i]);
        }
      } else {
        for (let i = 0; i < amountOfItems; i++) {
          page.push(items?.resultedItems?.[i]);
        }
      }
      arrayOfPages.push(page);
      amountOfItems -= 25;
    }
    let page = [];
    for (let i = 0; i < amountOfItems; i++) {
      page.push(ItemsInfo?.resultedItems?.[i]);
    }
    arrayOfPages.push(page);
  }
  useEffect(() => {
    getItemList();
    // console.log(ItemsInfo?.resultedItems?.[0]);
    // generatePages();
  }, []);

  useEffect(() => {
    if (currentPage == 1) {
      list1 = list2;
    } else {
      list1 = list3;
    }
  }, [currentPage]);
  return (
    <div className='flex flex-row my-5 mx-5'>
      <div className='block mr-10 w-[320px]'>
        <div className='bg-heavy-pink py-4 px-4'>
          <div className='text-xl ml-4 mb-4 font-bold'>Giá</div>
          <div className='flex align-middle '>
            <Input type='number' placeholder='Từ' className='w-[100px]' />
            <div className='text-center py-5 pl-1'>VND</div>
            <div className='text-center py-5 px-2'>-</div>
            <Input type='number' placeholder='Đến' className='w-[100px]' />
            <div className='text-center py-5 pl-1'>VND</div>
          </div>
          <Button
            endContent={<i className='fa-solid fa-check'></i>}
            disableRipple='true'
            className='mt-4 font-semibold w-[100%]'
          >
            Áp dụng
          </Button>
        </div>
        <div className='bg-heavy-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Thương hiệu</div>

          <CheckboxGroup disableAnimation className='mt-4 ml-2'>
            <Checkbox value='buenos-aires'>Buenos Aires</Checkbox>
            <Checkbox value='sydney'>Sydney</Checkbox>
            <Checkbox value='san-francisco'>San Francisco</Checkbox>
            <Checkbox value='london'>London</Checkbox>
            <Checkbox value='tokyo'>Tokyo</Checkbox>
          </CheckboxGroup>
        </div>
        <div className='bg-heavy-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Size</div>

          <CheckboxGroup disableAnimation className='mt-4 ml-2'>
            <Checkbox value='buenos-aires'>Buenos Aires</Checkbox>
            <Checkbox value='sydney'>Sydney</Checkbox>
            <Checkbox value='san-francisco'>San Francisco</Checkbox>
            <Checkbox value='london'>London</Checkbox>
            <Checkbox value='tokyo'>Tokyo</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      <div className='bg-section-blue w-[100%] px-4 py-4'>
        <div className='text-xl font-bold'>
          Chăm sóc da mặt{' '}
          <span className='text-base font-extralight'>
            &#40; Số lượng: 100 &#41;
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
          {/* <div className='flex gap-2'>
            <Button
              size='sm'
              variant='flat'
              color='secondary'
              onPress={() =>
                setCurrentIndex((prev) => (prev > 1 ? prev - 1 : prev + 9))
              }
            >
              Previous
            </Button>
            <Button
              size='sm'
              variant='flat'
              color='secondary'
              onPress={() =>
                setCurrentIndex((prev) => (prev < 10 ? prev + 1 : prev - 9))
              }
            >
              Next
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
