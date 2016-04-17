angular.module('starter')

.controller('loginCtrl', function ($scope, $stateParams) {

})

.controller('mapReadyCtrl', function ($scope, $stateParams, uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function (maps) {

    })
})

.controller('mapCtrl', function ($scope, $stateParams) {

    $scope.map = {
        center: {
            latitude: 42,
            longitude: 42
        },
        zoom: 10
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
});
