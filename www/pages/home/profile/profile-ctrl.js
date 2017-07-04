angular.module('freemig.profileController', [])

    .controller('profileCtrl', profileCtrl)

profileCtrl.$inject =
    ['$scope',
        '$localStorage',
        'Constants',
        'ProfileFactory',
        '$ionicLoading',
        '$ionicModal',
        '$ionicActionSheet',
        'ionicToast']

function profileCtrl($scope,
    $localStorage,
    Constants,
    ProfileFactory,
    $ionicLoading,
    $ionicModal,
    $ionicActionSheet,
    ionicToast) {

    $ionicLoading.show({
        template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;
    vm.feedType = 1;
    vm.morePostsCanBeLoaded = true;

    vm.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    var posts = [];
    var pageNum = 2;// initiallly 2 as init uses page 1 for the first time




    function init(pageNo, fc) {
        var data = { "id": vm.user.userId, "tz": vm.user.userTZ }
        ProfileFactory.getCoverPhotoAndOtherInfo(vm.user.key, data).then(
            function (response) {
                $ionicLoading.hide();
                console.log(response.data.data.data_info);
                vm.userOverview = response.data.data.data_info;
                vm.coverImage = vm.apiurl + vm.userOverview.cover;
                vm.proPic = vm.apiurl + vm.userOverview.avatar;
                vm.renderhtmlNow = true;
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        )
        widgetInfo();

        var newsFeedProfilePostData = {};
        newsFeedProfilePostData.feedChoose = fc;
        newsFeedProfilePostData.feedLoad = "profile";
        newsFeedProfilePostData.user_id = vm.user.userId;
        newsFeedProfilePostData.owner_type = "1";
        newsFeedProfilePostData.tz = vm.user.userTZ;

        ProfileFactory.getNewsFeedProfile(vm.user.key, newsFeedProfilePostData, pageNo).then(
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
                    $ionicLoading.hide();
                    pageNum++;
                }



            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
            }
        );

    }


    init(1, vm.feedType); // calling init

    vm.doRefresh = function () {
        posts = [];
        vm.feeds = posts;
        init(1, vm.feedType);
        $scope.$broadcast('scroll.refreshComplete');
    }

    vm.changeFeedType = function (fc) {
        $ionicLoading.show({
            template: 'Loading...'
        })
        vm.feedType = fc;
        posts = [];
        vm.feeds = posts;
        init(1, vm.feedType);
    }


    // more posts can be loaded
    vm.loadMorePosts = function () {
        init(pageNum, vm.feedType);
    }


    // Modal
    vm.openModal = function (modalName) {

        if (modalName == "connections") {
            allConnections();
        } else if (modalName == "followers") {
            allFollowers();
        } else if (modalName == "following") {
            allFollowing();
        }

        $ionicModal.fromTemplateUrl('pages/home/profile/' + modalName + '-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

    };

    vm.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove();
    };

    function allConnections() {
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllConnections(vm.user.key, vm.user.userTZ).then(
            function (response) {
                $ionicLoading.hide();
                console.log(response);
                vm.connections = response.data.data.data_info;
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function allFollowing() {
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllFollowing(vm.user.key).then(
            function (response) {
                $ionicLoading.hide();
                vm.following = response.data.data.data_info;
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function allFollowers() {
        $ionicLoading.show({
            template: 'Loading...'
        })
        ProfileFactory.getAllFollowers(vm.user.key).then(
            function (response) {
                $ionicLoading.hide();
                console.log(response);
                vm.followers = response.data.data.data_info;
            }, function (error) {
                $ionicLoading.hide();
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    function widgetInfo() {
        var data = { "userId": vm.user.userId, "tz": vm.user.userTZ };
        ProfileFactory.getWidgetInfo(vm.user.key, data).then(
            function (response) {
                console.log(response.data.data.data_info);
                vm.widgetInfo = response.data.data.data_info;
                console.log(vm.widgetInfo)
            }, function (error) {
                ionicToast.show("Please check your internet connection.", "bottom", false, 2000);
            }
        );
    }

    // Change cover photo
    vm.uploadCoverPhotoActionSheet = function () {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Upload a photo' }
            ],
            titleText: 'Change Cover Photo',
            cancelText: 'Cancel',
            cancel: function () {
                hideSheet();
            },
            buttonClicked: function (index) {
                console.log(index);
            }
        });
    }

    // change profile picture
    vm.uploadProfilePictureActionSheet = function () {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Upload a photo' }
            ],
            titleText: 'Change Profile Picture',
            cancelText: 'Cancel',
            cancel: function () {
                hideSheet();
            },
            buttonClicked: function (index) {
                console.log(index);
            }
        });
    }


    vm.basicInfoEditModalShow = function(){
        $ionicModal.fromTemplateUrl('pages/home/profile/basic-info-edit-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.basicInfoEditmodal = modal;
            $scope.basicInfoEditmodal.show();
        });
    }

    vm.closeBasicInfoModal = function(){
        $scope.basicInfoEditmodal.hide();
        $scope.basicInfoEditmodal.remove();
    }


};