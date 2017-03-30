angular.module('freemig.albumDirective', [])

    .directive("albumPost", albumPost);

function albumPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/album/album.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: alController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

alController.$inject = ['$scope', 'Constants'];

function alController($scope, Constants) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

    console.log("inside album");

}