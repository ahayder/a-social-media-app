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
        getAllFollowing: function(key, tz){
            return $http.get(Constants.apiurl+'/en/api/v0.1/app/social/getAllFollowing?token='+key+'&tz='+tz);
        },
        getAllFollowers: function(key, tz){
            return $http.get(Constants.apiurl+'/en/api/v0.1/app/social/getAllFollower?token='+key+'&tz='+tz);
        },
        getWidgetInfo: function(key, data){
            return $http.get(Constants.apiurl+'/en/api/v0.1/app/social/get-widget-general-info?token='+key, data);
        }
    });
    
};