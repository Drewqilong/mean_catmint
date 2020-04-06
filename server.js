const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
const path = require('path');

const router = express.Router();
const appRoutes = require('./app/routes/api')(router);

const app = express();
//HTTP request logger
app.use(morgan('tiny'));

app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

const port = process.env.PORT || 8080 

const MONGODB_URI = 'mongodb+srv://dbuser:8fO56qa3wBdNYtsk@cluster0-bhgly.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!!!!');
});

// Set Application Static Layout
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});






app.listen(port, function() {
    console.log(`Server is starting at ${port}`);
})