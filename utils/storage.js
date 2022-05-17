async function storageSet(key, data) {
    return new Promise(resolve => {
        chrome.storage.sync.set({ [key]: data }, () => {
            resolve()
        })
    })
}

async function storageGet(key) {
    return new Promise(resolve => {
        chrome.storage.sync.get([key], result => {
            resolve(result[key])
        })
    })
}

function storageClear() {
    chrome.storage.sync.clear()
}

