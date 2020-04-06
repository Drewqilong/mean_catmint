const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./app/models/user');
const bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.

const app = express();
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const port = process.env.PORT || 8080 

const MONGODB_URI = 'mongodb+srv://dbuser:8fO56qa3wBdNYtsk@cluster0-bhgly.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!!!!');
});


//HTTP request logger
app.use(morgan('tiny'));

//app.use(express.static(__dirname + '/client/public'));


//Routes

app.get("/", function(req, res){
    // res.render("index");
    res.send("Hello World!")
});

app.get("/api", (req, res)=>{
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

// http://localhost:8080/users
app.post('/users', function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    res.send('User created!')
});

app.listen(port, function() {
    console.log(`Server is starting at ${port}`);
})