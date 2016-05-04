
var jesseApp = angular.module('starter', ['ionic', 'controllers', 'factory']);

var _key = 'AIzaSyBH5mSXgLqSdmq18AUnNCKp5h65CJdj_Dk'

jesseApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
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
            controller: 'topCtrl'
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
            controller: 'tabCtrl'
        }).state('tab.detail', {
            url: '/detail/:guid',
            views: {
                'tab-detail': {
                    templateUrl: 'templates/detail.html',
                    controller: 'detailCtrl'
                }
            }
        }).state('tab.products', {
            url: '/products/:guid',
            views: {
                'tab-products': {
                    templateUrl: 'templates/products.html',
                    controller: ''
                }
            }
        }).state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/contacts.html',
                    controller: 'contactsCtrl'
                }
            }
        })

    if (sessionStorage.getItem("session") != null) {
        $urlRouterProvider.otherwise('/top/map');
    } else {
        $urlRouterProvider.otherwise('/login');
    }
})

