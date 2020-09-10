/* 自定义 模拟 lodash */
let timeout;
export default (func, wait) => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }

    timeout = setTimeout(() => {
        func()
        clearTimeout(timeout)
        timeout = null
    }, wait)
}