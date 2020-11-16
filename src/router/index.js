import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// import '@/router/permission.js'
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const webpackInfo = require('@/utils/webpack') 
import webpack from "../utils/webpack";
export default new Router({
  mode: 'hash', 
  routes: [
    // {
    // path: "/",
    // component: Layout,
    // redirect: "/cannalTable",
    // name: "home",
    // children: [{
    //   path: "cannalTable",
    //   component: () =>
    //     import("@/views/pages/cannalTable"),
    //   name: "cannalTable",
    //   meta: {
    //     navbar: 1, 
    //     title : '渠道维表'
    //   }
    // }, 
    // {
    //   path: "productTable",
    //   component: () =>
    //     import("@/views/pages/productTable"),
    //   name: "productTable",
    //   meta: {
    //     navbar: 2,
    //     title : '产品维表'  
    //   }
    //   },
    //   {
    //     path: "other",
    //     component: () =>
    //       import("@/views/pages/other"),
    //     name: "other",
    //     meta: {
    //       navbar: 1,
    //       title : '产品维表'  
    //     }
    //     }
    // ]
    // }

    {
      path: "/",
      component: () =>
        import("@/views/pages/" + webpackInfo.page),
      name: webpackInfo.page,
      // redirect : '/productTable'
    },
    // {
    //   path: "/cannalTable",
    //   component: () =>
    //     import("@/views/pages/cannalTable"),
    //   name: "cannalTable",
    //   meta: {
    //     navbar: 1, 
    //     title : 'IOP渠道维表' 
    //   }   
    // },
    // {
    //   path: "/productTable",
    //   component: () =>
    //     import("@/views/pages/productTable"),
    //   name: "productTable",
    //   meta: {
    //     navbar: 1,
    //     title : 'IOP产品维表'  
    //   }
    // },
    // {
    //   path: "/family",
    //   component: () =>
    //     import("@/views/pages/family"),
    //   name: "family",
    //   meta: {
    //     navbar: 1, 
    //     title : 'family' 
    //   }   
    // },
    // {
    //   path: "/personal",
    //   component: () =>
    //     import("@/views/pages/personal"),
    //   name: "personal",
    //   meta: {
    //     navbar: 1,
    //     title : 'personal'  
    //   }
    // },
    // {
    //   path: "/report",
    //   component: () =>
    //     import("@/views/pages/report"),
    //   name: "report",
    //   meta: {
    //     navbar: 1,
    //     title : 'report'  
    //   }
    // },
    // {
    //   path: "/",
    //   component: () =>
    //     import("@/views/pages/index"),
    //   name: "index",
    //   meta: {
    //     navbar: 1,
    //     title : '热力图'  
    //   }
    // } 
  ]
});