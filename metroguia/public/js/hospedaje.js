var Servicios = [
    {lat: -2.115585, lng: -79.896886},//GeekInnovations
    {lat: 2.138590, lng: -79.890276},//Casa de Diego
    {lat: -2.144861, lng: -79.874225},//Mi Pipi
];
var contentGeekInnovation = '<h2 id="headingazul">GeekInnovations</h2>'+'<div id="bodyContent">'+'<p>Esto es una prueba y no se me ocurrio que poner' + 'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site. </p>'+'</div>';
var contentCasaDiego = '<h2 id="headingazul" >Casa De Diego</h2>'+'<h4>Esto es una prueba y DIEGOOOOO</h4>';
var contentPipi = '<h2 id="headingazul" >MI PIPI</h2>'+'<h4>Esto es una prueba y mi pipi</h4>';

 var infowindow = new google.maps.InfoWindow({
    maxWidth: 150,
	 maxHeight:100
  });
var imageH = 'images/hospedaje.png';
var GeekInnovations = new google.maps.LatLng(-2.115585, -79.896886);
var markerGI = new google.maps.Marker({position:GeekInnovations, map:map,title: 'GeekInnovations',
    icon: imageH});
google.maps.event.addListener(markerGI, 'click',
    function(){
        infowindow.close();//hide the infowindow
        infowindow.setContent(contentGeekInnovation);//update the content for this marker
        infowindow.open(map, markerGI);//"move" the info window to the clicked marker and open it
    }
   );