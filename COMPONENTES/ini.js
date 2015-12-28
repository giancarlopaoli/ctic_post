
var GL_INICIA_DESDE_MOVIL=false;

var GL_COMPONENTE_SLIDERS;
var GL_COMPONENTE_LINEAS_TIEMPO;
var GL_COMPONENTE_CONTACTENOS;
var GL_COMPONENTE_MENU_FIJO;
var GL_COMPONENTE_CARGANDO;
var GL_COMPONENTE_VISOR_FOTOS;
var GL_COMPONENTE_NOSOTROS;
var GL_COMPONENTE_INFORMACION;
var GL_COMPONENTE_CONSULTOR_ELEMENTOS;

/*
		GL_COMPONENTE_CARGANDO.elementos_a_cargar+= $(obj.ID_DOM+' img').length;


		$(obj.ID_DOM+' img').each(function(){
			if(!$(this).attr('src') || $(this).attr('src')==''){	

			
				$(this).attr('onload',function(){
					
				});
				$(this).attr('src',$(this).data('src'));
			}
		});
*/

$(document).ready(function(){

	if($(window).width()<700 ){
		GL_INICIA_DESDE_MOVIL=true;
	}

	var comp=new OBJ_COMPONENTES();

	comp.loadCSS('COMPONENTES/estilo.css');

	comp.loadScript('COMPONENTES/config.js',function(){


		comp.loadScript('COMPONENTES/CARGANDO/JS/ini.js',function(){
			comp.loadCSS('COMPONENTES/CARGANDO/CSS/estilos.css',function(){

				GL_COMPONENTE_CARGANDO=new OBJ_INICIALIZA_CARGANDO(3);
				GL_COMPONENTE_CARGANDO.ini();
			
				comp.loadScript('COMPONENTES/ANIMACION/JS/ini.js',function(){
					comp.loadCSS('COMPONENTES/ANIMACION/CSS/estilos.css',function(){

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
				comp.loadScript('COMPONENTES/MENU_FIJO/JS/ini.js',function(){
					comp.loadCSS('COMPONENTES/MENU_FIJO/CSS/estilos.css',function(){

						GL_COMPONENTE_MENU_FIJO=new OBJ_INICIALIZA_MENUS_FIJOS();
						GL_COMPONENTE_MENU_FIJO.ini();
						
					});
				});

				comp.loadScript('COMPONENTES/GESTOR_ELEMENTO/JS/ini.js',function(){
					comp.loadCSS('COMPONENTES/GESTOR_ELEMENTO/CSS/estilos.css',function(){

						GL_COMPONENTE_GESTOR_ELEMENTOS=new OBJ_INICIALIZA_GESTION_ELEMENTO();
						GL_COMPONENTE_GESTOR_ELEMENTOS.ini();	

					});
				});

				comp.loadScript('COMPONENTES/CONSULTOR_ELEMENTO/JS/ini.js',function(){
					comp.loadCSS('COMPONENTES/CONSULTOR_ELEMENTO/CSS/estilos.css',function(){

						GL_COMPONENTE_CONSULTOR_ELEMENTOS=new OBJ_INICIALIZA_CONSULTOR_ELEMENTO();
						GL_COMPONENTE_CONSULTOR_ELEMENTOS.ini();
						
					});
				});

		/*
	*/
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

					});
				});

			});
		});

	});



	
});



function OBJ_COMPONENTES(){
	this.loadScript=function(src,f){
		
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.type = 'text/javascript';
		script.src = src;
		var done = false;
		script.onload = script.onreadystatechange = function() { 
			if(src=='https://maps.googleapis.com/maps/api/js?v=3.exp'){
			alert(this.readyState);
			}
		// attach to both events for cross browser finish detection:
		if ( !done && (!this.readyState ||
		  this.readyState == "loaded" || this.readyState == "complete") ) {
		  done = true;
		  if (typeof f == 'function') f();
		  // cleans up a little memory:
		  script.onload = script.onreadystatechange = null;
		  head.removeChild(script);
		}
		};
		head.appendChild(script);
	};


var GL_DELAYS_LOAD_CSS=new Array();
	this.loadCSS=function(href, f){


		var url = href,
		    head = document.getElementsByTagName('head')[0];
		    link = document.createElement('link');
		 
		link.type = "text/css";
		link.rel = "stylesheet"
		link.href = url;

			// MAGIC
			  // #1
			  link.onload = function () {
			    	
				if(typeof f == 'function'){ 


					GL_DELAYS_LOAD_CSS[href]=setInterval(function(indice){
						clearInterval(GL_DELAYS_LOAD_CSS[indice]);
						f();
					},100,href);

					 };
			  };

		head.appendChild(link);


			  // #2
			/*  if (link.addEventListener) {
			    link.addEventListener('load', function() {
			      CSSDone("DOM's load event");
			    }, false);
			  }
			  // #3
			  link.onreadystatechange = function() {
			    var state = link.readyState;
			    if (state === 'loaded' || state === 'complete') {
			      link.onreadystatechange = null;
			      CSSDone("onreadystatechange");
			    }
			  };
			  
			  // #4
			  var cssnum = document.styleSheets.length;
			  var ti = setInterval(function() {
			    if (document.styleSheets.length > cssnum) {
			      // needs more work when you load a bunch of CSS files quickly
			      // e.g. loop from cssnum to the new length, looking
			      // for the document.styleSheets[n].href === url
			      // ...
			      
			      // FF changes the length prematurely :()
			      CSSDone('listening to styleSheets.length change');
			      clearInterval(ti);
			      
			    }
			  }, 10);*/



/*
		var css_link = $("<link>", {
		  rel: "stylesheet",
		  type: "text/css",
		  href: href
		});
		css_link.appendTo('head');*/
		//

	};
}

