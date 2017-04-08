angular.module('freemig.videoDirective', [])

    .directive("videoPost", videoPost);

function videoPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/video/video.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: vController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

vController.$inject = ['$scope', 'Constants', '$sce', '$ionicPopover', '$localStorage', 'HomeFactory', '$state'];

function vController($scope, Constants, $sce, $ionicPopover, $localStorage, HomeFactory, $state) {
    var vm = this;
    vm.apiurl = Constants.apiurl;
    vm.user = $localStorage.user.token;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    console.log("inside video");

    vm.startThisVideo = function(trigger) {
        if(Hls.isSupported()) {
            var video = trigger;
            var container = trigger.parentElement;
            var seekBar = container.querySelector('.seek-bar');
            var status = video.getAttribute('data-start');
            if(status != 1){
                video.setAttribute('data-start','1');
                video.setAttribute('data-play','1');
                var videoSRC = video.getAttribute('data-src');
                console.log(videoSRC);
                var hls = new Hls();
                hls.loadSource(videoSRC);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    video.play();
                    video.addEventListener("timeupdate", function() {
                        var value = (100 / video.duration) * video.currentTime;
                        //seekBar.value = value;
                    });
                });
            }

        }
    }// start the video


    // popover
    $ionicPopover.fromTemplateUrl('pages/popovers/home-feed-post-edit.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    vm.showPopover = function ($event) {
        $scope.popover.show($event);
    }
    vm.closePopover = function () {
        $scope.popover.hide();
    };

    vm.likePost = function(){
        var data = {"type":1,"content_id":vm.post.id,"like_type":1,"post_id":vm.post.id,"tz":vm.user.userTZ};

        HomeFactory.doLike(vm.user.key, data).then(
            function(response){
                console.log(response);
                if(response.data.data.data_info.fAction == "1"){
                    vm.post.likes += 1;
                }
            },function(error){
                console.log(error);
            }
        );
    }

    vm.goToCommentPage = function(postType){
        $localStorage.post = vm.post;
        $state.go('app.tabs.comments', {type: postType});
    }


}