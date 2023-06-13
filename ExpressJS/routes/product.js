const express= require('express');
const router= express.Router();
const productModel= require('../models/product')



//REST API

//Index -> display all products
router.get('/products', async function(req, res) {
    try {
        const products= await productModel.find();
        res.render('index',{products})
    } catch (error) {
        res.send(error);
    }
});

//New -> Shows a form
router.get('/products/new', function(req, res) {
    res.render('new');
});

//Create -> insert a product into DB
router.post('/products', async function(req, res) {
    try {
        let inStock = req.body.inStock ? true : false;
        const newProduct= new productModel({
            name: req.body.name,
            price: req.body.price,
            sellerName: req.body.sellerName,
            shopAddress: req.body.shopAddress,
            discount: req.body.discount,
            qty: req.body.qty,
            isAvailable: inStock
        })
        await newProduct.save();
        console.log("Products Added to DB");
        res.redirect('/products');
    } catch (error) {
        res.send(error);
    }
});

//Show-> Display details of Products
router.get('/products/:id', async function(req, res) {
	try {
		const product = await productModel.findById(req.params.id);
		res.render('show', { product });
	} catch (error) {
		res.send(error);
	}
});

// edit -> form
router.get('/products/:id/edit', function(req, res) {
	res.render('edit', { id: req.params.id });
});

// update -> update info in db
router.patch('/products/:id', async function(req, res) {
	try {
		let inStock = req.body.inStock ? true : false;
		const dataOfProductToUpdate = {
			name: req.body.name,
            price: req.body.price,
            sellerName: req.body.sellerName,
            shopAddress: req.body.shopAddress,
            discount: req.body.discount,
            isAvailable: inStock,
            qty: req.body.qty
		};
		await productModel.findByIdAndUpdate(req.params.id, dataOfProductToUpdate);
		res.redirect('/products');
	} catch (error) {
		res.send(error);
	}
});

// destroy
router.delete('/products/:id', async function(req, res) {
	try {
		await productModel.findByIdAndDelete(req.params.id);
		res.redirect('/products');
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;