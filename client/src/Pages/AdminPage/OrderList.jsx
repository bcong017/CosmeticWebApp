import { useEffect, useState } from 'react';
import {
  TableHeader,
  Tab,
  TableColumn,
  Table,
  Tabs,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import admin from '@/Api_Call/admin';
import { DeleteIcon } from '@/Global_reference/assets/DeleteIcon';
import { AccpetIcon } from '@/Global_reference/assets/AcceptIcon';
export default function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const getOrderList = () => {
    admin
      .getOrders()
      .then((res) => {
        setOrderList(res.data.orders);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleState = (state, id) => {
    if (state) {
      admin
        .confirmOrder(id)
        .then(getOrderList())
        .catch(function (error) {
          console.log(error);
        });
      getOrderList();
    } else {
      admin
        .rejectOrder(id)
        .then(getOrderList())
        .catch(function (error) {
          console.log(error);
        });
      getOrderList();
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    console.log(orderList);
  }, [orderList]);
  return (
    <>
      <Tabs
        aria-label='Options'
        className='inline bg-section-pink'
        variant='light'
        size='lg'
        color='primary'
      >
        <Tab key='pending' title='Đơn hàng đang chờ chấp thuận'>
          <Table selectionMode='single'>
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn>Mã đơn hàng</TableColumn>
              <TableColumn>Người đặt</TableColumn>
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Thao tác</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orderList
                ?.filter((current) => current.status == 'Not updated')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
                      <TableCell>{current.name}</TableCell>

                      <TableCell>{current.totalAmount}VND</TableCell>
                      <TableCell>{current.dateCreated}</TableCell>
                      <TableCell>
                        <div className='relative flex items-center gap-2'>
                          <Tooltip content='Chấp nhận' color='success'>
                            <span
                              className='text-lg text-default-400 cursor-pointer active:opacity-50'
                              onClick={() => {
                                handleState(true, current.orderId);
                              }}
                            >
                              <AccpetIcon />
                            </span>
                          </Tooltip>
                          <Tooltip color='danger' content='Hủy đơn'>
                            <span
                              className='text-lg text-danger cursor-pointer active:opacity-50'
                              onClick={() => {
                                handleState(false, current.orderId);
                              }}
                            >
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Tab>

        <Tab key='accepted' title='Đơn hàng đã được chấp thuận'>
          <Table
            selectionMode='single'
            defaultSelectedKeys={['2']}
            aria-label='Example static collection table'
          >
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn>Mã đơn hàng</TableColumn>
              <TableColumn>Người đặt</TableColumn>
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Ngày chấp thuận</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orderList
                ?.filter((current) => current.status == 'Confirmed')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
                      <TableCell>{current.name}</TableCell>
                      <TableCell>{current.totalAmount}VND</TableCell>
                      <TableCell>{current.dateCreated}</TableCell>
                      <TableCell>{current.dateConfirmed}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Tab>
        <Tab key='rejected' title='Đơn hàng đã bị từ chối'>
          <Table
            selectionMode='single'
            defaultSelectedKeys={['2']}
            aria-label='Example static collection table'
          >
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn>Mã đơn hàng</TableColumn>
              <TableColumn>Người đặt</TableColumn>
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Ngày từ chối</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orderList
                ?.filter((current) => current.status == 'Rejected')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
                      <TableCell>{current.name}</TableCell>
                      <TableCell>{current.totalAmount} VND</TableCell>
                      <TableCell>{current.dateCreated}</TableCell>
                      <TableCell>{current.dateRejected}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Tab>
      </Tabs>
      {/* {orderList?.orders?.map((current, index) => {
        return (
          <div
            key={index}
            className='justify-evenly flex bg-pink-300 m-5 py-4 '
          >
            <div className='self-center w-[250px]'>
              <div className='ml-5 '>Họ và tên: {current.name}</div>
              <div className='ml-5 '>
                Tổng đơn hàng: {current.totalAmount} VND
              </div>
            </div>
            {current.status == 'Not updated' ? (
              <>
                <Button
                  className='self-center w-[100px]'
                  onClick={() => {
                    handleState(current.is_active, current.id);
                  }}
                  color='primary'
                  disableRipple='true'
                >
                  Chấp thuận.
                </Button>
              </>
            ) : (
              <div className='self-center font-bold'>Đã chấp thuận</div>
            )}
          </div>
        );
      })} */}
    </>
  );
}
