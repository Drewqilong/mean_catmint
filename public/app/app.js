angular.module('userApp', ['appRoutes', 'userControllers','userServices', 'ngAnimate', 'mainController', 'authServices', 'userProfileControllers'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
