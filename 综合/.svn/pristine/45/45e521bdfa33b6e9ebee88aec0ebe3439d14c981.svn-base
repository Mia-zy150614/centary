/*角色树菜单过滤 重组数据结构*/

export const filter_role_menus = (allMenus, selsectedMenus, disabled = false) => {
    /**
     * @ allMenus 角色树
     * @ selectedMenus 当前角色选中的权限id
     * @ disabled 在详情页是禁止编辑
     * */
    let selectedMenusList = [], allId = [], allSelected = false, subSystem = [];
    if (allMenus && allMenus.length) {
        // 编辑和详情
        if (selsectedMenus) {
            for (let i in selsectedMenus) {
                let arr = selsectedMenus[i].split(',')
                selectedMenusList.push([...arr])
            }
        }
        allMenus.forEach((item, index) => {
            allId = filter_roleItem_menuId(item.tree, [])
            item.tree = tree_item_isdisabled(item.tree, disabled)
            // 判断选中 rolemenuId 和 所有rolemenuId 进行对比
            if (allId.length && selectedMenusList[index] && selectedMenusList[index].length) {
                if (selectedMenusList[index].length >= allId.length) {
                    allSelected = true
                    subSystem.push({ ...item, allSelected, allId, selectedMenusList: selectedMenusList[index] })
                } else {
                    allSelected = false
                    subSystem.push({ ...item, allSelected, allId, selectedMenusList: selectedMenusList[index] })
                }
            } else {
                allSelected = false
                subSystem.push({ ...item, allSelected, allId, selectedMenusList: [] })
            }

        })
        return subSystem
    } else {
        return allMenus
    }
}

// 过滤 角色tree 所有 id
const filter_roleItem_menuId = (tree, idlist) => {
    tree.forEach(item => {
        idlist.push(item.id)
        if (item.children && item.children.length) {
            filter_roleItem_menuId(item.children, idlist)
        }
    })
    return idlist
}

// 组装 tree 是否 disabled

const tree_item_isdisabled = (tree, disabled) => {
    tree.forEach(item => {
        item.disabled = disabled
        if (item.children && item.children.length) {
            tree_item_isdisabled(item.children, disabled)
        }
    })
    return tree
}

// 过滤 角色 菜单和button权限

export const filter_save_role_promisseId = checkedNodes => {
    let menuIds = [], buttonIds = [];
    if (checkedNodes && checkedNodes.length) {
        checkedNodes.forEach(item => {
            let checkedNodes = item.getCheckedNodes(false, true);
            if (checkedNodes.length) {
                checkedNodes.forEach(node => {
                    node.type === 1 ? menuIds.push(node.id) : buttonIds.push(node.id)
                })
            }
        })
    }
    return { menuIds, buttonIds }
}

