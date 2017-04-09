angular.module('freemig.commentsController', [])

.controller('commentsCtrl', commentsCtrl)

commentsCtrl.$inject = ['$scope', '$localStorage', 'Constants', 'HomeFactory', '$ionicLoading', '$stateParams']

function commentsCtrl($scope, $localStorage, Constants, HomeFactory, $ionicLoading, $stateParams) {

    $ionicLoading.show({
      template: 'Loading...'
    })

    var vm = this;
    vm.renderhtmlNow = false;
    vm.user = $localStorage.user.token;
    vm.apiurl = Constants.apiurl;
    vm.post = $localStorage.post;
    vm.type = $stateParams.type;


    

    function loadComments(){
      var data = {"content_id":vm.post.post.id,"type":"1","tz":vm.user.userTZ};

      HomeFactory.getComments(vm.user.key, data, 1).then(
        function(response){
            $ionicLoading.hide();
            console.log(response);
            vm.comments = response.data.data.data_info;
        },function(error){
           $ionicLoading.hide();
          console.log(error);
        }
      );
    }loadComments();
    
};