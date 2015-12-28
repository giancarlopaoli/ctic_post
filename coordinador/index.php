<?php 
session_start();
if(!isset($_SESSION['id_usuario'])){	
      header('location:../admin');
}else{
	switch($_SESSION['id_grupo']){
		case 1:
      	header('location:../SUPER');
    break;
}
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 TRANSITIONAL//EN">
<html ng-app='angularCoordinadorApp'>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>ERP posgrado</title>

<link rel="stylesheet" href="../vendor/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="../vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="default.css" />
<link rel="stylesheet" type="text/css" href="../CSS/estilo.css" />
<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.min.css" rel="stylesheet" />

</head>


<body ng-controller='coordinadorController'>

<section>
  <div id="cargando" class="comp-cargando" data-srclogo="">

    <div data-elemento="imagen" data-src="../img/logo-uni.png" data-expandido="false"></div>
    <div data-elemento="barra"></div>
  </div>
</section>


	<div id="maincontent">
		<div id="cabecera" ng-controller="cabecera" >
			<div id="fecha"><span class="centrado">Martes 20 de octubre del 2015</span></div>
			<div id="bienvenida"><span class="derecha">Bienvenido <?php echo $_SESSION['nombre'].' '.$_SESSION['apellido']?></span>


  <button type="button" class="btn" id="logout" ng-click="logout()">cerrar sesión</button>
 

  </button>
 


			</div>
		</div>

		<div id="cuerpo">


			<div id="menu">

			      <div class="comp-menu-fijo comp-animacion-ini trans_bezier_05"   data-tipo="menu-izquierda" data-animaciondelay="0.5" data-srclogo="../img/logo-uni.png">


			        <ClassExtra DOMdestino="img-logo" class="trans_bezier_05 trans_delay_05 anim-desplaza-arriba anim-oculto-opacity">
			        </ClassExtra>

			        <opcion columna="programas" texto="Programas acad&eacute;micos" >

			          <ClassExtra DOMdestino="comp-menu-opcion" class="trans_bezier_05 trans_delay_06 anim-desplaza-izquierda anim-oculto-opacity">
			          </ClassExtra>


			          <AttrExtra DOMdestino="comp-menu-opcion" atributos="href='#programas'">
			          </AttrExtra>
			        </opcion>


			        <opcion columna="planesestudio" texto="Planes de Estudio" >

			          <ClassExtra DOMdestino="comp-menu-opcion" class="trans_bezier_05 trans_delay_1_02 anim-desplaza-izquierda anim-oculto-opacity">
			          </ClassExtra>

			          <AttrExtra DOMdestino="comp-menu-opcion" atributos="href='#planesestudio'">
			          </AttrExtra>

			        </opcion>

			        <opcion columna="cursos"  texto="Cursos" >

			          <ClassExtra DOMdestino="comp-menu-opcion" class="trans_bezier_05 trans_delay_1_05 anim-desplaza-izquierda anim-oculto-opacity">
			          </ClassExtra>

			          <AttrExtra DOMdestino="comp-menu-opcion" atributos="href='#cursos'">
			          </AttrExtra>
			        </opcion>

			        <opcion columna="periodo_academico"  texto="Periodo Académico" >

			          <ClassExtra DOMdestino="comp-menu-opcion" class="trans_bezier_05 trans_delay_1_05 anim-desplaza-izquierda anim-oculto-opacity">
			          </ClassExtra>

			          <AttrExtra DOMdestino="comp-menu-opcion" atributos="href='#periodo_academico'">
			          </AttrExtra>
			        </opcion>

			        <opcion columna="grupos"  texto="Grupos" >

			          <ClassExtra DOMdestino="comp-menu-opcion" class="trans_bezier_05 trans_delay_1_05 anim-desplaza-izquierda anim-oculto-opacity">
			          </ClassExtra>

			          <AttrExtra DOMdestino="comp-menu-opcion" atributos="href='#grupos'">
			          </AttrExtra>
			        </opcion>
			        
			      </div>
			</div>

			<div id="mainbody"  ng-view>

<!--Angular -->

			</div>
		</div>
	</div>

<script src="../vendor/jquery.min.js"></script>
<script type="text/javascript" src="JS/funciones_generales.js"></script>
<script type="text/javascript" src="COMPONENTES/ini.js"></script>
<script src="../vendor/angular.min.js"></script>
<script src="../vendor/angular-route.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js"></script>

<script src="app/app.js"></script>
<script src="app/controllers.js"></script>

</body>
</html>
