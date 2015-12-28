<?php
session_start();

require_once("../../UTIL_PHP/verificacion.php");

require_once("../../UTIL_PHP/phpmailer/class.phpmailer.php");
require_once("config.php");

if(valida_string_correo($_POST['correo'])){

	$mail=new PHPMailer();
	$mail->Mailer="smtp";
	$mail->IsSMTP();
	$mail->Helo = $GL_DIR_PAGINA; //Muy importante para que llegue a hotmail y otros
	$mail->SMTPAuth=true;
	$mail->Host = $GL_HOST_MAIL;
	$mail->Port=25; //depende de lo que te indique tu ISP. El default es 25, pero nuestro ISP lo tiene puesto al 26
	$mail->Username = $GL_USER_MAIL;
	$mail->Password=$GL_PASS_USER_MAIL;
	$mail->From=$_POST['correo'];
	$mail->FromName=$_POST['nombre'];
	$mail->Timeout=60;
	$mail->IsHTML(true);
	//Enviamos el correo
	//$mail->AddAddress($GL_USER_MAIL); 


	$mail->AddAddress($GL_RECEPTOR_MAIL);

	$mail->Subject=$_POST['nombre'].' se puso en contacto desde la Web '.$GL_NOMBRE_PAGINA;
	$body='
	<br/>	
	<div><h3>Visitante</h3>'.$_POST['nombre'].' </div><br>	
	<div><h3>Correo</h3>'.$_POST['correo'].'</div><br>		
	<div><h3>Telefono</h3>'.$_POST['telefono'].'</div><br>		
		<h3>Mensaje</h3> '.$_POST['mensaje'].'<br>	
	';
	
	$mail->Body=$body;
	//$mail->AltBody="Texto que debe decir lo mismo que el Body, pero sin etiquetas HTML";
	$mail->Send();	
										
	$respuesta="mysql_si";

	echo $respuesta;	
			
			
}else{
	echo 'error_correo';
}

			

?>