
var _clientID = "WVF4QTKI5BZOTCZST2PRZM2TIYUUBG5T2CJEXD14RXYQKMDK"
var _clientSecret = "F2QSSLPPKX4M52UC3RWI3ZQY2JAPMWQ0XS5ZHP2VQUBPE45V"

var jesseApp = angular.module('factory', ['controllers', 'ngCordova'])

jesseApp.factory('loginF', ['$http', function ($http) {

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

jesseApp.factory('dataF', ['$http', '$stateParams', '$sessionStorage', function ($http, $stateParams, $sessionStorage) {
    return {
        dataFx: function (url) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    'x-bitrace-session': $sessionStorage.session
                }
            })
        }
    }
}])

jesseApp.factory('markersF', function () {
    return {
        markersFx: function (result) {
            var m = []
            for (var i = 0 ; i < result.length; i++) {
                m.push({
                    id: result[i].guid,
                    coords: {
                        latitude: result[i].latitude,
                        longitude: result[i].longitude
                    },
                    options: {
                        draggable: false,
                        labelVisible: false
                    },
                    title: result[i].name
                })
            }
            return m
        }
    }
})

jesseApp.factory('positionF', ['$http', '$stateParams', '$cordovaGeolocation', function ($http, $stateParams, $cordovaGeolocation) {
    return {
        posFx: function () {
            var posOptions = { timeout: 50000, enableHighAccuracy: false };
            return $cordovaGeolocation
              .getCurrentPosition(posOptions)
        }
    }
}])

jesseApp.factory('fourSquareF', ['$http', function ($http) {
    return {
        valFx: function (place) {
            $http({
                method: "GET",
                url: "https://api.foursquare.com/v2/venues/search?client_id=" + _clientID
                    + "&client_secret=" + _clientSecret
                    + "&v=20130815"
                    + "&ll=" + place.latitude + "," + place.longitude
                    + "&query=" + place.name,
            })
        }
    }
}])