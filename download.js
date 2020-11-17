function download(){
        let canvas = document.getElementById("c");
        let aiaiai = canvas.toDataURL("image/png");
        console.log(aiaiai)
        var input_message = document.getElementById("nameplease").value;
        console.log(input_message)
        let hate = '<a href="' + aiaiai + '" download="' + input_message + '.png">'+ input_message + ".png" +'</a>'
        console.log(hate);
        var element = document.getElementById("clear-canvas");
        element.insertAdjacentHTML('beforebegin', hate)
}