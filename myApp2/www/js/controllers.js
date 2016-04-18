
var controllerModule = angular.module('blank.controllers', []);

controllerModule.controller("loginController", function($scope, $http){

    $scope.username = "";
    $scope.name = ""


    var dati = {
        username : $scope.username
    };

    $scope.doLogin = function(email, password){
        $scope.email = email;
        $scope.password = password;
        alert("Email: " + email + " Password: " + password);
        $scope.shaObj = new jsSHA("SHA-512", "TEXT");
        $scope.shaObj.update(password);
        $scope.hash = $scope.shaObj.getHash("B64");
        console.log($scope.hash);

        var dataObj = {
            email: $scope.email,
            password: $scope.hash
        };

        $http({
            method: "POST",
            url: "http://its-bitrace.herokuapp.com/api/public/v2/login",
            data: dataObj,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).success(function (response) {
            if(response.success == true){
                alert("Login effettuato")
            }
            else{
                alert("Errore di login")
            }
            console.log(response);
        }).error(function(response){
            console.log(response);
        }).then(function(response){
            $scope.documents = response.data.data;
            console.log($scope.documents)
        })

    }


});
