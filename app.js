// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

//filtro
angularRoutingApp.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
      
        .when('/', {
            templateUrl : 'views/configuracion.html',
            controller  : 'configController'
        })

        .when('/institucion', {
            templateUrl : 'views/institucion.html',
            controller  : 'instiController'
        })

        .when('/modulos', {
            templateUrl : 'views/modulos.html',
            controller  : 'instiModulo'
        })

        .when('/usuarios', {
            templateUrl : 'views/usuarios.html',
            controller  : 'instiUsuario'
        })
         .when('/programa', {
            templateUrl : 'views/programa.html',
            controller  : 'instiprograma'
        })
            .when('/nuevo_usuario', {
            templateUrl : 'views/nuevo_usuario.html',
            controller  : 'NUsuarioController'
        })
  
            .when('/unidades', {
            templateUrl : 'views/unidades.html',
            controller  : 'unidadController'
        })
            .when('/nueva_unidad', {
            templateUrl : 'views/nueva_unidad.html',
            controller  : 'NUnidadController'
        })
            .when('/mod_unidad', {
            templateUrl : 'views/mod_unidad.html',
            controller  : 'MUnidadController'
        })
            .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {

 
});

angularRoutingApp.controller('configController', function($scope) {
});


angularRoutingApp.controller('instiController', function($scope) {
});


angularRoutingApp.controller('instiprograma', function($scope, $http) {


 
});


angularRoutingApp.controller('unidadController', function($scope, $http) {

    $scope.init = function(){
        console.log('unidad');

        $http.post ('api/getUnidad.php')
        .success(function(data) {
                $scope.names = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };

    $scope.delUnidad = function( codigo, index ) {

        $scope.names.splice(index,1);
        if ( confirm("Seguro?") ) {
            
            $http.post('api/delUnidad.php', { id: codigo } )
                .success(function(data) {
                       
                        
                        console.log(data);
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
            }
        }
      $scope.modUnidad = function( nombre, abre, id ) {
        
            if (window.localStorage) {

              localStorage.setItem("nombre", nombre);
              localStorage.setItem("abre", abre);
               localStorage.setItem("id", id);
            }
        }

    $scope.init();
});

angularRoutingApp.controller('NUnidadController', function($scope, $http) {
    

    $scope.registro_unidad = function(un){
        
             $http.post('api/addUnidad.php', { unidad:un } )
               
                .success(function(data) {

                        console.log(data);
                       
                        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/unidades";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }
});

angularRoutingApp.controller('MUnidadController', function($scope, $http) {
        var nombre="";
        var abre="";

        if (window.localStorage) {
           nombre = localStorage.getItem("nombre");
           abre = localStorage.getItem("abre");
           id = localStorage.getItem("id");
        }
        else{
            alert("usa un navegador de verdad para maxima funcionalidad");
        }
        $('#nombre').click(function(){
        $('#nombre').val(nombre);
        $('#abre').val(abre);
         $('#id').val(id);
      });

    $scope.mod_unidad = function(un){
       
                  
                     console.log(un);
                     alert(id);
             $http.post('api/modUnidad.php', { unidad:un } )
               
                .success(function(data) {

                        console.log(data);
                       
                        //location.href=location.protocol+"//"+location.hostname+location.pathname+"#/unidades";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }

});

angularRoutingApp.controller('instiModulo', function($scope) {

});

angularRoutingApp.controller('NUsuarioController', function($scope, $http) {


   $http.get('api/getUnidad.php')
        .success(function(data) {
                $scope.unidades = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });


    $http.post ('api/getTipoDocumento.php')
        .success(function(data) {
                $scope.documentos = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });


  $scope.registro_us = function(pa){
                       
            $http(
                {method:'POST',
                url:'api/add.php',
                data: $.param( { id: pa }),
                headers:   {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function(data) {

                        console.log(data);
                       //location para volver a programa despues de agregar new_pa
                        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }
});


angularRoutingApp.controller('instiUsuario', function($scope , $http) {

     $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.names = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });


              $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.items = [];

  for (var i=0; i<50; i++) {
    $scope.items.push({ id: i, name: "name "+ i, description: "description " + i });
  }

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };


    $scope.delNom = function( codigo, index ) {

        $scope.names.splice(index,1);
        if ( confirm("Seguro?") ) {
            
            $http.post('api/delete.php', { id: codigo } )
                .success(function(data) {
                       
                        
                        console.log(data);
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
            }
        }


});
