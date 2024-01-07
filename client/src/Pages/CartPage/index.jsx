import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import cart from '@/Api_Call/cart';
import user from '@/Api_Call/user';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [itemList, setItemList] = useState([]);
  const nav = useNavigate();

  function getItem() {
    cart
      .getItems()
      .then(function (response) {
        setItemList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDeleteItem = (target) => {
    cart
      .deleteItem(target)
      .then(function (response) {
        console.log(response.data.message);
        getItem();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitOrder = () => {
    user.createOrder().then(() => {
      alert('Đặt hàng thành công!');
      nav(0);
    });
  };

  const handleEditQuantity = (id, quantity) => {
    cart
      .editItem({ cartItemId: id, quantity: quantity })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className='inline mt-10'>
      <div className='text-center text-3xl font-bold'>Giỏ hàng của bạn</div>
      <div className='flex justify-around mt-8'>
        <div className='block'>
          <div className=' flex flex-col justify-around bg-section-pink min-w-[820px]'>
            {itemList?.cartItems?.map((current) => {
              return (
                <div
                  key={current.id}
                  className=' grid grid-cols-[10%,70%,15%,5%] bg-pink-300 m-5 p-2 '
                >
                  <Image
                    className='variant-item-thumbnail'
                    src={current.item.image_url}
                    alt=''
                    width={80}
                    height={80}
                  />
                  <div className='self-center'>
                    <div className='ml-5 '>{current.item.name}</div>
                    <div className='ml-5 '>
                      Đơn giá: {current.item.price} VND
                    </div>
                    <div className='ml-5 '>
                      Thành tiền:{' '}
                      {parseInt(current.item.price) * current.quantity}.000 VND
                    </div>
                  </div>
                  <div className='ml-5 self-center flex'>
                    <div className='flex flex-col'>
                      <div className='flex self-center'>
                        <Input
                          type='number'
                          label='Số lượng'
                          defaultValue={current.quantity}
                          placeholder='0'
                          labelPlacement='outside'
                          startContent={
                            <div className='pointer-events-none flex items-center'></div>
                          }
                          size='sm'
                          fullWidth='false'
                          className='w-[70px]'
                          onChange={(e) => {
                            handleEditQuantity(current?.id, e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <i
                    data={current.id}
                    key={current.id}
                    className='fa-solid fa-trash self-center hover:cursor-pointer hover:text-red-500 '
                    onClick={() => {
                      handleDeleteItem(current.id);
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className='flex flex-col justify-around bg-section-pink min-w-fit'>
            <div className=' mb-6 text-2xl font-bold text-center'>
              Tổng kết hóa đơn
            </div>
            <div className='flex'>
              <div className='text-left'>
                <div className='ml-5 mr-5'>Tạm tính:</div>
                <div className='ml-5 mt-3 mr-5'>Chi phí vận chuyển:</div>
                <div className='ml-5  mt-3 mr-5  mb-3'>Tổng tiền:</div>
              </div>
              <div className='text-right'>
                <div className='ml-5 mr-5'>{itemList?.totalAmount} VND</div>
                <div className='ml-5 mt-3 mr-5'>
                  {itemList?.shippingFee} VND
                </div>
                <div className='ml-5  mt-3 mr-5  mb-3'>
                  {itemList?.totalAmountWithShipping} VND
                </div>
              </div>
            </div>
            <Button
              endContent={
                <i className='fa-solid fa-cart-shopping cart-icon-in-button'></i>
              }
              className='bg-heavy-pink mx-2 mb-2'
              disableRipple='true'
              onClick={() => {
                handleSubmitOrder();
              }}
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Component() {
  return <CartPage />;
}

export default CartPage;
