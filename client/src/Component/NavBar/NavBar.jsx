import { useState, useContext, useRef, useEffect } from 'react';
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
} from '@nextui-org/react';
import { Logo } from '../../Global_reference/assets/Logo';
import './NavBar.css';
import LoginModal from '../LoginModal';
import UserDropDownMenu from './UserDropDownMenu';
import { APP_ROLE, CAT } from '@/Global_reference/variables';
import common from '@/Api_Call/common';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Global_reference/context/auth';

const category = [
  {
    title: 'Chăm sóc da mặt',
    children: {
      faceRemover: 'Tẩy trang mặt',
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
      conditioner: 'Dầu xả',
    },
  },
  {
    title: 'Nước hoa',
    children: {
      fullBody: 'Xịt thơm toàn thân',
      intimate: 'Nước hoa vùng kín',
    },
  },
];

function NavBar() {
  let searchRef = useRef();
  const valuesOfCAT = Object.values(CAT);
  let currentIndex = 0;
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const navigate = useNavigate();
  const { token, role } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  function getCurrentCAT() {
    let res = valuesOfCAT[currentIndex];
    currentIndex++;
    return res;
  }
  const toggleCategory = (value) => {
    setIsOpenCategory(value);
  };
  async function handleSearch() {
    if (searchInput != '') {
      let res = await common.search({ searchTerm: searchInput });
      navigate(`/search/searchTerm/${searchInput}`, {
        state: res?.data.resultedItems,
      });
    }
  }
  useEffect(() => {
    searchRef.current = '';
    setSearchInput('');
  }, [location.pathname]);
  return (
    <>
      <Navbar
        className='bg-primary-pink'
        isBlurred={false}
        isBordered
        maxWidth='full'
      >
        <NavbarContent justify='center'>
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
                            <Link to={`/categories/${getCurrentCAT()}`}>
                              {el.children[key]}
                            </Link>
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              startContent={
                <div className='fa-solid fa-magnifying-glass text-heavy-pink' />
              }
              endContent={
                <Button
                  className='bg-heavy-pink'
                  radius='sm'
                  size='sm'
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Tìm kiếm
                </Button>
              }
            />
          </NavbarItem>

          <NavbarItem className='flex-none'>
            {token && role == APP_ROLE.USER ? (
              <UserDropDownMenu />
            ) : (
              <LoginModal />
            )}
          </NavbarItem>
          {token && role == APP_ROLE.USER && (
            <NavbarItem className='flex-none'>
              <Tooltip content='Giỏ hàng' closeDelay={0}>
                <Link to='/cart'>
                  <div className='fa-solid fa-cart-shopping cart-icon' />
                </Link>
              </Tooltip>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavBar;
