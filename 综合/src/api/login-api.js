import { baseServer } from '../utils/post-request'

class LoginApi {
    // 登录
    static login(data) {
        return baseServer('/user/login.json', data)
    }
    // 登出
    static logout() {
        return baseServer('/user/logout.json')
    }
}

export default LoginApi