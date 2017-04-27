angular.module('freemig.commentsController', [])

.controller('commentsCtrl', commentsCtrl)

commentsCtrl.$inject = ['$scope', '$localStorage', 'Constants', 'HomeFactory', '$ionicLoading', '$stateParams', 'ionicToast']

function commentsCtrl($scope, $localStorage, Constants, HomeFactory, $ionicLoading, $stateParams, ionicToast) {

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
    
};