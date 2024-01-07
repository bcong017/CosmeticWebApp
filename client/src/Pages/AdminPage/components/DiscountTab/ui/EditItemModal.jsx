import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { CAT_TITLE } from '@/Global_reference/variables';
import saleevents from '@/Api_Call/saleevents';
import { FaEye } from 'react-icons/fa';
import common from '@/Api_Call/common';
import admin from '@/Api_Call/admin';
const TAB_KEY = {
  TH: 'brand',
  DM: 'category',
};

export default function EditItemModal({ onOk, id }) {
  const [tabKey, setTabKey] = useState('');
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('0');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [option, setOption] = useState('');
  const [brands, setBrands] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    common.getBrand().then((res) => setBrands(res.data.brands ?? []));
  }, []);
  useEffect(() => {
    admin
      .getEvents()
      .then((res) => {
        setCurrentEvent(
          res.data.saleEvents.filter((current) => current.id == id)[0],
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    setName(currentEvent.event_name);
    setDiscount(parseInt(currentEvent.discount_percentage, 10));
    setStartDate(currentEvent?.start_date?.split('T')[0]);
    setEndDate(currentEvent?.end_date?.split('T')[0]);
    console.log(currentEvent?.brand);
    setTabKey(currentEvent?.brand ? 'brand' : 'category');
    console.log(tabKey);
    setOption(currentEvent.brand ? currentEvent.brand : currentEvent.category);
    console.log(option);
  }, [currentEvent]);
  // TODO:
  const onOkForm = async (onClose) => {
    const payload = {
      event_name: name,
      discount_percentage: Number(discount),
      start_date: startDate,
      end_date: endDate,
      [tabKey === TAB_KEY.TH ? 'brand' : 'category']:
        tabKey === TAB_KEY.TH ? option : CAT_TITLE[option],
      [tabKey === TAB_KEY.TH ? 'category' : 'brand']: null,
    };
    console.log(payload);
    // saleevents
    //   .editEvent(id, payload)
    //   .then(() => {
    //     alert('Sửa chương trình thành công', payload);
    //     onOk();
    //     onClose();
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <>
      <div onClick={onOpen}>
        <FaEye />
      </div>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type='number'
                  label='Tỷ lệ giảm'
                  variant='bordered'
                  size='sm'
                  isRequired
                  value={discount}
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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  type='date'
                  label='Ngày kết thúc'
                  variant='bordered'
                  size='sm'
                  labelPlacement='outside-left'
                  placeholder=''
                  value={endDate}
                  isRequired
                  onChange={(e) => setEndDate(e.target.value)}
                />

                {currentEvent?.brand && (
                  <>
                    <div className='my-4'>Thương hiệu </div>
                    <RadioGroup
                      size='sm'
                      onChange={(e) => setOption(e.target.value)}
                      value={option}
                    >
                      {brands.map((key) => (
                        <Radio key={key} value={key}>
                          {key}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </>
                )}
                {currentEvent?.category && (
                  <>
                    <div className='my-4'>Thương hiệu </div>

                    <RadioGroup
                      size='sm'
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                    >
                      {Object.keys(CAT_TITLE).map((key) => (
                        <Radio key={key} value={key}>
                          {CAT_TITLE[key]}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Đóng
                </Button>
                <Button color='primary' onPress={() => onOkForm(onClose)}>
                  Sửa
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
