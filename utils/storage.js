async function storageSet(key, data) {
    return new Promise(resolve => {
        chrome.storage.local.set({ [key]: data }, () => {
            resolve()
        })
    })
}

async function storageGet(key) {
    return new Promise(resolve => {
        chrome.storage.local.get([key], result => {
            resolve(result[key])
        })
    })
}

function storageClear() {
    chrome.storage.local.clear()
}

