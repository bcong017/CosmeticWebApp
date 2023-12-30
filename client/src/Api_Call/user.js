import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  register(payload) {
    return axios.post(`${API_HOST}/register`, payload);
  },
  login(payload) {
    return axios.post(`${API_HOST}/login`, payload);
  },
  getInfo() {
    return axios.get(`${API_HOST}/user/info`);
  },
  changePassword(payload) {
    return axios.post(`${API_HOST}/user/change-password`, payload);
  },
};
