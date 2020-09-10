import { baseServer } from '../utils/post-request'

class ParamApi {
    /// 参数列表
    static list(data) {
        return baseServer('/params/list.shtml', data)
    }
    static getParamsInfoByKindAndName(kind, name) {
        return baseServer('/params/getParamsInfoByKindAndName.shtml', { kind: kind, name: name })
    }
    static save(data) {
        return baseServer('/params/save.shtml', data)
    }
    static clearCache(data) {
        return baseServer('/params/clearCache.shtml', data)
    }
}

export default ParamApi