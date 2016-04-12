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
    //console.log(data);
  }).error(function(response){
    console.log(data);
  }).then(function(response){
    $scope.documents = response.data.data;
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

      /*TODO: Parse post_content

       $scope.postContent=$scope.post.post_content;
       console.log( $scope.postContent );

       var tmpStr=$scope.postContent;
       $scope.title=tmpStr.substring($scope.postContent.indexOf("<strong>")+8,tmpStr.indexOf("</strong>"));
       console.log( $scope.title );
       */
    })
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
    //console.log(data);
  }).error(function(response){
    console.log(data);
  }).then(function(response){
    $scope.documents = response.data.data;
  })
})

.controller('LoginCtrl', function($scope, $http, $templateCache,$stateParams) {

  $scope.category=$stateParams.category;
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
  })
    .success(function (data) {
      //Get all post in this category
      $scope.post=data.data;
      console.log($scope.post);
      console.log("CATEGORY: " +  $scope.category);

      var posts=[];

      for(var i=0; i<$scope.post.length; i++) {
       //console.log($scope.post[i].event_type[1]);
       if($scope.post[i].event_type[1]==$scope.category){
         $scope.postsByCat.push($scope.post[i]);
        }
      }
      /*
      console.log($scope.postsByCat.length);
      console.log($scope.postsByCat[1]);
      */

      localStorage.clear();
      localStorage.setItem("postbycat",JSON.stringify($scope.postsByCat));

      console.log("Oggetto salvato in localStoragge= "+JSON.parse(localStorage.getItem("postbycat")));

      $scope.isLoading=false;
    })
    .error(function(response){
      console.log(data);
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


