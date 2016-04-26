﻿// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
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

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        .state('top', {
            url: '/top',
            abstract: true,
            templateUrl: 'templates/top.html'
        })
        .state('top.map', {
            url: '/map',
            views: {
                'top-map': {
                    templateUrl: 'templates/mapPage.html',
                    controller: 'mapCtrl'
                }
            }
        })
        .state('top.list', {
            url: '/list',
            views: {
                'top-list': {
                    templateUrl: 'templates/list.html',
                    controller: 'mapCtrl'
                }
            }
        })

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            controller: 'tabCtrl'
        })
        .state('tab.detail', {
            url: '/detail/:guid',
            views: {
                'tab-detail': {
                    templateUrl: 'templates/detail.html',
                    controller: 'detailCtrl'
                }
            }
        })
        .state('tab.products', {
            url: '/products',
            views: {
                'tab-products': {
                    templateUrl: 'templates/products.html',
                    controller: 'detailCtrl'
                }
            }
        })
        .state('tab.contacts', {
            url: '/contacts',
            views: {
                'tab-contacts': {
                    templateUrl: 'templates/contacts.html',
                    controller: 'detailCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    //if (localStorage.getItem("session") != null) {
        //$urlRouterProvider.otherwise('/top/map');
    //} else {
        $urlRouterProvider.otherwise('/login');
    //}
}).config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: _key,
        v: '3.22',
        libraries: '',
        language: 'it',
    })
});

