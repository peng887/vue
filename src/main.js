// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui'
Vue.prototype.$toast = Toast;
import { Indicator } from 'mint-ui'
Vue.prototype.$indicator = Indicator;
import Global from './components/commons/Global'//引用公共方法文件
Vue.prototype.$Global = Global//挂载到Vue实例上面

import store from  './store'

import axios from 'axios'
Vue.prototype.$axios= axios
axios.defaults.baseURL="/api"
// axios.defaults.baseURL=""


// axios.interceptors.request.use(function (config) {
//   Indicator.open();// 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   return Promise.reject(error);// 对请求错误做些什么
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
