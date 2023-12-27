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
export default function UserOrderPage() {
  return (
    <div className='m-6'>
      <Tabs
        aria-label='Options'
        className='inline bg-section-pink'
        variant='light'
        size='lg'
        color='primary'
      >
        <Tab key='ongoing' title='Đơn hàng đang được giao'>
          <Table selectionMode='single'>
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn>Mã đơn hàng</TableColumn>
              <TableColumn>Thành tiền</TableColumn>
              <TableColumn>Ngày đặt hàng</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key='1'>
                <TableCell>1</TableCell>
                <TableCell>HNGA12</TableCell>
                <TableCell>129.000VND</TableCell>
                <TableCell>12/11/2023</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>

        <Tab key='delivered' title='Đơn hàng đã được giao'>
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
              <TableColumn>Ngày nhận hàng</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key='1'>
                <TableCell>1</TableCell>
                <TableCell>HNGA12</TableCell>
                <TableCell>129.000VND</TableCell>
                <TableCell>12/11/2023</TableCell>
                <TableCell>15/11/2023</TableCell>
              </TableRow>
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
