angular.module('LoginCtrl', []).controller('LoginController', function($scope, Nerd , $location , storage) {

  $scope.user = {};
  $scope.showheader = false;

  $scope.ok = function () {
  		Nerd.login($scope.user).then(function(data){
        		$scope.user = data.data;
        		if($scope.user.token){
        			$location.path('/users');
        			storage.set('token',$scope.user.token);
        		}
            	
	    });
  };
});

