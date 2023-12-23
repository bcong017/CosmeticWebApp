import {
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Pagination,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@/Component/Card/Card';
import categories from '@/Api_Call/categories';
import { CAT, CAT_TITLE } from '@/Global_reference/variables';

function CategoryPage() {
  const location = useLocation();
  let [ItemsInfo, setItemsInfo] = useState({});
  let [title, setTitle] = useState('');
  let [selectedPage, setSelectedPage] = useState(1);
  let [brandSelected, setBrandSelected] = useState([]);
  let [countrySelected, setCountrySelected] = useState([]);
  let [ppSelected, setPPSelected] = useState([]);
  let [priceOrder, setPriceOrder] = useState('LTH');

  const fetchItems = (option) => {
    console.log(option);
    return categories
      .getItems(`${location.pathname}/${option}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function getItemList() {
    const items = await fetchItems('');
    setItemsInfo(items);
  }

  useEffect(() => {
    getItemList();
    setBrandSelected([]);
    setCountrySelected([]);
    setPPSelected([]);
    setSelectedPage(1);
    setTitle(CAT_TITLE[location.pathname.substring(12)]);
  }, [location]);

  useEffect(() => {
    let appendedURL = `&country=${countrySelected.join(
      ',',
    )}&productionPlaces=${ppSelected.join(',')}&brand=${brandSelected.join(
      ',',
    )}`;
    (async function () {
      setItemsInfo(
        await fetchItems(
          `filter-items?order=${priceOrder}&page=${selectedPage}${appendedURL}`,
        ),
      );
    })();
  }, [brandSelected, countrySelected, ppSelected, priceOrder, selectedPage]);

  return (
    <div className='flex flex-row my-5 mx-5'>
      <div className='block mr-10 w-[320px]'>
        <div className='bg-section-pink py-4 px-4'>
          <div className='text-xl ml-4 mb-4 font-bold'>Xếp theo giá</div>

          <RadioGroup
            color='primary'
            defaultValue='LTH'
            value={priceOrder}
            onValueChange={setPriceOrder}
          >
            <Radio value='LTH'>Từ thấp đến cao</Radio>
            <Radio value='HTL'>Từ cao đến thấp</Radio>
          </RadioGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Thương hiệu</div>

          <CheckboxGroup
            disableAnimation
            className='mt-4 ml-2'
            value={brandSelected}
            onChange={setBrandSelected}
          >
            {ItemsInfo?.filterOptions?.brand?.map((name, index) => (
              <Checkbox value={name} key={index}>
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Xuất xứ</div>

          <CheckboxGroup
            disableAnimation
            className='mt-4 ml-2'
            value={countrySelected}
            onChange={setCountrySelected}
          >
            {ItemsInfo?.filterOptions?.country?.map((name, index) => (
              <Checkbox value={name} key={index}>
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Nơi sản xuất</div>

          <CheckboxGroup
            disableAnimation
            className='mt-4 ml-2'
            value={ppSelected}
            onChange={setPPSelected}
          >
            {ItemsInfo?.filterOptions?.productionPlaces?.map((name, index) => (
              <Checkbox value={name} key={index}>
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>
      <div className='bg-section-blue w-[100%] px-4 py-4'>
        <div className='text-xl font-bold'>
          {title}{' '}
          <span className='text-base font-extralight'>
            &#40; Số lượng: {ItemsInfo?.resultedItems?.length} &#41;
          </span>
        </div>
        <div className='grid grid-cols-5 grid-rows-2 gap-3'>
          {ItemsInfo?.resultedItems?.length != 0 ? (
            ItemsInfo?.resultedItems?.map((item) => (
              <Card
                itemName={item.name}
                imgURL={item.first_image_url}
                price={item.price}
                key={item.id}
                id={item.id}
                className='self-center'
              ></Card>
            ))
          ) : (
            <div className='m-[100px] flex justify-center items-center font-bold'>
              Không có sản phẩm phù hợp
            </div>
          )}
        </div>
        {ItemsInfo?.resultedItems?.length != 0 && (
          <div className='flex flex-col gap-5'>
            <Pagination
              total={ItemsInfo?.totalPages}
              color='primary'
              page={ItemsInfo?.currentPage}
              onChange={(number) => {
                setSelectedPage(number);
              }}
              showControls='true'
              loop='true'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
