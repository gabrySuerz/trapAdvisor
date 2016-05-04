
var controllerModule = angular.module('controllers', ['uiGmapgoogle-maps', 'ngStorage']);

controllerModule.controller("loginCtrl", function ($scope, $http, $state, loginModule, $ionicPopup) {

    localStorage.clear("stores")

    if (localStorage.getItem("userJesse") != null && localStorage.getItem("pwdJesse") != null) {
        console.log(localStorage.getItem())
        $scope.email = localStorage.getItem("userJesse")
        $scope.password = localStorage.getItem("pwdJesse")
    }

    $scope.doLogin = function (email, password) {
        loginModule.loginFx(email, password)
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
                    sessionStorage.setItem("session", $scope.user.session)
                    localStorage.setItem("userJesse", email)
                    localStorage.setItem("pwdJesse", password)
                    $state.go('top.map');
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
            })
    }
})

