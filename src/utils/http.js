import Vue from 'vue';
import axios from 'axios';
// 按需导入element-ui消息提示方法
import { Message } from "element-ui"


// 配置基础域名
axios.defaults.baseURL = "http://localhost:3000/api";

// 请求拦截器 配置请求头
axios.interceptors.request.use(function (config) {
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');
    // 通过自定义请求头authorization将登陆凭证发送给数据接口
    config.headers.authorization = loginInfo.token;
    return config;
})

// 添加响应拦截
axios.interceptors.response.use(function (response) {
    if (response.data.code == 403) {
        // 调用element-ui中的消息提示方法 普通提示直接写文本  其他提示需要传对象
        Message({ type: 'warning', message: response.data.msg })
        // 重定向
        location.href = "#/login";
    }
    return response.data
});

Vue.prototype.$http = axios;

// 导出
export default axios;