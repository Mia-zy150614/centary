import { baseServer, importExcel,downloadServer } from '../utils/post-request'

class goodscacheApi {
    //获取缓存列表 参数（cacheId）
    static getList(data){
        return baseServer('/goodsCache/getGoodsCacheList.shtml', data)
    }
    //缓存保存 参数(datas)
    static save(data){
        return baseServer('/goodsCache/save.shtml', data)
    }
    //删除缓存 参数(ids)
    static delByIds(data){
        return baseServer('/goodsCache/delByIds.shtml', data)
    }
    // 删除cacheId 缓存
    static delByCacheId(data){
        return baseServer('/goodsCache/delByCacheId.shtml', data)
    }

}

export default goodscacheApi