
<?php
 $s= $_REQUEST['s'];
 /*
$file = fopen('visitors.log', 'a');
$time = date(‘H:i dS F’);
fwrite($file, ‘<b>Time:</b> $time<br/>’ );
fwrite( $file, ‘<b>Ip Address:</b> $REMOTE_ADDR<br/>’);
fwrite($file, ‘<b>Referer:</b> $HTTP_REFFERER<br/>’);
fwrite( $file, ‘<b>Browser:</b> $HTTP_USER_AGENT<hr/>’);
fclose( $file );
*/
$file = '../Dane/json/ramki.json';
$searchfor = strtoupper ($s);
// the following line prevents the browser from parsing this as HTML.
header('Content-Type: text/plain');

// get the file contents, assuming the file to be readable (and exist)
$contents = file_get_contents($file, FILE_USE_INCLUDE_PATH);

// escape special characters in the query
$pattern = preg_quote($searchfor, '/');
// finalise the regular expression, matching the whole line
$pattern = "/^.*$pattern.*\$/m";
// search, and store all matching occurences in $matches
if(preg_match_all($pattern, $contents, $matches)){
   echo implode("\n", $matches[0]);
}
else{
   echo "Brak danych";
}
 
 
 /*
 
 
 $schema_tab=$_REQUEST['tabela'];// pobranie nazwy tabeli i schetatu  np zszik.gminy
 $array_schema_tab = explode(".",$schema_tab);// podzial na
 $schema= $array_schema_tab[1];              //schamat 
 $tabela= $array_schema_tab[0];              //tabele
 $czyTeryt =$_REQUEST['czyTeryt'];      //sprawdzenie czy uyztkownik wpisal teryt czy nazwe 
 if (StartsWith($s, '0')or StartsWith($s, '1')or StartsWith($s, '2')or StartsWith($s, '3'))  $czyTeryt ='teryt';
 else{$czyTeryt='nazwa';}

if ($tabela != '') echo GETPoint($s,$schema,$tabela,$czyTeryt);

function StartsWith($Haystack, $Needle){
    // Recommended version, using strpos
    return strpos($Haystack, $Needle) === 0;
}
function getdbArray($schema,$table,$SQLwhere)
{

  $dbconn = pg_connect("host=10.0.24.219 dbname=wabr user=jkordys password=jkordys")
	    or die('Nie mozna nawiazac polaczenia: ' . pg_last_error());
	// Wykonanie zapytania SQL
	
  if (!$table) return Array("brak tabeli");
   //set client encoding to match character set in use
   $pg_encoding = 'UNICODE';
  if (pg_set_client_encoding($dbconn, $pg_encoding ) == -1) { 
    error('Database client encoding', 'Cannot set PostgreSQL client encoding to the required '.$pg_encoding.'character set.');
  }
	$query = 'SELECT id, teryt, nazwa , astext(ST_Centroid(ST_Transform(geometria,2180))), astext(ST_Centroid(ST_Transform(geometria,4326)))   FROM '.$schema.'."'.$table.'" WHERE '.$SQLwhere." limit 1"; //.$polezapytania;
	
  $result = pg_query($query) or die('Nieprawidlowe zapytanie: ' . pg_last_error().$query);
	if (!$result) {
	  return Array("blad zapytania");
	  exit;
	}
	 $tab= array();
   while ($row = pg_fetch_array($result, null,PGSQL_NUM)) {
     $tab = array_merge_recursive($tab,$row);
   }
  
	// Zwolnienie zasob�w wyniku zapytania
	pg_free_result($result);
	// Zamkniecie polaczenia
	pg_close($dbconn);
	
	if ($tab) return $tab;
	else return Array("Blad zapytania: ",$query);  
}
function GETPoint($s,$schema,$table,$CzyTeryt)
{

	if ($s)
		$text = ($s);
	else
		$text = '';
if(!$CzyTeryt) $CzyTeryt = 'teryt';
	$tab = getdbArray($table,$schema,'lower('.$CzyTeryt.') like lower(\'%'.$text.'%\')'); 
	if  (count($tab)>2){
	$wspwgs = str_replace("POINT","",$tab[4]);
	$wsp92 = str_replace("POINT","",$tab[3]);
	$nazwa = $tab[2];
	$Teryt =$tab[1];
	return $nazwa." ".$Teryt.":".$wsp92.":".$wspwgs;
 //	$objResponse = new xajaxResponse();
 //	$objResponse1 = new xajaxResponse();
//	$objResponse->assign('div1', 'innerHTML',$tab[2].":".$wsp."TERYT ".$tab[1]);
//  $objResponse->assign('nazwa', 'innerHTML','Nazwa: '.$tab[2]);
//	$objResponse->assign('wspolrzedne', 'innerHTML','Wsp��rz�dne 1992: '.$wsp);
//	$objResponse->assign('teryt', 'innerHTML','Teryt: '.$tab[1]);
  }
		
  else{      
  return 'B��d'; 
  //$objResponse = new xajaxResponse();
 // $objResponse->assign('wspolrzedne', 'innerHTML','Brak danych');
//  $objResponse->assign('teryt', 'innerHTML','');
  }
	
} 
*/
?>