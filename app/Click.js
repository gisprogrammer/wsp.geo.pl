/*
 * Obs³uga klikniecia na mapie
 */
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                

    defaultHandlerOptions: {
        single: true,
        double: false,
        pixelTolerance: 0,
        stopSingle: true
    },

    initialize: function(options) {

        this.handlerOptions = OpenLayers.Util.extend(
            options && options.handlerOptions || {}, 
            this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, 
            {
                click: this.trigger
            }, 
            this.handlerOptions
        );
    },
    
    CLASS_NAME: "OpenLayers.Control.Click"

});

