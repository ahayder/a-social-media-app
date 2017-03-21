angular.module('freemig.attachmentDirective', [])

    .directive("attachmentPost", attachmentPost);

function attachmentPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/attachment/attachment.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: attController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

attController.$inject = ['$scope', 'Constants', '$sce'];

function attController($scope, Constants, $sce) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    console.log("from attachment");

}