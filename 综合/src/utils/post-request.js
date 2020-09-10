import http from './http'
import store from '@/store'
import { BASE_SERVER_API, FILE_SERVER_APP } from '../config/http-url'


export const baseServer = (url, data = null) => {
    return http({
        url: `${BASE_SERVER_API}${url}`,
        method: "POST",
        data
    })
}
/* 上传 */
export const filesLoader = (type, params_str) => {
    let token = store.getters.token
    let data = Object.assign({}, token, data)
    let user_token = '';
    if (typeof data === 'object') {
        for (let i in data) {
            user_token += `${i}=${data[i]}&`
        }
    }
    return FILE_SERVER_APP + `/${type}?${user_token}${params_str}`
}
/* 批量导入 */
export const importExcel = (type, params_str) => {
    let token = store.getters.token
    let data = Object.assign({}, token, data)
    let user_token = '';
    if (typeof data === 'object') {
        for (let i in data) {
            user_token += `${i}=${data[i]}&`
        }
    }
    return BASE_SERVER_API + `/${type}?${user_token}${params_str}`
}

// 导出excel
export  const downloadServer = (url, data = null) => {
    return http({
        url: `${BASE_SERVER_API}${url}`,
        method: 'POST',
        responseType: 'blob',
        data
    })
}

// 文件服务器的api
export const fileServer = (url, data = null) => {
    return http({
        url: `${FILE_SERVER_APP}${url}`,
        method: "POST",
        data
    })
}