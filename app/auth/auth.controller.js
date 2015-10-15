angular.module('angularfireSlackApp')
  .controller('AuthController', function(Auth, $state){
    var vm = this;
    vm.auth = Auth;
        
    vm.login = function (){
      Auth.login().then(success);
    }
    
    vm.register = function(){
      Auth.register().then(success);
    }

    function success(){
      $state.go('home');
    }    
    //UI - text
    //controller - actions
    //service - data
  });