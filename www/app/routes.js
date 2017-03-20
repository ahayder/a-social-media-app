angular.module('freemig.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'pages/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.signin', {
    url: '/signin',
    views: {
      'menuContent': {
        templateUrl: 'pages/signin/login.html',
        controller: "loginCtrl"
      }
    }
  })

 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'pages/signup/registration.html',
        controller: "registrationCtrl"
      }
    }
  })

  .state('app.forgot-pass', {
    url: '/forgot-pass',
    views: {
      'menuContent': {
        templateUrl: 'pages/forgot-pass/forgot-pass.html',
        controller: "forgotCtrl"
      }
    }
  })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'pages/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'pages/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/signin');
});
