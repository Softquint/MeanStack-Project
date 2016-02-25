angular.module('MainCtrl', []).controller('MainController', function($scope, Nerd , $uibModal , storage, $location) {

	// Varibale declaration;
	$scope.User = {};
	$scope.message;
	$scope.ShowMessage = false;
	$scope.MessageClass;
	$scope.showheader = true;
	var token = storage.get('token');
	if(!token){
		$location.path('/');
	}
	

	/* Get list of User */
	ListUser();
	function ListUser(){
		Nerd.get().then(function(data){
	      $scope.Users = data.data;
	    });
	} 


	/* Add User */
	$scope.addUser = function(user){
		var modalInstance = $uibModal.open({
	    animation: $scope.animationsEnabled,
	    templateUrl: 'views/adduser.html',
	    controller: 'AddUserController',
	    size: 'lg',
	    resolve: {
	        items: function () {
	          return user;
	        }
	      }
	    });
	    modalInstance.result.then(function (selectedItem) {
	    	$scope.MessageClass = 'alert-success';
	    	$scope.ShowMessage = true;
	    	$scope.message = "User Added Successfully"
	      	ListUser();
	    }, function () {
	      //$log.info('Modal dismissed at: ' + new Date());
	    });
	}

	/* Edit User */
	$scope.editUser = function(user){
		var modalInstance = $uibModal.open({
	    animation: $scope.animationsEnabled,
	    templateUrl: 'views/edituser.html',
	    controller: 'EditUserController',
	    size: 'lg',
	    resolve: {
	        items: function () {
	          return user;
	        }
	      }
	    });
	    modalInstance.result.then(function (selectedItem) {
	      	$scope.MessageClass = 'alert-success';	
	      	$scope.ShowMessage = true;
	      	$scope.message = "User Update Successfully"
	      	ListUser();
	    }, function () {
	      //$log.info('Modal dismissed at: ' + new Date());
	    });
	}


	/* Delete User */
	$scope.deleteUser = function(user){
		var modalInstance = $uibModal.open({
	    animation: $scope.animationsEnabled,
	    templateUrl: 'views/deleteuser.html',
	    controller: 'DeleteUserController',
	    size: 'lg',
	    resolve: {
	        items: function () {
	          return user;
	        }
	      }
	    });
	    modalInstance.result.then(function (selectedItem) {
	    	$scope.MessageClass = 'alert-success';
	    	$scope.ShowMessage = true;
	    	$scope.message = "User Deleted Successfully"
	      ListUser();
	    }, function () {
	    });
	}
    
});