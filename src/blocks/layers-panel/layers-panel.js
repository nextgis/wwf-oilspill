// Layers panel

function LayersPanel(options) {
    var elem;

    function getElem() {
        if (!elem) render();
        return elem;
    }

    function render() {    
        elem = document.createElement('div');

        for(var i=0; i < options.layersGroup.length; i++){
            var html = options.groupTemplate({title: options.layersGroup[i].label, index: i}),
                layers = options.layersGroup[i].children.filter(function(item) {
                    return item.type == "layer";
                }),
                layersCont;
            elem.insertAdjacentHTML("beforeEnd", html);
            layersCont = elem.querySelectorAll(".layers-group__layers")[elem.querySelectorAll(".layers-group__layers").length - 1];

            var layersList = new LayersList({
                layers: layers,
                template:  Handlebars.compile(document.getElementById('layers-list-template').innerHTML)
            });
            layersCont.appendChild(layersList.getElem());
        }
    }

    this.getElem = getElem;
}