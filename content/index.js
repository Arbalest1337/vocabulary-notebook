'use strict';

const config = { attributes: false, childList: true, subtree: false }
const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        const [newNode, ...other] = mutation.addedNodes
        if (newNode?.className.includes('jfk-bubble gtx-bubble')) {
            newNode.appendChild(createButton())
        }
    }
}
const observer = new MutationObserver(callback)
observer.observe(document.body, config)

function createButton() {
    const button = document.createElement('span')
    button.className = 'record-vocabulary-button'
    button.innerHTML = 'add'
    button.onclick = e => {
        e.stopPropagation()
        doRecord()
        button.style.display = 'none'
    }
    return button
}

async function doRecord() {
    const detail = getContent()
    const { timestamp, original, originalLanguage } = detail
    const result = {
        id: `${timestamp}-${original}`,
        hidden: false,
        ...detail
    }
    const vocabularies = (await storageGet('vocabularies')) || []
    storageSet('vocabularies', [...vocabularies, result])
}

function getContent() {
    const container = document.getElementById('gtx-host')
    // openOrClosedShadowRoot is available only to WebExtensions.
    const shadowRoot = chrome.dom.openOrClosedShadowRoot(container)
    const targetNode = shadowRoot.childNodes[1]
    const languageNodes = targetNode.getElementsByClassName('gtx-language')
    const selectedIndex = languageNodes[0].childNodes[0].selectedIndex
    const contentNodes = targetNode.getElementsByClassName('gtx-body')
    const MeansNodes = [...targetNode.getElementsByTagName('tr')].map(item => ({
        type: item.childNodes[0].children[0].innerHTML,
        value: item.childNodes[1].innerHTML
    }))

    return {
        timestamp: new Date().getTime(),
        originalLanguage: languageNodes[0].childNodes[0].childNodes[selectedIndex].innerHTML,
        original: contentNodes[0].innerHTML,
        translatedLanguage: languageNodes[1].innerHTML,
        translated: contentNodes[1].innerHTML,
        otherMeans: MeansNodes
    }
}
