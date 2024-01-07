import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export const SALE_COLUMNS = [
  { name: '№', uid: 'id', sortable: true },
  { name: 'Tên', uid: 'event_name', sortable: true },
  { name: 'Tỷ lệ giảm', uid: 'discount_percentage', sortable: true },
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
    return axios.post(`${API_HOST}/admin/item/create`, payload);
  },
  editItem(id, payload) {
    return axios.put(`${API_HOST}/admin/item/edit/${id}`, payload);
  },
  deleteItem(id) {
    return axios.delete(`${API_HOST}/admin/item/delete/${id}`);
  },
  getEvents() {
    return axios.get(`${API_HOST}/admin/event`);
  },
};
