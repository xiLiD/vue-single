import Vue from "@/main";
import axios from "axios";
import store from "../store";
import {
  Message
} from "element-ui";
// JSBI - 官方ECMAScript BigInt提案的纯JavaScript实现
import JSBI from 'jsbi';
import JSONbigString from 'json-bigint'
// import commonConfig from '../config.js';
const loadingTime = 500;
const timeOut = 5000
let httpRequest = axios.create()
// axios.defaults.timeout = 5000;
httpRequest.interceptors.request.use(
  config => {
    // console.log('请求拦截器成功!',config)
    if (store.state.token) {
      config.headers.token = store.state.token;
    }
    // config.transformRequest = [function (data) {
    //   // 在请求之前对data传参进行格式转换
    //   console.log(data)
    //   data = qs.stringify(data)
    //   console.log(data)
    //   return data
    // }]
    return config;
  },
  function (error) {
    // console.log('请求拦截器失败!',error)
    return Promise.reject(error);
  }
);
httpRequest.defaults.transformResponse = [function (data) {
  //这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好
  try {
    return JSONbigString.parse(data)
  } catch (err) {
    return data;
  }
}]
httpRequest.interceptors.response.use(
  res => {
    // 状态码 200
    // debugger
    console.log(res.config)
    Vue.$httpLoading.close();
    // 普通接口类型 => 成功
    // 根据后端不同返回值 进行逻辑判断
    if (res.status == 200 && res.data && res.data.code == '0') {
      return Promise.resolve(res);
    } else if (res.status == 200 && res.data.type) {
      // 数据流类型  => 成功
      return Promise.resolve(res);
    } else {
      // 普通接口类型  => 失败
      return Promise.reject(res);
    }
  },
  error => {
    Vue.$httpLoading.close();
    console.log("拦截器响应失败!", error);
    console.log(error.response);
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.msg = "请求错误(400)";
          break;
        case 401:
          error.msg = "未授权，请重新登录(401)";
          break;
        case 403:
          error.msg = "拒绝访问(403)";
          break;
        case 404:
          error.msg = "请求出错(404)";
          break;
        case 408:
          error.msg = "请求超时(408)";
          break;
        case 500:
          error.msg = "服务器错误(500)";
          break;
        case 501:
          error.msg = "服务未实现(501)";
          break;
        case 502:
          error.msg = "网络错误(502)";
          break;
        case 503:
          error.msg = "服务不可用(503)";
          break;
        case 504:
          error.msg = "网络超时(504)";
          break;
        case 505:
          error.msg = "HTTP版本不受支持(505)";
          break;
        default:
          error.msg = `连接出错(${error.response.status})!`;
      }
    }
    else if (error.message.indexOf('timeout') !== -1) {
      error.msg = "网络请求超时!"
    }
    else {
      error.msg = "连接服务器失败!";
    }
    Message.error(error.msg);
    return;
    // return Promise.reject(error)
  }
);

function checkLoading(config) {
  let loading = config.showLoading || config.showLoading === undefined ?
    true :
    config.showLoading
  return loading
}

// 请求接口的动画加载  并返回数据
function resolveData(showLoading, config, callBack) {
  // params => showLoading: 是否需要loading , LOADING_TIME => 动画所需时间 默认 500毫秒
  // callback => 回调函数
  return new Promise((resolve) => {
    if (showLoading) {
      let time = config.loadingTime || loadingTime;
      Vue.$httpLoading.show();
      setTimeout(() => {
        resolve(config);
      }, time);
    } else {
      Vue.$httpLoading.close();
      resolve(config); d
    }
  }).then(res => {
    // 执行回调
    return callBack(res)
  })
}

/**
 * config对象
 * 参数列表: 
 * url => 链接地址
 * params => 参数对象
 * isLoading => 是否需要增加loading
 * loadingTime => 设置loading时间, 默认是 500 毫秒
 * timeout => 超时时间, 默认是 5000 毫秒
 */

// GET 请求
export function requestGet(config) {
  let showLoading = checkLoading(config) // 判断是否需要加入 loading加载动画
  return resolveData(showLoading, config, (res) => {
    return httpRequest.get(res.url, {
      params: res.data
    }, {
      timeout: config.timeOut || timeOut
    })
  })
}

// POST 请求
export function requestPost(config) {
  let showLoading = checkLoading(config) // 判断是否需要加入 loading加载动画
  let formData = config.data
  return resolveData(showLoading, config, (res) => {
    return httpRequest.post(res.url, formData, {
      timeout: config.timeOut || timeOut
    });
  })
}

// 文件上传
export function requestFile(config) {
  let showLoading = checkLoading(config) // 判断是否需要加入 loading加载动画
  let formData = new FormData();
  Object.keys(config.data).forEach(key => {
    formData.append(key, config.data[key]);
  });
  return resolveData(showLoading, config, (res) => {
    return httpRequest.post(res.url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: config.timeOut || timeOut
    });
  })
}

// 请求数据流
export function requestExcel(config) {
  let showLoading = checkLoading(config) // 判断是否需要加入 loading加载动画
  let formData = new FormData();
  Object.keys(config.data).forEach(key => {
    formData.append(key, config.data[key]);
  });
  return resolveData(showLoading, config, (res) => {
    return httpRequest.post(res.url, formData, {
      headers: {
        'responseType': 'blob',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: config.timeOut || timeOut
    });
  })
}