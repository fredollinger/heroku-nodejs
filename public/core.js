function loadScript(thescript) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = thescript;
    script.onload = function(){
        document.body.appendChild(script);
    }
}
