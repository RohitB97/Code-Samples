// No view in M-V-C

var App = angular.module('TodoList',[]);

App.controller('Ctrl', function($scope,$http) {
         
    var reset = function(){
      $http.get('/todolist').then(function(response){
        $scope.todolists=response.data;
        $scope.task="";
        });
     };

  reset();

$scope.addtask = function() {
  $http.post('/todolist', $scope.task).then(function(response) {
       reset();
    });
 };

$scope.deletetask = function(id) {
  $http.delete('/todolist/'+ id).then(function(response){
      reset();
      });
   };
 
$scope.edittask = function(task) {
      $scope.task = task;
   };

$scope.updatetask = function(){
   $http.put('/todolist/'+$scope.task._id, $scope.task).then(function(response){
       reset();
    });
 };

$scope.clearfield = function(){
   $scope.task="";
}

});


                   
