import {
  Tabs,
  Tab,
  Card,
  CardBody,
  // Input,
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from '@nextui-org/react';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

import GetItem from '@/Api_Call/GetItem';
import { VerticalDotsIcon } from '@/Global_reference/assets/VerticalDotsIcon';
import { useAuth } from '@/Global_reference/context/auth';
import { APP_ROLE } from '@/Global_reference/variables';
import comments from '@/Api_Call/comments';
import cart from '@/Api_Call/cart';
function ItemPage() {
  let [itemInfo, setItemInfo] = useState({});
  const { token, role } = useAuth();
  const imgRef = useRef();
  const location = useLocation();
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1);

  async function getItem() {
    const item = await GetItem(location.pathname);
    setItemInfo(item);
  }
  useEffect(() => {
    getItem();
  }, []);

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

  const handleSubmitComment = () => {
    if (comment != '') {
      comments
        .addComment(itemInfo.item.id, { commentText: comment })
        .then(() => {
          getItem();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    comments
      .deleteComment(id)
      .then(() => {
        getItem();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddCartItem = () => {
    cart
      .addItem({ item_id: itemInfo.item.id, quantity: quantity })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className='block'>
      <div className='item-media-side-detail-block'>
        <div className='media'>
          {console.log(itemInfo?.item?.imageURLs[0])}
          <img src={itemInfo?.item?.imageURLs[0]} alt='' ref={imgRef} />

          <ul>
            {itemInfo?.item?.imageURLs.map((url, index) => {
              return (
                <li key={index}>
                  <Image
                    fallbackSrc={'https://via.placeholder.com/250x200'}
                    className='variant-item-thumbnail'
                    src={url}
                    alt=''
                    onClick={() => {
                      imgRef.current.src = url;
                      console.log(imgRef.current.src);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='item-info'>
          <h1 className='font-bold font text-2xl'>{itemInfo?.item?.name}</h1>

          <h3>Hãng: {itemInfo?.item?.brand}. </h3>

          <h3>
            Điểm đánh giá: {itemInfo?.item?.user_rating}/5 từ{' '}
            {itemInfo?.item?.rate_count} người dùng.
          </h3>

          {!itemInfo?.item?.is_on_sale && (
            <h3>Giá: {itemInfo?.item?.price} VND</h3>
          )}
          {itemInfo?.item?.is_on_sale && (
            <div className='border-2 rounded p-4 border-[rgb(255,0,0)] flex justify-center items-center flex-col font-bold text-[rgb(255,0,0)]'>
              <h2>
                Chương trình giảm giá: {itemInfo?.item?.sale_event.event_name}
              </h2>
              <h2 className='text-center'>
                Mức giảm: {itemInfo?.item?.sale_event.discount_percentage}
              </h2>

              <h3>
                Giá gốc:{' '}
                <span className='line-through'>
                  {itemInfo?.item?.base_price} VND{' '}
                </span>
              </h3>
              <h3>Giá đã giảm: {itemInfo?.item?.price} VND</h3>
              <h3>
                Thời gian bắt đầu chương trình:{' '}
                {itemInfo?.item?.sale_event?.start_date}
              </h3>
              <h3>
                Thời gian kết thúc chương trình:{' '}
                {itemInfo?.item?.sale_event?.end_date}
              </h3>
            </div>
          )}
          <div className='amount-block'>
            <label htmlFor='item-amount'>Số lượng:</label>
            <select
              name='item-amount'
              id='item-amount'
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
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
            onClick={() => {
              handleAddCartItem();
            }}
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
              <div className='flex justify-center items-center'>
                <Card className='max-w-[650px]'>
                  <CardBody className='bg-heavy-pink text-yellow-50'>
                    <div className='flex flex-col gap-3'>
                      {itemInfo?.item?.specifications.Barcode != undefined && (
                        <div>
                          Barcode: {itemInfo?.item?.specifications.Barcode}
                        </div>
                      )}
                      {itemInfo?.item?.specifications.Brand != undefined && (
                        <div>Hãng: {itemInfo?.item?.specifications.Brand}</div>
                      )}
                      {itemInfo?.item?.specifications.Country != undefined && (
                        <div>
                          Xuất xứ: {itemInfo?.item?.specifications.Country}
                        </div>
                      )}
                      {itemInfo?.item?.specifications.Country != undefined && (
                        <div>
                          Nơi sản xuất:{' '}
                          {itemInfo?.item?.specifications.ProductionPlaces}
                        </div>
                      )}
                      {itemInfo?.item?.specifications.Skin != undefined && (
                        <div>
                          Dùng cho: {itemInfo?.item?.specifications.Skin}
                        </div>
                      )}
                      {itemInfo?.item?.specifications.Sex != undefined && (
                        <div>
                          Giới tính phù hợp:{' '}
                          {itemInfo?.item?.specifications.Sex}
                        </div>
                      )}
                      {itemInfo?.item?.specifications.Type != undefined && (
                        <div>
                          Vấn đề về da: {itemInfo?.item?.specifications.Type}
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key='item-component' title='Thành phần sản phẩm'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  {itemInfo?.item?.ingredients}
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-usage' title='Hướng dẫn sử dụng'>
              <Card>
                <CardBody className='bg-heavy-pink text-yellow-50'>
                  {itemInfo?.item?.use_information}
                </CardBody>
              </Card>
            </Tab>
            <Tab key='item-comment' title='Phản hồi'>
              <Card className='bg-heavy-pink text-yellow-50 pt-5 px-4'>
                {!token && role != APP_ROLE.USER ? (
                  <CardBody>
                    <div className='flex justify-center items-center'>
                      Hãy đăng nhập để bình luận.
                    </div>
                  </CardBody>
                ) : (
                  <div className='flex flex-col gap-3'>
                    <div>Phản hồi của bạn:</div>
                    {/* <div className='grid grid-rows-1 grid-cols-[90%,10%] gap-3'> */}
                    <div>
                      <Textarea
                        label='Bình luận'
                        placeholder='Nhập bình luận của bạn...'
                        className='w-[100%]'
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>
                    <Button
                      className='font-semibold '
                      disableRipple='true'
                      onClick={() => {
                        handleSubmitComment();
                      }}
                    >
                      Đăng phản hồi.
                    </Button>
                  </div>
                )}
                {Array.isArray(itemInfo?.comments) == false ||
                itemInfo?.comments.length == 0 ? (
                  <CardBody>
                    <div className='flex justify-center items-center mb-6'>
                      Sản phẩm chưa có bình luận.
                    </div>
                  </CardBody>
                ) : (
                  <CardBody className=' flex flex-col gap-4 overflow-hidden '>
                    {itemInfo?.comments?.map((comment, index) => (
                      <div key={index} className='border-2 rounded p-2'>
                        {/* <div className='font-bold'>{comment.user.name}</div> */}
                        <div className='grid grid-cols-[95%,5%] '>
                          <div>
                            <div className='font-bold'>{comment.user.name}</div>
                            <div>{comment.comment_text}</div>
                          </div>
                          <div className='flex items-center '>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button isIconOnly size='sm' variant='light'>
                                  <VerticalDotsIcon className='text-default-300' />
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => {
                                    handleDelete(comment.id);
                                  }}
                                >
                                  Xóa
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
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

export function Component() {
  return <ItemPage />;
}

export default ItemPage;
