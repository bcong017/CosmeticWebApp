import { Tabs, Tab } from '@nextui-org/react';

import TableItem from './TableItem';

function CategoryTabs() {
  return (
    <Tabs
      aria-label='Options'
      className='inline m-4 bg-section-pink'
      variant='light'
      size='lg'
      color='primary'
    >
      <Tab key='1' title='Chăm sóc da mặt'>
        <div className='px-8'>
          <Tabs
            aria-label='Options'
            className='inline bg-section-pink'
            variant='light'
            size='lg'
            color='primary'
          >
            <Tab key='11' title='Tẩy trang mặt'>
              <TableItem cat='TayTrang' />
            </Tab>
          </Tabs>
        </div>
      </Tab>
      <Tab key='2' title='Chăm sóc tóc và da đầu'>
        <div className='px-8'>
          <Tabs
            aria-label='Options'
            className='inline bg-section-pink'
            variant='light'
            size='lg'
            color='primary'
          >
            <Tab key='21' title='Dầu xả'>
              <TableItem cat='DauXa' />
            </Tab>
          </Tabs>
        </div>
      </Tab>
      <Tab key='3' title='Nước hoa'>
        <div className='px-8'>
          <Tabs
            aria-label='Options'
            className='inline bg-section-pink'
            variant='light'
            size='lg'
            color='primary'
          >
            <Tab key='31' title='Xịt thơm toàn thân'>
              <TableItem cat='ToanThan' />
            </Tab>
            <Tab key='32' title='Nước hoa vùng kín'>
              <TableItem cat='VungKin' />
            </Tab>
          </Tabs>
        </div>
      </Tab>
      <Tab key='4' title='Trang điểm mặt'>
        <div className='px-8'>
          <Tabs
            aria-label='Options'
            className='inline bg-section-pink'
            variant='light'
            size='lg'
            color='primary'
          >
            {' '}
            <Tab key='41' title='Kem lót'>
              <TableItem cat='KemLot' />
            </Tab>
            <Tab key='42' title='Kem nền'>
              <TableItem cat='KemNen' />
            </Tab>
            <Tab key='43' title='Phấn nước Cushion'>
              <TableItem cat='PhanNuoc' />
            </Tab>
          </Tabs>
        </div>
      </Tab>
    </Tabs>
  );
}
export default CategoryTabs;
