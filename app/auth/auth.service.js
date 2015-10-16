angular.module('angularfireSlackApp')
	.factory('Auth', ['$firebaseAuth', 'FirebaseUrl', 
	function($firebaseAuth, FirebaseUrl){
		
		var auth = {
			user: {email:'', password:''}
		};

		var ref = new Firebase(FirebaseUrl);
		var fireAuth = $firebaseAuth(ref);


		auth.requireAuth = function(){
			return fireAuth.$requireAuth();
		}
		
		auth.logout = function(){
		    fireAuth.$unauth();
		}
				
		auth.login = function(){
			return fireAuth.$authWithPassword(auth.user)
			               .catch(fail);
		}
		
		auth.register = function(){
			return fireAuth.$createUser(auth.user)
					       .then(auth.login, fail);
		}
			
		function fail(err){
			auth.error = err;
			throw err;
		}
		
		return auth;
	}]);