// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入二次封装的axios
import "./utils/http"
// 导入数据存储对象
import store from "./store/index"
// 导入公共的css样式
import "./assets/css/reset.css"
// 导入element-ui
import "./utils/element"

Vue.config.productionTip = false

Vue.prototype.$imgBaseUrl = 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 挂载数据存储对象
  store
})
