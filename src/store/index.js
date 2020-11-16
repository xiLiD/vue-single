import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem('token') || '',
    authInfo : JSON.parse(window.sessionStorage.getItem('authInfo')) || "{}"
  },
  mutations: {  
    setToken (state, token) {
      state.token = token
      window.sessionStorage.setItem('token', token)
    },
    setAuth (state, authInfo) {
      state.authInfo = authInfo
      window.sessionStorage.setItem('authInfo', JSON.stringify(authInfo))
    }, 
  }, 
  actions: {
    changeToken (context, value) {
      context.commit('setToken', value)
    },
    changeAuth (context, value) {
      context.commit('setAuth', value)
    },
  }
});
