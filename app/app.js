// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute', 'Controllers']);

angularRoutingApp.filter('offset', function() {
  return function(input, start) {
    if(input){
    start = parseInt(start, 10);

    return input.slice(start);}
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
        .when('/usuarios', {
            templateUrl : 'views/usuarios.html',
            controller  : 'instiUsuario'
        })
            .when('/nuevo_usuario', {
            templateUrl : 'views/nuevo_usuario.html',
            controller  : 'NUsuarioController'
        })
             .when('/mod_user/:id', {
            templateUrl : 'views/mod_user.html',
            controller  : 'MUsuarioController'
        })
  
            .when('/unidades', {
            templateUrl : 'views/unidades.html',
            controller  : 'unidadController'
        })
            .when('/nueva_unidad', {
            templateUrl : 'views/nueva_unidad.html',
            controller  : 'NUnidadController'
        })
            .when('/mod_unidad/:id', {
            templateUrl : 'views/mod_unidad.html',
            controller  : 'MUnidadController'
        })
            .when('/tipo_documentos', {
            templateUrl : 'views/tipo_documentos.html',
            controller  : 'TipoDocumentosController'
        })
            .when('/nuevo_tipoDocumento', {
            templateUrl : 'views/nuevo_tipoDocumento.html',
            controller  : 'nuevo_tipoDocumentoController'
        })
            .when('/mod_tipoDocumento/:id', {
            templateUrl : 'views/mod_tipoDocumento.html',
            controller  : 'mod_tipoDocumentoController'
        })
            .otherwise({
            redirectTo: '/'
        });
});


