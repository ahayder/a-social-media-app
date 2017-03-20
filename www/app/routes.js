angular.module('freemig.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'pages/menu.html',
  //   controller: 'AppCtrl'
  // })

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

  .state('tabs', {
    url: '/tabs',
    templateUrl: 'pages/tabs.html',
    abstract:true
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'pages/home/home.html',
        controller: 'homeCtrl as vm'
      }
    }
  })

  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'tab2': {
        templateUrl: 'pages/templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })

  .state('tabs.friends', {
    url: '/friends',
    views: {
      'tab3': {
        templateUrl: 'pages/templates/friends.html',
        controller: 'friendsCtrl'
      }
    }
  })

  .state('tabs.messages', {
    url: '/messages',
    views: {
      'tab4': {
        templateUrl: 'pages/templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signin');
});
