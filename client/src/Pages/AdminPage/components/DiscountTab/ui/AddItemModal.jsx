import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { PlusIcon } from '@/Global_reference/assets/PlusIcon.jsx';
import { useEffect, useState } from 'react';
import { CAT_TITLE } from '@/Global_reference/variables';
import saleevents from '@/Api_Call/saleevents';
import common from '@/Api_Call/common';
const TAB_KEY = {
  TH: 'th',
  DM: 'dm',
};

export default function AddItemModal({ onOk }) {
  const [tabKey, setTabKey] = useState(TAB_KEY.TH);
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('0');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [option, setOption] = useState('');
  const [brands, setBrands] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    common.getBrand().then((res) => setBrands(res.data.brands ?? []));
  }, []);
  useEffect(() => {}, [brands]);
  // TODO:
  const onOkForm = async (onClose) => {
    const payload = {
      event_name: name,
      discount_percentage: Number(discount),
      start_date: startDate,
      end_date: endDate,
      [tabKey === TAB_KEY.TH ? 'brand' : 'category']: option,
    };

    saleevents
      .addEvent(payload)
      .then(() => {
        window.alert('Thêm chương trình thành công');
        onOk();
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Thêm chương trình
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        size='xl'
        scrollBehavior={'outside'}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Chương trình giảm giá
              </ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  label='Tên'
                  variant='bordered'
                  size='sm'
                  isRequired
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type='number'
                  label='Tỷ lệ giảm'
                  variant='bordered'
                  size='sm'
                  isRequired
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <Input
                  type='date'
                  label='Ngày bắt đầu'
                  variant='bordered'
                  size='sm'
                  labelPlacement='outside-left'
                  placeholder=''
                  isRequired
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  type='date'
                  label='Ngày kết thúc'
                  variant='bordered'
                  size='sm'
                  labelPlacement='outside-left'
                  placeholder=''
                  isRequired
                  onChange={(e) => setEndDate(e.target.value)}
                />

                <Tabs
                  className='inline'
                  aria-label='Options'
                  variant='light'
                  size='lg'
                  color='primary'
                  selectedKey={tabKey}
                  onSelectionChange={setTabKey}
                >
                  <Tab key={TAB_KEY.TH} title='Thương hiệu'>
                    <RadioGroup
                      size='sm'
                      onChange={(e) => setOption(e.target.value)}
                    >
                      {brands.map((key) => (
                        <Radio key={key} value={key}>
                          {key}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Tab>
                  <Tab key={TAB_KEY.DM} title='Danh mục'>
                    <RadioGroup
                      size='sm'
                      onChange={(e) => setOption(e.target.value)}
                    >
                      {Object.keys(CAT_TITLE).map((key) => (
                        <Radio key={key} value={key}>
                          {CAT_TITLE[key]}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Tab>
                </Tabs>
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Đóng
                </Button>
                <Button color='primary' onPress={() => onOkForm(onClose)}>
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
