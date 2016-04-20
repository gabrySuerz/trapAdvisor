
var controllerModule = angular.module('controllers', ['uiGmapgoogle-maps']);

controllerModule.controller("loginCtrl", function ($scope, $http, $state, loginModule) {

    $scope.doLogin = function (email, password) {
        loginModule.loginFx(email, password)
            .success(function (response) {
            }).error(function (response) {
                console.log(response);
                alert("Controllare le credenziali e verificare che la rete dati sia attiva")
            }).then(function (response) {
                $scope.user = response.data.data;
                localStorage.setItem("session", $scope.user.session)
                $state.go('map');
            })

    }

}).controller('mapCtrl', function ($scope, $stateParams, $http, uiGmapGoogleMapApi, dataModule) {

    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/"

    dataModule.dataFx(url)
        .success(function (response) {
        }).error(function (response) {
            console.log(response);
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

    $scope.map = {
        center: {
            latitude: 37.2756583,
            longitude: -104.6560543
        },
        zoom: 4
    }

    $scope.options = {
        scrollwheel: false
    }

    $scope.windowOptions = {
        visible: false
    };

}).controller('detailCtrl', function ($scope, $stateParams, dataModule) {

    var guid = $stateParams.guid
    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/" + guid

    dataModule.dataFx(url)
        .success(function (response) {
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            $scope.store = response.data.data
            localStorage.setItem($scope.store.id, $scope.store)
        });

})