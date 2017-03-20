angular.module('freemig.registrationController', [])

.controller('registrationCtrl', registrationCtrl)

registrationCtrl.$inject = ['$scope', '$stateParams', '$http', '$state', 'RegistrationFactory']


function registrationCtrl($scope, $stateParams, $http, $state, RegistrationFactory) {

    var vm = this;

    function getCountries(){
        RegistrationFactory.getCountriesList().then(
            function(response){
                vm.countries = response.data.data.country;
                console.log(vm.countries);
            },function(response){
                console.log("Error");
            }
        );
    }getCountries();

    vm.signupData = {
        "g-recaptcha-response":"1",
        "via":"freemigBug",
        "activate_by":"phone"
    };
   

    vm.signup = function(){
        console.log(vm.signupData);
        var bday = new Date(vm.signupData.dob);
        vm.signupData.dobYear = bday.getFullYear();
        vm.signupData.dobMonth = bday.getMonth()+1;
        vm.signupData.dobDate = bday.getDate();
        vm.signupData.country = vm.signupData.country.country_name;
        RegistrationFactory.doSignup(vm.signupData).then(
            function (response) {
                console.log(response);
                if (response.status === 2000) {
                    $state.go("home");
                } else {
                    //error
                }
            },function(error){
                console.log(error);
            });
    }


    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });

    vm.nextSlide = function () {
        $scope.slider.slideNext();
    };

    vm.prevSlide = function(){
        $scope.slider.slidePrev();
    }

    

};