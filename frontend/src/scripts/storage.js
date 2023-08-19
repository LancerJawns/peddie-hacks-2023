import RNSInfo from "react-native-sensitive-info"

const getAll = async () => {
    const allItems = await RNSInfo.getAllItems({        
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
    })
    
    return allItems[0]
}

const hasItem = async (itemKey) => {
    const allItems = await getAll()

    return allItems.some((item => item.key == itemKey))
}

const getItem = async (itemKey) => {
    const item = await RNSInfo.getItem(itemKey, {        
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
    })

    return item
}

const setItem = async (itemKey, itemValue) => {
    await RNSInfo.setItem(itemKey, itemValue, {        
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
    })

    return
}

export {
    hasItem,
    getItem,
    setItem
}