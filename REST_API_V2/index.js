const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose
    .connect('mongodb+srv://harsh:mankar-9@cluster0.r2eoqmk.mongodb.net/?retryWrites=true&w=majority')
    .then(function () {
        console.log('Database connection established');
    })
    .catch(function (err) {
        console.log(err);
    })

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

const employeeRouter = require('./routes/product');
app.use(employeeRouter);

app.listen(4000, function () {
    console.log('Service listening on port 4000');
});