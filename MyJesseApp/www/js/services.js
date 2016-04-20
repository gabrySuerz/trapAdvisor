/**
 * Created by piero on 20/04/2016.
 */
var myApp = angular.module('starter', ['ionic','blank.controllers']);

myApp.service('userService', function(){

    this.method1 = function() {
        alert("ciao");
    }
});