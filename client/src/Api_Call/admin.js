import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getUsers() {
    return axios.get(`${API_HOST}/admin/user`);
  },
  deactivateUser(uid) {
    return axios.post(`${API_HOST}/deactivate/${uid}`);
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
};
