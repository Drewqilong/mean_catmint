angular.module('userApp', ['appRoutes', 'userControllers','userServices', 'ngAnimate', 'mainController', 'authServices', 'userProfileControllers','cartControllers'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
