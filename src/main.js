import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import "babel-polyfill";
import moment from 'moment';
Vue.use(Mint);
Vue.prototype.$axios = axios;
moment.locale("zh-cn");
window.moment = moment;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
