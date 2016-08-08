angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth, $state, store) {
  auth.signin({
    closable: false,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    auth.getToken({
      api: 'firebase'
    }).then(function(delegation) {
      store.set('firebaseToken', delegation.id_token);
      $state.go('furtherInfo');
    }, function(error) {
      console.log("There was an error logging in", error);
    })
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})


.controller('AccountCtrl', function($scope, auth, $state, store) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login');
  }
})


.controller('invSlct', function() {})

.controller('payOptionCtrl', function($scope, $ionicPopup) {
  // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         cssClass: 'popup', // String, The custom CSS class name
         title: 'Payment Amount',
         subTitle: 'Select the amount to be invested using Vest',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
                  onTap: function(e) {
            
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };


})

.controller('furtherInfoCtrl', function($scope, $state,InfoService) {
  
  $scope.formData = {};
  $scope.login = function () {
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo1');
 }
})

 .controller('furtherInfoCtrl1', function($scope, $state,InfoService) {
  
  $scope.formData = {};
$scope.login = function ()
 {
 
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo2');

 }
})

 .controller('furtherInfoCtrl2', function($scope, $state,InfoService) {
  
  $scope.formData = {};
$scope.login = function ()
 {
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo3');

 }
})

 .controller('furtherInfoCtrl3', function($scope, $state,InfoService) 
 {
  
  $scope.formData = {};
$scope.login = function ()
 {
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo4');
 }
}) 


 .controller('furtherInfoCtrl4', function($scope, $state,InfoService) 
 {
  
  $scope.formData = {};
$scope.login = function ()
 {
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo5');
 }
}) 

  .controller('furtherInfoCtrl5', function($scope, $state,InfoService) 
 {
  
  $scope.formData = {};
$scope.login = function ()
 {
  InfoService.addInfo($scope.formData);
  $state.go('furtherInfo6');
 }
}) 


 .controller('furtherInfoCtrl6', function($scope, $state,InfoService) 
 {
  
  $scope.formData = {};
$scope.login = function ()
  {
 InfoService.addInfo($scope.formData);
 $state.go('furtherInfo7');
 }
}) 

  .controller('furtherInfoCtrl7', function($scope, $state,InfoService, $FirebaseArray, $FirebaseObject,$ionicPopup) {
  
  $scope.formData = {};
$scope.login = function ()
 {
 InfoService.addInfo($scope.formData);

 Test=InfoService.getInfo();
 //console.dir(Test);
 var ref = new Firebase("https://vesttest-1378.firebaseio.com/");
 var usersRef = ref.child("users");
 usersRef.set({
    Info: Test
  });
$state.go('form1');
 }
})

 .controller('form1', function($scope, $state,InfoService) 
 {

  $scope.data=InfoService.getInfo();
  $scope.hello=$scope.data.FirstName;
  console.log($scope.data);
})   

.controller('payOptionCtrl', function() {
  
})

.controller('touchCtrl', function() {

});
