 <?php
	session_start();

	require_once("config/mysql.php");
	require_once("DAO.php");

	$DAOConsultas=new DAOConsultas();
	$objDatos = json_decode(file_get_contents("php://input"));

	$r=$DAOConsultas->getCursoDetalle_by_id($objDatos);

	if($r){
		echo $r;
	}else{
		print 'no data';
	}
?>