// Layers list

function LayersList(options) {
    var elem;

    function getElem() {
        if (!elem) render();
        return elem;
    }

    function render() {    
        elem = document.createElement('div');
        var html = options.template({layers: options.layers});
        elem.insertAdjacentHTML("beforeEnd", html);

        elem.onchange = function(event) {
            if (event.target.checked){
                console.log("Show layer " + event.target.value);
            } else {
                console.log("Hide layer " + event.target.value);
            }
        }
    }

    this.getElem = getElem;
}