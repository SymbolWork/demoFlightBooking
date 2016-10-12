var router = angular.module('myapp.router', []);

router
    .config(['$httpProvider',function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['uid'] = "NEW";
     }]) 
router
    .config(['$urlRouterProvider','$locationProvider',
        function($urlRouterProvider,$locationProvider) {
            $urlRouterProvider.otherwise("/");
            //$locationProvider.html5Mode(true).hashPrefix('!');
    }]);
router
    .config(['$stateProvider',
        function($stateProvider) {
          $stateProvider
          .state('root', {
                abstract: true,
                views:{   
                    'header' : {
                      controller: 'myapp.controller.header',
                      controllerAs: 'headerCtrl',
                      templateProvider: ['$templateRequest',
                        function($templateRequest)
                        {
                            return $templateRequest("app/components/header/header.html");
                        }
                      ]
                    }
                }
            })
            .state('root.search', {
                url :'/',
                views :  {
                    'main@': {
                        controller: 'myapp.controller.search',
                        controllerAs: 'searchCtrl',
                        templateProvider: ['$templateRequest',
                        function($templateRequest) {
                            return $templateRequest("app/components/search/search.html");
                        }]
                    }
                }
            })
            .state('root.home', {
                url :'/home',
                views :  {
                    'main@': {
                        controller: 'myapp.controller.home',
                        controllerAs: 'homeCtrl',
                        templateProvider: ['$templateRequest',
                        function($templateRequest) {
                            return $templateRequest("app/components/home/home.html");
                        }]
                    }
                }
            })
        }])
