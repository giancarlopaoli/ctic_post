


function OBJ_INICIALIZA_CONSULTOR_ELEMENTO(){


	this.CONT=0;
	this.LISTA=new Array();

	this.ini=function(){

		var obj=this;


		$('.comp-consultor-elemento').each(function(){
			//recogemos todas las imágenes que hay pero debemos verificar si es manual o no


			var estructura='';
                $(this).find('estructura').each(function(){

                	estructura=$(this).html();
                });
                var campos_form='';


				campos_form+='<input type="text" name="elemento" value="'+$(this).data('elemento')+'">';
				campos_form+='<input type="text" name="conteo" value="'+$(this).data('conteo')+'">';
				campos_form+='<input type="text" name="indice" value="0">';


                $(this).find('dato').each(function(){

					campos_form+='<input type="text" id="campo_form_'+$(this).data('id')+'" name="'+$(this).data('id')+'" value="'+$(this).data('valor')+'">';
                });


				formulario='<form method="post"  style="display:none;" enctype="multipart/form-data">'+
					campos_form+					
				'</form>';

				recarga='';

				if(typeof $(this).data('recarga')=='boolean' ){
					if($(this).data('recarga')){
						recarga='<div class="comp-consultor-recarga" data-elemento="'+$(this).data('elemento')+'">Cargar m&aacute;s</div>';
					}
				}	
				$(this).html(formulario+'<div class="comp-consultor-resultados"></div>'+recarga);


				$(this).attr('id','comp-consultor-'+$(this).data('elemento'));

				obj.LISTA[$(this).data('elemento')]=new OBJ_CONSULTOR_ELEMENTO('#comp-consultor-'+$(this).data('elemento'),$(this).data('conteo'),$(this).data('elemento'),estructura,$(this).data('dir_imagenes'));

				obj.LISTA[$(this).data('elemento')].consultar();
			

		});


		for(var i=0;i<obj.CONT;i++){	
			obj.LISTA[i].inicia();	
		}
	
				
		//inicializa imagenes
		//inicializa imagenes
		//inicializa imagenes
		if(GL_COMPONENTE_CARGANDO){

			GL_COMPONENTE_CARGANDO.carga_imagenes('consultor_elemento',this);
			GL_COMPONENTE_CARGANDO.asignar_fondos_css_img();
		}
		//this.domready();
	};

	this.domready=function(){

		var objeto=this;

			$('body').on('click','.elemento',function(){
				objeto.LISTA[$(this).parents('.comp-consultor-elemento').data('elemento')].seleccionar_elemento($(this).data('id_elemento'));
			});


			$('body').on('click','.comp-consultor-recarga',function(){

				objeto.LISTA[$(this).data('elemento')].consultar();
			});

			

	};


}




function OBJ_CONSULTOR_ELEMENTO(id,conteo,elemento,estructura,dir_imagenes){

	this.ID_DOM=id;
	this.datos=new Array();
	this.conteo=conteo;
	this.indice=0;
	this.elemento=elemento;
	this.estructura=estructura;
	this.dir_imagenes=dir_imagenes;
	this.inicia=function(){};
	this.resize=function(){
	};

	this.seleccionar_elemento=function(id_elemento){


		$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"]').attr('data-accion','update');		


/*
		if($('.comp-gestion-elemento[data-elemento="'+this.elemento+'"]').data('gestion')=='update'){							
		}*/


		$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] #campo_form_id_elemento').val(id_elemento);

		for(var campo in this.datos[id_elemento]){
			

			if($('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"]').data('esimagen')=='si'){

		        var nodo_img='<div class="comp-ge-vista_previa" style="background-image: url('+this.dir_imagenes+'/'+this.datos[id_elemento][campo]+');" data-origen="bd" ></div>';

				$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"] .comp-ge-vistas_previas').html(nodo_img);

			}else{

				if($('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"]').data('esarchivo')=='si'){


					if(this.datos[id_elemento][campo]!=''){

	 					var nodo_img='';
			            /*if(file.type.match(/pdf/)){*/
			        		nodo_img='<div class="comp-ge-vista_previa comp-ge-vista_previa-eliminar" data-tipo="pdf" data-indice="0" style="" data-origen="bd" ></div>';
			            //}  

						$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"] .comp-ge-vistas_previas').html(nodo_img);

					}else{

						$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"] .comp-ge-vistas_previas').html('');
					}

				}else{


	/*				if(typeof $(this).data('radiogrupo')=='string'){

						radio_grupo=$(this).data('radiogrupo');
						//valores[$(this).data('campo')]=$('.comp-ge-campo-data[data-radiogrupo="'+radio_grupo+'"] input[name='+radio_grupo+']:checked').val();

						$('#comp-ge-'+id_componente+' form #campo_form_'+$(this).data('campo')).val($('.comp-ge-campo-data[data-radiogrupo="'+radio_grupo+'"] input[name='+radio_grupo+']:checked').val());

						
					}else{
						
	*/

						//valores[$(this).data('campo')]=$(this).val();
						if($('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"]').attr('type')=='checkbox'){
							
							$(this).prop('checked',this.datos[id_elemento][campo]);


						}else{

							$('.comp-gestion-elemento[data-elemento="'+this.elemento+'"] .comp-ge-campo-data[data-campo="'+campo+'"]').val(this.datos[id_elemento][campo]);
						}
	/*
					}*/
				}
			}

		}
		
	};

	this.reset=function(){
		this.indice=0;
		this.datos=new Array();
	};

	this.consultar=function(f){


		$('.comp-consultor-elemento[data-elemento="'+this.elemento+'"] form input[name="indice"]').val(this.indice);

		var formData  = new FormData($('.comp-consultor-elemento[data-elemento="'+this.elemento+'"] form')[0]);


		var objeto=this;
		$.ajax({
	        url: "COMPONENTES/CONSULTOR_ELEMENTO/POST/consultar.php",	
	        type: "POST",//Y EN DATA SE ALOJARAN EN NUEVAS VARIABLES
	        
    		//data:{elemento:objeto.elemento,indice:objeto.indice,conteo:objeto.conteo}, 
    		data:formData, 
	        async:true,
		    cache: false,
		    contentType: false,
		    processData: false,
	        beforeSend: 
			function(){
				//$(objeto.ID_DOM+' .comp-consultor-resultados').html('Consultando...');
	        },
			success: function(data){
				
				var  data=$.parseJSON(data);

				if(data.error){
				
					switch(data.detalle){
						case 'mysql':
							FMSG_ERROR_CONEXION();
						break;
					}

					try{
						fun_ejecuta_comp_consultor_consulta(objeto.elemento,data);
					}catch(e){
					}

				}else{

					var html_resultado='';

						if(!data.data.vacio){


							var estructura='';
							var campo_id=data.campo_id;
							data=data.data;
							for(var index in data){
								estructura=objeto.estructura;

								if(!objeto.datos[data[index][campo_id]]){
									
									objeto.datos[data[index][campo_id]]=data[index];

									for(var campo in data[index]){
										while(estructura.indexOf('{'+campo+'}')!=-1){
											estructura=estructura.replace('{'+campo+'}',data[index][campo]);
										}
									}

									objeto.indice++;
									html_resultado+=estructura;
								
								}

							}



						}else{
							$(objeto.ID_DOM+' .comp-consultor-recarga').html('No se encontraron m&aacute;s datos');
							$(objeto.ID_DOM+' .comp-consultor-recarga').addClass('inactivo');
						}


					$(objeto.ID_DOM+' .comp-consultor-resultados').append(html_resultado);

						if(typeof f=="function"){
							f(data);
						}


					try{

						fun_ejecuta_comp_consultor_consulta(objeto.elemento,data);

					}catch(e){

					}
				}
			}
			        
		});	

	};


	this.agregar_elemento=function(campo_id,elemento){

		var html_resultado='';
		var estructura='';


		estructura=this.estructura;	
		this.datos[elemento[campo_id]]=elemento;
		
		for(var campo in elemento){
			
			while(estructura.indexOf('{'+campo+'}')!=-1){
				estructura=estructura.replace('{'+campo+'}',elemento[campo]);
			}

		}

		html_resultado+=estructura;
		this.indice++;

		$(this.ID_DOM+' .comp-consultor-resultados').append(html_resultado);

	};

	this.actualizar_elemento=function(campo_id,elemento){

		if(this.datos[elemento[campo_id]]){


			var estructura='';
			id_elemento=elemento[campo_id];
			estructura=this.estructura;	
			
			
			for(var campo in elemento){

				this.datos[elemento[campo_id]][campo]=elemento[campo];

			}


			for(var campo in this.datos[elemento[campo_id]]){
			
				while(estructura.indexOf('{'+campo+'}')!=-1){
					estructura=estructura.replace('{'+campo+'}',this.datos[elemento[campo_id]][campo]);
				}

			}

			$( this.ID_DOM+' .elemento[data-id_elemento="'+id_elemento+'"]' ).replaceWith( estructura );


		}

	};



	this.eliminar_elemento=function(id_elemento){

		if(this.datos[id_elemento]){

			delete this.datos[id_elemento];

			this.indice--;

			$( this.ID_DOM+' .elemento[data-id_elemento="'+id_elemento+'"]' ).remove();


		}

	};



}




