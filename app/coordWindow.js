var popup ;

/*
 * Dodanie obslugi zdarzenia zmiany do ukrytych divow ze wspolrzednymi 
 * i przepisanie ich do formatki 'Wspolrzedne'
 * @returns function obsluzZmiane
 */
 $(function() {   
    if (Uklady!==undefined){
        for (index = 0; index < Uklady.length; index++) {
             $('#'+Uklady[index][0]).bind('DOMSubtreeModified', function(event) {
              obsluzZmiane(event);
            });                
        }             
    }
});
function obsluzZmiane(event){
if (document.getElementById(event.target.id+'-inputEl') !==null){
   if (event.target.innerHTML.length > 0 ){ document.getElementById(event.target.id+'-inputEl').value = event.target.innerHTML;}
}};
/*
 * Tworzy okienko popup 
 * @returns {undefined}
 */
 function createPopup(){
       if (!popup || popup.isDestroyed) {
          popup = Ext.create('GeoExt.window.Popup', {
                title: 'Dane mapy',
                width: 250,
                html: "",
                collapsible: false,
                map: mapPanel.map
            });
        }
 }
/*
 * Dodanie popup dialog ze wspolrzednymi WGS
 * @param {latlon} loc
  */
function addToPopup(loc) {
    var locWGS =loc.clone().transform(new OpenLayers.Projection('EPSG:900913'),new OpenLayers.Projection("EPSG:4326"));
     createPopup();
        popup.add({
            xtype: "box",
            autoEl: {
                html: //"GoogleMaps: " + loc.lon.toFixed(2) + ", " + loc.lat.toFixed(2) + "<br/>"+
                      "WGS 84: " + locWGS.lon.toFixed(5) + ", " + locWGS.lat.toFixed(5) + "<br/>"
            }
        });
        popup.doLayout();
        popup.show();
    }
     /*
 * Dodanie popup dialog z tekstem
 * @param {text} String
  */
function addTxtToPopup(text) {
    
     createPopup(); 
        popup.add({
            xtype: "box",
            autoEl: {
                html: text
            }
        });
        popup.doLayout();
        popup.show();
    }

     /*
 * Dodanie popup dialog z numerem sekcji
 * @param {latlon} loc
  */
function addAttToPopup(layerName,Attrib) {
    
     createPopup(); 
        popup.add({
            xtype: "box",
            autoEl: {
                html: "Uklad: " + layerName + " sekcja: " + Attrib
            }
        });
        popup.doLayout();
        popup.show();
    }
/*
 * Dodanie markera do mapy
 * @param {lonlat} ll 
 */
function addMarker(ll) {
       var feature = new OpenLayers.Feature(znaczniki, ll); 
       var marker = feature.createMarker();
       marker.icon = icon;
       znaczniki.addMarker(marker);
       mapPanel.map.addLayer(znaczniki);
    };
	


function pokazOknoWspolrzedne() {
    /* Obsluga zmiany wartosci w formularzu ze wspolrzednymi
     * 
     * @param {type} field - pole w ktorym nastapila zmiana
     * @param {type} newValue - nowa wartosc
     * @param {type} oldValue- stara wartosc
     * @param {type} Projection - uklad wsporzednych w formacie "EPSG:900913"
     */
    function SetCenterAndTransform(field, newValue, oldValue, Projection){
         
        if (newValue.indexOf(',') > -1){
            var lonlatProjection =new OpenLayers.LonLat(newValue.split(','));
            var lonlatGoogle = lonlatProjection.clone().transform( new OpenLayers.Projection(Projection),new OpenLayers.Projection("EPSG:900913"));
            if (lonlatProjection.lon > 0 && lonlatProjection.lat > 0){
                var i = 0;
                for (i = 0; i < Uklady.length; ++i) { //przeliczenie pozostalych ukladow
                  var newProjection ="EPSG:"+Uklady[i][1];
                  if (Projection!==newProjection){
                          var lonlat = lonlatProjection.clone().transform( new OpenLayers.Projection(Projection),new OpenLayers.Projection(newProjection));
                          document.getElementById(Uklady[i][0]+'-inputEl').value = lonlat.lon.toFixed(5)+', '+lonlat.lat.toFixed(5);
                    }
                }
               addMarker(lonlatGoogle);
               mapPanel.map.setCenter(lonlatGoogle,mapPanel.map.zoom);
               mapPanel.map.addLayer(znaczniki);
            }
        }  
};
    var form = Ext.create('Ext.form.Panel', {
        layout: 'absolute',
		frame: true,
        defaultType: 'textfield',
		bodyStyle: 'padding:5px 5px 0',
		bodyPadding: 0,
	    defaults: {
			bodyPadding: 0
		},
        border: false,
		items: [ {
				xtype:'fieldset',
				columnWidth: 0.5,
				collapsible: false,
				bodyStyle: 'padding:5px 5px 0',
				defaultType: 'textfield',
				defaults: {anchor: '100%'},
				layout: 'anchor',
				//collapsible:false,
				//checkboxToggle: true,
				title: 'Kliknij klawisz "S" aby zatrzymać/uruchomić śledzenie!',
				items :[{
					fieldLabel: 'WGS 84',
					id: 'WGS84',
					fieldWidth: 80,
					x: 5,
					y: 5,
					name: 'WGS84',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:4326");
					} }
				}, {
					fieldLabel: 'GUGIK 80',
					id: 'GUGIK80',
					fieldWidth: 80,
					msgTarget: 'side',
					allowBlank: false,
					x: 5,
					y: 35,
					name: 'GUGIK80',
					anchor: '-5' ,
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:3328");
					} }
				},{
					fieldLabel: '1992',
					id: '1992',
					fieldWidth: 80,
					x: 5,
					y: 65,
					name: '1992',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2180");
					} }
				}, {
					fieldLabel: '2000 strefa V',
					id: '2000v',
					fieldWidth: 80,
					x: 5,
					y: 95,
					name: '2000v',
					anchor: '-5' ,
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2176");
					} }
				}, {
					fieldLabel: '2000 strefa VI',
					id: '2000vi',
					fieldWidth: 80,
					x: 5,
					y: 125,
					name: '2000vi',
					anchor: '-5'  ,
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2177");
					} }
				}, {
					fieldLabel: '2000 strefa VII',
					id: '2000vii',
					fieldWidth: 80,
					x: 5,
					y: 155,
					name: '2000vii',
					anchor: '-5'  ,
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2178");
					} }
				}, {
					fieldLabel: '2000 strefa VIII',
					id: '2000viii',
					fieldWidth: 80,
					x: 5,
					y: 185,
					name: '2000viii',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2179");
					} }
				}, {
					fieldLabel: '1965 strefa 1',
					id: '19651',
					fieldWidth: 80,
					x: 5,
					y: 215,
					name: '19651',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:3120");
					} }
				}, {
					fieldLabel: '1965 strefa 2',
					id: '19652',
					fieldWidth: 80,
					x: 5,
					y: 245,
					name: '19652',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2172");
					} } 
				}, {
					fieldLabel: '1965 strefa 3',
					id: '19653',
					fieldWidth: 80,
					x: 5,
					y: 275,
					name: '19653',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2173");
					} }
				}, {
					fieldLabel: '1965 strefa 4',
					id: '19654',
					fieldWidth: 80,
					x: 5,
					y: 305,
					name: '19654',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2174");
					} }
				}, {
					fieldLabel: '1965 strefa 5',
					id: '19655',
					fieldWidth: 80,
					x: 5,
					y: 335,
					name: '19655',
					anchor: '-5',
					listeners: { change:    function(field, newValue, oldValue){
							  SetCenterAndTransform(field, newValue, oldValue,"EPSG:2175");
					} }
				}, {
					fieldLabel: 'EPSG:900913',
					id: '900913',
					fieldWidth: 80,
					msgTarget: 'side',
					allowBlank: false,
					x: 5,
					y: 365,
					name: '900913',
					anchor: '-5' ,
					listeners: { change:    function(field, newValue, oldValue){
						 SetCenterAndTransform(field, newValue, oldValue,"EPSG:900913");
					} }
				}]
			}]
    });

    var win = Ext.create('Ext.window.Window', {
        autoShow: true,
        title: 'Współrzędne',
        width: 350,
        height: 430,
        minWidth: 300,
        minHeight: 200,
        layout: 'fit',
        plain:true,
        items: form
    });

    return win;
    
};