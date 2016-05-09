
var jesseApp = angular.module('starter', ['ionic', 'controllers', 'factory', 'service']);

var _key = 'AIzaSyBH5mSXgLqSdmq18AUnNCKp5h65CJdj_Dk'

jesseApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

jesseApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

    $stateProvider
        .state('top', {
            url: '/top',
            abstract: true,
            templateUrl: 'templates/top.html',
            controller: 'barCtrl'
        }).state('top.map', {
            url: '/map',
            views: {
                'top-map': {
                    templateUrl: 'templates/mapPage.html',
                    controller: 'mapCtrl'
                }
            }
        }).state('top.list', {
            url: '/list',
            views: {
                'top-list': {
                    templateUrl: 'templates/list.html',
                    controller: 'mapCtrl'
                }
            }
        })

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            controller: 'barCtrl'
        }).state('tab.details', {
            url: '/details',
            views: {
                'tab-details': {
                    templateUrl: 'templates/detail.html',
                    controller: 'detailsCtrl'
                }
            }
        }).state('tab.products', {
            url: '/products',
            views: {
                'tab-products': {
                    templateUrl: 'templates/products.html',
                    controller: 'detailsCtrl'
                }
            }
        }).state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/contacts.html',
                    controller: 'detailsCtrl'
                }
            }
        })

    if (sessionStorage.session != null) {
        $urlRouterProvider.otherwise('/top/map');
    } else {
        $urlRouterProvider.otherwise('/login');
    }
})

jesseApp.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: _key,
        v: '3.22',
        libraries: '',
        language: 'it',
    })
})

jesseApp.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false)
});

jesseApp.filter('capitalize', function () {
    return function (x) {
        return (!!x) ? x.charAt(0).toUpperCase() + x.substr(1).toLowerCase() : '';
    }
})

/*
$stateProvider
    .state('fourLogin', {
        url: '/fourSquare',
        templateUrl: 'templates/fourLogin.html',
        controller: 'fourCtrl'
    })*/