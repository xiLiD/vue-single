// import Vue from 'vue'
import router from './router'
import Cookies from 'js-cookie'
import Axios from 'axios'
import store from './store/index'
import base from "@/api/baseUrl";
const webpackInfo = require('@/utils/webpack')

import {
  Message,
  Loading
} from "element-ui";
router.beforeEach((to, from, next) => {
  // document.title = 'IOP渠道维表'
  document.title = webpackInfo.title // 页面标题
  let baseUrl = process.env.NODE_ENV === "development" ? base.development : base.production;
  // LOGIN_KEY  0 => 关闭单点登录 1 => 开启单点登录
  next()
  if (webpackInfo.LOGIN_KEY == '0') {
    // 非单点登录
    let loading = Loading.service({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    }); 
    Axios.post(baseUrl + '/iopWeb/Common/findUserInfo', {}).then((res) => {
      if (res.data.data.length > 0) {
        let auth = to.name == 'cannalTable' ? 1 : 0
        let index = res.data.data.findIndex((item) => item.scenecode == auth)
        
        let {
          useraccount,
          scenecode,
          scenename,
          ...authObj
        } = res.data.data[index]
        if (useraccount) {
          store.dispatch('changeToken',useraccount)
        }
        store.dispatch('changeAuth', authObj)
      } else {
        store.dispatch('changeAuth', {})
      }
      next()
      loading.close();

    }).catch((err) => {
      loading.close();
      Message.error(err)
    })
  } else {
    // 单点登录
    let data = {}
    let hasTicket = null
    if (getUrlParms('METASOFT_SSO_TICKET') || Cookies.get('METASOFT_SSO_C_TICKET')) {
      hasTicket = getUrlParms('METASO FT_SSO_TICKET') || Cookies.get('METASOFT_SSO_C_TICKET')
      data = {
        ssoTicket: getUrlParms('METASOFT_SSO_TICKET') || Cookies.get('METASOFT_SSO_C_TICKET')
      }
    } else {
      data = {
        ssoTicket: null
      }
    }
    let loading = Loading.service({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    Axios.post(baseUrl + '/iopWeb/loginSso', data).then(res => {
      Cookies.set('METASOFT_SSO_C_TICKET', hasTicket)
      if (res.data.data.redirectUrl) {
        window.location.href = res.data.data.redirectUrl
        store.commit('setToken', '')
      } else if (res.data.data.loginName || store.state.token !== '') {
        if (res.data.data.loginName) {
          store.dispatch('changeToken', res.data.data.loginName)
        }
        Axios.post(baseUrl + '/iopWeb/Common/findUserInfo', {}, {
          headers: {
            token: res.data.data.loginName
          }
        }).then((res) => {
          if (res.data.data.length > 0) {
            let auth = to.name == 'cannalTable' ? 1 : 0
            let index = res.data.data.findIndex((item) => item.scenecode == auth)
            let {
              scenecode,
              scenename,
              ...authObj
            } = res.data.data[index]
            store.dispatch('changeAuth', authObj)
          } else {
            store.dispatch('changeAuth', {})
          }
          loading.close();
          next()
        }).catch((err) => {
          Message.error(err)
        })
      }
    })

    function getUrlParms(variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
          return pair[1]
        }
      }
      return (false)
    }
  }



})