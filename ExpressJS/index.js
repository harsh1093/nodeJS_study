//Require
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');



//Connect to Mongoose (Database)

mongoose
    .connect('mongodb+srv://harsh:mankar-9@cluster0.r2eoqmk.mongodb.net/?retryWrites=true&w=majority')
    .then(function(){
        console.log('Database connection established');
    })
    .catch(function(err){
        console.log(err);
    });

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: false}));
    
const productRouter = require('./routes/product');
app.use(productRouter);

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

