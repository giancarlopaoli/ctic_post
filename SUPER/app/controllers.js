(function(){

angular.module('Controllers', [])
  
.controller('mainController', function() {

 
})

.controller('configController', function() {

})


.controller('instiController', function() {

})


.controller('instiprograma', function() {
 
})

.controller('unidadController', ['$scope', '$http', function($scope, $http) {

    $scope.init = function(){
      
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

        if ( confirm("¿Está seguro que desea eliminar la unidad seleccionada?") ) {
            $scope.names.splice(index,1);
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

    $scope.init();
}])

.controller('NUnidadController', ['$scope', '$http', function($scope, $http) {

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
}])

.controller('MUnidadController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    var id_r = $routeParams.id;
      
    $scope.init = function(){

        $http.post ('api/getUnidad_by_id.php',{id: id_r})
        .success(function(data) {
          $scope.unidad = data;
                console.log(data);
                
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };


    $scope.mod_unidad = function(un){
       
                  
                     console.log(un);
                     
             $http.post('api/modUnidad.php', { unidad:un } )
               
                .success(function(data) {

                        console.log(data);
                       
                        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/unidades";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }
           $scope.init();

}])

.controller('instiModulo', function() {

})
.controller('NUsuarioController', ['$scope', '$http', function($scope, $http) {


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

    $http.post ('api/getGrupos.php')
        .success(function(data) {
                $scope.perfiles = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });
    
  $scope.registro_usuario = function(us){
  console.log(us);
      
    $http.post('api/addUsuario.php', { usuario:us } )               
      .success(function(data) {
        console.log(data);
        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
      })
      .error(function(data) {
        console.log('Error: ' + data);
        alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
      });
  }
}])

.controller('MUsuarioController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    var id_r = $routeParams.id;
      
   
        $http.post ('api/getUsuarios_by_id.php',{id: id_r})
        .success(function(data) {
          $scope.usuarios = data;
                console.log(data);
                
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


    $http.post ('api/getTipoDocumento.php')
        .success(function(data) {
                $scope.documentos = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });

    $http.post ('api/getGrupos.php')
        .success(function(data) {
                $scope.perfiles = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });

    $scope.mod_usuario = function(us){
       
                  
                     console.log(us);
                     
             $http.post('api/modUsuario.php', { usuario:us } )
               
                .success(function(data) {

                        console.log(data);
                       
                        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }
}])

.controller('instiUsuario', ['$scope', '$http', function($scope , $http) {

     $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.names = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

    $scope.delUsuario = function( codigo, index ) {

        $scope.names.splice(index,1);
        if ( confirm("¿Está seguro que desea eliminar el usuario?") ) {
            
            $http.post('api/delUsuario.php', { id: codigo } )
                .success(function(data) {
                       
                        
                        console.log(data);
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
            }
        }


}]);


})();