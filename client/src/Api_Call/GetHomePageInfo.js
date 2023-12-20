import axios from 'axios';
function GetHomePageInfo() {
  return axios
    .get('http://localhost:3000')
    .then((res) => {
      return res.data ?? [];
    })
    .catch((error) => console.log(error));
}

export default GetHomePageInfo;
