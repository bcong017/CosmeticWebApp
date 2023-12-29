import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import admin from '@/Api_Call/admin';

export default function UserItem() {
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    admin
      .getUsers()
      .then((res) => {
        setUserList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleState = (state, id) => {
    if (state) {
      admin
        .deactivateUser(id)
        .then(() => {
          getUserList();
        })
        .catch(function (error) {
          console.log(error);
        });
      // getUserList();
    }
    // else{
    //   admin.
    // }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      {userList?.users?.map((current, index) => {
        return (
          <div
            key={index}
            className='justify-evenly flex bg-pink-300 m-5 py-4 '
          >
            <div className='self-center w-[250px]'>
              <div className='ml-5 '>Họ và tên: {current.name}</div>
              <div className='ml-5 '>Số điện thoại: {current.phone_number}</div>
              <div className='ml-5 '>Địa chỉ: {current.address}</div>
            </div>
            {current.is_active ? (
              <Button
                className='self-center w-[100px]'
                onClick={() => {
                  handleState(current.is_active, current.id);
                }}
                color='primary'
                disableRipple='true'
              >
                Vô hiệu hóa
              </Button>
            ) : (
              <Button
                className='self-center w-[100px]'
                onClick={() => {
                  handleState(current.is_active, current.id);
                }}
                color='primary'
                disableRipple='true'
              >
                Kích hoạt
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
}
