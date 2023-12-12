import { Image } from '@nextui-org/react';

export default function UserItem() {
  return (
    <div className='justify-evenly flex bg-pink-300 m-5 pt-4 pb-4 '>
      <Image
        className='variant-item-thumbnail'
        src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
        alt=''
        width={80}
        height={80}
      />
      <div className='self-center'>
        <div className='ml-5 '>Họ và tên: NBC</div>
        <div className='ml-5 '>Ngày gia nhập: 24/6/2023</div>
      </div>
      <div className='ml-5 self-center flex'>
        <div className='flex flex-col'></div>
      </div>
      <i className='fa-solid fa-trash self-center hover:cursor-pointer hover:text-red-500 '></i>
    </div>
  );
}
