import { useRef } from 'react';
import { Button } from '@nextui-org/react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import './style.css';

function ItemPage({ amount = 4 }) {
  const imgRef = useRef();
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

  return (
    <div className='block'>
      <div className='item-media-side-detail-block'>
        <div className='media'>
          <img
            src='https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_358x358_843626_fit_center.jpg'
            alt=''
            ref={imgRef}
          />
          <ul>
            <li>
              <img
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_80x80_d200c5_fit_center.jpg'
                alt=''
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute('data-realimage');
                }}
                data-realimage='https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_358x358_843626_fit_center.jpg'
              />
            </li>
            <li>
              <img
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/t/e/tem-phu_100230044-1665741575_img_80x80_d200c5_fit_center.jpg'
                alt=''
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute('data-realimage');
                }}
                data-realimage='https://media.hcdn.vn/catalog/product/t/e/tem-phu_100230044-1665741575_img_358x358_843626_fit_center.jpg'
              />
            </li>
            <li>
              <img
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-1-1663665270_img_80x80_d200c5_fit_center.jpg'
                alt=''
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute('data-realimage');
                }}
                data-realimage='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-1-1663665270_img_358x358_843626_fit_center.jpg'
              />
            </li>
            <li>
              <img
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-2-1663665270_img_80x80_d200c5_fit_center.jpg'
                alt=''
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute('data-realimage');
                }}
                data-realimage='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-2-1663665270_img_358x358_843626_fit_center.jpg'
              />
            </li>
            <li>
              <img
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-3-1663665271_img_80x80_d200c5_fit_center.jpg'
                alt=''
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute('data-realimage');
                }}
                data-realimage='https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-3-1663665271_img_358x358_843626_fit_center.jpg'
              />
            </li>
          </ul>
        </div>
        <div className='item-info'>
          <h1 className='font-bold font text-2xl'>
            Dầu Tẩy Trang Shu Uemura Làm Sạch & Se Lỗ Chân Lông 150ml
          </h1>
          <h2 className='font-bold font text-1xl '>
            Porefinist Anti-Shine Fresh Cleansing Oil
          </h2>
          <h3 className='price'>Giá: 1000 VND</h3>
          <div className='amount-block'>
            <label htmlFor='item-amount'>Số lượng:</label>
            <select name='item-amount' id='item-amount'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
            {amount <= 6 && (
              <p className='amount-remaining'>Chỉ còn {amount} sản phẩm!</p>
            )}
          </div>
          <Button
            color='success'
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
          >
            <Tab key='item-info' title='Thông tin sản phẩm'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
