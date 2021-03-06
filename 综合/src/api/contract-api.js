import { baseServer,importExcel } from '../utils/post-request'

class ContractApi {
    // 保存合同模板
    static save(data) {
        return baseServer('/contract/save.shtml', data)
    }
    // 合同模板列表
    static list(data) {
        return baseServer('/contract/list.shtml', data)
    }
    //删除模板合同
    static delete(data) {
        return baseServer('/contract/delete.shtml',data)
    }
    //检查合同模板类型
    static checkType(data) {
        return baseServer('/contract/checkType.shtml',data)
    }
    //获取合同模板信息
    static findById(data) {
        return baseServer('/contract/findById.shtml',data)
    }
    //获取合同模板（无分页）
    static listNoPage(data) {
        return baseServer('/contract/listNoPage.shtml',data)
    }
    //导入word文档
    static importWord(data) {
        return importExcel('/contract/importWord.shtml',data)
    }
    //保存合同
    static saveContract(data) {
        return baseServer('/officeContract/save.shtml',data)
    }
    //获取合同列表
    static listContract(data) {
        return baseServer('/officeContract/list.shtml',data)
    }
    //获取合同详情
    static findByIdContract(data) {
        return baseServer('/officeContract/findById.shtml',data)
    }
}

export default ContractApi