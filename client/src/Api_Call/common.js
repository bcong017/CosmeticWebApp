import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getItems() {
    return axios.get(`${API_HOST}`);
  },
  search(params) {
    return axios.post(`${API_HOST}/search`, null, { params });
  },
  importData() {
    return axios.post(`${API_HOST}/data/import`);
  },
  getBrand() {
    return axios.get(`${API_HOST}/multi/all-brands`);
  },
};
