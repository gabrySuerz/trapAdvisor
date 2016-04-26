
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

jesseApp.factory('dataModule', ['$http', '$stateParams', function ($http, $stateParams) {
    return {
        dataFx: function (url) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    'x-bitrace-session': localStorage.getItem("session")
                }
            })
        }
    }
}])