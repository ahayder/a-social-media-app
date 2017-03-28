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

vController.$inject = ['$scope', 'Constants', '$sce'];

function vController($scope, Constants, $sce) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

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
    }

}