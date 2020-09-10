import { baseServer, downloadServer } from '../utils/post-request'

class DictdataApi {
    // 部门列表
    static list(data) {
        return baseServer('/dictData/dictDatalist.shtml', data)
    }
    static add(data) {
        return baseServer('/dictData/addDictData.shtml', data)
    }
    static delete(data) {
        return baseServer('/dictData/deleteDictData.shtml', data)
    }
    static queryByModel(data) {
        return baseServer('/dictData/queryByType.shtml', data)
    }
    static queryByParam(data) {
        return baseServer('/dictData/queryByParam.shtml', data)
    }
    //获取所有的设备型号
    static getDictDevice(data) {
        return baseServer('/dictData/getDictDeviceKindList.shtml', data)
    }
    //查询多个数据字典 type 多个逗号分隔
    static queryByTypes(data) {
        return baseServer('/dictData/queryByTypes.shtml', data)
    }
    static clearCache(data) {
        return baseServer('/dictData/clearCache.shtml', data)
    }
    static exportExcel(data) {
        return downloadServer('/dictData/exportExcel.shtml', data)
    }
    //根据类型查询数据字典树
    static getDictTree(data) {
        return baseServer('/dictData/getDictTree.shtml', data)
    }
    //查询两级树
    static getDictTwoTree(data) {
        return baseServer('/dictData/getDictTwoTree.shtml', data)
    }
}

export default DictdataApi