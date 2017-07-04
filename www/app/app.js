// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('freemig', [
  'ionic',
  'freemig.controllers',
  'freemig.services',
  'freemig.routes',
  'freemig.signinController',
  'freemig.signinFactory',
  'freemig.registrationController',
  'freemig.registrationFactory',
  'freemig.forgotPassController',
  'freemig.profileController',
  'freemig.profileFactory',
  'freemig.commentsController',
  'freemig.homeController',
  'freemig.homeFactory',
  'freemig.notificationsController',
  'freemig.friendsController',
  'freemig.messagesController',
  'freemig.textDirective',
  'freemig.imageDirective',
  'freemig.audioDirective',
  'freemig.attachmentDirective',
  'freemig.videoDirective',
  'freemig.albumDirective',
  'freemig.profileDirective',
  'freemig.confirmCodeController',
  'freemig.settingsController',
  'freemig.settingsFactory',
  'ngCordova',
  'ionic-toast',
  'ngStorage',
  'ngSanitize',
  'plug.ionic-segment'
])

  .run(function ($ionicPlatform, $localStorage, $state, $rootScope) {
    $ionicPlatform.ready(function () {
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
      if ($localStorage.user === undefined || typeof $localStorage.user === "undefined") { // undefined checking for the first time boot up
        $rootScope.isLoggedin = false;
      }
      else if ($localStorage.user) { // if token exists
        // Here check if token expires
        console.log($localStorage.user);
        $rootScope.isLoggedin = true;
        $state.go("app.tabs.home");
      }
      else if ($localStorage.user == "") {
        $rootScope.isLoggedin = false;
      }
      // Checking logged in condition


      //---------------------------------------- gettting device inormation---------------------------------
      try {
        var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
        console.log(deviceInfo);
        deviceInfo.get(function (result) {
          console.log("result = " + result);
        }, function (e) {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }

      //---------------------------------------- gettting device inormation---------------------------------




    });
  })

  .constant("Constants", {
    "apiurl": "https://mssiolefmig.freemig.com"
    // "apiurl":"http://198.38.89.216"
  });

