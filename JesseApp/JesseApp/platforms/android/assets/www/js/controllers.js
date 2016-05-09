
var controllerModule = angular.module('controllers', ['uiGmapgoogle-maps', 'ngStorage', 'angular-advanced-searchbox']);

controllerModule.controller("loginCtrl", function ($scope, $state, loginF, $ionicPopup, $sessionStorage, $localStorage, positionF) {

    delete $localStorage.stores
    delete $sessionStorage.session
    $scope.spinner = false

    $scope.doLogin = function (email, password) {
        $scope.spinner = true
        loginF.loginFx(email, password)
            .success(function (response) {
                if (response.success != true) {
                    if (response.errorCode == 200) {
                        $ionicPopup.alert({
                            title: 'Credenziali invalide',
                            template: 'Controllare le credenziali e riprova ad effettuare il login'
                        })
                    }
                } else {
                    $scope.user = response.data;
                    $sessionStorage.session = $scope.user.session
                    positionF.posFx().then(function (position) {
                        $localStorage.coords = {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                        $state.go('top.map');
                    }, function (err) {
                        $localStorage.coords = {
                            lat: 37.2756583,
                            long: -104.6560543
                        }
                        $state.go('top.map');
                    })
                }
            }).error(function (response) {
                if (response.errorCode == 403) {
                    $ionicPopup.alert({
                        title: 'Connessione al server',
                        template: 'Il server potrebbe essere non raggiungibile riprova più tardi'
                    })
                } else {
                    $ionicPopup.alert({
                        title: 'Errore di connessione',
                        template: 'Attivare la rete dati e riprova ad effettuare il login'
                    })
                }
            }).then(function (response) {
                $scope.spinner = false
            })
    }

    $scope.alert = function () {
        $ionicPopup.alert({
            title: 'Non puoi registrarti',
            template: 'Siamo spiacenti ma il servizio non è ancora disponibile'
        })
    }

})

controllerModule.controller('barCtrl', function ($scope, $stateParams, $state, $rootScope) {

    $scope.panel = true

    $scope.open = function () {
        $scope.panel = !$scope.panel
    }

    $scope.foursquare = function () {
        $state.go('fourLogin')
    }

    $rootScope.$ionicGoBack = function () {
        $state.go('top.map')
    };

    $scope.logout = function () {
        $state.go('login')
    }

})

controllerModule.controller('mapCtrl', function ($scope, $state, $localStorage, uiGmapGoogleMapApi, dataF, mapService, markersF) {

    var url = "http://its-bitrace.herokuapp.com/api/v2/stores/"
    $scope.data = $localStorage.stores
    if ($scope.data != null) {
        $scope.markers = []
        $scope.markers = markersF.markersFx($scope.data)
    } else {
        dataF.dataFx(url)
            .success(function (response) {
                $scope.data = response.data
                $scope.markers = markersF.markersFx($scope.data)
                $localStorage.stores = $scope.data
            }).error(function (response) {
                console.log(response);
            }).then(function (response) {

            })
    }

    $scope.map = mapService.map

    $scope.options = mapService.options

    $scope.windowOptions = mapService.windowOptions

    $scope.url = function (guid) {
        $localStorage.actual = guid
        $state.go('tab.details')
    }

})

controllerModule.controller('detailsCtrl', function ($scope, $localStorage, dataF, fourSquareF, markerF, uiGmapGoogleMapApi) {

    if ($localStorage.store != null) {
        var data = $localStorage.store
        if (data.guid == $localStorage.actual) {
            $scope.store = data
            $scope.fourSquareF = fourSquareF.valFx($scope.store)
            $scope.marker = markerF.markFx($scope.store)
            $scope.map = {
                center: {
                    latitude: $scope.store.latitude,
                    longitude: $scope.store.longitude
                },
                zoom: 6
            }
        }
        else {
            dataF.dataFx("http://its-bitrace.herokuapp.com/api/v2/stores/" + $localStorage.actual)
                .success(function (response) {
                    $scope.store = response.data
                    console.log($scope.store)
                    $localStorage.store = {}
                    $localStorage.store = $scope.store
                    $scope.marker = markerF.markFx($scope.store)
                    $scope.map = {
                        center: {
                            latitude: $scope.store.latitude,
                            longitude: $scope.store.longitude
                        },
                        zoom: 6
                    }
                    $scope.fourSquareF = fourSquareF.valFx($scope.store)
                }).error(function (response) {
                    console.log(response);
                }).then(function (response) {

                });
        }
    } else {
        dataF.dataFx("http://its-bitrace.herokuapp.com/api/v2/stores/" + $localStorage.actual)
            .success(function (response) {
                $scope.store = response.data
                $localStorage.store = {}
                $localStorage.store = $scope.store
                $scope.marker = markerF.markFx($scope.store)
                $scope.map = {
                    center: {
                        latitude: $scope.store.latitude,
                        longitude: $scope.store.longitude
                    },
                    zoom: 6
                }
                $scope.fourSquareF = fourSquareF.valFx($scope.store)
            }).error(function (response) {
                console.log(response);
            }).then(function (response) {
            });
    }

    $scope.options = {
        scrollwheel: false
    }

    $scope.windowOptions = {
        visible: false
    }

})

controllerModule.controller('fourCtrl', function ($scope, $rootScope, $ionicHistory) {

    $scope.fourUser = "Username/Email"
    $scope.fourPwd = "Password"

    $rootScope.$ionicGoBack = function () {
        $ionicHistory.goBack();
    };
})