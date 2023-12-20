import { API_HOST } from '@/Global_reference/variables';
import axios from 'axios';

export default {
  addComment(id, payload) {
    return axios.post(`${API_HOST}/comment/add/${id}`, payload);
  },
  editComment(cid, payload) {
    return axios.put(`${API_HOST}/edit/${cid}`, payload);
  },
  deleteComment(cid) {
    return axios.delete(`${API_HOST}/delete/${cid}`);
  },
};
