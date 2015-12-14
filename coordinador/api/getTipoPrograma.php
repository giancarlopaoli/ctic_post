<?php
	session_start();

	require_once("config/mysql.php");
	require_once("DAO.php");


	$DAOConsultas=new DAOConsultas();

	$r=$DAOConsultas->getTipoPrograma();
	//var_dump($r);
	
	if($r){
		echo $r;
	}else{
		print 'no data';
	}

?>
