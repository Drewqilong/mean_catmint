angular.module('userProfileControllers', [])

//Update the user profile
.controller('profileEditCtrl', function($scope, User, $routeParams, $timeout,$location){
    var app = this;

    // Function: get the profile that needs to be edited
    User.getProfile().then(function(data) {
        // Check if the user's _id was found in database
        console.log(data.data.user.Appointment);
        if (data.data.success) {
            // $scope.newName = data.data.user.name; // Display user's name in scope
            // $scope.newEmail = data.data.user.email; // Display user's e-mail in scope
            // $scope.newUsername = data.data.user.username; // Display user's username in scope
            // app.currentUser = data.data.user._id; // Get user's _id for update functions
            app.Appointment = data.data.user.Appointment;
            app.username = data.data.user.username;
            app.email = data.data.user.email;
            if(data.data.user.Petinfo){
                app.petname = data.data.user.Petinfo.Petname;
                app.age = data.data.user.Petinfo.Age;
                app.breed = data.data.user.Petinfo.Breed;
            }
        } else {
            app.errorMsg = data.data.message; // Set error message
            $scope.alert = 'alert alert-danger'; // Set class for message
        }
    });

    app.feedback = function(feedbackData){
        User.updateFeedback(feedbackData).then(function(data) {
            // Check if able to edit user
            if (data.data.success) {
                $scope.alert = 'alert alert-success'; // Set class for message
                app.successMsg = data.data.message; // Set success message
                // Function: After two seconds, clear and re-enable
                
                $timeout(function() {
                    app.contact.$setPristine(); // Reset username form
                    app.contact.$setUntouched(); // Reset username form
                    app.successMsg = false; // Clear success message
                    app.feedbackData = '';
                }, 2000);
            } else {
                app.errorMsg = data.data.message; // Set error message
                app.disabled = false; // Enable form for editing
            };
            
        });
    }

    app.cat = function(catData){
        User.updateCat(catData).then(function(data) {
            // Check if able to edit user
            if (data.data.success) {
                $scope.alert = 'alert alert-success'; // Set class for message
                app.successMsg = data.data.message; // Set success message
                // Function: After two seconds, clear and re-enable
                
                $timeout(function() {
                    // app.catForm.$setPristine(); // Reset username form
                    // app.catForm.$setUntouched(); // Reset username form
                    app.successMsg = false; // Clear success message
                    // app.catData = '';
                }, 2000);
            } else {
                app.errorMsg = data.data.message; // Set error message
                app.disabled = false; // Enable form for editing
            };
            
        });
    }
})