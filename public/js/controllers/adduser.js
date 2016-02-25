angular.module('AddUserCtrl', []).controller('AddUserController', function($scope, $uibModalInstance, items, Nerd) {

  $scope.items = items;
  $scope.adduser = {};
  $scope.adduser.admin = false; 

  $scope.ok = function (isValid) {
  	if(isValid){
      $scope.adduser.admin = true;
  		Nerd.create($scope.adduser).then(function(data){
        		$scope.adduser = data.data;
	    });
	    $uibModalInstance.close($scope.adduser);
  	} else{
  		console.log('False');
  		$scope.submitted = true;
  	}
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

