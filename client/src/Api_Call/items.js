import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  getItem(id) {
    return axios.get(`${API_HOST}/item/${id}`);
  },
};
