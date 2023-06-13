//Require
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productModel = require('./models/product.js');
// const MongoClient = require('mongodb').MongoClient


//Connect to Mongoose (Database)
// mongodb+srv://harsh:mankar-9@cluster0.r2eoqmk.mongodb.net/?retryWrites=true&w=majority

mongoose
.connect('mongodb+srv://harsh:mankar-9@cluster0.r2eoqmk.mongodb.net/?retryWrites=true&w=majority')
.then(function(){
    console.log('Database connection established');
})
.catch(function(err){
    console.log(err);
})




app.set('view engine', 'ejs');

app.use(express.urlencoded());

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))




app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/greet', function (req, res) {
    console.log(req.query);
    res.send(`Hello! ` + req.query.name);
});

app.get('/greet/:name', function (req, res) {
    // console.log(req.params);

    let {name} = req.params;
    res.render('index.ejs', {name: name, age: 29, color: 'green'});
});

app.get('/form', function (req, res) {
    res.render('form.ejs');
});

app.get('/formsubmit', function (req, res) {
    res.send(req.query)
});

app.post('/formsubmit', function (req, res) {
    let userMail= req.body.email;
    let userPass= req.body.password;
    let userImage= req.body.image;
    res.render('show.ejs', {userMail, userPass, userImage});
    // res.send(userMail + ' ' + userPass);
})


app.get('/addtodb', async function (req, res) {
    const newProduct= new productModel({
        name: 'Laptop',
        price: 50000,
        sellerName: "Redmi",
        shopAddress: 'Delhi',
        discount: 15,
        isAvailable: true,
        qty: 5
    });

    await newProduct.save();
    res.send('Data added successfully');
});

app.get('/addtodb2', async function (req, res) {
    const newProduct= new productModel({
        name: 'Mobile',
        price: 5000,
        sellerName: "Redmi",
        shopAddress: 'Delhi',
        discount: 10,
        isAvailable: true,
        qty: 2
    });

    await newProduct.save();
    res.send('Data added successfully');
});

//fetch
app.get('/getAllProduct', async function (req, res) {
    const newProduct= productModel.find();
    res.send(newProduct);
});

// delete
app.get('/deleteproduct/:id', async function(req, res) {
	let id= req.params.id;
    await productModel.deleteOne({
        sellerName: "redmi"
    });
	res.send('done');
});

app.get('*', function (req, res) {
    // res.send('Error');
    res.redirect('/');
});



app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

