const columns = [
  { name: 'STT', uid: 'id', sortable: true },
  { name: 'Mã sản phẩm', uid: 'iid', sortable: true },
  { name: 'Tên sản phẩm', uid: 'name', sortable: true },
  { name: 'Đơn giá', uid: 'price', sortable: true },
  { name: 'Số lượng', uid: 'amount', sortable: true },
  { name: 'Thao tác', uid: 'actions', maxWidth: 1 },
];

const users = [
  {
    id: 1,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '21',
    amount: '2',
  },
  {
    id: 2,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '29',
    amount: '4',
  },
  {
    id: 3,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '23',
    amount: '1',
  },
  {
    id: 4,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '19',
    amount: '9',
  },
  {
    id: 5,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '339',
    amount: '89',
  },
  {
    id: 6,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '29',
    amount: '11',
  },
  {
    id: 7,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '219',
    amount: '1',
  },
  {
    id: 8,
    iid: 'MSV123',
    name: 'Sữa rửa mặt',
    price: '219',
    amount: '1',
  },
];

export { columns, users };
