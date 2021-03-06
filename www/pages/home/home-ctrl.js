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
    '$ionicModal',
    '$sce',
    'Constants',
    'LocationService']

function homeCtrl($scope,
    $http,
    HomeFactory,
    ionicToast,
    $cordovaGeolocation,
    $state,
    $localStorage,
    $ionicLoading,
    $ionicModal,
    $sce,
    Constants,
    LocationService) {


    var vm = this;

    $ionicLoading.show({
        template: 'Loading...'
    })

    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;
    vm.status = {};
    vm.feedType = 1;
    vm.morePostsCanBeLoaded = true;
    vm.locationPermission = false;

    vm.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 2;// initiallly 2 as init uses page 1 for the first time


    function initNewsFeed(pageNo, fc) {

        var newsFeedHomePostData = {};
        newsFeedHomePostData.feedChoose = fc;
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
                else {
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
    (function () {
        initNewsFeed(1, vm.feedType);
    })();




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


    // more posts can be loaded
    vm.loadMorePosts = function () {
        initNewsFeed(pageNum, vm.feedType);
    }




    //-------------------------------------------- create post modal-----------------------------------//
    vm.showCreatePostModal = function () {

        $ionicModal.fromTemplateUrl('pages/home/create-post/create-post-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.createModal = modal;
            $scope.createModal.show();
        });

    };

    vm.closeCreatePostModal = function () {
        $scope.createModal.hide();
        $scope.createModal.remove();
    };
    //-------------------------------------------- create post modal-----------------------------------//



    //-------------------------------------------- checkin modal-----------------------------------//
    vm.showCheckinModal = function () {

        $ionicModal.fromTemplateUrl('pages/home/create-post/checkin-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.checkin = modal;
            $scope.checkin.show();
        });

        LocationService.askLocationPermission()
            .then(LocationService.getCoords)
            .then(function (coords) {
                console.log(coords);
                vm.locationPermission = true;
            })
            .catch(function (err) {
                console.log(err);
                vm.locationPermission = false;
            });

    };

    vm.closeCheckinModal = function () {
        $scope.checkin.hide();
        $scope.checkin.remove();
    };
    //-------------------------------------------- checkin modal-----------------------------------//



    //-------------------------------------------- photo/video modal-----------------------------------//
    vm.showPhotoVideoModal = function () {

        $ionicModal.fromTemplateUrl('pages/home/create-post/photo-video-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.photoVideo = modal;
            $scope.photoVideo.show();
        });

    };

    vm.closePhotoVideoModal = function () {
        $scope.photoVideo.hide();
        $scope.photoVideo.remove();
    };
    //-------------------------------------------- photo/video modal-----------------------------------//



    //-------------------------------------------- feeling/activity modal-----------------------------------//
    vm.showFeelingActivityModal = function () {

        $ionicModal.fromTemplateUrl('pages/home/create-post/feeling-activity-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.feelingActivity = modal;
            $scope.feelingActivity.show();
        });

    };

    vm.closefeelingActivityModal = function () {
        $scope.feelingActivity.hide();
        $scope.feelingActivity.remove();
    };
    //-------------------------------------------- feeling/activity modal-----------------------------------//


    //-------------------------------------------- tag-friends modal-----------------------------------//
    vm.showTagFriendsModal = function () {

        $ionicModal.fromTemplateUrl('pages/home/create-post/tag-friends-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.tagFriends = modal;
            $scope.tagFriends.show();
        });

    };

    vm.closeTagFriendsModal = function () {
        $scope.tagFriends.hide();
        $scope.tagFriends.remove();
    };
    //-------------------------------------------- tag-friends modal-----------------------------------//



    // create text post
    vm.createPost = function () {
        console.log(vm.status.text);
        $ionicLoading.show({
            template: 'Working...'
        })

        var data = {
            "tz": vm.user.userTZ,
            "owner_type": "1",
            "text_body": vm.status.text,
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
                initNewsFeed(1, vm.feedType);
                vm.closeCreatePostModal();
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Error!", "bottom", false, 3000);
            }
        );
    }//create text post


};
