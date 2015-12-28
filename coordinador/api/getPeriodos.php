<?php
	session_start();

	require_once("config/mysql.php");
	require_once("DAO.php");

	$DAOConsultas=new DAOConsultas();

	$r=$DAOConsultas->getPeriodos();
	//var_dump($r);

	if($r){
	       echo $r;
	}else{
	       print 'no data';
	}

?>
