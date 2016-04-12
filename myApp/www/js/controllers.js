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
    $scope.isLoading=true;

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
        $scope.isLoading=false;
    }).then(function (response) {
        $scope.documents = response.data.data;
        console.log($scope.documents)
        localStorage.setItem("posts", angular.toJson($scope.documents))
        $scope.isLoading=false;
    })

})

.controller('PlaylistCtrl', function($scope,$stateParams,$http) {

  //Get the position of the required obj
  $scope.index = $stateParams.id;//dataAccess.getById($stateParams.id);
  var i = $scope.index;


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
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function (obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }
  })
    .success(function (data) {
      //Get post
      $scope.post = data.data[i];
      console.log($scope.post);
    })
    .error(function (response) {
      console.log(data);
    })
    .then(function (response) {

    })



})

.controller('BrowseCtrl', function($scope, $http, $templateCache) {
    $scope.isLoading=true;

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
        $scope.isLoading=false;
    }).then(function (response) {
        $scope.documents = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.documents))
        $scope.isLoading=false;
    })

})

.controller('LoginCtrl', function($scope, $http, $templateCache,$stateParams) {
    $scope.category = $stateParams.category;
    $scope.postsByCat = [];
    $scope.isLoading=true;

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
    $scope.postsByCat = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
    $scope.isLoading=false;
  }).then(function (response) {
    $scope.posts = response.data.data;
    localStorage.setItem("posts", angular.toJson($scope.posts))
    for(var i=0; i<$scope.posts.length(); i++) {
      if($scope.post[i].event_type[1]==$scope.category){
        $scope.postsByCat.push($scope.post[i]);
      }
    }
    localStorage.clear();
    localStorage.setItem("postbycat",JSON.stringify($scope.postsByCat));
    $scope.isLoading=false;
  })
})



.controller('DetailsByCategoryCtrl', function($scope,$stateParams,$http) {

    $scope.index=$stateParams.id;//dataAccess.getById($stateParams.id);
    var i=$scope.index;


    var allPostByCat=JSON.parse(localStorage.getItem("postbycat"));//localStorage.getItem("postbycat");

    $scope.post=allPostByCat[i];
    console.log("INDEX: " + i);
    console.log($scope.post);

  });
