<?php

session_start();
require_once('../api/config/mysql.php');

$usuario  = $_POST['usuario'];
$password = $_POST['password'];

$rpta['login']=0;

$db       = new DBConnect();
$dbh      = $db->enchufalo();

$q        = 'SELECT username, id_grupo, nombres, apellido_paterno FROM tb_usuarios WHERE username = :username AND password = :password';
$stmt     = $dbh->prepare($q);
$stmt->bindParam(':username', $usuario,PDO::PARAM_STR);
$stmt->bindParam(':password', $password,PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);

if ( $r ) {
	$_SESSION['id_usuario'] = $r['username'];
	$_SESSION['id_grupo'] = $r['id_grupo'];
	$_SESSION['nombre'] = $r['nombres'];
	$_SESSION['apellido'] = $r['apellido_paterno'];
	
	$rpta['login']="ok";

	if($r['id_grupo']==1){
	 header('location:../administracion');
	}
	if($r['id_grupo']==2){
	 header('location:../coordinador');
	}
}
else{
	session_destroy();
	
	header('location: index.html');
}


?>