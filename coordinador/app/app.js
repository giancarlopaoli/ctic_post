// Creación del módulo
var angularCoordinadorApp = angular.module('angularCoordinadorApp', ['ngRoute', 'Controllers']);

// Configuración de las rutas
angularCoordinadorApp.config(function($routeProvider) {
    $routeProvider
      
        .when('/', {
            templateUrl : 'views/configuracion.html',
            controller  : 'configController'
        })
            .when('/programas', {
            templateUrl : 'views/programas.html',
            controller  : 'programaController'
        })
            .when('/nuevo_programa', {
            templateUrl : 'views/nuevo_programa.html',
            controller  : 'NuevoProgramaController'
        })
            .when('/modPrograma/:id', {
            templateUrl : 'views/editar_programa.html',
            controller  : 'EditarProgramaController'
        })
            .when('/planesestudio', {
            templateUrl : 'views/planes_estudio.html',
            controller  : 'planesController'
        })
            .when('/nuevo_planEstudios', {
            templateUrl : 'views/nuevo_plan.html',
            controller  : 'NuevoPlanController'
        })
            .when('/modPlan', {
            templateUrl : 'views/editar_planEstudio.html',
            controller  : 'EditarPlanesController'
        })
            .when('/cursos', {
            templateUrl : 'views/cursos.html',
            controller  : 'cursosController'
        })
            .when('/nuevo_curso', {
            templateUrl : 'views/nuevo_curso.html',
            controller  : 'NuevoCursoController'
        })
            .when('/detCurso/:id', {
            templateUrl : 'views/detalle_curso.html',
            controller  : 'DetalleCursoController'
        })
            .when('/periodo_academico', {
            templateUrl : 'views/periodo_academico.html',
            controller  : 'periodo_academicoController'
        })
            .when('/grupos', {
            templateUrl : 'views/grupos.html',
            controller  : 'gruposController'
        })
            .otherwise({
            redirectTo: '/'
        });
});


