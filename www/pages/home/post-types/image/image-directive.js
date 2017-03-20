angular.module('freemig.imageDirective', [])

    .directive("imagePost", imagePost);

function imagePost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/image/image.html',
        scope: {
            ipost: '='
        },
        link: linkFunc,
        controller: iController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

iController.$inject = ['$scope', 'Constants'];

function iController($scope, Constants) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

    console.log("inside image");

}