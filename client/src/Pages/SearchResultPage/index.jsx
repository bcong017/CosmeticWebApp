import { Pagination, RadioGroup, Radio } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@/Component/Card/Card';
import common from '@/Api_Call/common';
function SearchResultPage() {
  const location = useLocation();
  let [selectedPage, setSelectedPage] = useState(1);
  let [priceOrder, setPriceOrder] = useState('LTH');
  let [itemsInfo, setItemsInfo] = useState();
  let searchInput = useRef();
  const fetchItems = (option) => {
    return common
      .search(option)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItems = async function () {
    setItemsInfo(
      await fetchItems({
        searchTerm: searchInput.current,
        order: priceOrder,
        page: selectedPage,
      }),
    );
  };

  useEffect(() => {
    try {
      searchInput.current = decodeURI(location.pathname.substring(19));
    } catch (e) {
      console.error(e);
    }

    getItems();
  }, [selectedPage, priceOrder, location]);

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
      </div>
      <div className='bg-section-blue w-[100%] px-4 py-4'>
        <div className='text-xl font-bold'>
          Kết quả tìm kiếm:{' ' + `${searchInput.current}` + ' '}
          {itemsInfo?.resultedItems?.length != 0 && (
            <span className='text-base font-extralight'>
              &#40; Số lượng: {itemsInfo?.totalItems} &#41;
            </span>
          )}
        </div>

        {itemsInfo?.resultedItems?.length != 0 ? (
          <div className='grid grid-cols-5 grid-rows-2 gap-3'>
            {itemsInfo?.resultedItems?.map((item) => {
              item.discount_percentage && console.log(item);
              return (
                <Card
                  itemName={item.name}
                  imgURL={item.first_image_url}
                  price={item.price}
                  key={item.id}
                  id={item.id}
                  base_price={item.base_price}
                  discount_percentage={item.discount_percentage}
                  end_date={item.end_date}
                  className='self-center'
                ></Card>
              );
            })}
          </div>
        ) : (
          <div className='m-[100px] flex justify-center items-center font-bold text-4xl'>
            Không có sản phẩm phù hợp
          </div>
        )}

        {itemsInfo?.resultedItems?.length != 0 && (
          <div className='flex flex-col gap-5'>
            <Pagination
              total={itemsInfo?.totalPages}
              color='primary'
              page={itemsInfo?.currentPage}
              onChange={setSelectedPage}
              showControls='true'
              loop='true'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Component() {
  return <SearchResultPage />;
}

export default SearchResultPage;
