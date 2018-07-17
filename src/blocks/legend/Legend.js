define(["leaflet"], function(L){

    L.Control.Legend = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        onAdd: function () {
            return this.options.elem;
        }
    });

    return L.Control.InfoPanel;
});

