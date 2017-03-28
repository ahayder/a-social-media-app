angular.module('freemig.textDirective', [])

    .directive("textPost", textPost);

function textPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/text/text.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: tController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

tController.$inject = ['$scope', 'Constants', '$sce'];

function tController($scope, Constants, $sce) {
    var vm = this;

    vm.yvideo = false;
    vm.vvideo = false;
    vm.notVideo = false;

    vm.apiurl = Constants.apiurl;


    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    console.log("inside text");

    function checkForMedia(){
        if(vm.post.has_url){
            if(vm.post.hasOwnProperty("urlData")){
                if(vm.post.urlData.preview){
                    // has preview
                    if(vm.post.video == 1){
                        // post is video
                        
                        if(vm.post.video_type == "youtube"){
                            vm.yvideo = true;
                            vm.vvideo = false;
                        }
                        if(vm.post.video_type == "vimeo"){
                            vm.yvideo = false;
                            vm.vvideo = true;
                        }
                    }
                    if(vm.post.video == 0){
                        // post is anything else
                        vm.yvideo = false;
                        vm.vvideo = false;
                        vm.notVideo = true;
                        
                    }
                }else{
                    // no preview
                }
            }
        }
    }checkForMedia();

}