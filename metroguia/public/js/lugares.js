var indice=0;//variable que inicializa el conteo de mis ID seleccionados
var ContenedorMarcadores = new Object();
ContenedorMarcadores.Elemento = new Array();
ContenedorMarcadores.Elemento[indice]=new Object();
ContenedorMarcadores.Elemento[indice].arr_marcadores= new Array();
ContenedorMarcadores.ArrayId = new Array();

$(function(){
    //es el toogle de los lugares
    $(".toggle-button").click(function(){
        $(this).toggleClass('toggle-button-selected');
        
        var swapped = $(this).attr("data-swapped");
        var init = 'false';

        if(swapped === 'false'){
            var swapImage = $(this).attr("data-swap");
            init = true;
        }else{
            var swapImage = $(this).attr("data-src");
        }

        $(this).attr({
            'src': swapImage,
            'id': $(this).attr("id"),
            'data-swapped': init
        });



        var id =$(this).attr("id");
        var op=($(this).attr('class').split(" ")[1]=="toggle-button-selected")?"1":"0";
        
        if(ContenedorMarcadores.ArrayId.length==0){
           ContenedorMarcadores.ArrayId[indice]=id;
            
        }else{

            for(l=0;l<ContenedorMarcadores.ArrayId.length;l++){

                if(id==ContenedorMarcadores.ArrayId[l]){
                    indice=l;
                    break;
                }
                else if(l==(ContenedorMarcadores.ArrayId.length-1) && id!=ContenedorMarcadores.ArrayId[l]){
                    indice++;
                    ContenedorMarcadores.ArrayId[indice]=id;
                }
            }

        }
        if(ContenedorMarcadores.Elemento[indice]==null){
            ContenedorMarcadores.Elemento[indice]=new Object();
            ContenedorMarcadores.Elemento[indice].arr_marcadores=[];
        }

        CargarLugares(id,op);
        
    });

});


function CargarLugares(id,op){
    var postPuntos;
    var color;

    switch(op){
        case "1"://setear
            postPuntos = $.ajax({url:'puntoslugaresAjax',type:"POST",
                               headers: {'X-CSRF-TOKEN': $('#toke').val()},
                               data:{ id_lugar: id },
                        });
            postPuntos.done(function( res ) {
                //recibes un JSON desde mi php
                //recorres el JSON convirtiendolo en variable arreglo
                //obtenemos el value del elemento y llamamos elemento de mi JSON
                h=0;
                $.each(JSON.parse(res),function(key,value){
                    var img ="css/images/icons/"+value.icon_lugar;
                    
                        var content_lugar="<table border='0'>";
                            content_lugar+="<thead>";
                            content_lugar+="<tr>";
                            content_lugar+="<th colspan='4'>";
                            content_lugar+="<h2 class='HeadingTitulito'>"+value.nom_lugar+"</h2>";
                            content_lugar+="</th>";
                            content_lugar+="</tr>";
                            content_lugar+="</thead>";
                            content_lugar+="<tbody>";

                        var postDetallesLugar = $.ajax({url:'detalleslugarAjax',type:"POST",
                               headers: {'X-CSRF-TOKEN': $('#toke').val()},
                               data:{ "id_coordenada_lugar": value.id },
                        });
                        postDetallesLugar.done(function(result){

                            var image="css/images/icons/"+JSON.parse(result)[0].icon;
                            content_lugar+="<tr>";
                            content_lugar+="<td><img src='"+image+"' alt=''></td>";
                            content_lugar+="<td colspan='3'><span class='descinfo'>"+JSON.parse(result)[0].descripcion_info+"</span></td>";
                            content_lugar+="</tr>";

                            console.log(JSON.parse(result).length);

                            for(l=1;l<(JSON.parse(result).length-1);l++){
                                
                                    var image="css/images/icons/"+JSON.parse(result)[l].icon;//es el primer registro(imagen)
                                    content_lugar+="<tr>";
                                    content_lugar+="<td><img src='"+image+"' alt=''></td>";
                                    content_lugar+="<td><span class='descinfo'>"+JSON.parse(result)[l].descripcion_info+"</span></td>";
                                    var image="css/images/icons/"+JSON.parse(result)[l+1].icon;//es el primer registro(imagen)
                                    content_lugar+="<td><img src='"+image+"' alt=''></td>";
                                    content_lugar+="<td><span class='descinfo'>"+JSON.parse(result)[l+1].descripcion_info+"</span></td>";
                                    content_lugar+="</tr>";
                                
                            }
                            
                        content_lugar+="</tbody></table>";
                        });
                    
                    
                    var lat=value.lat.replace('""','');
                    var lng=value.lng.replace('""','');
                    var coordenada =  new google.maps.LatLng(lat, lng);
                    var titulo = value.nom_lugar;
                    var marcador = new google.maps.Marker({position:coordenada, map:map,title: titulo,
                        icon: img});
                    ContenedorMarcadores.Elemento[indice].arr_marcadores[h]=marcador;
                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marcador, 'click',
                        function(){
                            infowindow.close();//hide the infowindow
                            infowindow.setContent(content_lugar);//update the content for this marker
                            infowindow.open(map, marcador);//"move" the info window to the clicked marker and open it
                        }
                    ); 
                    h++;
                });

                for(j=0;j<ContenedorMarcadores.Elemento[indice].arr_marcadores.length;j++){
                    ContenedorMarcadores.Elemento[indice].arr_marcadores[j].setMap(map);
                }

            });
            
        break;

        case "0"://quitar
            for (j=0;j<ContenedorMarcadores.Elemento[indice].arr_marcadores.length;j++){
                ContenedorMarcadores.Elemento[indice].arr_marcadores[j].setMap(null);
            }
        break;
    }

}
