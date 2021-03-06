import { baseServer, importExcel,downloadServer } from '../utils/post-request'

class goodsApi {
    //获取货物列表
    static getList(data){
        return baseServer('/goods/list.shtml', data)
    }
    //保存货物
    static save(data){
        return baseServer('/goods/save.shtml', data)
    }
    //获取详情
    static getById(data){
        return baseServer('/goods/getById.shtml', data)
    }
    //删除
    static delByIds(data){
        return baseServer('/goods/delByIds.shtml', data)
    }
    //导出
    static exportExcel(data) {
        return downloadServer('/goods/exportExcel.shtml', data)
    }
    //下载模板
    static downLoadTemplate(data) {
        return downloadServer('/goods/downLoadTemplate.shtml', data)
    }
    //批量导入
    static importExcel(data) {
        return importExcel('goods/importExcel.shtml', data)
    }

    //货物列表（不分页）
    static noPageList(data){
        return baseServer('/goods/noPageList.shtml',data)
    }
}

export default goodsApi