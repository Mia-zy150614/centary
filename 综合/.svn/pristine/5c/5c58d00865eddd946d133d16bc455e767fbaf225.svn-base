import { baseServer,downloadServer} from '../utils/post-request'

class quotationApi {
    //获取报价单列表
    static getList(data){
        return baseServer('/quotation/list.shtml', data)
    }
    //保存报价单
    static save(data){
        return baseServer('/quotation/save.shtml', data)
    }
    //查询报价单详情
    static findById(data){
        return baseServer('/quotation/findById.shtml', data)
    }
    //删除报价单
    static delete(data){
        return baseServer('/quotation/delete.shtml', data)
    }
    //导出
    static exportExcel(data){
        return downloadServer('/quotation/exportExcel.shtml', data)
    }
}

export default quotationApi