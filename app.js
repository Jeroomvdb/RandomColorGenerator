async function IncludeJavascript(filename){
    var script = await document.createElement('script');
    // <script src=""
    script.src = await filename;
    return new Promise((resolve,reject)=>{
        script.onload = ()=>{
            resolve()
        }
        document.body.appendChild(script);
    })
}

IncludeJavascript('JS/changeColorMouseMove.js')
IncludeJavascript('JS/dailyColor.js')
IncludeJavascript('JS/alertBackground.js')
IncludeJavascript('JS/storeLocalStorage.js')
IncludeJavascript('JS/updateYourColor.js')




window.onload = ()=>{ // html event
    
    
    console.log(message)
    console.log(GetName('John Doe'))
    console.log(colors)






    // 
}