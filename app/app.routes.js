angular.module('angularfireSlackApp')
 .config(function ($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/');
   
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController as p',
        templateUrl:'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.requireAuth().catch(fail);      
                  
            function fail(){
              $state.go('home');
            }
          },
          profile: function(Users, Auth){
            return Auth.requireAuth().then(success);
            
            function success(auth){
              return Users.getProfile(auth.uid).$loaded();
            }
          }
        } 
      })
      .state('login', {
        url: '/login',
        controller: 'AuthController as a',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: noAuth
       }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthController as a',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: noAuth
       }
      });

    
    
    
    function noAuth ($state, Auth){
      return Auth.requireAuth().then(success, fail);
      
      function success (){
        $state.go('home'); 
      }
      function fail (){
        return; 
      }
    }
    
     
  })