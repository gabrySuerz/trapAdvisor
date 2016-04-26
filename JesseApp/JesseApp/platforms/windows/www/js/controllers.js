
var controllerModule = angular.module('controllers', ['uiGmapgoogle-maps']);

controllerModule.controller("loginCtrl", function ($scope, $http, $state, loginModule) {

    $scope.doLogin = function (email, password) {
        loginModule.loginFx(email, password)
            .success(function (response) {
            }).error(function (response) {
                return response.errorMessage
            }).then(function (response) {
                $scope.user = response.data.data;
                //localStorage.setItem("session", $scope.user.session)
                $state.go('top.map');
            })

    }

})

controllerModule.controller('mapCtrl', function ($scope, $state, $stateParams, $http, uiGmapGoogleMapApi, dataModule) {

    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/"
    /*var data = localStorage.getItem("stores")
    if (data != null) {
        $scope.markers = []
        for (var i = 0; i < data.length; i++) {
            $scope.markers.push({
                id: data[i].guid,
                coords: {
                    latitude: data[i].latitude,
                    longitude: data[i].longitude
                },
                options: {
                    draggable: true,
                    labelVisible: false,
                    labelContent: data[i].address
                },
                title: data[i].name
            })
        }
    } else {*/
    dataModule.dataFx(url)
        .success(function (response) {
        }).error(function (response) {
            console.log(response);
            return
        }).then(function (response) {
            var stores = response.data.data;
            localStorage.setItem("stores", stores)
            $scope.markers = []
            for (var i = 0; i < stores.length; i++) {
                $scope.markers.push({
                    id: stores[i].guid,
                    coords: {
                        latitude: stores[i].latitude,
                        longitude: stores[i].longitude
                    },
                    options: {
                        draggable: true,
                        labelVisible: false,
                        labelContent: stores[i].address
                    },
                    title: stores[i].name
                })
            }
        })
    //}

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

}).controller('listCtrl', function ($scope, $stateParams, $http, dataModule) {
    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/"
    /*var data = localStorage.getItem("stores")
    if (data != null) {
        $scope.stores = JSON.parse(data);
    } else {*/
    dataModule.dataFx(url)
        .success(function (response) {
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            $scope.stores = response.data.data;
            localStorage.setItem("stores", $scope.stores)
        })
    // }
})

controllerModule.controller('detailCtrl', function ($scope, $stateParams, dataModule, $window) {

    var guid = $stateParams.guid
    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/" + guid
    var data = localStorage.getItem(guid)
    if (data != null) {
        $scope.store = data;
    } else {
    dataModule.dataFx(url)
        .success(function (response) {
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            $scope.store = response.data.data
            $window.localStorage.setItem($scope.store.id, $scope.store)
        });
    }
    $scope.goBack = function () {
        $state.go('top.map')
        //? $ionicHistory()
    }
})

controllerModule.controller('tabCtrl', function ($scope, $stateParams) {

    $scope.azienda = $stateParams.guid

})