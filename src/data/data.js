import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3012';
// axios.defaults.timeout = 2000;

const getData = (body) => axios.post('/sign-up', body);

export default getData;
