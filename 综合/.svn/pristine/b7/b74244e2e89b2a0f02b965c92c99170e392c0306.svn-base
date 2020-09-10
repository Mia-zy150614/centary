import { baseServer } from '../utils/post-request'

class ApprovalRuleApi {
    //获取审批规则详情
    static getApprovalRulesData(data) {
        return baseServer('/approval/getTree.shtml', data)
    }

    //获取审批规则列表
    static getAllApprovalRules(data) {
        return baseServer('/approval/getAllApprovalRules.shtml', data)
    }

    //保存审批规则
    static saveTree(data) {
        return baseServer('/approval/saveTree.shtml', data)
    }

    //检查审批规则
    static checkApproval(data) {
        return baseServer('/approval/checkApproval.shtml', data)
    }

    //修改审批状态（启用禁用）
    static updateApprovalRulesStatu(data) {
        return baseServer('/approval/updateApprovalRulesStatu.shtml', data)
    }

    //获取审批类型
    static getApprovalRules(data) {
        return baseServer('/approval/getApprovalType.shtml', data)
    }
}

export default ApprovalRuleApi
