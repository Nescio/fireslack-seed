angular.module('angularfireSlackApp')
 .config(function ($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/');
   
    $stateProvider
    
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireAuth: noAuth
        }
      })
      
      .state('app',{
        url: '/app',
        template: '<ui-view />',
        abstract: true,
        resolve: {
          auth: function($state, Auth){
            return Auth.requireAuth().catch(fail);      
                  
            function fail(){
              $state.go('home');
            }
          }
        }        
      })
      
      .state('app.profile', {
        url: '/profile',
        controller: 'ProfileController as p',
        templateUrl: 'users/profile.html',
        resolve: {
          profile: function(Users, Auth){
            return Auth.requireAuth().then(success);
            
            function success(auth){
              return Users.getProfile(auth.uid).$loaded();
            }
          }
        } 
      })
      
      .state('app.channels', {
        url: '/channels',
        controller: 'ChannelsController as c',
        templateUrl: 'channels/index.html',
        resolve: {
          channels: function(Channels){
            return Channels.$loaded();
          },
          profile: function($state, Users, Auth){
            return Auth.requireAuth().then(success);
            
            function success(auth){
              return Users.getProfile(auth.uid)
                          .$loaded()
                          .then(loaded, fail);
                          
              function loaded(profile){
                 if(profile.displayName) {
                   return profile;
                 } 
                 else {
                   $state.go('app.profile');
                 }
              }
              
              function fail(err){
                $state.go('home');
              }
            }
          }
        } 
      })
      
      .state('app.channels.create', {
        url: '/create',
        controller: 'ChannelsController as c',
        templateUrl: 'channels/create.html'
      })
      
      .state('app.channels.messages', {
        url: '/{channelId}/messages',
        controller: 'MessagesController as m',
        templateUrl: 'channels/messages.html',
        resolve: {
          messages: function($stateParams, Messages){
            return Messages.forChannel($stateParams.channelId).$loaded();
          },
          channelName: function($stateParams, channels){
            return '#'+channels.$getRecord($stateParams.channelId).name;
          }
        }
      })
      
      .state('app.channels.private', {
        url: '/{uid}/messages/private',
        controller: 'MessagesController as m',
        templateUrl: 'channels/messages.html',
        resolve: {
          messages: function($stateParams, Messages, profile){
            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
          },
          channelName: function($stateParams, Users){
            return Users.all.$loaded().then(function(){
              return '@'+Users.getDisplayName($stateParams.uid);
            });
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
        $state.go('app.channels'); 
      }
      function fail (){
        return; 
      }
    }
    
     
  })