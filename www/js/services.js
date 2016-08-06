angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Friends', function($firebase, store, $state) {

  var friendsRef = new Firebase("https://auth0-ionic-sample.firebaseio.com/friends");
  friendsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go('login');
    }
  });

  var friendsSync = $firebase(friendsRef);
  var friends = friendsSync.$asArray();

  this.all = function() {
    return friends;
  };

  this.add = function(friend) {
    friends.$add(friend);
  };

  this.get = function(id) {
    return friends.$getRecord(id);
  };

  this.save = function(friend) {
    friends.$save(friend);
  };

  this.delete = function(friend) {
    friends.$remove(friend);
  };

})


.service('InfoService', function()
{

  var addInfo= function(Info)
  {
    Infoo=Info;
  };

  var addInfo1= function(Info1)
  {
    Infoo1=Info1;
  };

  var addInfo2= function(Info2)
  {
    Infoo2=Info2;
  };

  var addInfo3= function(Info3)
  {
    Infoo3=Info3;
  };

  var addInfo4= function(Info4)
  {
    Infoo4=Info4;
  };


  var getInfo = function(){
    TheInfo=angular.extend(Infoo,Infoo1,Infoo2,Infoo3,Infoo4);
      return TheInfo;
  };
  return {
    addInfo:addInfo,
    addInfo1:addInfo1,
    addInfo2:addInfo2,
    addInfo3:addInfo3,
    addInfo4:addInfo4,
    getInfo:getInfo
  }
  ;
});
