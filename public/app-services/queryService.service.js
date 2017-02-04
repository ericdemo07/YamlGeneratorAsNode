(function() {
    angular.module('yamlGeneratorApp').factory('QueryService', QueryService);
    QueryService.$inject = ['$http', '$location'];

    function QueryService($http, $location) {
        var service = {};
        service.GenerateYaml = GenerateYaml;
        return service;

        function GenerateYaml(query) {
            var request = $http({
                method: "post",
                url: "/generateyaml",
                params: {
                    brandName: query
                }
            });
            return request.then(handleSuccess, handleError('Faliure'));
        }

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function() {
                return {
                    success: false
                };
            };
        }
    }
})();
