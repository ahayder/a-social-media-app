angular.module('freemig.homeController', [])

    .controller('homeCtrl', homeCtrl)

homeCtrl.$inject = ['$scope',
    '$http',
    'HomeFactory',
    'ionicToast',
    '$cordovaGeolocation',
    '$state',
    '$localStorage',
    '$ionicLoading',
    '$sce',
    'Constants']

function homeCtrl($scope,
    $http,
    HomeFactory,
    ionicToast,
    $cordovaGeolocation,
    $state,
    $localStorage,
    $ionicLoading,
    $sce,
    Constants)
    {


    var vm = this;

    $ionicLoading.show({
        template: 'Loading...'
    })

    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;
    vm.status = {};
    vm.feedType = 1;
    vm.morePostsCanBeLoaded = true;

    vm.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 2;// initiallly 2 as init function always will be load from page 1


    function initNewsFeed(pageNo, ft) {
        
        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = ft;
        newsFeedHomePostData.feedLoad = "home";
        newsFeedHomePostData.owner_type = "1";
        newsFeedHomePostData.tz = vm.user.userTZ;
        
        HomeFactory.getNewsFeedHome(vm.user.key, newsFeedHomePostData, pageNo).then(
            function (response) {
                $ionicLoading.hide();
                
                if (response.data.status === "5000") {
                    vm.morePostsCanBeLoaded = false;
                    ionicToast.show("No more posts to show.", "bottom", false, 2000);
                }
                else{
                    vm.morePostsCanBeLoaded = true;
                    response = response.data.data.data_info;
                    for (var i = 0; i < response.length; i++) {
                        posts.push(response[i]);
                    }
                    vm.feeds = posts;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    console.log(vm.feeds);
                    $ionicLoading.hide();
                    pageNum++;
                }



            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
            }
        );
    }
    
    // home init
    (function(){
            console.log("init");
         initNewsFeed(1, vm.feedType);
    })();
   



    vm.doRefresh = function () {
        console.log("do refresh working");
        posts = [];
        vm.feeds = posts;
        initNewsFeed(1, vm.feedType);
        $scope.$broadcast('scroll.refreshComplete');
    }

    vm.changeFeedType = function (ft) {
        $ionicLoading.show({
            template: 'Loading...'
        })
        vm.feedType = ft;
        posts = [];
        vm.feeds = posts;
        initNewsFeed(1, vm.feedType);
    }


    // more posts can be loaded
    vm.loadMorePosts = function () {
        initNewsFeed(pageNum, vm.feedType);
        console.log("loadmorepost");
        
    }



    // ceare text post
    vm.createPost = function (status) {
        console.log(status.text);
        $ionicLoading.show({
            template: 'Working...'
        })

        var data = {
            "tz": vm.user.userTZ,
            "owner_type": "1",
            "text_body": status.text,
            "text_title": "text",
            "by_owner": "1",
            "privacy": "1",
            "taggedUsers": "",
            "activity": "",
            "activityDesc": "",
            "userLocation": "",
            "mediaType": "",
            "ref_code": vm.user.userId + Date.now() + vm.user.userId,
            "post_type": "text",
            "feedLoad": "1",
            "previewLink": "",
            "activityPreview": "0",
            "via": ""
        }

        HomeFactory.createPost(vm.user.key, data).then(
            function (response) {
                $ionicLoading.hide();
                ionicToast.show("Posted!", "top", false, 2000);
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Error!", "bottom", false, 3000);
            }
        );
    }//create post


};
