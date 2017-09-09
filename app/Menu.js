
       // ZoomIn control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomIn(),
            map: map,
			tooltip: 'Powiększ',
			 toggleGroup: toggleGroup, 
			cls: 'x-btn-text-icon',
			icon: './img/silk/magnifier_zoom_in.png'
        });
		actions["ZoomIn"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
		// ZoomOut control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomOut(),
            map: map,
			tooltip: 'Pomniejsz',
			 toggleGroup: toggleGroup, 
			cls: 'x-btn-text-icon',
			icon: './img/silk/magnifier_zoom_out.png'
        });
		
        actions["ZoomOut"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
        // ZoomToMaxExtent control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
			tooltip: 'Całość',
			 toggleGroup: toggleGroup, 
			cls: 'x-btn-text-icon',
			icon: './img/silk/arrow_out.png'
        });
        actions["max_extent"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
        // Navigation control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.Navigation(),
            map: map,
            allowDepress: false,
			 toggleGroup: toggleGroup, 
			tooltip: "Przesuń widok",
			icon: './img/geosilk/pan.png',
			cls: 'x-btn-text-icon'
        });
        actions["nav"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        
		// ZoomBox control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomBox({alwaysZoom: true}),
            map: map,
			allowDepress: false,
			toggleGroup: toggleGroup, 
			tooltip: 'Powiększ w zakresie',
			cls: 'x-btn-text-icon',
			icon: './img/silk/magnifier.png'
        });
		actions["ZoomBox"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
		//TODO: Dodać funkcje rysowania
        /*action = Ext.create('GeoExt.Action', {
            text: "draw poly",
            control: new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Polygon),
            map: map,
            toggleGroup: "draw",
            allowDepress: false,
			tooltip: "Rysuj poligon",
			icon: './img/geosilk/shape_square_edit.png.png',
			cls: 'x-btn-text-icon',
            group: "draw"
        });
        actions["draw_poly"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        
        action = Ext.create('GeoExt.Action', {
            text: "draw line",
            control: new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Path),
            map: map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            tooltip: "draw line",
            // check item options
            group: "draw"
        });
        actions["draw_line"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
        
        // SelectFeature control, a "toggle" control
        action = Ext.create('GeoExt.Action', {
            text: "select",
            control: new OpenLayers.Control.SelectFeature(vector, {
                type: OpenLayers.Control.TYPE_TOGGLE,
                hover: true
            }),
            map: map,
            // button options
            enableToggle: true,
            tooltip: "select feature"
        });
        actions["select"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
        */
        // Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        map.addControl(ctrl);

        action = Ext.create('GeoExt.Action', {
            control: ctrl.previous,
            disabled: true,
            tooltip: "Poprzedni widok",
			icon: './img/silk/arrow_left.png',
			cls: 'x-btn-text-icon'
        });
        actions["previous"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        
        action = Ext.create('GeoExt.Action', {
            control: ctrl.next,
            disabled: true,
            tooltip: "Nastęy widok",
			icon: './img/silk/arrow_right.png',
			cls: 'x-btn-text-icon'
        });
        actions["next"] = action;
        toolbarItems.push(Ext.create('Ext.button.Button', action));
        toolbarItems.push("-");
		
		//szukaj
		var locationLayer = new OpenLayers.Layer.Vector("Location", {
            styleMap: new OpenLayers.Style({
                externalGraphic: "./img/markers/information.png",
                pointRadius: 10,
                graphicTitle: "${name}"
            })
        });
		action = {
                xtype: "gx_geocodercombo",
                layer: locationLayer,
				text: 'Szukaj w Polsce',
                url: "http://nominatim.openstreetmap.org/search?format=json&viewboxlbrt=14,47,25,54&county=Poland",
                width: 200
            };
		toolbarItems.push(action);
		toolbarItems.push("-");    
		//Guzik wspolrzedne
		var CoordButton = {xtype: 'button',
			tooltip: 'Okno współrzędne',
			icon: './img/wspolrzedne.png',
			cls: 'x-btn-text-icon',
			toggleGroup: toggleGroup, 
			handler: function () {
				if (frmWspolrzedne.body === null) {
					frmWspolrzedne = pokazOknoWspolrzedne();
				}
				if (frmWspolrzedne.isVisible() === false) {
					frmWspolrzedne.show();
				}
			}
		};
        toolbarItems.push(CoordButton); 
		toolbarItems.push("-");    

		//Mierz długość
		var lengthButton = new Ext.Button({
			enableToggle: true,
			toggleGroup: toggleGroup,
			map: map,
            allowDepress: false,
			tooltip: "Mierz długość. Kliknij dwukrotnie aby zakończyć pomiar.",
			icon: './img/geosilk/ruler.png',
			cls: 'x-btn-text-icon',
			handler: function(toggled){
				if (toggled) {
					length.activate();
					area.deactivate();
					PointControl.deactivate();
				} 
			}
		});

		var area = new Ext.Button({
			enableToggle: true,
			toggleGroup: toggleGroup,
			map: map,
			tooltip: "Mierz powierzchnie. Kliknij dwukrotnie aby zakończyć pomiar.",
			icon: './img/geosilk/ruler_square.png',
			cls: 'x-btn-text-icon',
			handler: function(toggled){
				if (toggled) {
					area.activate();
					PointControl.deactivate();
					length.deactivate();
				} 
			}
		});	


    
		var Point = new Ext.Button({
			enableToggle: true,
			toggleGroup: toggleGroup,
			map: map,
			tooltip: "Pobierz współrzędne punktu",
			icon: './img/silk/cursor.png',
			cls: 'x-btn-text-icon',
			handler: function(toggled){
				if (toggled) {
					PointControl.activate();
					area.deactivate();
					length.deactivate();
				} 
			}
		});	
		toolbarItems.push(Point);
		toolbarItems.push("-");   
        toolbarItems.push(lengthButton);
		toolbarItems.push("-");   
		 toolbarItems.push(area);
		toolbarItems.push("-"); 
	var OverView = {xtype: 'button',
			tooltip: 'Pokaż widok ogólny',
			icon: './img/map_Overview.png',
			cls: 'x-btn-text-icon',
			handler: function () {
				if (overview.isVisible()) {
                     overview.hide();
                } else {
                  overview.show();
                }
			}
		};
        toolbarItems.push(OverView);
		toolbarItems.push("-"); 		
		//Guzik About
	var About = {xtype: 'button',
			tooltip: 'O Stronie',
			icon: './img/silk/help.png',
			toggleGroup: toggleGroup, 
			cls: 'x-btn-text-icon',
			handler: function () {
				if (frmAbout.body === null) {
					frmAbout = pokazOknoAbout();
				}
				if (frmAbout.isVisible() === false) {
					frmAbout.show();
				}
			}
		};
        toolbarItems.push(About);
		toolbarItems.push("-");    
		//Guzik About
	var OldLink = {xtype: 'button',
			tooltip: 'Stara wersja strony',
			icon: './img/silk/link.png',
			cls: 'x-btn-text-icon',
			handler: function () {
				window.location = "http://wspolrzedne.tk";
			}
		};
        toolbarItems.push(OldLink);
		toolbarItems.push("-");   		
		
        // Reuse the GeoExt.Action objects created above
        // as menu items
        /*toolbarItems.push({
            text: "menu",
            menu: Ext.create('Ext.menu.Menu', {
                items: [
                    // ZoomToMaxExtent
                    Ext.create('Ext.button.Button', actions["max_extent"]),
                    // Nav
                    Ext.create('Ext.menu.CheckItem', actions["nav"]),
                    // Draw poly
                    Ext.create('Ext.menu.CheckItem', actions["draw_poly"]),
                    // Draw line
                    Ext.create('Ext.menu.CheckItem', actions["draw_line"]),
                    // Select control
                    Ext.create('Ext.menu.CheckItem', actions["select"]),
                    // Navigation history control
                    Ext.create('Ext.button.Button', actions["previous"]), 
                    Ext.create('Ext.button.Button', actions["next"])
                ]
            })
        });
		*/