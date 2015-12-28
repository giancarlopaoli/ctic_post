<?php
session_start();

	require_once("config/mysql.php");
	require_once("DAO.php");

	$DAOUsuarios=new DAOConsultas();

	$r=$DAOUsuarios->getUsuarios();

	if($r){
		echo $r;
	}else{
		print 'no data';
	}

?>
