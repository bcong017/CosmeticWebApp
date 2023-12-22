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
import { CAT } from '@/Global_reference/variables';

function CategoryPage() {
  const location = useLocation();
  let [ItemsInfo, setItemsInfo] = useState({});
  let [selectedPage, setSelectedPage] = useState(1);
  function setCategoryName() {
    switch (location.pathname.substring(12)) {
      case CAT.tt:
        return 'Tẩy trang';
      case CAT.kl:
        return 'Kem lót';
      case CAT.kn:
        return 'Kem nền';
      case CAT.pn:
        return 'Phấn nước';
      case CAT.dx:
        return 'Dầu xả';
      case CAT.tth:
        return 'Xịt thơm toàn thân';
      case CAT.vk:
        return 'Nước hoa vùng kín';
    }
  }

  const selectedBrandFilterOption = useRef([]);
  async function handleOnchangeBrand(value) {
    const index = selectedBrandFilterOption.current.indexOf(
      value.target.ariaLabel,
    );

    console.log(index);
    if (index > -1) {
      selectedBrandFilterOption.current.splice(index, 1);
    } else {
      selectedBrandFilterOption.current.push(value.target.ariaLabel);
    }

    if (selectedBrandFilterOption.current.length == 0) {
      await getItemList();
    } else {
      setItemsInfo(
        await categories
          .getItems(
            `${location.pathname}/filter-items?brand=${selectedBrandFilterOption.current[0]}`,
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          }),
      );
    }
  }

  const selectedCountryFilterOption = useRef([]);
  async function handleOnchangeCountry(value) {
    const index = selectedCountryFilterOption.current.indexOf(
      value.target.ariaLabel,
    );

    console.log(index);
    if (index > -1) {
      selectedCountryFilterOption.current.splice(index, 1);
    } else {
      selectedCountryFilterOption.current.push(value.target.ariaLabel);
    }

    if (selectedCountryFilterOption.current.length == 0) {
      await getItemList();
    } else {
      setItemsInfo(
        await categories
          .getItems(
            `${location.pathname}/filter-items?country=${selectedCountryFilterOption.current[0]}`,
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          }),
      );
    }
  }
  const selectedProductionPlacesFilterOption = useRef([]);
  async function handleOnchangeProductionPlaces(value) {
    const index = selectedProductionPlacesFilterOption.current.indexOf(
      value.target.ariaLabel,
    );

    console.log(index);
    if (index > -1) {
      selectedProductionPlacesFilterOption.current.splice(index, 1);
    } else {
      selectedProductionPlacesFilterOption.current.push(value.target.ariaLabel);
    }

    if (selectedProductionPlacesFilterOption.current.length == 0) {
      await getItemList();
    } else {
      setItemsInfo(
        await categories
          .getItems(
            `${location.pathname}/filter-items?productionPlaces=${selectedProductionPlacesFilterOption.current[0]}`,
          )
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          }),
      );
    }
  }
  async function handleRadioChange(val) {
    console.log(val);
    setItemsInfo(
      await categories
        .getItems(`${location.pathname}/filter-items?order=${val}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    );
  }
  async function getItemList() {
    const items = await categories
      .getItems(location.pathname)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setItemsInfo(items);
  }
  async function setCurrentPage() {
    setItemsInfo(
      await categories
        .getItems(`${location.pathname}?page=${selectedPage}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    );
  }
  useEffect(() => {
    getItemList();
    setCategoryName();
  }, []);
  useEffect(() => {
    setCurrentPage(selectedPage);
  }, [selectedPage]);

  return (
    <div className='flex flex-row my-5 mx-5'>
      <div className='block mr-10 w-[320px]'>
        <div className='bg-section-pink py-4 px-4'>
          <div className='text-xl ml-4 mb-4 font-bold'>Xếp theo giá</div>

          <RadioGroup
            color='primary'
            defaultValue='LTH'
            onValueChange={(val) => {
              handleRadioChange(val);
            }}
          >
            <Radio value='LTH'>Từ thấp đến cao</Radio>
            <Radio value='HTL'>Từ cao đến thấp</Radio>
          </RadioGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Thương hiệu</div>

          <CheckboxGroup disableAnimation className='mt-4 ml-2'>
            {ItemsInfo?.filterOptions?.brand?.map((name, index) => (
              <Checkbox
                value={name}
                key={index}
                onChange={(value) => {
                  handleOnchangeBrand(value);
                }}
              >
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Xuất xứ</div>

          <CheckboxGroup disableAnimation className='mt-4 ml-2'>
            {ItemsInfo?.filterOptions?.country?.map((name, index) => (
              <Checkbox
                value={name}
                key={index}
                onChange={(value) => {
                  handleOnchangeCountry(value);
                }}
              >
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className='bg-section-pink pt-4 mt-4 pb-4 px-4'>
          <div className='text-xl ml-4 font-bold'>Nơi sản xuất</div>

          <CheckboxGroup disableAnimation className='mt-4 ml-2'>
            {ItemsInfo?.filterOptions?.productionPlaces?.map((name, index) => (
              <Checkbox
                value={name}
                key={index}
                onChange={(value) => {
                  handleOnchangeProductionPlaces(value);
                }}
              >
                {name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>
      <div className='bg-section-blue w-[100%] px-4 py-4'>
        <div className='text-xl font-bold'>
          {setCategoryName()}{' '}
          <span className='text-base font-extralight'>
            &#40; Số lượng: {ItemsInfo?.resultedItems?.length} &#41;
          </span>
        </div>
        <div className='grid grid-cols-5 grid-rows-2 gap-3'>
          {ItemsInfo?.resultedItems?.map((item) => (
            <Card
              itemName={item.name}
              imgURL={item.first_image_url}
              price={item.price}
              key={item.id}
              id={item.id}
              className='self-center'
            ></Card>
          ))}
        </div>
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
