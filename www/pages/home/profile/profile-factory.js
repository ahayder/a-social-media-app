angular.module('freemig.profileFactory', [])

.factory('ProfileFactory', ProfileFactory)

ProfileFactory.$inject = ['$http', 'Constants']


function ProfileFactory($http, Constants) {

    return({
        getCoverPhotoAndOtherInfo: function(key, data){
            return $http.post(Constants.apiurl+'/en/api/v0.1/app/social/getUserCover?token='+key, data);
        },
        getAllConnections: function(key, tz){
            return $http.get(Constants.apiurl+'/en/api/v0.1/app/social/getAllConnections?token='+key+'&tz='+tz);
        },
        getAllFollowing: function(){

        },
        getAllFollowers: function(){

        }
    });
    
};