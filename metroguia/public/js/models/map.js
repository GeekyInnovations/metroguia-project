var map;
//LLAMADO DEL MAPA  
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: -2.1969665, lng: -79.8831496},
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.MAP,
     //prueba para sacar los negocios google maps
      mapTypeControl:false,
    panControl:false,
    styles:[
       {featureType:"poi",
        elementType:"labels",
        stylers:[{visibility:"off"}]
    },{featureType:"transit.station.airport",
        elementType:"labels",
        stylers:[{visibility:"off"}]
    },{featureType:"transit.station.bus",
        elementType:"labels",
        stylers:[{visibility:"off"}]
    },{featureType:"administrative.locality",
        elementType:"labels",
        stylers:[{visibility:"off"}]
    }]
  });
}