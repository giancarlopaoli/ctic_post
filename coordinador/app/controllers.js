(function(){

angular.module('Controllers', [])
  
.controller('coordinadorController', function() {

 
})

.controller('configController', function() {
})

.filter('estadoPrograma', function(){
    return function(input){
        var estados=["Inactivo", "Activo"];
        return estados[input];
    };
})

.filter('estadoPlan', function(){
    return function(input){
        var estados=["Inactivo", "Activo"];
        return estados[input];
    };
})

.filter('Modalidades', function(){
    return function(input){
        var estados=["Maestría", "Doctorado", "Diplomado"];
        return estados[input-1];
    };
})

.filter('Metodologia', function(){
    return function(input){
        var estados=["Presencial", "Semi-Presencial", "A Distancia"];
        return estados[input-1];
    };
})

.filter('tipoCurso', function(){
    return function(input){
        var estados=["Obligatorio", "Electivo"];
        return estados[input-1];
    };
})

//####################  PROGRAMAS ACADEMICOS  ###########################################

.controller('programaController', ['$scope', '$http', function($scope, $http) {

    $scope.init = function(){
      
        $http.post ('api/getProgramas.php')
        .success(function(data) {
                $scope.programas = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };

    $scope.delPrograma = function( codigo, index ) {

        if ( confirm("¿Está seguro que desea eliminar el programa seleccionado?") ) {
            $scope.programas.splice(index,1);
            $http.post('api/delPrograma.php', { id: codigo } )
              .success(function(data) {
                     
                console.log(dat);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }
    }


    $scope.showPlanes = function( codigo, nombre, index) {
        $("#principal>tbody>tr").css("background","none");
        
        //console.log(codigo);
        $scope.detalles = true;
        $scope.Nombre_programa= nombre;
        $http.post ('api/getPlanes_by_prog.php',{id: codigo})
        .success(function(data) {

                $scope.planes = data;
                 $('html,body').animate({
                scrollTop: $("#cambiodevista").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
        $($("#principal>tbody>tr")[index]).css("background","#D8D8D8");
       
    }

    $scope.hidePlanes = function( codigo) {
        //console.log(codigo);
        $scope.detalles = false;
    }
    $scope.init();
    

}])

.controller('NuevoProgramaController', ['$scope', '$http', function($scope, $http) {
    $scope.init = function(){

       $http.get('api/getUnidad.php')
            .success(function(data) {
                    $scope.unidades = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });

        $http.get('api/getTipoPrograma.php')
            .success(function(data) {
                    $scope.Tipoprograma = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });
    };

    $scope.registro_pa = function(pa){
        console.log(pa);
      
        $http.post('api/addPrograma.php', { programa:pa } )               
          .success(function(data) {
            console.log(data);
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/programas";
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo programa académico. Favor contactarse con el administrador del sistema.");
          });

  }

    $scope.init();

}])

.controller('EditarProgramaController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    
    var id_p = $routeParams.id;

    $scope.init = function(){
       
        $http.post ('api/getProgramas_by_id.php',{id: id_p})
        .success(function(data) {
          $scope.programas = data;
                console.log("init", data);
                $scope.programas[0].tipoPrograma={id_tipo_programa: data[0].id_tipo_programa, tipo_programa: data[0].tipo_programa};
                $scope.programas[0].Unidad={id_unidad: data[0].id_unidad, nombre_unidad: data[0].nombre_unidad, abreviatura: data[0].abreviatura};
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

       $http.get('api/getUnidad.php')
            .success(function(data) {
                    $scope.unidades = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });

        $http.get('api/getTipoPrograma.php')
            .success(function(data) {
                    $scope.Tipoprograma = data;
                    console.log(data);

                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });
    };


    $scope.editar_pa = function(pa){
        //console.log(pa);
                     
        $http.post('api/modPrograma.php', { programa:pa } )
            .success(function(data) {

                //console.log(data);
                location.href=location.protocol+"//"+location.hostname+location.pathname+"#/programas";
            })
            .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
        });
    }

    $scope.init();
}])

//####################  PLANES DE ESTUDIO  ###########################################


.controller('planesController', ['$scope', '$http', function($scope, $http) {
    $scope.init = function(){
        $(".js-example-basic-multiple").select2();

        $http.post ('api/getPlanes.php')
            .success(function(data) {
                    $scope.planes = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });

        $http.post ('api/getCursos.php')
            .success(function(data) {
                    $scope.bancoCursos = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });
    };

    $scope.delPlan = function( codigo, index ) {

        if ( confirm("¿Está seguro que desea eliminar el Plan de Estudios seleccionado?") ) {
            $scope.planes.splice(index,1);
            $http.post('api/delPlan.php', { id: codigo } )
              .success(function(data) {
                     
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }
    }
    
    $scope.showCursos = function( plan, nombre, index ) {
        $("#principal>tbody>tr").css("background","none");
        $scope.vistaMalla = true;
        $scope.plan_select=plan;
        console.log(plan);
        $scope.planNombre= nombre;
        $http.post ('api/getCursos_by_plan.php',{plan: plan})
        .success(function(data) {
                $scope.cursos = data;
                console.log($scope.cursos);
                $('html,body').animate({
                scrollTop: $("#cambiodevista").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
          $($("#principal>tbody>tr")[index]).css("background","#D8D8D8");
        
    }

    $scope.showCursoDetalle = function( curso, nombre ) {
        $scope.vistaCursoDetalle = true;
        $scope.curso_select=curso;
        $scope.nombre_curso=nombre;
        console.log(curso);
        
        $http.post ('api/getCursoDetalle_by_id.php',{curso: curso, plan: $scope.plan_select})
        .success(function(data) {
                $scope.dcr = data;
                console.log($scope.dcr);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    }

      $scope.hideCursos = function() {
        //console.log(codigo);
        $scope.vistaMalla = false;
        }
    

    $scope.guardarCurso = function( curso ) {
        curso.id_plan_estudio=$scope.plan_select;
        console.log(curso);

        $http.post('api/mallaAddCurso.php', { curso: curso } )
          .success(function(data) {
            $scope.cr=null;
            $scope.showCursos(curso.id_plan_estudio);
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("no succes");
          });
    }

    $scope.delCursoMalla = function( curso, index) {
        console.log($scope.plan_select);

        $http.post('api/mallaDelCurso.php', { id_curso: curso, id_plan_estudio: $scope.plan_select} )
          .success(function(data) {
             $scope.cursos.splice(index,1);
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("no succes");
          });
    }

    $scope.guardarDetalleCurso = function( curso ) {
        console.log(curso);

        $http.post('api/mallaAddCurso.php', { curso: curso } )
          .success(function(data) {
            $scope.cr=null;
            $scope.showCursos(curso.id_plan_estudio);
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("no succes");
          });
    }
    

    $scope.init();
}])

.controller('NuevoPlanController', ['$scope', '$http', function($scope, $http) {
    
    $scope.init = function(){
       
        $http.get('api/getProgramas.php')
            .success(function(data) {
                    $scope.Programas = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });
    };

    $scope.registro_plan = function(pl){
        console.log(pl);
      
        $http.post('api/addPlan.php', { plan:pl } )               
          .success(function(data) {
            console.log(data);
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/planesestudio";
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo plan de estudios. Favor contactarse con el administrador del sistema.");
          });
  }

  $scope.init();

}])

.controller('DetalleCursoController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    
    var id_c = $routeParams.id;

    $scope.init = function(){
       
        $http.post ('api/getCurso_by_id.php',{id: id_c})
        .success(function(data) {
                console.log("init", data);
                $scope.cr = data;
                //$scope.programas[0].tipoPrograma={id_tipo_programa: data[0].id_tipo_programa, tipo_programa: data[0].tipo_programa};
                //$scope.programas[0].Unidad={id_unidad: data[0].id_unidad, nombre_unidad: data[0].nombre_unidad, abreviatura: data[0].abreviatura};
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    };

    $scope.init();
}])

//####################  CURSOS  ###########################################

.controller('cursosController', ['$scope', '$http', function($scope, $http) {
    $scope.init = function(){
        $http.post ('api/getCursos.php')
            .success(function(data) {
                    $scope.cursos = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
        });
    };

    $scope.delCurso = function( codigo, index ) {

        if ( confirm("¿Está seguro que desea eliminar el curso seleccionado?") ) {
            $scope.cursos.splice(index,1);
            $http.post('api/delCurso.php', { id: codigo } )
              .success(function(data) {
                     
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }
    }

    $scope.init();
}])

.controller('NuevoCursoController', ['$scope', '$http', function($scope, $http) {

    $scope.registro_curso = function(cr){
        console.log(cr);
      
        $http.post('api/addCurso.php', { curso:cr } )               
          .success(function(data) {
            console.log(data);
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/cursos";
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo curso. Favor contactarse con el administrador del sistema.");
          });
  }

}])

.controller('periodo_academicoController', ['$scope', '$http', function($scope, $http) {   
    
    $scope.init = function(){
        $http.post('api/getPeriodos.php')
          .success(function(data) {
            $scope.periodos = data;
            console.log(data);
          })
            .error(function(data) {
            console.log('Error: ' + data);
        });
            $(".js-example-basic-multiple").select2();
    
    };

    $scope.showProgramas = function( id, codigo, index) {
        console.log(id);
        $scope.VistaProgramas = true;
        $scope.id_periodo= id;
        $scope.codigo_periodo= codigo;
        
        $http.post ('api/getProgramas.php')
        .success(function(data) {
                $scope.listaProgramas = data;
                console.log($scope.listaProgramas);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

        $http.post ('api/getProgramas_by_periodo.php', {id: id})
        .success(function(data) {
                console.log(data);
                $scope.programas = data;
                 $('html,body').animate({
                scrollTop: $("#cambiodevista").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

        $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }

    $scope.nuevoPrograma = function(programa, index){
        programa.id_periodo=$scope.id_periodo;
        console.log(programa);
        
        $http.post('api/periodoAddPrograma.php', { programa: programa } )
        .success(function(data) {
          $scope.showProgramas(programa.id_periodo);
        })
          .error(function(data) {
          console.log('Error: ' + data);
          alert("no succes");
        });
        
    };

    $scope.showActividades= function( id, codigo, index) {
        console.log(id, codigo);
        $scope.VistaActividades = true;
        $scope.id_programa= id;
        $scope.codigo_programa= codigo;
        
        $http.post ('../api/getActividades.php')
        .success(function(data) {
                $scope.listaActividades = data;
                console.log($scope.listaActividades);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });


        $http.post ('api/getActividades_by_programa.php', {id_programa: id, id_periodo: $scope.id_periodo})
        .success(function(data) {
                console.log(data);
                $scope.actividades = data;
                 $('html,body').animate({
                scrollTop: $("#cambiodevista2").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });


        $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }

    $scope.nuevaActividad = function(actividad, index){
        actividad.id_periodo=$scope.id_periodo;
        actividad.id_programa=$scope.id_programa;
        console.log(actividad);
        
        $http.post('api/periodoAddActividad.php', { actividad: actividad } )
        .success(function(data) {
          $scope.showActividades($scope.id_programa, $scope.codigo_programa);
        })
          .error(function(data) {
          console.log('Error: ' + data);
          alert("no succes");
        });
        
    };

    $scope.init();

}])

.controller('gruposController', ['$scope', '$http', function($scope, $http) {   
    
    $scope.init = function(){
        $scope.todo={};

        $http.post('api/getPeriodos.php')
          .success(function(data) {
            $scope.periodos = data;
            console.log(data);
          })
            .error(function(data) {
            console.log('Error: ' + data);
        });
            $(".js-example-basic-multiple").select2();
    
    };

    $scope.showProgramas = function( id, codigo, index) {
        console.log(id);
        $scope.VistaProgramas = true;
        $scope.todo.id_periodo=id;

        $scope.codigo_periodo= codigo;
        
        $http.post ('api/getProgramas.php')
        .success(function(data) {
                $scope.listaProgramas = data;
                console.log($scope.listaProgramas);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

        $http.post ('api/getProgramas_by_periodo.php', {id: id})
        .success(function(data) {
                console.log(data);
                $scope.programas = data;
                 $('html,body').animate({
                scrollTop: $("#cambiodevista").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

        $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }

    $scope.showPlanes = function( codigo, nombre, index) {
        //console.log(codigo);
        $scope.detalles = true;
        $scope.Nombre_programa= nombre;
        $scope.todo.id_programa=codigo;

        $http.post ('api/getPlanes_by_prog.php',{id: codigo})
        .success(function(data) {
                $scope.planes = data;
                 $('html,body').animate({
                scrollTop: $("#cambiodevista").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
        $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }
    $scope.hidePlanes = function( codigo) {
        //console.log(codigo);
        $scope.detalles = false;
    }

    $scope.showCursos = function( plan, nombre, index ) {
        $scope.vistaMalla = true;
        $scope.todo.id_plan_estudio=plan;
        console.log(plan);
        $scope.planNombre= nombre;
        $http.post ('api/getCursos_by_plan.php',{plan: plan})
        .success(function(data) {
                $scope.cursos = data;
                console.log($scope.cursos);
                $('html,body').animate({
                scrollTop: $("#cambiodevista2").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
          $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }

    $scope.showGrupos = function( id_curso, nombre, index ) {
        $scope.vistaGrupo = true;
        console.log(id_curso);
        $scope.NombreCurso= nombre;

        $scope.todo.id_curso=id_curso;
        console.log($scope.todo);
        
        $http.post ('api/getGrupos_by_id.php',{id: $scope.todo})
        .success(function(data) {
                $scope.grupos = data;
                console.log($scope.grupos);
                $('html,body').animate({
                scrollTop: $("#cambiodevista3").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

          $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }

    $scope.guardarGrupo = function(grupo, index){
        console.log(grupo);
        $scope.todo.grupo=grupo;

        $http.post('api/addGrupo.php', { grupo: $scope.todo } )
        .success(function(data) {
          $scope.showGrupos($scope.todo.id_curso, $scope.NombreCurso);
        })
          .error(function(data) {
          console.log('Error: ' + data);
          alert("no succes");
        });
    };

    $scope.showGrupoDetalle = function( grupo, nombre, index ) {
        $scope.vistaGrupoDetalle = true;
        console.log(grupo);
        $scope.todo.codigo_grupo=grupo;
        $scope.NombreGrupo= nombre;

        console.log($scope.todo);


        $http.post ('api/getDetGrupo_by_id.php',{id: $scope.todo})
        .success(function(data) {
                $scope.dgr = data;
                console.log($scope.dgr);
                $('html,body').animate({
                scrollTop: $("#cambiodevista3").offset().top
                }, 1000);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

          $($("#principal>tbody>tr")[index]).css("background","#333");
        $($("#principal>tbody>tr")[index]).css("color","#FFF");
    }
    
    $scope.hideDetalle = function() {
        //console.log(codigo);
        $scope.vistaGrupoDetalle = false;
    }

    $scope.guardarDetalleGrupo = function( grupo ) {
        //$scope.todo.detalle=grupo;
        console.log(grupo);

        $http.post('api/AddDetalleGrupo.php', { grupo: grupo } )
          .success(function(data) {
            $scope.dgr=null;
            $scope.showGrupos($scope.todo.id_curso, $scope.NombreCurso);
            $scope.hideDetalle();

            $('html,body').animate({
                scrollTop: $("#cambiodevista2").offset().top
            }, 1000);

            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("no succes");
          });
    }
    
    $scope.init();

}])

.controller('EditarPlanesController', function() {

})
.controller('cabecera', ['$scope', '$http', function($scope, $http) {
      $scope.date = new Date();
    $scope.logout = function(){
    $http.post ('api/logout.php')
        .success(function(data) {
            location.reload();
                //console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
                location.reload();
        });
};

}]);


})();




