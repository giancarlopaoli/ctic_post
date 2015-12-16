<?php
class DAOConsultas extends DBConnect{


	function getInstitucion(){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT * FROM tb_institucion';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getUsuarios(){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_usuario, username, nombres, apellido_paterno, apellido_materno, gr.nombre_grupo, un.abreviatura, created_at
		from tb_usuarios us left join tb_grupos gr on (us.id_grupo=gr.id_grupo) left join tb_unidad un on (us.id_unidad=un.id_unidad)';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getUsuario_by_id($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_usuario, username, nombres, apellido_paterno, apellido_materno, us.id_grupo, gr.nombre_grupo, nro_documento,fecha_nacimiento,direccion, referencia,
un.nombre_unidad, un.id_unidad, sexo, telefono, celular, correo_personal, correo_uni,  td.id_tipo_documento, td.tipo_documento from tb_usuarios us 
left join tb_grupos gr on (us.id_grupo=gr.id_grupo) left join tb_unidad un on (us.id_unidad=un.id_unidad) left join tb_tipo_documento td on 
(us.id_tipo_documento=td.id_tipo_documento) where id_usuario=:id_usuario';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_usuario',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

		return json_encode($r);
		//return $r;

	}

	function crear_Usuario($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);

		$q = 'INSERT INTO tb_usuarios (`username`,`password`,`nombres`,`apellido_paterno`,`apellido_materno`,`id_grupo`,`id_unidad`,`id_tipo_documento`,`nro_documento`,`sexo`,`fecha_nacimiento`,`direccion`,`referencia`,`telefono`,`celular`,`correo_personal`,`correo_uni`,`created_at`,`updated_at`,`last_login`) 
				values (:username, :password, :nombres, :apellido_paterno, :apellido_materno, :id_grupo, :id_unidad, :id_tipo_documento, :nro_documento, :sexo, :fecha_nacimiento, :direccion, :referencia, :telefono, :celular, :correo_personal, :correo_uni, CURRENT_TIMESTAMP, null, null)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':username',  $dato->codigo, PDO::PARAM_STR);
		$stmt->bindParam(':password',  $dato->ndocumento, PDO::PARAM_STR);
		$stmt->bindParam(':nombres',  $dato->nusuario, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_paterno',  $dato->apellidop, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_materno',  $dato->apellidom, PDO::PARAM_STR);
		$stmt->bindParam(':id_grupo',  $dato->perfil, PDO::PARAM_STR);
		$stmt->bindParam(':id_unidad',  $dato->unidad, PDO::PARAM_STR);
		$stmt->bindParam(':id_tipo_documento',  $dato->tdocumento, PDO::PARAM_STR);
		$stmt->bindParam(':nro_documento',  $dato->ndocumento, PDO::PARAM_STR);
		$stmt->bindParam(':sexo',  $dato->sexo, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_nacimiento',  $dato->fnacimiento, PDO::PARAM_STR);
		$stmt->bindParam(':direccion',  $dato->direccion, PDO::PARAM_STR);
		$stmt->bindParam(':referencia',  $dato->referencia, PDO::PARAM_STR);
		$stmt->bindParam(':telefono',  $dato->telefono, PDO::PARAM_STR);
		$stmt->bindParam(':celular',  $dato->celular, PDO::PARAM_STR);
		$stmt->bindParam(':correo_personal',  $dato->mailPersonal, PDO::PARAM_STR);
		$stmt->bindParam(':correo_uni',  $dato->mailUni, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function modificar_Usuario($dato){ 
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'UPDATE tb_usuarios SET username=:username, nombres=:nombres, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, id_grupo=:id_grupo, id_unidad=:id_unidad, id_tipo_documento=:id_tipo_documento,
					nro_documento=:nro_documento, sexo=:sexo, fecha_nacimiento=:fecha_nacimiento, direccion=:direccion, referencia=:referencia, telefono=:telefono, celular=:celular, correo_personal=:correo_personal, correo_uni=:correo_uni
				WHERE id_usuario=:id_usuario';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_usuario',  $dato->id_usuario, PDO::PARAM_STR);
		$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
		$stmt->bindParam(':nombres',  $dato->nombres, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_paterno',  $dato->apellido_paterno, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_materno',  $dato->apellido_materno, PDO::PARAM_STR);
		$stmt->bindParam(':id_grupo',  $dato->NGrupo->id_grupo, PDO::PARAM_STR);
		$stmt->bindParam(':id_unidad',  $dato->Unidad->id_unidad, PDO::PARAM_STR);
		$stmt->bindParam(':id_tipo_documento',  $dato->Documento->id_tipo_documento, PDO::PARAM_STR);
		$stmt->bindParam(':nro_documento',  $dato->nro_documento, PDO::PARAM_STR);
		$stmt->bindParam(':sexo',  $dato->sexo, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_nacimiento',  $dato->fecha_nacimiento, PDO::PARAM_STR);
		$stmt->bindParam(':direccion',  $dato->direccion, PDO::PARAM_STR);
		$stmt->bindParam(':referencia',  $dato->referencia, PDO::PARAM_STR);
		$stmt->bindParam(':telefono',  $dato->telefono, PDO::PARAM_STR);
		$stmt->bindParam(':celular',  $dato->celular, PDO::PARAM_STR);
		$stmt->bindParam(':correo_personal',  $dato->correo_personal, PDO::PARAM_STR);
		$stmt->bindParam(':correo_uni',  $dato->correo_uni, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function eliminar_Usuario($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);
		
		$q = 'DELETE from tb_usuarios where id_usuario= :id_usuario';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_usuario',  $dato, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getUnidad(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_unidad, nombre_unidad, abreviatura from tb_unidad';
		$stmt = $dbh->prepare($q);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getUnidad_by_id($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT *from tb_unidad where id_unidad= :id_unidad';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_unidad',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;

	}

	function eliminar_UNI($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['dato'];


		$q = 'DELETE from tb_unidad where id_unidad= :id_unidad';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_unidad',  $dato, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function crear_UNI($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'INSERT INTO tb_unidad (`nombre_unidad`, `abreviatura`) values (:nombre_unidad, :abreviatura)';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nombre_unidad',  $dato->name, PDO::PARAM_STR);
		$stmt->bindParam(':abreviatura',  $dato->abreviatura, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function modificar_UNI($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'UPDATE tb_unidad SET nombre_unidad=:nombre_unidad, abreviatura=:abreviatura WHERE id_unidad=:id_unidad';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_unidad',  $dato->id_unidad, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_unidad',  $dato->nombre_unidad, PDO::PARAM_STR);
		$stmt->bindParam(':abreviatura',  $dato->abreviatura, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getTipoDocumento(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_tipo_documento, tipo_documento from tb_tipo_documento';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;

	}

	function getGrupos(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_grupo, nombre_grupo from tb_grupos';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;

	}

	function crear_TipoDocumento($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'INSERT INTO tb_tipo_documento (tipo_documento) values (:tipo_documento)';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':tipo_documento',  $dato->tipo_documento, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}


function eliminar_TipoDocumento($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['dato'];


		$q = 'DELETE from tb_tipo_documento where id_tipo_documento= :id_tipo_documento';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_tipo_documento',  $dato, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}


	function getTipoDocumento_by_id($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT * from tb_tipo_documento where id_tipo_documento= :id_tipo_documento';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_tipo_documento',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;

	}

	function modificar_tipoDocumento($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'UPDATE tb_tipo_documento SET tipo_documento=:tipo_documento WHERE id_tipo_documento=:id_tipo_documento';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_tipo_documento',  $dato->id_tipo_documento, PDO::PARAM_STR);
		$stmt->bindParam(':tipo_documento',  $dato->tipo_documento, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}
}
?>
