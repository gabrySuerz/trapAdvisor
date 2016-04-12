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
    var numpost = 10;
    
    var dataObj = {
        action: "incaneva_events",
        blog: "1,6,7,8",
        limit: numpost
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
        $scope.posts = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
        $scope.isLoading=false;
    }).then(function (response) {
        $scope.posts = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.posts))
        $scope.isLoading=false;
    })
    
    
    $scope.loadMore=function(){
        isLoading = true
        var dataObj = {
            action: "incaneva_events",
            blog: "1,6,7,8",
            offset: numpost,
            limit: 10
        };
        numpost = numpost * 2
        
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
            $scope.posts += [{ blogname: "Nessun post trovato", post_excerpt: ""}]
            $scope.isLoading=false;
        }).then(function (response) {
            for(var i=0;i<response.data.data.length;i++){
            $scope.posts.push(response.data.data[i])}
            console.log($scope.posts)
            localStorage.setItem("posts", angular.toJson($scope.posts))
            $scope.isLoading=false;
        })
    }
     
})

.controller('PlaylistCtrl', function($scope,$stateParams,$http) {
    $scope.index = $stateParams.id;
    var i = $scope.index;
    var allposts
    if($stateParams.type=='cat')
        allposts = JSON.parse(localStorage.getItem("categorypost"))
    else
        allposts = JSON.parse(localStorage.getItem("posts"))
    $scope.post = allposts[i]
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
        $scope.posts = [{ blogname: "Nessun post trovato", post_excerpt: ""}]
        $scope.isLoading=false;
    }).then(function (response) {
        $scope.posts = response.data.data;
        localStorage.setItem("posts", angular.toJson($scope.posts))
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
        for(var i=0; i<$scope.posts.length; i++) {
            if($scope.posts[i].event_type[1]==$scope.category){
                $scope.postsByCat.push($scope.posts[i]);
            }
        }
        localStorage.setItem("categorypost",$scope.postsByCat)
        $scope.isLoading=false;
    })
});
