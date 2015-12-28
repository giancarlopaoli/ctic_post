
$(window).resize(function(){
	
	if(!GL_INICIA_DESDE_MOVIL){
		for(var index in GL_COMPONENTE_LINEAS_TIEMPO.LISTA){
			GL_COMPONENTE_LINEAS_TIEMPO.LISTA[index].resize();
		}
	}
});




$(window).scroll(function(){

	GL_COMPONENTE_LINEAS_TIEMPO.verifica_componente_ventana();
		
});




function OBJ_INICIALIZA_LINEAS_DE_TIEMPO(){


	this.CONT=0;
	this.LISTA=new Array();

	this.ini=function(){
		var obj_aux=this;

		$('.comp-linea-tiempo').each(function(){
			//recogemos todas las imágenes que hay pero debemos verificar si es manual o no

			if($(this).data('tipocarga')=='manual'){	
		
				var html_fondos='';			
				var html_hitos='';		
				var html_hitos_vertical='';	
				var html_info_hitos='';
				var contador=0;	
				var total_elementos=$(this).find('div').length;
				$(this).find('div').each(function(){
					
			        contador++;
			        html_fondos+='<div id="fondo-'+contador+'" class="fondo">'+
						'<img data-src="'+$(this).data('fondosrc')+'">'+
						'</div>';			        
					/*
			        html_textos+='<div class="slide_texto"">'+
			        	obj_slider.genera_content_texto($(this))+
			        	'</div>';*/

			        left_circulo=0;
			        if(contador>1){
			        	//al calcular el left, debemos restar 1 al total de elementos, puesto que debemos calcular los left de los otros elementos ignorando al primero que tiene left=0
			        	left_circulo=100*(contador-1)/(total_elementos-1);
			        }
			        html_hitos+='<div class="circulo-hito" style="left:'+left_circulo+'%;">'+
			        		'<div class="content-circulo-hito">'+
			        			'<div class="circulo"></div>'+
			        		'</div>'+
			        	'</div>';



			        top_circulo=0;
			        if(contador>1){
			        	//al calcular el left, debemos restar 1 al total de elementos, puesto que debemos calcular los left de los otros elementos ignorando al primero que tiene left=0
			        	top_circulo=100*(contador-1)/(total_elementos-1);
			        }
			        html_hitos_vertical+='<div class="circulo-hito" style="top:'+top_circulo+'%;">'+
			        		'<div class="content-circulo-hito">'+
			        			'<div class="circulo"></div>'+
			        		'</div>'+
			        	'</div>';



			        //////////////////////////////////////////////////////

			        left_info_hito=0;
			        width_info_hito=100/(total_elementos-1);
			        if(contador>1){
			        	//al calcular el left, debemos restar 1 al total de elementos, puesto que debemos calcular los left de los otros elementos ignorando al primero que tiene left=0
			        	left_info_hito=100*(contador-1)/(total_elementos-1);
			        	
			        }
			        html_info_hitos+='<div class="seccion-hito" style="left:'+left_info_hito+'%;width:'+width_info_hito+'%;">'+
			        		'<div class="content-info-hito">'+
			        			'<div class="titulo"><span>'+$(this).data('titulo')+'</span></div>'+
			        			'<div class="info"><span>'+$(this).data('descripcion')+'</span></div>'+
			        		'</div>'+
			        	'</div>';
				});


				/*if($(this).data('autoanimado'))*/
				
				height_linea_tiempo_vertical=100-100/contador;
				
				var html_linea_tiempo='<div class="fondos-linea-tiempo">'+
						html_fondos+				      
					'</div>'+
					'<div class="content_linea_tiempo">'+

						'<div class="titulo_linea_tiempo">'+$(this).data('titulo')+'</div>'+

						'<div class="div_linea_tiempo">'+
							'<div class="linea_tiempo_inactiva"></div>'+
							'<div class="content_linea_tiempo_activa">'+
								'<div class="linea_tiempo_activa"></div>'+
							'</div>'+
						'</div>'+


						'<div class="div_hitos data-num='+contador+'">'+
							html_hitos+ 
						'</div>'+


						'<div class="div-info-hitos">'+

						'<div class="div_linea_tiempo_vertical" style="height:'+height_linea_tiempo_vertical+'%;">'+
							'<div class="linea_tiempo_vertical_inactiva"></div>'+
							'<div class="content_linea_tiempo_vertical_activa">'+
								'<div class="linea_tiempo_vertical_activa"></div>'+
							'</div>'+
						'</div>'+

						'<div class="div_hitos_vertical" style="height:'+height_linea_tiempo_vertical+'%;" data-num='+contador+'">'+
							html_hitos_vertical+ 
						'</div>'+

							html_info_hitos+
						'</div>'+
					'</div>';

				$(this).html(html_linea_tiempo);
				$(this).attr('id','comp-linea-tiempo-'+obj_aux.CONT);
				$(this).data('indice',obj_aux.CONT);

					

				obj_aux.LISTA[obj_aux.CONT]=new OBJ_LINEA_DE_TIEMPO('#comp-linea-tiempo-'+obj_aux.CONT);

				if( typeof $(this).data('autoanimado')=='boolean' ){
				
					obj_aux.LISTA[obj_aux.CONT].AUTOANIMADO=$(this).data('autoanimado');

				}

			}
			
			obj_aux.CONT++;

		});

				
		//inicializa imagenes
		//inicializa imagenes
		//inicializa imagenes
		if(GL_COMPONENTE_CARGANDO){

			GL_COMPONENTE_CARGANDO.carga_imagenes('linea_tiempo',this);
		}


		for(var i=0;i<obj_aux.LISTA.length;i++){	
			obj_aux.LISTA[i].resize();	
		}


	};



	this.genera_html_hito=function(obj_dom){
		var html='';
		switch($(obj_dom).data('tipotexto')){

			case 'circulo clasico':
				//'<div class="content_texto">'+$(this).data('texto')+'</div>'
			break;

			case 'texto_dividido':
				html+='<div class="content_texto texto_dividido">'+
					'<div class="texto texto_1">'+$(obj_dom).data('texto')+'</div>'+
					'<div class="texto texto_2">'+$(obj_dom).data('subtexto')+'</div>'+
					'</div>';
			break;
		}
		return html;
	};





	this.domready=function(){

		GL_COMPONENTE_LINEAS_TIEMPO.verifica_componente_ventana();


	};




	this.verifica_componente_ventana=function(){
		

/*
		
		for(var index in GL_COMPONENTE_LINEAS_TIEMPO.LISTA){

			if(!GL_COMPONENTE_LINEAS_TIEMPO.LISTA[index].ANIMACION_EJECUTADA){

				if(GL_COMPONENTE_LINEAS_TIEMPO.LISTA[index].AUTOANIMADO && GL_COMPONENTE_LINEAS_TIEMPO.LISTA[index].ANIMACION_PANTALLA){

					valor_top=$(this.LISTA[index].ID_DOM).offset().top;

					if(((document.body.scrollTop)? document.body.scrollTop :document.documentElement.scrollTop)+$(window).height()/6>= valor_top){
			   	
						GL_COMPONENTE_LINEAS_TIEMPO.LISTA[index].ejecuta_animacion();

				  	}
				}
			}
		}
		
*/



		for(var index in this.LISTA){


			var valor_top=$(this.LISTA[index].ID_DOM).offset().top;


			if(((document.body.scrollTop)? document.body.scrollTop :document.documentElement.scrollTop)+$(window).height()/6>= valor_top){
	   	
				this.LISTA[index].inicia();

		  	}
			
		}


	};


}



function OBJ_LINEA_DE_TIEMPO(id){

	this.ID_DOM=id;
	this.ARRAY_LINEAS_TIEMPO=new Array();
	this.INICIADO=false;
	this.ANIMACION_EJECUTADA=false;
	this.AUTOANIMADO=true;
	this.responsive=false;
	
	
/*
	this.inicia=function(){
		this.inicia_slider()
	};
*/

	this.inicia=function(){

		if(!this.ANIMACION_EJECUTADA){				
			if(this.AUTOANIMADO){
				this.ejecuta_animacion();
			}else{
				this.inicializa_interfaz_sin_animacion();
			}
		}

	};

	



	this.resize=function(){
		var obj=this;
		var delay_banner=setInterval(function(){

		var comprobacion_carga=true;

		$(obj.ID_DOM+' .fondo').each(function(){
		  
		  var w=$(this).find('img').width();
		  var h=$(this).find('img').height();
		  if(w>0 && h>0){      
		  }else{
		    comprobacion_carga=false;
		  }
		}); 
		if(comprobacion_carga){

		clearInterval(delay_banner);

		  $(obj.ID_DOM+' .fondo').each(function(){


		    var w=$(this).find('img').width();
		    var h=$(this).find('img').height();
		    
		    var wf=$(window).width();
		    var hf=$(window).height();
		    var hn,wn;
		    $(obj.ID_DOM+' .fondos-linea-tiempo').css('height',hf+'px');
		    $(obj.ID_DOM+' .fondo').css('height',hf+'px');

		    if(hf>h){ //la pantalla es más grande en altura que la imagen, entonces ajustamos la altura
		      hn=hf;
		      wn=w*hn/h;
		    }else{
		      wn=w;
		      hn=h;
		    }

		    if(wn<wf+100){
		      wn=wf+100;
		      hn=wn*h/w;
		    }

		    $(this).find('img').width(wn);
		    $(this).find('img').height(hn);

		    $(obj.ID_DOM+' .fondos-linea-tiempo').css('width',wf+'px');
		    $(obj.ID_DOM+' .fondo').css('width',wf+'px');

		    var diferencia_h=hn-hf;

		    $(this).css('top','-'+(diferencia_h/2)+'px');


		  });

		}


			var delay_responsive=setInterval(function(){

				clearInterval(delay_responsive);

				obj.responsive=false;
				$(obj.ID_DOM).removeClass('responsive');
				var width_texto=$('.div-info-hitos .seccion-hito .info span').css('width').replace('px','');
			
				if(width_texto<100){

					obj.responsive=true;

					$(obj.ID_DOM).addClass('responsive');

				    $(obj.ID_DOM+' .fondo').addClass('sin_top');
				}else{

				    $(obj.ID_DOM+' .fondo').removeClass('sin_top');
				}


				if(!obj.ANIMACION_EJECUTADA && obj.AUTOANIMADO){
					//esto se hace pues en el responsive de unas líneas atras se necesita que la seccion esté mostrada la primera sección para medir su ancho y así efectuar el responsive respectivo.
					//Sin embargo una vez hecho eso se debe ocultar neuvamente el hito para poder lograr un efecto de inicialización cuando la pantalla esté mostrando la línea de tiempo
				    $(obj.ID_DOM+' .circulo-hito').removeClass('select'); 
				    $(obj.ID_DOM+' .seccion-hito').removeClass('select'); 
				
				}

				try{
					fun_ejecuta_resize_linea_tiempo(obj.ID_DOM);
				}catch(e){

				}
			},100); 

		},100); 

	};



	this.ejecuta_animacion=function(){

		var obj=this;
		
		var tiempo_slide=parseInt($(obj.ID_DOM).data('tiemposlide'))*1000;

		 if(!obj.ANIMACION_EJECUTADA){
		 	
		    $(obj.ID_DOM+' .fondo').first().addClass('mostrado'); 

		    $(obj.ID_DOM+' .div_hitos .circulo-hito').first().addClass('select'); 
		    $(obj.ID_DOM+' .seccion-hito').first().addClass('select'); 

		    $(obj.ID_DOM+' .div_hitos_vertical .circulo-hito').first().addClass('select'); 

		    //$(obj.ID_DOM+' .slide_texto').first().addClass('mostrado'); 

		//deslizamiento del banner
		      var delay_left=setInterval(function(){
		          clearInterval(delay_left);

		          nuevo_left=($(obj.ID_DOM+' .fondo').first().find('img').width()-$(window).width())/3;

		         $(obj.ID_DOM+' .fondo').last().css('left','0px');
		         $(obj.ID_DOM+' .fondo').first().css('left','-'+nuevo_left+'px');

		     },500);

		  		obj.ANIMACION_EJECUTADA=true;

		  }

		  var interval_fondo=setInterval(function(){

		    if(!$(obj.ID_DOM+' .fondo.mostrado').is(':last-child')){	


		       var mostrado_aux=$(obj.ID_DOM+' .fondo.mostrado');

		       var circulo_aux=$(obj.ID_DOM+' .div_hitos .circulo-hito.select').last();
		       var seccion_hito_aux=$(obj.ID_DOM+' .seccion-hito.select').last();

		       var v_circulo_aux=$(obj.ID_DOM+' .div_hitos_vertical .circulo-hito.select').last();

		       //var mostrado_texto_aux=$(obj.ID_DOM+' .slide_texto.mostrado');

		       $(obj.ID_DOM+' .fondo.mostrado').removeClass('mostrado');

		       /*$(obj.ID_DOM+' .circulo-hito').removeClass('select');*/
		       //$(obj.ID_DOM+' .slide_texto.mostrado').removeClass('mostrado');

		       $(mostrado_aux).next().addClass('mostrado');
		       //$(mostrado_texto_aux).next().addClass('mostrado');

		       //animamos la línea de tiempo horizontal
		    	$(circulo_aux).next().addClass('select');
		    	$(seccion_hito_aux).next().addClass('select');



		    	$(obj.ID_DOM+' .div_linea_tiempo .linea_tiempo_activa').css('width',(100*($(obj.ID_DOM+' .div_hitos .circulo-hito.select').length-1)/($(obj.ID_DOM+' .div_hitos .circulo-hito').length-1))+'%');
		    	
		       //animamos la línea de tiempo vertical
		    	$(v_circulo_aux).next().addClass('select');


		    	$(obj.ID_DOM+' .div_linea_tiempo_vertical .linea_tiempo_vertical_activa').css('height',(100*($(obj.ID_DOM+' .div_hitos_vertical .circulo-hito.select').length-1)/($(obj.ID_DOM+' .div_hitos_vertical .circulo-hito').length-1))+'%');

		    	

		        //deslizamiento del banner
		        var delay_left=setInterval(function(){
		        clearInterval(delay_left);

		        var  nuevo_left=($(obj.ID_DOM+' .fondo.mostrado img').width()-$(window).width())/3;

		           $(obj.ID_DOM+' .fondo.mostrado').prev().css('left','0px');
		           $(obj.ID_DOM+' .fondo.mostrado').css('left','-'+nuevo_left+'px');

		        },500);

		    }else{
		    	clearInterval(interval_fondo);
		    	//termina animación
		    }

		 
		    
		  },tiempo_slide);

	};


	this.inicializa_interfaz_sin_animacion=function(){
						 	
	    $(this.ID_DOM+' .fondo').first().addClass('mostrado'); 
	    $(this.ID_DOM+' .circulo-hito').first().addClass('select'); 
	    $(this.ID_DOM+' .seccion-hito').first().addClass('select'); 

	
	};

}