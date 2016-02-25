angular.module('DeleteUserCtrl', []).controller('DeleteUserController', function($scope, $uibModalInstance, items, Nerd) {

  $scope.deleteuser = items; 

  $scope.ok = function () {
    Nerd.delete($scope.deleteuser._id).then(function(data){
        $scope.Users = data.data;
      });
    $uibModalInstance.close($scope.adduser);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

