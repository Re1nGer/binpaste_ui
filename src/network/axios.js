import axios from 'axios';


const instance = axios.create({
  baseURL: "http://localhost:5205/api/v1/pastes", //dev env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default instance;