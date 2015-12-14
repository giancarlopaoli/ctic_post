<?php
session_start();


require_once("../../UTIL_PHP/variables_globales.php");
require_once("../../UTIL_PHP/armador_sql.php");

require_once("../../CONEXION/Conexion.php");
require_once("../DAO/DAOGestor.php");
require_once("config.php");



$elemento=$_POST['elemento'];
$imagen=$_POST['hay_imagen'];
unset($_POST['hay_imagen']);
unset($_POST['elemento']);




$partes_sql=fun_armar_campos_insert($GL_ELEMENTOS[$elemento],$_POST,$_FILES);



if($partes_sql['error']){

	echo json_encode($partes_sql);
}else{


$data_elemento = new ArrayObject($partes_sql['data_elemento']);

	$DAOGestor=new DAOGestor();

	$resultado=$DAOGestor->fun_insert_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,$partes_sql['campos'],$partes_sql['valores']);



	if(!$resultado['error']){

			switch($elemento){

				case 'usuario':

					$nombre_campo='foto';
					if($_FILES[$nombre_campo]['error'] == UPLOAD_ERR_OK){
					
									
						$archivo = new ArrayObject($_FILES[$nombre_campo]);
						$tipo_archivo = $archivo['type']; 

						$partes=explode("/",$tipo_archivo);

						$extension_original=$partes[1];
						$extension=$partes[1];

				   		if($extension=='gif'){
				   			$ext='jpeg';
				   		}else{		   			
				   			$ext=$extension;
				   		}
													
						$uploaddir = "../../../IMG/USUARIOS/";						
						$nombre_img=$resultado['id_insert'].'_'.mt_rand(10000,20000);
						
						$valores_tam=array();
						$valores_tam['web']=array();
						$valores_tam['web']['tam_ancho']=300;
						$valores_tam['web']['tam_alto']=300;
						$valores_tam['web']['directorio']=$uploaddir.'WEB/';
						$valores_tam['web']['nombre_final']=$nombre_img.".".$ext;
						$valores_tam['web']['nombre_inicial']=$nombre_img.".".$extension;

						$valores_tam['movil']=array();
						$valores_tam['movil']['tam_ancho']=150;
						$valores_tam['movil']['tam_alto']=150;
						$valores_tam['movil']['directorio']=$uploaddir.'MOVIL/';
						$valores_tam['movil']['nombre_final']=$nombre_img.".".$ext;
						$valores_tam['movil']['nombre_inicial']=$nombre_img.".".$extension;

						$respuesta_img='error_archivo';

						include("subir_img_temp.php");

						$data_elemento['foto']=$nombre_img.'.'.$ext;

						if($respuesta_img!='error_archivo'){
							if($resultado['id_insert']==0){
								$respuesta_img=$DAOGestor->fun_update_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,'foto="'.$nombre_img.'.'.$ext.'"','id="'.$_POST['id'].'"');
							}else{
								$respuesta_img=$DAOGestor->fun_update_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,'foto="'.$nombre_img.'.'.$ext.'"','id='.$resultado['id_insert']);
							}
							
						}

					}else{

						$data_elemento['foto']='';
					}



				break;

			}
	
	}


if(isset($resultado['id_insert']) && $resultado['id_insert']!=0){
	$resultado['campo_id']=$partes_sql['campo_id'];
	$data_elemento[$partes_sql['campo_id']]=$resultado['id_insert'];

}else{

	$resultado['campo_id']='id';
}
	$resultado['elemento']=$data_elemento;

	
	echo json_encode($resultado);

}




?>

