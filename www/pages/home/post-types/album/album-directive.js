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

alController.$inject = ['$scope', 'Constants', '$ionicPopover', '$localStorage', 'HomeFactory', '$state'];

function alController($scope, Constants, $ionicPopover, $localStorage, HomeFactory, $state) {
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
        var data = {"type":1,"content_id":vm.post.post.id,"like_type":1,"post_id":vm.post.post.id,"tz":vm.user.userTZ};

        HomeFactory.doLike(vm.user.key, data).then(
            function(response){
                console.log(response);
                if(response.data.data.data_info.fAction == "1"){
                    vm.post.post.likes += 1;
                }
            },function(error){
                console.log(error);
            }
        );
    }


    vm.goToCommentPage = function(postType){
        $localStorage.post = vm.post;
        $state.go('app.tabs.comments', {type: postType});
    }

}