// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Antd from "ant-design-vue";
import {message} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import axios from "axios";
import dayjs from "dayjs";
import VueClipboard from 'vue-clipboard2'

import store from "./store";
import VueCookies from "vue-cookies";

import App from "./App";
import router from "./router";

import reqid from "./utils/reqid";


Vue.use(VueClipboard)

Vue.use(Antd);
Vue.use(VueCookies);

Vue.config.productionTip = false;

// Vue.prototype.BaseURL = document.location.origin.replace("8080", "8888");
Vue.prototype.BaseURL = document.location.origin;
Vue.prototype.W5Version = "0.3.3";
Vue.prototype.Dayjs = dayjs;
Vue.http = Vue.prototype.$http = axios;

axios.defaults.baseURL = Vue.prototype.BaseURL;
axios.defaults.headers.post["Content-Type"] = "application/json";

//添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 认证 TOEKN
    config.headers.common["token"] = VueCookies.get("token");
    // Requestid
    config.headers.common["requestId"] = reqid.GetRequestId();
    // 时间戳
    config.headers.common["timestamp"] = new Date().getTime();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.code == 1002) {
      // token 失效
      $cookies.remove("token");
      $cookies.remove("nick_name");
      $cookies.remove("account");
      $cookies.remove("user_id");

      window.location.href = "/";
    } else if (response.data.code == 1003) {
      // 无权限访问
      router.push({name: "err403"});
    }
    return response.data;
  },
  function (error) {
    message.destroy();
    message.error(error + "");
    return Promise.reject(error);
  }
);

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    var isToken = $cookies.isKey("token");

    if (isToken) {
      next();
    } else {
      next({
        path: "/"
        // query: { redirect: to.fullPath }
      });
    }
  } else {
    var isToken = $cookies.isKey("token");
    if (isToken) {
      if (to.name == "Login") {
        next({
          path: "/dashboard"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: {App},
  template: "<App/>"
});
