angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('PlaylistsCtrl', function($scope, $http, $templateCache) {
    var dataObj = {
        action: "incaneva_events",
        blog: "1,6,7,8",
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
        
    }).error(function(response){
        $scope.documents = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
    }).then(function (response) {
        $scope.documents = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.documents))
    })
         
})

.controller('PlaylistCtrl', function($scope,$stateParams,$http) {
    $scope.index = $stateParams.id;
    var i = $scope.index;
    var allposts = JSON.parse(localStorage.getItem("posts"))
    $scope.post = allposts[i]
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
        
    }).error(function(response){
        $scope.documents = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
    }).then(function (response) {
        $scope.documents = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.documents))
    })

})

.controller('LoginCtrl', function($scope, $http, $templateCache,$stateParams) {
    $scope.category = $stateParams.category;
    $scope.postsByCat = [];

    var dataObj = {
        action: "incaneva_events",
        blog: "1,6,7,8",
        old: true,
        limit: 20
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
        
    }).error(function(response){
        $scope.documents = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
    }).then(function (response) {
        $scope.documents = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.documents))
    })
    
    for(var i=0; i<$scope.post.length; i++) {
    //console.log($scope.post[i].event_type[1]);
    if($scope.post[i].event_type[1]==$scope.category){
            posts.push($scope.post[i]);
        }
    }
    $scope.postsByCat=posts;
    console.log($scope.postsByCat.length);
});
