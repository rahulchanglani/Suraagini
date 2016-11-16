angular
    .module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', '$resourceProvider',
        function ($routeProvider, $locationProvider, $resourceProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;

            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainController'
                })

                .otherwise({
                    redirectTo: '/404.html',
                    templateUrl: 'views/404.html'
                });

            if (window.history && window.history.pushState) {
                $locationProvider.html5Mode({
                    enabled: true
                });
            }

        }]);


