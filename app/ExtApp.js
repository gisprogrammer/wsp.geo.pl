
Ext.application({
    name: 'www.wspolrzedne.tk',
    launch: function () {
        frmWspolrzedne = pokazOknoWspolrzedne();
		frmAbout = pokazOknoAbout();
		frmWspolrzedne.hide();
		frmAbout.hide();
        var locationLayer = new OpenLayers.Layer.Vector("Location"); // do wyszukiwania w intenecie
        mapPanel = Ext.create('GeoExt.panel.Map', {
            region: "center",
            map: map,
            center: [2100000, 6750000],
            zoom: 7,
            extent: maxExtent,
            items: [{
                    xtype: "gx_zoomslider",
                    vertical: true,
                    height: 150,
                    x: 10, y: 20,
                    plugins: Ext.create('GeoExt.SliderTip', {
                        getText: function (thumb) {
                            var slider = thumb.slider;
                            var out = '<div>Poziom: {0}</div>' +
                                    '<div>Rozdzielczość: {1}</div>' +
                                    '<div>Skala: 1 : {2}</div>';
                            return Ext.String.format(out, slider.getZoom(), slider.getResolution(), slider.getScale());
                        }
                    })
                }],
               tbar:toolbarItems
        });


        
        //Dodawanie warstw  do mapy
		try{
			mapPanel.layers.add(warstwyPublczne);
			mapPanel.layers.add(warstwyRamki);
		}
		catch(err) {
			alert(err.message);
		}
        

        var store = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [
                    {
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        leaf: false,
                        text: "Mapy tła"
                    }, {
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true,
                        text: "Dane"
                    }
                ]
            }

        });

        tree = Ext.create('GeoExt.tree.Panel', {
            border: true,
            region: "west",
            title: "Warstwy",
            width: 200,
            split: false,
            collapsible: false,
            collapseMode: "mini",
            autoScroll: true,
            store: store,
            rootVisible: false,
            lines: true,
            listeners: {
                itemclick: function (me, record, item, index, e, eOpts) {
                    var check = record.data.checked;
                    record.cascadeBy(function (n) {
                        n.set('checked', !check);
                    });
                }
            }
        });
		overview = Ext.create('GeoExt.OverviewMap', {
            map: mapPanel.map,
            dynamic: true,
            autoShow: true,
            width: 300,
            height: 200,
            floating: true,
            border: 1,
            style: {
                borderStyle: 'none'
            },
            resizable: {
                preserveRatio: true,
                heightIncrement: 0,
                widthIncrement: 0,
                handles: 'ne'
            }
        });

        var Viewport = Ext.create('Ext.Viewport', {
            layout: "fit",
            hideBorders: true,
            items: {
                layout: "border",
                deferredRender: false,
                items: [mapPanel, tree]
            }});
		var vOffset = -25 - overview.getHeight();
        var position = overview.getAlignToXY(Viewport, 'bl', [225, vOffset]);
        overview.setPosition(position);
		

    }
});
Ext.onReady(function() {
        //Dodanie obslugi wyswietlania wspolrzednych przy szuraniu mysza 
        for (index = 0; index < Uklady.length; ++index) {
            var mousePositionCtrl = mapPanel.map.addControl(new OpenLayers.Control.MousePosition({
                div: document.getElementById('' + Uklady[index][0]),
                displayProjection: new OpenLayers.Projection('EPSG:' + Uklady[index][1])
            }));
			
        }
	// Measure control, a "button" control
	length = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
			eventListeners: {
				measure: function(evt) {
					//addTxtToPopup szukaj w pliku coordWindow.js
					addTxtToPopup("Długość: " + evt.measure + ' ' +evt.units);
				}
			}
		});
	length.geodesic= true;
	area = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			eventListeners: {
				measure: function(evt) {
				    //addTxtToPopup szukaj w pliku coordWindow.js
					addTxtToPopup("Powierzchnia: " + evt.measure + ' ' +evt.units);
				}
			}
	});
	area.geodesic= true;
	PointControl = new OpenLayers.Control.Click({
        trigger: function(evt) {
            var loc = mapPanel.map.getLonLatFromViewPortPx(evt.xy);
            addMarker (loc); // addMarker szukaj w pliku coordWindow.js
            addToPopup(loc); // addToPopup szukaj w pliku coordWindow.js
        }
    });
	mapPanel.map.addControl(PointControl);
	mapPanel.map.addControl(length);
	mapPanel.map.addControl(area);
	//obsługa skrótów klawiaturowych
   var KeyMap = new Ext.KeyMap(document.body, [
    {
        key: "s",
        fn: function(){ 
			for (index = 0; index < map.controls.length; ++index) {
				if (map.controls[index].active && map.controls[index].displayClass == 'olControlMousePosition')  {
					map.controls[index].deactivate();
				}
				else{map.controls[index].activate();}
			
			}
		}
    }
]);
});

