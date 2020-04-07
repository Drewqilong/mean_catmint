angular.module('userControllers', ['userServices'])

// Controller: regCtrl is used for users to register an account
.controller('regCtrl', function($http,$location,$timeout,User) {
    var app = this;

    this.regUser = function(regData){

        User.create(app.regData).then(function(data){
            if (data.data.success) {
                app.successMsg = data.data.message;
                //redirect to home page
                $timeout(function(){
                    $location.path('/');
                }, 2000)
            } else{
                app.errorMsg = data.data.message;
                
            }
        })
    }
    
})



