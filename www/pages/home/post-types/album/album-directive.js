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

alController.$inject = ['$scope', 'Constants', '$ionicPopover'];

function alController($scope, Constants, $ionicPopover) {
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

    console.log("inside album");

}