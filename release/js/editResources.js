window.Editor = 
{
    remove: (type, value) => 
    {
        let message = JSON.stringify(
            {
                action: "remove",
                deleter: type,
                value: value
            }
        );
        
        window.sock.send(message);
        window.SocketLog.log(message)

        setTimeout(()=>{
            updateEditor($('#edit-select').val())
        }, 300)
    },
    add: (type, value) => 
    {
        let message = JSON.stringify(
            {
                action: "set",
                setter: type,
                value: value
            }
        );
        
        window.sock.send(message);
        window.SocketLog.log(message);

        setTimeout(()=>{
            updateEditor($('#edit-select').val())
        }, 300)
    }
} 

$('#edit-select').on('change', (e)=>{
    updateEditor(e.target.value)
})

window.updateEditor = (selectorValue) => 
{
    switch (selectorValue.toLowerCase())
    {
        case 'drophashtagifincludes':
            data = macros.resources.dropHashtagIfIncludes;
            break;
    
        case 'dropphrase':
            data = macros.resources.DropPhrases;
            break;    

        case 'hashtag':
            data = macros.resources.HashTags;
            break;      
        
        default:
            break;
    }
    
    $('#editor-anchor').html("");

    let buffer = "<div class=\"w3-bar-block\">";

    for (let item of data){
        buffer += `
        <div class="w3-bar-item">
            <button onclick="window.Editor.remove('${selectorValue}', '${item}');updateEditor($('#edit-select').val());" class="w3-button w3-red">✕</button> <span>${item}</span>
        </div>`
    }
    buffer += `
    <div class="w3-bar">
        <div class="w3-bar-item">
            <input id="editor-value" class="w3-input w3-animate-input" placeholder="Enter a value...">
        </div>
        <div class="w3-bar-item">
            <button id="editor-add-submit" class="w3-green w3-button">+</button>
        </div>
    </div>
    `
    $("#editor-anchor").append(buffer + "</div>");
    $("#editor-add-submit").on('click', ()=>
    {
        let newVal = $('#editor-value').val();
        if (newVal.length > 2){
            window.Editor.add(selectorValue, newVal);
            updateEditor($('#edit-select').val());
        }
        else{
            window.notify("Value too small!")
        }
    })
}