
export const subsystemlist = state => {
    const { userStore: { subSystems } } = state, arr = []
    Object.keys(subSystems).forEach(key => {
        arr.push(subSystems[key])
    })
    return arr
}

export const basepath = state => state.basepath
export const subsystemName = state => {
    const { userStore: { subSystems }, basepath } = state
    return subSystems[basepath]['name']
}
export const userId = state => {
    return state.userStore.user.id;
}

export const token = state => state.userStore.token