
var GL_CONTACTO= new Array();
var GL_CONT_CONTACTO=0;


function OBJ_MOD_CONTACTO() {

     this.cargando_data=false;

    this.get=function(f){

		var objeto=this;

		this.cargando_data=true;

		$.ajax({
	        url: "get.php",
	        type: "POST",
	        datatype:'json',
	        data:{},
	        async:true,
	        beforeSend: function(objeto){
	        	$('#direccion').html("<p>:o</p>");
	        },

			success: function(data){

			objeto.cargando_data=false;

				if(data=="mysql_no"){
					$('#direccion').html("<p>:(</p>");
			
					$('#telefono').html("<p>:(</p>");
					$('#email').html("<p>:(</p>");
						
				}else{

					if(data!='no data'){
						respuesta=$.parseJSON(data);

						GL_CONTACTO[respuesta.id]=new Array();
						GL_CONTACTO[respuesta.id]=respuesta;

						GL_CONT_CONTACTO++;

							
						$('#direccion').html("<p>"+respuesta.direccion+"</p>");
					    $('#telefono').html("<p>"+respuesta.telefono+"</p>");
					    $('#email').html("<p>"+respuesta.email+"</p>"); 
						
						if(typeof f == 'function'){
							f();
						}
					}
				}
			}
		});
    };
}

$(document).ready(function(){
		mod_contacto=new OBJ_MOD_CONTACTO(false);
		mod_contacto.get();
});
