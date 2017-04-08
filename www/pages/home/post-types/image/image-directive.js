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

iController.$inject = ['$scope', 'Constants', '$ionicPopover', '$localStorage', 'HomeFactory'];

function iController($scope, Constants, $ionicPopover, $localStorage, HomeFactory) {
    var vm = this;
    vm.apiurl = Constants.apiurl;
    vm.user = $localStorage.user.token;

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

    vm.likePost = function(){
        var data = {"type":1,"content_id":vm.post.id,"like_type":1,"post_id":vm.post.id,"tz":vm.user.userTZ};

        HomeFactory.doLike(vm.user.key, data).then(
            function(response){
                console.log(response);
                if(response.data.data.data_info.fAction == "1"){
                    vm.post.likes += 1;
                }
            },function(error){
                console.log(error);
            }
        );
    }

}