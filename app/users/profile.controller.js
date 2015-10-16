angular.module('angularfireSlackApp')
  .controller('ProfileController', ['$state','md5', 'auth', 'profile',
    function($state, md5, auth, profile){
    
    var vm = this;
    
    vm.profile = profile;
    
    vm.updateProfile = function(){
      //Todo: move this to a service?
      vm.profile.emailHash = md5.createHash(auth.password.email);
      vm.profile.$save().then(success);
          
      function success(){
        $state.go('app.channels');
      }
    }
    
  }]);