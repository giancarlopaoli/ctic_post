<?php
		

		
class COMP_TABLA{

	var $nombre_tabla='';
	var $estructura;
	
	function COMP_TABLA($nombre_tabla,$estructura_select,$condicion){
		$this->nombre_tabla=$nombre_tabla;

		$this->estructura_select=$estructura_select;
		$this->condicion=$condicion;

	}
}


$GL_ELEMENTOS=array();




$GL_ELEMENTOS['usuario']=new COMP_TABLA('tb_usuario',
		array(   //nombre campo tipo elemento update
		    "id" => array('tipo'=>"id",'permiso'=>0),
		    "nombres" => array('tipo'=>"str",'permiso'=>0),
		    "apellido_p" => array('tipo'=>"str",'permiso'=>0),
		    "apellido_m" => array('tipo'=>"str",'permiso'=>0),
		    "contrasena" => array('tipo'=>"blob",'key'=>'erp_pg','permiso'=>0),
		    "foto" => array('tipo'=>"str",'permiso'=>0),
		    "sexo" => array('tipo'=>"str",'permiso'=>0),
		    
		    "tipo_documento" => array('tipo'=>"str",'permiso'=>0),
		    "n_documento" => array('tipo'=>"str",'permiso'=>0),
		    "telefono" => array('tipo'=>"str",'permiso'=>0),
		    "email" => array('tipo'=>"str",'permiso'=>0),
		    "fecha_creacion" => array('tipo'=>"str",'permiso'=>0)),""
		);




?>