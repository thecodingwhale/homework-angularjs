var App = angular.module('App', ['firebase']);

    App.controller('TodoCtrl', function($scope, $http, $firebase) {

        // initialize firebase api
        var ref = new Firebase("https://brilliant-torch-3226.firebaseio.com");        

        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        
        // download the data into a local object
        $scope.todos = sync.$asObject();

        // create a object for new todo
        $scope.todo = {};

        // save the object data from $scope.todo
        $scope.saveTodo = function ( todo ) {

            // prepare data
            var data = { "done" : false, "text" : todo.new };            
                sync.set(data);

            // clear data after saving
            $scope.reset();
        };
        
        // clear input box data
        $scope.reset = function() {
            $scope.todo = '';
        };               

        $scope.completed;
        $scope.setStatus = function ( index, todo ) {
            $scope.completed = index;
            if ( todo.done == true ) { todo.done = false; } else { todo.done = true; }
        }

    });