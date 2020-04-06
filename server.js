const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

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

app.use(express.static(__dirname + '/client/public'));


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

app.listen(port, function() {
    console.log(`Server is starting at ${port}`);
})