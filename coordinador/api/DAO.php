<?php
class DAOConsultas extends DBConnect{

	function getProgramas(){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_programa, codigo_programa, nombre_programa, tp.tipo_programa, fecha_aprobacion, nro_resolucion, pdf_resolucion, estado_programa, pa.id_unidad, un.nombre_unidad, created_at
		from tb_programa_academico pa left join tb_tipo_programa tp on (pa.id_tipo_programa=tp.id_tipo_programa) left join tb_unidad un on (pa.id_unidad=un.id_unidad)';

		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getProgramas_by_id($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_programa, codigo_programa, nombre_programa, tp.id_tipo_programa, tp.tipo_programa, fecha_aprobacion, nro_resolucion, pdf_resolucion, estado_programa, un.id_unidad, un.nombre_unidad, created_at
		from tb_programa_academico pa left join tb_tipo_programa tp on (pa.id_tipo_programa=tp.id_tipo_programa) left join tb_unidad un on (pa.id_unidad=un.id_unidad)
		where id_programa=:id_programa';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_programa',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function crearPrograma($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'INSERT INTO tb_programa_academico (codigo_programa,id_tipo_programa,nombre_programa,id_unidad,fecha_aprobacion,nro_resolucion,pdf_resolucion,estado_programa,created_at,updated_at)
				values (:codigo_programa,:id_tipo_programa,:nombre_programa,:id_unidad,:fecha_aprobacion,:nro_resolucion,:pdf_resolucion,:estado_programa,CURRENT_TIMESTAMP,NULL)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':codigo_programa',  $dato->codigo_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_tipo_programa',  $dato->id_tipo_programa, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_programa',  $dato->nombre_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_unidad',  $dato->id_unidad, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_aprobacion',  $dato->fecha_aprobacion, PDO::PARAM_STR);
		$stmt->bindParam(':nro_resolucion',  $dato->nro_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':pdf_resolucion',  $dato->pdf_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':estado_programa',  $dato->estado_programa, PDO::PARAM_INT);

		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}


	function editarPrograma($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);
		var_dump($dato->estado_programa);

		$q = 'UPDATE tb_programa_academico 
				SET codigo_programa=:codigo_programa, id_tipo_programa=:id_tipo_programa, nombre_programa=:nombre_programa, id_unidad=:id_unidad, fecha_aprobacion=:fecha_aprobacion, nro_resolucion=:nro_resolucion, estado_programa=:estado_programa
				WHERE id_programa=:id_programa';
//
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_programa',  $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':codigo_programa',  $dato->codigo_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_tipo_programa',  $dato->tipoPrograma->id_tipo_programa, PDO::PARAM_INT);
		$stmt->bindParam(':nombre_programa',  $dato->nombre_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_unidad',  $dato->Unidad->id_unidad, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_aprobacion',  $dato->fecha_aprobacion, PDO::PARAM_STR);
		$stmt->bindParam(':nro_resolucion',  $dato->nro_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':estado_programa',  $dato->estado_programa, PDO::PARAM_INT);
		
		$stmt->execute();
		//var_dump($rr);
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function eliminarPrograma($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);
		
		$q = 'DELETE from tb_programa_academico where id_programa= :id_programa';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_programa',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getUnidad(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_unidad, nombre_unidad, abreviatura from tb_unidad';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;
	}

	function getTipoPrograma(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_tipo_programa, tipo_programa from tb_tipo_programa';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
		//return $r;
	}

	function getPlanes(){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_plan_estudio, codigo_plan, nombre_plan_estudio, pl.id_programa, pa.nombre_programa, pl.fecha_aprobacion, estado, pl.created_at
		from tb_plan_estudio pl left join tb_programa_academico pa on (pl.id_programa=pa.id_programa)';

		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function eliminarPlan($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);
		
		$q = 'DELETE from tb_plan_estudio where id_plan_estudio= :id_plan_estudio';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_plan_estudio',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function crearPlan($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);


		$q = 'INSERT INTO tb_plan_estudios (codigo_plan,nombre_plan_estudio,id_programa,fecha_aprobacion,nro_resolucion,id_pdf_resolucion,estado,metodologia,nro_ciclos,nro_creditos_obligatorios,nro_creditos_electivos,created_at,nombre_pdf_resolucion)
				values (:codigo_plan,:nombre_plan_estudio,:id_programa,:fecha_aprobacion,:nro_resolucion,:id_pdf_resolucion,:estado,:metodologia,:nro_ciclos,:nro_creditos_obligatorios,:nro_creditos_electivos,CURRENT_TIMESTAMP,:nombre_pdf_resolucion)';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':codigo_plan',  $dato->codigo_plan, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_plan_estudio',  $dato->nombre_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_aprobacion',  $dato->fecha_aprobacion, PDO::PARAM_STR);
		$stmt->bindParam(':nro_resolucion',  $dato->nro_resolucion, PDO::PARAM_STR);
		//$stmt->bindParam(':id_pdf_resolucion',  $dato->id_pdf_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $dato->estado, PDO::PARAM_STR);
		$stmt->bindParam(':metodologia',  $dato->metodologia, PDO::PARAM_STR);
		$stmt->bindParam(':nro_ciclos',  $dato->nro_ciclos, PDO::PARAM_STR);
		$stmt->bindParam(':nro_creditos_obligatorios',  $dato->nro_creditos_obligatorios, PDO::PARAM_STR);
		$stmt->bindParam(':nro_creditos_electivos',  $dato->nro_creditos_electivos, PDO::PARAM_STR);
		//$stmt->bindParam(':nombre_pdf_resolucion',  $dato->nombre_pdf_resolucion, PDO::PARAM_STR);


		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getCursos(){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_curso, codigo_curso, nombre_curso, metodologia, modalidad, nro_creditos
		from tb_cursos';

		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function eliminarCurso($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);
		
		$q = 'DELETE from tb_cursos where id_curso= :id_curso';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_curso',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function crearCurso($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);

		$q = 'INSERT INTO tb_cursos (codigo_curso,nombre_curso,metodologia,modalidad,nro_creditos,created_at)
				values (:codigo_curso, :nombre_curso, :metodologia, :modalidad, :nro_creditos,CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':codigo_curso',  $dato->codigo_curso, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_curso',  $dato->nombre_curso, PDO::PARAM_STR);
		$stmt->bindParam(':metodologia',  $dato->metodologia, PDO::PARAM_STR);
		$stmt->bindParam(':modalidad',  $dato->modalidad, PDO::PARAM_STR);
		$stmt->bindParam(':nro_creditos',  $dato->nro_creditos, PDO::PARAM_STR);

		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getCurso_by_id($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT *
		from tb_cursos
		where id_curso=:id_curso';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_curso',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

}
?>
