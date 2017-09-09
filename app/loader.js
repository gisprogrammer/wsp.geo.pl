
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        GeoExt: "./external/geoext2-2.1.0/src/GeoExt",
        Ext: "./external/ext-4.2.1.883/src"  
    }
});
Ext.require([   
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
	'Ext.tree.plugin.TreeViewDragDrop',
    'Ext.ux.grid.DynamicGrid',
    'Ext.form.*',
	'Ext.form.ComboBox',
    'Ext.layout.container.Absolute',
    'Ext.window.Window',
	'Ext.window.MessageBox',
    'GeoExt.Action',		
	'GeoExt.panel.Map',
	'GeoExt.tree.Panel',
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.tree.View',
    'GeoExt.tree.Column',
    'GeoExt.form.field.GeocoderComboBox',
	'GeoExt.data.LayerTreeModel',
	'GeoExt.data.ScaleStore',
	'GeoExt.slider.Zoom',
    'GeoExt.slider.Tip',
    'GeoExt.form.field.GeocoderComboBox',
    'GeoExt.OverviewMap'    
]);   
  
//zmienne globalne   
var znaczniki = new OpenLayers.Layer.Markers("Znacznik");
var vector = new OpenLayers.Layer.Vector("vector");
var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('img/markers/information_highlights.png', size, offset);
var mapPanel, tree, slider;
var GWC_url ="http://10.0.31.216/wspolrzedne.tk/Dane/";
var maxExtent = new OpenLayers.Bounds(-20037508, -20037508,20037508, 20037508.34);
var GWCRamki = new OpenLayers.Layer.GeoWebCache({text:"Ramki",name:"Ramki",
    url: GWC_url +'DBR_ramki_all'
    ,maxExtent: maxExtent
    ,transparent: true,buffer: 1, isBaseLayer: false, visibility: false ,tiled : true
});        

var gphy = new OpenLayers.Layer.Google("Google satellite" , {type: "satellite", sphericalMercator: true});
var warstwyPublczne = [ new OpenLayers.Layer.OSM(),   new OpenLayers.Layer.Google("Google Maps"),gphy];
var warstwyRamki = [ GWCRamki];
var MousePosition ; 
var Uklady = [["900913","900913"],["WGS84","4326"],[ "1992","2180"],["GUGIK80","3328"],["2000v","2176"],["2000vi","2177"],["2000vii","2178"],["2000viii","2179"],["19651","3120"],["19652","2172"],["19653","2173"],["19654","2174"],["19655","2175"]];

var map = new OpenLayers.Map({allOverlays: false,
    projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:900913"),
    controls: [new OpenLayers.Control.Navigation()],
    maxResolution: 0.703125,
    zoomMethod: null
});
var frmWspolrzedne = null;
var frmAbout = null;
var PointControl, area, length;
var popup;		
var ctrl, toolbarItems = [], action, actions = {};
var toggleGroup = "Narzedzia"; 
var overview;
            

            