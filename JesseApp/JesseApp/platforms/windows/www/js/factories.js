
var jesseApp = angular.module('factory', ['controllers'])

jesseApp.factory('loginModule', ['$http', function ($http) {

    return {
        loginFx: function (email, password) {
            var shaObj = new jsSHA("SHA-512", "TEXT");
            shaObj.update(password);
            var hash = shaObj.getHash("B64");

            var dataObj = {
                email: email,
                password: hash
            };
            return $http({
                method: "POST",
                url: "http://its-bitrace.herokuapp.com/api/public/v2/login",
                data: dataObj,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            })
        }
    }
}])

/*factories.js
jesseApp.factory('dataModule', ['$http', '$stateParams', function ($http, $stateParams) {
    return {
        dataFx: function (url) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    'x-bitrace-session': sessionStorage.getItem("session")
                }
            })
        }
    }
}])

jesseApp.factory('positionModule', ['$http', '$stateParams', function ($http, $stateParams, $cordovaGeolocation) {
    return {
        posFx: function () {
            var posOptions = { timeout: 50000, enableHighAccuracy: false };
            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                  return {
                      lat: position.coords.latitude,
                      long: position.coords.longitude
                  }
              }, function (err) {
                  return {
                      lat: 37.2756583,
                      long: -104.6560543
                  }
              });
        }
    }
}])*/


/*controller.js
controllerModule.controller('mapCtrl', function ($scope, $state, $stateParams, $http, uiGmapGoogleMapApi, dataModule) {

    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/"
    var data = []
    data = JSON.parse(localStorage.getItem("stores"))
    if (data != null) {
        $scope.markers = []
        for (var i = 0 ; i < data.length; i++) {
            $scope.markers.push({
                id: data[i].guid,
                coords: {
                    latitude: data[i].latitude,
                    longitude: data[i].longitude
                },
                options: {
                    draggable: false,
                    labelVisible: false,
                    labelContent: data[i].address
                },
                title: data[i].name
            })
        }
        console.log($scope.markers)
    } else {
        dataModule.dataFx(url)
            .success(function (response) {
            }).error(function (response) {
                console.log(response);
                return
            }).then(function (response) {
                var stores = response.data.data;
                localStorage.setItem("stores", angular.toJson(stores))
                $scope.markers = []
                for (var i = 0; i < stores.length; i++) {
                    $scope.markers.push({
                        id: stores[i].guid,
                        coords: {
                            latitude: stores[i].latitude,
                            longitude: stores[i].longitude
                        },
                        options: {
                            draggable: false,
                            labelVisible: false,
                            labelContent: stores[i].address
                        },
                        title: stores[i].name
                    })
                }
            })
    }

   /* if (localStorage.getItem('center') != null)
        $scope.map = {
            center: {
                latitude: localStorage.getItem('center').lat,
                longitude: localStorage.getItem('center').long
            },
            zoom: 2
        }
//else
$scope.map = {
    center: {
        latitude: 37.2756583,
        longitude: -104.6560543
    },
    zoom: 2
}

$scope.options = {
    scrollwheel: false
}

$scope.windowOptions = {
    visible: false
}

$scope.url = function (guid) {
    $state.go('tab.detail', { guid: guid })
}

})

controllerModule.controller('topCtrl', function ($scope, $state, $http) {

    $scope.logout = function () {
        $state.go('login');
    }

    var coords = {}

    $scope.pos = function () {
        /*$cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                  coords = {
                      lat: position.coords.latitude,
                      long: position.coords.longitude
                  }
                  localStorage.setItem('center', coords)
              }, function (err) {
                  coords = {
                      lat: 37.2756583,
                      long: -104.6560543
                  }
              })
    }

})

controllerModule.controller('detailCtrl', function ($scope, $stateParams, dataModule, $window) {
previousLocals = $state.$current.locals[localeName];
    var guid = $stateParams.guid
    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/" + guid
    var data = JSON.parse(localStorage.getItem(guid))
    console.log(data)
    if (data != null) {
        $scope.store = data;
        $scope.products = $scope.store.products
        console.log($scope.store)
    } else {
        console.log(url)
        dataModule.dataFx(url)
            .success(function (response) {
                $scope.store = response.data
                console.log($scope.store)
                localStorage.setItem(guid, angular.toJson($scope.store))
                localStorage.setItem("storeac",guid)
            }).error(function (response) {
                console.log(response);
            }).then(function (response) {
            });
    }
})

controllerModule.controller('contactsCtrl', function ($scope, $stateParams, dataModule, $window) {

    var guid = localStorage.getItem("storeac")
    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/" + guid
    var data = JSON.parse(localStorage.getItem(guid))
    if (data != null) {
        $scope.store = data;
        $scope.products = $scope.store.products
        console.log($scope.store)
    } else {
        console.log(url)
        dataModule.dataFx(url)
            .success(function (response) {
                $scope.store = response.data
                localStorage.setItem(guid, angular.toJson($scope.store))
            }).error(function (response) {
                console.log(response);
            }).then(function (response) {
            });
    }
})

controllerModule.controller('tabCtrl', function ($scope, $stateParams, $state, $rootScope) {

    

    $rootScope.$ionicGoBack = function () {
        $state.go('top.map')
    };

    $scope.logout = function () {
        $state.go('login');
    }

})*/


/*app.js
jesseApp.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: _key,
        v: '3.22',
        libraries: '',
        language: 'it',
    })
}).config(function ($ionicConfigProvider){
    $ionicConfigProvider.backButton.previousTitleText(false)
});
*/
