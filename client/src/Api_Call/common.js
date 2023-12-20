import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getItems() {
    return axios.get(`${API_HOST}`);
  },
  search(searchTerm) {
    return axios.post(`${API_HOST}/search`, null, { params: { searchTerm } });
  },
  importData() {
    return axios.post(`${API_HOST}/data/import`);
  },
};
