angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {

        // call to get all nerds
        get : function() {
           return $http.get('/api/nerds').then(function(data){
              return data;
            });                
        },  

        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        },

        // call to Update a nerd
        update : function(id, data) {
            return $http.put('/api/nerds/' + id , data);
        },

        // call to Login a nerd
        login : function(nerdData) {
            return $http.post('/api/login' , nerdData);
        }
    }       

}]);