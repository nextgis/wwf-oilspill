define(["leaflet"], function(L){

    L.Control.FilterPeriod = L.Control.extend({
        options: {
            position: "bottomleft"
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'filter-list');
		
		// ... initialize other DOM elements, add listeners, etc.
		    container.innerHTML = 
            '<label>Квартал: '+
                '<select name="filters">'+
                '<option selected>Все</option>'+
                    '<option>2017-Q3</option>'+
                    '<option>2017-Q4</option>'+
                '</select>'+
            '</label>'
            ;
		    L.DomEvent.on(container.firstChild.firstElementChild, 'change', function(e) {
                var filter = this.value;
                map.filters.period = filter;
                map.eachLayer(function(layer){
                    if (layer.feature) {
                        if ((layer.feature.properties.name == map.filters.company || map.filters.company == 'Все') && (layer.feature.properties.date == map.filters.period || map.filters.period == 'Все') && (layer.feature.properties.region == map.filters.region || map.filters.region == 'Все')) {
                            layer.getElement().style.display = 'block';
                        } else {
                            layer.getElement().style.display = 'none';
                        };
                    };
                });
		    });
            return container;
        }
    });
    return L.Control.FilterPeriod;
});