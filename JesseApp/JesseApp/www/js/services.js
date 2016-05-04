
var jesseApp = angular.module('service', ['controllers'])

jesseApp.service('mapService', ['$localStorage', function ($localStorage) {

    this.map = {
        center: {
            latitude: $localStorage.coords.lat,
            longitude: $localStorage.coords.long
        },
        zoom: 2
    }

    this.options = {
        scrollwheel: false
    }

    this.windowOptions = {
        visible: false
    }

}])
