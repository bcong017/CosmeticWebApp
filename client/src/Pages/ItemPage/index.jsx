import { useRef } from 'react';
import { Button } from '@nextui-org/react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import './style.css';
import GetItem from '@/Api_Call/GetItem';
import { useEffect, useState } from 'react';
function ItemPage() {
  let [itemInfo, setItemInfo] = useState({});

  const imgRef = useRef();
  const location = useLocation();

  async function getItem() {
    const item = await GetItem(location.pathname);
    setItemInfo(item);
  }
  useEffect(() => {
    getItem();
  }, []);

  // const itemDetailTabsRef = useRef();

  // const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   for (let i = 0; i < 5; i++) {
  //     if (i != activeIndex) {
  //       itemDetailTabsRef.current.childNodes[i].className = 'item-detail-tab';
  //     } else {
  //       itemDetailTabsRef.current.childNodes[i].className =
  //         'item-detail-tab active-color';
  //     }
  //   }
  // }, [activeIndex]);
  // let quantityOpt = [];
  function createQuantity() {
    let quantity = [];
    let amount = itemInfo?.item?.quantity;
    if (amount >= 10) {
      amount = 10;
    }

    for (let i = 0; i < amount; i++) {
      quantity.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>,
      );
    }

    return quantity;
  }

  return (
    <div className='block'>
      <div className='item-media-side-detail-block'>
        <div className='media'>
          <img src={itemInfo?.item?.imageURLs[0]} alt='' ref={imgRef} />

          <ul>
            {itemInfo?.item?.imageURLs.map((url, index) => {
              return (
                <li key={index}>
                  <img
                    className='variant-item-thumbnail'
                    src={url}
                    alt=''
                    onClick={(e) => {
                      imgRef.current.src = e.target.src;
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='item-info'>
          <h1 className='font-bold font text-2xl'>{itemInfo?.item?.name}</h1>

          <h3 className='price'>Giá: {itemInfo?.item?.price} VND</h3>
          <div className='amount-block'>
            <label htmlFor='item-amount'>Số lượng:</label>
            <select name='item-amount' id='item-amount'>
              {createQuantity()}
            </select>
            {itemInfo?.item?.quantity <= 6 && (
              <p className='amount-remaining'>
                Chỉ còn {itemInfo?.item?.quantity} sản phẩm!
              </p>
            )}
          </div>
          <Button
            endContent={
              <i className='fa-solid fa-cart-shopping cart-icon-in-button'></i>
            }
            className='bg-heavy-pink'
            disableRipple='true'
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      <div className='px-10 mt-5 '>
        <div className='flex w-full flex-col '>
          <Tabs
            aria-label='Options'
            className='inline bg-section-pink'
            variant='light'
            size='lg'
            color='primary'
          >
            <Tab key='item-info' title='Thông tin sản phẩm'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  {itemInfo?.item?.product_information}
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-specs' title='Thông số sản phẩm'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-component' title='Thành phần sản phẩm'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-usage' title='Hướng dẫn sử dụng'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-rating' title='Đánh giá'>
              <Card className='bg-heavy-pink text-yellow-50'>
                {itemInfo.comments == null ? (
                  <CardBody>
                    <div className='flex justify-center items-center'>
                      Sản phẩm chưa có bình luận.
                    </div>
                  </CardBody>
                ) : (
                  <CardBody className=' flex flex-col gap-4 overflow-hidden '>
                    {itemInfo?.comments?.map((comment, index) => (
                      <div key={index} className=' border-2 rounded p-2'>
                        <div className='font-bold'>{comment.user.name}</div>
                        <div>{comment.comment_text}</div>
                      </div>
                    ))}
                  </CardBody>
                )}
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
