/**
 * Created by piero on 20/04/2016.
 */

myApp.factory('MyService', function($http, $stateParams) {

    var factory = {};

    var documents1;

    var documents2;



    factory.POST = function(dataObj) {

        return $http({
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
        })
    }



    factory.GET1 = function() {

        mySession = localStorage.getItem("session");

        return $http({
            method: "GET",
            url: "http://its-bitrace.herokuapp.com/api/v2/stores/",
            headers: {
                'x-bitrace-session': mySession
            }
        })
    }

    factory.GET2 = function(link) {

        mySession = localStorage.getItem("session");

        return $http({
            method: "GET",
            url: "http://its-bitrace.herokuapp.com/api/v2/stores/" + link,
            headers: {
                'x-bitrace-session': mySession
            }
        })
    }

    return factory;
});
