import axios from "axios";
import { Message } from "element-ui";

import { getToken, removeToken } from "@/utils/auth";
var qs = require("qs"); // 使用application/x-www-form-urlencoded格式

const api = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true
  // timeout: 5000 // request timeout
});
// request interceptor
api.interceptors.request.use(
  config => {
    config.headers["token"] = getToken();
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
api.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    console.log(
      "请求后返回！url=" +
      response.config.url +
      ", code=" +
      response.data.code +
      ", msg=" +
      response.data.msg
    );
    // if (response.data.result !== null) {
    //   console.log(response.data.result)
    // }
    // 登录拦截
    // if (response.config.url.indexOf('login') > -1) {
    //   console.log('登录')
    //   return response
    // }
    // if (response.data.code === 420) {
    //   if (response.config.url.indexOf('getUserInfo') > -1) {
    //     return response
    //   }
    //   // 消息提示
    //   location.reload()
    //   // 返回为未登录时可直接跳转到登录页
    //   return Promise.reject(response)
    // }
    if (
      response.data.code === 1 ||
      response.data.code === 30002 ||
      response.data.code === 30003
    ) {
      console.log("成功", response);
      return response;
    } else if (response.data.code === 212 || response.data.code === 214) {
      // ssoLogin登录失败
      return response;
    } else if (
      response.data.code === 217 ||
      response.data.code === 218 ||
      (response.data.code >= 600 && response.data.code < 700)
    ) {
      // 特殊返回，交给各自的请求自己处理
      return response;
    } else if (response.data.code === 401) {
      Message({
        message: "请先登录账号",
        type: "error",
        duration: 5 * 1000
      });
      removeToken();
      location.reload();
      return Promise.reject(response);
    } else if (
      response.data.code === 500 ||
      response.data.code === 510 ||
      response.data.code === 211
    ) {
      // 服务器返回的错误
      Message({
        message: response.data.message,
        type: "error",
        duration: 5 * 1000
      });

      // return response
      // location.reload()
      return Promise.reject(response);
    } else {
      if (response.data === "") {
        console.log("sssss");
        return Promise.reject(response);
      } else {
        Message({
          message: response.data.message,
          type: "error",
          duration: 5 * 1000
        });
        // return response
        return Promise.reject(response);
      }
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message || "网络出现问题请刷新重试",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    api
      .post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const bPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(function (response) {
        resolve(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const ssoGetTokenUrl = () => {
  return process.env.ssoGetTokenUrl;
};
export const ssoLoginUrl = () => {
  return process.env.ssoLoginUrl;
};
export const hostUrl = () => {
  return process.env.hostUrl;
};

export const ssoLogin = params => {
  return new Promise((resolve, reject) => {
    api
      .post(process.env.BASE_API + "ssoLogin", qs.stringify(params))
      .then(function (response) {
        resolve(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export default api;
