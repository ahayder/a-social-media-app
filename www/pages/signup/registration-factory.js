angular.module('freemig.registrationFactory', [])

.factory('RegistrationFactory', RegistrationFactory)

RegistrationFactory.$inject = ['$http', 'Constants']


function RegistrationFactory($http, Constants) {

    return({
        doSignup: function(signupData){
            return $http.post(Constants.apiurl + 'en/api/v0.1/app/profile/register', signupData);
        },
        getCountriesList: function(){
            return $http.get(Constants.apiurl + 'en/api/v0.1/app/country-list');
        }
    });
    
};