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

}