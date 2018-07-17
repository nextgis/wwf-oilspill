define(["jquery", "leaflet", "handlebars"], function($, L, Handlebars){

    L.Control.InfoPanel = L.Control.extend({
        options: {
            position: "topright"
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
            this.template = Handlebars.compile(document.getElementById('info-panel-template').innerHTML);
        },
        onAdd: function () {
            var that = this;

            that.container =  L.DomUtil.create('div', 'info-panel'),
            that.closer = L.DomUtil.create('a', 'info-panel__close material-icons', that.container),
            that.inner = L.DomUtil.create('div', 'info-panel__inner', that.container);

            that.closer.innerHTML = "close";
            that.closer.setAttribute("href","#");

            $(that.container).on("mousewheel mousedown mousemove mouseup click", function(e){
                e.stopPropagation();
            })

            $(that.closer).on("click", function(e){
                e.preventDefault();
                that.hide();
            });

            $(window).on("resize", function(){
                that.checkOverflowing();
            })

            L.DomEvent.disableScrollPropagation(that.container);
            return that.container;
        },
        show: function(props, fieldNames){
            var propsAliased = {},
                html;

            $.each(props, function(key, value) {
                var apiField = $.grep(fieldNames, function(n, i){ return n.keyname == key; })[0];

                if (key != "name" && key!="lat" && key!="lon" && value){
                    propsAliased[apiField.display_name] = value;
                }
            });

            html = this.template({
                title: props.name,
                link: props.link,
                location: props.location,
                status: props.startdate,
                properties: propsAliased
            });
            $(this.container).find(".info-panel__inner").html(html);
                
            this.checkOverflowing();                   
            this.inner.scrollTop = 0;

            $(this.container).addClass("active");
        },
        hide: function(){
            $(this.container).removeClass("active");
        },
        checkOverflowing: function(){
            var that = this;

            setTimeout(function(){
                if (that.inner.offsetHeight < that.inner.scrollHeight ||
                    that.inner.offsetWidth < that.inner.scrollWidth) {
                    var scrollWidth = that.inner.offsetWidth - that.inner.clientWidth;
                    that.closer.style.right = scrollWidth + 5 + "px";
                } else {
                    $(that.container).removeClass("overflowed");
                }           
            }, 100);
        }   

    });

    return L.Control.InfoPanel;
});

