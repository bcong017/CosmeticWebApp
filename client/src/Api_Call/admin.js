import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export const SALE_COLUMNS = [
  { name: '№', uid: 'id', sortable: true },
  { name: 'Tên', uid: 'event_name', sortable: true },
  { name: 'Tỹ lệ giảm', uid: 'discount_percentage', sortable: true },
  { name: 'Ngày bắt đầu', uid: 'start_date', sortable: true },
  { name: 'Ngày kết thúc', uid: 'end_date', sortable: true },
  { name: 'Thương hiệu', uid: 'brand', sortable: true },
  { name: 'Danh mục', uid: 'category', sortable: true },
  { name: 'Thao tác', uid: 'actions', maxWidth: 1 },
];

export default {
  getUsers() {
    return axios.get(`${API_HOST}/admin/user`);
  },
  deactivateUser(uid) {
    return axios.post(`${API_HOST}/admin/deactivate/${uid}`);
  },
  getOrders() {
    return axios.get(`${API_HOST}/admin/order`);
  },
  confirmOrder(oid) {
    return axios.post(`${API_HOST}/admin/confirm/${oid}`);
  },
  rejectOrder(oid) {
    return axios.post(`${API_HOST}/admin/reject/${oid}`);
  },
  addItem(payload) {
    return axios.post(`${API_HOST}/admin/add`, payload);
  },
  editItem(id, payload) {
    return axios.put(`${API_HOST}/admin/edit/${id}`, payload);
  },
  deleteItem(id) {
    return axios.delete(`${API_HOST}/admin/delete/${id}`);
  },
  getEvents() {
    const items = [
      {
        id: 1,
        event_name: 'Summer Sale 1',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 2,
        event_name: 'Summer Sale 2',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 3,
        event_name: 'Summer Sale 3',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 4,
        event_name: 'Summer Sale 4',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 5,
        event_name: 'Summer Sale 5',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 6,
        event_name: 'Summer Sale 6',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 7,
        event_name: 'Summer Sale 7',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
      {
        id: 8,
        event_name: 'Summer Sale 8',
        discount_percentage: 100,
        is_active: true,
        start_date: '2023-06-01',
        end_date: '2025-06-30',
        category: 'KemLot',
        brand: null,
      },
    ];
    console.log('GET saleevents.getSaleEvents', items);

    return new Promise((resolve, reject) => {
      if (items) {
        resolve({ data: items })
      } else {
        reject({ message: 'error get sale events' })
      }
    })
  },
};
