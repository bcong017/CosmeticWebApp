import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  addEvent(payload) {
    return axios.post(`${API_HOST}/event/add`, payload);
  },
  editEvent(eid, payload) {
    return axios.put(`${API_HOST}/event/edit/${eid}`, payload);
  },
  removeEvent(eid) {
    return axios.delete(`${API_HOST}/event/delete/${eid}`);
  },
};
