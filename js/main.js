var App = angular.module('App', ['firebase']);

    App.controller('TodoCtrl', function($scope, $http, $firebase) {

        // initialize firebase api
        var ref = new Firebase("https://brilliant-torch-3226.firebaseio.com/todos");        

        // create an AngularFire reference to the data
        var sync = $firebase(ref);

        // create a object for new todo
        $scope.todo = {};

        // get all todos
        $scope.todos = sync.$asObject();        

        // save the object data from $scope.todo
        $scope.saveTodo = function ( todo ) {

            // prepare data
            var data = { "done" : false, "text" : todo.new };

            // add data
            var newTodo = ref.push();
                newTodo.set(data);

            // clear data after saving
            $scope.reset();
        };
        
        // clear input box data
        $scope.reset = function() {
            $scope.todo = '';
        };               

        $scope.completed;


        $scope.updateStatus = function ( unique, index, todo ) {
            $scope.completed = index;
            todo.done = ( todo.done == true ) ? false : true;
            ref.child( unique ).child( "done" ).set( todo.done );
        }

        $scope.getTodo = function ( unique, index, todo ) {            
            $scope.setTodo = todo.text;
        }

        $scope.setTodo = function ( unique, todo ) {            
            var onComplete = function( error ) {
                if ( error ) {
                    console.log('Synchronization failed');
                } else {
                    console.log('Synchronization succeeded');
                }
            };
            ref.child( unique ).child( "text" ).set( todo, onComplete );
        }

    });