angular.module('freemig.homeController', [])

.controller('homeCtrl', homeCtrl)

homeCtrl.$inject = ['$http', 'HomeFactory', 'ionicToast', '$cordovaGeolocation', '$state', '$localStorage', '$ionicLoading', '$sce', 'Constants']

function homeCtrl($http, HomeFactory, ionicToast, $cordovaGeolocation, $state, $localStorage, $ionicLoading, $sce, Constants) {

    var vm = this;

     $ionicLoading.show({
      template: 'Loading...'
    })

    vm.apiurl = Constants.apiurl;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }


    function initNewsFeed(pageNo){
        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = $localStorage.user.token.userType;
        newsFeedHomePostData.feedLoad = "home";
        newsFeedHomePostData.owner_type = "1";
        newsFeedHomePostData.tz = $localStorage.user.token.userTZ;

        var posts = [];
        HomeFactory.getNewsFeedHome($localStorage.user.token.key, newsFeedHomePostData, pageNo).then(
            function(response){
                response = response.data.data.data_info;
                for(var i = 0; i < response.length; i++){
                    posts.push(response[i]);
                }
                vm.feeds = posts;
                // console.log(response.data.data.data_info);
                console.log(vm.feeds);
                $ionicLoading.hide();


            },function(error){

            }
        );
    }
    initNewsFeed(1);

};