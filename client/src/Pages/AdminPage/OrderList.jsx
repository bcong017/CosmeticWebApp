import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import admin from '@/Api_Call/admin';
export default function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const getOrderList = () => {
    admin
      .getOrders()
      .then((res) => {
        setOrderList(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleState = (state, id) => {
    if (state) {
      admin.deactivateUser(id).catch(function (error) {
        console.log(error);
      });
      getOrderList();
    }
    // else{
    //   admin.
    // }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    console.log(orderList);
  }, [orderList]);
  return (
    <>
      {orderList?.orders?.map((current, index) => {
        return (
          <div
            key={index}
            className='justify-evenly flex bg-pink-300 m-5 py-4 '
          >
            <div className='self-center w-[250px]'>
              <div className='ml-5 '>Họ và tên: {current.userName}</div>
              <div className='ml-5 '>
                Tổng đơn hàng: {current.totalAmount} VND
              </div>
            </div>
            {!current.is_confirm ? (
              <>
                <Button
                  className='self-center w-[100px]'
                  onClick={() => {
                    handleState(current.is_active, current.id);
                  }}
                  color='primary'
                  disableRipple='true'
                >
                  Vô hiệu hóa
                </Button>
                <Button
                  className='self-center w-[100px]'
                  onClick={() => {
                    handleState(current.is_active, current.id);
                  }}
                  color='primary'
                  disableRipple='true'
                >
                  Kích hoạt
                </Button>
              </>
            ) : (
              <div className='self-center font-bold'>Đã chấp thuận</div>
            )}
          </div>
        );
      })}
    </>
  );
}
