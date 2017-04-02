angular.module('freemig.homeFactory', [])

.factory('HomeFactory', HomeFactory)

HomeFactory.$inject = ['$http', 'Constants']


function HomeFactory($http, Constants) {

    return({
        getNewsFeedHome: function(key, data, pageNo){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/social/newsFeed/'+pageNo+'?token='+key, data);
        },
        createPost: function(key, data){
            return $http.post(Constants.apiurl + "/en/api/v0.1/app/social/post?token="+key, data);
        }
    });
    
};