import axios from 'axios'
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL;

//验证拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers.Authorization = token

    // console.log(config)
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//验证登陆ajax
export const confirmlogin = data => {
  return axios.post('/login', data).then((res) => {
    return res.data
  })
}

// 用户列表
export const userList = params => {
  return axios.get('/users', params).then(res => res.data)
}

//改变用户状态
export const changeuserzt = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`).then((res) => res.data)
}

//添加用户
export const adduserinfomation = (params) => {
  return axios.post('/users', params).then((res) => {
    return res.data
  })
}

//删除用户
export const deluser = (params) => {
  return axios.delete(`users/${params}`).then(res => res.data)
}

//角色列表
export const userroles = () => {
  return axios.get(`roles`).then(res => res.data)
}

//删除角色权限
export const deluserrights = (params) => {
  return axios.delete(`roles/${params.rolesid}/rights/${params.rightid}`).then(res=>res.data)
}

//所有权限列表
export const allrightslist = (params) =>{
  return axios.get(`rights/${params}`).then(res=>res.data)
}