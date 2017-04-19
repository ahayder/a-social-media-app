angular.module('freemig.registrationController', [])

.controller('registrationCtrl', registrationCtrl)

registrationCtrl.$inject = ['$scope', '$stateParams', '$http', '$state', 'RegistrationFactory', '$ionicLoading', 'ionicToast']


function registrationCtrl($scope, $stateParams, $http, $state, RegistrationFactory, $ionicLoading, ionicToast) {

    var vm = this;

    function getCountries(){
        RegistrationFactory.getCountriesList().then(
            function(response){
                vm.countries = response.data.data.country;
            },function(response){
                console.log("Countries Error");
            }
        );
    }getCountries();

    vm.signupData = {
        "g-recaptcha-response":"1",
        "via":"freemigBug",
        "activate_by":"phone"
    };
   

    vm.signup = function(){

        $ionicLoading.show({
            template: 'Working...'
        })

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
                    $ionicLoading.hide();
                    ionicToast.show("Registration Successfull!", "bottom", false, 2000);
                    $state.go("home");
                } else if(response.status === 8000){
                    $ionicLoading.hide();
                    ionicToast.show("Registration Successfull!", "bottom", false, 2000);
                    $state.go("home");
                }
                else{
                    $ionicLoading.hide();
                    ionicToast.show("Error! Please try again.", "bottom", false, 2000);
                }
            },function(error){
                $ionicLoading.hide();
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
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