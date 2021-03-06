<?php
class DAOConsultas extends DBConnect{
	//##############    PROGRAMAS    ######################
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

		$valor= $stmt->execute();
		return json_encode($valor);
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
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function eliminarPrograma($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		var_dump($dato);
		
		$q = 'DELETE from tb_programa_academico where id_programa= :id_programa';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_programa',  $dato, PDO::PARAM_STR);
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getPlanes_by_prog($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT id_plan_estudio, codigo_plan, nombre_plan_estudio, pl.id_programa, pa.nombre_programa, pl.fecha_aprobacion, estado, pl.created_at
				FROM tb_plan_estudio pl left join tb_programa_academico pa on (pl.id_programa=pa.id_programa)
				WHERE pl.id_programa =:id_programa';

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

	//##############    PLANES ESTUDIO    ######################

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
		
		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function crearPlan($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		//var_dump($dato);


		$q = 'INSERT INTO tb_plan_estudio (codigo_plan, nombre_plan_estudio,id_programa,fecha_aprobacion,nro_resolucion,id_pdf_resolucion,estado,metodologia,nro_ciclos,nro_creditos_obligatorios,nro_creditos_electivos,created_at,nombre_pdf_resolucion)
				values (:codigo_plan,:nombre_plan_estudio,:id_programa,:fecha_aprobacion,:nro_resolucion,:id_pdf_resolucion,:estado,:metodologia,:nro_ciclos,:nro_creditos_obligatorios,:nro_creditos_electivos,CURRENT_TIMESTAMP,:nombre_pdf_resolucion)';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':codigo_plan',  $dato->codigo_plan, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_plan_estudio',  $dato->nombre_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa',  $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_aprobacion',  $dato->fecha_aprobacion, PDO::PARAM_STR);
		$stmt->bindParam(':nro_resolucion',  $dato->nro_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':id_pdf_resolucion',  $dato->id_pdf_resolucion, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $dato->estado, PDO::PARAM_STR);
		$stmt->bindParam(':metodologia',  $dato->metodologia, PDO::PARAM_STR);
		$stmt->bindParam(':nro_ciclos',  $dato->nro_ciclos, PDO::PARAM_STR);
		$stmt->bindParam(':nro_creditos_obligatorios',  $dato->nro_creditos_obligatorios, PDO::PARAM_STR);
		$stmt->bindParam(':nro_creditos_electivos',  $dato->nro_creditos_electivos, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_pdf_resolucion',  $dato->nombre_pdf_resolucion, PDO::PARAM_STR);


		$valor= $stmt->execute();
		return json_encode($valor);
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
		
		$valor= $stmt->execute();
		return json_encode($valor);
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

		$valor= $stmt->execute();
		return json_encode($valor);
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

	//##############    mallas academicas    ######################

	function mallaAddCurso($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'INSERT INTO tb_malla_curricular (id_plan_estudio, id_curso, tipo_curso, nivel, created_at)
				values (:id_plan_estudio, :id_curso, :tipo_curso, :nivel, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_plan_estudio',  $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso',  $dato->id_curso, PDO::PARAM_STR);
		$stmt->bindParam(':tipo_curso',  $dato->tipo_curso, PDO::PARAM_STR);
		$stmt->bindParam(':nivel',  $dato->nivel, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function mallaDelCurso($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'DELETE FROM tb_malla_curricular
				WHERE id_plan_estudio=:id_plan_estudio and id_curso=:id_curso';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_plan_estudio',  $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso',  $dato->id_curso, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getCursos_by_plan($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT cr.id_curso, cr.codigo_curso, cr.nombre_curso, ma.nro_creditos, ma.nivel, ma.tipo_curso
			from tb_cursos cr
			INNER JOIN tb_malla_curricular ma on cr.id_curso=ma.id_curso
			where ma.id_plan_estudio=:id_plan_estudio';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_plan_estudio',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getCursoDetalle_by_id($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT ma.id_plan_estudio, cr.id_curso, cr.codigo_curso, cr.nombre_curso, ma.nro_creditos, ma.nivel, ma.tipo_curso, ma.hrs_teoricas, ma.hrs_practicas, ma.escala_notas
			from tb_cursos cr
			INNER JOIN tb_malla_curricular ma on cr.id_curso=ma.id_curso
			where ma.id_plan_estudio=:id_plan_estudio and cr.id_curso=:id_curso';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_plan_estudio',  $dato->plan, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso',  $dato->curso, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}
	
	function getPeriodos(){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT * from tb_periodo_academico';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function getProgramas_by_periodo($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT pp.id_periodo, pp.id_programa, pp.fecha_inicio, pp.fecha_fin, pp.estado, pa.nombre_programa, pa.codigo_programa
			FROM tb_programas_x_periodo pp
			INNER JOIN tb_periodo_academico pe on pp.id_periodo=pe.id_periodo
			INNER JOIN tb_programa_academico pa on pp.id_programa=pa.id_programa
			WHERE pe.id_periodo=:id_periodo';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo',  $dato, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function periodoAddPrograma($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'INSERT INTO tb_programas_x_periodo (id_periodo, id_programa, fecha_inicio, fecha_fin, estado, created_at)
				values (:id_periodo, :id_programa, :fecha_inicio, :fecha_fin, :estado, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo',  $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa',  $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_inicio',  $dato->fecha_inicio, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_fin',  $dato->fecha_fin, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $dato->estado, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getActividades_by_programa($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT ppa.id_periodo, ppa.id_programa, ppa.id_actividad, ppa.descripcion, ppa.estado, ac.codigo_actividad, ac.nombre_actividad
				FROM tb_periodo_x_programa_x_actividad ppa
				INNER JOIN tb_actividades_academicas ac on ppa.id_actividad = ac.id_actividad
				WHERE ppa.id_periodo=:id_periodo and ppa.id_programa=:id_programa';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo',  $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa',  $dato->id_programa, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function periodoAddActividad($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'INSERT INTO tb_periodo_x_programa_x_actividad (id_periodo, id_programa, id_actividad, descripcion, estado, created_at)
				values (:id_periodo, :id_programa, :id_actividad, :descripcion, :estado, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo',  $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa',  $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_actividad',  $dato->id_actividad, PDO::PARAM_STR);
		$stmt->bindParam(':descripcion',  $dato->descripcion, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $dato->estado, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getGrupos_by_id($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT * FROM tb_seccion
			WHERE id_periodo=:id_periodo and id_programa=:id_programa and id_plan_estudio=:id_plan_estudio and id_curso=:id_curso';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo', $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa', $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_plan_estudio', $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso', $dato->id_curso, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function addGrupo($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'INSERT INTO tb_seccion (id_periodo, id_programa, id_plan_estudio, id_curso, codigo_grupo, nombre_grupo, cupo_minimo, cupo_maximo, created_at)
				values (:id_periodo, :id_programa, :id_plan_estudio, :id_curso, :codigo_grupo, :nombre_grupo, :cupo_minimo, :cupo_maximo, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo', $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa', $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_plan_estudio', $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso', $dato->id_curso, PDO::PARAM_STR);
		$stmt->bindParam(':codigo_grupo', $dato->grupo->codigo_grupo, PDO::PARAM_STR);
		$stmt->bindParam(':nombre_grupo', $dato->grupo->nombre_grupo, PDO::PARAM_STR);
		$stmt->bindParam(':cupo_minimo', $dato->grupo->cupo_minimo, PDO::PARAM_STR);
		$stmt->bindParam(':cupo_maximo', $dato->grupo->cupo_maximo, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

	function getDetGrupo_by_id($dato){
		$db  = new DBConnect();
		$dbh = $db->enchufalo();
		//$id_empresa = $_GET['id'];

		$q = 'SELECT * FROM tb_seccion
			WHERE id_periodo=:id_periodo and id_programa=:id_programa and id_plan_estudio=:id_plan_estudio and id_curso=:id_curso and codigo_grupo=:codigo_grupo';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo', $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa', $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_plan_estudio', $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso', $dato->id_curso, PDO::PARAM_STR);
		$stmt->bindParam(':codigo_grupo', $dato->codigo_grupo, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		return json_encode($r);
	}

	function addDetalleGrupo($dato){
		
		$db  = new DBConnect();
		$dbh = $db->enchufalo();

		$q = 'UPDATE tb_seccion 
				SET fecha_inicio=:fecha_inicio, fecha_fin=:fecha_fin, fecha_notas=:fecha_notas
				WHERE id_periodo=:id_periodo and id_programa=:id_programa and id_plan_estudio=:id_plan_estudio and id_curso=:id_curso and codigo_grupo=:codigo_grupo';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_periodo', $dato->id_periodo, PDO::PARAM_STR);
		$stmt->bindParam(':id_programa', $dato->id_programa, PDO::PARAM_STR);
		$stmt->bindParam(':id_plan_estudio', $dato->id_plan_estudio, PDO::PARAM_STR);
		$stmt->bindParam(':id_curso', $dato->id_curso, PDO::PARAM_STR);
		$stmt->bindParam(':codigo_grupo', $dato->codigo_grupo, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_inicio', $dato->fecha_inicio, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_fin', $dato->fecha_fin, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_notas', $dato->fecha_notas, PDO::PARAM_STR);

		$valor= $stmt->execute();
		return json_encode($valor);
	}

}
?>
