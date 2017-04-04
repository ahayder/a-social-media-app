angular.module('freemig.imageDirective', [])

    .directive("imagePost", imagePost);

function imagePost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/image/image.html',
        scope: {
            post: '='
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

iController.$inject = ['$scope', 'Constants', '$ionicPopover'];

function iController($scope, Constants, $ionicPopover) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

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

    console.log("inside image");

}