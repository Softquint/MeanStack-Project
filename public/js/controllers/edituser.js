angular.module('EidtUserCtrl', []).controller('EditUserController', function($scope, $uibModalInstance, items, Nerd) {

  
  $scope.edituser = items; 

  $scope.ok = function (isValid) {  
    if(isValid){  
      Nerd.update($scope.edituser._id, $scope.edituser).then(function(data){
          $scope.edituser = data.data;
        });
      $uibModalInstance.close($scope.edituser);
    }
    else{
      console.log('Error')
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

