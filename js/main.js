var App = angular.module('App', ['firebase']);

    App.controller('TodoCtrl', function($scope, $http, $firebase) {
        var ref = new Firebase("https://brilliant-torch-3226.firebaseio.com/");        

        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        
        // download the data into a local object
        $scope.todos = sync.$asObject();

        $scope.master = {};

        $scope.saveTodo = function ( todo ) {
            $scope.master = angular.copy( todo );            
        };
        
        $scope.reset = function() {
            $scope.todo = angular.copy($scope.master);
        };        

    });