import axios from 'axios';
import { createHashHistory } from 'history';
import {message} from 'antd';
import { delCookie } from '../utils/common'

const history = createHashHistory();

const apiBaseUrl = process.env.NODE_ENV === 'production' ? '' : '/api';

// axios 配置
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiBaseUrl + '/admin';

let requestNum = 0;

// 请求拦截
axios.interceptors.request.use(config => {
    requestNum++;
    // console.log(document.getElementsByClassName("myLoading"))
    document.getElementsByClassName("myLoading")[0].style.zIndex = '10000';
    return config;
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    console.log(response);
    requestNum--;
    if(requestNum === 0){
        document.getElementsByClassName("myLoading")[0].style.zIndex = '-100';
    }
    // 未登录
    if(response.status === 207 && response.data.code === '0000'){
        delCookie('token');
        history.push('/login');
        history.go();
        message.error(response.data.message);
    }else if(response.data.success === false){
        message.error(response.data.message);
    }
    return response;
}, error => {
    document.getElementsByClassName("myLoading")[0].style.zIndex = '-100';
    return Promise.reject(error)
})


export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url + "?" + params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}