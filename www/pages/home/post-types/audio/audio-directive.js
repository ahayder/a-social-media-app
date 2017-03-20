angular.module('freemig.audioDirective', [])

    .directive("audioPost", audioPost);

function audioPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/audio/audio.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: aController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

aController.$inject = ['$scope', 'Constants', '$sce'];

function aController($scope, Constants, $sce) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    console.log("inside audio");

}