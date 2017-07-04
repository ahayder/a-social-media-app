angular.module('freemig.commentsController', [])

.controller('commentsCtrl', commentsCtrl)

commentsCtrl.$inject = ['$scope', '$ionicPopover', '$localStorage', 'Constants', 'HomeFactory', '$ionicLoading', '$stateParams', 'ionicToast']

function commentsCtrl($scope, $ionicPopover, $localStorage, Constants, HomeFactory, $ionicLoading, $stateParams, ionicToast) {

    $ionicLoading.show({
      template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;
    vm.post = $localStorage.post;
    vm.type = $stateParams.type;
    vm.pageNo = 1;
    vm.ifMoreCommentsCanBeLoaded = 0;
    var commentsTempArr = [];


    

    function loadComments(pn){
      var data = {"content_id":vm.post.post.id,"type":"1","tz":vm.user.userTZ};
      HomeFactory.getComments(vm.user.key, data, pn).then(
        function(response){
            $ionicLoading.hide();
            console.log(response);
            commentsTempArr = [];
            for(var i = 0; i < response.data.data.data_info.length; i++){
              commentsTempArr.push(response.data.data.data_info[i]);
            }
            vm.comments = commentsTempArr;
            vm.ifMoreCommentsCanBeLoaded = response.data.data.moreCmnt;
        },function(error){
           $ionicLoading.hide();
          console.log(error);
        }
      );
    }loadComments(vm.pageNo);

    


    vm.loadMoreComments = function(){
      if(vm.ifMoreCommentsCanBeLoaded == 1){
        vm.pageNo = vm.pageNo + 1;
        loadComments(vm.pageNo);
      }
    }



    vm.makeNewComment = function(){
      ionicToast.show("Working!", "bottom", true, 2000);
      var cdata = {"content_id": vm.post.post.id,
      "post_id": vm.post.post.id,
      "type": "1",
      "comment": vm.thisComment,
      "media": "",
      "tz": vm.user.userTZ};
     
      HomeFactory.createComment(vm.user.key, cdata).then(
        function(response){
          if(response.data.status === "2000"){
            ionicToast.show("Saved successfully!", "bottom", false, 2000);
            loadComments(vm.pageNo);
          }
          else{
            ionicToast.show("Something went wrong, please try again.", "bottom", false, 2000);
          }
        },function(error){
          ionicToast.show("Something went wrong, please try again.", "bottom", false, 2000);
        }
      );


    } // make new comments

    // Reply popover
    $ionicPopover.fromTemplateUrl('pages/home/comments/comment-reply-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.replyCommentPopover = popover;
    });


    vm.showReplyPopover = function($event, commentId){
      vm.replyCommentId = commentId;
      $scope.replyCommentPopover.show($event);
    }


    vm.replyComment = function(commentId){

      $scope.replyCommentPopover.hide();
      $scope.replyCommentPopover.remove();

      var cdata = {"content_id": commentId,
      "post_id": vm.post.post.id,
      "type": "2",
      "comment": vm.thisReplyComment,
      "media": "",
      "tz": vm.user.userTZ};

      HomeFactory.createComment(vm.user.key, cdata).then(
        function(response){
          if(response.data.status === "2000"){
            ionicToast.show("Saved successfully!", "bottom", false, 2000);
            loadComments(vm.pageNo);
          }
          else{
            ionicToast.show("Something went wrong, please try again.", "bottom", false, 2000);
          }
        },function(error){
          ionicToast.show("Something went wrong, please try again.", "bottom", false, 2000);
        }
      );

    } // reply comments



    vm.likeComment = function(commentId){
        var data = {"type":1,"content_id":commentId,"like_type":1,"post_id":vm.post.post.id,"tz":vm.user.userTZ};

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
    } // like comment
    
};