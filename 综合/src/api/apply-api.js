import { baseServer } from '../utils/post-request'

class applyApi {
    //获取申请类型
    static getList(data){
        return baseServer('/apply/list.shtml', data)
    }
    //保存申请
    static save(data){
        return baseServer('/apply/save.shtml', data)
    }
    //根据申请类型查询规则中审批人和抄送人
    static getRulesUser(data){
        return baseServer('/apply/getRulesUser.shtml', data)
    }

}

export default applyApi