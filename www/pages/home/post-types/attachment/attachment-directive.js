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

attController.$inject = ['$scope', 'Constants', '$sce', '$ionicPopover'];

function attController($scope, Constants, $sce, $ionicPopover) {
    var vm = this;
    vm.apiurl = Constants.apiurl;

    vm.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

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

    console.log("from attachment");

}