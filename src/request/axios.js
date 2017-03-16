import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    //  _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (!res.data) {
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    // 获取全部数据
    getLeftBar(params) {
        return fetch('/index.php/schoolsummary', params)
    },
    // 获取cpu数据
    getCPUData(params) {
        return fetch('/index.php/schoolone/cpu', params)
    },
    // 获取系统负载
    getSysLoad(params) {
        return fetch('/index.php/schoolone/sysload', params)
    },
    // 获取内存数据
    getMemData(params) {
        return fetch('/index.php/schoolone/mem', params)
    },
    // 获取网络连接
    getLinkData(params) {
        return fetch('/index.php/schoolone/netLinks', params)
    },
    // 获取磁盘数据
    getDiskData(params) {
        return fetch('/index.php/schoolone/disk', params)
    },
    // 获取网卡数据
    getNetcardData(params) {
        return fetch('/index.php/schoolone/netcard', params)
    },

    // 获取进程数据
    getProcessData(params) {
        return fetch('/index.php/schoolone/process', params)
    },
    // 获取环境数据

    getEnvData(params) {
        return fetch('/index.php/schoolone/env', params)
    }

}