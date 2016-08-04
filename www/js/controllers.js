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
      $state.go('payOption');
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

.controller('touchCtrl', function() {

})

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

.controller('furtherInfoCtrl', function($scope, $state) {
  
  $scope.formData = {};
$scope.login = function () {
  console.log("User logged in with membership no: " + $scope.formData.Name +
  "\n and password: " + $scope.formData.password);
  $state.go('furtherInfo1');
 }
})

 .controller('furtherInfoCtrl1', function($scope, $state) {
  
  $scope.formData = {};
$scope.login = function () {
  console.log("User logged in with membership no: " + $scope.formData.Name +
  "\n and password: " + $scope.formData.password);
 }


});
