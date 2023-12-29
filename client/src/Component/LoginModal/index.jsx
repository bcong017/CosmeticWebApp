import auth from '@/Api_Call/auth.js';

import {
  Modal,
  ModalContent,
  // RadioGroup,
  // Radio,
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
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAuth } from '@/Global_reference/context/auth.jsx';
import { useNavigate } from 'react-router-dom';
import { APP_ROLE } from '@/Global_reference/variables.js';

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loginPassword, setLoginPassword] = useState('');
  const [loginUserName, setLoginUserName] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  // const [gender, setGender] = useState('male');
  const [resPassword, setResPassword] = useState('');
  const [resUsername, setResUsername] = useState('');
  const [resRePassword, setResRePassword] = useState('');
  const { setToken, setRole, role } = useAuth();
  const nav = useNavigate();

  const clearInput = () => {
    setLoginPassword('');
    setLoginUserName('');
    setName('');
    setPhoneNum('');
    setAddress('');
    // setGender('male');
    setResPassword('');
    setResRePassword('');
    setResUsername('');
  };

  // const validateEmail = (email) =>
  //   email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  // const isInvalidLogin = useMemo(() => {
  //   if (loginUserName === '') return false;
  // }, [loginUserName]);

  // const isInvalidReg = useMemo(() => {
  //   if (resEmail === '') return false;

  //   return validateEmail(resEmail) ? false : true;
  // }, [resEmail]);

  const handleOnclickLogin = async () => {
    if (!loginUserName) return;
    if (!loginPassword) return;
    await auth
      .login({ username: loginUserName, password: loginPassword })
      .then(function (response) {
        {
          setToken(response.data.token);
          setRole(response.data.role);
          clearInput();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOnclickRegister = () => {
    if (!resUsername) return;
    if (!resPassword) return;
    if (!resRePassword) return;
    if (!(resPassword == resRePassword)) return;
    auth
      .register({
        username: resUsername,
        password: resPassword,
        name: name,
        phone_number: phoneNum,
        adress: address,
      })
      .then(function (response) {
        if (response.data) {
          setToken(response.data.token);
          setRole(APP_ROLE.USER);
          clearInput();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    if (role == APP_ROLE.ADMIN) {
      nav('/admin');
    } else {
      nav('/');
    }
  }, [role]);

  return (
    <>
      <Tooltip content='Đăng nhập/ Đăng ký' closeDelay={0}>
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
                <Tab
                  key='login'
                  title='Đăng nhập'
                  className=''
                  onSelectionChange={() => {
                    clearInput();
                  }}
                >
                  <ModalBody>
                    <Input
                      endContent={
                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      autoFocus
                      label='Tên đăng nhập'
                      placeholder='Nhập tên đăng nhập của bạn'
                      variant='bordered'
                      value={loginUserName}
                      onChange={(e) => setLoginUserName(e.target.value)}
                      isRequired
                      // isInvalid={isInvalidLogin}
                      // color={isInvalidLogin ? 'danger' : 'success'}
                      // errorMessage={
                      //   isInvalidLogin && 'Vui lòng nhập email hợp lệ'
                      // }
                    />
                    <Input
                      endContent={
                        <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Mật khẩu'
                      placeholder='Nhập mật khẩu của bạn'
                      type='password'
                      variant='bordered'
                      value={loginPassword}
                      isRequired
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Đóng
                    </Button>
                    <Button
                      className='bg-heavy-pink'
                      onClick={() => {
                        handleOnclickLogin();
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </ModalFooter>
                </Tab>
                <Tab key='sign-up' title='Đăng ký' className=''>
                  {/* <ModalHeader className='flex flex-col gap-1'>
                    Đăng nhập
                  </ModalHeader> */}
                  <ModalBody>
                    <Input
                      autoFocus
                      key='name'
                      type='text'
                      label='Họ và tên:'
                      variant='bordered'
                      placeholder=''
                      className='font-semibold'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Input
                      key='phoneNum'
                      type='text'
                      label='Số điện thoại:'
                      variant='bordered'
                      placeholder=''
                      className=' font-semibold'
                      value={phoneNum}
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                      }}
                    />
                    <Input
                      key='address'
                      type='text'
                      label='Địa chỉ:'
                      variant='bordered'
                      placeholder=''
                      className=' font-semibold'
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    {/* <div className='flex '>
                      <div className='mr-5 font-semibold'>Giới tính: </div>
                      <RadioGroup
                        color='secondary'
                        label=''
                        orientation='horizontal'
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
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
                    </div> */}
                    <Input
                      key='username'
                      endContent={
                        <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                      label='Tên đăng nhập'
                      placeholder='Nhập tên đăng nhập của bạn'
                      variant='bordered'
                      className=' font-semibold'
                      value={resUsername}
                      onChange={(e) => {
                        setResUsername(e.target.value);
                      }}
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
                      value={resPassword}
                      onChange={(e) => {
                        setResPassword(e.target.value);
                      }}
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
                      value={resRePassword}
                      onChange={(e) => {
                        setResRePassword(e.target.value);
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Đóng
                    </Button>
                    <Button
                      className='bg-heavy-pink'
                      onClick={() => {
                        handleOnclickRegister();
                      }}
                    >
                      Đăng ký
                    </Button>
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
