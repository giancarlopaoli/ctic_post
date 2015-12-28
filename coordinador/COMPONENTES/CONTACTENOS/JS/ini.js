
$(document).ready(function(){
	$('body').on('click','.comp-contactenos-btn-gmaps',function(){
		var id_contactenos=$(this).data('idcontactenos');
		//alert(id_contactenos);

		//fun_carga_google_maps();
		GL_COMPONENTE_CONTACTENOS.ARRAY_CONTACTENOS[id_contactenos].ejecutar_google_maps();
	});
/* DESARROLLADO  POR DANTE VIDAL TUEROS*/


    $('body').on('click','#comp-contactenos-enviar',function(){
          

      $('.comp-contactenos .comp-contactenos-cuerpo .comp-contactenos-campo .campo-vacio').addClass('oculto');

  /*    $('#comp-contactenos-nombre').parent().removeClass('comp-contacto-alerta');
      $('#comp-contactenos-apellidos').parent().removeClass('comp-contacto-alerta');
      $('#comp-contactenos-correo').parent().removeClass('comp-contacto-alerta');
      $('#comp-contactenos-telefono').parent().removeClass('comp-contacto-alerta');
      $('#comp-contactenos-mensaje').parent().removeClass('comp-contacto-alerta');
      
      nombre=((typeof $('#comp-contactenos-nombre').val() =='string')? $('#comp-contactenos-nombre').val() : 'no definido' );
      apellidos=((typeof $('#comp-contactenos-apellidos').val()=='string')? $('#comp-contactenos-apellidos').val() : 'no definido' );
      correo=((typeof $('#comp-contactenos-correo').val()=='string')? $('#comp-contactenos-correo').val() : 'no definido' );
      telefono=((typeof $('#comp-contactenos-telefono').val()=='string')? $('#comp-contactenos-telefono').val() : 'no definido' );
      mensaje=((typeof $('#comp-contactenos-mensaje').val()=='string')? $('#comp-contactenos-mensaje').val() : 'no definido' );
*/


	id_componente=$(this).data('idcomp');
	$('.comp-contactenos .comp-ge-campo-contacto').each(function(){

		if($(this).attr('type')=='checkbox'){
			
			$('.comp-contactenos form #campo_form_contacto_'+$(this).data('campo')).val($(this).is(':checked'));

		}else{

			$('.comp-contactenos form #campo_form_contacto_'+$(this).data('campo')).val($(this).val());

		}

	});


/*
	valores= JSON.stringify(valores);
	alert(valores);*/
	formData  = new FormData($('.comp-contactenos form')[0]);



    // if(!fun_esblanco(nombre)  && !fun_esblanco(correo) && !fun_esblanco(telefono) && !fun_esblanco(mensaje)){
        
		$.ajax({
		//Y EN DATA SE ALOJARAN EN NUEVAS VARIABLES	        
		data:formData, 
        async:true,
	    cache: false,
	    contentType: false,
	    processData: false,
          url: "COMPONENTES/CONTACTENOS/POST/contacto.php",
          type: "POST",
         // data:{nombre:fun_ignora_tildes(nombre),correo:correo,telefono:telefono,mensaje:fun_ignora_tildes(mensaje)},
          beforeSend: function(objeto){
            
            $('#comp-contactenos-enviar .comp-content-enviar').html('Enviando...');
            $('#comp-contactenos-enviar .comp-content-enviar').addClass('comp-contacto-enviando');
          },
            
          success: function(data){
         
          
            if(data=="mysql_no"){
              FMSG_ERROR_CONEXION();
            }else{
              	if(data=='error_correo'){


			          $('#comp-contactenos-correo').parent().addClass('comp-contacto-alerta');
			          $('#comp-contactenos-correo').next().html('Escriba una direccion de email');
			          $('#comp-contactenos-correo').next().removeClass('oculto');
			      

	                  	$('#comp-contactenos-enviar .comp-content-enviar').html('Enviar');
	                	$('#comp-contactenos-enviar .comp-content-enviar').removeClass('comp-contacto-enviando');
	              


              	} else{
/*
	                $('#comp-contactenos-nombre').val('');
	                $('#comp-contactenos-apellidos').val('');
	                $('#comp-contactenos-correo').val('');
	                $('#comp-contactenos-telefono').val('');
	                $('#comp-contactenos-mensaje').val('');
	                          
	                $('#comp-contactenos-nombre').removeClass('comp-contacto-alerta');
	                $('#comp-contactenos-apellidos').removeClass('comp-contacto-alerta');
	                $('#comp-contactenos-correo').removeClass('comp-contacto-alerta');
	                $('#comp-contactenos-telefono').removeClass('comp-contacto-alerta');
	                $('#comp-contactenos-mensaje').removeClass('comp-contacto-alerta');
	                  */
	                $('#comp-contactenos-enviar .comp-content-enviar').html('Mensaje enviado');

	                var delay_envio=setInterval(function(){
	                  clearInterval(delay_envio);
	                  	$('#comp-contactenos-enviar .comp-content-enviar').html('Enviar');
	                	$('#comp-contactenos-enviar .comp-content-enviar').removeClass('comp-contacto-enviando');
	                },4000);
              	}  
            }
          }
                  
              
        }); 
        
        
/* DESARROLLADO  POR DANTE VIDAL TUEROS*/
     /* }else{

        if(fun_esblanco(nombre)){
          $('#comp-contactenos-nombre').parent().addClass('comp-contacto-alerta');
          $('#comp-contactenos-nombre').next().removeClass('oculto');
        }
        if(fun_esblanco(apellidos)){
          $('#comp-contactenos-apellidos').parent().addClass('comp-contacto-alerta');
          $('#comp-contactenos-apellidos').next().removeClass('oculto');
        }
        if(fun_esblanco(correo)){
		$('#comp-contactenos-correo').next().html('Este campo es obligatorio');
          $('#comp-contactenos-correo').parent().addClass('comp-contacto-alerta');
          $('#comp-contactenos-correo').next().removeClass('oculto');
        }
        if(fun_esblanco(telefono)){
          $('#comp-contactenos-telefono').parent().addClass('comp-contacto-alerta');
          $('#comp-contactenos-telefono').next().removeClass('oculto');
        }
        if(fun_esblanco(mensaje)){
          $('#comp-contactenos-mensaje').parent().addClass('comp-contacto-alerta');
          $('#comp-contactenos-mensaje').next().removeClass('oculto');
        }  
            
      }
      */
    });

	$('body').on('focusin','.comp-contactenos .comp-contactenos-cuerpo .comp-contactenos-campo_input input, .comp-contactenos .comp-contactenos-cuerpo .comp-contactenos-campo_input textarea',function(){
		$(this).parent().addClass('focus-input');
	});
	$('body').on('focusout','.comp-contactenos .comp-contactenos-cuerpo .comp-contactenos-campo_input input, .comp-contactenos .comp-contactenos-cuerpo .comp-contactenos-campo_input textarea',function(){
		$(this).parent().removeClass('focus-input');
	});

});

$(window).resize(function(){
	
	if(!GL_INICIA_DESDE_MOVIL){
		for(var index in GL_COMPONENTE_CONTACTENOS.ARRAY_CONTACTENOS){
			GL_COMPONENTE_CONTACTENOS.ARRAY_CONTACTENOS[index].resize();
		}
	}
	
/* DESARROLLADO  POR DANTE VIDAL TUEROS*/
});

function OBJ_INICIALIZA_CONTACTENOS(){


	this.CONT_CONTACTENOS=0;
	this.ARRAY_CONTACTENOS=new Array();

	this.ini=function(){
		var obj_dom_contactenos=this;


		$('.comp-contactenos').each(function(){
			//recogemos todas las imágenes que hay pero debemos verificar si es manual o no

			if($(this).data('tipocarga')=='manual'){	
				


				//////CLASES EXTRA     CLASES EXTRA
				//////CLASES EXTRA     CLASES EXTRA
				//////CLASES EXTRA     CLASES EXTRA

				var array_class_extra=new Array();

				$(this).find('ClassExtra').each(function(){		
					array_class_extra[$(this).attr('DOMdestino')]=$(this).attr('class');

				});


				var array_attr_extra=new Array();

				$(this).find('AttrExtra').each(function(){		
					array_attr_extra[$(this).attr('DOMdestino')]=$(this).attr('atributos');
				});

/* DESARROLLADO  POR DANTE VIDAL TUEROS*/


				var altura_boton_ubicanos=0;
				var contador=0;	
				var html_formulario='',html_ubicanos='',img_indicador='',campos_form='';
				var latitud=0,longitud=0;
				var total_elementos=$(this).find('div').length;
				var html_pie='';
				var altura_pie=0;


				$(this).find('dato').each(function(){
					

					imagen_input='';
					if($(this).attr('src')){
						imagen_input=$(this).attr('src');
					}


					html_formulario+='<div class="comp-contactenos-campo comp-contactenos-campo_input">'+
						( (imagen_input!='')? '<div class="comp-contactenos-img-input '+$(this).attr('tipo')+'"><div class="contenedor-tabla"><div class="contenedor-celda"><img data-src="'+imagen_input+'"></div></div></div>':'' );

						switch($(this).attr('tipo')){
							case 'input':

								html_formulario+='<input id="comp-contactenos-'+$(this).attr('campo')+'" class="'+
									( (imagen_input!='')? 'con_img':'' )+
									' comp-ge-campo-contacto" type="text" data-campo="'+$(this).attr('campo')+'" value="" placeholder="'+$(this).attr('nombre')+'"/> <span class="campo-vacio oculto">Este campo es obligatorio</span>';


								campos_form+='<input type="text" id="campo_form_contacto_'+$(this).attr('campo')+'" name="'+$(this).attr('campo')+'" value="">';
							break;
							case 'textarea':
								html_formulario+='<textarea id="comp-contactenos-'+$(this).attr('campo')+'" class="'+
								( (imagen_input!='')? 'con_img':'' )+
								' comp-ge-campo-contacto" data-campo="'+$(this).attr('campo')+'" placeholder="'+$(this).attr('nombre')+'"></textarea><span class="campo-vacio oculto">Este campo es obligatorio</span>';

								campos_form+='<input type="text" id="campo_form_contacto_'+$(this).attr('campo')+'" name="'+$(this).attr('campo')+'" value="">';
							break;
							case 'checkbox':

								html_formulario+='<input id="'+$(this).data('iddom')+'" class="comp-ge-campo-contacto" type="checkbox" data-campo="'+$(this).attr('campo')+'" value="" placeholder="'+$(this).attr('nombre')+'"/>'+$(this).attr('nombre');

								campos_form+='<input type="text" id="campo_form_contacto_'+$(this).attr('campo')+'" name="'+$(this).attr('campo')+'" value="">';
							break;
							case 'archivo':
							break;

						}

						html_formulario+='</div>';

				});

							


				$(this).find('div').each(function(){
					switch($(this).data('elemento')){
						

/* DESARROLLADO  POR DANTE VIDAL TUEROS*/

						case 'infoextra':

							titulo='';
							if(typeof $(this).data('titulo')=='string'){
								titulo= '<div class="infoextra-titulo '+array_class_extra['infoextra-titulo']+'" '+array_attr_extra['infoextra-titulo']+'>'+$(this).data('titulo')+'</div>' ;
							}

							telefono=$(this).data('telefono');
							email=$(this).data('email');
							direccion=$(this).data('direccion');
							
							html_info_extra=titulo+'<div class="infoextra-telefono '+array_class_extra['infoextra-telefono']+'" '+array_attr_extra['infoextra-telefono']+'>'+telefono+'</div>'+
										'<div class="infoextra-email '+array_class_extra['infoextra-email']+'" '+array_attr_extra['infoextra-email']+'>'+email+'</div>'+
										'<div class="infoextra-direccion '+array_class_extra['infoextra-direccion']+'" '+array_attr_extra['infoextra-direccion']+'>'+direccion+'</div>';
						break;


						case 'ubicanos':

							var aux_comp=new OBJ_COMPONENTES();

							aux_comp.loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=initialize',function(){
							});
						

							latitud=$(this).data('latitud');
							longitud=$(this).data('longitud');
							img_indicador=$(this).data('src');
							
							altura_boton_ubicanos=$(this).data('alturaboton');
							html_ubicanos='<div id="comp-contactenos-google-maps" class="comp-contactenos-btn-gmaps comp-gm-btn" data-idcontactenos="'+obj_dom_contactenos.CONT_CONTACTENOS+'" style="height:'+altura_boton_ubicanos+'px;"></div>';
						break;
						case 'pie':
							altura_pie=$(this).data('altura');	
							texto_pie=$(this).data('texto');	
							html_pie='<div class="comp-contactenos-pie-pagina '+array_class_extra['comp-contactenos-pie-pagina']+'" style="height:'+altura_pie+'px;">'+
									'<div class="comp-contactenos-pie-content">'+		
										'<div class="comp-contactenos-pie-celda">'+						
											'<div class="comp-contactenos-pie-texto">'+texto_pie+'</div>'+
										'</div>'+
									'</div>'+
								'</div>';			
						break;
					}
				});
				
				var html_titulo='';
				
/* DESARROLLADO  POR DANTE VIDAL TUEROS*/
				
				if(typeof $(this).data('titulo')=='string'){					
					html_titulo='<div class="comp-contactenos-titulo '+array_class_extra['comp-contactenos-titulo']+'" '+array_attr_extra['comp-contactenos-titulo']+' >'+
									'<div class="contenedor-tabla">'+
										'<div class="contenedor-celda">'+					
											$(this).data('titulo')+	
										'</div>'+
									'</div>'+			      
								'</div>';
				}

				var palabra_boton='Enviar';
				if(typeof $(this).data('palabraboton')=='string'){					
					palabra_boton=$(this).data('palabraboton');
				}


				formulario='<form method="post"  style="display:none;" enctype="multipart/form-data">'+
					campos_form+
/*id="comp-ge-form-subir_imagen"*/
				'</form>';



				var array_attr_extra=new Array();



					array_html_extra=new Array();
					$(this).find('HtmlExtra').each(function(){

						if(!array_html_extra[$(this).attr('DOMdestino')]){
							array_html_extra[$(this).attr('DOMdestino')]=new Array();
						}
							array_html_extra[$(this).attr('DOMdestino')][$(this).attr('posicion')]=$(this).html();

					});


    
				var html_contactenos='<div class="comp-contactenos-content" style="height: calc(100% - '+(altura_boton_ubicanos + altura_pie+parseInt($(this).data('altura_extra')))+'px);">'+
						'<div class="comp-contactenos-celda">'+
							'<div class="comp-contactenos-alineador '+array_class_extra['comp-contactenos-alineador']+'">'+
								html_titulo+
								'<div class="comp-contactenos-cuerpo '+array_class_extra['comp-contactenos-cuerpo']+'">'+		
									html_formulario+
									'<div class="comp-contactenos-campo comp-contactenos-campo-enviar"><div id="comp-contactenos-enviar">'+
										'<div class="comp-content-enviar">'+palabra_boton+'</div>'+
									'</div></div>'+
									formulario+
								'</div>'+
							'</div>'+
							
							'<div class="info_extra '+array_class_extra['info_extra']+'">'+		
							html_info_extra+		
							'</div>'+
						'</div>'+
					'</div>'+

					html_ubicanos+
					((array_html_extra['comp-contactenos'])? ( (array_html_extra['comp-contactenos']['final'])? array_html_extra['comp-contactenos']['final']: '') :'' ) +  
					html_pie;

				$(this).html(html_contactenos);
				$(this).attr('id','comp-contactenos-'+obj_dom_contactenos.CONT_CONTACTENOS);
				
				altura_window=$(this).data('alturawindow');

				obj_dom_contactenos.ARRAY_CONTACTENOS[obj_dom_contactenos.ARRAY_CONTACTENOS.length]=new OBJ_CONTACTENOS('#comp-contactenos-'+obj_dom_contactenos.CONT_CONTACTENOS,latitud,longitud,img_indicador,altura_window);

			}

			
				for(var i=0;i<obj_dom_contactenos.ARRAY_CONTACTENOS.length;i++){	
					obj_dom_contactenos.ARRAY_CONTACTENOS[i].inicia();	
				}
			
			
/* DESARROLLADO  POR DANTE VIDAL TUEROS*/
			obj_dom_contactenos.CONT_CONTACTENOS++;
		});


				
		//inicializa imagenes
		//inicializa imagenes
		//inicializa imagenes
		//inicializa imagenes
		if(GL_COMPONENTE_CARGANDO){

			GL_COMPONENTE_CARGANDO.carga_imagenes('contactenos',this);
		}
	};

	this.domready=function(){

	};


}



function OBJ_CONTACTENOS(id,latitud,longitud,img_indicador,altura_window){

	this.ID_DOM=id;
	this.INICIADO=false;
	this.latitud=latitud;
	this.longitud=longitud;
	this.img_indicador=img_indicador;
	this.canvas_lanzado=false;
	this.altura_window=altura_window;
	this.auth='djavt';
/*
	this.inicia=function(){
		this.inicia_slider()
	};*/

	this.inicia=function(){

/*
		if(!this.BANNER_INICIADO){
			this.BANNER_INICIADO=true;

			var delay_inicio=setInterval(function(){
				clearInterval(delay_inicio);

				$('#comp-slider-full').removeClass('inicio');

				var delay_circulo=setInterval(function(){
					clearInterval(delay_circulo);
					$('#circulo_banner1').addClass('mostrado');
				},3000);

			},500);
*/
			this.resize();
			
		//}


		try{
			fun_inicia_obj_contactenos(this.ID_DOM);
		}catch(e){

		}
	};

	



	this.resize=function(){
		
		var obj=this;
		//$(this.ID_DOM+' .comp-contactenos-content').css('width',$(window).width()+'px');
	/*	if(obj.altura_window){

			var altura_gmaps=0;
			if($(this.ID_DOM+' .comp-contactenos-btn-gmaps').css('height')){
				altura_gmaps=$(this.ID_DOM+' .comp-contactenos-btn-gmaps').css('height').replace('px','');	
			}

			var altura_pie=0;
			if($(this.ID_DOM+' .comp-contactenos-pie-pagina').css('height')){
				altura_pie=$(this.ID_DOM+' .comp-contactenos-pie-pagina').css('height').replace('px','');
			}
			
			var altura=$(window).height()-altura_gmaps-altura_pie;
			$(this.ID_DOM+' .comp-contactenos-content').css('height',altura+'px');

		}

		if($(window).width()<500){
			$(this.ID_DOM+' .comp-contactenos-alineador').addClass('responsive');

		}else{
			$(this.ID_DOM+' .comp-contactenos-alineador').removeClass('responsive');			
		}
*/


		try{
			fun_resize_obj_contactenos(this.ID_DOM);
		}catch(e){

		}


	};


	this.ejecutar_google_maps=function(){


	  $(this.ID_DOM+' .comp-contactenos-btn-gmaps').removeClass('comp-gm-btn');
	  $(this.ID_DOM+' .comp-contactenos-btn-gmaps').addClass('comp-gm-canvas');
	  	if(!this.canvas_lanzado){
	  		this.canvas_lanzado=true;
	  	obj_aux=this;
		  	var delay=setInterval(function(){
				clearInterval(delay);
		  		obj_aux.carga_google_maps();
		  		
		  	},1000);

	  	}
	};

	 this.carga_google_maps=function(){
	 	var mapa;
            var opcionesMapa = {
                zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP

            };
			
            mapa = new google.maps.Map(document.getElementById('comp-contactenos-google-maps'), opcionesMapa);
            var geolocalizacion = new google.maps.LatLng(this.latitud,this.longitud);
            var image = this.img_indicador;
            var marcador = new google.maps.Marker({
                map: mapa,
                draggable: false,
                position: geolocalizacion,
                visible: true,

                icon: image, animation: google.maps.Animation.DROP
            });
            mapa.setCenter(geolocalizacion);

            var styles = [
                /*{
                    stylers: [
                        {hue: "#bc0d38"},
                        {Weight: 3.5},
                        {saturation: -100}
                    ]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {lightness: 100},
                        {visibility: "simplified"}
                    ]
                }, {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        {visibility: "on"}
                    ]
                }*/
            ];

            mapa.setOptions({styles: styles});
/*
      google.maps.event.addDomListener(window, 'load', drawMap);
        function drawMap() {
            var mapa;
            var opcionesMapa = {
                zoom: 17, mapTypeId: google.maps.MapTypeId.ROADMAP

            };
            mapa = new google.maps.Map(document.getElementById('google_canvas'), opcionesMapa);
            var geolocalizacion = new google.maps.LatLng(-12.1274578, -76.99983179999998);
            var image = "img/indicador.png";
            var marcador = new google.maps.Marker({
                map: mapa,
                draggable: false,
                position: geolocalizacion,
                visible: true,
                icon: image, animation: google.maps.Animation.DROP
            });
            mapa.setCenter(geolocalizacion);

            var styles = [
                {
                    stylers: [
                        {hue: "#bc0d38"},
                        {Weight: 3.5},
                        {saturation: -100}
                    ]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {lightness: 100},
                        {visibility: "simplified"}
                    ]
                }, {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        {visibility: "on"}
                    ]
                }
            ];

            mapa.setOptions({styles: styles});

        }*/
    };
			

	
}