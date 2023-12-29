import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  createOrder(payload) {
    return axios.post(`${API_HOST}/order/create`, payload);
  },
};
