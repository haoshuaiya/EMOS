// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import IEcharts from 'vue-echarts-v3'
Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(IEcharts);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    data: {
        allState: {
            cpu: {
                used: 0
            },
            load: {
                'used': 0
            },
            storage: {
                'all': 0,
                'used': 0,
                'rate': 0
            },
            connection: 0,
            disks: [],
            netcards: [],
            ifNginx: true,
            ifApache: true,
            ifUpload: true
        }
    }
});