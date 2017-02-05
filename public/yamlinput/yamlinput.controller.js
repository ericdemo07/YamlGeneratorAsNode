(function() {
    angular.module('yamlGeneratorApp').controller('YamlInputController',
        YamlInputController);
    YamlInputController.$inject = ['$location', 'QueryService', '$scope',
        '$stateParams', '$state'
    ];

    function YamlInputController($location, QueryService, $scope, $stateParams,
        $state) {
        var vm = this;
        $scope.bidates = [{
            startDate: 'choice1'
        }];
        $scope.addNewDate = function() {
            var newItemNo = $scope.bidates.length + 1;
            $scope.bidates.push(newItemNo);
        };

        $scope.removeDate = function() {
            var lastItem = $scope.bidates.length - 1;
            $scope.bidates.splice(lastItem);
        };

        $scope.bipaths = [{
            startDate: 'choice1'
        }];
        $scope.addNewPath = function() {
            var newItemNo = $scope.bipaths.length + 1;
            $scope.bipaths.push(newItemNo);
        };

        $scope.removePath = function() {
            var lastItem = $scope.bipaths.length - 1;
            $scope.bipaths.splice(lastItem);
        };
        vm.login = login;
        var responseObject = new Object();

        function login() {
            vm.dataLoading = true;
            QueryService.GenerateYaml(vm).then(function(response) {
                console.log("In controller : [" + response);
                $scope.responseObject = response;
            });
        };
    }
})();
