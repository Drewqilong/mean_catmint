const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
const path = require('path');

const router = express.Router();
const appRoutes = require('./app/routes/api')(router);

const app = express();
//HTTP request logger
app.use(morgan('dev')); // Morgan Middleware

app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

const port = process.env.PORT || 8080 

const MONGODB_URI = 'mongodb+srv://dbuser:8fO56qa3wBdNYtsk@cluster0-bhgly.mongodb.net/test?retryWrites=true&w=majority';

var options = { 
  server: { 
    socketOptions: { 
      keepAlive: 300000, connectTimeoutMS: 30000 
    } 
  }, 
  replset: { 
    socketOptions: { 
      keepAlive: 300000, 
      connectTimeoutMS : 30000 
    } 
  } 
};


if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, options, function(err) {
        if (err) {
            console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
        } else {
            console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
        }
    });
  } else {
  
    // Connect to local database
  
    mongoose.connect(MONGODB_URI || 'mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  };
  

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!!!!');
    console.log(process.env.MONGODB_URI);
});

// Set Application Static Layout
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});






app.listen(port, function() {
    console.log(`Server is starting at ${port}`);
})