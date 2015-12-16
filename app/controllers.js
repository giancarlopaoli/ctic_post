(function(){

angular.module('Controllers', [])
  
.controller('mainController', function() {

 
})

.controller('configController', function() {

})


.controller('instiController', ['$scope', '$http', function($scope, $http) {
   $scope.init = function(){
      
        $http.post ('api/getInstitucion.php')
        .success(function(data) {
                $scope.institucion = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };
    $scope.init();
}])


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

    $scope.init = function(){

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
    };

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

  $scope.init();
}])

.controller('MUsuarioController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    var id_r = $routeParams.id;
      
   
        $http.post ('api/getUsuarios_by_id.php',{id: id_r})
        .success(function(data) {
            $scope.usuarios = data;
            console.log(data);
            
            $scope.usuarios[0].NGrupo = {id_grupo: data[0].id_grupo, nombre_grupo: data[0].nombre_grupo};
            $scope.usuarios[0].Unidad = {id_unidad: data[0].id_unidad, nombre_unidad: data[0].nombre_unidad};
            $scope.usuarios[0].Documento = {id_tipo_documento: data[0].id_tipo_documento, tipo_documento: data[0].tipo_documento};

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

.controller('instiUsuario', ['$scope', '$http', '$filter', function($scope , $http, $filter) {

     $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.names = data;
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
    $http.post ('api/getGrupos.php')
        .success(function(data) {
                $scope.perfiles = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
    });
    //paginacion
      $scope.itemsPerPage = 5;
      $scope.currentPage = 0;


      $scope.range = function() {
        var rangeSize = 10;
        var ret = [];
        var start;

        start = $scope.currentPage;

        if ( start > $scope.pageCount()-rangeSize ) {
          start = $scope.pageCount()-rangeSize+1;
          if(start<1){
            var rangeSize = 10+start;
            start=0;   }      
        }

        for (var i=start; i<start+rangeSize; i++) {
          ret.push(i);   }

        return ret;
      };

      $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;    }
      };

      $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
      };

      $scope.pageCount = function() {
       // $("#n_filter").hide();
        return Math.ceil($("#n_filter").text()/$scope.itemsPerPage)-1;
        
      };

      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;    }  
      };

      $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
      };

      $scope.setPage = function(n) {
        $scope.currentPage = n;
      };


    //termino de paginacion

    //orden


    var orderBy = $filter('orderBy');
    $scope.order = function(predicate, reverse) {
       $scope.names = orderBy($scope.names, predicate, reverse);  };


    //borrar usuario
    $scope.delUsuario = function( codigo, index ) {

        $scope.names.splice(index,1);
        console.log($scope.names)
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


}])

.controller('TipoDocumentosController', ['$scope', '$http', function($scope, $http) {

    $scope.init = function(){
      
        $http.post ('api/getTipoDocumento.php')
        .success(function(data) {
                $scope.documento = data;
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };

    $scope.delTipoDocumento = function( codigo, index ) {

        if ( confirm("¿Está seguro que desea eliminar el tipo de documento seleccionado?") ) {
            $scope.documento.splice(index,1);
            $http.post('api/delTipoDocumento.php', { id: codigo } )
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


.controller('nuevo_tipoDocumentoController', ['$scope', '$http', function($scope, $http) {

    $scope.registro_tipoDocumento = function(dc){
        
             $http.post('api/addTipoDocumento.php', { documento: dc } )               
                .success(function(data) {

                        console.log(data);
                       
                        location.href=location.protocol+"//"+location.hostname+location.pathname+"#/tipo_documentos";
                    })
                .error(function(data) {
                        console.log('Error: ' + data);
                         alert("no succes");
                });
        }
}])


.controller('mod_tipoDocumentoController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    var id_r = $routeParams.id;
      
    $scope.init = function(){

        $http.post ('api/getTipoDocumento_by_id.php',{id: id_r})
        .success(function(data) {
          $scope.documento = data;
                console.log(data);
                
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };

    $scope.mod_tipoDocumento = function(dc){
      console.log(dc);
                     
      $http.post('api/modTipoDocumento.php', { documento:dc } )
        .success(function(data) {
          console.log(data);
          location.href=location.protocol+"//"+location.hostname+location.pathname+"#/tipo_documentos";
        })
          .error(function(data) {
          console.log('Error: ' + data);
          alert("no succes");
        });
      }
      $scope.init();

}])

;


})();