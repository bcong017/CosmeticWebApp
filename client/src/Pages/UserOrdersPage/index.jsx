import user from '@/Api_Call/user';
import {
  Tab,
  Tabs,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UserOrderPage() {
  const [orders, SetOrders] = useState([]);

  const getOrderList = () => {
    user
      .getOrder()
      .then((res) => {
        SetOrders(res.data.userOrders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <div className='m-6'>
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
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orders
                ?.filter((current) => current.status == 'Not updated')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
                      <TableCell>{current.totalAmount}VND</TableCell>
                      <TableCell>{current.dateCreated}</TableCell>
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
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Ngày chấp thuận</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orders
                ?.filter((current) => current.status == 'Confirmed')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
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
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
              <TableColumn>Ngày từ chối</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'Chưa có đơn hàng phù hợp.'}>
              {orders
                ?.filter((current) => current.status == 'Rejected')
                .map((current, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{current.orderId}</TableCell>
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
    </div>
  );
}

export function Component() {
  return <UserOrderPage />;
}
