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

    vm.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 1;


    function initNewsFeed(pageNo, ft) {
        console.log(pageNo)
        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = ft;
        newsFeedHomePostData.feedLoad = "home";
        newsFeedHomePostData.owner_type = "1";
        newsFeedHomePostData.tz = vm.user.userTZ;

        HomeFactory.getNewsFeedHome(vm.user.key, newsFeedHomePostData, pageNo).then(
            function (response) {
                $ionicLoading.hide();
                response = response.data.data.data_info;
                if (response.length == 0) {
                    vm.morePostsCanBeLoaded = false;
                    ionicToast.show("No more posts to show.", "bottom", false, 2000);
                }
                else {
                    for (var i = 0; i < response.length; i++) {
                        posts.push(response[i]);
                    }
                    vm.feeds = posts;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    // console.log(response.data.data.data_info);
                    console.log(vm.feeds);
                    $ionicLoading.hide();
                    pageNum++;
                }



            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
            }
        );
    }initNewsFeed(1, vm.feedType);

    vm.morePostsCanBeLoaded = false;

    vm.loadMorePosts = function () {
        if (posts.length == 99) {
            vm.morePostsCanBeLoaded = true;
        }
        initNewsFeed(pageNum, vm.feedType);
    }

    vm.doRefresh = function () {
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
