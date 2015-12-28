<?php

class DAOConsultor extends Conexion{
	
	function fun_select_elemento($nombre_tabla,$campos_get,$condicion,$orderby,$inicio,$numero){ //INGRESA UN NUEVO PADRE 
		
        $cn = $this->conexion();
        
        if($cn!="no_conexion"){
	        	        
			$cn->query('BEGIN');
			try{

				$limitacion='';
				if($numero>0){
					$limitacion=' limit '.$inicio.','.$numero;
				}
				if($condicion==''){
					$condicion='1';
				}
		        $sql='select '.$campos_get.' from '.$nombre_tabla.' where '.$condicion.$orderby.$limitacion;		     	




		     	$rs=$cn->query($sql);

				while($fila=mysqli_fetch_object($rs)){
					$respuesta[]=$fila;
				}
				        	         
				$cn->query('COMMIT');
		       	
				mysqli_close($cn);
				
				if( $respuesta){
					return $respuesta;

				}else{

					return array("error"=>false, "vacio"=>true);
				}
			
			}catch(Exception $ex){
		      	             
				$cn->query('ROLLBACK');	
				mysqli_close($cn);
				
				return array("error"=>true,'detalle'=>'mysql');			
			}			
		
		}else{
			return array("error"=>true,'detalle'=>'mysql');	
		}
	}	


	
}

?>