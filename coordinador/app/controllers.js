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
                     
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }
    }

<<<<<<< HEAD
    $scope.mostrar = function (codigo){
        $scope.detalles=response;

    }
=======
    $scope.showPlanes = function( codigo) {
        //console.log(codigo);

        $http.post ('api/getPlanes_by_prog.php',{id: codigo})
        .success(function(data) {
                $scope.planes = data;
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    }
    
>>>>>>> ed954dd7aafb54d04574493403ee69cca75d0670

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
        $http.post ('api/getPlanes.php')
            .success(function(data) {
                    $scope.planes = data;
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


.controller('EditarPlanesController', function() {

})

;


})();