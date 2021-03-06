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
                data: query
            });
            return request.then(handleSuccess, handleError);
        }

        function handleSuccess(data) {
            return data.data;
        }

        function handleError(error) {
            console.log(error);
        }
    }
})();
