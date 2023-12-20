import './style.css';

import { RadioGroup, Radio, Input, Button, Avatar } from '@nextui-org/react';

function UserInfoPage() {
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
              />
              <Input
                key='birthday'
                type='date'
                label='Ngày sinh:'
                labelPlacement='outside-left'
                placeholder=''
                className='mt-10 font-semibold'
              />
              <div className='flex mt-10'>
                <div className='mr-5 font-semibold'>Giới tính: </div>
                <RadioGroup color='secondary' label='' orientation='horizontal'>
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
                key='phoneNum'
                type='text'
                label='Số điện thoại:'
                labelPlacement='outside-left'
                placeholder=''
                className='mt-10 font-semibold'
              />
              <Input
                key='email'
                type='email'
                label='Email:'
                labelPlacement='outside-left'
                placeholder=''
                className='mt-10 font-semibold'
              />
              <Button
                endContent={<i className='fa-solid fa-check'></i>}
                disableRipple='true'
                className='mt-10 font-semibold mb-10'
              >
                Thay đổi thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-heavy-pink my-10'>
        <div className='text-5xl font-bold mx-[120px] my-10'>
          Thay đổi mật khẩu
        </div>
        <div className='flex flex-col ml-10'>
          <Input
            key='oldPassword'
            type='password'
            label='Mật khẩu cũ:'
            labelPlacement='outside-left'
            placeholder=''
            className='mt-10 font-semibold '
          />
          <Input
            key='newPassword'
            type='password'
            label='Mật khẩu mới:'
            labelPlacement='outside-left'
            placeholder=''
            className='mt-10 font-semibold'
          />
        </div>
        <Button
          endContent={<i className='fa-solid fa-check'></i>}
          disableRipple='true'
          className='mt-10 font-semibold mb-10 ml-10'
        >
          Cập nhật mật khẩu
        </Button>
      </div>
    </div>
  );
}

export default UserInfoPage;
