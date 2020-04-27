

const User = require('../models/user'); // Import User Model
const jwt = require('jsonwebtoken');
var secret = 'secret';


module.exports = function(router) {

    // Start Sendgrid Configuration Settings (Use only if using sendgrid)
    // var options = {
    //     auth: {
    //         api_user: 'dbrian332', // Sendgrid username
    //         api_key: 'PAssword123!@#' // Sendgrid password
    //     }
    // };
//Routes

    router.get("/api", (req, res)=>{
        const data = {
            username: 'Kitty',
            age:  3
        };
        UserPost.find({ })
            .then((data) =>{
                console.log('Data: ', data);
                res.json(data);
            })
            .catch((error) => {
                console.log('error: ', daerrorta);
            });

        
    });

    // Sign Up route
    // http://localhost:8080/api/users
    router.post('/users', function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        // Check if request is valid and not empty or null
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'Username or password already exists' });
                } else {
                    res.json({ success: true, message: 'User created' });
                }
            });
        }
        
    });

    
    // save appointment
    router.put('/services', function(req, res){
        User.findOne({ username:  req.body.username}, function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if user is in database
                if (!user) {
                    res.json({ success: false, message: 'No user found' }); // Return error
                } else {
                    // Save changes
                    var services = req.body.services;
                    if(user.Petinfo.Petname){
                        services['Petname'] = user.Petinfo.Petname;
                    };
                    user.Appointment.push(services);
                    user.save(function (err) {
                        if (err) {
                            console.log(err); // Log any errors to the console
                        } else {
                            res.json({ success: true, message: 'Appointment had been saved'}); // Return success message
                        }
                    });
                }
            }
        });
        
    });

    // User login route
    // http://localhost:8080/api/authenticate
    router.post('/authenticate', function(req, res) {
        console.log(req.body.username);
        User.findOne({ username: req.body.username}).select('_id email username password').exec(function(err, user){
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Could not authenticate user'});
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'No password provided'});
                }
                if (!validPassword) {
                    res.json({ success: false, message: 'Could not authenticate password'});
                } else {
                    var token = jwt.sign({_id: user._id, username: user.username, email: user.email}, secret, { expiresIn: '24h'});
                    res.json({success: true, message: 'User authenticated', token: token});
                }
            }
        });
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            // verify token
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Token invalid'});
                } else {
                    req.decoded = decoded;
                    next();
                };
            });
        } else {
            res.json({ success: false, message: 'No token provided'})
        };
    });

    router.post('/me', function(req, res) {
        res.send(req.decoded);
    });

    // Route to get the profile 
    router.get('/profile', function(req, res) {
        // var editUser = req.params.id; // Assign the _id from parameters to variable
        User.findOne({ username: req.decoded.username }, function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if user to edit is in database
                if (!user) {
                    res.json({ success: false, message: 'No user found' }); // Return error
                } else {
                    res.json({ success: true, user: user }); // Return the user to be editted
                }
            }
        });
    });

        // Route to get all users for admin page
    router.get('/management', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!users) {
                    res.json({ success: false, message: 'Users not found' }); // Return error
                } else {
                    res.json({ success: true, users: users }); // Return users, along with current user's permission
                }
            }
        });
    });

    // Route to delete a user
    router.delete('/management/:username', function (req, res) {
        var deletedUser = req.params.username; // Assign the username from request parameters to a variable
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                // Check if current user was found in database
                if (!mainUser) {
                    res.json({ success: false, message: 'No user found' }); // Return error
                } else {
                    // Fine the user that needs to be deleted
                    User.findOneAndRemove({ username: deletedUser }, function (err, user) {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true }); // Return success status
                        }
                    });

                }
            };
        });
    });

    router.put('/feedback', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if user is in database
                if (!user) {
                    res.json({ success: false, message: 'No user found' }); // Return error
                } else {
                    // Save changes
                    user.Feedback.push(req.body);
                    user.save(function (err) {
                        if (err) {
                            console.log(err); // Log any errors to the console
                        } else {
                            res.json({ success: true, message: 'Feedback submitted!' }); // Return success message
                        }
                    });
                }
            }

        });
    });

    //Update cat information
    router.put('/cat', function (req, res) {
        var petname = req.body.petname;
        var age = req.body.age;
        var breed = req.body.breed;
        User.findOne({ username: req.decoded.username }, function (err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if user is in database
                if (!user) {
                    res.json({ success: false, message: 'No user found' }); // Return error
                } else {
                    // Save changes
                    if(petname){
                        user.Petinfo.Petname = petname;
                    };
                    
                    if(age){
                        user.Petinfo.Age = age;
                    };
                    
                    if(breed){
                        user.Petinfo.Breed = breed;
                    };
                    user.save(function (err) {
                        if (err) {
                            console.log(err); // Log any errors to the console
                        } else {
                            res.json({ success: true, message: 'Cat information updated!' }); // Return success message
                        }
                    });
                }
            }

        });
    });

    // Route to update/edit a profile
    router.put('/profile', function(req, res) {
        if (req.body.name) var newName = req.body.name; // Check if a change to name was requested
        if (req.body.username) var newUsername = req.body.username; // Check if a change to username was requested
        if (req.body.email) var newEmail = req.body.email; // Check if a change to e-mail was requested
        if (req.body.permission) var newPermission = req.body.permission; // Check if a change to permission was requested
        // Look for logged in user in database to check if have appropriate access
        User.findOne({ username: req.decoded.username }, function(err, mainUser) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if logged in user is found in database
                if (!mainUser) {
                    res.json({ success: false, message: "no user found" }); // Return error
                } else {
                    // Check if a change to name was requested
                    if (newName) {
                        // Check if person making changes has appropriate access
                        if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                            // Look for user in database
                            User.findOne({ _id: editUser }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var email = {
                                        from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                        to: 'gugui3z24@gmail.com',
                                        subject: 'Error Logged',
                                        text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                                        html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                                    };
                                    // Function to send e-mail to myself
                                    client.sendMail(email, function(err, info) {
                                        if (err) {
                                            console.log(err); // If error with sending e-mail, log to console/terminal
                                        } else {
                                            console.log(info); // Log success message to console if sent
                                            console.log(user.email); // Display e-mail that it was sent to
                                        }
                                    });
                                    res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                                } else {
                                    // Check if user is in database
                                    if (!user) {
                                        res.json({ success: false, message: 'No user found' }); // Return error
                                    } else {
                                        user.name = newName; // Assign new name to user in database
                                        // Save changes
                                        user.save(function(err) {
                                            if (err) {
                                                console.log(err); // Log any errors to the console
                                            } else {
                                                res.json({ success: true, message: 'Name has been updated!' }); // Return success message
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                        }
                    }

                    // Check if a change to username was requested
                    if (newUsername) {
                        // Check if person making changes has appropriate access
                        if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                            // Look for user in database
                            User.findOne({ _id: editUser }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var email = {
                                        from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                        to: 'gugui3z24@gmail.com',
                                        subject: 'Error Logged',
                                        text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                                        html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                                    };
                                    // Function to send e-mail to myself
                                    client.sendMail(email, function(err, info) {
                                        if (err) {
                                            console.log(err); // If error with sending e-mail, log to console/terminal
                                        } else {
                                            console.log(info); // Log success message to console if sent
                                            console.log(user.email); // Display e-mail that it was sent to
                                        }
                                    });
                                    res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                                } else {
                                    // Check if user is in database
                                    if (!user) {
                                        res.json({ success: false, message: 'No user found' }); // Return error
                                    } else {
                                        user.username = newUsername; // Save new username to user in database
                                        // Save changes
                                        user.save(function(err) {
                                            if (err) {
                                                console.log(err); // Log error to console
                                            } else {
                                                res.json({ success: true, message: 'Username has been updated' }); // Return success
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                        }
                    }

                    // Check if change to e-mail was requested
                    if (newEmail) {
                        // Check if person making changes has appropriate access
                        if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                            // Look for user that needs to be editted
                            User.findOne({ _id: editUser }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var email = {
                                        from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                        to: 'gugui3z24@gmail.com',
                                        subject: 'Error Logged',
                                        text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                                        html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                                    };
                                    // Function to send e-mail to myself
                                    client.sendMail(email, function(err, info) {
                                        if (err) {
                                            console.log(err); // If error with sending e-mail, log to console/terminal
                                        } else {
                                            console.log(info); // Log success message to console if sent
                                            console.log(user.email); // Display e-mail that it was sent to
                                        }
                                    });
                                    res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                                } else {
                                    // Check if logged in user is in database
                                    if (!user) {
                                        res.json({ success: false, message: 'No user found' }); // Return error
                                    } else {
                                        user.email = newEmail; // Assign new e-mail to user in databse
                                        // Save changes
                                        user.save(function(err) {
                                            if (err) {
                                                console.log(err); // Log error to console
                                            } else {
                                                res.json({ success: true, message: 'E-mail has been updated' }); // Return success
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                        }
                    }

                    // Check if a change to permission was requested
                    if (newPermission) {
                        // Check if user making changes has appropriate access
                        if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                            // Look for user to edit in database
                            User.findOne({ _id: editUser }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var email = {
                                        from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                        to: 'gugui3z24@gmail.com',
                                        subject: 'Error Logged',
                                        text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                                        html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                                    };
                                    // Function to send e-mail to myself
                                    client.sendMail(email, function(err, info) {
                                        if (err) {
                                            console.log(err); // If error with sending e-mail, log to console/terminal
                                        } else {
                                            console.log(info); // Log success message to console if sent
                                            console.log(user.email); // Display e-mail that it was sent to
                                        }
                                    });
                                    res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                                } else {
                                    // Check if user is found in database
                                    if (!user) {
                                        res.json({ success: false, message: 'No user found' }); // Return error
                                    } else {
                                        // Check if attempting to set the 'user' permission
                                        if (newPermission === 'user') {
                                            // Check the current permission is an admin
                                            if (user.permission === 'admin') {
                                                // Check if user making changes has access
                                                if (mainUser.permission !== 'admin') {
                                                    res.json({ success: false, message: 'Insufficient Permissions. You must be an admin to downgrade an admin.' }); // Return error
                                                } else {
                                                    user.permission = newPermission; // Assign new permission to user
                                                    // Save changes
                                                    user.save(function(err) {
                                                        if (err) {
                                                            console.log(err); // Long error to console
                                                        } else {
                                                            res.json({ success: true, message: 'Permissions have been updated!' }); // Return success
                                                        }
                                                    });
                                                }
                                            } else {
                                                user.permission = newPermission; // Assign new permission to user
                                                // Save changes
                                                user.save(function(err) {
                                                    if (err) {
                                                        console.log(err); // Log error to console
                                                    } else {
                                                        res.json({ success: true, message: 'Permissions have been updated!' }); // Return success
                                                    }
                                                });
                                            }
                                        }
                                        // Check if attempting to set the 'moderator' permission
                                        if (newPermission === 'moderator') {
                                            // Check if the current permission is 'admin'
                                            if (user.permission === 'admin') {
                                                // Check if user making changes has access
                                                if (mainUser.permission !== 'admin') {
                                                    res.json({ success: false, message: 'Insufficient Permissions. You must be an admin to downgrade another admin' }); // Return error
                                                } else {
                                                    user.permission = newPermission; // Assign new permission
                                                    // Save changes
                                                    user.save(function(err) {
                                                        if (err) {
                                                            console.log(err); // Log error to console
                                                        } else {
                                                            res.json({ success: true, message: 'Permissions have been updated!' }); // Return success
                                                        }
                                                    });
                                                }
                                            } else {
                                                user.permission = newPermission; // Assign new permssion
                                                // Save changes
                                                user.save(function(err) {
                                                    if (err) {
                                                        console.log(err); // Log error to console
                                                    } else {
                                                        res.json({ success: true, message: 'Permissions have been updated!' }); // Return success
                                                    }
                                                });
                                            }
                                        }

                                        // Check if assigning the 'admin' permission
                                        if (newPermission === 'admin') {
                                            // Check if logged in user has access
                                            if (mainUser.permission === 'admin') {
                                                user.permission = newPermission; // Assign new permission
                                                // Save changes
                                                user.save(function(err) {
                                                    if (err) {
                                                        console.log(err); // Log error to console
                                                    } else {
                                                        res.json({ success: true, message: 'Permissions have been updated!' }); // Return success
                                                    }
                                                });
                                            } else {
                                                res.json({ success: false, message: 'Insufficient Permissions. You must be an admin to upgrade someone to the admin level' }); // Return error
                                            }
                                        }
                                    }
                                }
                            });
                        } else {
                            res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                        }
                    }
                }
            }
        });
    });

    return router;
}