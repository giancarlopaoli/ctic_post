<?php
session_start();

	require_once('../../api/config/mysql.php');
	require_once("DAO.php");

	$DAOConsultas=new DAOConsultas();
	$objDatos = json_decode(file_get_contents("php://input"));

	$r=$DAOConsultas->eliminar_UNI($objDatos->id);
	print $r;

?>