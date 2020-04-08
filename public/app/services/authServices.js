angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    var authFactory = {}; // Create the userFactory object

    // Register users in database
    authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data) {
            AuthToken.setToken(data.data.token)
            return data;
        });
    };

    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    };

    // Auth.getUser();
    authFactory.getUser = function(){
        if (AuthToken.getToken()) {
            return $http.post('/api/me');
        } else {
            q.reject({message: 'User has no token'});
        }
    };

    // Auth.logout();
    authFactory.logout = function() {
        AuthToken.setToken();
    };
    
    return authFactory;
})

.factory('AuthToken', function($window) {
    var authToeknFactory = {};
    
    // AuthToken.setToken(token);
    authToeknFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    };

    authToeknFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    return authToeknFactory;
})

// Factory: AuthInterceptors is used to configure headers with token (passed into config, app.js file)
.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {}; // Create factory object

    // Function to check for token in local storage and attach to header if so
    authInterceptorsFactory.request = function(config) {
        var token = AuthToken.getToken(); // Check if a token is in local storage
        if (token) config.headers['x-access-token'] = token; //If exists, attach to headers

        return config; // Return config object for use in app.js (config file)
    };

    return authInterceptorsFactory; // Return factory object

});