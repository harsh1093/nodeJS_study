// 1) Require the module 

const express= require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mongodb= require('mongodb');

// Connect to Database Mongoose

mongoose
    .connect('mongodb+srv://harsh:mankar-9@cluster0.r2eoqmk.mongodb.net/?retryWrites=true&w=majority')
    .then(function(){
        console.log('Database connection established');
    })
    .catch(function(err){
        console.log(err);
    })

//Use API

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const studentRouter = require('./routes/product');
app.use(studentRouter);

app.listen(3300, function () {
    console.log('Server listening on port 3300');
});
