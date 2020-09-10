import { baseServer } from '../utils/post-request'

class DeptApi {
    // 获取单位树
    static getAllDeptTree(data) {
        return baseServer('/dept/getAllDeptTree.shtml', data)
    }
    //保存
    static save(data) {
        return baseServer('/dept/save.shtml', data)
    }
    //校验重复
    static checkUnique(data) {
        return baseServer('/dept/checkUnique.shtml', data)
    }
    //删除
    static deleteDeptByIds(data) {
        return baseServer('/dept/deleteDeptByIds.shtml', data)
    }
    //查询详情
    static getById(data) {
        return baseServer('/dept/getById.shtml', data)
    }

}

export default DeptApi