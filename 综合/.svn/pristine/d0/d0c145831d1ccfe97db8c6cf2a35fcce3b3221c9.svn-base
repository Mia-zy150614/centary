import { baseServer } from '../utils/post-request'

class UserApi {
    // 用户列表
    static list(data) {
        return baseServer('/user/userlist.shtml', data)
    }
    //保存用户信息
    static saveUser(data) {
        return baseServer('/user/saveUser.shtml', data)
    }
    //获取用户信息
    static getUserInfoById(userId) {
        return baseServer('/user/getUserInfoById.shtml', { userId: userId })
    }
    //删除用户信息
    static deleteUserById(userIds) {
        return baseServer('/user/deleteUserByIds.shtml', { userIds: userIds })
    }
    //初始化密码
    static initUserPasswordByIds(data) {
        return baseServer('/user/initUserPasswordByIds.shtml', data)
    }
    static checkUnique(data) {
        return baseServer('/user/checkUnique.shtml', data)
    }
    //查询当前用户信息
    static getUserInfo(data) {
        return baseServer('/user/getUserInfo.shtml', data)
    }
    //校验旧密码是否正确
    static checkOldPassword(data) {
        return baseServer('/user/checkOldPassword.shtml', data)
    }
    //update用户密码
    static editUserPassword(data) {
        return baseServer('/user/editUserPassword.shtml', data)
    }
    //获取用户所有信息
    static getCurrentUserAllInfo(data) {
        return baseServer('/user/getCurrentUserAllInfo.shtml', data)
    }
    //获取所有的数据范围类型
    static getRangeOptions(data) {
        return baseServer('/user/getRangeOptions.shtml', data)
    }
    //获取用户集合
    static getUserNameAndLocation(data) {
        return baseServer('/user/getUserNameAndLocation.shtml', data)
    }
    //获取最大用户编号
    static getUserNameMax(data) {
        return baseServer('/user/getUserNameMax.shtml', data)
    }
    //获取用户信息
    static getUserInfoByDeptId(data) {
        return baseServer('/user/getUserInfoByDeptId.shtml', data)
    }
    //获取用户资料
    static getUserDetailInfo(data) {
        return baseServer('/userInfo/getUserInfo.shtml',data)
    }
    //保存用户资料
    static saveUserDetailInfo(data) {
        return baseServer('/userInfo/save',data)
    }
}

export default UserApi