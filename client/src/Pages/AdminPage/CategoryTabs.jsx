import { Tabs, Tab, Button } from '@nextui-org/react';
import ItemInList from './ItemInList';

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
              <ItemInList />
            </Tab>
            <Tab key='12' title='Sữa rửa mặt'>
              <ItemInList />
            </Tab>
            <Tab key='13' title='Tẩy tế bào chết'>
              <ItemInList />
            </Tab>
            <Tab key='4' title='Dưỡng môi'>
              <ItemInList />
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
            <Tab key='21' title='Dầu gội'>
              <ItemInList />
            </Tab>
            <Tab key='22' title='Dầu xả'>
              <ItemInList />
            </Tab>
            <Tab key='23' title='Dưỡng tóc'>
              <ItemInList />
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
            <Tab key='31' title='Nước hoa nữ'>
              <ItemInList />
            </Tab>
            <Tab key='32' title='Nước hoa nam'>
              <ItemInList />
            </Tab>
            <Tab key='33' title='Xịt thơm toàn thân'>
              <ItemInList />
            </Tab>
            <Tab key='34' title='Nước hoa vùng kín'>
              <ItemInList />
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
            <Tab key='41' title='Kem lót'>
              <ItemInList />
            </Tab>
            <Tab key='42' title='Kem nền'>
              <ItemInList />
            </Tab>
            <Tab key='43' title='Phấn nước Cushion'>
              <ItemInList />
            </Tab>
          </Tabs>
        </div>
      </Tab>
    </Tabs>
  );
}
export default CategoryTabs;
