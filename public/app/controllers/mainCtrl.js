angular.module('mainController',['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window) {
    var app = this;

    if ($window.location.pathname === '/') app.home = true; // Check if user is on home page to show home page div

    
    $rootScope.$on('$routeChangeSuccess', function() {
        // Check if user is on the home page
        if ($window.location.pathname === '/') {
            app.home = true; // Set home page div
        } else {
            app.home = false; // Clear home page div
        }
        // determine nav bar
        if (['/','/login','/logout','/register','/shoppingcart','/checkout','/success'].lastIndexOf($window.location.pathname) !== -1){
            app.indexBar = false;
        } else {
            app.indexBar = true;
        }
        // determine intro section
        if (['/','/login','/logout','/register','/appointment','/shoppingcart','/checkout','/success'].lastIndexOf($window.location.pathname) !== -1){
            app.intro = false;
        } else {
            app.intro = true;
        }
    });

    $rootScope.$on('$routeChangeStart', function() {

        if (Auth.isLoggedIn()) {
            console.log('Success: User is logged in');
            app.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                console.log(data);
                app.username = data.data.username;
                app.useremail = data.data.email;
                app._id = data.data._id;
            });
        } else {
            console.log('Failure: User is not logged in');
            app.isLoggedIn = false;
            app.username = '';
        }
    });

    this.doLogin = function(loginData){

        Auth.login(app.loginData).then(function(data){
            if (data.data.success) {
                app.successMsg = data.data.message;
                //redirect to home page
                $timeout(function(){
                    $location.path('/');
                    app.loginData = '';
                    app.successMsg = false;
                }, 2000)
            } else{
                app.errorMsg = data.data.message;
                
            }
        });
    };

    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 2000);
    };
});