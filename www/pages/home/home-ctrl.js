angular.module('freemig.homeController', [])

.controller('homeCtrl', homeCtrl)

homeCtrl.$inject = ['$scope', '$http', 'HomeFactory', 'ionicToast', '$cordovaGeolocation', '$state', '$localStorage', '$ionicLoading', '$sce', 'Constants']

function homeCtrl($scope, $http, HomeFactory, ionicToast, $cordovaGeolocation, $state, $localStorage, $ionicLoading, $sce, Constants) {

    var vm = this;

     $ionicLoading.show({
      template: 'Loading...'
    })

    vm.apiurl = Constants.apiurl;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 1;


    function initNewsFeed(pageNo){
        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = $localStorage.user.token.userType;
        newsFeedHomePostData.feedLoad = "home";
        newsFeedHomePostData.owner_type = "1";
        newsFeedHomePostData.tz = $localStorage.user.token.userTZ;

        HomeFactory.getNewsFeedHome($localStorage.user.token.key, newsFeedHomePostData, pageNo).then(
            function(response){
                response = response.data.data.data_info;
                for(var i = 0; i < response.length; i++){
                    posts.push(response[i]);
                }
                vm.feeds = posts;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                // console.log(response.data.data.data_info);
                console.log(vm.feeds);
                $ionicLoading.hide();
                pageNum = pageNo;


            },function(error){

            }
        );
    }
    initNewsFeed(pageNum);

    vm.morePostsCanBeLoaded = function(){
        // return true;
    }

    vm.loadMorePosts = function(){
        console.log("inside loadmoreposts");
        initNewsFeed(pageNum++);
    }

};