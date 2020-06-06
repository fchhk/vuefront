import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'


Vue.use(ElementUI)

Vue.config.productionTip = false

axios.defaults.withCredentials = true;//跨域访问需要发送cookie
axios.defaults.baseURL = 'http://localhost:8181/charity/';
axios.defaults.headers.common['Authorization'] = store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
//判断是否存在token，如果存在将每个页面header都添加token
    if (store.state.token) {
        config.headers.common['Authorization'] = store.state.token.token
    }

    return config;
}, error => {
// 对请求错误做些什么
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    this.$store.commit('del_token');
                    router.replace({
                        path: '/homeLogin',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    });

