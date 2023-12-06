import { CheckboxGroup, Checkbox, Input, Button } from '@nextui-org/react';
import Card from '@/Component/Card/Card';
const list = [
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
          {list.map((item, index) => (
            <Card
              itemName={item.itemName}
              imgURL={item.imgURL}
              price={item.price}
              key={index}
              className='self-center'
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
