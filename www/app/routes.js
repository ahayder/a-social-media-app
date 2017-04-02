angular.module('freemig.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'pages/menu.html',
    controller: 'AppCtrl as vm'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'pages/signin/signin.html',
    controller: "signinCtrl as vm"
  })

 .state('signup', {
    url: '/signup',
    templateUrl: 'pages/signup/registration.html',
    controller: "registrationCtrl as vm"

  })

  .state('forgot-pass', {
    url: '/forgot-pass',
    templateUrl: 'pages/forgot-pass/forgot-pass.html',
    controller: "forgotCtrl"
  })

  .state('app.tabs', {
    url: '/tabs',
    views: {
      'menuContent': {
        templateUrl: 'pages/tabs.html',
      }
    },
    abstract:true
  })

  .state('app.tabs.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'pages/home/home.html',
        controller: 'homeCtrl as vm'
      }
    }
  })

  .state('app.tabs.profile', {
    url: '/profile',
    views: {
      'tab1': {
        templateUrl: 'pages/profile/profile.html',
        controller: "profileCtrl as vm"
      }
    }
  })

  .state('app.tabs.notifications', {
    url: '/notifications',
    views: {
      'tab2': {
        templateUrl: 'pages/notifications/notifications.html',
        controller: 'notificationsCtrl as vm'
      }
    }
  })

  .state('app.tabs.friends', {
    url: '/friends',
    views: {
      'tab3': {
        templateUrl: 'pages/friends/friends.html',
        controller: 'friendsCtrl as vm'
      }
    }
  })

  .state('app.tabs.messages', {
    url: '/messages',
    views: {
      'tab4': {
        templateUrl: 'pages/messages/messages.html',
        controller: 'messagesCtrl as vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');
});
