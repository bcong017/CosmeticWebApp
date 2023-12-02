import './style.css';
import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

function CartPage({ amount = 6 }) {
  return (
    <div className='inline mt-10'>
      <div className='text-center text-3xl font-bold'>Giỏ hàng của bạn</div>
      <div className='flex justify-around'>
        <div className='block'>
          <div className='text-2xl mb-3'> Số lượng sản phẩm: 12</div>
          <div className=' flex flex-col justify-around bg-section-pink min-w-[820px]'>
            <div className='justify-evenly flex bg-pink-300 m-5 pt-4 pb-4 '>
              <Image
                className='variant-item-thumbnail'
                src='https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_80x80_d200c5_fit_center.jpg'
                alt=''
                width={80}
                height={80}
              />
              <div>
                <div className='ml-5 '>Sữa rửa mặt</div>
                <div className='ml-5 '>Đơn giá: 11000 VND</div>
                <div className='ml-5 '>Thành tiền: 100000 VND</div>
              </div>
              <div className='ml-5 self-center flex'>
                <div className='flex flex-col'>
                  <div className='flex self-center'>
                    <Input
                      type='number'
                      label='Số lượng'
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
                  {amount <= 6 && (
                    <p className='amount-remaining self-center'>
                      Chỉ còn {amount} sản phẩm!
                    </p>
                  )}
                </div>
              </div>
              <i className='fa-solid fa-trash self-center hover:cursor-pointer hover:text-red-500 '></i>
            </div>
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

export default CartPage;
