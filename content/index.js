



function recordVocabulary(text) {
    console.log(text)
}

function createButton(text) {
    const el = document.createElement('span')
    el.className = 'record-vocabulary-button'
    el.innerHTML = 'add'
    el.onclick = e => {
        e.stopPropagation()
        recordVocabulary(text)
    }

    return el
}

const targetNode = document.body
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const newNode = mutation.target
            if(newNode.className.includes('jfk-bubble gtx-bubble')){
                console.log('translate')
                // getContent()
            }
        }
    }
};
  
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

function getContent(){
    const contents = document.getElementsByClassName('gtx-body') 
    const originText = contents[0].innerHTML
    const translatedText = contents[1].innerHTML
    console.log(originText,translatedText)
}