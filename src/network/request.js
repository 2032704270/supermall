import axios from "axios";

export function request(config) {
  //  1.创建axios实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/mn",
    timeout: 5000
  })

  //  2.1 axios的拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    //  拦截后不返回会导致发送请求失败
    return config;
  }, err => {
    // console.log(err);
  })

  //  2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, err => {
    // console.log(err);
  })

  //  3.发送真正的网络请求
  return instance(config)
}
