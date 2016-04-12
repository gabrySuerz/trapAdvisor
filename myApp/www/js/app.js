// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
        url: '/playlists/:id',
        views: {
        'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
        }
        }
    })

    .state('app.login', {
      url: '/login/:category',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
}).filter('myFilter', function() {
    return function(x) {
        var pos = x.search('\r');
        x=x.substring(0,pos);
        return x;
    }
}).filter('capitalize', function() {
    return function(x) {
        return (!!x) ? x.charAt(0).toUpperCase() + x.substr(1).toLowerCase() : '';
    }
}).filter('under', function() {
    return function(x) {
        return (!!x) && (x.indexOf("_")) ? x.replace("_", " e ") : '';
    }
});

function dati($http, dataObj, mydata){
    localStorage.clear()
    $http({
        method: "POST",
        url: "http://incaneva.it/wp-admin/admin-ajax.php",
        data: dataObj,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        }
    }).success(function (data) {
        
    }).error(function(response){
        return "no post found"
    }).then(function (response) {
        mydata = response.data.data;
        localStorage.setItem("posts", angular.toJson(mydata))
        return mydata;
    })
}