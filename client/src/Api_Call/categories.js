import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getItems(category) {
    // return axios.post(`${API_HOST}/categories/${category}`);
    return axios.get(`${API_HOST}${category}`);
  },
};
