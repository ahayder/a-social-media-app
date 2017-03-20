angular.module('freemig.textDirective', [])

    .directive("textPost", textPost);

function textPost() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/home/post-types/text/text.html',
        scope: {
            tpost: '='
        },
        link: linkFunc,
        controller: tController,
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}

tController.$inject = ['$scope', 'Constants'];

function tController($scope, Constants) {
    var vm = this;

    vm.apiurl = Constants.apiurl;

    console.log("inside text");

}