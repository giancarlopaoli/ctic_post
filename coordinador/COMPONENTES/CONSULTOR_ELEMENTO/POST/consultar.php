<?php
session_start();


require_once("../../UTIL_PHP/variables_globales.php");
require_once("../../UTIL_PHP/armador_sql.php");

require_once("../../CONEXION/Conexion.php");
require_once("../DAO/DAOConsultor.php");
require_once("config.php");




$elemento=$_POST['elemento'];

$partes_sql=fun_armar_campos_select($GL_ELEMENTOS[$elemento]);

if($partes_sql['error']){

	echo json_encode($partes_sql);

}else{

	$DAOConsultor=new DAOConsultor();

	$condicion='';

	if($GL_ELEMENTOS[$elemento]->condicion!='' ){
		if($_POST['id_servicio']==''){
			$_POST['id_servicio']='0';
		}
		$condicion=str_replace('{id_servicio}',$_POST['id_servicio'],$GL_ELEMENTOS[$elemento]->condicion);
	}

	$resultado=$DAOConsultor->fun_select_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,$partes_sql['campos'],$condicion,'',$_POST['indice'],$_POST['conteo']);

	if(!$resultado['error']){
		$resultado = array("campo_id"=>$partes_sql['campo_id'], "data"=>$resultado);
	}

	echo json_encode($resultado);
}

?>