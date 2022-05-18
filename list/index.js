const container = document.getElementById('list')

async function refresh(newValue) {
    const list = (newValue ?? (await storageGet('vocabularies'))) || []
    const splitByDate = {}
    list.reverse().forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('zh-CN').replace(/\//g, '.')
        if (!splitByDate[date]) {
            splitByDate[date] = []
        }
        splitByDate[date].push({ ...item, date })
    })

    let nodesStr = ``
    for (let key in splitByDate) {
        let vocabulariesStr = ``
        for (let item of splitByDate[key]) {
            let allMeans = item.translated
            for (let mean of item.otherMeans) {
                allMeans += `\n\n${mean.type}: ${mean.value}`
            }
            vocabulariesStr += `<span class="vocab" title="${allMeans}">${item.original}</span>`
        }
        nodesStr += `<div class="time-block" data-date="${key}">${vocabulariesStr}</div>`
    }
    container.innerHTML = nodesStr
}

refresh()

// auto update
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
        refresh(changes.vocabularies.newValue)
    }
})
