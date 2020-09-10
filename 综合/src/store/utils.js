/* 过滤菜单 */

export const permission = async subSystems => {
    if (!Array.isArray(subSystems)) return

    const permissionMenus = {}
    subSystems.forEach(system => {
        permissionMenus[system.url] = system
    })

    console.log(permissionMenus)
    return permissionMenus
}