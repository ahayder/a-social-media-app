angular.module('freemig.profileDirective', [])

    .directive("profilePost", profilePost);

function profilePost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/profile/profile.html',
        scope: {
            post: '='
        },
        link: linkFunc,
        controller: ppController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

ppController.$inject = ['$scope', 'Constants', '$ionicPopover', '$localStorage', 'HomeFactory', '$state', 'ionicToast'];

function ppController($scope, Constants, $ionicPopover, $localStorage, HomeFactory, $state, ionicToast) {
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



    vm.saveThisPost = function(){
        
        var data = {"type":"2","post_type":"video","contentType":"1","contentId":vm.post.post.id,"tz":vm.user.userTZ};

        HomeFactory.savePost(vm.user.key, data).then(
            function(response){
                if(response.data.status == "2000"){
                    ionicToast.show("Saved successfully!", "bottom", false, 2000);
                }else{
                    ionicToast.show("Something went wrong! Please try again", "bottom", false, 2000);
                }
            },function(error){
                ionicToast.show("Error! Please try again", "bottom", false, 2000);
            }
        );
    }// save this post

}