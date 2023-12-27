import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import cart from '@/Api_Call/cart';
import { useAuth } from '@/Global_reference/context/auth';
const itemList = {
  cartItems: [
    {
      id: 1,
      item: {
        name: "Nước Tẩy Trang L'Oreal Tươi Mát Cho Da Dầu, Hỗn Hợp 400ml",
        price: '159.000',
        image_url:
          'https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100137-1695896128_img_800x800_eb97c5_fit_center.png',
      },
      quantity: 4,
    },
    {
      id: 2,
      item: {
        name: "Nước Tẩy Trang L'Oreal Làm Sạch Sâu Trang Điểm 400ml",
        price: '155.000',
        image_url:
          'https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100146-1695896051_img_800x800_eb97c5_fit_center.png',
      },
      quantity: 2,
    },
  ],
};
function CartPage() {
  const [itemList, setItemList] = useState([]);
  const { token } = useAuth();

  function getItem() {
    cart
      .getItems()
      .then(function (response) {
        setItemList(response.data.cartItems);
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

  useEffect(() => {
    console.log(token);
    getItem();
  }, []);

  return (
    <div className='inline mt-10'>
      <div className='text-center text-3xl font-bold'>Giỏ hàng của bạn</div>
      <div className='flex justify-around'>
        <div className='block'>
          <div className='text-2xl mb-3'> Số lượng sản phẩm: 12</div>
          <div className=' flex flex-col justify-around bg-section-pink min-w-[820px]'>
            {itemList?.map((current) => {
              return (
                <div
                  key={current.id}
                  className='justify-evenly flex bg-pink-300 m-5 py-4 '
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
                <div className='ml-5 mr-5'>11000 VND</div>
                <div className='ml-5 mt-3 mr-5'>11000 VND</div>
                <div className='ml-5  mt-3 mr-5  mb-3'>100000 VND</div>
              </div>
            </div>
            <Button
              endContent={
                <i className='fa-solid fa-cart-shopping cart-icon-in-button'></i>
              }
              className='bg-heavy-pink mx-2 mb-2'
              disableRipple='true'
            >
              Thanh toán
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
