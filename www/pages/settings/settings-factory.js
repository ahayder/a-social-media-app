angular.module('freemig.settingsFactory', [])

.factory('SettingsFactory', SettingsFactory)

SettingsFactory.$inject = ['$http', 'Constants']


function SettingsFactory($http, Constants) {

    return({
        changeFullName: function(data, token){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/setting/change-profile-info?token=' + token, data);
        },
        getUserInfoByid: function(token, data){
            return $http.post(Constants.apiurl + '/en/app/api/v0.1/social/userInfo?token='+ token, data);
        },
        changeUsername: function(token, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/setting/change-username?token=' + token, data);
        },
        changePassword: function(token, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/setting/change-password?token=' + token, data);
        },
        changeEmail: function(token, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/setting/change-email?token=' + token, data);
        },
        changePrivacySettings: function(token, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/setting/privacy?token=' + token, data);
        }
        
    });
    
};