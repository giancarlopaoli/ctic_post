<?php
session_start();


require_once("../../UTIL_PHP/variables_globales.php");
require_once("../../UTIL_PHP/armador_sql.php");

require_once("../../CONEXION/Conexion.php");
require_once("../DAO/DAOGestor.php");
require_once("config.php");


$elemento=$_POST['elemento'];
$imagen=$_POST['hay_imagen'];
$id_elemento=$_POST['id_elemento'];

unset($_POST['hay_imagen']);
unset($_POST['elemento']);
unset($_POST['id_elemento']);



$partes_sql=fun_armar_campos_update($GL_ELEMENTOS[$elemento],$_POST,$_FILES);





if($partes_sql['error']){

	echo json_encode($partes_sql);
}else{


$data_elemento = new ArrayObject($partes_sql['data_elemento']);

	$DAOGestor=new DAOGestor();


	switch($elemento){


		case 'usuario':


			$condicion='id="'.$id_elemento.'"';
			$resultado=$DAOGestor->fun_update_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,$partes_sql['set'],$condicion);



			if(!$resultado['error']){


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
						$nombre_img=$id_elemento.'_'.rand(10000,20000);

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
							$respuesta_img=$DAOGestor->fun_update_elemento($GL_ELEMENTOS[$elemento]->nombre_tabla,'foto="'.$nombre_img.'.'.$ext.'"',$condicion);
						}
					}else{


					}


			
			}
		break;




	}


if(isset($id_elemento) && $id_elemento!=0){
	$resultado['campo_id']=$partes_sql['campo_id'];
	$data_elemento[$partes_sql['campo_id']]=$id_elemento;

}else{

	$resultado['campo_id']='id';
}


	$resultado['elemento']=$data_elemento;

	echo json_encode($resultado);

}




?>