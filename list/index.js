const container = document.getElementById('list')
async function refresh() {
    let list = await storageGet('vocabularies')
    const result = []
    list.reverse().forEach(item => {
        
    });
    
    container.innerHTML = `<div class="time-block" data-date="2022.5.17">
    <span class="vocab" title="中文23">ok</span>
</div>`
}
refresh()