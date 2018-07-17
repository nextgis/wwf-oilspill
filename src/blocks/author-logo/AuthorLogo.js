define(["leaflet"], function(L){

    L.Control.AuthorLogo = L.Control.extend({
        options: {
            position: "bottomright"
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

