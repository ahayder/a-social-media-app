angular.module('freemig.signinFactory', [])

.factory('SiginFactory', SiginFactory)

SiginFactory.$inject = ['$http', 'Constants']


function SiginFactory($http, Constants) {

    return({
        doSignin: function(signinData){
            return $http.post(Constants.apiurl + 'en/api/v0.1/app/auth/login', signinData);
        }
    });
    
};