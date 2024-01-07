import { useEffect, useState } from 'react';
import './style.css';
import user from '@/Api_Call/user';
import { Input, Button, Avatar } from '@nextui-org/react';
import { LockIcon } from '@/Component/LoginModal/LockIcon';

function UserInfoPage() {
  const [userInfo, setUserInfo] = useState();
  const [name, SetName] = useState('');
  const [phoneNumber, SetPhoneNumber] = useState('');
  const [address, SetAddress] = useState('');
  const [oldPassword, SetOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, SetReNewPassword] = useState('');
  const [resetPasswordSuccessful, setResetPasswordSuccessful] = useState(false);
  const [birthday, setBirthday] = useState('');
  const handleSubmitInfo = () => {
    const payload = {
      name: name,
      date_of_birth: birthday,
      phone_number: phoneNumber,
      address: address,
    };
    user.editUserInfo(payload).then(alert('Thay đổi thông tin thành công'));
  };

  const getUserInfo = () => {
    user
      .getInfo()
      .then((res) => {
        setUserInfo(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = () => {
    user
      .changePassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: reNewPassword,
      })
      .then(() => {
        setNewPassword('');
        SetOldPassword('');
        SetReNewPassword('');
        setResetPasswordSuccessful(true);
        setTimeout(() => {
          setResetPasswordSuccessful(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    SetName(userInfo?.name);
    SetPhoneNumber(userInfo?.phone_number);
    SetAddress(userInfo?.address);
    setBirthday(
      userInfo?.date_of_birth.split('T')[0].split('-').reverse().join('-'),
    );
  }, [userInfo]);
  useEffect(() => {
    console.log(birthday);
  }, [birthday]);
  return (
    <div className='flex justify-around'>
      <div className='bg-heavy-pink my-10 mx-10'>
        <div>
          <div className='text-5xl font-bold ml-[120px] my-10'>
            Thông tin cá nhân
          </div>
          <div className='flex mx-10'>
            <Avatar showFallback className='w-[200px] h-[200px] text-large' />
            <div className='flex flex-col mx-10'>
              <Input
                key='name'
                type='text'
                label='Họ và tên:'
                labelPlacement='outside-left'
                placeholder=''
                className='font-semibold'
                value={name}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
              <Input
                key='birthday'
                type='date'
                label='Ngày sinh:'
                labelPlacement='outside-left'
                placeholder=''
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
                // value={}
                className='mt-10 font-semibold'
              />
              <Input
                key='phoneNum'
                type='text'
                label='Số điện thoại:'
                labelPlacement='outside-left'
                placeholder=''
                className='mt-10 font-semibold'
                value={phoneNumber}
                onChange={(e) => {
                  SetPhoneNumber(e.target.value);
                }}
              />
              <Input
                key='address'
                type='text'
                label='Địa chỉ:'
                labelPlacement='outside-left'
                placeholder=''
                className='mt-10 font-semibold'
                value={address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
              />
              <Button
                endContent={<i className='fa-solid fa-check'></i>}
                disableRipple='true'
                className='mt-10 font-semibold mb-10'
                onClick={() => {
                  handleSubmitInfo();
                }}
              >
                Thay đổi thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-heavy-pink px-[120px] my-10 flex flex-col justify-center items-center'>
        <div className='text-5xl font-bold my-10'>Thay đổi mật khẩu</div>
        <div className='flex flex-col'>
          <Input
            key='oldPassword'
            type='password'
            label='Mật khẩu cũ:'
            labelPlacement='outside-left'
            placeholder='Nhập mật khẩu cũ'
            className=' font-semibold justify-center items-center'
            endContent={
              <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
            }
            value={oldPassword}
            onChange={(e) => {
              SetOldPassword(e.target.value);
            }}
          />
          <Input
            key='newPassword'
            type='password'
            label='Mật khẩu mới:'
            labelPlacement='outside-left'
            placeholder='Nhập mật khẩu mới'
            className='mt-10 font-semibold justify-center items-center'
            endContent={
              <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
            }
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <Input
            key='reNewPassword'
            type='password'
            label='Nhập lại mật khẩu mới:'
            labelPlacement='outside-left'
            placeholder='Nhập lại mật khẩu mới'
            className='mt-10 font-semibold justify-center items-center'
            endContent={
              <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
            }
            value={reNewPassword}
            onChange={(e) => {
              SetReNewPassword(e.target.value);
            }}
          />
        </div>
        {resetPasswordSuccessful && (
          <div className='text-center mt-4'>Thay đổi mật khẩu thành công</div>
        )}
        <Button
          endContent={<i className='fa-solid fa-check'></i>}
          disableRipple='true'
          className='my-5 font-semibold'
          onClick={() => {
            handleChangePassword();
          }}
        >
          Cập nhật mật khẩu
        </Button>
      </div>
    </div>
  );
}

export function Component() {
  return <UserInfoPage />;
}

export default UserInfoPage;
