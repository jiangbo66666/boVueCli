import axios from 'axios'
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL;

//验证拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('mytoken')
  if(token){
    config.headers.Authorization = token
    
    // console.log(config)
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//验证登陆ajax
export const confirmlogin = data=>{
  return axios.post('/login',data).then((res)=>{
    return res.data
  })
}

//用户列表
// export const userList = params => {
//   return axios.get('/users', params).then(res => res.data)
// }

