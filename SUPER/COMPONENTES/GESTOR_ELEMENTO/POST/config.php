<?php
		

		
class COMP_TABLA{

	var $nombre_tabla='';
	var $estructura;
	
	function COMP_TABLA($nombre_tabla,$estructura_insert,$estructura_update){
		$this->nombre_tabla=$nombre_tabla;

		$this->estructura_insert=$estructura_insert;
		$this->estructura_update=$estructura_update;
	}
}


$GL_ELEMENTOS=array();




$GL_ELEMENTOS['usuario']=new COMP_TABLA('tb_usuario',array(   //nombre campo tipo elemento update

		    "nombres" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "apellido_p" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "apellido_m" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),    
		    "foto" => array('tipo'=>"file",'sesion'=>false,'obligatorio'=>true),	   	
		    "id" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "contrasena" => array('tipo'=>"blob",'key_encrypt'=>'erp_pg','sesion'=>false,'obligatorio'=>true),	

		    "sexo" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),		


		    "tipo_documento" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "n_documento" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),  
		    "telefono" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),  
		    "email" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "fecha_creacion" => array('tipo'=>"date",'now'=>true,'sesion'=>false,'obligatorio'=>false)
		    )
		,array(   //nombre campo tipo elemento update
		    "id" => array('tipo'=>"id_str",'sesion'=>false,'obligatorio'=>false),

		    "nombres" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "apellido_p" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "apellido_m" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),    
		    "foto" => array('tipo'=>"file",'sesion'=>false,'obligatorio'=>false),	   		

		    "sexo" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),		

		    "contrasena" => array('tipo'=>"blob",'key_encrypt'=>'erp_pg','sesion'=>false,'obligatorio'=>true),

		    "tipo_documento" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),
		    "n_documento" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),  
		    "telefono" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true),  
		    "email" => array('tipo'=>"str",'sesion'=>false,'obligatorio'=>true))
		);




?>