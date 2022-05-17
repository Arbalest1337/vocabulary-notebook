const button = document.getElementById('button')
button.onclick = () => {
    chrome.tabs.create({
        url: '../list/index.html'
    })
}
