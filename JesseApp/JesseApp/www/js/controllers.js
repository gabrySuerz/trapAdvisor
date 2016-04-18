
var controllerModule = angular.module('blank.controllers', ['uiGmapgoogle-maps']);

controllerModule.controller("loginCtrl", function ($scope, $http) {

    $scope.username = "";
    $scope.name = ""


    var dati = {
        username: $scope.username
    };

    $scope.doLogin = function (email, password) {
        $scope.email = email;
        $scope.password = password;
        alert("Email: " + email + " Password: " + password);
        $scope.shaObj = new jsSHA("SHA-512", "TEXT");
        $scope.shaObj.update(password);
        $scope.hash = $scope.shaObj.getHash("B64");

        var dataObj = {
            email: $scope.email,
            password: $scope.hash
        };

        $http({
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
        }).success(function (response) {
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            $scope.user = response.data.data;
        })

    }


}).controller('mapCtrl', function ($scope, $stateParams, uiGmapGoogleMapApi) {

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

    $scope.marker = {
        id: 0,
        coords: {
            latitude: 40.1451,
            longitude: -99.6680
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    }

    $scope.windowOptions = {
        visible: false
    };

    $scope.onClick = function () {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function () {
        $scope.windowOptions.visible = false;
    };

    uiGmapGoogleMapApi.then(function (maps) {

    });

}).controller('detailCtrl', function ($scope, $stateParams) {});
