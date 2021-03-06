// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  
    .state('app.sidebarpage', {
      url: '/sidebarpage',
      views: {
        'menuContent': {
          templateUrl: 'templates/sidebarpage.html',
          controller: 'sidebar'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })


    // This is the Login state
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      // The tab requires user login
      data: {
        requiresLogin: true
      }
    })

    // Each tab has its own nav history stack:


    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    

    .state('payOption', {
      url: '/payOption',
      templateUrl: 'templates/pay-option.html',
      controller: 'payOptionCtrl'
    })


    .state('investSelect', {
      url: '/invSelect',
      templateUrl: 'templates/investSelect.html',
      controller: 'invSlct'
    })

    .state('furtherInfo', {
      url: '/furtherInfo',
      templateUrl: 'templates/further-info.html',
      controller: 'furtherInfoCtrl'
    })

    .state('furtherInfo1', {
      url: '/furtherInfo1',
      templateUrl: 'templates/further-info1.html',
      controller: 'furtherInfoCtrl1'
    })

    .state('furtherInfo2', {
      url: '/furtherInfo2',
      templateUrl: 'templates/further-info2.html',
      controller: 'furtherInfoCtrl2'
    })

    .state('furtherInfo3', {
      url: '/furtherInfo3',
      templateUrl: 'templates/further-info3.html',
      controller: 'furtherInfoCtrl3'
    })

    .state('furtherInfo4', {
      url: '/furtherInfo4',
      templateUrl: 'templates/further-info4.html',
      controller: 'furtherInfoCtrl4'
    })

    .state('furtherInfo5', {
      url: '/furtherInfo5',
      templateUrl: 'templates/further-info5.html',
      controller: 'furtherInfoCtrl5'
    })

    .state('furtherInfo6', {
      url: '/furtherInfo6',
      templateUrl: 'templates/further-info6.html',
      controller: 'furtherInfoCtrl6'
    })

    .state('furtherInfo7', {
      url: '/furtherInfo7',
      templateUrl: 'templates/further-info7.html',
      controller: 'furtherInfoCtrl7'
    })
    
    

    .state('form1', {
      url: '/form1',
      templateUrl: 'templates/FFMApplicationForm_Individual/1.html', //templates/FFMApplicationForm_Individual/1.html
      controller: 'form1'
    })

    .state('form2', {
      url: 'form2',
      templateUrl: 'templates/FFMApplicationForm_Individual/2.html',
      controller: 'form2'
    })

    .state('form3', {
      url: 'form3',
      templateUrl: 'templates/FFMApplicationForm_Individual/3.html',
      controller: 'form2'
    })

    .state('form4', {
      url: 'form4',
      templateUrl: 'templates/FFMApplicationForm_Individual/4.html',
      controller: 'form4'
    })

    .state('fullPage', {
      url: 'fullPage',
      templateUrl: 'templates/FFMApplicationForm_Individual/index.html',
      controller: 'fullPage'
    })
    
    .state('touch', {
      url: '/touch',
      templateUrl: 'templates/touch.html',
      controller: 'touchCtrl'
    });


  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');// /tab/friends

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }

  });
});
