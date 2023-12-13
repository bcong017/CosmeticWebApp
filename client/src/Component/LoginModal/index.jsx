import { Link } from 'react-router-dom';

import {
  Modal,
  ModalContent,
  RadioGroup,
  Radio,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { MailIcon } from './MailIcon.jsx';
import { LockIcon } from './LockIcon.jsx';

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content='Đăng nhập / Đăng ký' closeDelay={0}>
        <Button onPress={onOpen} color='none' isIconOnly disableRipple='true'>
          <div className='fa-solid fa-circle-user user-icon' />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent className='bg-primary-pink'>
          {(onClose) => (
            <>
              <Tabs
                aria-label='Options'
                className='inline mt-10 mx-4'
                variant='light'
                size='lg'
              >
                <Tab key='login' title='Đăng nhập' className=''>
                  {/* <ModalHeader className='flex flex-col gap-1'>
                    Đăng nhập
                  </ModalHeader> */}
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Email'
                      placeholder='Nhập email của bạn'
                      variant='bordered'
                    />
                    <Input
                      endContent={
                        <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Mật khẩu'
                      placeholder='Nhập mật khẩu của bạn'
                      type='password'
                      variant='bordered'
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Đóng
                    </Button>
                    <Link to='/userInfo'>
                      <Button className='bg-heavy-pink'>Đăng nhập</Button>
                    </Link>
                  </ModalFooter>
                </Tab>
                <Tab key='sign-up' title='Đăng ký' className=''>
                  {/* <ModalHeader className='flex flex-col gap-1'>
                    Đăng nhập
                  </ModalHeader> */}
                  <ModalBody>
                    <Input
                      key='name'
                      type='text'
                      label='Họ và tên:'
                      variant='bordered'
                      placeholder=''
                      className='font-semibold'
                    />
                    <Input
                      key='phoneNum'
                      type='text'
                      label='Số điện thoại:'
                      variant='bordered'
                      placeholder=''
                      className=' font-semibold'
                    />
                    <div className='flex '>
                      <div className='mr-5 font-semibold'>Giới tính: </div>
                      <RadioGroup
                        color='secondary'
                        label=''
                        orientation='horizontal'
                      >
                        <Radio className='font-semibold' value='male'>
                          Nam
                        </Radio>
                        <Radio className='font-semibold' value='female'>
                          Nữ
                        </Radio>
                        <Radio className='font-semibold' value='other'>
                          Khác
                        </Radio>
                      </RadioGroup>
                    </div>
                    <Input
                      key='Email'
                      autoFocus
                      endContent={
                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Email'
                      placeholder='Nhập email của bạn'
                      variant='bordered'
                      className=' font-semibold'
                    />
                    <Input
                      key='Password'
                      endContent={
                        <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Mật khẩu'
                      placeholder='Nhập mật khẩu của bạn'
                      type='password'
                      className=' font-semibold'
                      variant='bordered'
                    />
                    <Input
                      key='RePassword'
                      endContent={
                        <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Nhập lại mật khẩu'
                      placeholder='Nhập lại mật khẩu của bạn'
                      type='password'
                      className=' font-semibold'
                      variant='bordered'
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Đóng
                    </Button>
                    <Link to='/userInfo'>
                      <Button className='bg-heavy-pink'>Đăng ký</Button>
                    </Link>
                  </ModalFooter>
                </Tab>
              </Tabs>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
