import axios from 'axios';
import Qs from 'qs';

const url='http://readbook.myprojectcms.tk/api/v1';

axios.defaults.baseURL=url;
axios.defaults.withCredentials=true;//CORS+COOKIE
axios.defaults.transformRequest=(data={})=>Qs.stringify(data);

//cookie
axios.interceptors.response.use(result=>result.data.message);

//session
//axios.interceptors.response.use(result=>result.data);

export default axios;