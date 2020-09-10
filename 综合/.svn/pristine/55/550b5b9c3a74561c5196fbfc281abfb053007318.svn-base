import axios from 'axios'
import Qs from 'qs'
import Session from './session-util'
import { Base64 } from 'js-base64'
import { Message } from 'element-ui'
import store from '@/store'

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 20,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function (data) {
        let token = store.state.userStore.token;
        if (token) {
            data = Object.assign({}, token, data)
        }
        data = Qs.stringify(data);
        return data;
    }]
})

/* 提示信息 */
const showMessage = message => {
    Message({
        type: "error",
        message,
        duration: 1000,
        onClose() {
            location.href = '/';
        }
    })
}

// 下载文件方法
const download = (data, filename) => {
    if (!data) return
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(new Blob([data]), filename) // IE
    } else {
        link.click()
    }
}

// request 拦截器
http.interceptors.request.use(
    config => config,
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response 拦截器
http.interceptors.response.use(
    response => {
        // 后台报错
        if (response.data !== null && response.data.code === 'error') {
            Message.error('服务请求异常')
        }
        /* 登录过期 */
        if (response.data !== null) {
            const code = response.data.code;
            if (code == '-1016' || code == '-1017' || code == '-1018' || code == '-1019' || code == '-1020') {
                showMessage('用户登录过期，请重新登录')
            }
        }
        /* 下载 */
        if (response.headers && (response.headers['content-type'].indexOf('application/x-msdownload') != -1 || response.headers['content-type'].indexOf('octets/stream') != -1 || response.headers['content-type'].indexOf('application/octet-stream') != -1)) {
            let filename = "";
            if (response.headers["content-disposition"] && response.headers["content-disposition"].split(";").length > 1 && response.headers["content-disposition"].split(";")[1].split("filename=").length > 1) {
                filename = response.headers["content-disposition"].split(";")[1].split("filename=")[1];
                filename = Base64.decode(filename, "utf-8");
            } else {
                filename = "none";
            }
            download(response.data, filename)
        } else if (response.config && response.config.responseType && response.config.responseType == 'blob') {
            download(response.data, 'error.json');
        }
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default http