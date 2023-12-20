import axios from 'axios';
function GetItem(path) {
  return axios
    .get(`http://localhost:3000${path}`)
    .then((res) => {
      return res.data ?? [];
    })
    .catch((error) => console.log(error));
}

export default GetItem;
