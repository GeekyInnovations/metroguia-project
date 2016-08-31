$(function(){

    $(".accordion-titulo").click(function(e){
        
        e.preventDefault();
        document.getElementById("mySidenav").style.width = "0px";

        var contenido=$(this).next(".accordion-content");

        if(contenido.css("display")=="none"){ //open
          contenido.slideDown(250);
          $(this).addClass("open");
          $("#trans").addClass("open");
        }
        else{//close
          contenido.slideUp(250);
          $("#trans").removeClass("open"); 
          $(this).removeClass("open"); 
        }
        
    });

});

var previus=0;
function openCloseNav(id,color) {

    if($("#mySidenav").css("width")=="0px"){
       $("#mySidenav").css("width","550px");
       if(previus!=id){
            $.ajax({
            url:'./transportesAjax',
            type:"POST",
            headers: {'X-CSRF-TOKEN': $('#toke').val()},
            data:{id_sistema_transporte:id ,hex_color:color},
           }).done(function(res){
                $("#mySidenav").html(res);

           });
           previus = id;
       }
       

    }
    else{
       $("#mySidenav").css("width","0px");
    }
}


var idx=0;//el primero captura el indice del contador
var ContenedorObjetos= new Array();
var ObjContenedorMaestro = new Object();
ObjContenedorMaestro.Elemento = new Array();
ObjContenedorMaestro.Elemento[idx]=new Object();
ObjContenedorMaestro.Elemento[idx].arr_marcadores= new Array();
ObjContenedorMaestro.ArrayId = new Array();
var PathTrayectoria=new Array();
PathTrayectoria[idx];
//invocado por un click
function MostrarRutas(id,icon,check,mostrar_inicio) {
    if(ObjContenedorMaestro.ArrayId.length==0){

        ObjContenedorMaestro.ArrayId[idx]=id;
        
    }else{

        for(l=0;l<ObjContenedorMaestro.ArrayId.length;l++){

            if(id==ObjContenedorMaestro.ArrayId[l]){
                idx=l;
                break;
            }
            else if(l==(ObjContenedorMaestro.ArrayId.length-1) && id!=ObjContenedorMaestro.ArrayId[l]){
                idx++;
                ObjContenedorMaestro.ArrayId[idx]=id;
            }
        }

    }


    if(ObjContenedorMaestro.Elemento[idx]==null){
        ObjContenedorMaestro.Elemento[idx]=new Object();
        ObjContenedorMaestro.Elemento[idx].arr_marcadores=[];
    }
    
    $('#img_'+id).attr('src',icon);//obtiene el icono 

    $("#buttontoggle_"+id).toggleClass("btnToggleMetroCheck");
    var className = $("#buttontoggle_"+id).attr('class').split(' ')[1];

    if(className == "btnToggleMetroCheck"){
            $(".sidenav").css("height", "510px");
            //$('#img_'+id).attr('src','css/images/check.png');
            $('#img_'+id).attr('src',check);
            $("#contenedorAlimentadores").addClass("scrollbar");// se ha seleccionado un elemento, agregar scroll
            $("#content-force-overflow").addClass("force-overflow");
            
            //seccion donde carga los alimentadores
            var post_lineas = $.ajax({url:'./subtransportesAjax',type:"POST",
                                       headers: {'X-CSRF-TOKEN': $('#toke').val()},
                                       data:{ id_transporte: id },
                                });
            post_lineas.done(function(data){
                if(ContenedorObjetos[idx]==null){
                    ContenedorObjetos[idx]=data;
                    $("#dependencias_transporte").append(ContenedorObjetos[idx]);
                }
            });
            if(mostrar_inicio=='1')
                TrazarPuntosLineas(ObjContenedorMaestro.ArrayId[idx],idx,"1");
    }else{
            $("#contenedorAlimentadores").removeClass("scrollbar");//si posee escroll, quitar
            $("#content-force-overflow").removeClass("force-overflow");
            //$(".sidenav").css("height", "300px");//dejar comentado, no quitar
            $("div").remove(".listado_"+ObjContenedorMaestro.ArrayId[idx]);
            //$(".listado_"+ObjContenedorMaestro.ArrayId[idx]).hide();

            TrazarPuntosLineas(ObjContenedorMaestro.ArrayId[idx],idx,"0");
            ContenedorObjetos.splice(idx,1);//elimina un solo objeto del indice idx
            ObjContenedorMaestro.Elemento.splice(idx,1);
    }

    if(ContenedorObjetos[idx]!=null){
        $("#dependencias_transporte").html(ContenedorObjetos);
    }
    
    
}


function TrazarPuntosLineas(id,i,op){
    var postPuntos;
    var postLineas;
    var color;
    var arr_coordenadas=[];
    var marcadores= new Array();

    switch(op){
        case "1"://setear
            postPuntos= $.ajax({url:'./puntosAjax',type:"POST",
                               headers: {'X-CSRF-TOKEN': $('#toke').val()},
                               data:{ id_transporte: id },
                        });
            postPuntos.done(function( res ) {
                //recibes un JSON desde mi php
                //recorres el JSON convirtiendolo en variable arreglo
                //obtenemos el value del elemento y llamamos elemento de mi JSON
                h=0;
                $.each(JSON.parse(res),function(key,value){
                    var img ="css/images/"+value.icon;
                    var contentTransporte = '<h2 id="firstHeading" class="firstHeading"> '+value.nom+'</h2>';
                    var lat=value.lat.replace('""','');
                    var lng=value.lng.replace('""','');
                    var coordenada =  new google.maps.LatLng(lat, lng);
                    var titulo = value.nom;
                    var marcador = new google.maps.Marker({position:coordenada, map:map,title: titulo,
                        icon: img});
                    ObjContenedorMaestro.Elemento[i].arr_marcadores[h]=marcador;
                    $("#firstHeading").css("{color:'"+color+"'}");
                    var infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marcador, 'click',
                        function(){
                            infowindow.close();//hide the infowindow
                            infowindow.setContent(contentTransporte);//update the content for this marker
                            infowindow.open(map, marcador);//"move" the info window to the clicked marker and open it
                        }
                    ); 
                    h++;
                });

                for(j=0;j<ObjContenedorMaestro.Elemento[i].arr_marcadores.length;j++){
                    ObjContenedorMaestro.Elemento[i].arr_marcadores[j].setMap(map);
                }

            });

            postLineas= $.ajax({url:'./lineasAjax',type:"POST",
                               headers: {'X-CSRF-TOKEN': $('#toke').val()},
                               data:{ id_transporte: id },
                        });
            postLineas.done(function( res ) {
                //recibes un JSON desde mi php
                //recorres el JSON convirtiendolo en variable arreglo
                //obtenemos el value del elemento y llamamos elemento de mi JSON
                
                $.each(JSON.parse(res),function(key,value){
                    color=value.hex_color;
                    var lat=value.lat.replace('""','');
                    var lng=value.lng.replace('""','');
                    arr_coordenadas.push(new google.maps.LatLng( lat, lng));
                });

                if(PathTrayectoria[i]==null){
                    PathTrayectoria[i]= new google.maps.Polyline({
                        path: arr_coordenadas,
                        geodesic: false,
                        strokeColor: color,
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });
                }
                PathTrayectoria[i].setMap(map);
                
            });
        break;

        case "0"://quitar
        //si hay dependencias quitar los que estan seleccionados
        var postSubTransportes = $.ajax({url:'./subtransportesAjax',type:"POST",
                                       headers: {'X-CSRF-TOKEN': $('#toke').val()},
                                       data:{ id_transporte: id },
                                });
        postSubTransportes.done(function(json){
            if(JSON.parse(json).length>0){
                
                $.each(JSON.parse(json),function(key,value){
                    //elimina las dependencias
                    for(f=0;f<ObjContenedorMaestro.ArrayId.length;f++){

                        if(value.id==ObjContenedorMaestro.ArrayId[f]){
                            PathTrayectoria[f].setMap(null);
                            console.log("longitud de mis marcadores ="+ObjContenedorMaestro.Elemento[f].arr_marcadores.length);
                            for(j=0;j<ObjContenedorMaestro.Elemento[f].arr_marcadores.length;j++){
                                ObjContenedorMaestro.Elemento[f].arr_marcadores[j].setMap(null);
                            }
                        }
                        
                    }
                });

            }
            //end if json.length>0
        });
            for(j=0;j<ObjContenedorMaestro.Elemento[i].arr_marcadores.length;j++){
                ObjContenedorMaestro.Elemento[i].arr_marcadores[j].setMap(null);
            }
            PathTrayectoria[i].setMap(null);
        break;
    }

}


function MostrarRutasAlimentadores(id,icon,check,mostrar_inicio){

    $('#img_'+id).attr('src',icon);//obtiene el icono 

    if(ObjContenedorMaestro.ArrayId.length==0){
        ObjContenedorMaestro.ArrayId[idx]=id;
    }else{
        for(l=0;l<ObjContenedorMaestro.ArrayId.length;l++){
            if(id==ObjContenedorMaestro.ArrayId[l]){
                idx=l;
                break;
            }
            else if(l==(ObjContenedorMaestro.ArrayId.length-1) && id!=ObjContenedorMaestro.ArrayId[l]){
                idx++;
                ObjContenedorMaestro.ArrayId[idx]=id;
            }
        }
    }

    if(ObjContenedorMaestro.Elemento[idx]==null){
        ObjContenedorMaestro.Elemento[idx]=new Object();
        ObjContenedorMaestro.Elemento[idx].arr_marcadores=[];
    }

    $("#buttontoggle_"+id).toggleClass("btnToggleMetroCheck");
    
    var className = $("#buttontoggle_"+id).attr('class').split(' ')[1];
    var op ="";
    if(className == "btnToggleMetroCheck"){
        $('#img_'+id).attr('src',check);
        op="1";
    }else{
        op="0";
    }
    
    if(mostrar_inicio=='1')
        TrazarPuntosLineas(ObjContenedorMaestro.ArrayId[idx],idx,op);

}