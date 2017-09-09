var Cds = Cds || {};

Ext.Loader.setConfig({
	enabled : true,
	disableCaching : true,
	paths : {
		GeoExt : "./external/geoext2-2.1.0/src/GeoExt",
		Ext : "./external/ext-4.2.1.883/src"
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

Cds.Params = {
	GWC_url : "./Dane/",
	maxExtent : new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
	Uklady : [["900913", "900913"], ["WGS84", "4326"], ["1992", "2180"], ["GUGIK80", "3328"], ["2000v", "2176"], ["2000vi", "2177"], ["2000vii", "2178"], ["2000viii", "2179"], ["19651", "3120"], ["19652", "2172"], ["19653", "2173"], ["19654", "2174"], ["19655", "2175"]]
};
Cds.Layers = {
	znaczniki : new OpenLayers.Layer.Markers("Znacznik"),
	locationLayer : new OpenLayers.Layer.Vector("Location") // do wyszukiwania w intenecie
	,vector : new OpenLayers.Layer.Vector("vector")
	,ramki_10k_65 : new OpenLayers.Layer.GeoWebCache({
		text : "10k_65",
		name : "10k_65",
		url : Cds.Params.GWC_url + 'ramki_10k_65',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})
	,ramki_50k_65 : new OpenLayers.Layer.GeoWebCache({
		text : "50k_65",
		name : "50k_65",
		url : Cds.Params.GWC_url + 'ramki_50k_65',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})
	, ramki_10k_92 : new OpenLayers.Layer.GeoWebCache({
		text : "10k_92",
		name : "10k_92",
		url : Cds.Params.GWC_url + 'ramki_10k_92',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})		
	,ramki_50k_92: new OpenLayers.Layer.GeoWebCache({
		text : "50k_92",
		name : "50k_92",
		url : Cds.Params.GWC_url + 'ramki_50k_92',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})			
	, ramki_10k_42 : new OpenLayers.Layer.GeoWebCache({
		text : "10k_42",
		name : "10k_42",
		url : Cds.Params.GWC_url + 'ramki_10k_42',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})		
	,ramki_50k_42: new OpenLayers.Layer.GeoWebCache({
		text : "50k_42",
		name : "50k_42",
		url : Cds.Params.GWC_url + 'ramki_50k_42',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})			
	,ramki_100k_GUGIK80	: new OpenLayers.Layer.GeoWebCache({
		text : "100k_GUGIK80",
		name : "100k_GUGIK80",
		url : Cds.Params.GWC_url + 'ramki_100k_GUGIK80',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})				
	,ramki_50k_WGS		: new OpenLayers.Layer.GeoWebCache({
		text : "50k_WGS",
		name : "50k_WGS",
		url : Cds.Params.GWC_url + 'ramki_50k_WGS',
		maxExtent : Cds.Params.maxExtent,
		transparent : true,
		buffer : 1,
		isBaseLayer : false,
		visibility : false,
		tiled : true
		})				
	,gSat : new OpenLayers.Layer.Google("Google satellite", {
		type : "satellite",
		sphericalMercator : true
	}),
	gMaps : new OpenLayers.Layer.Google("Google Maps"),
	OSM : new OpenLayers.Layer.OSM()
	// , Publiczne: [this.gSat, this.gMaps, this.OSM]
	//  , Ramki: [this.GWCRamki]

};

Cds.Mapa = {
	size : new OpenLayers.Size(21, 25),
	//offset: new OpenLayers.Pixel(-(this.size.w/2), -this.size.h),
	olmap : new OpenLayers.Map({
		allOverlays : false,
		projection : new OpenLayers.Projection("EPSG:900913"),
		displayProjection : new OpenLayers.Projection("EPSG:900913"),
		controls : [new OpenLayers.Control.Navigation()],
		maxResolution : 0.703125,
		zoomMethod : null
	}),
	ikonka : new OpenLayers.Icon('img/markers/information_highlights.png', this.size)
};
Cds.Ui = {
	mapPanel : null,
	tree : null,
	slider : null,
	frmWspolrzedne : null,
	frmAbout : null,
	toggleGroup : "Narzedzia",
	PointControl : null,
	area : null,
	length : null,
	popup : null,
	overview : null,
	MousePosition : null,
	/*
	 * Tworzy okienko popup
	 * @returns {undefined}
	 */
	createPopup : function () {
		if (!this.popup || this.popup.isDestroyed) {
			this.popup = Ext.create('GeoExt.window.Popup', {
					title : 'Dane mapy',
					width : 250,
					html : "",
					collapsible : false,
					map : Cds.Mapa.olmap
				});
		}
	},
	/*
	 * Dodanie popup dialog ze wspolrzednymi WGS
	 * @param {latlon} loc
	 */
	addToPopup : function (loc) {
		var locWGS = loc.clone().transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection("EPSG:4326"));
		this.createPopup();
		this.popup.add({
			xtype : "box",
			autoEl : {
				html : //"GoogleMaps: " + loc.lon.toFixed(2) + ", " + loc.lat.toFixed(2) + "<br/>"+
				"WGS 84: " + locWGS.lon.toFixed(5) + ", " + locWGS.lat.toFixed(5) + "<br/>"
			}
		});
		this.popup.doLayout();
		this.popup.show();
	},
	/*
	 * Dodanie popup dialog z tekstem
	 * @param {text} String
	 */
	addTxtToPopup : function (text) {
		this.createPopup();
		this.popup.add({
			xtype : "box",
			autoEl : {
				html : text
			}
		});
		this.popup.doLayout();
		this.popup.show();
	},
	/*
	 * Dodanie popup dialog z numerem sekcji
	 * @param {latlon} loc
	 */
	addAttToPopup : function (layerName, Attrib) {
		this.createPopup();
		this.popup.add({
			xtype : "box",
			autoEl : {
				html : "Uklad: " + layerName + " sekcja: " + Attrib
			}
		});
		this.popup.doLayout();
		this.popup.show();
	},
	/*
	 * Dodanie markera do mapy
	 * @param {lonlat} ll
	 */
	addMarker : function (ll) {
		var feature = new OpenLayers.Feature(Cds.Layers.znaczniki, ll);
		var marker = feature.createMarker();
		marker.icon = Cds.Mapa.ikonka;
		Cds.Layers.znaczniki.addMarker(marker);
		Cds.Mapa.olmap.addLayer(Cds.Layers.znaczniki);
	},
	pokazOknoAbout : function () {
		var form = Ext.create('Ext.form.Panel', {
				layout : 'absolute',
				bodyStyle : 'padding:5px 5px 0',
				defaultType : 'textfield',
				border : false,
				items : [{
						xtype : 'fieldset',
						columnWidth : 0.5,
						collapsible : false,
						bodyStyle : 'padding:5px 5px 0',
						defaultType : 'textfield',
						defaults : {
							anchor : '-5',
							fieldWidth : 80,
							x : 5
						},
						layout : 'anchor',
						items : [{
						xtype : 'label',
						forId : 'myFieldId',
						html : '<p>Strona powstała w celach niekomercyjnych i autor nie bierze żadnej odpowiedzialności za jej użycie. Wykorzystano następujące biblioteki:<ul><li><a href="https://jquery.com/">jquery</a></li>' +
						'<li><a href="https://www.sencha.com/products/extjs/#overview">Sencha Ext JS</a></li>' +
						'<li><a href="http://openlayers.org/">openlayers</a></li>' +
						'<li><a href="http://geowebcache.org/">geowebcache/</a></li>' +
						'<li><a href="http://proj4js.org">proj4js</a></li>' +
						'<li><a href="http://www.openwebanalytics.com/">Open Web Analytics</a></li>' +
						'<li><a href="https://maps.googleapis.com/maps/api/js?v=3.">Google Maps</a></li>' +
						'<li><a href="http://www.famfamfam.com/lab/icons/silk/">Silk icon set 1.3 by Mark James</a></li>' +
						'</ul></p><p>Wszelkie pliki ciasteczek są użwane jedynie przez w/w biblioteki. Żadne Twoje dane nie są przesyłne na serwer! </p>' +
						'<p>Respektuję ustawienia Do Not Track Twojej przeglądarki</p>' +
						'<p>Uwagi? Propozycja współpracy? Dotacja? Pisz śmiało! admin@wspolrzedne.tk</p>',
						margins : '10 10 10 10'
						}]
				}]
			});
		var win = Ext.create('Ext.window.Window', {
				autoShow : true,
				title : 'O stronie',
				width : 450,
				//height : 400,
				layout : 'fit',
				plain : true,
				items : form
			});
		return win;
	},
	pokazOknoWspolrzedne : function () {
		/* Obsluga zmiany wartosci w formularzu ze wspolrzednymi
		 *
		 * @param {type} field - pole w ktorym nastapila zmiana
		 * @param {type} newValue - nowa wartosc
		 * @param {type} oldValue- stara wartosc
		 * @param {type} Projection - uklad wsporzednych w formacie "EPSG:900913"
		 */
		function SetCenterAndTransform(field, newValue, oldValue, Projection) {
			if (newValue.indexOf(',') > -1) {
				var lonlatProjection = new OpenLayers.LonLat(newValue.split(','));
				var lonlatGoogle = lonlatProjection.clone().transform(new OpenLayers.Projection(Projection), new OpenLayers.Projection("EPSG:900913"));
				if (lonlatProjection.lon > 0 && lonlatProjection.lat > 0) {
					var i = 0;
					for (i = 0; i < Cds.Params.Uklady.length; ++i) { //przeliczenie pozostalych ukladow
						var newProjection = "EPSG:" + Cds.Params.Uklady[i][1];
						if (Projection !== newProjection) {
							var lonlat = lonlatProjection.clone().transform(new OpenLayers.Projection(Projection), new OpenLayers.Projection(newProjection));
							document.getElementById(Cds.Params.Uklady[i][0] + '-inputEl').value = lonlat.lon.toFixed(5) + ', ' + lonlat.lat.toFixed(5);
						}
					}
					addMarker(lonlatGoogle);
					Cds.Mapa.olmap.setCenter(lonlatGoogle, Cds.Mapa.olmap.zoom);
					Cds.Mapa.olmap.addLayer(Cds.Layers.znaczniki);
				}
			}
		};
		var form = Ext.create('Ext.form.Panel', {
				layout : 'absolute',
				frame : true,
				defaultType : 'textfield',
				bodyStyle : 'padding:5px 5px 0',
				bodyPadding : 0,
				defaults : {
					bodyPadding : 0
				},
				border : false,
				items : [{
						xtype : 'fieldset',
						columnWidth : 0.5,
						collapsible : false,
						bodyStyle : 'padding:5px 5px 0',
						defaultType : 'textfield',
						defaults : {
							anchor : '-5',
							fieldWidth : 80,
							x : 5
						},
						layout : 'anchor',
						//collapsible:false,
						//checkboxToggle: true,
						title : 'Kliknij klawisz "S" aby zatrzymać/uruchomić śledzenie!',
						items : [{
								fieldLabel : 'WGS 84',
								id : 'WGS84',
								y : 5,
								name : 'WGS84',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:4326");
									}
								}
							}, {
								fieldLabel : 'GUGIK 80',
								id : 'GUGIK80',
								msgTarget : 'side',
								allowBlank : false,
								y : 35,
								name : 'GUGIK80',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:3328");
									}
								}
							}, {
								fieldLabel : '1992',
								id : '1992',
								y : 65,
								name : '1992',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2180");
									}
								}
							}, {
								fieldLabel : '2000 strefa V',
								id : '2000v',
								y : 95,
								name : '2000v',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2176");
									}
								}
							}, {
								fieldLabel : '2000 strefa VI',
								id : '2000vi',
								y : 125,
								name : '2000vi',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2177");
									}
								}
							}, {
								fieldLabel : '2000 strefa VII',
								id : '2000vii',
								y : 155,
								name : '2000vii',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2178");
									}
								}
							}, {
								fieldLabel : '2000 strefa VIII',
								id : '2000viii',
								y : 185,
								name : '2000viii',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2179");
									}
								}
							}, {
								fieldLabel : '1965 strefa 1',
								id : '19651',
								y : 215,
								name : '19651',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:3120");
									}
								}
							}, {
								fieldLabel : '1965 strefa 2',
								id : '19652',
								y : 245,
								name : '19652',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2172");
									}
								}
							}, {
								fieldLabel : '1965 strefa 3',
								id : '19653',
								y : 275,
								name : '19653',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2173");
									}
								}
							}, {
								fieldLabel : '1965 strefa 4',
								id : '19654',
								y : 305,
								name : '19654',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2174");
									}
								}
							}, {
								fieldLabel : '1965 strefa 5',
								id : '19655',
								y : 335,
								name : '19655',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:2175");
									}
								}
							}, {
								fieldLabel : 'EPSG:900913',
								id : '900913',
								msgTarget : 'side',
								allowBlank : false,
								y : 365,
								name : '900913',
								listeners : {
									change : function (field, newValue, oldValue) {
										SetCenterAndTransform(field, newValue, oldValue, "EPSG:900913");
									}
								}
							}
						]
					}
				]
			});

		var win = Ext.create('Ext.window.Window', {
				autoShow : true,
				title : 'Współrzędne',
				width : 350,
				height : 430,
				minWidth : 300,
				minHeight : 200,
				layout : 'fit',
				plain : true,
				items : form
			});

		return win;
	},
	createMenu : function () {
		var ctrl,
		toolbarItems = [],
		action,
		actions = {};
		// ZoomIn control, a "button" control
		action = Ext.create('GeoExt.Action', {
				control : new OpenLayers.Control.ZoomIn(),
				map : Cds.Mapa.olmap,
				tooltip : 'Powiększ',
				toggleGroup : this.toggleGroup,
				cls : 'x-btn-text-icon',
				icon : './img/silk/magnifier_zoom_in.png'
			});
		actions["ZoomIn"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));
		toolbarItems.push("-");
		// ZoomOut control, a "button" control
		action = Ext.create('GeoExt.Action', {
				control : new OpenLayers.Control.ZoomOut(),
				map : Cds.Mapa.olmap,
				tooltip : 'Pomniejsz',
				toggleGroup : this.toggleGroup,
				cls : 'x-btn-text-icon',
				icon : './img/silk/magnifier_zoom_out.png'
			});
		actions["ZoomOut"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));
		toolbarItems.push("-");
		// ZoomToMaxExtent control, a "button" control
		action = Ext.create('GeoExt.Action', {
				control : new OpenLayers.Control.ZoomToMaxExtent(),
				map : Cds.Mapa.olmap,
				tooltip : 'Całość',
				toggleGroup : this.toggleGroup,
				cls : 'x-btn-text-icon',
				icon : './img/silk/arrow_out.png'
			});
		actions["max_extent"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));
		toolbarItems.push("-");
		// Navigation control, a "button" control
		action = Ext.create('GeoExt.Action', {
				control : new OpenLayers.Control.Navigation(),
				map : Cds.Mapa.olmap,
				allowDepress : false,
				toggleGroup : this.toggleGroup,
				tooltip : "Przesuń widok",
				icon : './img/geosilk/pan.png',
				cls : 'x-btn-text-icon'
			});
		actions["nav"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));

		// ZoomBox control, a "button" control
		action = Ext.create('GeoExt.Action', {
				control : new OpenLayers.Control.ZoomBox({
					alwaysZoom : true
				}),
				map : Cds.Mapa.olmap,
				allowDepress : false,
				toggleGroup : this.toggleGroup,
				tooltip : 'Powiększ w zakresie',
				cls : 'x-btn-text-icon',
				icon : './img/silk/magnifier.png'
			});
		actions["ZoomBox"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));
		toolbarItems.push("-");

		// Navigation history - two "button" controls
		ctrl = new OpenLayers.Control.NavigationHistory();
		Cds.Mapa.olmap.addControl(ctrl);

		action = Ext.create('GeoExt.Action', {
				control : ctrl.previous,
				disabled : true,
				tooltip : "Poprzedni widok",
				icon : './img/silk/arrow_left.png',
				cls : 'x-btn-text-icon'
			});
		actions["previous"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));

		action = Ext.create('GeoExt.Action', {
				control : ctrl.next,
				disabled : true,
				tooltip : "Następny widok",
				icon : './img/silk/arrow_right.png',
				cls : 'x-btn-text-icon'
			});
		actions["next"] = action;
		toolbarItems.push(Ext.create('Ext.button.Button', action));
		toolbarItems.push("-");

		action = {
			xtype : "gx_geocodercombo",
			layer : Cds.Layers.locationLayer,
			text : 'Szukaj w Polsce',
			url : "http://nominatim.openstreetmap.org/search?format=json&viewboxlbrt=14,47,25,54&county=Poland",
			width : 200
		};
		toolbarItems.push(action);
		toolbarItems.push("-");
		//Guzik wspolrzedne
		var CoordButton = {
			xtype : 'button',
			tooltip : 'Okno współrzędne',
			icon : './img/wspolrzedne.png',
			cls : 'x-btn-text-icon',
			toggleGroup : this.toggleGroup,
			handler : function () {
				if (Cds.Ui.frmWspolrzedne.body === null) {
					Cds.Ui.frmWspolrzedne = Cds.Ui.pokazOknoWspolrzedne();
				}
				if (Cds.Ui.frmWspolrzedne.isVisible() === false) {
					Cds.Ui.frmWspolrzedne.show();
				}
			}
		};
		toolbarItems.push(CoordButton);
		toolbarItems.push("-");

		//Mierz długość
		var lengthButton = new Ext.Button({
				enableToggle : true,
				toggleGroup : this.toggleGroup,
				map : Cds.Mapa.olmap,
				allowDepress : false,
				tooltip : "Mierz długość. Kliknij dwukrotnie aby zakończyć pomiar.",
				icon : './img/geosilk/ruler.png',
				cls : 'x-btn-text-icon',
				handler : function (toggled) {
					if (toggled) {
						Cds.Ui.length.activate();
						Cds.Ui.area.deactivate();
						Cds.Ui.PointControl.deactivate();
					}
				}
			});
		//Mierz powierzchnie
		var area = new Ext.Button({
				enableToggle : true,
				toggleGroup : this.toggleGroup,
				map : Cds.Mapa.olmap,
				tooltip : "Mierz powierzchnie. Kliknij dwukrotnie aby zakończyć pomiar.",
				icon : './img/geosilk/ruler_square.png',
				cls : 'x-btn-text-icon',
				handler : function (toggled) {
					if (toggled) {
						Cds.Ui.area.activate();
						Cds.Ui.PointControl.deactivate();
						Cds.Ui.length.deactivate();
					}
				}
			});
		var Point = new Ext.Button({
				enableToggle : true,
				toggleGroup : this.toggleGroup,
				map : Cds.Mapa.olmap,
				tooltip : "Pobierz współrzędne punktu",
				icon : './img/silk/cursor.png',
				cls : 'x-btn-text-icon',
				handler : function (toggled) {
					if (toggled) {
						Cds.Ui.PointControl.activate();
						Cds.Ui.area.deactivate();
						Cds.Ui.length.deactivate();
					}
				}
			});
		toolbarItems.push(Point);
		toolbarItems.push("-");
		toolbarItems.push(lengthButton);
		toolbarItems.push("-");
		toolbarItems.push(area);
		toolbarItems.push("-");
		var OverView = {
			xtype : 'button',
			tooltip : 'Pokaż widok ogólny',
			icon : './img/map_Overview.png',
			cls : 'x-btn-text-icon',
			handler : function () {
				if (Cds.Ui.overview.isVisible()) {
					Cds.Ui.overview.hide();
				} else {
					Cds.Ui.overview.show();
				}
			}
		};
		toolbarItems.push(OverView);
		toolbarItems.push("-");
		//Guzik About
		var About = {
			xtype : 'button',
			tooltip : 'O Stronie',
			icon : './img/silk/help.png',
			toggleGroup : this.toggleGroup,
			cls : 'x-btn-text-icon',
			handler : function () {
				if (Cds.Ui.frmAbout.body === null) {
					Cds.Ui.frmAbout = pokazOknoAbout();
				}
				if (Cds.Ui.frmAbout.isVisible() === false) {
					Cds.Ui.frmAbout.show();
				}
			}
		};
		toolbarItems.push(About);
		toolbarItems.push("-");
		//Guzik About
		var OldLink = {
			xtype : 'button',
			tooltip : 'Poprzednia wersja strony',
			icon : './img/silk/link.png',
			cls : 'x-btn-text-icon',
			handler : function () {
				window.location = "http://koneserowie.vivaldiego.wroclaw.pl/google/i.php";
			}
		};
		toolbarItems.push(OldLink);
		toolbarItems.push("-");
		return toolbarItems;
	}
};
/*
 * Dodanie obslugi zdarzenia zmiany do ukrytych divow ze wspolrzednymi
 * i przepisanie ich do formatki 'Wspolrzedne'
 * @returns function obsluzZmiane
 */
$(function () {
	if (Cds.Params.Uklady !== undefined) {
		for (index = 0; index < Cds.Params.Uklady.length; index++) {
			$('#' + Cds.Params.Uklady[index][0]).bind('DOMSubtreeModified', function (event) {
				if (document.getElementById(event.target.id + '-inputEl') !== null) {
					if (event.target.innerHTML.length > 0) {
						document.getElementById(event.target.id + '-inputEl').value = event.target.innerHTML;
					}
				}
			});
		}
	}
});
Ext.application({
	name : 'www.wspolrzedne.tk',
	launch : function () {
		Cds.Ui.frmWspolrzedne = Cds.Ui.pokazOknoWspolrzedne();
		Cds.Ui.frmAbout = Cds.Ui.pokazOknoAbout();
		Cds.Ui.frmWspolrzedne.hide();
		Cds.Ui.frmAbout.hide();

		Cds.Ui.mapPanel = Ext.create('GeoExt.panel.Map', {
				region : "center",
				map : Cds.Mapa.olmap,
				center : [2100000, 6750000],
				zoom : 7,
				extent : Cds.Params.maxExtent,
				items : [{
						xtype : "gx_zoomslider",
						vertical : true,
						height : 150,
						x : 10,
						y : 20,
						plugins : Ext.create('GeoExt.SliderTip', {
							getText : function (thumb) {
								var slider = thumb.slider;
								var out = '<div>Poziom: {0}</div>' +
									'<div>Rozdzielczość{1}</div>' +
									'<div>Skala: 1 : {2}</div>';
								return Ext.String.format(out, slider.getZoom(), slider.getResolution(), slider.getScale());
							}
						})
					}
				],
				tbar : Cds.Ui.createMenu()
			});
		//Dodawanie warstw map tla 
		Cds.Ui.mapPanel.layers.add([Cds.Layers.OSM, Cds.Layers.gSat, Cds.Layers.gMaps]);
	//	Cds.Ui.mapPanel.layers.add([Cds.Layers.ramki_10k_65, Cds.Layers.ramki_50k_65, Cds.Layers.ramki_10k_92,Cds.Layers.ramki_50k_92]);
		//Dodawanie warstw ramek 
		$.each(Cds.Layers, function(key, value) {
			if(key.indexOf('ramki') > -1){
				console.log('dodawanie warstw key: '+key, 'value:'+value);
				Cds.Ui.mapPanel.layers.add(value);
			}
		});
		var store = Ext.create('Ext.data.TreeStore', {
				model : 'GeoExt.data.LayerTreeModel',
				root : {
					expanded : true,
					children : [{
							plugins : ['gx_baselayercontainer'],
							expanded : true,
							leaf : false,
							text : "Mapy tła"
						}, {
							plugins : ['gx_overlaylayercontainer'],
							expanded : true,
							text : "Ramki CODGIK"
						}
					]
				}

			});

		Cds.Ui.tree = Ext.create('GeoExt.tree.Panel', {
				border : true,
				region : "west",
				title : "Warstwy",
				width : 200,
				split : false,
				collapsible : false,
				collapseMode : "mini",
				autoScroll : true,
				store : store,
				rootVisible : false,
				lines : true,
				listeners : {
					itemclick : function (me, record, item, index, e, eOpts) {
						var check = record.data.checked;
						record.cascadeBy(function (n) {
							n.set('checked', !check);
						});
					}
				}
			});
		Cds.Ui.overview = Ext.create('GeoExt.OverviewMap', {
				map : Cds.Mapa.olmap,
				dynamic : true,
				autoShow : true,
				width : 300,
				height : 200,
				floating : true,
				border : 1,
				style : {
					borderStyle : 'none'
				},
				resizable : {
					preserveRatio : true,
					heightIncrement : 0,
					widthIncrement : 0,
					handles : 'ne'
				}
			});

		Cds.Ui.Viewport = Ext.create('Ext.Viewport', {
				layout : "fit",
				hideBorders : true,
				items : {
					layout : "border",
					deferredRender : false,
					items : [Cds.Ui.mapPanel, Cds.Ui.tree]
				}
			});
		var vOffset = -25 - Cds.Ui.overview.getHeight();
		var position = Cds.Ui.overview.getAlignToXY(Cds.Ui.Viewport, 'bl', [225, vOffset]);
		Cds.Ui.overview.setPosition(position);

	}
});
Ext.onReady(function () {
	//Dodanie obslugi wyswietlania wspolrzednych przy szuraniu mysza
	for (index = 0; index < Cds.Params.Uklady.length; ++index) {
		Cds.Ui.mousePositionCtrl = Cds.Mapa.olmap.addControl(new OpenLayers.Control.MousePosition({
					div : document.getElementById('' + Cds.Params.Uklady[index][0]),
					displayProjection : new OpenLayers.Projection('EPSG:' + Cds.Params.Uklady[index][1])
				}));

	}
	// Measure control, a "button" control
	Cds.Ui.length = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
			eventListeners : {
				measure : function (evt) {
					//addTxtToPopup szukaj w pliku coordWindow.js
					Cds.Ui.addTxtToPopup("Długość: " + evt.measure + ' ' + evt.units);
				}
			}
		});
	Cds.Ui.length.geodesic = true;
	Cds.Ui.area = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			eventListeners : {
				measure : function (evt) {
					//addTxtToPopup szukaj w pliku coordWindow.js
					Cds.Ui.addTxtToPopup("Powierzchnia: " + evt.measure + ' ' + evt.units);
				}
			}
		});
	Cds.Ui.area.geodesic = true;
	Cds.Ui.PointControl = new OpenLayers.Control.Click({
			trigger : function (evt) {
				var loc = Cds.Mapa.olmap.getLonLatFromViewPortPx(evt.xy);
				Cds.Ui.addMarker(loc); // addMarker szukaj w pliku coordWindow.js
				Cds.Ui.addToPopup(loc); // addToPopup szukaj w pliku coordWindow.js
			}
		});
	Cds.Mapa.olmap.addControl(Cds.Ui.PointControl);
	Cds.Mapa.olmap.addControl(Cds.Ui.length);
	Cds.Mapa.olmap.addControl(Cds.Ui.area);
	//obsluga skrótów klawiaturowych
	var KeyMap = new Ext.KeyMap(document.body, [{
					key : "s",
					fn : function () {
						for (index = 0; index < Cds.Mapa.olmap.controls.length; ++index) {
							if (Cds.Mapa.olmap.controls[index].active && Cds.Mapa.olmap.controls[index].displayClass == 'olControlMousePosition') {
								Cds.Mapa.olmap.controls[index].deactivate();
							} else {
								Cds.Mapa.olmap.controls[index].activate();
							}

						}
					}
				}
			]);

	var hideMask = function () {
		Ext.get('loading').remove();
		Ext.fly('loading-mask').animate({
			opacity : 0,
			remove : true
			//,	callback : firebugWarning
		});
	};

	Ext.defer(hideMask, 250);

});
/*
 * Obsługa klikniecia na mapie
 */
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
		defaultHandlerOptions : {
			single : true,
			double : false,
			pixelTolerance : 0,
			stopSingle : true
		},
		initialize : function (options) {

			this.handlerOptions = OpenLayers.Util.extend(
					options && options.handlerOptions || {},
					this.defaultHandlerOptions);
			OpenLayers.Control.prototype.initialize.apply(
				this, arguments);
			this.handler = new OpenLayers.Handler.Click(
					this, {
					click : this.trigger
				},
					this.handlerOptions);
		},
		CLASS_NAME : "OpenLayers.Control.Click"
	});
