angular.module('angularfireSlackApp')
  .controller('ChannelsController', ['$state','Auth','Users', 'profile','channels',
  	function($state, Auth, Users, profile, channels){
    	var vm = this;
		vm.profile = profile;
		vm.channels = channels;
		vm.users = Users;


		vm.newChannel = {
			name: ''
		}
		
		vm.createChannel = function(){
 			vm.channels.$add(vm.newChannel).then(function(){
    			vm.newChannel = { name: '' };
			});
		} 
				
		vm.logout = function (){
			Auth.logout();
			$state.go('home');
		};
  }]);