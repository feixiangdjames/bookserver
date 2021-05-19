import axios from './index';

export function verifyLogin() {
    return axios.get('/personal/login');
}

export function loginOut(){
    return axios.get('/personal/out');
}

export function queryInfo() {
    return axios.get('/personal/info');
}

export function login(payload) {
    return axios.post('/login',payload);
}
export function loginCheck() {
  return axios.get('/login/check');
}
export function register(payload) {
    return axios.post('/login/register',payload);
}

export function setReadBook(payload) {
  return axios.post('/login/book',payload)
}