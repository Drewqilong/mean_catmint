angular.module('userApp', ['appRoutes', 'userControllers','userServices', 'ngAnimate', 'mainController', 'authServices', 'userProfileControllers','cartControllers','appointmentControllers','appointmentServices','managementController'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
