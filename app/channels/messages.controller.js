angular.module('angularfireSlackApp')
  .controller('MessagesController', ['profile', 'channelName', 'messages',
  function(profile, channelName, messages){
    var vm = this;
    vm.channelName = channelName;
    vm.messages = messages;
    vm.message = '';
    
    vm.sendMessage = function(){
       if(vm.message.length > 0){
         vm.messages.$add({
           uid: profile.$id,
           body: vm.message,
           timestamp: Firebase.ServerValue.TIMESTAMP
         }).then(function (){
           vm.message = '';
         });
      }
    }
  }]);