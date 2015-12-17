 <?php
	session_start();

	require_once("config/mysql.php");
	require_once("DAO.php");

	$DAOConsultas=new DAOConsultas();
	$objDatos = json_decode(file_get_contents("php://input"));

	$r=$DAOConsultas->getCursos_by_plan($objDatos->plan);

	if($r){
		echo $r;
	}else{
		print 'no data';
	}

?>
