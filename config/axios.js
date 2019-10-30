import axios from 'axios';
import urls from './urls';

const instance = axios.create({
  baseURL: urls.API,
});

export default instance;
