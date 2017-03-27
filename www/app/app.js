// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('freemig', [
  'ionic',
  'freemig.controllers',
  'freemig.routes',
  'freemig.signinController',
  'freemig.signinFactory',
  'freemig.registrationController',
  'freemig.registrationFactory',
  'freemig.forgotPassController',
  'freemig.homeController',
  'freemig.notificationsController',
  'freemig.friendsController',
  'freemig.messagesController',
  'freemig.homeFactory',
  'freemig.textDirective',
  'freemig.imageDirective',
  'freemig.audioDirective',
  'freemig.attachmentDirective',
  'freemig.videoDirective',
  'ngCordova',
  'ionic-toast',
  'ngStorage',
  'ngSanitize'
  ])

.run(function($ionicPlatform, $localStorage, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Checking logged in condition
    if($localStorage.user === undefined || typeof $localStorage.user === "undefined"){
      $rootScope.isLoggedin = false;
    }else if($localStorage.user){
      $rootScope.isLoggedin = true;
      $state.go("app.tabs.home");
    } // Checking logged in condition



  });
})

.constant("Constants", {
    "apiurl": "http://198.38.89.216"
});

