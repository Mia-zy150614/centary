/* uuid */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function get_uuid() {
    return (S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4());
}

/* 路由校验 */

export const validateRoute = (to, routes) => {
    if (!Array.isArray(routes)) return false
    return routes.find(item => {
        const role = to.meta.role
        if (!role) {
            return true
        } else {
            return role && item === `/${role}`
        }
    })
}
/* 整理前服务端路由 */

export const filterSeverRouter = (routes, arr = []) => {
    if (!Array.isArray(routes)) return []
    routes.forEach(item => {
        if (item.children === null) {
            arr.push(item.url)
        }
        if (item.children && item.children.length) {
            filterSeverRouter(item.children, arr)
        }
    })
    return arr
}

/* 校验是否存在高级搜索项 */
export const validateIsHighSearch = (obj, ignoreKey) => {
    const values = []
    if(obj instanceof Object) {
        for (const key in obj) {
            if(key !== ignoreKey) {
                if((typeof obj[key] === 'string' && obj[key] !== '') || (Array.isArray(obj[key]) && obj[key].length !== 0)) {
                    values.push(key)
                }
            }
        }
    }
    if(values.length) {
        return true
    } else {
        return false
    }
}