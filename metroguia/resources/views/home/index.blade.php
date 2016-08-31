@extends('_templates.principal')
@section('content')
<div class="accordion-container">
	<a href="#" class="accordion-titulo" ><img id="menu" src="../public/css/images/BLUE.svg" alt="" height="20" width="103"><span class="toggle-icon"> </span></a>
    <div class="accordion-content">
        
	    <div class="titulos" >Transporte</div>
	    <ul>
	    {!!Form::open()!!}
	    <input type="hidden" name="_token" value="{{ csrf_token() }}" id="toke"/>
		@foreach($sistemas as $row)
	        <li  id="transporte_<?=$row->id?>" style="max-height: 70px; cursor:pointer"  onclick="openCloseNav(<?=$row->id?>,'<?=$row->hex_color?>')">
	       		
	       		<div style="height:70px;" >
	       		<img src="../<?= $row->icono ?>" alt="" style="max-width: 70px; max-height: 70px">
	       			<span class="transportetxt" style="color: <?= $row->hex_color ?>;"><?= $row->nombre ?></span>
	       			<p class="metrodesc" style="color: <?= $row->hex_color ?>;"> <?= $row->descripcion ?></p>
	       		</div>
	       		
	       	</li>
	    @endforeach
	    {!!Form::close()!!}
		</ul>
		<hr/>

		<div class="titulos" >Lugares</div>
	    <ul>
		   @foreach($lugares as $row)
	       <li  id="lugar_<?=$row->id?>" >
		       	<div style="width:260px;">
       				<div style="width:220px; float:left;" >
			    	<img src="../<?= $row->icono ?>" alt="" style="max-width: 70px; max-height: 70px">
	       				<span class="transportetxt" style="color: <?= $row->hex_color ?>;"><?= $row->nombre ?></span>
	       				<p class="lugardesc" style="color: <?= $row->hex_color ?>;"> <?= $row->descripcion ?></p>
       				</div>
					<div style="width:40px; float:right;">
						<div  >
							<img id="<?=$row->id?>" class="toggle-button" 
							src='../public/css/images/toogle-off.png' data-swap='../public/css/images/toogle-on.png' 
							data-src='../public/css/images/toogle-off.png' data-swapped="false"/>
						</div>
					</div>
		       	</div>
	       	</li>
	    @endforeach
		</ul>
	</div>

	<div id="mySidenav" class="sidenav" >
		<!--mostra el listado de los tipos de transporte-->
	</div>
</div>

<div id="map"></div>

<script async defer 
 src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyHCGoXdQJpwybDILXovFRTS8VlVDIvtA&signed_in=false&callback=initMap">
</script>
@stop