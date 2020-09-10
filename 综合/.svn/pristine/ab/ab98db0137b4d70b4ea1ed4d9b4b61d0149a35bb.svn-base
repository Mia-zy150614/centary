import { baseServer } from '../utils/post-request'

class RoleApi {
    // 角色列表
    static list(data) {
        return baseServer('/role/rolelist.shtml', data)
    }
    //保存角色信息
    static saveRole(data) {
        return baseServer('/role/save.shtml', data)
    }
    //获取角色权限信息
    static getRolePrivilegeById(roleId) {
        return baseServer('/role/getRolePrivilegeById.shtml', { roleId: roleId })
    }
    //角色删除
    static deleteRoleByIds(roleIds) {
        return baseServer('/role/deleteRoleByIds.shtml', { roleIds: roleIds })
    }
    //获取角色子系统可操作的信息
    static getSubSystemMenuButtonByUserId(roleId, roleType) {
        return baseServer('/role/getMenuButtonByUserId.shtml', { roleId: roleId, roleType: roleType })
    }

    static getRoleByCreateUserId(data) {
        return baseServer('/role/getRoleByCreateUserId.shtml', data)
    }
}

export default RoleApi