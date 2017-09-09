  
function pokazOknoAbout() {
    
    var form = Ext.create('Ext.form.Panel', {
        layout: 'absolute',
		bodyStyle: 'padding:5px 5px 0',
        defaultType: 'textfield',
        border: false,
		items: [{
        xtype: 'label',
        forId: 'myFieldId',
        html: '<p>Strona powstała z użyciem następujących bibliotek:<ul><li><a href="https://jquery.com/">jquery</a></li>' +
		'<li><a href="https://www.sencha.com/products/extjs/#overview">Sencha Ext JS</a></li>' +
		'<li><a href="http://openlayers.org/">openlayers</a></li>'+
		'<li><a href="http://geowebcache.org/">geowebcache/</a></li>'+
		'<li><a href="http://proj4js.org">proj4js</a></li>'+
		'<li><a href="http://piwik.org">piwik</a></li>'+
		'<li><a href="https://maps.googleapis.com/maps/api/js?v=3.">Google Maps</a></li>'+
		'<li><a href="http://www.famfamfam.com/lab/icons/silk/">Silk icon set 1.3 by Mark James</a></li>'+
		'</ul></p><p>Wszelkie pliki ciasteczek są używane jedynie przez w/w biblioteki. Żadne Twoje dane nie są przesyłane na serwer! </p>'+
		'<p>Respektuję ustawienia Do Not Track Twojej przeglądarki</p>'+
		'<p>Uwagi? Propozycja pracy? <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input type="image" src="https://www.paypalobjects.com/pl_PL/PL/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal – Płać wygodnie i bezpiecznie"><img alt="" border="0" src="https://www.paypalobjects.com/pl_PL/i/scr/pixel.gif" width="1" height="1"></form> Pisz śmiało! admin@wspolrzedne.tk</p>'+
		'',
        margins: '10 10 10 10'
    }]

    });

    var win = Ext.create('Ext.window.Window', {
        autoShow: true,
        title: 'O stronie',
        width: 350,
        height: 300,
        layout: 'fit',
        plain:true,
        items: form
    });

    return win;
    
};