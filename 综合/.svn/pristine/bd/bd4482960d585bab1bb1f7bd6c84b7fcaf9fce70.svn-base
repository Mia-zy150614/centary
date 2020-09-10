import { baseServer, downloadServer } from '../utils/post-request'

class ManagementApi {
    static list(data) { return baseServer('/operatelog/list.shtml', data) }
    static queryAllModule(data) { return baseServer('/operatelog/queryAllModule.shtml', data) }
    static queryAllSystem(data) { return baseServer('/operatelog/queryAllSystem.shtml', data) }
    static exportExcel(data) { return downloadServer('/operatelog/exportExcel.shtml', data) }
    static getTodayOperation(data) { return baseServer('/operatelog/getTodayOperation.shtml', data) }
}

export default ManagementApi