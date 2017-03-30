angular.module('freemig.homeController', [])

.controller('homeCtrl', homeCtrl)

homeCtrl.$inject = ['$scope', '$http', 'HomeFactory', 'ionicToast', '$cordovaGeolocation', '$state', '$localStorage', '$ionicLoading', '$sce', 'Constants']

function homeCtrl($scope, $http, HomeFactory, ionicToast, $cordovaGeolocation, $state, $localStorage, $ionicLoading, $sce, Constants) {

    var vm = this;

     $ionicLoading.show({
      template: 'Loading...'
    })

    vm.apiurl = Constants.apiurl;
    vm.feedType = 1;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 1;


    function initNewsFeed(pageNo, ft){
        console.log(pageNo)
        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = ft;
        newsFeedHomePostData.feedLoad = "home";
        newsFeedHomePostData.owner_type = "1";
        newsFeedHomePostData.tz = $localStorage.user.token.userTZ;

        HomeFactory.getNewsFeedHome($localStorage.user.token.key, newsFeedHomePostData, pageNo).then(
            function(response){
                response = response.data.data.data_info;
                if(response.length == 0){
                    vm.morePostsCanBeLoaded = false;
                    ionicToast.show("No more posts to show.", "bottom", false, 2000);
                }
                else{
                    for(var i = 0; i < response.length; i++){
                        posts.push(response[i]);
                    }
                    vm.feeds = posts;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    // console.log(response.data.data.data_info);
                    console.log(vm.feeds);
                    $ionicLoading.hide();
                    pageNum++;
                }
                


            },function(error){

            }
        );
    }

    vm.morePostsCanBeLoaded = false;

    vm.loadMorePosts = function(){
        if ( posts.length == 99 ) {
            vm.morePostsCanBeLoaded = true;
        }
        initNewsFeed(pageNum, vm.feedType);
    }

    vm.doRefresh = function(){
        posts = [];
        vm.feeds = posts;
        initNewsFeed(1, vm.feedType);
        $scope.$broadcast('scroll.refreshComplete');
    }

    vm.changeFeedType = function(ft){
        $ionicLoading.show({
            template: 'Loading...'
        })
        vm.feedType = ft;
        posts = [];
        vm.feeds = posts;
        initNewsFeed(1, vm.feedType);
    }

};