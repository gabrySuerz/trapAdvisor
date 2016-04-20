var controllerModule = angular.module('blank.controllers', ['uiGmapgoogle-maps']);

controllerModule.controller("loginController", function ($scope, $state, MyService) {

    $scope.username = "";
    $scope.name = "";

    localStorage.clear();

    var dati = {
        username: $scope.username
    };

    $scope.doLogin = function (email, password) {
        $scope.email = email;
        $scope.password = password;
        $scope.shaObj = new jsSHA("SHA-512", "TEXT");
        $scope.shaObj.update(password);
        $scope.hash = $scope.shaObj.getHash("B64");
        console.log($scope.hash);

        var dataObj = {
            email: $scope.email,
            password: $scope.hash
        };

        MyService.POST(dataObj).success(function (response) {
            if (response.success == true) {
                alert("Login effettuato")
            }

            console.log(response);
        }).error(function (response) {
            console.log(response);
            alert("Errore di login")
        }).then(function (response) {
            documents1 = response.data.data;
            localStorage.setItem("session", documents1.session);
            $state.go('lists', {session: documents1.session});
        });

    }
})

controllerModule.controller("listsController", function ($scope, $state, $stateParams, MyService) {

    $scope.mySession = localStorage.getItem("session");

    MyService.GET1().success(function (response) {
        console.log(response);
    }).error(function (response) {
        console.log(response);
    }).then(function (response) {
        $scope.documents2 = response.data.data;
    })

    $scope.goToDetails = function (guid) {
        console.log(guid);
        $state.go('details', {session: localStorage.getItem("session"), id: guid});
    }

    $scope.goToMaps = function () {
        $state.go('maps');
    }
})

controllerModule.controller("mapsController", function ($scope, $stateParams, $http, MyService) {

    $scope.session = localStorage.getItem("session");

    if (localStorage.getItem("stores") != null) {
        alert("Esiste già");
        $scope.documents = angular.toJson(localStorage.getItem("stores"));
    }
    else {
        alert("Non esiste ancora")
        MyService.GET1().success(function (response) {
            console.log(response);
            alert("io qua arrivo..1212e12.")
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            alert("io qua arrivo...")
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
    }
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
})

controllerModule.controller("detailsController", function ($scope, $stateParams, MyService) {

    var myGuid = $stateParams.id;
    $scope.guid = myGuid;

    if (localStorage.getItem(myGuid) != null) {
        alert("Esiste già");
        $scope.documents = angular.toJson(localStorage.getItem(myGuid));
    }
    else {
        alert("NON Esiste già")
        MyService.GET2(myGuid).success(function (response) {
            console.log(response);
        }).error(function (response) {
            console.log(response);
        }).then(function (response) {
            $scope.documents = response.data.data;
            localStorage.setItem(myGuid, $scope.documents);
        });
    }


})

