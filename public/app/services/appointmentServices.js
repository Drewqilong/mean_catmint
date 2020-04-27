angular.module('appointmentServices', [])

    .factory('Appoint', function ($window, $http, $filter) {
        var appointFactory = {}; // Create the appointment object

        // appointFactory.getUser = function(){
        //     return $http.get('/api/profile');
        // };
        
        //call api.js to save data
        appointFactory.saveServices = function(serviceData){
            return $http.put('/api/services', serviceData);
        }

        appointFactory.setAppoint = function (appointData) {
            console.log(appointData);
            if(appointData){
                $window.localStorage.setItem('appoint', JSON.stringify(appointData));
            } else {
                $window.localStorage.removeItem('appoint');
            }
        };

        appointFactory.getAppoint = function() {
            return JSON.parse($window.localStorage.getItem('appoint'));
        };
    
        return appointFactory;
    })
