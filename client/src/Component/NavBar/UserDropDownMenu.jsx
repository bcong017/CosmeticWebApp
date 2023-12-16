import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
} from '@nextui-org/react';

export default function UserDropDownMenu() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const toggleCategory = (value) => {
    setIsOpenCategory(value);
  };
  return (
    <>
      <Dropdown
        offset={-2}
        closeOnSelect={false}
        isOpen={isOpenCategory}
        onOpenChange={setIsOpenCategory}
        onMouseEnter={() => toggleCategory(true)}
        onMouseLeave={() => toggleCategory(false)}
      >
        <DropdownTrigger
          onMouseEnter={() => toggleCategory(true)}
          onMouseLeave={() => toggleCategory(false)}
        >
          <Button color='none' isIconOnly disableRipple='true'>
            <div className='fa-solid fa-circle-user user-icon' />
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label='category' disallowEmptySelection>
          <DropdownItem key='1'>
            <Link to='/userInfo'>Thông tin tài khoản.</Link>
          </DropdownItem>
          <DropdownItem key='2'>
            <Link to='/userOrderPage'>Đơn hàng của tôi.</Link>
          </DropdownItem>
          <DropdownItem key='3'>
            <Link to='/'>Đăng xuất.</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
