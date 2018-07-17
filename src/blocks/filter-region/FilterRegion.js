define(["leaflet"], function(L){

    L.Control.FilterRegion = L.Control.extend({
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
            '<label>Регион: '+
                '<select name="filters">'+
                    '<option selected>Все</option>'+                    
                    '<option>Волгоградская область</option>'+
                    '<option>Республика Коми</option>'+
                    '<option>Краснодарский край</option>'+
                    '<option>Нижегородская область</option>'+                                     
                    '<option>Оренбургская область</option>'+
                    '<option>Пермский край</option>'+
                    '<option>Рязанская область</option>'+
                    '<option>Саратовская область</option>'+
                    '<option>Самарская область</option>'+
                    '<option>Сахалинская область</option>'+
                    '<option>ХМАО-Югра</option>'+
                    '<option>ЯНАО</option>'+                    
                '</select>'+
            '</label>'
            ;
		    L.DomEvent.on(container.firstChild.firstElementChild, 'change', function(e) {
                var filter = this.value;
                map.filters.region = filter;
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
    return L.Control.FilterRegion;
});