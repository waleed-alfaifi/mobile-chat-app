const SOCKET = 'ws://192.168.0.101:5000';
const API = 'http://192.168.0.101:5000';
const urls = {
  SOCKET: SOCKET,
  API: API,
  AUTH: '/api/auth',
  REGISTER: '/api/auth/register',
  UPDATE_PROFILE: '/api/account',
  CHANGE_PASSWORD: '/api/account/password',
  AVATARS: '/uploads/',
};
export default urls;
