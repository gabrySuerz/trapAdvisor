angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, $templateCache) {

  var dataObj = {
    action: "incaneva_events",
    blog: "1,6,7,8",
    old: true,
    limit: 10
  };

  $http({
    method: "POST",
    url: "http://incaneva.it/wp-admin/admin-ajax.php",
    data: dataObj,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }
  }).success(function (data) {
    console.log(data);
  }).error(function(response){
    console.log(data);
  }).then(function(response){
    $scope.documents = response.data.data;
  })

})

.controller('PlaylistCtrl', function($scope,$stateParams,$http,documents) {

  var index=dataAccess.getById($stateParams.id);
  alert(documents);


 /* var dataObj = {
    action: "incaneva_events",
    blog: "1,6,7,8",
    old: true,
    limit: 10
  };

  $http({
    method: "POST",
    url: "http://incaneva.it/wp-admin/admin-ajax.php",
    data: dataObj,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }
  }).success(function (data) {
    console.log(data);
  }).error(function(response){
    console.log(data);
  }).then(function(response){
    $scope.documents = response.data.data;
  })*/


})
.controller('BrowseCtrl', function($scope, $http, $templateCache) {
    var dataObj = {
    action: "incaneva_events",
    blog: "1,6,7,8",
    limit: 5
  };

  $http({
    method: "POST",
    url: "http://incaneva.it/wp-admin/admin-ajax.php",
    data: dataObj,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }
  }).success(function (data) {
    console.log(data);
  }).error(function(response){
    console.log(data);
  }).then(function(response){
    $scope.documents = response.data.data;
  })
});
