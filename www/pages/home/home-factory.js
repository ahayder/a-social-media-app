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
        },
        doLike: function(key, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/social/like?token=' + key, data);
        },
        getComments: function(key, data, pageno){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/social/getComment/'+pageno+'?token=' + key, data);
        },
        createComment: function(key, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/social/comment?token=' + key, data);
        },
        savePost: function(key, data){
            return $http.post(Constants.apiurl + '/en/api/v0.1/app/social/fav-save?token=' + key, data);
        }
    });
    
};