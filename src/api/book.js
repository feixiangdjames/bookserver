import axios from './index';


//Verify login
export function getBookList() {
    return axios.get('/booklist');
}

export function getBook(payload){
    return axios.post('/book',payload);
}

export function getLevel(){
    return axios.get('/booklist/level');
}
export function setLevel(payload){
    return axios.post('/booklist/level',payload);
}
export function getCurrentLevel(payload){
    return axios.post('/booklist/level/current',payload);
}
export function overWritePhrase(payload){
    return axios.post('/book/new_phrase',payload);
}

export function setWordPositon(payload){
  return axios.post('/book/word',payload);
}
