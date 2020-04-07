

const User = require('../models/user'); // Import User Model


module.exports = function(router) {

    // Start Sendgrid Configuration Settings (Use only if using sendgrid)
    // var options = {
    //     auth: {
    //         api_user: 'dbrian332', // Sendgrid username
    //         api_key: 'PAssword123!@#' // Sendgrid password
    //     }
    // };
//Routes

    router.get("/", function(req, res){
        // res.render("index");
        res.send("Hello World!")
    });

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

    // http://localhost:8080/api/users
    router.post('/users', function(req, res){
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        // Check if request is valid and not empty or null
        if (req.body.email === null || req.body.email === '' || req.body.password === null || req.body.password === '') {
            res.json({ success: false, message: 'Ensure email, and password were provided' });
        } else {
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'Email or password already exists' });
                } else {
                    res.json({ success: true, message: 'User created' });
                }
            });
        }
        
    });
    return router;
}