(function() {
    angular.module('yamlGeneratorApp', ['ui.router', 'ui.bootstrap']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/yamlgenerator");
        $stateProvider.state('yamlgenerator', {
            url: '/yamlgenerator',
            controller: 'YamlInputController',
            templateUrl: 'yamlinput/yamlinput.view.html',
            controllerAs: 'vm'
        });
    }
})();
