import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
  Input,
  NavbarMenuToggle,
  NavbarMenu,
} from '@nextui-org/react';
import { Logo } from '../../Global_reference/assets/Logo';
import './NavBar.css';
import LoginModal from '../LoginModal';
import UserDropDownMenu from './UserDropDownMenu';
import { Token } from '@/main';

const category = [
  {
    title: 'Chăm sóc da mặt',
    children: {
      faceRemover: 'Tẩy trang mặt',
      cleanser: 'Sữa rửa mặt',
      exfoliating: 'Tẩy tế bào chết',
      lipBalm: 'Dưỡng môi',
    },
  },
  {
    title: 'Trang điểm mặt',
    children: {
      creampie: 'Kem lót',
      foundation: 'Kem nền',
      cushion: 'Phấn nước Cushion',
    },
  },
  {
    title: 'Chăm sóc tóc và da đầu',
    children: {
      shampoo: 'Dầu gội',
      conditioner: 'Dầu xả',
      hairCare: 'Dưỡng tóc',
    },
  },
  {
    title: 'Nước hoa',
    children: {
      women: 'Nước hoa nữ',
      men: 'Nước hoa nam',
      fullBody: 'Xịt thơm toàn thân',
      intimate: 'Nước hoa vùng kín',
    },
  },
];

function NavBar() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const toggleCategory = (value) => {
    setIsOpenCategory(value);
  };
  // const isUser = true;
  const token = useContext(Token);
  return (
    <>
      <Navbar
        className='bg-primary-pink'
        isBlurred={false}
        isBordered
        maxWidth='full'
      >
        <NavbarContent justify='center'>
          <NavbarMenuToggle className='sm:hidden text-heavy-pink' />
          <NavbarBrand>
            <Link to='/'>
              <Logo />
            </Link>
            <Link to='/'>
              <div className='hidden sm:block font-bold text-heavy-pink uppercase'>
                Glamour heaven
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='flex gap-2 sm:gap-4' justify='end'>
          <NavbarItem className='hidden sm:block flex-none'>
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
                <Button
                  variant='light'
                  endContent={<div className='fa-solid fa-chevron-down' />}
                >
                  Danh mục
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label='category' disallowEmptySelection>
                {category.map((el, index) => (
                  <DropdownItem key={index}>
                    <Dropdown
                      type='listbox'
                      size='sm'
                      showArrow
                      placement='right'
                    >
                      <DropdownTrigger>{el.title}</DropdownTrigger>

                      <DropdownMenu disallowEmptySelection variant='light'>
                        {Object.keys(el.children).map((key) => (
                          <DropdownItem key={key}>
                            <Link to='/test'>{el.children[key]}</Link>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem className='flex-auto sm:flex-initial'>
            <Input
              size='sm'
              labelPlacement='inside'
              placeholder='Tìm kiếm'
              startContent={
                <div className='fa-solid fa-magnifying-glass text-heavy-pink' />
              }
              endContent={
                <Button className='bg-heavy-pink' radius='sm' size='sm'>
                  Tìm kiếm
                </Button>
              }
            />
          </NavbarItem>

          <NavbarItem className='flex-none'>
            {token == 'user' ? <UserDropDownMenu /> : <LoginModal />}
          </NavbarItem>

          <NavbarItem className='flex-none'>
            <Tooltip content='Giỏ hàng' closeDelay={0}>
              <Link to='/cart'>
                <div className='fa-solid fa-cart-shopping cart-icon' />
              </Link>
            </Tooltip>
          </NavbarItem>
        </NavbarContent>

        {/* TODO: */}
        <NavbarMenu>Navbar menu here</NavbarMenu>
      </Navbar>
    </>
  );
}

export default NavBar;
