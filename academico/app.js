// Creación del módulo
var angularRoutingApp = angular.module('academico', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl : 'views/inicio.html',
            controller  : 'inicioController'
        })

          .when('/info-personal', {
              templateUrl : 'views/info-pers.html',
              controller  : 'info-persModulo'
          })


        .when('/tramites', {
            templateUrl : 'views/tramites.html',
            controller  : 'tramitesController'
        })
        .when('/info-acad', {
            templateUrl : 'views/info-acad.html',
            controller  : 'info-acadController'
        })
        .when('/encuesta', {
            templateUrl : 'views/encuesta.html',
            controller  : 'encuestaController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
});

angularRoutingApp.controller('inicioController', function($scope) {
});

angularRoutingApp.controller('info-persModulo', function($scope) {
});

angularRoutingApp.controller('tramitesController', function($scope) {

});

angularRoutingApp.controller('info-acadController', function($scope) {

});

angularRoutingApp.controller('encuestaController', function($scope) {

});
