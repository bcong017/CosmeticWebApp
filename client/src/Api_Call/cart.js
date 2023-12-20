import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getItems() {
    return axios.get(`${API_HOST}/cart/items`);
  },
  addItem(payload) {
    return axios.post(`${API_HOST}/cart/add`, payload);
  },
  editItem(payload) {
    return axios.put(`${API_HOST}/cart/edit`, payload);
  },
  deleteItem(cid, payload) {
    return axios.post(`${API_HOST}/cart/delete/${cid}`, payload);
  },
};
