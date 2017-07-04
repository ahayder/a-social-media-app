angular.module('freemig.settingsController', [])

    .controller('settingsCtrl', settingsCtrl)

settingsCtrl.$inject = ['$scope', 'ionicToast', '$ionicModal', '$localStorage', '$ionicLoading', 'SettingsFactory']

function settingsCtrl($scope, ionicToast, $ionicModal, $localStorage, $ionicLoading, SettingsFactory) {

    var vm = this;
    vm.user = $localStorage.user.token;


    // Change profile info
    vm.changeFullName = function () {
        ionicToast.show("Working!", "bottom", true, 2000);
        var data = {
            "tz": "6",
            "first_name": vm.firstName,
            "last_name": vm.lastName
        }
        SettingsFactory.changeFullName(data, vm.user.key).then(
            function (response) {
                ionicToast.show(response.data.data.data_info, "bottom", false, 2000);
                // get user info to show changes
                var userData = { "tz": vm.user.userTZ, "user_id": vm.user.userId };
                SettingsFactory.getUserInfoByid(vm.user.key, userData).then(
                    function (response) {
                        $localStorage.user = response.data.data;
                    }, function (error) {
                        console.log(error);
                    }
                );// show user info
            }, function (error) {
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
            }
        );
    } // change profile info


    // change username
    vm.changeUsername = function () {
        ionicToast.show("Working!", "bottom", true, 2000);
        var data = { "tz": vm.user.userTZ, "username": vm.username };
        SettingsFactory.changeUsername(vm.user.key, data).then(
            function (response) {
                ionicToast.show(response.data.data.msg, "bottom", false, 2000);
                // get user info to show changes
                var userData = { "tz": vm.user.userTZ, "user_id": vm.user.userId };
                SettingsFactory.getUserInfoByid(vm.user.key, userData).then(
                    function (response) {
                        $localStorage.user = response.data.data;
                    }, function (error) {
                        console.log(error);
                    }
                );// show user info
            }, function (error) {
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
            }
        );
    } // change username


    // Change password
    vm.changePassword = function () {
        ionicToast.show("Working!", "bottom", true, 2000);
        var data = {
            "tz": vm.user.userTZ,
            "currentPassword": vm.currentPassword,
            "password": vm.password,
            "password_confirmation": vm.cpassword
        };
        SettingsFactory.changePassword(vm.user.key, data).then(
            function (response) {
                ionicToast.show(response.data.data.msg, "bottom", false, 2000);
                // get user info to show changes
                var userData = { "tz": vm.user.userTZ, "user_id": vm.user.userId };
                SettingsFactory.getUserInfoByid(vm.user.key, userData).then(
                    function (result) {
                        $localStorage.user = result.data.data;
                    }, function (error) {
                        console.log(error);
                    }
                );// show user info
            }, function (error) {
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
            }
        );
    }// change password


    // change email
    vm.changeEmail = function () {
        ionicToast.show("Working!", "bottom", true, 2000);
        var data = {
            "tz": vm.user.userTZ,
            "email": vm.email,
            "password": vm.emailChangePassword,
            "password_confirmation": vm.emailChangeConfirmPassword
        };
        SettingsFactory.changeEmail(vm.user.key, data).then(
            function (response) {
                console.log(response);
                ionicToast.show(response.data.data.msg, "bottom", false, 2000);
                // get user info to show changes
                var userData = { "tz": vm.user.userTZ, "user_id": vm.user.userId };
                SettingsFactory.getUserInfoByid(vm.user.key, userData).then(
                    function (result) {
                        $localStorage.user = result.data.data;
                    }, function (error) {
                        console.log(error);
                    }
                );// show user info
            }, function (error) {
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
            }
        );
    } // change email

    // modal
    $ionicModal.fromTemplateUrl('pages/settings/privacy-settings-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.privacySettingsModal = modal;
    });


    vm.openPrivacyModal = function (name) {
        $scope.privacySettingsModal.show();
        vm.privacyName = name;
    }

    vm.closePrivacySettingsModal = function () {
        $scope.privacySettingsModal.hide();
        $scope.privacySettingsModal.remove();
    };


    vm.savePrivacySettings = function(setId, privacyType){
        ionicToast.show("Working...", "bottom", true, 2000);
        var data = {
                        "owner_type": "1",
                        "content_id": vm.user.userId,
                        "content_type": "settings_privacy",
                        "privacy_type": [privacyType],
                        "settings_id": setId,
                        "tz": vm.user.userTZ
                    };

        SettingsFactory.changePrivacySettings(vm.user.key, data).then(
            function(response){
                console.log(response.data);
                ionicToast.show(response.data.data, "bottom", false, 2000);
            },function(error){
                console.log(error);
                ionicToast.show("Error! Please try again.", "bottom", false, 2000);
            }
        );
    }



};