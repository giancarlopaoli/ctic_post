<?php
	session_start();

	require_once('../../api/config/mysql.php');
	require_once("DAO.php");


	$DAOConsultas=new DAOConsultas();

	$r=$DAOConsultas->getCursos();
	//var_dump($r);
	
	if($r){
		echo $r;
	}else{
		print 'no data';
	}

?>
