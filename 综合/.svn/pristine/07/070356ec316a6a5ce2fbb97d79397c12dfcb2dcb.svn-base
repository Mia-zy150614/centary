import { baseServer, importExcel,downloadServer } from '../utils/post-request'

class buyaskApi {
    //获取采购询价列表
    static getList(data){
        return baseServer('/buyask/list.shtml', data)
    }
    //保存
    static save(data){
        return baseServer('/buyask/save.shtml', data)
    }
    //获取详情 参数（id:）
    static getById(data){
        return baseServer('/buyask/getById.shtml', data)
    }
    //删除 参数（ids:）
    static delByIds(data){
        return baseServer('/buyask/delByIds.shtml', data)
    }
    //导出
    static exportExcel(data) {
        return downloadServer('/buyask/exportExcel.shtml', data)
    }
    //下载模板 参数（fileId：2）
    static downLoadTemplate(data) {
        return downloadServer('/goods/downLoadTemplate.shtml', data)
    }
    //批量导入
    static importExcel(data) {
        return importExcel('buyask/importExcel.shtml', data)
    }

}

export default buyaskApi