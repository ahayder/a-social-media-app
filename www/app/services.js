angular.module('freemig.services', [])


    .service('LocationService', LocationService)

LocationService.$inject = ['$cordovaGeolocation', '$q']


function LocationService($cordovaGeolocation, $q) {
    return {
        askLocationPermission: function () {
            try{
                var permissions = cordova.plugins.permissions; // could not find a better way to access cordova; it's not in $window
                var deferred = $q.defer();

                permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, function (result) {
                    deferred.resolve();
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }catch(e){
                var deferred = $q.defer();
                return deferred.promise;
            }
        },
        getCoords: function () {
            return $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: false })
                .then(function (position) {
                    return position.coords;
                });
        }
    };
}